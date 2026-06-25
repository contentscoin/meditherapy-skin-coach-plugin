# ChatGPT Apps SDK / MCP 등록 매뉴얼

이 문서는 **메디테라피 스킨 코치 플러그인**을 ChatGPT에 연결하기 위한 등록 절차입니다.

> 중요: 이 프로젝트는 **GPTs Actions**가 아니라 **ChatGPT Apps SDK / MCP 서버 기반 앱 플러그인**입니다. GPTs 만들기 화면에서 OpenAPI를 넣는 방식이 아닙니다.

---

## 1. 현재 배포 정보

| 항목 | 값 |
|---|---|
| 앱 이름 | 메디테라피 스킨 코치 |
| Production URL | `https://meditherapy-skin-coach-dashboard.vercel.app` |
| MCP Endpoint | `https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp` |
| MCP Tool | `recommend_skin_routine` |
| UI Resource | `ui://meditherapy/skin-coach.html` |
| Privacy URL | `https://meditherapy-skin-coach-dashboard.vercel.app/privacy.html` |
| OpenAPI 보조 스펙 | `https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml` |

---

## 2. ChatGPT에 연결할 때 넣어야 하는 URL

Apps SDK / MCP 등록 화면에서는 아래 URL을 사용합니다.

```text
https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp
```

OpenAPI URL이 아닙니다.

```text
# GPTs Actions용 보조 스펙일 뿐, Apps SDK 연결 URL이 아님
https://meditherapy-skin-coach-dashboard.vercel.app/openapi.yaml
```

---

## 3. 등록 전 체크리스트

- [x] `/api/mcp` endpoint 배포 완료
- [x] MCP `initialize` 성공
- [x] MCP `tools/list` 성공
- [x] MCP `tools/call` 성공
- [x] MCP `resources/list` 성공
- [x] 추천 API 정상 작동
- [x] GPT 할일 후보 `gptTodoPlan` 반환
- [x] 개인정보 저장 금지 정책 반영

---

## 4. ChatGPT Apps SDK 등록 절차

OpenAI/ChatGPT 개발자 화면에서 Apps SDK 또는 MCP 앱 등록 메뉴를 사용합니다. 화면 명칭은 계정 권한과 OpenAI UI 버전에 따라 달라질 수 있습니다.

1. OpenAI 개발자 계정으로 로그인
2. ChatGPT Apps SDK / Apps / MCP server 등록 메뉴로 이동
3. 새 앱 또는 새 MCP server 등록 선택
4. 앱 이름 입력

```text
메디테라피 스킨 코치
```

5. MCP Server URL 입력

```text
https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp
```

6. 인증 방식 선택

```text
No authentication / None
```

7. Privacy Policy URL 입력

```text
https://meditherapy-skin-coach-dashboard.vercel.app/privacy.html
```

8. 저장 후 tool discovery 실행
9. `recommend_skin_routine` tool이 보이는지 확인
10. 테스트 프롬프트 실행

```text
나는 복합성 피부이고 피부결과 모공이 고민이야. 7일 루틴 추천하고 할일로 관리해줘.
```

---

## 5. 기대 동작

ChatGPT가 MCP 서버에 연결되면 다음 tool이 노출됩니다.

```text
recommend_skin_routine
```

입력 예시:

```json
{
  "skinType": "복합성",
  "concerns": ["피부결", "모공"],
  "sensitivity": "medium",
  "goalSpeed": "7일",
  "locale": "ko-KR",
  "consentForAnalytics": false
}
```

응답에는 다음이 포함됩니다.

- 추천 루틴 ID
- 추천 제품 목록
- 제품별 추천 근거
- 온톨로지 버전/패키지 정보
- 안전 사용 룰
- `gptTodoPlan`

---

## 6. GPT 할일 기능 관련 주의사항

외부 앱/MCP 서버가 사용자의 ChatGPT 계정에서 native Tasks 기능을 강제로 켜거나 직접 생성할 수는 없습니다.

이 플러그인은 대신 다음 구조를 반환합니다.

