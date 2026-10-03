import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Article } from "@/content/articles";

const DB = async () => (await import("@/integrations/supabase/client.server")).supabaseAdmin;

type Row = {
  slug: string;
  title: string;
  excerpt: string;
  body_html?: string;
  cover_image: string;
  topic: string;
  tags: string[];
  publish_at: string;
  principles: unknown;
  seo_title?: string | null;
  seo_description?: string | null;
};

function toArticle(r: Row, withBody: boolean): Article {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    date: r.publish_at.slice(0, 10),
    topic: r.topic,
    image: r.cover_image,
    tags: r.tags,
    body: withBody && r.body_html ? [r.body_html.replace(/<[^>]+>/g, " ")] : [],
    html: withBody ? (r.body_html ?? "") : undefined,
    principles: (r.principles as Article["principles"]) ?? undefined,
    seoTitle: r.seo_title ?? undefined,
    seoDescription: r.seo_description ?? undefined,
  };
}

/** Is the CMS the source of truth yet (i.e. has anything been imported/created)? */
async function cmsActive() {
  try {
    const db = await DB();
    const { count } = await db.from("cms_articles").select("id", { count: "exact", head: true });
    return (count ?? 0) > 0;
  } catch {
    return false;
  }
}

export const getJournal = createServerFn({ method: "GET" }).handler(async () => {
  const { articles } = await import("@/content/articles");
  const fallback = articles.map((a) => ({ ...a, body: [] as string[] }));
  if (!(await cmsActive())) return fallback;
  const db = await DB();
  const { data, error } = await db
    .from("cms_articles")
    .select("slug, title, excerpt, cover_image, topic, tags, publish_at, principles")
    .in("status", ["published", "scheduled"])
    .lte("publish_at", new Date().toISOString())
    .order("publish_at", { ascending: false })
    .limit(2000);
  if (error) return fallback;
  return (data ?? []).map((r) => toArticle(r as Row, false));
});

export const getJournalEntry = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().max(200) }))
  .handler(async ({ data }) => {
    const { articles } = await import("@/content/articles");
    const staticOne = articles.find((a) => a.slug === data.slug) ?? null;
    if (!(await cmsActive())) return staticOne;
    const db = await DB();
    const { data: r } = await db
      .from("cms_articles")
      .select("*")
      .eq("slug", data.slug)
      .in("status", ["published", "scheduled"])
      .lte("publish_at", new Date().toISOString())
      .maybeSingle();
    return r ? toArticle(r as Row, true) : null;
  });

export const getPublicEntries = createServerFn({ method: "GET" })
  .inputValidator(z.object({ collection: z.string().max(40) }))
  .handler(async ({ data }) => {
    try {
      const db = await DB();
      const { data: rows } = await db
        .from("cms_entries")
        .select("id, title, subtitle, body, image_url, link_url, data, featured")
        .eq("collection", data.collection)
        .eq("published", true)
        .order("position");
      return rows ?? [];
    } catch {
      return [];
    }
  });

export const getPublicPages = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = await DB();
    const { data } = await db.from("cms_pages").select("key, data");
    const out: Record<string, Record<string, string>> = {};
    for (const r of data ?? []) out[r.key] = (r.data ?? {}) as Record<string, string>;
    return out;
  } catch {
    return {} as Record<string, Record<string, string>>;
  }
});

export const trackView = createServerFn({ method: "POST" })
  .inputValidator(z.object({ path: z.string().max(300) }))
  .handler(async ({ data }) => {
    if (data.path.startsWith("/admin")) return { ok: true };
    try {
      const db = await DB();
      await db.from("cms_page_views").insert({ path: data.path });
    } catch {
      /* analytics must never break the page */
    }
    return { ok: true };
  });

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().trim().email().max(200) }))
  .handler(async ({ data }) => {
    const db = await DB();
    await db.from("cms_subscribers").upsert({ email: data.email.toLowerCase() }, { onConflict: "email", ignoreDuplicates: true });
    return { ok: true };
  });
