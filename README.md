# 메디테라피 스킨 코치 플러그인

**메디테라피 스킨 코치**는 피부고민을 입력하면 메디테라피 제품 온톨로지 기반으로 루틴을 추천하고, GPT 할일/체크인 계획과 개인정보 없는 활동 분석까지 연결하는 **ChatGPT Apps SDK / MCP 기반 K-뷰티 AI 코치 앱**입니다.

> 핵심: **추천 → 루틴 일정 → 체크인 → 익명 활동 데이터 → 제품/루틴 개선**까지 한 번에 연결합니다.

---

## 바로 확인하기

| 항목 | URL |
|---|---|
| MCP Endpoint | https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp |
| 오너 대시보드 | https://meditherapy-skin-coach-dashboard.vercel.app/owner-dashboard.html |
| 서비스 홈 | https://meditherapy-skin-coach-dashboard.vercel.app |
| OpenAPI | https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml |
| Plugin Manifest | https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/ai-plugin.json |
| API Catalog | https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/api-catalog |
| Privacy | https://meditherapy-skin-coach-dashboard.vercel.app/privacy.html |
| ChatGPT 앱 등록 매뉴얼 | [docs/CHATGPT_APPS_REGISTRATION.md](docs/CHATGPT_APPS_REGISTRATION.md) |

---

## 현재 구현 상태

| 영역 | 상태 |
|---|---|
| ChatGPT Apps SDK / MCP | `/api/mcp` 연결 가능 |
| 제품 추천 API | CrabAgent V2 제품 온톨로지 기반 추천 |
| 제품 링크 | 추천 제품마다 실제 제품 링크 + 클릭 추적 링크 제공 |
| GPT 할일 계획 | Day 1 / Day 3 / Day 7 체크인 계획 제공 |
| 오너 대시보드 | 질문/답변, 추천, 일정 사용, 제품 클릭, 피드백, 체크인 집계 |
| 데이터 저장 | Convex에 개인정보 없는 구조화 이벤트 저장 |
| CSV Export | 개인정보 없는 집계 데이터 다운로드 가능 |
| 배포 | Vercel Production 배포 완료 |

---

## 핵심 기능

1. **피부고민 기반 루틴 추천**
   - 피부타입, 피부고민, 민감도, 목표 속도를 입력받아 제품 루틴 추천
   - 제품 223개 → 제품 패밀리 86개로 정리한 온톨로지 기반 reranking

2. **제품 링크 제공 및 클릭 관심도 분석**
   - 추천 제품마다 실제 메디테라피 제품 링크 제공
   - `trackingUrl`을 통해 익명 클릭 이벤트 저장 후 실제 제품 페이지로 이동

3. **GPT 할일/루틴 일정 계획**
   - Day 1 패치테스트
   - Day 3 자극/트러블/건조 체크
   - Day 7 만족도/피부결/화장밀착 리뷰

4. **오너 대시보드**
   - 질문/답변 활동
   - 루틴 추천 수
   - 제품 노출/클릭
   - 루틴 일정 사용
   - 추천 품질 피드백
   - 체크인/만족도/자극 신호
   - 온톨로지 갭

5. **개인정보 없는 데이터 수집**
   - 원문 질문/답변, 이름, 연락처, 주소, 주문/결제정보 저장 안 함
   - 피부고민 bucket, 루틴 ID, 제품 family key, 점수, 액션만 저장

---

## 사용 흐름

```text
사용자 피부고민 입력
  ↓
MCP tool recommend_skin_routine 호출
  ↓
제품 온톨로지 V2 기반 루틴 추천
  ↓
제품 링크 + GPT 할일 계획 반환
  ↓
사용자가 제품 클릭/일정 사용/체크인/피드백
  ↓
개인정보 없는 이벤트로 저장
  ↓
오너 대시보드에서 분석
```

---

## 주요 API

