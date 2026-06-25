# 메디테라피 스킨 코치 플러그인

**메디테라피 스킨 코치**는 고객의 피부고민을 제품 추천에서 끝내지 않고, 개인 루틴 추천 → GPT 할 일/체크인 관리 → 익명 사용 데이터 저장 → OpenCrab 온톨로지팩 개선 신호로 연결하는 K-뷰티 AI 코치 플러그인입니다.

이 repo는 ChatGPT Actions/플러그인 연결을 위한 **API, OpenAPI 스펙, plugin manifest, Convex DB schema/functions**를 담고 있습니다.

현재 추천 API는 **CrabAgent V2 제품 온톨로지팩**을 로컬 경량 인덱스로 사용합니다. 제품 223개를 86개 제품 패밀리로 정리하고, 피부고민·성분 cue·루틴 역할·안전룰·추천 근거를 기준으로 reranking합니다.

---

## 1. 한 줄 정의

> 고객의 피부타입, 피부고민, 민감도, 예산, 목표 속도를 바탕으로 메디테라피 제품 루틴을 추천하고, 사용 체크인 데이터를 개인정보 없이 익명화해 제품/루틴 온톨로지 개선에 활용하는 AI 스킨케어 코치 플러그인.

---

## 2. 배포 주소

| 항목 | URL |
|---|---|
| Plugin Manifest | https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/ai-plugin.json |
| OpenAPI Spec | https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml |
| API Catalog | https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/api-catalog |
| Privacy Policy | https://meditherapy-skin-coach-dashboard.vercel.app/privacy.html |
| Dashboard | https://meditherapy-skin-coach-dashboard.vercel.app |
| GitHub Plugin Repo | https://github.com/contentscoin/meditherapy-skin-coach-plugin |

---

## 3. 핵심 사용자 시나리오

### 3.1 고객 루틴 추천

고객이 다음 정보를 입력합니다.

| 입력값 | 예시 |
|---|---|
| 피부타입 | 복합성, 민감성, 건성, 지성 |
| 피부고민 | 피부결, 모공, 트러블, 붉음, 잡티, 화장밀림 |
| 민감도 | low, medium, high |
| 예산 | 5만원 이하 |
| 목표 속도 | 7일, 14일, 30일 |
| 언어/국가 | ko-KR, en-US 등 |
| 익명 분석 동의 | true/false |

플러그인은 다음을 반환합니다.

- 추천 루틴 ID
- 추천 제품 목록
- 아침 루틴
- 저녁 루틴
- Day 1 / Day 3 / Day 7 체크인 항목
- 민감피부 안전 룰
- 익명 분석 저장 여부

### 3.2 GPT 할 일/체크인 관리

추천 결과를 기반으로 GPT가 다음 형태의 할 일을 만들 수 있습니다.

```text
Day 1
- 패치테스트
- 따가움/건조함 기록

Day 3
- 피부결, 붉음, 트러블 변화 체크
- 자극 점수 3 이상이면 기능성 성분 빈도 줄이기

Day 7
- 화장 밀착, 피부결, 만족도 평가
- 계속 사용 / 빈도 조정 / 진정 루틴 전환 판단
```

### 3.3 익명 사용 데이터 저장

사용자가 동의한 경우에만 다음과 같은 구조화 이벤트를 저장합니다.

```json
{
  "eventType": "checkin",
  "userHash": "anon_74e0ed81",
  "skinType": "복합성",
  "concerns": ["피부결"],
  "routineId": "glass-skin-7day",
  "productIds": ["egg-skin-kit"],
  "checkinDay": 7,
  "drynessScore": 1,
  "irritationScore": 0,
  "satisfactionScore": 4.8,
  "action": "continue",
  "localeBucket": "ko-KR",
  "metadata": {
    "source": "plugin_api",
    "privacy": "sanitized_no_pii",
    "raw_text_stored": false
  }
}
```

---

## 4. API 개요

| Method | Path | 기능 |
|---|---|---|
| POST | `/api/recommend-routine` | 피부타입/고민/민감도 기반 루틴 추천 |
| POST | `/api/record-event` | 개인정보 제외 익명 체크인/사용 이벤트 저장 |
| GET | `/api/skin-coach-summary` | Convex DB 기반 요약 조회 |

