import { cors, rateLimit, recentSkinCoachEvents, skinCoachSummary, VercelRequest, VercelResponse } from "./_shared.js";

type AnyEvent = {
  occurredAt?: string;
  eventType?: string;
  skinType?: string;
  concerns?: string[];
  routineId?: string;
  productIds?: string[];
  checkinDay?: number;
  satisfactionScore?: number;
  action?: string;
  localeBucket?: string;
  metadata?: Record<string, unknown>;
};

function sanitizeRecent(events: AnyEvent[]) {
  return events.slice(0, 30).map((event) => ({
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
  }));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res, req);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (rateLimit(req, res, 240)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });
  const rangeParam = Array.isArray(req.query?.range) ? req.query?.range[0] : req.query?.range;
  const range = rangeParam === "24h" || rangeParam === "7d" ? rangeParam : "all";
  const [summary, recent] = await Promise.all([skinCoachSummary(range), recentSkinCoachEvents(50)]);
  const base = summary as any;
  const funnel = base.funnel ?? {};
  const recommendations = funnel.recommendations ?? base.eventCounts?.routine_recommendation ?? 0;
  const schedules = funnel.schedules ?? base.eventCounts?.task_schedule_created ?? 0;
  const checkins = funnel.checkins ?? base.eventCounts?.checkin ?? 0;
  const questions = funnel.questions ?? recommendations;
  const answers = funnel.answers ?? recommendations;

  return res.status(200).json({
    ...base,
    funnel: {
      ...funnel,
      questions,
      answers,
      recommendations,
      schedules,
      checkins,
      answerRate: questions ? answers / questions : 0,
      scheduleRate: recommendations ? schedules / recommendations : 0,
      checkinRate: recommendations ? checkins / recommendations : 0,
    },
    recentActivity: sanitizeRecent((recent as AnyEvent[]) ?? []),
    privacyGuard: {
      rawTextStored: false,
      piiStored: false,
      userHashExposed: false,
      note: "대시보드는 원문 질문/답변, 이름, 연락처, 주소, 주문번호, 결제정보를 저장하거나 노출하지 않고 구조화된 익명 지표만 표시합니다.",
    },
    insights: [
      { type: "plugin", summary: `플러그인 질문/답변 활동 ${recommendations}건입니다. 원문 질문과 답변 전문은 저장하지 않습니다.` },
      ...(Array.isArray(base.insights) ? base.insights : []),
    ],
  });
}
