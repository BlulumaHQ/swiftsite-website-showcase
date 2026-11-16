import { useId, useState, type FormEvent } from "react";

const DOMAIN_RE = /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/.*)?$/i;

export function UrlForm() {
  const id = useId();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!DOMAIN_RE.test(url.trim())) {
      setError("Please enter a website address, like yourbusiness.ca");
      return;
    }
    setError("");
    // TODO: wire submit handler to backend (send url + optional email).
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="ss-success">
        Thanks! We'll email your two designs.
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
          placeholder="yourbusiness.ca"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-invalid={!!error}
          className="ss-urlbar-input"
        />
        <button type="submit" className="ss-btn ss-btn-primary">See my new site</button>
      </div>
      {url.trim().length > 0 && (
        <div className="mt-3">
          <label htmlFor={`${id}-email`} className="ss-small block mb-1">Email (optional)</label>
          <input id={`${id}-email`} type="email" placeholder="you@yourbusiness.ca" value={email} onChange={(e) => setEmail(e.target.value)} className="ss-input" />
        </div>
      )}
      {error && <p className="ss-error mt-2" role="alert">{error}</p>}
    </form>
  );
}