| Method | Path | 기능 |
|---|---|---|
| POST | `/api/recommend-routine` | 피부고민 기반 루틴 추천 |
| POST | `/api/record-event` | 체크인/일정/피드백 등 익명 이벤트 저장 |
| GET | `/api/product-click` | 제품 클릭 익명 추적 후 실제 제품 페이지로 이동 |
| GET | `/api/skin-coach-summary` | 오너 대시보드 집계 조회 |
| GET | `/api/export-analytics` | 개인정보 없는 집계 CSV/JSON export |
| POST | `/api/mcp` | ChatGPT Apps SDK / MCP endpoint |

---

## 개인정보 원칙

### 저장하지 않음

- 이름, 전화번호, 이메일, 주소
- 주문번호, 결제정보, 장바구니 정보
- ChatGPT 계정 정보
- 원문 질문/답변 전체
- 자유서술 원문 전체
- 사진 원본

### 저장 가능

- 피부고민 category/bucket
- 피부타입, 민감도
- 루틴 ID
- 제품 family key
- 체크인 일차
- 건조/자극/만족도 점수
- `helpful`, `product_mismatch`, `irritation_signal`, `product_link_clicked` 같은 구조화 action
- `metadata.raw_text_stored = false`

---

## 빠른 검증

```bash
# Build
npm run build

# 추천 API
curl -X POST https://meditherapy-skin-coach-dashboard.vercel.app/api/recommend-routine \
  -H 'Content-Type: application/json' \
  --data '{"skinType":"복합성","concerns":["피부결","모공"],"sensitivity":"medium","goalSpeed":"7일","locale":"ko-KR","consentForAnalytics":true}'

# 오너 대시보드 요약
curl 'https://meditherapy-skin-coach-dashboard.vercel.app/api/skin-coach-summary?range=all'

# CSV Export
curl 'https://meditherapy-skin-coach-dashboard.vercel.app/api/export-analytics?range=all&format=csv'
```

---

# 상세 내용

## 1. 추천 API 응답 핵심 필드

`POST /api/recommend-routine`는 다음 주요 필드를 반환합니다.

| 필드 | 설명 |
|---|---|
| `brandGreeting` | `안녕하세요, 메디테라피입니다.` 고정 인사 |
| `modelAnswerMarkdown` | ChatGPT가 바로 사용할 수 있는 답변 초안 |
| `routineId` | 추천 루틴 ID |
| `recommendedProducts` | 추천 제품명 배열 |
| `productLinks` | 실제 제품 URL + 클릭 추적 URL |
| `recommendedProductDetails` | 점수, 근거, 성분 cue, 제품 family key |
| `gptTodoPlan` | GPT 할일로 변환 가능한 Day 1/3/7 계획 |
| `feedbackActions` | 도움됨/자극/제품불일치/일정사용 액션 |
| `ontologyGaps` | 온톨로지에 없는 피부고민 bucket |
| `analyticsSaved` | 익명 분석 이벤트 저장 여부 |

### 예시 요청

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

---

## 2. 이벤트 모델

Convex 테이블: `skinCoachEvents`

| Field | 설명 |
|---|---|
| `eventId` | 이벤트 ID |
| `eventType` | `routine_recommendation`, `task_schedule_created`, `checkin`, `product_feedback`, `ontology_gap` 등 |
| `occurredAt` | 발생 시각 |
| `userHash` | 익명 해시. UI에는 노출하지 않음 |
| `skinType` | 피부타입 |
| `concerns` | 피부고민 배열 |
| `sensitivity` | 민감도 |
| `routineId` | 루틴 ID |
| `productIds` | 제품 family key 배열 |
| `checkinDay` | 체크인 일차 |
| `drynessScore` | 건조 점수 |
| `irritationScore` | 자극 점수 |
| `satisfactionScore` | 만족도 점수 |
| `action` | `continue`, `helpful`, `product_link_clicked` 등 |
| `localeBucket` | 국가/언어 범주 |
| `ontologyGapFields` | 보강이 필요한 온톨로지 필드 |
| `metadata` | `privacy`, `source`, `raw_text_stored` 등 |

---

## 3. 오너 대시보드 지표

