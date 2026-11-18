import { useQuery } from "@tanstack/react-query";
import { portfolioQuery, buildPortfolio, isRealDomain } from "@/lib/portfolio";

type Final = { key: string; title: string; category: string | null; image: string | null; url: string | null; live: boolean };

function Img({ src, alt }: { src: string | null; alt: string }) {
  return src
    ? <img src={src} alt={alt} loading="lazy" decoding="async" className="block aspect-[16/10] w-full rounded-lg object-cover object-top" />
    : <div className="aspect-[16/10] w-full rounded-lg bg-soft" />;
}

function domainOf(u: string) {
  try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; }
}

function Card({ p, dark, className = "" }: { p: Final; dark: boolean; className?: string }) {
  const muted = dark ? "text-muted-dark" : "text-muted-ink";
  const inner = (
    <>
      <Img src={p.image} alt={`${p.title} website`} />
      <p className={`mt-4 text-[17px] font-normal ${p.live ? (dark ? "group-hover:text-mint" : "group-hover:text-blue") : ""}`}>{p.title}</p>
      {p.category && <p className={`text-[14px] ${muted}`}>{p.category}</p>}
      {p.live && p.url && <p className={`mt-2 text-[14px] ${dark ? "text-mint" : "text-blue"}`}>See the live site · {domainOf(p.url)} →</p>}
    </>
  );
  const cls = `${dark ? "ss-dark-card" : "ss-card"} group block !p-4 ${className}`;
  return p.live && p.url
    ? <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${cls} ${dark ? "hover:border-mint" : "hover:border-blue"}`}>{inner}</a>
    : <div className={cls}>{inner}</div>;
}

function Skeleton({ dark }: { dark: boolean }) {
  const b = dark ? "bg-dark-card" : "bg-soft";
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => <div key={i} className={`aspect-[16/12] rounded-[14px] ${b}`} />)}
    </div>
  );
}

/** Portfolio from the central CMS: one final website per client. Hidden on error or empty result. */
export function Portfolio({ variant }: { variant: "home" | "all" }) {
  const dark = variant === "home";
  const { data, isPending, isError } = useQuery(portfolioQuery);
  if (isError || (data && data.length === 0)) return null;
  const { studies, singles } = buildPortfolio(data ?? []);

  // A study contributes only its final website: the version the client chose, else the first one.
  const fromStudies: Final[] = studies.map((s) => {
    const v = s.versions.find((x) => x.chosen) ?? s.versions[0]!;
    return { key: s.key, title: s.title, category: s.category, image: v.image, url: v.url, live: isRealDomain(v.url) };
  });
  const fromSingles: Final[] = singles.map((p) => ({
    key: p.id, title: p.title, category: p.category, image: p.featured_image_url, url: p.live_url, live: isRealDomain(p.live_url),
  }));
  const all = [...fromStudies, ...fromSingles];
  const shown = variant === "home" ? all.slice(0, 6) : all;

  return (
    <section id="work" className={dark ? "ss-section bg-ink text-white" : "ss-container pb-24"}>
      <div className={dark ? "ss-container" : ""}>
        {dark && (
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[640px]">
              <p className="ss-eyebrow !text-mint">Recent work</p>
              <h2 className="ss-h2 mt-4">Real businesses. Brand-new websites.</h2>
            </div>
            <a href="/work" className="inline-flex min-h-11 items-center text-mint hover:underline">See all work →</a>
          </div>
        )}

        <div className={dark ? "mt-10" : ""}>
          {isPending ? <Skeleton dark={dark} /> : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) => <Card key={p.key} p={p} dark={dark} className={dark && i >= 3 ? "hidden sm:block" : ""} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
