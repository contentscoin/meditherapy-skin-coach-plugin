import { cors, skinCoachSummary, VercelRequest, VercelResponse } from "./_shared.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });
  const rangeParam = Array.isArray(req.query?.range) ? req.query?.range[0] : req.query?.range;
  const range = rangeParam === "24h" || rangeParam === "7d" ? rangeParam : "all";
  const summary = await skinCoachSummary(range);
  return res.status(200).json(summary);
}
