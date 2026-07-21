import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/content/articles";

const BASE_URL = "https://omeros-cipher-glass.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/education-for-liberty", changefreq: "monthly", priority: "0.9" },
          { path: "/writing", changefreq: "weekly", priority: "0.9" },
          { path: "/ecology", changefreq: "monthly", priority: "0.7" },
          { path: "/inequality", changefreq: "monthly", priority: "0.7" },
          { path: "/palimpsest", changefreq: "monthly", priority: "0.7" },
          { path: "/podcast", changefreq: "monthly", priority: "0.7" },
          { path: "/gallery", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.5" },
        ];

        const articleEntries: SitemapEntry[] = articles.map((a) => ({
          path: `/writing/${a.slug}`,
          changefreq: "monthly",
          priority: "0.7",
        }));

        const entries = [...staticEntries, ...articleEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
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
