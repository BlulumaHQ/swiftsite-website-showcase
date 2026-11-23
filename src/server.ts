import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
// SwiftSite "Get my free preview" form → client-journey (lead + confirmation email from info@swiftsite.ca
// + notify Sony + Leads sheet via n8n). The lead then shows up in swiftlift.app/admin/send as SwiftSite.
const JOURNEY_URL = "https://czdbnlewbbwbtgjjwute.supabase.co/functions/v1/client-journey";
const JOURNEY_KEY = "sb_publishable_kcpYpK49_gQxhocNbK-dmw_Ixc1dsyb"; // public (publishable) key
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

async function handleLead(request: Request): Promise<Response> {
  if (request.method !== "POST") return json(405, { ok: false });
  let f: Record<string, string> = {};
  try {
    f = Object.fromEntries(Object.entries(await request.json()).map(([k, v]) => [k, String(v ?? "").slice(0, 2000)]));
  } catch {
    return json(400, { ok: false });
  }
  // Bots: honeypot filled or submitted too fast → pretend success, drop it.
  if (f["website_hp"] || (Number(f["_t"]) && Date.now() - Number(f["_t"]) < 1000)) return json(200, { ok: true });
  const url = (f["url"] || "").trim();
  const email = (f["email"] || "").trim();
  if (!url || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json(400, { ok: false });
  try {
    const res = await fetch(JOURNEY_URL, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: JOURNEY_KEY },
      body: JSON.stringify({ action: "swiftsite_lead", url, email }),
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) return json(200, { ok: true });
    console.error("lead → client-journey failed", res.status, await res.text());
  } catch (err) {
    console.error("lead → client-journey error", err);
  }
  return json(502, { ok: false });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    if (new URL(request.url).pathname === "/api/lead") return handleLead(request);
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
