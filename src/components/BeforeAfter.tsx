import { useState } from "react";
import { ScrollShot } from "@/components/ScrollShot";

const CMS_SHOTS =
  "https://uzdjwpkgldzhnoxjeyrw.supabase.co/storage/v1/object/public/content-images/b237218e-d944-4af0-87b2-09379102e53e/portfolio";

/** Same three real before → after projects shown on swiftlift.app. */
const CASES = [
  {
    key: "kchen",
    name: "K. Chen Construction",
    industry: "Construction",
    before: "/images/before-after/kchen-before.webp",
    after: `${CMS_SHOTS}/kchenconstruction/live-netlify-full.jpg?v=1794399032723`,
    url: "https://kchencm.com/",
  },
  {
    key: "littlemountain",
    name: "Little Mountain Dental",
    industry: "Dental clinic",
    before: "/images/before-after/littlemountain-before.webp",
    after: `${CMS_SHOTS}/littlemountaindental/live-netlify-full.jpg?v=1794399221721`,
    url: "https://littlemountaindental.ca/",
  },
  {
    key: "architect57",
    name: "Architect 57",
    industry: "Architecture",
    before: "/images/before-after/architect57-before.webp",
    after: "/images/before-after/architect57-after.webp",
    url: "https://architect57.com/",
  },
] as const;

function Tag({ after }: { after?: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[12px] font-medium tracking-[0.08em] ${
        after ? "bg-mint text-ink" : "bg-white text-ink"
      }`}
    >
      {after ? "AFTER" : "BEFORE"}
    </span>
  );
}

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const c = CASES[active]!;
  return (
    <section id="work" className="ss-section bg-ink text-white" aria-labelledby="work-h">
      <div className="ss-container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <p className="ss-eyebrow !text-mint">Recent work</p>
            <h2 id="work-h" className="ss-h2 mt-4">Same business. Brand-new website.</h2>
            <p className="mt-4 text-[#c3d3ea]">Real Vancouver businesses. Their own words and photos, rebuilt into a modern website.</p>
          </div>
          <a href="/work" className="inline-flex min-h-11 items-center text-mint hover:underline">See all work →</a>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Choose an example">
          {CASES.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`min-h-11 rounded-full px-5 text-[15px] transition-colors ${
                i === active ? "bg-mint text-ink" : "border border-dark-border text-[#c3d3ea] hover:bg-white/10"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <figure key={`${c.key}-before`} className="ss-shot-card relative m-0 min-w-0 [&_img]:grayscale-[70%]">
            <ScrollShot src={c.before} alt={`${c.name} website before SwiftSite`} dark />
            <Tag />
          </figure>
          <div aria-hidden="true" className="mx-auto grid h-12 w-12 rotate-90 place-items-center rounded-full bg-mint text-ink md:rotate-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
          <a
            key={`${c.key}-after`}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ss-shot-card relative block min-w-0 rounded-[10px] outline outline-2 outline-offset-4 outline-mint"
          >
            <ScrollShot src={c.after} alt={`${c.name} website after SwiftSite`} dark />
            <Tag after />
          </a>
        </div>
        <p className="mt-6 text-center text-[14px] text-muted-dark">
          {c.industry} · <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-mint hover:underline">See the live site · {new URL(c.url).hostname.replace(/^www\./, "")} →</a>
        </p>
      </div>
    </section>
  );
}
