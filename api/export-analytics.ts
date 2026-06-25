import { cors, rateLimit, skinCoachSummary, VercelRequest, VercelResponse } from "./_shared.js";

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
  const summary = await skinCoachSummary(range);
  const safe = {
    exportedAt: new Date().toISOString(),
    range,
    privacy: "aggregate_only_no_pii_no_raw_text_no_user_hash",
    summary,
  };
  if (format === "json") return res.status(200).json(safe);
  const rows = [
    ["metric", "value"],
    ["totalEvents", (summary as any).totalEvents ?? 0],
    ["questions", (summary as any).funnel?.questions ?? 0],
    ["answers", (summary as any).funnel?.answers ?? 0],
    ["recommendations", (summary as any).funnel?.recommendations ?? 0],
    ["schedules", (summary as any).funnel?.schedules ?? 0],
    ["checkins", (summary as any).funnel?.checkins ?? 0],
    ["productClicks", (summary as any).funnel?.productClicks ?? 0],
    ["avgSatisfaction", (summary as any).avgSatisfaction ?? 0],
  ];
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="meditherapy-owner-analytics-${range}.csv"`);
  return (res.status(200).end as unknown as (body: string) => void)(rows.map((row) => row.map(csvEscape).join(",")).join("\n"));
}
