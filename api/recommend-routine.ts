import { anonHash, cleanArray, cleanText, cors, parseBody, recordSkinCoachEvent, VercelRequest, VercelResponse } from "./_shared.js";
import { ontologyBuild, productFamilies, ProductFamily } from "./product-ontology-v2.js";

type RequestBody = {
  skinType?: string;
  concerns?: string[];
  sensitivity?: string;
  budget?: string;
  goalSpeed?: string;
  locale?: string;
  consentForAnalytics?: boolean;
};

type RankedProduct = ProductFamily & {
  score: number;
  matchedSignals: string[];
};

const concernAliases: Record<string, string[]> = {
  texture_pores: ["피부결", "모공", "각질", "요철", "블랙헤드", "texture", "pore"],
  brightening_spots: ["잡티", "기미", "톤", "미백", "광채", "dark spot", "brightening"],
  hydration_barrier: ["건조", "수분", "보습", "장벽", "속건조", "hydration", "barrier"],
  sensitive_trouble: ["트러블", "민감", "붉", "홍조", "진정", "여드름", "sensitive", "trouble", "acne"],
  wrinkle_elasticity: ["주름", "탄력", "리프팅", "안티에이징", "wrinkle", "elastic", "lifting"],
  body_homecare: ["바디", "붓기", "셀룰", "라인", "body"],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function targetConcerns(concerns: string[]) {
  const targets = new Set<string>();
  const joined = normalize(concerns.join(" "));
  for (const [ontologyConcern, aliases] of Object.entries(concernAliases)) {
    if (aliases.some((alias) => joined.includes(normalize(alias)))) targets.add(ontologyConcern);
  }
  if (targets.size === 0) targets.add("general_skincare");
  return targets;
}

function isHighSensitivity(sensitivity: string) {
  return ["high", "민감", "sensitive"].some((token) => normalize(sensitivity).includes(normalize(token)));
}

function containsActiveIngredient(product: ProductFamily) {
  return product.ingredients.some((ingredient) => ["retinal", "retinol", "aha_bha", "vitamin_c"].includes(ingredient));
}

function rankProducts(concerns: string[], sensitivity: string, goalSpeed: string): RankedProduct[] {
  const targets = targetConcerns(concerns);
  const highSensitivity = isHighSensitivity(sensitivity);
  const wantsFastRoutine = /7|빠른|fast/i.test(goalSpeed);

  return productFamilies
    .map((product) => {
      const matchedSignals: string[] = [];
      let score = product.confidence * 20 + Math.min(product.recordCount, 12);

      for (const concern of product.concerns) {
        if (targets.has(concern)) {
          score += 35;
          matchedSignals.push(`concern:${concern}`);
        }
      }

      if (targets.has("sensitive_trouble") && product.ingredients.some((ingredient) => ["centella", "pdrn", "tea_tree", "ceramide"].includes(ingredient))) {
        score += 16;
        matchedSignals.push("calming_ingredient_cue");
      }

      if (targets.has("hydration_barrier") && product.ingredients.some((ingredient) => ["hyaluronic_acid", "squalane", "ceramide", "centella"].includes(ingredient))) {
        score += 14;
        matchedSignals.push("barrier_ingredient_cue");
      }

      if (targets.has("brightening_spots") && product.ingredients.some((ingredient) => ["niacinamide", "vitamin_c"].includes(ingredient))) {
        score += 12;
        matchedSignals.push("brightening_ingredient_cue");
      }

      if (targets.has("texture_pores") && product.ingredients.some((ingredient) => ["aha_bha", "retinal", "niacinamide"].includes(ingredient))) {
        score += 12;
        matchedSignals.push("texture_ingredient_cue");
      }

      if (wantsFastRoutine && product.categories.includes("kit_routine")) {
        score += 10;
        matchedSignals.push("fast_routine_kit");
      }

      if (highSensitivity) {
        if (product.concerns.includes("sensitive_trouble")) score += 14;
        if (containsActiveIngredient(product)) {
          score -= 22;
          matchedSignals.push("active_ingredient_penalty_for_sensitive_skin");
        }
      }

      return { ...product, score: Math.round(score), matchedSignals };
    })
    .filter((product) => product.matchedSignals.length > 0 || product.concerns.includes("general_skincare"))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function buildRoutineId(sensitivity: string, goalSpeed: string, rankedProducts: RankedProduct[]) {
  if (isHighSensitivity(sensitivity)) return "sensitive-calming-14day";
  if (goalSpeed.includes("30")) return "skin-coach-30day";
  if (rankedProducts.some((product) => product.categories.includes("kit_routine"))) return "ontology-guided-7day-routine";
  return "skin-coach-ontology-v2";
}

function mergedSafetyRules(products: RankedProduct[], sensitivity: string) {
  const rules = new Set<string>([
    "자극 점수 3 이상이면 기능성 성분 빈도 줄이기",
    "새 트러블이 늘면 진정 루틴으로 전환",
  ]);
  for (const product of products) {
    for (const rule of product.safetyRules) {
      if (rule === "active_ingredient_caution") rules.add("레티날/레티놀/AHA/BHA 등 액티브 성분은 낮은 빈도부터 시작");
      if (rule === "prefer_pm_use_and_daytime_sunscreen") rules.add("레티날/레티놀 제품은 저녁 사용 중심, 낮에는 자외선 차단");
      if (rule === "start_gradually_and_check_irritation") rules.add("처음 3일은 건조함·따가움·붉어짐을 체크");
      if (rule === "patch_test_for_sensitive_skin") rules.add("민감피부는 얼굴 전체 사용 전 패치테스트");
      if (rule === "sun_care_recommended") rules.add("낮 루틴에는 자외선 차단 포함");
    }
  }
  if (isHighSensitivity(sensitivity)) rules.add("민감피부는 레티날/AHA/BHA 동시 사용 금지");
  return [...rules].slice(0, 8);
}

function buildGptTodoPlan(routineId: string, products: RankedProduct[], sensitivity: string) {
  const firstProduct = products[0]?.name ?? "메디테라피 추천 루틴";
  const highSensitivity = isHighSensitivity(sensitivity);
  return [
    {
      id: `${routineId}-day-1-patch-test`,
      title: `Day 1: ${firstProduct} 패치테스트 및 첫 사용 기록`,
      dueInDays: 1,
      checklist: ["팔 안쪽 또는 턱 라인에 소량 테스트", "따가움/붉음/건조함 0~5점 기록", highSensitivity ? "얼굴 전체 사용은 내일 이후로 보류" : "문제 없으면 저녁 루틴에 소량 사용"],
    },
    {
      id: `${routineId}-day-3-irritation-check`,
      title: "Day 3: 자극/트러블/건조함 체크",
      dueInDays: 3,
      checklist: ["피부결·붉음·트러블 변화 확인", "자극 점수 3 이상이면 기능성 성분 빈도 줄이기", "불편하면 진정/장벽 루틴으로 전환"],
    },
    {
      id: `${routineId}-day-7-result-review`,
      title: "Day 7: 화장 밀착/피부결/만족도 리뷰",
      dueInDays: 7,
      checklist: ["화장 밀착도와 피부결 변화 평가", "만족도 1~5점 기록", "계속 사용/빈도 조정/루틴 변경 중 선택"],
    },
  ];
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
  const rankedProducts = rankProducts(concerns, sensitivity, goalSpeed);
  const recommendedProducts = rankedProducts.map((product) => product.name);
  const routineId = buildRoutineId(sensitivity, goalSpeed, rankedProducts);

  const result = {
    pluginName: "메디테라피 스킨 코치",
    routineId,
    summary: `${skinType} 피부의 ${concerns.join(", ") || "기본 피부결"} 고민을 위한 ${goalSpeed} 온톨로지 기반 루틴입니다.`,
    recommendedProducts,
    recommendedProductDetails: rankedProducts.map((product) => ({
      familyKey: product.familyKey,
      name: product.name,
      score: product.score,
      confidence: product.confidence,
      concerns: product.concerns,
      ingredients: product.ingredients,
      useCases: product.useCases,
      matchedSignals: product.matchedSignals,
      exampleUrl: product.exampleUrl,
    })),
    morning: ["저자극 세안", "수분/장벽 세럼", "보습 또는 블러 크림", "자외선 차단"],
    night: isHighSensitivity(sensitivity) ? ["저자극 세안", "진정/장벽 세럼", "보습 크림"] : ["세안", "온톨로지 추천 기능성 제품 격일 사용", "보습 크림"],
    timeline: [
      { day: 1, check: "패치테스트, 따가움/건조함 기록" },
      { day: 3, check: "피부결, 붉음, 트러블 변화 체크" },
      { day: 7, check: "화장 밀착, 피부결, 만족도 평가" },
    ],
    gptTodoPlan: buildGptTodoPlan(routineId, rankedProducts, sensitivity),
    todoIntegrationStatus: "ready_for_chatgpt_tasks_when_native_tasks_tool_is_available",
    safetyRules: mergedSafetyRules(rankedProducts, sensitivity),
    ontology: {
      version: ontologyBuild.version,
      packageId: ontologyBuild.packageId,
      source: ontologyBuild.source,
      recordsTotal: ontologyBuild.recordsTotal,
      familiesTotal: ontologyBuild.familiesTotal,
      qaScore: ontologyBuild.qaScore,
      releaseReady: ontologyBuild.releaseReady,
      rankingMode: "local_crabagent_v2_family_rerank",
    },
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
      productIds: rankedProducts.map((product) => product.familyKey),
      satisfactionScore: undefined,
      localeBucket: locale,
      metadata: { source: "plugin_api", privacy: "sanitized_no_pii", ontologyVersion: ontologyBuild.version, rankingMode: "local_crabagent_v2_family_rerank" },
    });
    result.analyticsSaved = true;
  }

  return res.status(200).json(result);
}
