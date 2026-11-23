import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ClientPage, Note, fieldCls } from "@/components/ClientPage";
import { journey, projectIdFromUrl, uploadToSignedUrl } from "@/lib/journey";
import { CONTACT_EMAIL } from "@/lib/site";

// Private page linked from client emails: launch (pay) the preview, then send 2 rounds of changes, then approve.
export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [{ title: "Your new website — SwiftSite" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: Review,
});

type Info = {
  brand: string;
  ssPrice?: { setup: number; monthly: number; yearly: number; includedRounds: number };
  firstName: string;
  business: string;
  linkA: string;
  reportUrl?: string | null;
  pages: string[];
  roundsUsed: number;
  includedRounds: number;
  paid: boolean;
  approved: boolean;
  pending: { round: number } | null;
};

const PRICE = { setup: 99, monthly: 25, yearly: 250, includedRounds: 2 };

function Review() {
  const [projectId, setProjectId] = useState("");
  const [info, setInfo] = useState<Info | null>(null);
  const [loadError, setLoadError] = useState("");
  const [flags, setFlags] = useState({ paid: false, canceled: false });

  const load = async (id: string) => {
    try {
      setInfo(await journey<Info>({ action: "review_get", projectId: id }));
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "We couldn't find your website. Please use the link in our email.");
    }
  };

  useEffect(() => {
    const id = projectIdFromUrl();
    const q = new URLSearchParams(window.location.search);
    setFlags({ paid: q.get("paid") === "1", canceled: q.get("canceled") === "1" });
    setProjectId(id);
    if (!id) setLoadError("This page needs the personal link from our email.");
    else load(id);
  }, []);

  // Just back from Stripe: the payment webhook can take a few seconds.
  useEffect(() => {
    if (!flags.paid || !info || info.paid) return;
    const t = setTimeout(() => load(projectId), 4000);
    return () => clearTimeout(t);
  }, [flags.paid, info, projectId]);

  const hi = info?.firstName ? `${info.firstName}, ` : "";
  const title = !info ? "Your new website" : info.approved ? "We're taking it live" : info.paid ? `${hi}let's fine-tune it` : `${hi}your new website is ready`;

  return (
    <ClientPage title={title} intro={info?.business ? <>For {info.business}</> : undefined}>
      {loadError && <Note tone="warn">{loadError} Questions? Email <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</Note>}
      {!info && !loadError && <p className="ss-small">Loading…</p>}
      {info && !info.paid && flags.paid && <Note tone="ok">Payment received. Setting up your project…</Note>}
      {info && !info.paid && !flags.paid && <Launch info={info} projectId={projectId} canceled={flags.canceled} />}
      {info && info.paid && <AfterLaunch info={info} projectId={projectId} onChange={() => load(projectId)} />}
    </ClientPage>
  );
}

function PreviewCard({ info }: { info: Info }) {
  return (
    <div className="ss-card">
      <h2 className="ss-card-title">Your new website</h2>
      <p className="mt-2 text-ink-2">Click through every page on both your phone and your computer.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={info.linkA} target="_blank" rel="noopener noreferrer" className="ss-btn ss-btn-ghost">Open my new website ↗</a>
        {info.reportUrl && <a href={info.reportUrl} target="_blank" rel="noopener noreferrer" className="ss-btn ss-btn-ghost">Read the report ↗</a>}
      </div>
    </div>
  );
}

