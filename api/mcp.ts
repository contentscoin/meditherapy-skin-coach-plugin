import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "./_shared.js";

const BASE_URL = "https://meditherapy-skin-coach-dashboard.vercel.app";
const WIDGET_URI = "ui://meditherapy/skin-coach.html";

function readWidgetHtml() {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><style>body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff7f3;color:#2f211d}.wrap{padding:20px}.card{background:white;border:1px solid #f0d6cb;border-radius:18px;padding:18px;box-shadow:0 12px 32px rgba(148,80,52,.12)}h1{font-size:20px;margin:0 0 8px}p{line-height:1.55}.pill{display:inline-block;background:#fff0e9;border-radius:999px;padding:5px 10px;margin:3px;font-size:13px}small{color:#7a6259}</style></head><body><div class="wrap"><div class="card"><h1>메디테라피 스킨 코치</h1><p>피부고민을 입력하면 제품 온톨로지 V2 기반으로 루틴과 GPT 할일 계획을 추천합니다.</p><span class="pill">제품 223개</span><span class="pill">제품 패밀리 86개</span><span class="pill">QA 96</span><p><small>개인정보 없이 익명 구조화 이벤트만 저장합니다.</small></p></div></div></body></html>`;
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
      description: "피부타입, 피부고민, 민감도, 목표 속도를 받아 메디테라피 제품 온톨로지 기반 루틴과 GPT 할일 계획을 추천합니다.",
      inputSchema: {
        skinType: z.string().optional().describe("예: 복합성, 민감성, 건성"),
        concerns: z.array(z.string()).default([]).describe("예: 피부결, 모공, 트러블, 잡티"),
        sensitivity: z.string().default("medium").describe("low, medium, high 또는 민감"),
        budget: z.string().optional(),
        goalSpeed: z.string().default("7일"),
        locale: z.string().default("ko-KR"),
        consentForAnalytics: z.boolean().default(false),
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
      const products = Array.isArray(data.recommendedProducts) ? data.recommendedProducts.slice(0, 5).join(", ") : "추천 없음";
      const todos = Array.isArray(data.gptTodoPlan) ? data.gptTodoPlan.map((todo: { title?: string }) => todo.title).join(" / ") : "할일 계획 없음";
      return {
        content: [
          {
            type: "text",
            text: `추천 루틴: ${data.routineId}\n추천 제품: ${products}\nGPT 할일 계획: ${todos}`,
          },
        ],
        structuredContent: data,
      };
    },
  );

  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Mcp-Session-Id, Last-Event-ID");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Mcp-Session-Id, Last-Event-ID");

  const server = createSkinCoachServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req as never, res as never, req.body);
}
