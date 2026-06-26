# Primer Hack Round 10 제출본 — Meditherapy Skin Coach

**작성일:** 2026-06-26  
**확인 URL:** https://hack.primer.kr/rounds/10  
**접근 상태:** 제출 페이지는 로그인 화면으로 리다이렉트됨. 따라서 아래 내용은 로그인 후 제출 폼에 복사/붙여넣기 가능한 형태로 정리한 제출본입니다.

---

## 1. 제출 요약

| 항목 | 내용 |
|---|---|
| 프로젝트명 | Meditherapy Skin Coach / 메디테라피 스킨 코치 |
| 한 줄 소개 | 피부고민을 입력하면 메디테라피 제품 온톨로지 기반 루틴을 추천하고, GPT 할일/체크인과 개인정보 없는 오너 분석 대시보드까지 연결하는 ChatGPT Apps SDK / MCP 기반 K-뷰티 AI 코치 앱 |
| 핵심 사용자 | 메디테라피 제품을 고르기 어려운 고객, 루틴 지속 관리가 필요한 고객, 고객 사용 데이터를 보고 싶은 브랜드 오너/운영자 |
| 핵심 가치 | 제품 추천에서 끝나지 않고 루틴 수행, 체크인, 피드백, 제품 클릭 관심도까지 연결 |
| 기술 방식 | ChatGPT Apps SDK / MCP, Vercel, Convex, OpenAPI, OpenCrab/CrabAgent V2 제품 온톨로지 |
| 개인정보 원칙 | 이름/연락처/주문/결제/원문 질문·답변 저장 없음. 구조화된 익명 이벤트만 저장 |

---

## 2. 제출 링크

| 항목 | URL |
|---|---|
| 서비스 홈 | https://meditherapy-skin-coach-dashboard.vercel.app |
| ChatGPT Apps SDK / MCP Endpoint | https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp |
| 오너 대시보드 | https://meditherapy-skin-coach-dashboard.vercel.app/owner-dashboard.html |
| 설명 영상 MP4 | https://meditherapy-skin-coach-dashboard.vercel.app/media/meditherapy-skin-coach-explainer.mp4 |
| 설명 영상 미리보기 | https://meditherapy-skin-coach-dashboard.vercel.app/media/meditherapy-skin-coach-explainer-contact-sheet.png |
| GitHub Repo | https://github.com/contentscoin/meditherapy-skin-coach-plugin |
| OpenAPI | https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml |
| Plugin Manifest | https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/ai-plugin.json |
| API Catalog | https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/api-catalog |
| Privacy | https://meditherapy-skin-coach-dashboard.vercel.app/privacy.html |
| CSV Export | https://meditherapy-skin-coach-dashboard.vercel.app/api/export-analytics?range=all&format=csv |

---

## 3. 제출 폼용 짧은 소개

메디테라피 스킨 코치는 고객이 피부타입, 피부고민, 민감도, 목표 기간을 입력하면 메디테라피 제품 온톨로지 기반으로 개인 루틴을 추천하는 ChatGPT Apps SDK / MCP 기반 K-뷰티 AI 코치 앱입니다. 단순 제품 추천에서 끝나지 않고 Day 1, Day 3, Day 7 체크인 계획과 GPT 할일 후보를 제공하며, 추천 제품별 실제 링크와 민감피부 안전룰을 함께 안내합니다. 오너는 개인정보 없이 질문/답변 활동, 루틴 추천, 제품 클릭, 일정 사용, 피드백, 체크인, 온톨로지 갭을 대시보드에서 확인할 수 있습니다.

---

## 4. 문제 정의

K-뷰티 고객은 제품 종류가 많고, 피부고민/피부타입/민감도에 따라 어떤 제품을 어떤 순서로 써야 하는지 판단하기 어렵습니다. 또한 브랜드 입장에서는 고객이 어떤 고민으로 질문하고, 어떤 제품에 관심을 보이며, 루틴을 실제로 지속하는지 개인정보 없이 파악하기 어렵습니다.

주요 문제는 다음과 같습니다.

1. 제품이 많아 고객이 선택을 어려워함
2. 추천을 받아도 실제 루틴 수행으로 이어지기 어려움
3. 민감피부 고객은 자극/트러블 리스크가 있어 안전 가이드가 필요함
4. 브랜드 오너는 제품 클릭, 루틴 일정 사용, 체크인, 피드백 데이터를 개인정보 없이 보고 싶어함
5. 고객 질문에서 드러나는 제품 데이터 부족 영역을 제품 온톨로지에 반영하기 어려움

---

## 5. 해결책

Meditherapy Skin Coach는 다음 흐름으로 문제를 해결합니다.

```text
피부고민 입력
→ 제품 온톨로지 기반 루틴 추천
→ 실제 제품 링크 제공
→ GPT 할일/체크인 계획 제공
→ 익명 활동 이벤트 저장
→ 오너 대시보드 분석
→ 제품/루틴/온톨로지 개선
```

핵심은 “추천”을 끝점이 아니라 시작점으로 두는 것입니다. 고객은 루틴을 실행하고 체크인하며, 브랜드는 개인정보 없이 고객의 루틴 수행과 제품 관심도를 분석할 수 있습니다.

---