오너 대시보드는 `/api/skin-coach-summary`의 집계값을 사용합니다.

| 지표 | 의미 |
|---|---|
| 질문 | 플러그인 루틴 추천 요청 수 |
| 답변 생성 | 추천 API 답변 생성 수 |
| 루틴 추천 | 추천 이벤트 수 |
| 제품 노출 | 추천 결과에서 제품 링크가 노출된 수 |
| 제품 클릭 | 제품 링크 클릭 이벤트 수 |
| 루틴 일정 사용 | GPT 할일/루틴 일정 사용 이벤트 수 |
| 피드백 | 도움됨/자극/제품불일치 등 구조화 피드백 |
| 체크인 | Day별 루틴 체크인 이벤트 |
| 온톨로지 갭 | 제품/성분/사용법 데이터 보강 필요 신호 |

---

## 4. OpenCrab / 제품 온톨로지 연계

현재 추천 API는 CrabAgent V2 제품 온톨로지 기반 로컬 인덱스를 사용합니다.

| 항목 | 값 |
|---|---|
| 제품 원본 수 | 223개 |
| 제품 패밀리 | 86개 |
| 주요 기준 | 피부고민, 성분 cue, 루틴 역할, 안전룰, 제품 URL |
| 추천 방식 | `local_crabagent_v2_family_rerank` |
| 개인정보 포함 | 없음 |

익명 이벤트는 추후 다음 온톨로지 개선에 사용할 수 있습니다.

- 제품별 추천 후 클릭/피드백
- 피부고민별 루틴 완주율
- 민감피부 자극 신호
- 자주 묻지만 제품 데이터에 부족한 항목
- 제품 상세 설명에서 보강해야 할 사용법/주의사항

---

## 5. 로컬 개발

```bash
npm install
npm run build
```

Convex 개발/배포가 필요한 경우:

```bash
npx convex dev
npx convex deploy
```

환경변수 예시:

```bash
VITE_CONVEX_URL=https://YOUR-CONVEX.convex.cloud
CONVEX_URL=https://YOUR-CONVEX.convex.cloud
```

`.env.local`, `.vercel`, `node_modules`, `dist`는 Git에 올리지 않습니다.

---

## 6. 배포

```bash
npx vercel deploy --prod --yes
```

배포 후 확인:

```bash
curl https://meditherapy-skin-coach-dashboard.vercel.app/owner-dashboard.html
curl https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml
curl https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/api-catalog
```

---

## 7. 파일 구조

```text
api/
  _shared.ts             공통 CORS, rate limit, Convex client, sanitizer
  mcp.ts                 ChatGPT Apps SDK / MCP endpoint
  recommend-routine.ts   루틴 추천 API
  record-event.ts        익명 이벤트 저장 API
  product-click.ts       제품 클릭 추적 redirect API
  skin-coach-summary.ts  오너 대시보드 요약 API
  export-analytics.ts    집계 데이터 CSV/JSON export

convex/
  schema.ts              skinCoachEvents 스키마
  analytics.ts           recordEvent, recentEvents, summary 함수

public/
  owner-dashboard.html   모바일 최적화 오너 대시보드
  skin-coach-widget.html MCP 앱 UI resource
  openapi.yaml           OpenAPI 3.1 보조 스펙
  .well-known/           plugin manifest, API catalog
  privacy.html           개인정보 처리 원칙

docs/
  CHATGPT_APPS_REGISTRATION.md
```

---

## 8. 주의사항

- 이 프로젝트의 주 연결 방식은 **ChatGPT Apps SDK / MCP**입니다.
- OpenAPI/Plugin Manifest는 호환성과 문서화를 위한 보조 파일입니다.
- ChatGPT native Tasks/할일 기능은 host가 제공해야 실제 생성 가능합니다. 이 플러그인은 `gptTodoPlan` 구조를 제공해 변환 가능하게 합니다.
- 오너 대시보드는 현재 요청에 따라 접근 보호를 적용하지 않았습니다. 운영 단계에서는 별도 관리자 보호를 추가할 수 있습니다.
