import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, OG_IMAGE } from "@/lib/site";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Portfolio } from "@/components/Portfolio";

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
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "SwiftSite — Same business. Brand-new website. $99." },
      { property: "og:site_name", content: "SwiftSite" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/work` }],
  }),
  component: Work,
});

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

        <Portfolio variant="all" />

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
