type Meta = Record<string, unknown> & { title?: string; name?: string; property?: string; content?: string };
type Head = { meta?: Meta[]; links?: unknown[]; scripts?: unknown[] } & Record<string, unknown>;
type Ctx = { matches?: Array<{ routeId?: string; loaderData?: unknown }> };

/**
 * Applies the admin's "Search & sharing" fields (cms_pages[pageKey].seoTitle / seoDescription / seoImage)
 * on top of a route's built-in head. Pages content comes from the root loader, so this works during SSR.
 */
export function withSeo(pageKey: string, ctx: Ctx, head: Head): Head {
  const pages = ctx.matches?.find((m) => m.routeId === "__root__")?.loaderData as Record<string, Record<string, string>> | undefined;
  const p = pages?.[pageKey] ?? {};
  const title = (p.seoTitle ?? "").trim();
  const desc = (p.seoDescription ?? "").trim();
  const image = (p.seoImage ?? "").trim();
  if (!title && !desc && !image) return head;
  let meta = [...(head.meta ?? [])];
  const set = (match: (m: Meta) => boolean, entry: Meta) => {
    meta = meta.filter((m) => !match(m));
    meta.push(entry);
  };
  if (title) {
    set((m) => "title" in m, { title });
    set((m) => m.property === "og:title", { property: "og:title", content: title });
    set((m) => m.name === "twitter:title", { name: "twitter:title", content: title });
  }
  if (desc) {
    set((m) => m.name === "description", { name: "description", content: desc });
    set((m) => m.property === "og:description", { property: "og:description", content: desc });
    set((m) => m.name === "twitter:description", { name: "twitter:description", content: desc });
  }
  if (/^https:\/\//.test(image)) {
    set((m) => m.property === "og:image", { property: "og:image", content: image });
    set((m) => m.name === "twitter:image", { name: "twitter:image", content: image });
    set((m) => m.name === "twitter:card", { name: "twitter:card", content: "summary_large_image" });
  }
  return { ...head, meta };
}