---

## 5. API 상세

### 5.1 `POST /api/recommend-routine`

피부고민 기반으로 루틴과 추천 제품을 반환합니다.

#### Request

```json
{
  "skinType": "민감성",
  "concerns": ["트러블", "붉음"],
  "sensitivity": "high",
  "budget": "5만원 이하",
  "goalSpeed": "14일",
  "locale": "ko-KR",
  "consentForAnalytics": true
}
```

#### Response

```json
{
  "pluginName": "메디테라피 스킨 코치",
  "routineId": "sensitive-calming-14day",
  "summary": "민감성 피부의 트러블, 붉음 고민을 위한 14일 루틴입니다.",
  "recommendedProducts": [
    "PDRN 스킨부스터 세럼",
    "진정 크림",
    "패치테스트",
    "저자극 진정 루틴"
  ],
  "morning": ["저자극 세안", "수분 세럼", "보습/블러 크림", "자외선 차단"],
  "night": ["저자극 세안", "진정 세럼", "보습 크림"],
  "timeline": [
    { "day": 1, "check": "패치테스트, 따가움/건조함 기록" },
    { "day": 3, "check": "피부결, 붉음, 트러블 변화 체크" },
    { "day": 7, "check": "화장 밀착, 피부결, 만족도 평가" }
  ],
  "safetyRules": [
    "자극 점수 3 이상이면 기능성 성분 빈도 줄이기",
    "새 트러블이 늘면 진정 루틴으로 전환",
    "민감피부는 레티날/AHA/BHA 동시 사용 금지"
  ],
  "analyticsSaved": true
}
```

---

### 5.2 `POST /api/record-event`

루틴 수행, 체크인, 제품 반응, 온톨로지 갭 이벤트를 익명으로 저장합니다.

#### Request

```json
{
  "eventType": "checkin",
  "skinType": "복합성",
  "concerns": ["피부결"],
  "routineId": "glass-skin-7day",
  "productIds": ["egg-skin-kit"],
  "checkinDay": 7,
  "drynessScore": 1,
  "irritationScore": 0,
  "satisfactionScore": 4.8,
  "action": "continue",
  "locale": "ko-KR"
}
```

#### Response

```json
{
  "ok": true,
  "id": "j5701tgcsnbgqbgten2ff9ydvn89bcqv",
  "saved": {
    "eventType": "checkin",
    "userHash": "anon_74e0ed81",
    "metadata": {
      "privacy": "sanitized_no_pii",
      "raw_text_stored": false
    }
  }
}
```

---

### 5.3 `GET /api/skin-coach-summary`

Convex DB에 저장된 익명 이벤트를 집계합니다.

#### Query Params

| Parameter | 값 |
|---|---|
| `range` | `all`, `7d`, `24h` |

#### Example

```bash
curl "https://meditherapy-skin-coach-dashboard.vercel.app/api/skin-coach-summary?range=all"
```

#### Response 주요 필드

```json
{
  "totalEvents": 9,
  "avgSatisfaction": 4.31,
  "funnel": {
    "recommendations": 3,
    "schedules": 1,
    "checkins": 3,
    "day7": 2,
    "day7CompletionRate": 0.66
  },
  "topConcerns": [
    { "value": "피부결", "count": 4 }
  ],
  "ontologyGaps": {
    "count": 1,
    "fields": [
      { "value": "finish_tags", "count": 1 }
    ]
  }
}
```

---

## 6. Convex 데이터 모델

테이블: `skinCoachEvents`

| Field | 설명 |
|---|---|
| `eventId` | 이벤트 ID |
| `eventType` | 추천/체크인/제품피드백/온톨로지갭 등 |
| `occurredAt` | 발생 시각 |
| `userHash` | 익명 사용자 해시 |
| `skinType` | 피부타입 |
| `concerns` | 피부고민 배열 |
| `sensitivity` | 민감도 |
| `routineId` | 루틴 ID |
| `productIds` | 제품 ID 배열 |
| `checkinDay` | 체크인 일차 |
| `drynessScore` | 건조 점수 |
| `irritationScore` | 자극 점수 |
| `satisfactionScore` | 만족도 점수 |
| `action` | continue, reduce_active, switch_routine 등 |
| `localeBucket` | 국가/언어 범주 |
| `ontologyGapFields` | 보강이 필요한 온톨로지 필드 |
| `metadata` | source/privacy 등 비식별 메타데이터 |

