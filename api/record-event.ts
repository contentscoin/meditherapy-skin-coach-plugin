import { anonHash, cleanArray, cleanText, cors, parseBody, recordSkinCoachEvent, VercelRequest, VercelResponse } from "./_shared.js";

type RequestBody = {
  eventType?: "routine_recommendation" | "task_schedule_created" | "checkin" | "routine_adjustment" | "product_feedback" | "ontology_gap";
  userSeed?: string;
  skinType?: string;
  concerns?: string[];
  sensitivity?: string;
  routineId?: string;
  productIds?: string[];
  checkinDay?: number;
  drynessScore?: number;
  irritationScore?: number;
  satisfactionScore?: number;
  action?: string;
  locale?: string;
  ontologyGapFields?: string[];
};

const allowed = new Set(["routine_recommendation", "task_schedule_created", "checkin", "routine_adjustment", "product_feedback", "ontology_gap"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const body = parseBody<RequestBody>(req.body);
  const eventType = allowed.has(body.eventType || "") ? body.eventType! : "checkin";
  const payload = {
    eventType,
    userHash: anonHash(body.userSeed || { skinType: body.skinType, concerns: body.concerns, routineId: body.routineId }),
    skinType: cleanText(body.skinType, "unknown"),
    concerns: cleanArray(body.concerns),
    sensitivity: cleanText(body.sensitivity, "medium"),
    routineId: cleanText(body.routineId, "unknown-routine"),
    productIds: cleanArray(body.productIds),
    checkinDay: typeof body.checkinDay === "number" ? body.checkinDay : undefined,
    drynessScore: typeof body.drynessScore === "number" ? body.drynessScore : undefined,
    irritationScore: typeof body.irritationScore === "number" ? body.irritationScore : undefined,
    satisfactionScore: typeof body.satisfactionScore === "number" ? body.satisfactionScore : undefined,
    action: cleanText(body.action, "record"),
    localeBucket: cleanText(body.locale, "ko-KR"),
    ontologyGapFields: cleanArray(body.ontologyGapFields),
    metadata: { source: "plugin_api", privacy: "sanitized_no_pii", raw_text_stored: false },
  };
  const id = await recordSkinCoachEvent(payload);
  return res.status(200).json({ ok: true, id, saved: payload });
}
