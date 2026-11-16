import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UrlForm } from "@/components/UrlForm";
import { studies, launchedSites } from "@/data/work";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { SiteHeader, SiteFooter, Shot } from "@/components/SiteChrome";

const TITLE = "SwiftSite — Brand-new website for $99 CAD";
const DESC = "AI rebuilds your small business website into two fresh designs, checked by a real designer. Pick one for $99 CAD. Free preview, no credit card.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

function Check({ className = "text-success" }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${className}`}>
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[440px] w-full max-w-[520px]">
      <div className="absolute left-0 top-6 w-[62%] -rotate-6 rounded-xl border border-hairline bg-soft p-4 shadow-sm">
        <p className="mb-3 text-[11px] font-medium text-muted-ink">Your current site</p>
        <div className="space-y-2">
          <div className="h-16 rounded bg-[#dfe4ea]" />
          <div className="h-2.5 w-3/4 rounded bg-[#dfe4ea]" />
          <div className="h-2.5 w-1/2 rounded bg-[#dfe4ea]" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="h-10 rounded bg-[#e8ecf0]" /><div className="h-10 rounded bg-[#e8ecf0]" /><div className="h-10 rounded bg-[#e8ecf0]" />
          </div>
        </div>
      </div>
      <BrowserCard className="absolute right-0 top-0 w-[68%] rotate-2" label="Version A — Clean & modern">
        <Shot src={studies[0]!.versionA.image} alt="" className="aspect-[16/10] rounded-md" />
      </BrowserCard>
      <BrowserCard className="absolute bottom-6 left-[14%] w-[66%] -rotate-1" label="Version B — Bold & warm">
        <Shot src={studies[0]!.versionB.image} alt="" className="aspect-[16/10] rounded-md" />
      </BrowserCard>
      <div className="absolute bottom-0 right-0 flex items-center gap-3 rounded-2xl border border-hairline bg-white px-4 py-3 shadow-lg">
        <span className="tnum grid h-11 w-11 place-items-center rounded-full border-[3px] border-success text-[11px] font-semibold text-ink">[96]</span>
        <span>
          <span className="block text-[13px] font-medium text-ink">PageSpeed score</span>
          <span className="tnum block text-[12px] text-muted-ink">was [38] on the old site</span>
        </span>
      </div>
    </div>
  );
}

function BrowserCard({ className, label, children }: { className: string; label: string; children: React.ReactNode }) {
  return (
    <div className={`${className} rounded-xl border border-hairline bg-white p-3 shadow-[0_20px_50px_-15px_rgba(11,27,51,.25)]`}>
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-hairline" /><span className="h-2 w-2 rounded-full bg-hairline" /><span className="h-2 w-2 rounded-full bg-hairline" />
        <span className="ml-2 text-[11px] font-medium text-ink-2">{label}</span>
      </div>
      {children}
    </div>
  );
}

const trustIcons = [
  <path key="a" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z M9 12l2 2 4-4" />,
  <path key="b" d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z M12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  <path key="c" d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3z" />,
  <path key="d" d="M6 11V8a6 6 0 0112 0v3 M5 11h14v10H5z" />,
];
const trustItems = ["Every site checked by a real designer", "Based in Vancouver, BC", "20+ years designing websites", "Your domain and content stay yours"];

const steps = [
  ["01", "Paste your website", "Our AI reads your current site and pulls your services, photos, hours and contact details. You don't prepare anything."],
  ["02", "Get two new designs", "Two real, clickable websites in two different styles, checked by a designer before they reach your inbox."],
  ["03", "Pick one. Go live.", "Choose your favourite, ask for tweaks by email, and we put it live on your domain. Your email keeps working."],
];

const faqs = [
  ["Is it really $99?", "Yes. AI does the heavy lifting, so we can rebuild a small business website for a fraction of the usual cost. You see both designs before you pay anything."],
  ["What if I don't like either version?", "Then you pay nothing. No credit card is needed for the preview."],
  ["Will my email or domain break?", "No. Your domain stays where it is and your email keeps working. We only point your website to the new design."],
  ["Who checks the AI's work?", "A real designer reviews every site before it is sent to you."],
  ["Can you add online booking or a store?", "SwiftSite rebuilds informational websites. If you already use a booking or ordering system, we link to it from your new site. Custom features are quoted separately."],
];

function TwoDirections() {
  const [idx, setIdx] = useState(0);
  const [v, setV] = useState<"A" | "B">("A");
  const s = studies[idx]!;
  const shown = v === "A" ? s.versionA : s.versionB;
  const pick = (i: number) => {
    setIdx(i);
    setV("A");
  };
  return (
    <section id="work" className="ss-section bg-ink text-white">
      <div className="ss-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <p className="ss-eyebrow !text-mint">Two directions</p>
            <h2 className="ss-h2 mt-4">Every customer sees two real versions. Then they choose.</h2>
          </div>
          <div className="flex gap-2" role="group" aria-label="Choose version">
            {(["A", "B"] as const).map((k) => (
              <button key={k} type="button" className="ss-toggle" aria-pressed={v === k} onClick={() => setV(k)}>Version {k}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Choose a project">
          {studies.map((st, i) => (
            <button key={st.id} type="button" className="ss-toggle" aria-pressed={idx === i} onClick={() => pick(i)}>{st.client}</button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[14px] border border-dark-border bg-dark-card p-4" aria-live="polite">
            <div className="mb-3 flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-dark-border" /><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-dark-border" /><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-dark-border" />
              <span className="ml-3 text-[13px] text-muted-dark">{s.client} · Version {v}</span>
            </div>
            <Shot key={shown.image} src={shown.image} alt={`${s.client} website, version ${v}`} className="aspect-[16/10] rounded-lg bg-ink" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="ss-dark-card">
              <p className="text-[13px] text-muted-dark">Study {idx + 1} of {studies.length}</p>
              <p className="mt-2 text-lg font-normal">{s.client}</p>
              <p className="text-[14px] text-muted-dark">{s.industry}</p>
            </div>
            <div className="ss-dark-card">
              <p className="text-[13px] text-muted-dark">Two designs, same content</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["A", "B"] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setV(k)} aria-label={`Show version ${k}`} className={`overflow-hidden rounded-md border-2 ${v === k ? "border-mint" : "border-transparent"}`}>
                    <Shot src={k === "A" ? s.versionA.image : s.versionB.image} alt="" className="aspect-[16/10]" />
                  </button>
                ))}
              </div>
              <a href={shown.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-[14px] text-mint hover:underline">Open version {v} →</a>
            </div>
            {s.chosen && (
              <div className="flex items-center gap-3 rounded-[14px] bg-mint p-6 text-ink">
                <Check className="text-ink" />
                <p className="font-medium">Client chose Version {s.chosen}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex items-end justify-between gap-4">
          <h3 className="ss-card-title">Their pick, now live</h3>
          <a href="/work" className="inline-flex min-h-11 items-center text-mint hover:underline">See all work →</a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {launchedSites.slice(0, 6).map((site) => (
            <a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer" className="ss-dark-card group block !p-4 hover:border-mint">
              <Shot src={site.image} alt={`${site.client} website`} className="aspect-[16/10] rounded-lg bg-ink" />
              <p className="mt-4 font-normal group-hover:text-mint">{site.client}</p>
              <p className="text-[14px] text-muted-dark">{site.industry}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="ss-section">
      <div className="ss-container">
        <div className="mx-auto max-w-[840px]">
          <p className="ss-eyebrow text-center">FAQ</p>
          <h2 className="ss-h2 mt-4 text-center">Questions, answered.</h2>
          <div className="mt-12 border-t border-hairline">
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b border-hairline">
                <h3>
                  <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-[19px] font-normal text-ink">
                    {q}
                    <span aria-hidden="true" className={`text-2xl font-light text-blue transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={open !== i} className="pb-6 pr-10 text-[17px] leading-relaxed text-ink-2">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main>
        <section className="relative -mt-20 overflow-hidden pb-24 pt-36 md:pb-28">
          <div aria-hidden="true">
            <div className="ss-mesh left-[-8%] top-[-120px] h-[380px] w-[380px] bg-[#9fe8d8]" />
            <div className="ss-mesh left-[25%] top-[-160px] h-[360px] w-[420px] bg-[#a9c8ff]" />
            <div className="ss-mesh left-[55%] top-[-140px] h-[340px] w-[360px] bg-[#c9b8ff]" />
            <div className="ss-mesh right-[-6%] top-[-100px] h-[320px] w-[340px] bg-[#ffd3b0]" />
          </div>
          <div className="ss-container relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/80 px-3.5 py-1.5 text-[13px] font-normal text-ink-2">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                AI-built · Designer-checked · Made in Vancouver
              </span>
              <h1 className="ss-h1 mt-6">
                Same business.<br />Brand-new website.<br /><span className="font-medium tnum">$99.</span>
              </h1>
              <p className="ss-lead mt-6 max-w-[520px]">AI rebuilds your current website into two fresh designs, using the words and photos you already have. Up to 4× faster than your old site.</p>
              <div className="mt-8"><UrlForm /></div>
              <p className="ss-small mt-4">Free preview · No credit card · You only pay if you love it</p>
            </div>
            <HeroVisual />
          </div>
        </section>

        <section className="border-y border-hairline bg-soft py-8" aria-label="Why SwiftSite">
          <ul className="ss-container grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((t, i) => (
              <li key={t} className="flex items-center gap-3 text-[15px] text-ink-2">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">{trustIcons[i]}</svg>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section id="how" className="ss-section">
          <div className="ss-container">
            <p className="ss-eyebrow">How it works</p>
            <h2 className="ss-h2 mt-4 max-w-[760px]">No meetings. No forms to fill. No designer back-and-forth.</h2>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {steps.map(([n, t, d]) => (
                <div key={n} className="ss-card">
                  <p className="tnum text-[14px] font-medium text-blue">{n}</p>
                  <h3 className="ss-card-title mt-6">{t}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TwoDirections />

        <section className="ss-section">
          <div className="ss-container grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="ss-eyebrow">Built for speed</p>
              <h2 className="ss-h2 mt-4">A faster site means more people stay, call and book.</h2>
              <p className="ss-lead mt-6">SwiftSite websites are lean, modern code with no plugins slowing them down. They load in a blink on any phone.</p>
            </div>
            <div className="ss-card">
              <div>
                <div className="flex justify-between text-[15px] text-ink-2"><span>Typical older website</span><span className="tnum font-medium text-ink">[4.8s]</span></div>
                <div className="mt-2 h-4 w-full rounded-full bg-[#ffb199]" />
              </div>
              <div className="mt-8">
                <div className="flex justify-between text-[15px] text-ink-2"><span>SwiftSite</span><span className="tnum font-medium text-ink">[1.2s]</span></div>
                <div className="mt-2 h-4 w-1/4 rounded-full bg-success" />
              </div>
              <p className="ss-small mt-8">Load time on mobile. Replace with measured results before launch.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="ss-section bg-soft">
          <div className="ss-container">
            <p className="ss-eyebrow text-center">Pricing</p>
            <h2 className="ss-h2 mt-4 text-center">One simple price.</h2>
            <div className="mx-auto mt-14 grid max-w-[960px] gap-6 md:grid-cols-2">
              <div className="ss-card flex flex-col">
                <h3 className="ss-card-title">New website</h3>
                <p className="mt-4 flex items-baseline gap-3"><span className="tnum text-[64px] font-light leading-none tracking-[-2px]">$99</span><span className="text-muted-ink">CAD, one time</span></p>
                <ul className="mt-8 space-y-3 text-ink-2">
                  {["Two complete designs to choose from", "Your words, photos and pages moved over", "Mobile-ready and fast-loading", "[2] rounds of changes by email", "Connected to your domain, email untouched"].map((f) => (
                    <li key={f} className="flex gap-3"><Check />{f}</li>
                  ))}
                </ul>
                <a href="#start" className="ss-btn ss-btn-primary mt-10 w-full">Get my free preview</a>
              </div>
              <div className="flex flex-col rounded-[14px] bg-ink p-8 text-white">
                <h3 className="ss-card-title">Care plan</h3>
                <p className="mt-4"><span className="text-muted-dark">from </span><span className="tnum text-[40px] font-light tracking-[-1px]">$15</span><span className="text-muted-dark">/month</span></p>
                <p className="mt-6 leading-relaxed text-muted-dark">Hosting, security and small updates, so your site stays fast and current. [Plan details coming soon]</p>
              </div>
            </div>
            <div className="mx-auto mt-6 flex max-w-[960px] flex-col gap-4 rounded-[14px] border border-dashed border-[#c9d6e6] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[18px] font-normal">Want more customers to find you?</p>
                <p className="text-ink-2">Add SEO after your new site goes live.</p>
              </div>
              <a href={`mailto:${CONTACT_EMAIL}`} className="ss-btn ss-btn-ghost">Ask about SEO</a>
            </div>
          </div>
        </section>

        <Faq />

        <section id="start" className="ss-section relative overflow-hidden bg-soft">
          <div aria-hidden="true">
            <div className="ss-mesh bottom-[-160px] left-[10%] h-[320px] w-[420px] bg-[#9fe8d8]" />
            <div className="ss-mesh bottom-[-160px] right-[10%] h-[320px] w-[420px] bg-[#a9c8ff]" />
          </div>
          <div className="ss-container relative flex flex-col items-center text-center">
            <h2 className="ss-h2 max-w-[720px]">See your new website before you spend a dollar.</h2>
            <div className="mt-10 flex w-full justify-center text-left"><UrlForm /></div>
            <p className="ss-small mt-4">Two designs in your inbox in [48 hours] · Free · No credit card</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
