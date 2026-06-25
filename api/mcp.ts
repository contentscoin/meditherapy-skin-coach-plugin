import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { cors, rateLimit, type VercelRequest, type VercelResponse } from "./_shared.js";

const BASE_URL = "https://meditherapy-skin-coach-dashboard.vercel.app";
const WIDGET_URI = "ui://meditherapy/skin-coach.html";

function readWidgetHtml() {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><style>body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff7f3;color:#2f211d}.wrap{padding:18px}.card{background:white;border:1px solid #f0d6cb;border-radius:20px;padding:18px;box-shadow:0 12px 32px rgba(148,80,52,.12)}h1{font-size:21px;margin:0 0 8px;letter-spacing:-.02em}p{line-height:1.55}.pill{display:inline-flex;background:#fff0e9;border-radius:999px;padding:6px 10px;margin:3px;font-size:13px;font-weight:800}.step{border:1px solid #f3ded6;border-radius:14px;padding:10px;margin-top:10px;background:#fffdfb}.cta{background:#c4512f;color:white;border-radius:14px;padding:10px 12px;margin-top:12px;font-weight:900;text-align:center}small{color:#7a6259}</style></head><body><div class="wrap"><div class="card"><h1>메디테라피 스킨 코치</h1><p>피부고민을 입력하면 제품 온톨로지 V2 기반으로 루틴, 제품 링크, GPT 할일 계획을 추천합니다.</p><span class="pill">제품 223개</span><span class="pill">제품 패밀리 86개</span><span class="pill">클릭/피드백 익명 집계</span><div class="step"><strong>1. 루틴 추천</strong><br/><small>피부고민·민감도 기반 추천</small></div><div class="step"><strong>2. 일정 사용</strong><br/><small>Day1/3/7 체크인 계획 제공</small></div><div class="step"><strong>3. 피드백</strong><br/><small>도움됨·자극·제품 불일치만 구조화 저장</small></div><div class="cta">개인정보 없이 사용 패턴만 분석</div></div></div></body></html>`;
}

function createSkinCoachServer() {
  const server = new McpServer({
    name: "meditherapy-skin-coach-app",
    version: "0.1.0",
  });

  registerAppResource(
    server,
    "Meditherapy Skin Coach UI",
    WIDGET_URI,
    {
      title: "메디테라피 스킨 코치",
      description: "피부고민 기반 루틴 추천 및 GPT 할일 계획 UI",
      _meta: {
        ui: {
          prefersBorder: true,
        },
      },
    },
    async () => ({
      contents: [
        {
          uri: WIDGET_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: readWidgetHtml(),
          _meta: {
            ui: {
              csp: {
                connectDomains: [BASE_URL],
                resourceDomains: [BASE_URL],
              },
            },
          },
        },
      ],
    }),
  );

  registerAppTool(
    server,
    "recommend_skin_routine",
    {
      title: "메디테라피 루틴 추천",
      description: "피부타입, 피부고민, 민감도, 목표 속도를 받아 메디테라피 제품 온톨로지 기반 루틴과 GPT 할일 계획을 추천합니다. 답변은 반드시 '안녕하세요, 메디테라피입니다.'로 시작하고 추천 제품별 실제 링크를 하나씩 모두 포함합니다.",
      inputSchema: {
        skinType: z.string().optional().describe("예: 복합성, 민감성, 건성"),
        concerns: z.array(z.string()).default([]).describe("예: 피부결, 모공, 트러블, 잡티"),
        sensitivity: z.string().default("medium").describe("low, medium, high 또는 민감"),
        budget: z.string().optional(),
        goalSpeed: z.string().default("7일"),
        locale: z.string().default("ko-KR"),
        consentForAnalytics: z.boolean().default(true).describe("개인정보 없이 구조화된 익명 활동 지표만 저장합니다. 원문 질문/답변은 저장하지 않습니다."),
      },
      _meta: {
        ui: {
          resourceUri: WIDGET_URI,
        },
      },
    },
    async (args) => {
      const response = await fetch(`${BASE_URL}/api/recommend-routine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      if (!response.ok) {
        return {
          content: [{ type: "text", text: `추천 API 오류: ${response.status}` }],
          isError: true,
        };
      }
      const data = await response.json();
      const answerMarkdown = typeof data.modelAnswerMarkdown === "string" ? data.modelAnswerMarkdown : "안녕하세요, 메디테라피입니다.";
      const todos = Array.isArray(data.gptTodoPlan) ? data.gptTodoPlan.map((todo: { title?: string }) => todo.title).join(" / ") : "할일 계획 없음";
      return {
        content: [
          {
            type: "text",
            text: `${answerMarkdown}\n\nGPT 할일 계획: ${todos}`,
          },
        ],
        structuredContent: data,
      };
    },
  );

  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res, req, "Mcp-Session-Id, Last-Event-ID");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (rateLimit(req, res, 120)) return;

  const server = createSkinCoachServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req as never, res as never, req.body);
}
