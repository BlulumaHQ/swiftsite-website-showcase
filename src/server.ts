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
// SwiftSite "See my new site" form → n8n lead workflow (Leads sheet + notify Sony + auto-reply).
const N8N_LEAD_WEBHOOK = "https://n8n-production-69d1bdd4.up.railway.app/webhook/lead?brand=SwiftSite";
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
  // Bots: honeypot filled or submitted faster than 2 seconds → pretend success, drop it.
  if (f["website_hp"] || (Number(f["_t"]) && Date.now() - Number(f["_t"]) < 1000)) return json(200, { ok: true });
  const url = (f["url"] || "").trim();
  if (!url) return json(400, { ok: false });
  const email = (f["email"] || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json(400, { ok: false });
  try {
    const res = await fetch(N8N_LEAD_WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        // email stays blank on purpose: n8n's auto-reply has no SwiftSite version yet
        // (it would sign as Sonykun Design). The visitor's email goes in the message instead.
        name: email ? email.split("@")[0] : "SwiftSite visitor",
        email: "",
        phone: "",
        message: `Current website: ${url}\nEmail: ${email || "(not given)"}`,
        page: "swiftsite.ca",
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return json(200, { ok: true });
    console.error("n8n lead webhook failed", res.status);
  } catch (err) {
    console.error("n8n lead webhook error", err);
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
