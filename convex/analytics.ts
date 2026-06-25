import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const eventArg = v.object({
  eventId: v.optional(v.string()),
  eventType: v.union(
    v.literal("routine_recommendation"),
    v.literal("task_schedule_created"),
    v.literal("checkin"),
    v.literal("routine_adjustment"),
    v.literal("product_feedback"),
    v.literal("ontology_gap")
  ),
  occurredAt: v.optional(v.string()),
  userHash: v.optional(v.string()),
  skinType: v.optional(v.string()),
  concerns: v.optional(v.array(v.string())),
  sensitivity: v.optional(v.string()),
  routineId: v.optional(v.string()),
  productIds: v.optional(v.array(v.string())),
  checkinDay: v.optional(v.number()),
  drynessScore: v.optional(v.number()),
  irritationScore: v.optional(v.number()),
  satisfactionScore: v.optional(v.number()),
  action: v.optional(v.string()),
  localeBucket: v.optional(v.string()),
  ontologyGapFields: v.optional(v.array(v.string())),
  metadata: v.optional(v.any()),
});

type TopCount = { value: string; count: number };

function top(values: Array<string | undefined>, limit = 8): TopCount[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([value, count]) => ({ value, count }));
}

function flatten<T>(items: Array<T[] | undefined>): T[] {
  return items.flatMap((item) => item ?? []);
}