## 6. 핵심 기능

| 기능 | 설명 |
|---|---|
| 피부고민 기반 추천 | 피부타입, 고민, 민감도, 목표 기간 기반 루틴 추천 |
| 제품 온톨로지 추천 | 제품 223개를 86개 제품 패밀리로 정리한 CrabAgent V2 온톨로지 기반 reranking |
| 실제 제품 링크 | 추천 제품마다 실제 메디테라피 제품 상세 링크 제공 |
| 클릭 관심도 분석 | `trackingUrl`로 익명 제품 클릭 이벤트 저장 후 실제 제품 페이지 이동 |
| GPT 할일 계획 | Day 1 패치테스트, Day 3 자극 체크, Day 7 만족도 리뷰 구조 제공 |
| 민감피부 안전룰 | 레티날/AHA/BHA/비타민C 등 액티브 성분 주의 및 패치테스트 안내 |
| 오너 대시보드 | 질문/답변, 루틴 추천, 제품 클릭, 일정 사용, 피드백, 체크인, 온톨로지 갭 집계 |
| CSV Export | 개인정보 없는 집계 데이터를 CSV/JSON으로 내보내기 |
| 개인정보 보호 | 원문 질문/답변, 이름, 연락처, 주소, 주문/결제 정보 미저장 |

---

## 7. 데모 시나리오

### 고객 입력 예시

```json
{
  "skinType": "복합성",
  "concerns": ["피부결", "모공"],
  "sensitivity": "medium",
  "goalSpeed": "7일",
  "locale": "ko-KR"
}
```

### 앱 응답 요약

- “안녕하세요, 메디테라피입니다.”로 시작하는 브랜드 톤 답변
- 피부결/모공 고민에 맞는 루틴 추천
- 추천 제품별 실제 링크 제공
- Day 1 / Day 3 / Day 7 체크인 계획 제공
- 민감피부 안전룰 제공
- 오너 대시보드에 개인정보 없는 사용 이벤트 반영

---

## 8. 데이터/개인정보 처리

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

## 9. 기술 구성

| 영역 | 구현 |
|---|---|
| ChatGPT 연결 | Apps SDK / MCP Streamable HTTP endpoint `/api/mcp` |
| API | Vercel Serverless Functions |
| DB | Convex |
| 추천 지식 | OpenCrab/CrabAgent V2 제품 온톨로지 로컬 경량 인덱스 |
| 프론트 | 정적 HTML 기반 서비스 홈/오너 대시보드/MCP 위젯 |
| 문서 | README, OpenAPI, API Catalog, Privacy, 등록 매뉴얼 |
| 배포 | Vercel Production |

---

## 10. 검증 결과

| 검증 항목 | 결과 |
|---|---|
| 서비스 홈 | 200 OK |
| 오너 대시보드 | 200 OK |
| OpenAPI | 200 OK |
| Plugin Manifest | 200 OK |
| 설명 영상 MP4 | 200 OK, video/mp4 |
| MCP initialize | 200 OK, protocolVersion `2025-03-26` |
| 추천 API | 정상, `routineId=ontology-guided-7day-routine` |
| 제품 링크 응답 | 5개 반환 확인 |
| GPT 할일 계획 | 3개 반환 확인 |
| 개인정보 저장 | `piiStored=false`, 원문 저장 없음 |

---

## 11. 발표/제출용 30초 피치

메디테라피 스킨 코치는 K-뷰티 고객이 피부고민을 입력하면 제품 온톨로지 기반으로 개인 루틴을 추천하고, GPT 할일/체크인으로 실제 사용까지 관리해주는 ChatGPT 앱입니다. 기존 추천 챗봇과 달리 추천 이후의 루틴 수행, 제품 클릭, 피드백, 체크인 데이터를 개인정보 없이 오너 대시보드에 집계합니다. 브랜드는 어떤 고민이 많고, 어떤 제품에 관심이 있으며, 어떤 루틴에서 이탈이 생기는지 확인해 제품 설명과 추천 로직을 계속 개선할 수 있습니다.

---

## 12. 제출 전 로그인 후 확인 필요

`https://hack.primer.kr/rounds/10`은 비로그인 상태에서 `apply.primer.kr/sso_log_in`으로 이동했습니다. 로그인 후 다음 항목을 확인해 폼에 맞게 붙여넣으면 됩니다.

- [ ] 팀명/대표자/연락처
- [ ] 제출 마감 시간
- [ ] 필수 제출 필드 글자 수 제한
- [ ] 영상 URL 필수 여부
- [ ] GitHub 공개/비공개 허용 여부
- [ ] 데모 계정 또는 접근 방식 요구 여부
- [ ] 개인정보/보안 관련 체크박스

---

## 13. 최종 제출 권장 링크 조합

1. **서비스 URL:** https://meditherapy-skin-coach-dashboard.vercel.app
2. **Demo/Video URL:** https://meditherapy-skin-coach-dashboard.vercel.app/media/meditherapy-skin-coach-explainer.mp4
3. **GitHub URL:** https://github.com/contentscoin/meditherapy-skin-coach-plugin
4. **Dashboard URL:** https://meditherapy-skin-coach-dashboard.vercel.app/owner-dashboard.html
5. **MCP Endpoint:** https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp
