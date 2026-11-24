import { CmsReadings, useCmsEntries, useCmsText } from "@/components/site/CmsExtras";
import { withSeo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { inequality } from "@/content/inequality";
import type { Article } from "@/content/articles";
import { getJournal } from "@/lib/cms.functions";
import { formatArticleDate } from "@/lib/article-date";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { assetUrl } from "@/lib/asset-url";
import heroHouse from "@/assets/inequality/paramin-house.jpg.asset.json";
import imgArchive from "@/assets/inequality/4.asset.json";
import imgMall from "@/assets/inequality/2.asset.json";
import imgFirstNations from "@/assets/inequality/10.asset.json";

const trio = [
  { src: assetUrl(imgArchive), alt: "Two women reviewing records in a national archive", frame: "md:col-span-7", ratio: "aspect-[4/3]" },
  { src: assetUrl(imgFirstNations), alt: "Fazal Ali with a First Nations leader", frame: "md:col-span-5 md:mt-40", ratio: "aspect-[4/5]" },
  { src: assetUrl(imgMall), alt: "Sculptures in a high-end shopping mall", frame: "md:col-span-8 md:col-start-3 md:-mt-10", ratio: "aspect-[16/9]" },
];

function GrowingFrame({ item, index }: { item: (typeof trio)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.42, 1], [0.84, 1, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 0.42], ["inset(12% 9% 12% 9%)", "inset(0% 0% 0% 0%)"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.6, 1], [1.25, 1.04, 1]);
  return (
    <figure ref={ref} className={`min-w-0 ${item.frame}`}>
      <motion.div style={reduce ? undefined : { scale, clipPath }} className={`relative w-full overflow-hidden bg-muted will-change-transform ${item.ratio}`}>
        <motion.img src={item.src} alt={item.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" style={reduce ? undefined : { scale: imgScale }} className="absolute inset-0 size-full object-cover" />
      </motion.div>
    </figure>
  );
}

export const Route = createFileRoute("/inequality")({
  loader: () => getJournal(),
  shouldReload: true,
  headers: () => ({ "cache-control": "no-store" }),
  head: (ctx) =>
    withSeo("inequality", ctx, ({
    meta: [
      { title: "Inequality, Education for Liberty | Fazal Ali" },
      {
        name: "description",
        content:
          "The capability gap, the inherited geometry of the colonial economy, and what the West Indian classroom owes the child who arrived hungry.",
      },
      { property: "og:title", content: "Inequality, Education for Liberty" },
      {
        property: "og:description",
        content: "A capability reading of inequality from a West Indian classroom.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/inequality" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/inequality" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Inequality, Education for Liberty",
          description:
            "The capability gap, the inherited geometry of the colonial economy, and what the West Indian classroom owes the child who arrived hungry.",
          datePublished: "2026-01-15",
          author: {
            "@type": "Person",
            name: "Fazal Ibrahim Ali",
            url: "https://omeros-cipher-glass.lovable.app/about",
          },
          publisher: { "@type": "Person", name: "Fazal Ibrahim Ali" },
          mainEntityOfPage: "https://omeros-cipher-glass.lovable.app/inequality",
        }),
      },
    ],
  })),
  component: InequalityPage,
});

const TRACK = /inherited inequalit|intergenerational immobilit|intergenerational inequalit/i;

const SELECTED_SLUGS = [
  "ai-and-a-digital-pause",
  "covid-19-in-a-dutch-diseased-economy",
  "ai-assemblages-and-the-end-of-historical-struggles",
];

const essayLayouts = [
  { frame: "col-span-2 md:col-span-7", ratio: "aspect-[4/3]" },
  { frame: "col-span-1 md:col-span-4 md:col-start-9 md:mt-32", ratio: "aspect-square" },
  { frame: "col-span-1 md:col-span-4 md:col-start-2 md:mt-4", ratio: "aspect-square" },
  { frame: "col-span-2 md:col-span-6 md:col-start-7 md:mt-28", ratio: "aspect-[4/3]" },
  { frame: "col-span-1 md:col-span-5 md:mt-10", ratio: "aspect-[4/3]" },
  { frame: "col-span-1 md:col-span-5 md:col-start-8 md:-mt-12", ratio: "aspect-square" },
  { frame: "col-span-2 md:col-span-7 md:col-start-2 md:mt-20", ratio: "aspect-[16/10]" },
  { frame: "col-span-2 md:col-span-4 md:col-start-9 md:mt-40", ratio: "aspect-square" },
];

