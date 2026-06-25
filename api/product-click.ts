import { anonHash, cleanArray, cleanText, cors, parseBody, rateLimit, recordSkinCoachEvent, VercelRequest, VercelResponse } from "./_shared.js";

function first(value: unknown) {
  return Array.isArray(value) ? value[0] : value;
}

function safeTarget(raw: unknown) {
  const value = cleanText(first(raw), "");
  try {
    const url = new URL(value);
    if (!["https:"].includes(url.protocol)) return "https://meditherapy.co.kr";
    if (!url.hostname.endsWith("meditherapy.co.kr") && !url.hostname.endsWith("meditherapy.co")) return "https://meditherapy.co.kr";
    return url.toString();
  } catch {
    return "https://meditherapy.co.kr";
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res, req);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (rateLimit(req, res, 180)) return;
  const body = parseBody<Record<string, unknown>>(req.body);
  const q = req.query ?? {};
  const productId = cleanText(first(q.productId) ?? body.productId, "unknown-product");
  const routineId = cleanText(first(q.routineId) ?? body.routineId, "unknown-routine");
  const target = safeTarget(first(q.target) ?? body.target);
  await recordSkinCoachEvent({
    eventType: "product_feedback",
    userHash: anonHash({ productId, routineId, day: new Date().toISOString().slice(0, 10) }),
    routineId,
    productIds: cleanArray([productId]),
    action: "product_link_click",
    metadata: { source: "product_click_redirect", privacy: "sanitized_no_pii", raw_text_stored: false, targetHost: new URL(target).hostname },
  });
  res.setHeader("Location", target);
  return res.status(302).end();
}
