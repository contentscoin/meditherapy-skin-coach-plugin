# 메디테라피 스킨 코치 플러그인

피부고민 기반 루틴 추천, GPT 할 일/체크인, 익명 사용 이벤트 저장, Convex 기반 요약 조회를 제공하는 메디테라피 스킨 코치 플러그인 API입니다.

## 배포 주소

- Plugin Manifest: https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/ai-plugin.json
- OpenAPI: https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml
- API Catalog: https://meditherapy-skin-coach-dashboard.vercel.app/.well-known/api-catalog

## API

| Method | Path | 기능 |
|---|---|---|
| POST | `/api/recommend-routine` | 피부타입/고민/민감도 기반 루틴 추천 |
| POST | `/api/record-event` | 개인정보 제외 익명 체크인/사용 이벤트 저장 |
| GET | `/api/skin-coach-summary` | Convex DB 기반 요약 조회 |

## 개인정보 원칙

저장하지 않음:
- 이름, 전화번호, 이메일, 주소
- 주문번호, 결제정보
- 사진 원본
- 원문 대화 전체

저장 가능:
- 피부고민, 피부타입, 민감도
- 루틴 ID, 제품 ID
- 체크인 점수, 루틴 변경 사유
- 국가/언어 범주

## 로컬 개발

```bash
npm install
npx convex dev --once
npm run build
```

`.env.local`에 `VITE_CONVEX_URL` 또는 `CONVEX_URL`이 필요합니다. `.env.local`은 Git에 올리지 않습니다.

## 파일 구조

```text
api/                         Vercel Serverless API
convex/                      Convex schema/functions
public/.well-known/          plugin manifest + api catalog
public/openapi.yaml          OpenAPI spec
public/privacy.html          privacy policy
```
