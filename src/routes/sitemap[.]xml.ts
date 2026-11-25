import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/lib/site";

// Public marketing pages only; client preview/review/go-live pages stay out (they are noindex).
const PAGES: { path: string; priority: string; changefreq: string; images?: string[] }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly", images: ["/images/sony-lin-swiftsite-lead-designer.webp"] },
  { path: "/work", priority: "0.8", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls = PAGES.map((p) =>
          [
            "  <url>",
            `    <loc>${SITE_URL}${p.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            `    <changefreq>${p.changefreq}</changefreq>`,
            `    <priority>${p.priority}</priority>`,
            ...(p.images ?? []).map((src) => `    <image:image><image:loc>${SITE_URL}${src}</image:loc></image:image>`),
            "  </url>",
          ].join("\n"),
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
