// Auto-generated from CrabAgent-enhanced Meditherapy product ontology V2.
// Source boundary: public catalog data only. Do not add private customer/account/order/payment data here.

export type ProductFamily = {
  familyKey: string;
  name: string;
  recordCount: number;
  categories: string[];
  concerns: string[];
  ingredients: string[];
  skinTypes: string[];
  routineRoles: string[];
  safetyRules: string[];
  useCases: string[];
  confidence: number;
  exampleUrl?: string | null;
};

export const ontologyBuild = {
  version: "1.1.0",
  source: "meditherapy-product-deep-ontology-v2-crabagent",
  packageId: "f0089d1b-8e64-430d-aa63-14d729bd4071",
  recordsTotal: 223,
  familiesTotal: 86,
  qaScore: 96,
  releaseReady: true,
  artifactSha256: "e90dba5c26bb53061cf7302e2fec5f05595a543d098bc79c676200eb540088f8",
} as const;

export const productFamilies = [
  {
    "familyKey": "tension_up_mask",
    "name": "Tension Up Mask (5ea)",
    "recordCount": 51,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "body_homecare",
      "general_skincare",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "centella",
      "collagen",
      "mugwort",
      "niacinamide",
      "peptide",
      "retinol",
      "tea_tree"
    ],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.95,
    "exampleUrl": "https://meditherapy.co/products/tension-up-mask_fb_251210_1"
  },
  {
    "familyKey": "vitamin_bubble_serum",
    "name": "Vitamin Skin Booster Bubble Serum Non Irritating Gentle Daily Brightening",
    "recordCount": 15,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [
      "tea_tree"
    ],
    "skinTypes": [
      "dull_spot",
      "sensitive"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co/products/vitamin-skin-booster-bubble-serum_fb_260206_4"
  },
  {
    "familyKey": "wrinkle_fit_tangle_eye_patch_ever_collagen_patch_mask",
    "name": "Wrinkle Fit Tangle Eye Patch Ever",
    "recordCount": 13,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_support_barrier_hydration"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co/products/amazon-tangle-eye-patch-250811bd-bundle"
  },
  {
    "familyKey": "wrinkle_fit_tangle_eye_patch_patch_mask",
    "name": "Wrinkle Fit Tangle Eye Patch",
    "recordCount": 10,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_support_barrier_hydration"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co/products/wrinklefit-tangle-eye-patch-model1-copy2-1"
  },
  {
    "familyKey": "shumage_lifting_line",
    "name": "슈마지 골드실 리프팅 크림 단품",
    "recordCount": 9,
    "categories": [
      "cream",
      "patch_mask",
      "product",
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "ceramide",
      "collagen",
      "niacinamide",
      "peptide",
      "retinol",
      "squalane"
    ],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_step_targeted_mask_patch",
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/슈마지-골드실-리프팅-크림-단품/1188/"
  },
  {
    "familyKey": "hyaluronic_acid_serum",
    "name": "Hyaluronic Acid Plump & Glow 1 K Beauty Serum",
    "recordCount": 8,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots",
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen",
      "hyaluronic_acid",
      "niacinamide",
      "retinal",
      "squalane"
    ],
    "skinTypes": [
      "dull_spot",
      "mature",
      "sensitive"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_support_barrier_hydration",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.99,
    "exampleUrl": "https://meditherapy.co/products/amazons-pick-hyaluronic-acid-plump-glow-1-k-beauty-serum-pre"
  },
  {
    "familyKey": "pdrn_skin_booster",
    "name": "PDRN Cica Booster Serum uk",
    "recordCount": 5,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare",
      "sensitive_trouble"
    ],
    "ingredients": [
      "centella",
      "niacinamide",
      "pdrn",
      "tea_tree"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "patch_test_for_sensitive_skin"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "진정/트러블 루틴 후보"
    ],
    "confidence": 0.94,
    "exampleUrl": "https://meditherapy.co/products/amazon-25-19-pdrn-cica-booster-serum-uk"
  },
  {
    "familyKey": "1_retinal_serum_retinal_serum_ampoule",
    "name": "1 Retinal Serum",
    "recordCount": 4,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "탄력/주름 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/amazon-us-retinal-fb"
  },
  {
    "familyKey": "retinal_skin_booster_serum",
    "name": "Retinal Skin Booster Serum",
    "recordCount": 4,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "retinal"
    ],
    "skinTypes": [
      "dull_spot",
      "mature"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/retinal-skin-booster-serum-20ml"
  },
  {
    "familyKey": "squalane_moisturizer",
    "name": "2 Step Korean Glass Skin Duo Retinal & Squalane",
    "recordCount": 3,
    "categories": [
      "kit_routine",
      "product"
    ],
    "concerns": [
      "brightening_spots",
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "hyaluronic_acid",
      "retinal",
      "squalane"
    ],
    "skinTypes": [
      "dry",
      "dull_spot",
      "mature",
      "sensitive"
    ],
    "routineRoles": [
      "routine_support_barrier_hydration",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.91,
    "exampleUrl": "https://meditherapy.co/products/2-step-korean-glass-skin"
  },
  {
    "familyKey": "shumage_gold_seal_lifting_cream_device_collagen_cream_device_homecare",
    "name": "Shumage Gold Seal Lifting Cream + Device",
    "recordCount": 3,
    "categories": [
      "cream",
      "device_homecare"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_device_homecare",
      "routine_step_seal_moisture",
      "routine_support_barrier_hydration"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co/products/amazon-prime-day-start-ad-payment-shumage"
  },
  {
    "familyKey": "1_k_beauty_hyaluronic_serum_day_hyaluronic_acid_serum_ampoule",
    "name": "1 K Beauty Hyaluronic Serum Day",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "hydration_barrier"
    ],
    "ingredients": [
      "hyaluronic_acid"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_support_barrier_hydration"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co/products/amazons-choice-hyaluronic-acid-skin-booster-first-serum_uk_fb"
  },
  {
    "familyKey": "2주_알부틴_스킨부스터_프로그램_niacinamide_serum_ampoule",
    "name": "2주 알부틴 스킨부스터 프로그램",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/광채-토닝-2주-알부틴-스킨부스터-프로그램/1852/"
  },
  {
    "familyKey": "2주_트라넥삼산_스킨부스터_프로그램_niacinamide_serum_ampoule",
    "name": "2주 트라넥삼산 스킨부스터 프로그램",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [
      "niacinamide"
    ],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/기미-집중-2주-트라넥삼산-스킨부스터-프로그램/1861/"
  },
  {
    "familyKey": "r_b_mat_device_homecare",
    "name": "R&B MAT",
    "recordCount": 2,
    "categories": [
      "device_homecare"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_device_homecare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "일반 스킨케어 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co.kr/product/rb-mat/1344/"
  },
  {
    "familyKey": "wrinkle_fit_mask_collagen_patch_mask",
    "name": "Wrinkle fit Mask( )",
    "recordCount": 2,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "brightening_spots",
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "dull_spot",
      "mature"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_support_barrier_hydration"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co/products/wrinkle-fit-maskhidden"
  },
  {
    "familyKey": "glass_skin_texture_kit",
    "name": "깐달걀 키트",
    "recordCount": 2,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "texture_pores"
    ],
    "ingredients": [
      "hyaluronic_acid",
      "niacinamide",
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "피부결/모공 루틴 후보",
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/7일-완성-깐달걀-키트/2087/"
  },
  {
    "familyKey": "레티날_스킨부스터_세럼_centella_ceramide_niacinamide_retinal_serum_ampoule",
    "name": "레티날 스킨부스터 세럼",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "centella",
      "ceramide",
      "niacinamide",
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/100-환불-가능포니-pick-레티날-스킨부스터-세럼/1826/"
  },
  {
    "familyKey": "레티날_스킨부스터_크림_ceramide_niacinamide_retinal_squalane_cream_serum_ampoule",
    "name": "레티날 스킨부스터 크림",
    "recordCount": 2,
    "categories": [
      "cream",
      "serum_ampoule"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "ceramide",
      "niacinamide",
      "retinal",
      "squalane"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/레티날-스킨부스터-크림/2148/"
  },
  {
    "familyKey": "링클핏_centella_collagen_peptide_tea_tree_product",
    "name": "링클핏",
    "recordCount": 2,
    "categories": [
      "product"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "centella",
      "collagen",
      "peptide",
      "tea_tree"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보"
    ],
    "confidence": 0.71,
    "exampleUrl": "https://meditherapy.co.kr/product/링클핏/1328/"
  },
  {
    "familyKey": "wrinklefit_tangle_eye_patch",
    "name": "링클핏 탱글 아이패치",
    "recordCount": 2,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "sensitive_trouble"
    ],
    "ingredients": [
      "ceramide",
      "collagen",
      "mugwort",
      "niacinamide",
      "peptide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch"
    ],
    "safetyRules": [
      "patch_test_for_sensitive_skin"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "진정/트러블 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/링클핏-탱글-아이패치/1662/"
  },
  {
    "familyKey": "바하_파하_루틴_토너_aha_bha_peptide_cleanser_toner_kit_routine",
    "name": "바하 파하 루틴 토너",
    "recordCount": 2,
    "categories": [
      "cleanser_toner",
      "kit_routine"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "aha_bha",
      "peptide"
    ],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_cleanse_or_prep",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "start_gradually_and_check_irritation"
    ],
    "useCases": [
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/바하-파하-루틴-토너/1941/"
  },
  {
    "familyKey": "블루레이어_더블_워터크림_niacinamide_squalane_cream",
    "name": "블루레이어 더블 워터크림",
    "recordCount": 2,
    "categories": [
      "cream"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "niacinamide",
      "squalane"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/블루레이어-더블-워터크림/1218/"
  },
  {
    "familyKey": "비타_리얼_샷_클리어_패치_niacinamide_peptide_patch_mask",
    "name": "비타 리얼 샷 클리어 패치",
    "recordCount": 2,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "brightening_spots",
      "sensitive_trouble"
    ],
    "ingredients": [
      "niacinamide",
      "peptide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch"
    ],
    "safetyRules": [
      "patch_test_for_sensitive_skin"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "진정/트러블 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/비타-리얼-샷-클리어-패치/1318/"
  },
  {
    "familyKey": "세럼_디스커버리_트리오_centella_niacinamide_serum_ampoule",
    "name": "세럼 디스커버리 트리오",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "centella",
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/just-try-세럼-디스커버리-트리오/2047/"
  },
  {
    "familyKey": "스쿠알란_스킨부스터_모이스처라이저_niacinamide_squalane_serum_ampoule",
    "name": "스쿠알란 스킨부스터 모이스처라이저",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "niacinamide",
      "squalane"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/스쿠알란-스킨부스터-모이스처라이저/2061/"
  },
  {
    "familyKey": "아하_바하_루틴_클렌저_aha_bha_tea_tree_cleanser_toner_kit_routine",
    "name": "아하 바하 루틴 클렌저",
    "recordCount": 2,
    "categories": [
      "cleanser_toner",
      "kit_routine"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "aha_bha",
      "tea_tree"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_cleanse_or_prep",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "start_gradually_and_check_irritation"
    ],
    "useCases": [
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/big-size-출시-아하-바하-루틴-클렌저/1940/"
  },
  {
    "familyKey": "유리알_키트_hyaluronic_acid_kit_routine_serum_ampoule",
    "name": "유리알 키트",
    "recordCount": 2,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "hyaluronic_acid"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.87,
    "exampleUrl": "https://meditherapy.co.kr/product/포니-pick-7일-완성-유리알-키트/2218/"
  },
  {
    "familyKey": "토타롤_코어_부스터_스프레이_세럼_serum_ampoule",
    "name": "토타롤 코어 부스터 스프레이 세럼",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "일반 스킨케어 후보"
    ],
    "confidence": 0.65,
    "exampleUrl": "https://meditherapy.co.kr/product/100-환불-가능-토타롤-코어-부스터-스프레이-세럼/2245/"
  },
  {
    "familyKey": "포쎄라_리얼_비피다_블러_세럼_niacinamide_peptide_cream_serum_ampoule",
    "name": "포쎄라 리얼 비피다 블러 세럼",
    "recordCount": 2,
    "categories": [
      "cream",
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "niacinamide",
      "peptide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/포쎄라-리얼-비피다-블러-세럼/2190/"
  },
  {
    "familyKey": "포쎄라_리얼_비피다_블러_크림_centella_niacinamide_cream",
    "name": "포쎄라 리얼 비피다 블러 크림",
    "recordCount": 2,
    "categories": [
      "cream"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "centella",
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/셀링라이프-윤보미-pick-포쎄라-리얼-비피다-블러-크림/1728/"
  },
  {
    "familyKey": "포쎄라_리얼_비피다_핑크_블러_크림_centella_niacinamide_cream",
    "name": "포쎄라 리얼 비피다 핑크 블러 크림",
    "recordCount": 2,
    "categories": [
      "cream"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "centella",
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/포쎄라-리얼-비피다-핑크-블러-크림/2202/"
  },
  {
    "familyKey": "필리지오_핑크_레티놀_볼륨_크림_단품_niacinamide_retinol_cream",
    "name": "필리지오 핑크 레티놀 볼륨 크림 단품",
    "recordCount": 2,
    "categories": [
      "cream"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "niacinamide",
      "retinol"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/필리지오-핑크-레티놀-볼륨-크림-단품/1540/"
  },
  {
    "familyKey": "필리지오_핑크_레티놀_샷_세럼_niacinamide_retinol_serum_ampoule",
    "name": "필리지오 핑크 레티놀 샷 세럼",
    "recordCount": 2,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "niacinamide",
      "retinol"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/필리지오-핑크-레티놀-샷-세럼/1573/"
  },
  {
    "familyKey": "1_retinal_serum_dark_spot_wrinkle_care_retinal_serum_ampoule",
    "name": "1 Retinal Serum Dark Spot & Wrinkle care",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "retinal"
    ],
    "skinTypes": [
      "dull_spot",
      "mature"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/amazon-us-retinal-fb-pre"
  },
  {
    "familyKey": "3_step_korean_glass_skin_set_xxl_5_07_fl_oz_3_hyaluronic_acid_retinal_squalane_k",
    "name": "3 Step Korean Glass Skin Set XXL 5.07 fl oz × 3",
    "recordCount": 1,
    "categories": [
      "kit_routine"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "hyaluronic_acid",
      "retinal",
      "squalane"
    ],
    "skinTypes": [
      "mature",
      "sensitive"
    ],
    "routineRoles": [
      "routine_support_barrier_hydration",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/3-step-korean-glass-skin-set-xxl"
  },
  {
    "familyKey": "3개월_대용량_깐달걀_루틴_hyaluronic_acid_niacinamide_retinal_kit_routine_serum_ampoule",
    "name": "3개월 대용량 ㅣ 깐달걀 루틴",
    "recordCount": 1,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "texture_pores"
    ],
    "ingredients": [
      "hyaluronic_acid",
      "niacinamide",
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "피부결/모공 루틴 후보",
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/set-3개월-대용량-ㅣ-깐달걀-루틴/2162/"
  },
  {
    "familyKey": "aha_bha_daily_exfoliating_cleanser_aha_bha_cleanser_toner",
    "name": "AHA BHA Daily Exfoliating Cleanser",
    "recordCount": 1,
    "categories": [
      "cleanser_toner"
    ],
    "concerns": [
      "texture_pores"
    ],
    "ingredients": [
      "aha_bha"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_cleanse_or_prep",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "피부결/모공 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/aha-bha-routine-cleanser"
  },
  {
    "familyKey": "cleansing_skincare_set_of_5_hyaluronic_acid_retinal_squalane_cleanser_toner_kit_",
    "name": "Cleansing & Skincare Set of 5",
    "recordCount": 1,
    "categories": [
      "cleanser_toner",
      "kit_routine"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "hyaluronic_acid",
      "retinal",
      "squalane"
    ],
    "skinTypes": [
      "mature",
      "sensitive"
    ],
    "routineRoles": [
      "routine_step_cleanse_or_prep",
      "routine_support_barrier_hydration",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/mega-deal-cleansing-skincare-set-of-5"
  },
  {
    "familyKey": "collagen_wrinkle_repair_eye_duo_collagen_kit_routine",
    "name": "Collagen Wrinkle Repair Eye Duo",
    "recordCount": 1,
    "categories": [
      "kit_routine"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co/products/collagen-wrinkle-repair-eye-duo"
  },
  {
    "familyKey": "complete_skincare_set_of_7_hyaluronic_acid_retinal_squalane_kit_routine",
    "name": "Complete Skincare Set of 7",
    "recordCount": 1,
    "categories": [
      "kit_routine"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "hyaluronic_acid",
      "retinal",
      "squalane"
    ],
    "skinTypes": [
      "mature",
      "sensitive"
    ],
    "routineRoles": [
      "routine_support_barrier_hydration",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/mega-deal-complete-skincare-set-of-7"
  },
  {
    "familyKey": "dark_spot_reset_routine_set_kit_routine",
    "name": "Dark Spot Reset Routine Set",
    "recordCount": 1,
    "categories": [
      "kit_routine"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co/products/dark-spot-reset-routine-set"
  },
  {
    "familyKey": "firming_lifting_3_step_set_kit_routine",
    "name": "Firming & Lifting 3 Step Set",
    "recordCount": 1,
    "categories": [
      "kit_routine"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co/products/firming-lifting-3-step-set"
  },
  {
    "familyKey": "mugwort_super_calming_toner_mugwort_cleanser_toner",
    "name": "Mugwort Super Calming Toner",
    "recordCount": 1,
    "categories": [
      "cleanser_toner"
    ],
    "concerns": [
      "sensitive_trouble"
    ],
    "ingredients": [
      "mugwort"
    ],
    "skinTypes": [
      "dull_spot",
      "sensitive"
    ],
    "routineRoles": [
      "routine_step_cleanse_or_prep"
    ],
    "safetyRules": [
      "patch_test_for_sensitive_skin",
      "sensitive_patch_test"
    ],
    "useCases": [
      "진정/트러블 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/30-off-on-amazon-mugwort-super-calming-toner-copy"
  },
  {
    "familyKey": "nr_1_retinal_serum_exklusiv_retinal_serum_ampoule",
    "name": "Nr. 1 Retinal Serum Exklusiv",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "탄력/주름 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/amazon_retinal-skin-booster-serum_de_fb"
  },
  {
    "familyKey": "retinal_cream_glass_skin_texture_retinal_cream_serum_ampoule",
    "name": "Retinal Cream Glass Skin Texture",
    "recordCount": 1,
    "categories": [
      "cream",
      "serum_ampoule"
    ],
    "concerns": [
      "texture_pores",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "피부결/모공 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/amazon-us-retinal-cream-fb"
  },
  {
    "familyKey": "retinal_skin_booster_all_in_one_glow_reset_xxl_5_fl_oz_retinal_kit_routine_serum",
    "name": "Retinal Skin Booster All in One Glow Reset (XXL 5 fl oz)",
    "recordCount": 1,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "retinal"
    ],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/retinal-skin-booster-serum-1"
  },
  {
    "familyKey": "shumage_device_device_homecare",
    "name": "Shumage Device",
    "recordCount": 1,
    "categories": [
      "device_homecare"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_device_homecare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "일반 스킨케어 후보"
    ],
    "confidence": 0.65,
    "exampleUrl": "https://meditherapy.co/products/shumage-device"
  },
  {
    "familyKey": "shumage_gold_seal_lifting_cream_device_cream_device_homecare",
    "name": "Shumage Gold Seal Lifting Cream + Device",
    "recordCount": 1,
    "categories": [
      "cream",
      "device_homecare"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_device_homecare",
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co/products/medietherapy-x-lisa-shumage-gold-seal-lifting-cream-em-device"
  },
  {
    "familyKey": "tension_up_collagen_mask_collagen_patch_mask",
    "name": "Tension Up Collagen Mask",
    "recordCount": 1,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co/products/tension-up-collagen-mask-test"
  },
  {
    "familyKey": "tension_up_collagen_mask_3_1_v_line_lifting_hydrating_facial_mask_for_baby_soft_",
    "name": "Tension Up Collagen Mask 3+1 V Line Lifting & Hydrating Facial Mask for Baby Soft Skin",
    "recordCount": 1,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "dry",
      "mature"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_support_barrier_hydration"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co/products/secret-link-tension-up-collagen-mask-3-1-v-line-lifting-hydrating-facial-mask-for-baby-soft-skin"
  },
  {
    "familyKey": "vitamin_bubble_serum_even_tone_dark_spot_serum_ampoule",
    "name": "Vitamin Bubble Serum Even Tone & Dark Spot",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co/products/amazon-us-vitamin-skin-booster-bubble-serum-fb"
  },
  {
    "familyKey": "wrinklefit_tangle_eye_patch_patch_mask",
    "name": "Wrinklefit Tangle Eye Patch",
    "recordCount": 1,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "hydration_barrier",
      "wrinkle_elasticity"
    ],
    "ingredients": [],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_support_barrier_hydration"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co/products/wrinklefit-tangle-eye-patch-bna1"
  },
  {
    "familyKey": "n_1_s_rum_de_retinal_exclusivo_retinal_serum_ampoule",
    "name": "n.º 1 Sérum de Retinal Exclusivo",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "탄력/주름 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co/products/amazon-us-retinal-fb-esp"
  },
  {
    "familyKey": "글로벌_1위_레티날_마스터_루틴_centella_ceramide_niacinamide_retinal_kit_routine_serum_ampoul",
    "name": "글로벌 1위 ㅣ레티날 마스터 루틴",
    "recordCount": 1,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "centella",
      "ceramide",
      "niacinamide",
      "retinal"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/set-글로벌-1위-ㅣ레티날-마스터-루틴/2164/"
  },
  {
    "familyKey": "글로벌_1위_흔적_리페어_루틴_centella_ceramide_niacinamide_kit_routine",
    "name": "글로벌 1위 흔적 리페어 루틴",
    "recordCount": 1,
    "categories": [
      "kit_routine"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "centella",
      "ceramide",
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/set-포니-pick-글로벌-1위-흔적-리페어-루틴/2059/"
  },
  {
    "familyKey": "데일리_수분필_루틴_aha_bha_tea_tree_cleanser_toner_kit_routine",
    "name": "데일리 수분필 루틴",
    "recordCount": 1,
    "categories": [
      "cleanser_toner",
      "kit_routine"
    ],
    "concerns": [
      "hydration_barrier"
    ],
    "ingredients": [
      "aha_bha",
      "tea_tree"
    ],
    "skinTypes": [
      "dry",
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_cleanse_or_prep",
      "routine_support_barrier_hydration",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "start_gradually_and_check_irritation"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/set-데일리-수분필-루틴/2201/"
  },
  {
    "familyKey": "동안_얼굴_관리_패키지_collagen_niacinamide_peptide_serum_ampoule",
    "name": "동안 얼굴 관리 패키지",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen",
      "niacinamide",
      "peptide"
    ],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/동안-얼굴-관리-패키지/1176/"
  },
  {
    "familyKey": "리프미_괄사_cream",
    "name": "리프미 괄사",
    "recordCount": 1,
    "categories": [
      "cream"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co.kr/product/리프미-괄사/598/"
  },
  {
    "familyKey": "멜라쥬란_화이트_토닝_크림_niacinamide_squalane_cream",
    "name": "멜라쥬란 화이트 토닝 크림",
    "recordCount": 1,
    "categories": [
      "cream"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "niacinamide",
      "squalane"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/멜라쥬란-화이트-토닝-크림/1512/"
  },
  {
    "familyKey": "멜라쥬란_화이트_토닝_크림_단품_niacinamide_squalane_cream",
    "name": "멜라쥬란 화이트 토닝 크림 단품",
    "recordCount": 1,
    "categories": [
      "cream"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "niacinamide",
      "squalane"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/멜라쥬란-화이트-토닝-크림-단품/1815/"
  },
  {
    "familyKey": "바디_클리어_루틴_aha_bha_niacinamide_retinal_kit_routine_patch_mask_serum_ampoule",
    "name": "바디 클리어 루틴",
    "recordCount": 1,
    "categories": [
      "kit_routine",
      "patch_mask",
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "aha_bha",
      "niacinamide",
      "retinal"
    ],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/set-바디-클리어-루틴/2242/"
  },
  {
    "familyKey": "브이_스핀_product",
    "name": "브이 스핀",
    "recordCount": 1,
    "categories": [
      "product"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "일반 스킨케어 후보"
    ],
    "confidence": 0.53,
    "exampleUrl": "https://meditherapy.co.kr/product/브이-스핀/808/"
  },
  {
    "familyKey": "블루센텔라_카밍_크림_centella_niacinamide_cream",
    "name": "블루센텔라 카밍 크림",
    "recordCount": 1,
    "categories": [
      "cream"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "centella",
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/블루센텔라-카밍-크림/1448/"
  },
  {
    "familyKey": "비타_콜라겐_필터_클린_필터_collagen_product",
    "name": "비타 콜라겐 필터 & 클린 필터",
    "recordCount": 1,
    "categories": [
      "product"
    ],
    "concerns": [
      "brightening_spots",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.86,
    "exampleUrl": "https://meditherapy.co.kr/product/비타-콜라겐-필터-클린-필터/813/"
  },
  {
    "familyKey": "비타_콜라겐_필터_샤워기_collagen_product",
    "name": "비타 콜라겐 필터 샤워기",
    "recordCount": 1,
    "categories": [
      "product"
    ],
    "concerns": [
      "body_homecare",
      "brightening_spots",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_general_skincare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.86,
    "exampleUrl": "https://meditherapy.co.kr/product/비타-콜라겐-필터-샤워기/812/"
  },
  {
    "familyKey": "생기_충전_루틴_hyaluronic_acid_kit_routine_serum_ampoule",
    "name": "생기 충전 루틴",
    "recordCount": 1,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "hyaluronic_acid"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.87,
    "exampleUrl": "https://meditherapy.co.kr/product/set-포니-pick-생기-충전-루틴/2156/"
  },
  {
    "familyKey": "속살스핀_device_homecare",
    "name": "속살스핀",
    "recordCount": 1,
    "categories": [
      "device_homecare"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_device_homecare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "일반 스킨케어 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co.kr/product/속살스핀/153/"
  },
  {
    "familyKey": "속살스핀_3종_롤러_device_homecare",
    "name": "속살스핀 3종 롤러",
    "recordCount": 1,
    "categories": [
      "device_homecare"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_device_homecare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "일반 스킨케어 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co.kr/product/속살스핀-3종-롤러/238/"
  },
  {
    "familyKey": "속살제로_device_homecare",
    "name": "속살제로",
    "recordCount": 1,
    "categories": [
      "device_homecare"
    ],
    "concerns": [
      "body_homecare",
      "wrinkle_elasticity"
    ],
    "ingredients": [],
    "skinTypes": [
      "mature"
    ],
    "routineRoles": [
      "routine_step_device_homecare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co.kr/product/속살제로/281/"
  },
  {
    "familyKey": "속살터치_device_homecare",
    "name": "속살터치",
    "recordCount": 1,
    "categories": [
      "device_homecare"
    ],
    "concerns": [
      "texture_pores"
    ],
    "ingredients": [],
    "skinTypes": [
      "oily_acne"
    ],
    "routineRoles": [
      "routine_step_device_homecare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "피부결/모공 루틴 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co.kr/product/속살터치/297/"
  },
  {
    "familyKey": "아하_바하_롱롱_패드_aha_bha_niacinamide_patch_mask",
    "name": "아하 바하 롱롱 패드",
    "recordCount": 1,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "aha_bha",
      "niacinamide"
    ],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "start_gradually_and_check_irritation"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/100-환불-가능-아하-바하-롱롱-패드/2221/"
  },
  {
    "familyKey": "알부틴_스킨부스터_세럼_niacinamide_serum_ampoule",
    "name": "알부틴 스킨부스터 세럼",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/알부틴-스킨부스터-세럼/1873/"
  },
  {
    "familyKey": "예쁜_생얼_루틴_한정_에디션_niacinamide_peptide_cream_kit_routine_serum_ampoule",
    "name": "예쁜 생얼 루틴ㅣ한정 에디션",
    "recordCount": 1,
    "categories": [
      "cream",
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "niacinamide",
      "peptide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/set-예쁜-생얼-루틴ㅣ한정-에디션/2204/"
  },
  {
    "familyKey": "와일드_로즈_캡슐_플럼핑_세럼_aha_bha_niacinamide_patch_mask_serum_ampoule",
    "name": "와일드 로즈 캡슐 플럼핑 세럼",
    "recordCount": 1,
    "categories": [
      "patch_mask",
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "aha_bha",
      "niacinamide"
    ],
    "skinTypes": [
      "dull_spot"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_step_treatment",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "start_gradually_and_check_irritation"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/와일드-로즈-캡슐-플럼핑-세럼/1472/"
  },
  {
    "familyKey": "유리알_루틴_hyaluronic_acid_kit_routine_serum_ampoule",
    "name": "유리알 루틴",
    "recordCount": 1,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "hyaluronic_acid"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "sun_care_recommended"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.87,
    "exampleUrl": "https://meditherapy.co.kr/product/set포니-pick-유리알-루틴/2200/"
  },
  {
    "familyKey": "유자_비타민c_20_글로우_세럼_vitamin_c_serum_ampoule",
    "name": "유자 비타민C 20 글로우 세럼",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [
      "vitamin_c"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/유자-비타민c-20-글로우-세럼/1464/"
  },
  {
    "familyKey": "재구매율_1위_급속_진정_루틴_centella_niacinamide_pdrn_squalane_tea_tree_kit_routine_serum_a",
    "name": "재구매율 1위ㅣ급속 진정 루틴",
    "recordCount": 1,
    "categories": [
      "kit_routine",
      "serum_ampoule"
    ],
    "concerns": [
      "sensitive_trouble"
    ],
    "ingredients": [
      "centella",
      "niacinamide",
      "pdrn",
      "squalane",
      "tea_tree"
    ],
    "skinTypes": [
      "sensitive"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "patch_test_for_sensitive_skin"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보",
      "진정/트러블 루틴 후보",
      "7일/14일/30일 세트 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/set-재구매율-1위ㅣ급속-진정-루틴/2116/"
  },
  {
    "familyKey": "최대_85_메디_라스트_특가_collagen_niacinamide_peptide_patch_mask_serum_ampoule",
    "name": "최대 85% 메디 라스트 특가!",
    "recordCount": 1,
    "categories": [
      "patch_mask",
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "collagen",
      "niacinamide",
      "peptide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch",
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/최대-85메디-라스트-특가/1673/"
  },
  {
    "familyKey": "콜라겐_멜팅_패치_이마_collagen_peptide_patch_mask",
    "name": "콜라겐 멜팅 패치 이마",
    "recordCount": 1,
    "categories": [
      "patch_mask"
    ],
    "concerns": [
      "sensitive_trouble",
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen",
      "peptide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_targeted_mask_patch"
    ],
    "safetyRules": [
      "patch_test_for_sensitive_skin"
    ],
    "useCases": [
      "탄력/주름 루틴 후보",
      "진정/트러블 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/콜라겐-멜팅-패치-이마/825/"
  },
  {
    "familyKey": "콜라겐_펩타이드_12x_부스팅_세럼_collagen_mugwort_niacinamide_peptide_serum_ampoule",
    "name": "콜라겐 펩타이드 12X 부스팅 세럼",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "wrinkle_elasticity"
    ],
    "ingredients": [
      "collagen",
      "mugwort",
      "niacinamide",
      "peptide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보",
      "탄력/주름 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/콜라겐-펩타이드-12x-부스팅-세럼/1465/"
  },
  {
    "familyKey": "트라넥삼산_스킨부스터_크림_niacinamide_cream_serum_ampoule",
    "name": "트라넥삼산 스킨부스터 크림",
    "recordCount": 1,
    "categories": [
      "cream",
      "serum_ampoule"
    ],
    "concerns": [
      "brightening_spots"
    ],
    "ingredients": [
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.98,
    "exampleUrl": "https://meditherapy.co.kr/product/트라넥삼산-스킨부스터-크림/1884/"
  },
  {
    "familyKey": "포쎄라_샷_엑소좀_스피큘_세럼_단품_centella_niacinamide_serum_ampoule",
    "name": "포쎄라 샷 엑소좀 스피큘 세럼 단품",
    "recordCount": 1,
    "categories": [
      "serum_ampoule"
    ],
    "concerns": [
      "general_skincare"
    ],
    "ingredients": [
      "centella",
      "niacinamide"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_treatment"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "수분장벽 루틴 후보",
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.83,
    "exampleUrl": "https://meditherapy.co.kr/product/포쎄라-샷-엑소좀-스피큘-세럼-단품/1470/"
  },
  {
    "familyKey": "포인트매트_device_homecare",
    "name": "포인트매트",
    "recordCount": 1,
    "categories": [
      "device_homecare"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_device_homecare"
    ],
    "safetyRules": [
      "none_detected"
    ],
    "useCases": [
      "일반 스킨케어 후보"
    ],
    "confidence": 0.8,
    "exampleUrl": "https://meditherapy.co.kr/product/포인트매트/349/"
  },
  {
    "familyKey": "필리지오_핑크_레티놀_볼륨_niacinamide_retinol_product",
    "name": "필리지오 핑크 레티놀 볼륨",
    "recordCount": 1,
    "categories": [
      "product"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "niacinamide",
      "retinol"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 0.9,
    "exampleUrl": "https://meditherapy.co.kr/product/한정판-필리지오-핑크-레티놀-볼륨/1796/"
  },
  {
    "familyKey": "필리지오_핑크_레티놀_볼륨_크림_niacinamide_retinol_cream",
    "name": "필리지오 핑크 레티놀 볼륨 크림",
    "recordCount": 1,
    "categories": [
      "cream"
    ],
    "concerns": [
      "body_homecare"
    ],
    "ingredients": [
      "niacinamide",
      "retinol"
    ],
    "skinTypes": [
      "not_enough_evidence"
    ],
    "routineRoles": [
      "routine_step_seal_moisture",
      "routine_timing_prefer_pm_or_gradual"
    ],
    "safetyRules": [
      "active_ingredient_caution",
      "prefer_pm_use_and_daytime_sunscreen",
      "start_gradually_and_check_irritation",
      "sun_care_recommended"
    ],
    "useCases": [
      "잡티/톤 루틴 후보"
    ],
    "confidence": 1.0,
    "exampleUrl": "https://meditherapy.co.kr/product/필리지오-핑크-레티놀-볼륨-크림/1679/"
  }
] satisfies ProductFamily[];
