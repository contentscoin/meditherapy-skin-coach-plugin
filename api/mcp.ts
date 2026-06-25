import { readFileSync } from "node:fs";
import { join } from "node:path";
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "./_shared.js";

const BASE_URL = "https://meditherapy-skin-coach-dashboard.vercel.app";
const WIDGET_URI = "ui://meditherapy/skin-coach.html";

function readWidgetHtml() {
  try {
    return readFileSync(join(process.cwd(), "public", "skin-coach-widget.html"), "utf8");
  } catch {
    return "<html><body><h1>메디테라피 스킨 코치</h1><p>피부고민 기반 루틴 추천 앱입니다.</p></body></html>";
  }
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
