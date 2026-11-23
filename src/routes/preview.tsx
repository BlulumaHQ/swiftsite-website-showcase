import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ClientPage, Note, fieldCls } from "@/components/ClientPage";
import { journey, projectIdFromUrl } from "@/lib/journey";

// Preview links in client emails (/preview?p=<project>). Open → straight to the new website.
// Closed → "Reopen" (48h, Sony is notified) or a short message to us (keeps it open 7 days).
export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [{ title: "Your new website — SwiftSite" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: Preview,
});

type Gate = { open: boolean; business: string; firstName: string; imgA?: string | null; url?: string; urlA?: string };

const REASONS = [
  { key: "time", label: "I need more time to decide" },
  { key: "price", label: "I have a question about the price" },
  { key: "changes", label: "I'd like some changes" },
  { key: "not_now", label: "Not interested right now" },
] as const;

function Preview() {
  const [projectId, setProjectId] = useState("");
  const [gate, setGate] = useState<Gate | null>(null);
  const [loadError, setLoadError] = useState("");
  const [busy, setBusy] = useState<"" | "reopen" | "message">("");
  const [error, setError] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [thanks, setThanks] = useState<Gate | null>(null);

  useEffect(() => {
    const id = projectIdFromUrl();
    setProjectId(id);
    if (!id) {
      setLoadError("This page needs the personal link from our email.");
      return;
    }
    journey<Gate>({ action: "preview_gate", projectId: id, v: "A" })
      .then((g) => (g.open && g.url ? window.location.replace(g.url) : setGate(g)))
      .catch((e) => setLoadError(e instanceof Error ? e.message : "We couldn't find your website."));
  }, []);

  const reopen = async () => {
    setBusy("reopen");
    setError("");
    try {
      const g = await journey<Gate>({ action: "preview_reopen", projectId, v: "A" });
      if (!g.url) throw new Error("Something went wrong. Please try again.");
      window.location.replace(g.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy("");
    }
  };

  const send = async () => {
    setBusy("message");
    setError("");
    try {
      setThanks(await journey<Gate>({ action: "preview_message", projectId, v: "A", reasons, message, website_hp: hp }));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
    }
  };

  if (thanks) {
    return (
      <ClientPage title="Thank you — we got your message">
        <Note tone="ok">
          A real person from our team will get back to you shortly.
          {thanks.open && " Your new website is back online for the next 7 days."}
        </Note>
        {thanks.open && thanks.urlA && (
          <a href={thanks.urlA} className="ss-btn ss-btn-primary">
            Open my new website ↗
          </a>
        )}
      </ClientPage>
    );
  }

  const title = gate ? `${gate.firstName ? `${gate.firstName}, your` : "Your"} preview is closed` : "Your new website";

  return (
    <ClientPage title={title} intro={gate?.business ? <>For {gate.business}</> : undefined}>
      {loadError && <Note tone="warn">{loadError}</Note>}
      {!gate && !loadError && <p className="ss-small">Opening your new website…</p>}
      {gate && (
        <>
          <div className="ss-card">
            {gate.imgA && <img src={gate.imgA} alt="" className="mb-4 aspect-[16/10] w-full rounded-xl object-cover object-top opacity-60 blur-[2px]" />}
            <p className="text-ink-2">The new website we made is still here. Want another look?</p>
            <button onClick={reopen} disabled={!!busy} className="ss-btn ss-btn-primary mt-5 w-full disabled:opacity-60">
              {busy === "reopen" ? "Opening…" : "Reopen my new website"}
            </button>
            <p className="ss-small mt-2 text-center">Opens right away for 48 hours. Nothing to pay.</p>
          </div>

          <div className="ss-card">
            <h2 className="ss-card-title">Have a question or concern? Let us know</h2>
            <div className="mt-4 space-y-2">
              {REASONS.map((r) => {
                const on = reasons.includes(r.key);
                return (
                  <button
                    key={r.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setReasons((s) => (on ? s.filter((x) => x !== r.key) : [...s, r.key]))}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] ${on ? "border-blue bg-[#eef4ff] font-semibold text-ink" : "border-[#c9d6e6] text-ink"}`}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] ${on ? "border-blue bg-blue text-white" : "border-[#c9d6e6]"}`}>{on ? "✓" : ""}</span>
                    {r.label}
                  </button>
                );
              })}
            </div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Anything else you'd like to tell us (optional)" className={`${fieldCls} mt-3`} />
            <input value={hp} onChange={(e) => setHp(e.target.value)} name="website_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {error && <Note tone="warn">{error}</Note>}
            <button onClick={send} disabled={!!busy || (!reasons.length && !message.trim())} className="ss-btn ss-btn-ghost mt-4 w-full disabled:opacity-40">
              {busy === "message" ? "Sending…" : "Send"}
            </button>
          </div>
        </>
      )}
    </ClientPage>
  );
}
