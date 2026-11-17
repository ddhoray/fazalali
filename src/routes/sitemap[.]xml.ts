import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getJournal } from "@/lib/cms.functions";

const BASE_URL = "https://omeros-cipher-glass.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const journal = await getJournal();
        const today = new Date().toISOString().slice(0, 10);
        const latestArticleDate = journal
          .map((a) => a.date)
          .sort()
          .reverse()[0] ?? today;

        const staticEntries: SitemapEntry[] = [
          { path: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
          { path: "/about", lastmod: today, changefreq: "monthly", priority: "0.8" },
          { path: "/education-for-liberty", lastmod: today, changefreq: "monthly", priority: "0.9" },
          { path: "/writing", lastmod: latestArticleDate, changefreq: "weekly", priority: "0.9" },
          { path: "/ecology", lastmod: today, changefreq: "monthly", priority: "0.7" },
          { path: "/inequality", lastmod: today, changefreq: "monthly", priority: "0.7" },
          { path: "/palimpsest", lastmod: today, changefreq: "monthly", priority: "0.7" },
          { path: "/podcast", lastmod: today, changefreq: "monthly", priority: "0.7" },
          { path: "/gallery", lastmod: today, changefreq: "monthly", priority: "0.6" },
          { path: "/contact", lastmod: today, changefreq: "yearly", priority: "0.5" },
        ];

        const articleEntries: SitemapEntry[] = journal.map((a) => ({
          path: `/writing/${a.slug}`,
          lastmod: a.date,
          changefreq: "monthly",
          priority: "0.7",
        }));

        const entries = [...staticEntries, ...articleEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );


        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
