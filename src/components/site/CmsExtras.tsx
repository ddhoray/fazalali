import { queryOptions, useQuery } from "@tanstack/react-query";
import { Fragment, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { getPublicEntries, getPublicPages } from "@/lib/cms.functions";
import { PAGE_SCHEMAS, parseLinks } from "@/lib/cms-schema";

export type CmsEntry = {
  id: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  data: unknown;
  featured: boolean;
};

/** Published admin entries for a collection (loads after the page renders). */
export function useCmsEntries(collection: string) {
  const { data = [] } = useQuery({
    queryKey: ["cms", "entries", collection],
    queryFn: () => getPublicEntries({ data: { collection } }) as Promise<CmsEntry[]>,
    staleTime: 60_000,
  });
  return data;
}

/** All saved page content; prefetched in the root loader so the first paint is already correct. */
export const cmsPagesQuery = queryOptions({ queryKey: ["cms", "pages"], queryFn: () => getPublicPages(), staleTime: 30_000 });

/** Saved value only ("" when the editor hasn't set it). Use for media overrides. */
export function useCmsSaved(page: string, field: string) {
  const { data } = useQuery(cmsPagesQuery);
  return (data?.[page]?.[field] ?? "").trim();
}

/** Editable page text with the site's default copy as fallback. */
export function useCmsText(page: string, field: string) {
  const { data } = useQuery(cmsPagesQuery);
  const def = PAGE_SCHEMAS.find((p) => p.key === page)?.fields.find((f) => f.key === field)?.def ?? "";
  const v = data?.[page]?.[field];
  return v === undefined || v === "" ? def : v;
}

export function useCmsLinks(page: string, field: string) {
  return parseLinks(useCmsText(page, field));
}

/** Renders *asterisk* spans as the accent italic. */
export function Rich({ text, accent = "text-accent" }: { text: string; accent?: string }): ReactNode {
  const parts = text.split(/\*([^*]+)\*/g);
  return parts.map((p, i) => (i % 2 ? <em key={i} className={accent}>{p}</em> : <Fragment key={i}>{p}</Fragment>));
}

export function CmsReadings({ page }: { page: "ecology" | "inequality" }) {
  const items = useCmsEntries("readings").filter((e) => (e.data as { page?: string })?.page === page);
  if (!items.length) return null;
  return (
    <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((e) => (
        <a key={e.id} href={e.link_url ?? "#"} target="_blank" rel="noreferrer" className="group flex h-full flex-col">
          {e.image_url && (
            <div className="relative aspect-[4/3] w-full overflow-hidden border hairline bg-muted">
              <img src={e.image_url} alt={e.title} loading="lazy" className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0" />
            </div>
          )}
          {e.subtitle && <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{e.subtitle}</p>}
          <h3 className="mt-3 inline-flex items-start gap-1 font-display text-2xl leading-snug">
            {e.title} <ArrowUpRight className="mt-1 size-4 shrink-0" />
          </h3>
          {e.body && <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/65">{e.body}</p>}
        </a>
      ))}
    </div>
  );
}

export function CmsTestimonials() {
  const items = useCmsEntries("testimonials");
  const heading = useCmsText("profile", "testimonialsHeading");
  const intro = useCmsText("profile", "testimonialsIntro");
  if (!items.length) return null;
  const sorted = [...items].sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <section className="border-t hairline">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 md:py-20">
        <p className="eyebrow text-muted-foreground">Testimonials</p>
        <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{heading}</h2>
        {intro && <p className="mt-5 max-w-2xl text-base text-foreground/70">{intro}</p>}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((t) => (
            <figure key={t.id} className="flex flex-col justify-between border hairline p-7">
              <blockquote className="font-display text-xl leading-snug">“{t.body}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                {t.image_url && <img src={t.image_url} alt="" className="size-11 object-cover" />}
                <span>
                  <span className="block text-sm">{t.title}</span>
                  {t.subtitle && <span className="block text-xs text-muted-foreground">{t.subtitle}</span>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CmsPalimpsest() {
  const items = useCmsEntries("palimpsest");
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-[1500px] space-y-20 px-5 py-16 sm:px-8">
      {items.map((s) => (
        <article key={s.id} className="grid gap-8 md:grid-cols-2 md:items-center">
          {s.image_url && <img src={s.image_url} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
          <div>
            {s.subtitle && <p className="eyebrow text-muted-foreground">{s.subtitle}</p>}
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{s.title}</h2>
            {s.body && <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-foreground/75">{s.body}</p>}
          </div>
        </article>
      ))}
    </section>
  );
}
