import { createFileRoute } from "@tanstack/react-router";
import { studies, moreStudies, launchedSites, type Study } from "@/data/work";
import { SITE_URL } from "@/lib/site";
import { SiteHeader, SiteFooter, Shot } from "@/components/SiteChrome";

const TITLE = "Work — SwiftSite";
const DESC = "Real websites we rebuilt: two-direction case studies and every site our clients picked and launched.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}/work` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/work` }],
  }),
  component: Work,
});

function StudyCard({ s }: { s: Study }) {
  return (
    <article className="ss-card !p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[19px] font-normal">{s.client}</h3>
        <p className="ss-small">{s.industry}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {(["A", "B"] as const).map((k) => {
          const ver = k === "A" ? s.versionA : s.versionB;
          const picked = s.chosen === k;
          return (
            <a key={k} href={ver.url} target="_blank" rel="noopener noreferrer" className={`group block overflow-hidden rounded-lg border ${picked ? "border-success" : "border-hairline"}`}>
              <Shot src={ver.image} alt={`${s.client}, version ${k}`} className="aspect-[16/10]" />
              <span className="flex items-center justify-between px-3 py-2 text-[13px]">
                <span className="font-medium text-ink group-hover:text-blue">Version {k}</span>
                {picked && <span className="font-medium text-[#0b6b4c]">Chosen</span>}
              </span>
            </a>
          );
        })}
      </div>
    </article>
  );
}

function Work() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <section className="ss-container pb-16 pt-12">
          <p className="ss-eyebrow">Work</p>
          <h1 className="ss-h1 mt-4 max-w-[860px]">Real businesses. Two directions each.</h1>
          <p className="ss-lead mt-6 max-w-[640px]">Every project starts with two complete designs. Here are both versions side by side, and every site our clients picked and launched.</p>
        </section>

        <section className="ss-container pb-24" aria-labelledby="two-dir">
          <h2 id="two-dir" className="ss-h2 !text-[32px]">Two directions</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[...studies, ...moreStudies].map((s) => <StudyCard key={s.id} s={s} />)}
          </div>
        </section>

        <section className="ss-section bg-soft" aria-labelledby="launched">
          <div className="ss-container">
            <h2 id="launched" className="ss-h2 !text-[32px]">Their pick, now live</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {launchedSites.map((site) => (
                <a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer" className="ss-card group block !p-4">
                  <Shot src={site.image} alt={`${site.client} website`} className="aspect-[16/10] rounded-lg" />
                  <p className="mt-4 font-normal group-hover:text-blue">{site.client}</p>
                  <p className="ss-small">{site.industry}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-section text-center">
          <div className="ss-container flex flex-col items-center">
            <h2 className="ss-h2 max-w-[720px]">See your two new designs before you spend a dollar.</h2>
            <a href="/#start" className="ss-btn ss-btn-primary mt-8">Get my free preview</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
