import { anonHash, cleanArray, cleanText, cors, parseBody, recordSkinCoachEvent, VercelRequest, VercelResponse } from "./_shared.js";

type RequestBody = {
  skinType?: string;
  concerns?: string[];
  sensitivity?: string;
  budget?: string;
  goalSpeed?: string;
  locale?: string;
  consentForAnalytics?: boolean;
};

const productMap: Record<string, string[]> = {
  "피부결": ["7일 완성 깐달걀 키트", "히알루론산 세럼", "레티날 세럼"],
  "모공": ["AHA/BHA 루틴", "블러 세럼/크림"],
  "잡티": ["트라넥삼산 크림", "비타민 스킨부스터", "알부틴 스킨부스터"],
  "톤": ["비타민 스킨부스터", "블러 크림"],
  "건조": ["히알루론산 스킨부스터 퍼스트 세럼", "스쿠알란 보습 루틴"],
  "트러블": ["PDRN 스킨부스터 세럼", "진정 크림"],
  "민감": ["PDRN 스킨부스터 세럼", "저자극 진정 루틴"],
  "주름": ["레티날 스킨부스터 세럼", "레티날 크림"],
  "화장밀림": ["포쎄라 블러 세럼", "포쎄라 핑크 블러 크림"],
};

function selectProducts(concerns: string[], sensitivity: string) {
  const picked = new Set<string>();
  for (const concern of concerns) {
    for (const [key, products] of Object.entries(productMap)) {
      if (concern.includes(key) || key.includes(concern)) products.forEach((product) => picked.add(product));
    }
  }
  if (picked.size === 0) ["7일 완성 깐달걀 키트", "히알루론산 세럼"].forEach((product) => picked.add(product));
  if (sensitivity === "high" || sensitivity.includes("민감")) {
    return [...picked].filter((product) => !product.includes("AHA") && !product.includes("레티날")).concat(["패치테스트", "저자극 진정 루틴"]).slice(0, 5);
  }
  return [...picked].slice(0, 5);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const body = parseBody<RequestBody>(req.body);
  const concerns = cleanArray(body.concerns);
  const skinType = cleanText(body.skinType, "unknown");
  const sensitivity = cleanText(body.sensitivity, "medium");
  const goalSpeed = cleanText(body.goalSpeed, "7일");
  const locale = cleanText(body.locale, "ko-KR");
  const products = selectProducts(concerns, sensitivity);
  const routineId = sensitivity.includes("high") || sensitivity.includes("민감") ? "sensitive-calming-14day" : goalSpeed.includes("30") ? "skin-coach-30day" : "glass-skin-7day";

  const result = {
    pluginName: "메디테라피 스킨 코치",
    routineId,
    summary: `${skinType} 피부의 ${concerns.join(", ") || "기본 피부결"} 고민을 위한 ${goalSpeed} 루틴입니다.`,
    recommendedProducts: products,
    morning: ["저자극 세안", "수분 세럼", "보습/블러 크림", "자외선 차단"],
    night: sensitivity.includes("high") || sensitivity.includes("민감") ? ["저자극 세안", "진정 세럼", "보습 크림"] : ["세안", "기능성 세럼 격일 사용", "보습 크림"],
    timeline: [
      { day: 1, check: "패치테스트, 따가움/건조함 기록" },
      { day: 3, check: "피부결, 붉음, 트러블 변화 체크" },
      { day: 7, check: "화장 밀착, 피부결, 만족도 평가" },
    ],
    safetyRules: ["자극 점수 3 이상이면 기능성 성분 빈도 줄이기", "새 트러블이 늘면 진정 루틴으로 전환", "민감피부는 레티날/AHA/BHA 동시 사용 금지"],
    analyticsSaved: false,
  };

  if (body.consentForAnalytics) {
    await recordSkinCoachEvent({
      eventType: "routine_recommendation",
      userHash: anonHash({ skinType, concerns, locale }),
      skinType,
      concerns,
      sensitivity,
      routineId,
      productIds: products.map((p) => p.toLowerCase().replace(/[^a-z0-9가-힣]+/gi, "-")),
      satisfactionScore: undefined,
      localeBucket: locale,
      metadata: { source: "plugin_api", privacy: "sanitized_no_pii" },
    });
    result.analyticsSaved = true;
  }

  return res.status(200).json(result);
}
