import { createClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";

// Separate read-only client for the central Bluluma CMS (not this project's backend).
const CMS_URL = "https://uzdjwpkgldzhnoxjeyrw.supabase.co";
const CMS_KEY = "sb_publishable_ifsg2zxajGqu19GsJ2X4RQ_KHBHGIvi";

let client: ReturnType<typeof createClient> | null = null;
function cms() {
  if (!client) client = createClient(CMS_URL, CMS_KEY, { auth: { persistSession: false, autoRefreshToken: false, storage: undefined } });
  return client;
}

export type PortfolioVersion = { label: string | null; url: string | null; screenshot_url: string | null; screenshot_mobile_url: string | null };
export type PortfolioItem = {
  id: string; title: string; slug: string | null; excerpt: string | null; featured_image_url: string | null;
  is_featured: boolean | null; sort_order: number | null; category: string | null; live_url: string | null;
  project_year: number | null; homepage_full_url: string | null; featured_on: string[] | null; pair_title: string | null; pair_label: string | null; versions: PortfolioVersion[] | null; version_count: number | null;
};

export const portfolioQuery = queryOptions({
  queryKey: ["cms", "portfolio_feed", "swiftsite"],
  staleTime: 5 * 60_000,
  retry: 1,
  queryFn: async (): Promise<PortfolioItem[]> => {
    const { data, error } = await cms()
      .from("portfolio_feed")
      .select("id,title,slug,excerpt,featured_image_url,homepage_full_url,is_featured,sort_order,show_on,category,live_url,services,project_year,versions,version_count,featured_on,pair_title,pair_label")
      .contains("show_on", ["swiftsite"])
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("publish_date", { ascending: false });
    if (error) throw error;
    return (data ?? []) as unknown as PortfolioItem[];
  },
});

export type StudyVersion = { label: string; url: string | null; image: string | null; chosen: boolean };
export type Study = { key: string; title: string; category: string | null; featured: boolean; versions: StudyVersion[] };

const STAGING = [".netlify.app", ".workers.dev", ".pages.dev", ".lovable.app", ".bluluma.com"];
export const isRealDomain = (u: string | null) => !!u && !STAGING.some((d) => u.toLowerCase().includes(d));

/** Group A/B rows by pair_title into studies; everything else is a single. Input order is preserved. */
export function buildPortfolio(rows: PortfolioItem[]): { studies: Study[]; singles: PortfolioItem[] } {
  const groups = new Map<string, PortfolioItem[]>();
  for (const r of rows) if (r.pair_label && r.pair_title) {
    const g = groups.get(r.pair_title) ?? [];
    g.push(r); groups.set(r.pair_title, g);
  }
  const studies: Study[] = [];
  const singles: PortfolioItem[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    const g = r.pair_label && r.pair_title ? groups.get(r.pair_title) : undefined;
    if (!g || g.length < 2) { singles.push(r); continue; }
    if (seen.has(r.pair_title!)) continue;
    seen.add(r.pair_title!);
    const sorted = [...g].sort((a, b) => a.pair_label!.localeCompare(b.pair_label!)).slice(0, 2);
    const real = sorted.map((v) => isRealDomain(v.live_url));
    const one = real.filter(Boolean).length === 1;
    studies.push({
      key: r.pair_title!, title: r.pair_title!, category: sorted.find((v) => v.category)?.category ?? null,
      featured: g.some((v) => v.featured_on?.includes("swiftsite")),
      versions: sorted.map((v, i) => ({ label: v.pair_label!, url: v.live_url, image: v.homepage_full_url ?? v.featured_image_url ?? v.versions?.[0]?.screenshot_url ?? null, chosen: one && real[i] === true })),
    });
  }
  studies.sort((a, b) => Number(b.featured) - Number(a.featured));
  return { studies, singles };
}
