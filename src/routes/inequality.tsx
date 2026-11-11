import { CmsReadings, useCmsEntries, useCmsText } from "@/components/site/CmsExtras";
import { withSeo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { inequality } from "@/content/inequality";
import { articles } from "@/content/articles";
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

const SELECTED = SELECTED_SLUGS.map((s) => articles.find((a) => a.slug === s)).filter(
  (a): a is (typeof articles)[number] => Boolean(a),
);


const tracked = articles
  .filter((a) => TRACK.test([a.title, a.excerpt, ...a.body].join(" ")))
  .slice(0, 8);

function InequalityPage() {
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
            {SELECTED.map((a, i) => (
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
                    {String(i + 1).padStart(2, "0")} · {a.date}
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

          <ul className="mt-10 border-t hairline">
            {tracked.map((a) => (
              <li key={a.slug} className="border-b hairline">
                <Link
                  to="/writing/$slug"
                  params={{ slug: a.slug }}
                  className="group grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-snug md:text-2xl">{a.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/65">
                      {a.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {a.date}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

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
