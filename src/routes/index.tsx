import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UrlForm } from "@/components/UrlForm";
import { studies } from "@/data/work";
import { Portfolio } from "@/components/Portfolio";
import { SITE_URL, CONTACT_EMAIL, OG_IMAGE } from "@/lib/site";
import { SiteHeader, SiteFooter, StickyCta } from "@/components/SiteChrome";

const TITLE = "SwiftSite — Brand-new website for $99 CAD";
const DESC = "AI rebuilds your small business website into a brand-new design, checked by a real designer. See it free, then launch it for $99 CAD.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "SwiftSite — Same business. Brand-new website. $99." },
      { property: "og:site_name", content: "SwiftSite" },
      { name: "twitter:image", content: OG_IMAGE },
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
  const after = studies[0]!.versionB.image; // K. Chen: live site
  return (
    <div aria-hidden="true" className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[420px]">
      <div className="absolute left-0 top-4 w-[58%] -rotate-6 rounded-xl border border-hairline bg-soft p-4 shadow-sm">
        <p className="mb-3 text-[11px] font-medium text-muted-ink">Before: your current site</p>
        <div className="space-y-2">
          <div className="h-16 rounded bg-[#dfe4ea]" />
          <div className="h-2.5 w-3/4 rounded bg-[#dfe4ea]" />
          <div className="h-2.5 w-1/2 rounded bg-[#dfe4ea]" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="h-10 rounded bg-[#e8ecf0]" /><div className="h-10 rounded bg-[#e8ecf0]" /><div className="h-10 rounded bg-[#e8ecf0]" />
          </div>
        </div>
      </div>
      <BrowserCard className="absolute bottom-12 right-0 w-[80%] rotate-1" label="After: your new website">
        <img src={after} alt="" loading="eager" fetchPriority="high" decoding="async" className="block aspect-[16/10] w-full rounded-md object-cover object-top" />
      </BrowserCard>
      <div className="absolute bottom-0 left-[4%] flex items-center gap-3 rounded-2xl border border-hairline bg-white px-4 py-3 shadow-lg">
        <img src="/images/sony-lin.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
        <span>
          <span className="block text-[13px] font-medium text-ink">Checked by Sony Lin</span>
          <span className="block text-[12px] text-muted-ink">Lead designer · 500+ websites</span>
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
const trustItems = ["Every site checked by a real designer", "Based in Vancouver, BC", "500+ websites built over 20 years", "Your domain, content and files stay yours"];

const steps = [
  ["01", "Paste your website", "Our AI reads your current site and pulls your services, photos, hours and contact details. You don't prepare anything."],
  ["02", "Get your new website", "A real, clickable website built from your content, checked by a designer before it reaches your inbox."],
  ["03", "Love it? Go live.", "Pay $99, ask for tweaks by email, and we put it live on your domain. Your email keeps working."],
];

const faqs = [
  ["Is it really $99?", "Yes. $99 to build and launch your new website, then $15/month (or $165/year) for hosting and care. You see your new website before you pay anything."],
  ["What if I don't like it?", "Then you pay nothing. No credit card is needed for the preview."],
  ["Do I have to pay monthly?", "Yes. Every SwiftSite website is hosted and looked after by us for $15/month, or $165/year (1 month free). It's month-to-month and you can cancel anytime. Your plan runs to the end of the period you've paid for, with no partial refunds."],
  ["Who owns the website?", "You do. Your domain and email were always yours, and if you ever cancel, we send you your website files."],
  ["Will my email or domain break?", "No. Your domain stays where it is and your email keeps working. We only point your website to the new design."],
  ["Who checks the AI's work?", "Sony Lin, our lead designer, reviews every website before it is sent to you."],
  ["Can you add online booking or a store?", "SwiftSite rebuilds informational websites. If you already use a booking or ordering system, we link to it from your new site. Custom features are quoted separately."],
];

const testimonials = [
  {
    quote: "Sony Lin, their lead designer, is a true professional. Over 15 years, he's given our company website a facelift four times.",
    name: "Kevin Chen", company: "K. Chen Construction Management · Vancouver, BC", url: "https://kchencm.com/",
  },
  {
    quote: "Our old website was honestly ugly. Sony came to us with lots of ideas on his own, and through every round of changes he was always happy to help us get it right.",
    name: "Eric", company: "TTOP Chicken · Vancouver, BC", url: "https://ttopchicken.com/",
  },
  {
    quote: "Since the new website launched, our customers keep telling us how good it looks. Hearing that from them made me really happy. Thank you for the professional design.",
    name: "Golden Chen", company: "NuEra Nutraceuticals", url: "https://nueranutra.com/",
  },
];

const whyCheap = [
  ["AI does the heavy lifting", "It reads your current site and rebuilds it in hours, not weeks. No meetings, no questionnaires."],
  ["A designer checks every page", "Sony Lin, with 500+ websites over 20 years, reviews your site before you ever see it."],
  ["You only pay if you love it", "Your preview is a real, live website. Like it? Pay $99. Don't? Walk away, no charge."],
];

function WhyCheap() {
  return (
    <section className="ss-section">
      <div className="ss-container">
        <p className="ss-eyebrow">Why only $99?</p>
        <h2 className="ss-h2 mt-4 max-w-[760px]">Fast because of AI. Good because of a real designer.</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {whyCheap.map(([t, d]) => (
            <div key={t} className="ss-card">
              <h3 className="ss-card-title">{t}</h3>
              <p className="mt-3 leading-relaxed text-ink-2">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="ss-section bg-soft" aria-labelledby="clients-h">
      <div className="ss-container">
        <h2 id="clients-h" className="ss-h2 text-center">What our clients say</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="ss-card flex flex-col">
              <blockquote className="flex-1 text-[17px] leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 border-t border-hairline pt-4">
                <p className="font-medium text-ink">{t.name}</p>
                <p className="text-[14px] text-muted-ink">{t.company}</p>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center text-[14px] text-blue hover:underline">See the live site · {new URL(t.url).hostname} →</a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="ss-section">
      <div className="ss-container">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <img src="/images/sony-lin.jpg" alt="Sony Lin, founder and lead designer of SwiftSite" width={112} height={112} loading="lazy" className="h-28 w-28 shrink-0 rounded-full object-cover" />
          <div>
            <p className="text-[26px] font-light leading-snug tracking-[-0.5px] text-ink">&ldquo;I personally review every website before you see it.&rdquo;</p>
            <p className="mt-4 leading-relaxed text-ink-2">SwiftSite is run by a real designer, not a template factory. I've built 500+ websites over 20 years for small businesses, clinics, contractors and restaurants in Vancouver. Every SwiftSite website gets the same care.</p>
            <p className="mt-4 text-ink"><span className="font-medium">Sony Lin</span> <span className="text-muted-ink">· Founder &amp; Lead Designer</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TwoDirections() {
  return <Portfolio variant="home" />;
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
              <p className="ss-lead mt-6 max-w-[520px]">Paste your current website. In 48 hours, get a brand-new design built from your own words and photos. Love it? It's $99. Don't? You pay nothing.</p>
              <div className="mt-8"><UrlForm /></div>
              <p className="ss-small mt-4">Free preview · No credit card · $99 + $15/mo hosting, only if you love it</p>
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

        <WhyCheap />

        <Testimonials />

        <Founder />

        <section className="ss-section">
          <div className="ss-container grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="ss-eyebrow">Built for speed</p>
              <h2 className="ss-h2 mt-4">A faster site means more people stay, call and book.</h2>
              <p className="ss-lead mt-6">SwiftSite websites are lean, modern code with no plugins slowing them down. They load in a blink on any phone.</p>
            </div>
            <ul className="ss-card space-y-4 text-ink-2">
              {["No plugins or page builders slowing it down", "Images sized and compressed for phones", "Served from a fast global network", "Designed mobile-first, then scaled up"].map((f) => (
                <li key={f} className="flex gap-3"><Check />{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pricing" className="ss-section bg-soft">
          <div className="ss-container">
            <p className="ss-eyebrow text-center">Pricing</p>
            <h2 className="ss-h2 mt-4 text-center">Simple, upfront pricing.</h2>
            <p className="ss-lead mx-auto mt-4 max-w-[600px] text-center">See your new website free. Pay only when you love it.</p>
            <div className="mx-auto mt-14 grid max-w-[960px] gap-6 md:grid-cols-2">
              <div className="ss-card flex flex-col">
                <h3 className="ss-card-title">New website</h3>
                <p className="mt-4 flex items-baseline gap-3"><span className="tnum text-[64px] font-light leading-none tracking-[-2px]">$99</span><span className="text-muted-ink">CAD, one time</span></p>
                <ul className="mt-8 space-y-3 text-ink-2">
                  {["A brand-new website, rebuilt from your current one", "Your words, photos and pages moved over", "Mobile-ready and fast-loading", "Tweaks by email before launch", "Connected to your domain, email untouched"].map((f) => (
                    <li key={f} className="flex gap-3"><Check />{f}</li>
                  ))}
                </ul>
                <a href="#start" className="ss-btn ss-btn-primary mt-10 w-full">Get my free preview</a>
              </div>
              <div className="flex flex-col rounded-[14px] bg-ink p-8 text-white">
                <h3 className="ss-card-title">Hosting &amp; care</h3>
                <p className="mt-4"><span className="tnum text-[40px] font-light tracking-[-1px]">$15</span><span className="text-muted-dark">/month</span></p>
                <p className="mt-1 text-mint">or $165/year (1 month free)</p>
                <ul className="mt-8 space-y-3 text-[#c3d3ea]">
                  {["Fast, secure hosting with SSL", "Backups and security updates", "Small text and photo updates", "Month-to-month. Cancel anytime."].map((f) => (
                    <li key={f} className="flex gap-3"><Check className="text-mint" />{f}</li>
                  ))}
                </ul>
                <p className="mt-auto pt-8 text-[14px] text-muted-dark">Required with every SwiftSite website. If you cancel, we send you your website files.</p>
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
            <p className="ss-small mt-4">Your new website in your inbox within 48 hours · Free · No credit card</p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyCta />
    </div>
  );
}
