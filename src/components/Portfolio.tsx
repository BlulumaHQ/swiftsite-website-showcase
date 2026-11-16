import { useQuery } from "@tanstack/react-query";
import { portfolioQuery, buildPortfolio, type PortfolioItem, type Study } from "@/lib/portfolio";

function Frame({ dark, label, children }: { dark: boolean; label: string; children: React.ReactNode }) {
  return (
    <div className={`overflow-hidden rounded-[14px] border p-3 ${dark ? "border-dark-border bg-dark-card" : "border-hairline bg-white"}`}>
      <div className="mb-2 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => <span key={i} aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-dark-border" : "bg-hairline"}`} />)}
        <span className={`ml-3 text-[13px] ${dark ? "text-muted-dark" : "text-muted-ink"}`}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function Img({ src, alt }: { src: string | null; alt: string }) {
  return src
    ? <img src={src} alt={alt} loading="lazy" decoding="async" className="block aspect-[16/10] w-full rounded-lg object-cover object-top" />
    : <div className="aspect-[16/10] w-full rounded-lg bg-soft" />;
}

function StudyRow({ p, dark }: { p: Study; dark: boolean }) {
  return (
    <article>
      <div className="grid gap-4 md:grid-cols-2">
        {p.versions.map((v) => {
          const label = `Version ${v.label}`;
          const body = (
            <div className="relative">
              <Frame dark={dark} label={label}><Img src={v.image} alt={`${p.title} website, ${label}`} /></Frame>
              {v.chosen && <span className="absolute right-3 top-3 rounded-full bg-mint px-3 py-1 text-[12px] font-medium text-ink">Client chose {label}</span>}
            </div>
          );
          return v.url
            ? <a key={v.label} href={v.url} target="_blank" rel="noopener noreferrer" className={`block rounded-[14px] transition ${dark ? "hover:ring-2 hover:ring-mint" : "hover:ring-2 hover:ring-blue"}`}>{body}</a>
            : <div key={v.label}>{body}</div>;
        })}
      </div>
      <p className="mt-4 text-lg font-normal">{p.title}</p>
      {p.category && <p className={`text-[14px] ${dark ? "text-muted-dark" : "text-muted-ink"}`}>{p.category}</p>}
    </article>
  );
}

function Card({ p, dark }: { p: PortfolioItem; dark: boolean }) {
  const inner = (
    <>
      <Img src={p.featured_image_url} alt={`${p.title} website`} />
      <p className={`mt-4 font-normal ${dark ? "group-hover:text-mint" : "group-hover:text-blue"}`}>{p.title}</p>
      {p.category && <p className={`text-[14px] ${dark ? "text-muted-dark" : "text-muted-ink"}`}>{p.category}</p>}
    </>
  );
  const cls = `${dark ? "ss-dark-card hover:border-mint" : "ss-card"} group block !p-4`;
  return p.live_url
    ? <a href={p.live_url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <div className={cls}>{inner}</div>;
}

function Skeleton({ dark }: { dark: boolean }) {
  const b = dark ? "bg-dark-card" : "bg-soft";
  return (
    <div aria-hidden="true" className="space-y-10">
      {[0, 1].map((i) => (
        <div key={i} className="grid animate-pulse gap-4 md:grid-cols-2">
          <div className={`aspect-[16/10] rounded-[14px] ${b}`} /><div className={`aspect-[16/10] rounded-[14px] ${b}`} />
        </div>
      ))}
    </div>
  );
}

/** Portfolio from the central CMS. Hidden entirely on error or empty result. */
export function Portfolio({ variant }: { variant: "home" | "all" }) {
  const dark = variant === "home";
  const { data, isPending, isError } = useQuery(portfolioQuery);
  if (isError || (data && data.length === 0)) return null;
  const { studies, singles } = buildPortfolio(data ?? []);
  const homeStudies = studies.filter((s) => s.featured);
  const shownStudies = variant === "home" ? (homeStudies.length ? homeStudies : studies).slice(0, 6) : studies;
  const shownOthers = variant === "home" ? [] : singles;
  const muted = dark ? "text-muted-dark" : "text-muted-ink";

  return (
    <section id="work" className={dark ? "ss-section bg-ink text-white" : "ss-container pb-24"}>
      <div className={dark ? "ss-container" : ""}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <p className={`ss-eyebrow ${dark ? "!text-mint" : ""}`}>Two directions</p>
            <h2 className="ss-h2 mt-4">Two designs, one business</h2>
          </div>
          {variant === "home" && <a href="/work" className="inline-flex min-h-11 items-center text-mint hover:underline">See all work →</a>}
        </div>

        <div className="mt-10">
          {isPending ? <Skeleton dark={dark} /> : (
            <div className="space-y-14">{shownStudies.map((p) => <StudyRow key={p.key} p={p} dark={dark} />)}</div>
          )}
        </div>

        {!isPending && shownOthers.length > 0 && (
          <>
            <h3 className="ss-card-title mt-20">More launched sites</h3>
            <p className={`mt-2 text-[14px] ${muted}`}>Live sites built for our clients.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownOthers.map((p) => <Card key={p.id} p={p} dark={dark} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
