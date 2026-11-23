import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ClientPage, Note, fieldCls } from "@/components/ClientPage";
import { journey, projectIdFromUrl } from "@/lib/journey";
import { CONTACT_EMAIL } from "@/lib/site";

// Private page linked from the payment email: how to switch the client's domain over safely.
export const Route = createFileRoute("/go-live")({
  head: () => ({
    meta: [{ title: "Go-live form — SwiftSite" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: GoLive,
});

type Option = { value: string; label: string; hint?: string };

const REGISTRARS: Option[] = [
  { value: "godaddy", label: "GoDaddy" },
  { value: "namecheap", label: "Namecheap" },
  { value: "squarespace", label: "Squarespace", hint: "Includes domains that used to be on Google Domains" },
  { value: "wix", label: "Wix" },
  { value: "cloudflare", label: "Cloudflare" },
  { value: "shopify", label: "Shopify" },
  { value: "other", label: "Somewhere else" },
  { value: "unsure", label: "I'm not sure" },
];

const CONNECT: Option[] = [
  { value: "we_do_it", label: "You do it for me", hint: "I'll add you as a delegate user — no password sharing" },
  { value: "self", label: "I'll do it myself", hint: "Send me a 5-minute step-by-step guide" },
  { value: "call", label: "Let's do it together", hint: "A quick 15-minute call" },
];

const EMAILS: Option[] = [
  { value: "google", label: "Google Workspace", hint: "Gmail with my business domain" },
  { value: "microsoft", label: "Microsoft 365 / Outlook" },
  { value: "zoho", label: "Zoho Mail" },
  { value: "old_host", label: "Same company as my current website", hint: "e.g. GoDaddy, Bluehost or cPanel email" },
  { value: "other", label: "Another email provider" },
  { value: "none", label: "I don't have email on my domain" },
  { value: "unsure", label: "I'm not sure" },
];

const HOSTS: Option[] = [
  { value: "wix", label: "Wix" },
  { value: "squarespace", label: "Squarespace" },
  { value: "godaddy", label: "GoDaddy", hint: "Website Builder or hosting" },
  { value: "wordpress", label: "WordPress hosting", hint: "Bluehost, SiteGround, HostGator…" },
  { value: "shopify", label: "Shopify" },
  { value: "weebly", label: "Weebly / Square Online" },
  { value: "other", label: "Something else" },
  { value: "unsure", label: "I'm not sure" },
];

function classifyMx(hosts: string[]): string {
  const h = hosts.join(" ").toLowerCase();
  if (!hosts.length) return "none";
  if (h.includes("google.com") || h.includes("googlemail.com")) return "google";
  if (h.includes("outlook.com") || h.includes("office365") || h.includes("microsoft")) return "microsoft";
  if (h.includes("zoho")) return "zoho";
  if (h.includes("secureserver.net") || h.includes("bluehost") || h.includes("hostgator") || h.includes("siteground") || h.includes("websitewelcome")) return "old_host";
  return "other";
}

function classifyNs(hosts: string[]): string {
  const h = hosts.join(" ").toLowerCase();
  if (h.includes("domaincontrol.com")) return "godaddy";
  if (h.includes("registrar-servers.com")) return "namecheap";
  if (h.includes("wixdns.net")) return "wix";
  if (h.includes("squarespacedns") || h.includes("googledomains")) return "squarespace";
  if (h.includes("cloudflare.com")) return "cloudflare";
  if (h.includes("shopify")) return "shopify";
  return "";
}

async function dohLookup(name: string, type: "MX" | "NS"): Promise<string[]> {
  const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, {
    headers: { accept: "application/dns-json" },
  });
  if (!res.ok) return [];
  const j = await res.json();
  return (j.Answer || [])
    .filter((a: { type: number }) => a.type === (type === "MX" ? 15 : 2))
    .map((a: { data: string }) => a.data.replace(/^\d+\s+/, "").replace(/\.$/, ""));
}

const cleanDomain = (v: string) =>
  v.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");

function Choice({ options, value, onChange }: { options: Option[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button type="button" key={o.value} onClick={() => onChange(o.value)} aria-pressed={on}
            className={`rounded-xl border px-4 py-3 text-left transition ${on ? "border-blue ring-2 ring-blue/20" : "border-hairline hover:border-[#c9d6e6]"}`}>
            <span className="block text-[15px] font-medium text-ink">{o.label}</span>
            {o.hint && <span className="mt-1 block text-[13px] text-muted-ink">{o.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="ss-card">
      <h2 className="flex items-center gap-3 text-[20px] font-normal text-ink">
        <span className="tnum flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-medium text-white">{n}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function GoLive() {
  const [projectId, setProjectId] = useState("");
  const [info, setInfo] = useState<{ firstName: string; business: string; website: string; submitted: boolean } | null>(null);
  const [loadError, setLoadError] = useState("");
  const [domain, setDomain] = useState("");
  const [registrar, setRegistrar] = useState("");
  const [registrarLogin, setRegistrarLogin] = useState("");
  const [connectMethod, setConnectMethod] = useState("");
  const [emailProvider, setEmailProvider] = useState("");
  const [currentHost, setCurrentHost] = useState("");
  const [notes, setNotes] = useState("");
  const [mx, setMx] = useState<string[] | null>(null);
  const [detected, setDetected] = useState<{ email: string; registrar: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = projectIdFromUrl();
    setProjectId(id);
    if (!id) { setLoadError("This page needs the personal link from your payment email."); return; }
    journey<{ firstName: string; business: string; website: string; submitted: boolean }>({ action: "golive_get", projectId: id })
      .then((data) => { setInfo(data); if (data.website) setDomain(cleanDomain(data.website)); })
      .catch(() => setLoadError("We couldn't find your project. Please use the link in your payment email, or reply to it."));
  }, []);

  const domainOk = useMemo(() => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(cleanDomain(domain)), [domain]);

  const runCheck = async () => {
    const d = cleanDomain(domain);
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d)) return;
    setChecking(true);
    try {
      const [mxHosts, nsHosts] = await Promise.all([dohLookup(d, "MX"), dohLookup(d, "NS")]);
      setMx(mxHosts);
      const email = classifyMx(mxHosts);
      const reg = classifyNs(nsHosts);
      setDetected({ email, registrar: reg });
      if (!emailProvider) setEmailProvider(email);
      if (!registrar && reg) setRegistrar(reg);
    } catch {
      setMx([]);
    } finally {
      setChecking(false);
    }
  };

  const canSubmit = domainOk && registrar && connectMethod && emailProvider && currentHost;

  const submit = async () => {
    if (!canSubmit) { setError("Please answer every question above."); return; }
    setError("");
    setSubmitting(true);
    try {
      await journey({
        action: "golive_submit",
        projectId,
        mx,
        answers: { domain: cleanDomain(domain), registrar, registrarLogin, connectMethod, emailProvider, emailProviderDetected: detected?.email || "", currentHost, hostingPlan: "swiftsite", notes },
      });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const d = cleanDomain(domain) || "your domain";
  const title = info?.firstName ? `${info.firstName}, let's get your site live` : "Let's get your site live";

  return (
    <ClientPage title={title} intro={<>5 quick questions, about 3 minutes. Your answers tell us how to switch {info?.business || "your site"} over safely, without touching your email.</>}>
      {loadError && <Note tone="warn">{loadError} Questions? Email <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</Note>}
      {done ? (
        <Note tone="ok"><b>Got it, thank you!</b> We just emailed you your go-live plan, step by step. We'll be in touch before we switch anything.</Note>
      ) : (
        !loadError && (
          <>
            {info?.submitted && <Note>You've already sent this form. Sending it again replaces your earlier answers.</Note>}
            <Step n={1} title="What's your domain name?">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input value={domain} onChange={(e) => setDomain(e.target.value)} onBlur={runCheck} placeholder="yourbusiness.ca" className={fieldCls} />
                <button type="button" onClick={runCheck} disabled={!domainOk || checking} className="ss-btn ss-btn-ghost disabled:opacity-40">{checking ? "Checking…" : "Check"}</button>
              </div>
              <Note>Your domain stays <b>registered in your name, in your own account</b>. You keep paying its yearly renewal there, like today. We never take ownership of it.</Note>
            </Step>

            <Step n={2} title="Where did you buy (register) your domain?">
              {detected?.registrar && (
                <p className="text-[15px] text-ink-2">We checked {d}: it looks like it's managed at <b>{REGISTRARS.find((r) => r.value === detected.registrar)?.label}</b>. Change it if that's wrong.</p>
              )}
              <Choice options={REGISTRARS} value={registrar} onChange={setRegistrar} />
              {(registrar === "wix" || registrar === "squarespace" || registrar === "shopify") && (
                <Note tone="warn">Domains bought through a website builder are sometimes tied to its website plan. Before you cancel anything there, we'll confirm the <b>domain renews on its own</b>.</Note>
              )}
              <p className="text-[15px] font-medium text-ink">Can you log in to that account?</p>
              <Choice options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No / I forgot the password" }, { value: "unsure", label: "Not sure" }]} value={registrarLogin} onChange={setRegistrarLogin} />
              {registrarLogin === "no" && <Note>That's common. Use the "forgot password" link with the email you bought the domain with. Stuck? Reply to our email and we'll help.</Note>}
            </Step>

            <Step n={3} title="How should we connect your domain?">
              <Choice options={CONNECT} value={connectMethod} onChange={setConnectMethod} />
              <Note>Your new site runs on a fast global network. To switch over, your domain's <b>name servers</b> (2 short lines in your registrar account) point to us. We copy every existing setting first, so your email keeps working.</Note>
            </Step>

            <Step n={4} title="Who provides your business email?">
              {mx && (
                <p className="text-[15px] text-ink-2">
                  {mx.length ? <>We checked {d}: it looks like you use <b>{EMAILS.find((e) => e.value === detected?.email)?.label}</b>. Change it below if that's wrong.</> : <>We checked {d}: we didn't find any email on this domain.</>}
                </p>
              )}
              <Choice options={EMAILS} value={emailProvider} onChange={setEmailProvider} />
              {["google", "microsoft", "zoho", "other"].includes(emailProvider) && <Note tone="ok">Your email won't be touched. We copy its records exactly as they are.</Note>}
              {emailProvider === "old_host" && <Note tone="warn"><b>Important:</b> your mailboxes live at your current website company. When you cancel the old website plan later, <b>don't cancel the email plan</b>. We'll remind you.</Note>}
              {emailProvider === "none" && <Note>Want one? We can set up free forwarding so info@{d} lands in the inbox you already use. Mention it in the notes below.</Note>}
            </Step>

            <Step n={5} title="Where is your current website hosted?">
              <Choice options={HOSTS} value={currentHost} onChange={setCurrentHost} />
              {currentHost && currentHost !== "unsure" && <Note><b>Don't cancel anything yet.</b> About 3 days after launch we'll email you exactly what to turn off and what to keep.</Note>}
              <label className="block">
                <span className="text-[15px] font-medium text-ink">Anything else we should know? (optional)</span>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={`${fieldCls} mt-1`} placeholder="e.g. my web guy set up the domain years ago" />
              </label>
            </Step>

            {error && <p className="ss-error" role="alert">{error}</p>}
            <button type="button" onClick={submit} disabled={submitting} className="ss-btn ss-btn-primary w-full">{submitting ? "Sending…" : "Send my answers"}</button>
            <p className="ss-small text-center">We'll never change anything without telling you first.</p>
          </>
        )
      )}
    </ClientPage>
  );
}