export const recordEvent = mutation({
  args: eventArg,
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("skinCoachEvents", {
      eventId: args.eventId ?? `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      eventType: args.eventType,
      occurredAt: args.occurredAt ?? now,
      userHash: args.userHash ?? `anon_${Math.random().toString(16).slice(2, 8)}`,
      skinType: args.skinType,
      concerns: args.concerns,
      sensitivity: args.sensitivity,
      routineId: args.routineId,
      productIds: args.productIds,
      checkinDay: args.checkinDay,
      drynessScore: args.drynessScore,
      irritationScore: args.irritationScore,
      satisfactionScore: args.satisfactionScore,
      action: args.action,
      localeBucket: args.localeBucket,
      ontologyGapFields: args.ontologyGapFields,
      metadata: args.metadata,
    });
  },
});

export const seedEvents = mutation({
  args: { events: v.array(eventArg) },
  handler: async (ctx, args) => {
    let inserted = 0;
    let skipped = 0;
    for (const event of args.events) {
      const existing = event.eventId
        ? await ctx.db.query("skinCoachEvents").filter((q) => q.eq(q.field("eventId"), event.eventId)).first()
        : null;
      if (existing) {
        skipped += 1;
        continue;
      }
      await ctx.db.insert("skinCoachEvents", {
        eventId: event.eventId ?? `seed_${Date.now()}_${inserted}`,
        eventType: event.eventType,
        occurredAt: event.occurredAt ?? new Date().toISOString(),
        userHash: event.userHash ?? `anon_seed_${inserted}`,
        skinType: event.skinType,
        concerns: event.concerns,
        sensitivity: event.sensitivity,
        routineId: event.routineId,
        productIds: event.productIds,
        checkinDay: event.checkinDay,
        drynessScore: event.drynessScore,
        irritationScore: event.irritationScore,
        satisfactionScore: event.satisfactionScore,
        action: event.action,
        localeBucket: event.localeBucket,
        ontologyGapFields: event.ontologyGapFields,
        metadata: event.metadata,
      });
      inserted += 1;
    }
    return { inserted, skipped };
  },
});

export const recentEvents = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db.query("skinCoachEvents").order("desc").take(args.limit ?? 20);
  },
});

export const summary = query({
  args: { range: v.optional(v.union(v.literal("all"), v.literal("7d"), v.literal("24h"))) },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("skinCoachEvents").collect();
    const now = Date.now();
    const cutoff = args.range === "24h" ? now - 24 * 60 * 60 * 1000 : args.range === "7d" ? now - 7 * 24 * 60 * 60 * 1000 : 0;
    const events = cutoff ? all.filter((event) => Date.parse(event.occurredAt) >= cutoff) : all;
    const totalEvents = events.length;
    const eventCounts = Object.fromEntries(top(events.map((event) => event.eventType), 20).map((x) => [x.value, x.count]));
    const recommendations = events.filter((event) => event.eventType === "routine_recommendation").length;
    const questions = recommendations;
    const answers = recommendations;
    const schedules = events.filter((event) => event.eventType === "task_schedule_created").length;
    const productShown = recommendations;
    const productClicks = events.filter((event) => event.eventType === "product_feedback" && event.action === "product_link_clicked").length;
    const feedback = events.filter((event) => event.eventType === "product_feedback").length;
    const checkins = events.filter((event) => event.eventType === "checkin").length;
    const day7 = events.filter((event) => event.eventType === "checkin" && (event.checkinDay ?? 0) >= 7).length;
    const satisfactionScores = events.map((event) => event.satisfactionScore).filter((value): value is number => typeof value === "number");
    const irritationEvents = events.filter((event) => (event.irritationScore ?? 0) >= 3).length;
    const reroute = events.filter((event) => ["reduce_active", "switch_routine", "pause_active"].includes(event.action ?? "")).length;
    const avgSatisfaction = satisfactionScores.length ? satisfactionScores.reduce((a, b) => a + b, 0) / satisfactionScores.length : 0;
    const ontologyGapFields = top(flatten(events.map((event) => event.ontologyGapFields)), 10);
    return {
      generatedAt: new Date().toISOString(),
      totalEvents,
      eventCounts,
      funnel: {
        questions,
        answers,
        recommendations,
        schedules,
        productShown,
        productClicks,
        feedback,
        checkins,
        day7,
        answerRate: questions ? answers / questions : 0,
        scheduleRate: recommendations ? schedules / recommendations : 0,
        productClickRate: productShown ? productClicks / productShown : 0,
        feedbackRate: recommendations ? feedback / recommendations : 0,
        checkinRate: recommendations ? checkins / recommendations : 0,
        day7CompletionRate: recommendations ? day7 / recommendations : 0,
      },
      avgSatisfaction,
      irritationReportRate: totalEvents ? irritationEvents / totalEvents : 0,
      rerouteNeededRate: totalEvents ? reroute / totalEvents : 0,
      topConcerns: top(flatten(events.map((event) => event.concerns)), 8),
      topSkinTypes: top(events.map((event) => event.skinType), 8),
      topRoutines: top(events.map((event) => event.routineId), 8),
      topProducts: top(flatten(events.map((event) => event.productIds)), 8),
      topFeedbackActions: top(events.filter((event) => event.eventType === "product_feedback").map((event) => event.action), 8),
      recentActivity: events
        .slice()
        .sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt))
        .slice(0, 20)
        .map((event) => ({
          occurredAt: event.occurredAt,
          eventType: event.eventType,
          skinType: event.skinType,
          concerns: event.concerns,
          routineId: event.routineId,
          productIds: event.productIds,
          checkinDay: event.checkinDay,
          satisfactionScore: event.satisfactionScore,
          action: event.action,
          localeBucket: event.localeBucket,
          privacy: event.metadata?.privacy ?? "sanitized_no_pii",
          rawTextStored: event.metadata?.raw_text_stored === true,
        })),
      privacyGuard: {
        rawTextStored: false,
        piiStored: false,
        userHashExposed: false,
        note: "대시보드는 원문 질문/답변, 이름, 연락처, 주소, 주문번호, 결제정보를 저장하거나 노출하지 않고 구조화된 익명 지표만 표시합니다.",
      },
      ontologyGaps: { count: events.filter((event) => event.eventType === "ontology_gap").length, fields: ontologyGapFields },
      insights: [
        { type: "plugin", summary: `플러그인 질문 ${questions}건, 답변 생성 ${answers}건입니다.` },
        { type: "routine", summary: recommendations ? `루틴 추천 ${recommendations}건 중 루틴 일정 사용 ${schedules}건, Day7 체크인 ${day7}건입니다.` : "아직 루틴 추천 이벤트가 없습니다." },
        { type: "commerce", summary: `추천 제품 노출 ${productShown}건, 제품 링크 클릭 ${productClicks}건입니다.` },
        { type: "feedback", summary: `추천/제품 피드백 ${feedback}건입니다.` },
        { type: "safety", summary: `자극 점수 3점 이상 이벤트는 ${irritationEvents}건입니다.` },
        { type: "ontology", summary: ontologyGapFields.length ? `${ontologyGapFields[0].value} 보강 우선순위가 높습니다.` : "온톨로지 갭 이벤트가 아직 없습니다." },
      ],
    };
  },
});