function EssayGridCard({ article, index }: { article: Article; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const frameScale = useTransform(scrollYProgress, [0, 0.38, 1], [0.9, 1, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 0.38, 1], ["inset(8% 7% 8% 7%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.18, 1.04, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const layout = essayLayouts[index % essayLayouts.length];

  return (
    <article ref={ref} className={`min-w-0 ${layout.frame}`}>
      <Link to="/writing/$slug" params={{ slug: article.slug }} className="group block h-full">
        <motion.div
          style={reduceMotion ? undefined : { scale: frameScale, clipPath }}
          className={`relative w-full overflow-hidden bg-muted will-change-transform ${layout.ratio}`}
        >
          <motion.img
            src={article.image}
            alt={article.title}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
            className="absolute inset-0 size-full object-cover transition-[filter] duration-500 group-hover:brightness-95 will-change-transform"
          />
          <span className="absolute right-3 top-3 grid size-9 place-items-center bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </motion.div>
        <div className="mt-4 flex items-start justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:mt-5 sm:text-[11px]">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="text-right">{formatArticleDate(article.date)}</span>
        </div>
        <h3 className="mt-3 font-display text-lg leading-snug sm:text-xl md:text-2xl">{article.title}</h3>
        <p className="mt-3 hidden text-sm leading-relaxed text-foreground/65 sm:line-clamp-3">{article.excerpt}</p>
      </Link>
    </article>
  );
}

function InequalityPage() {
  const journal = Route.useLoaderData();
  const selected = SELECTED_SLUGS.map((slug) => journal.find((a) => a.slug === slug)).filter(
    (a): a is Article => Boolean(a),
  );
  const tracked = journal
    .filter((a) => TRACK.test([a.title, a.excerpt, ...(a.tags ?? [])].join(" ")))
    .slice(0, 8);
  const heroTitle = useCmsText("inequality", "heroTitle");
  const heroIntro = useCmsText("inequality", "heroIntro");
  const cmsSections = useCmsEntries("inequality");
  const sections = cmsSections.length ? cmsSections.map((s) => ({ h: s.title, body: (s.body ?? "").split(/\n\s*\n/).filter(Boolean) })) : inequality.sections;
  const cmsStrip = useCmsEntries("field_notes").filter((e) => (e.data as { page?: string })?.page === "inequality" && e.image_url).map((e) => e.image_url!);
  const heroImage = cmsStrip[0] ?? assetUrl(heroHouse);
  return (
    <div>
      <PageHero
        cmsKey="inequality"
        eyebrow={inequality.eyebrow}
        title={
          <>
            {heroTitle}
          </>
        }
        standfirst={heroIntro}
        meta={
          <>
            <span>Journal</span>
            <span className="size-1 bg-white/40" />
             <span>{sections.length} parts</span>
            <span className="size-1 bg-white/40" />
            <span>After Sen</span>
          </>
        }
        image={heroImage}
        imageAlt="A weathered wooden house on stilts in Paramin, Trinidad"
      />

      <section className="border-b hairline" data-auto-reveal="off">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-8 md:py-28">
          {trio.map((item, i) => (
            <GrowingFrame key={item.src} item={item} index={i} />
          ))}
        </div>
      </section>

      <section className="border-b hairline">
        <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
          <p className="eyebrow text-muted-foreground">Selected readings</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
            Where the argument is carried further.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Three essays on rents, resource economies, and what the machine inherits from the
            struggles that came before it.
          </p>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {selected.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.05}>
                <Link
                  to="/writing/$slug"
                  params={{ slug: a.slug }}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden border hairline bg-[#e9e6e1]">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="size-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {formatArticleDate(a.date)}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{a.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/65">
                    {a.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 self-start border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.2em] transition-colors group-hover:border-foreground">
                    Read
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <CmsReadings page="inequality" />
        </div>
      </section>


      <article className="mx-auto flex max-w-[820px] flex-col gap-20 px-5 py-16 sm:px-8 md:gap-28 md:py-24">
        {sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.04}>
            <section>
              <p className="eyebrow text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · Section
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{s.h}</h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
                {s.body.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </article>

      <section className="border-t hairline bg-[#f5f3f0]">
        <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
          <p className="eyebrow text-muted-foreground">Traced through the essays</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
            Inherited inequality and intergenerational immobility.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            The recurring argument of the journal. These entries carry it directly.
          </p>

          <div data-auto-reveal="off" className="mt-14 grid grid-flow-dense grid-cols-2 items-start gap-x-3 gap-y-12 sm:gap-x-5 sm:gap-y-16 md:mt-20 md:grid-cols-12 md:gap-x-8 md:gap-y-20">
            {tracked.map((article, index) => (
              <EssayGridCard key={article.slug} article={article} index={index} />
            ))}
          </div>

          <Link
            to="/writing"
            className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm uppercase tracking-[0.2em]"
          >
            All entries <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-6 px-5 py-10 sm:px-8">
          <p className="font-display text-3xl md:text-5xl">Read on.</p>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.2em]">
            <Link
              to="/ecology"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1"
            >
              Ecology <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/education-for-liberty"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1"
            >
              The Book <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