```json
{
  "gptTodoPlan": [
    {
      "id": "ontology-guided-7day-routine-day-1-patch-test",
      "title": "Day 1: 깐달걀 키트 패치테스트 및 첫 사용 기록",
      "dueInDays": 1,
      "checklist": [
        "팔 안쪽 또는 턱 라인에 소량 테스트",
        "따가움/붉음/건조함 0~5점 기록",
        "문제 없으면 저녁 루틴에 소량 사용"
      ]
    }
  ],
  "todoIntegrationStatus": "ready_for_chatgpt_tasks_when_native_tasks_tool_is_available"
}
```

ChatGPT host가 native Tasks/할일 도구를 제공하는 계정·환경이면, 이 구조를 바탕으로 할일 생성이 가능합니다.

---

## 7. MCP 수동 검증 명령

### 7.1 initialize

```bash
curl -sS -X POST https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"initialize",
    "params":{
      "protocolVersion":"2025-03-26",
      "capabilities":{},
      "clientInfo":{"name":"manual-test","version":"0.1.0"}
    }
  }'
```

성공 시 `serverInfo.name`이 아래처럼 나옵니다.

```text
meditherapy-skin-coach-app
```

### 7.2 tools/list

```bash
curl -sS -X POST https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

성공 시 `recommend_skin_routine`이 보여야 합니다.

### 7.3 tools/call

```bash
curl -sS -X POST https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{
    "jsonrpc":"2.0",
    "id":3,
    "method":"tools/call",
    "params":{
      "name":"recommend_skin_routine",
      "arguments":{
        "skinType":"복합성",
        "concerns":["피부결","모공"],
        "sensitivity":"medium",
        "goalSpeed":"7일",
        "locale":"ko-KR",
        "consentForAnalytics":false
      }
    }
  }'
```

기대 결과:

- `routineId`: `ontology-guided-7day-routine`
- 1순위 추천: `깐달걀 키트`
- `gptTodoPlan` 포함

### 7.4 resources/list

```bash
curl -sS -X POST https://meditherapy-skin-coach-dashboard.vercel.app/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":4,"method":"resources/list","params":{}}'
```

성공 시 UI resource가 보여야 합니다.

```text
ui://meditherapy/skin-coach.html
```

---

## 8. 문제 해결

| 증상 | 원인 | 해결 |
|---|---|---|
| GPTs 만들기에서 안 보임 | 이 프로젝트는 GPTs Actions가 아님 | Apps SDK/MCP 등록 메뉴 사용 |
| OpenAPI URL을 넣었는데 앱이 안 됨 | Apps SDK는 MCP endpoint가 필요 | `/api/mcp` 사용 |
| tool이 안 보임 | MCP discovery 실패 | `tools/list` 수동 검증 |
| UI가 안 보임 | resource discovery 실패 | `resources/list` 확인 |
| 할일이 직접 생성 안 됨 | native Tasks 권한은 ChatGPT host 제어 | `gptTodoPlan` 반환까지만 앱이 담당 |
| 인증 오류 | 현재 앱은 auth none | 등록 화면에서 No authentication 선택 |

---

## 9. 현재 한계

- 사용자의 ChatGPT 계정에 Apps SDK/MCP 앱 등록 권한이 있어야 합니다.
- 외부 MCP 서버는 ChatGPT native Tasks 기능을 직접 활성화할 수 없습니다.
- 제품 추천은 공개 제품 카탈로그 기반 온톨로지입니다. 주문, 결제, 계정, 재고, 개인 고객 데이터는 사용하지 않습니다.

---

## 10. 관련 파일

| 파일 | 설명 |
|---|---|
| `api/mcp.ts` | ChatGPT Apps SDK / MCP endpoint |
| `api/recommend-routine.ts` | 제품 온톨로지 기반 추천 API |
| `api/product-ontology-v2.ts` | CrabAgent V2 제품 패밀리 경량 인덱스 |
| `public/skin-coach-widget.html` | 앱 UI resource |
| `public/openapi.yaml` | GPTs Actions 보조 스펙 |
| `public/.well-known/ai-plugin.json` | legacy/plugin-style discovery 보조 파일 |
| `public/privacy.html` | 개인정보 처리 안내 |
