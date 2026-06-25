import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

export type VercelRequest = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[]>;
};

export type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
};

const ENV = ((globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {});
const CONVEX_URL = ENV.CONVEX_URL || ENV.VITE_CONVEX_URL || "https://pastel-giraffe-986.convex.cloud";

export function cors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export function parseBody<T extends Record<string, unknown>>(body: unknown): T {
  if (!body) return {} as T;
  if (typeof body === "string") {
    try { return JSON.parse(body) as T; } catch { return {} as T; }
  }
  if (typeof body === "object") return body as T;
  return {} as T;
}

export function anonHash(seed: unknown): string {
  const input = JSON.stringify(seed ?? "anonymous");
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return `anon_${(hash >>> 0).toString(16).slice(0, 8)}`;
}

export function cleanText(value: unknown, fallback = "unknown"): string {
  if (typeof value !== "string") return fallback;
  return value.slice(0, 80).replace(/[\n\r\t]/g, " ").trim() || fallback;
}

export function cleanArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(item, "")).filter(Boolean).slice(0, 8);
}

export function client() {
  return new ConvexHttpClient(CONVEX_URL);
}

export async function recordSkinCoachEvent(payload: Record<string, unknown>) {
  const convex = client();
  return await convex.mutation(api.analytics.recordEvent as any, payload);
}

export async function skinCoachSummary(range: "all" | "7d" | "24h" = "all") {
  const convex = client();
  return await convex.query(api.analytics.summary as any, { range });
}