---

## 7. 개인정보 처리 원칙

### 저장하지 않음

- 이름
- 전화번호
- 이메일
- 주소
- 주문번호
- 결제정보
- 사진 원본
- 원문 대화 전체
- 자유서술 원문 전체

### 저장 가능

- 피부고민
- 피부타입
- 민감도
- 루틴 ID
- 제품 ID
- 체크인 점수
- 루틴 변경 사유
- 국가/언어 범주

### 설계 원칙

1. 사용자가 동의한 경우에만 분석 이벤트 저장
2. 원문 대화 전체 저장 금지
3. 구조화된 필드만 저장
4. 익명 해시 사용
5. `metadata.raw_text_stored = false`로 원문 미저장 표시

---

## 8. OpenCrab 온톨로지팩 연계 방향

이 플러그인은 Convex에 쌓인 익명 이벤트를 다음 OpenCrab 팩 고도화 신호로 사용할 수 있습니다.

| Pack | 활용 데이터 |
|---|---|
| `meditherapy-product-catalog` | 제품별 선택/체크인/만족도 |
| `meditherapy-ingredient-ontology` | 성분별 자극/만족/중단 신호 |
| `meditherapy-skin-concern-map` | 피부고민 ↔ 제품 ↔ 루틴 적합도 |
| `meditherapy-routine-template` | 7일/14일/30일 루틴 완주율 |
| `meditherapy-customer-usage-patterns` | 익명 사용 패턴, 이탈/완주 신호 |
| `meditherapy-recommendation-feedback` | 추천 결과와 실제 반응 비교 |

---

## 9. 로컬 개발

```bash
npm install
npx convex dev --once
npm run build
```

`.env.local`에 다음 값이 필요합니다.

```bash
VITE_CONVEX_URL=https://YOUR-CONVEX.convex.cloud
CONVEX_URL=https://YOUR-CONVEX.convex.cloud
```

`.env.local`은 Git에 올리지 않습니다.

---

## 10. 배포

Vercel에 배포합니다.

```bash
npx vercel deploy --prod \
  --env VITE_CONVEX_URL=https://YOUR-CONVEX.convex.cloud \
  --env CONVEX_URL=https://YOUR-CONVEX.convex.cloud
```

---

## 11. 파일 구조

```text
api/
  _shared.ts                 공통 CORS, Convex client, sanitize helper
  recommend-routine.ts       루틴 추천 API
  record-event.ts            익명 이벤트 저장 API
  skin-coach-summary.ts      대시보드 요약 API

convex/
  schema.ts                  skinCoachEvents 테이블 스키마
  analytics.ts               recordEvent, seedEvents, recentEvents, summary 함수

public/
  .well-known/ai-plugin.json ChatGPT plugin manifest
  .well-known/api-catalog    RFC 9727 API Catalog
  openapi.yaml               OpenAPI 3.1 spec
  logo.svg                   plugin logo
  privacy.html               개인정보 처리 원칙
```

---

## 12. 검증 명령

```bash
# Manifest
curl https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/ai-plugin.json

# OpenAPI
curl https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml

# 루틴 추천
curl -X POST https://meditherapy-skin-coach-dashboard.vercel.app/api/recommend-routine \
  -H 'Content-Type: application/json' \
  --data '{"skinType":"민감성","concerns":["트러블","붉음"],"sensitivity":"high","goalSpeed":"14일","locale":"ko-KR","consentForAnalytics":true}'

# 요약
curl 'https://meditherapy-skin-coach-dashboard.vercel.app/api/skin-coach-summary?range=all'
```

---

## 13. 현재 상태

- Vercel production 배포 완료
- Convex DB 연결 완료
- Plugin manifest 접근 가능
- OpenAPI 접근 가능
- API Catalog 접근 가능
- 루틴 추천 API 테스트 완료
- 익명 이벤트 저장 테스트 완료
- GitHub plugin repo 분리 완료
