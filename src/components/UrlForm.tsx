import { useId, useRef, useState, type FormEvent } from "react";

const DOMAIN_RE = /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/.*)?$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

declare global {
  interface Window { dataLayer?: unknown[] }
}

/** Conversion event for analytics (GA4 / GTM read dataLayer; harmless if none is installed). */
function trackLead() {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "generate_lead", form: "swiftsite_preview" });
  } catch {
    /* analytics must never break the form */
  }
}

export function UrlForm() {
  const id = useId();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [sending, setSending] = useState(false);
  const [hp, setHp] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!DOMAIN_RE.test(url.trim())) {
      setError("Please enter your website address, like yourbusiness.ca");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter your email so we can send your new website.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: url.trim(), email: email.trim(), website_hp: hp, _t: startedAt.current }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead();
      setDone(email.trim());
    } catch {
      setError("Something went wrong. Please try again, or email info@swiftsite.ca");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <p role="status" className="ss-success">
        Got it! Your new website preview will arrive at {done} within 48 hours. Look for an email from info@swiftsite.ca.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[560px]">
      <div className="ss-urlbar">
        <label htmlFor={`${id}-url`} className="sr-only">Your current website</label>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ss-urlbar-icon">
          <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
        <input
          id={`${id}-url`}
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.ca"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-invalid={!!error && !DOMAIN_RE.test(url.trim())}
          className="ss-urlbar-input"
        />
      </div>
      <div className="ss-urlbar mt-3">
        <label htmlFor={`${id}-email`} className="sr-only">Your email</label>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ss-urlbar-icon">
          <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
        </svg>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="you@yourbusiness.ca"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error && !EMAIL_RE.test(email.trim())}
          className="ss-urlbar-input"
        />
        <button type="submit" disabled={sending} className="ss-btn ss-btn-primary">{sending ? "Sending…" : "Get my free preview"}</button>
      </div>
      <input type="text" name="website_hp" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      {error && <p className="ss-error mt-2" role="alert">{error}</p>}
    </form>
  );
}
