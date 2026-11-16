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
  project_year: number | null; versions: PortfolioVersion[] | null; version_count: number | null;
};

export const portfolioQuery = queryOptions({
  queryKey: ["cms", "portfolio_feed", "swiftsite"],
  staleTime: 5 * 60_000,
  retry: 1,
  queryFn: async (): Promise<PortfolioItem[]> => {
    const { data, error } = await cms()
      .from("portfolio_feed")
      .select("id,title,slug,excerpt,featured_image_url,is_featured,sort_order,show_on,category,live_url,services,project_year,versions,version_count")
      .contains("show_on", ["swiftsite"])
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("publish_date", { ascending: false });
    if (error) throw error;
    return (data ?? []) as unknown as PortfolioItem[];
  },
});

export const isStudy = (p: PortfolioItem) => (p.version_count ?? 0) >= 2 && (p.versions?.length ?? 0) >= 2;