function Launch({ info, projectId, canceled }: { info: Info; projectId: string; canceled: boolean }) {
  const P = info.ssPrice || PRICE;
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const today = P.setup + (plan === "yearly" ? P.yearly : P.monthly);

  const launch = async () => {
    setBusy(true);
    setError("");
    try {
      const { url } = await journey<{ url: string }>({ action: "review_approve", projectId, plan });
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  const opt = (value: "monthly" | "yearly", label: string, hint: string) => (
    <button type="button" onClick={() => setPlan(value)} aria-pressed={plan === value}
      className={`rounded-xl border p-4 text-left transition ${plan === value ? "border-blue ring-2 ring-blue/20" : "border-hairline hover:border-[#c9d6e6]"}`}>
      <span className="block font-medium text-ink">{label}</span>
      <span className="mt-1 block text-[14px] text-muted-ink">{hint}</span>
    </button>
  );

  return (
    <>
      <PreviewCard info={info} />
      {canceled && <Note>No problem, nothing was charged. Your website is still here when you're ready.</Note>}
      <div className="ss-card">
        <h2 className="ss-card-title">Love it? Launch it.</h2>
        <p className="mt-2 text-ink-2">A one-time <b>${P.setup} setup</b>, plus Hosting &amp; Care. Pick how you'd like to pay for hosting:</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {opt("monthly", `$${P.monthly} / month`, "Cancel anytime")}
          {opt("yearly", `$${P.yearly} / year`, "2 months free")}
        </div>
        <ul className="mt-6 space-y-2 text-[15px] text-ink-2">
          <li>✓ <b>{P.includedRounds} rounds of changes</b> before we go live, starting right after you launch</li>
          <li>✓ Connected to your domain. Your email keeps working.</li>
          <li>✓ Hosting, backups, security updates and up to 2 small edits every month</li>
        </ul>
        <p className="mt-6 text-[15px] text-ink">Today: <b className="tnum">${today} CAD</b> <span className="text-muted-ink">(${P.setup} setup + first {plan === "yearly" ? "year" : "month"})</span></p>
        {error && <p className="ss-error mt-3" role="alert">{error}</p>}
        <button type="button" onClick={launch} disabled={busy} className="ss-btn ss-btn-primary mt-5 w-full sm:w-auto">
          {busy ? "Opening secure checkout…" : "Launch my new website"}
        </button>
        <p className="ss-small mt-3">Secure payment by Stripe. Your card is saved for your hosting renewals.</p>
      </div>
      <p className="ss-small">Not quite what you had in mind? You pay nothing. Just reply to our email and tell us what you'd like different.</p>
    </>
  );
}

type Upload = { name: string; path: string; state: "uploading" | "done" | "error" };

function AfterLaunch({ info, projectId, onChange }: { info: Info; projectId: string; onChange: () => void }) {
  const goLive = `/go-live?p=${encodeURIComponent(projectId)}`;
  if (info.approved) {
    return (
      <>
        <Note tone="ok">Thank you! You've approved your new website. We'll connect it to your domain and email you as soon as it's live.</Note>
        <div className="ss-card">
          <h2 className="ss-card-title">Haven't sent your domain details yet?</h2>
          <p className="mt-2 text-ink-2">The go-live form takes about 3 minutes and tells us how to switch over safely.</p>
          <a href={goLive} className="ss-btn ss-btn-primary mt-5">Open the go-live form</a>
        </div>
      </>
    );
  }
  const left = Math.max(0, info.includedRounds - info.roundsUsed);
  return (
    <>
      <PreviewCard info={info} />
      {info.pending ? (
        <Note tone="ok">We're working on your round {info.pending.round} changes. You'll get an email within 1–2 business days.</Note>
      ) : left > 0 ? (
        <ChangesForm info={info} projectId={projectId} round={info.roundsUsed + 1} onSent={onChange} />
      ) : (
        <Note>You've used both rounds of changes. Need something else before launch? Email <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</Note>
      )}
      {!info.pending && <Approve projectId={projectId} onDone={onChange} />}
      <div className="ss-card">
        <h2 className="ss-card-title">Your domain details</h2>
        <p className="mt-2 text-ink-2">About 3 minutes. Tells us how to connect your new site without touching your email.</p>
        <a href={goLive} className="ss-btn ss-btn-ghost mt-5">Open the go-live form</a>
      </div>
    </>
  );
}

function ChangesForm({ info, projectId, round, onSent }: { info: Info; projectId: string; round: number; onSent: () => void }) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [overall, setOverall] = useState({ colors: "", photos: "", other: "" });
  const [files, setFiles] = useState<Upload[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const addFiles = async (list: FileList | null) => {
    if (!list) return;
    for (const file of Array.from(list).slice(0, 10 - files.length)) {
      setFiles((s) => [...s, { name: file.name, path: "", state: "uploading" }]);
      try {
        const up = await journey<{ path: string; signedUrl: string }>({ action: "review_upload_url", projectId, name: file.name });
        await uploadToSignedUrl(up.signedUrl, file);
        setFiles((s) => s.map((f) => (f.name === file.name && f.state === "uploading" ? { ...f, path: up.path, state: "done" } : f)));
      } catch {
        setFiles((s) => s.map((f) => (f.name === file.name && f.state === "uploading" ? { ...f, state: "error" } : f)));
      }
    }
  };

  const send = async () => {
    if (files.some((f) => f.state === "uploading")) { setError("Please wait for the screenshots to finish uploading."); return; }
    setBusy(true);
    setError("");
    try {
      await journey({
        action: "review_submit",
        projectId,
        preview: "A",
        pages: Object.entries(notes).map(([page, note]) => ({ page, note })),
        overall,
        files: files.filter((f) => f.state === "done").map((f) => ({ path: f.path, name: f.name })),
      });
      onSent();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ss-card">
      <p className="ss-eyebrow">Round {round} of {info.includedRounds}</p>
      <h2 className="ss-card-title mt-2">Send your changes</h2>
      <Note>Please go through <b>every page</b> first, then send all your changes for this round together. Leave anything you're happy with empty.</Note>
      <div className="mt-6 space-y-4">
        {info.pages.map((page) => (
          <label key={page} className="block">
            <span className="text-[15px] font-medium text-ink">{page}</span>
            <textarea rows={3} value={notes[page] || ""} onChange={(e) => setNotes({ ...notes, [page]: e.target.value })} className={`${fieldCls} mt-1`} placeholder="What should we change on this page?" />
          </label>
        ))}
        <label className="block">
          <span className="text-[15px] font-medium text-ink">Colours or fonts</span>
          <textarea rows={2} value={overall.colors} onChange={(e) => setOverall({ ...overall, colors: e.target.value })} className={`${fieldCls} mt-1`} />
        </label>
        <label className="block">
          <span className="text-[15px] font-medium text-ink">Photos</span>
          <textarea rows={2} value={overall.photos} onChange={(e) => setOverall({ ...overall, photos: e.target.value })} className={`${fieldCls} mt-1`} placeholder="Which photos to swap? You can upload new ones below." />
        </label>
        <label className="block">
          <span className="text-[15px] font-medium text-ink">Anything else</span>
          <textarea rows={2} value={overall.other} onChange={(e) => setOverall({ ...overall, other: e.target.value })} className={`${fieldCls} mt-1`} />
        </label>
        <div>
          <span className="text-[15px] font-medium text-ink">Screenshots or new photos (up to 10)</span>
          {files.length > 0 && (
            <ul className="mt-2 space-y-1 text-[14px] text-ink-2">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between gap-2 rounded-lg bg-soft px-3 py-2">
                  <span className="truncate">{f.name} <span className="text-muted-ink">{f.state === "uploading" ? "· uploading…" : f.state === "error" ? "· failed" : "✓"}</span></span>
                  <button type="button" onClick={() => setFiles((s) => s.filter((_, j) => j !== i))} className="px-2 text-muted-ink" aria-label={`Remove ${f.name}`}>✕</button>
                </li>
              ))}
            </ul>
          )}
          {files.length < 10 && <input type="file" multiple accept="image/*,.pdf" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} className="mt-2 block w-full text-[15px]" />}
        </div>
      </div>
      {error && <p className="ss-error mt-4" role="alert">{error}</p>}
      <button type="button" onClick={send} disabled={busy} className="ss-btn ss-btn-primary mt-6 w-full sm:w-auto">
        {busy ? "Sending…" : `Send my round ${round} changes`}
      </button>
    </div>
  );
}

function Approve({ projectId, onDone }: { projectId: string; onDone: () => void }) {
  const [step, setStep] = useState<"idle" | "confirm" | "busy">("idle");
  const [error, setError] = useState("");
  const approve = async () => {
    setStep("busy");
    setError("");
    try {
      await journey({ action: "review_approve", projectId });
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStep("confirm");
    }
  };
  return (
    <div className="ss-card">
      <h2 className="ss-card-title">Happy with it as it is?</h2>
      <p className="mt-2 text-ink-2">Approve your website and we'll take it live. After launch, your plan still includes up to 2 small edits every month.</p>
      {error && <p className="ss-error mt-3" role="alert">{error}</p>}
      {step === "idle" ? (
        <button type="button" onClick={() => setStep("confirm")} className="ss-btn ss-btn-ghost mt-5">Approve — take it live</button>
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" onClick={approve} disabled={step === "busy"} className="ss-btn ss-btn-primary">{step === "busy" ? "Approving…" : "Yes, take it live"}</button>
          <button type="button" onClick={() => setStep("idle")} className="ss-btn ss-btn-ghost">Not yet</button>
        </div>
      )}
    </div>
  );
}
