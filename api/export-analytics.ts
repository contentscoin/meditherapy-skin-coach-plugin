import { cors, rateLimit, recentSkinCoachEvents, skinCoachSummary, VercelRequest, VercelResponse } from "./_shared.js";

function first(value: unknown) { return Array.isArray(value) ? value[0] : value; }
function csvEscape(value: unknown) { return `"${String(value ?? "").replace(/"/g, '""')}"`; }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res, req);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (rateLimit(req, res, 60)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });
  const rangeValue = first(req.query?.range);
  const range = rangeValue === "24h" || rangeValue === "7d" ? rangeValue : "all";
  const format = first(req.query?.format) === "csv" ? "csv" : "json";
  const [summary, recent] = await Promise.all([skinCoachSummary(range), recentSkinCoachEvents(100)]);
  const s = summary as any;
  const recentEvents = (recent as Array<{ eventType?: string; action?: string }>) ?? [];
  const funnel = s.funnel ?? {};
  const eventCounts = s.eventCounts ?? {};
  const recommendations = funnel.recommendations ?? eventCounts.routine_recommendation ?? 0;
  const schedules = funnel.schedules ?? eventCounts.task_schedule_created ?? 0;
  const checkins = funnel.checkins ?? eventCounts.checkin ?? 0;
  const feedback = funnel.feedback ?? eventCounts.product_feedback ?? 0;
  const productClicks = funnel.productClicks ?? recentEvents.filter((event) => event.eventType === "product_feedback" && ["product_link_clicked", "product_link_click"].includes(event.action ?? "")).length;
  const safe = {
    exportedAt: new Date().toISOString(),
    range,
    privacy: "aggregate_only_no_pii_no_raw_text_no_user_hash",
    summary,
  };
  if (format === "json") return res.status(200).json(safe);
  const rows = [
    ["metric", "value"],
    ["totalEvents", s.totalEvents ?? 0],
    ["questions", funnel.questions ?? recommendations],
    ["answers", funnel.answers ?? recommendations],
    ["recommendations", recommendations],
    ["schedules", schedules],
    ["checkins", checkins],
    ["productClicks", productClicks],
    ["feedback", feedback],
    ["avgSatisfaction", s.avgSatisfaction ?? 0],
  ];
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="meditherapy-owner-analytics-${range}.csv"`);
  return (res.status(200).end as unknown as (body: string) => void)(rows.map((row) => row.map(csvEscape).join(",")).join("\n"));
}
