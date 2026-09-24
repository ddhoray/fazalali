import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import ecoHeroVideo from "@/assets/ecology/eco-hero-enhanced-web.mp4.asset.json";
import { assetUrl } from "@/lib/asset-url";
import { ecology } from "@/content/ecology";
import { articles } from "@/content/articles";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/ecology")({
  head: () => ({
    meta: [
      { title: "Ecology, Education for Liberty | Fazal Ali" },
      {
        name: "description",
        content:
          "A short note, not a body of work. Where the ethics of artificial intelligence were borrowed from ecological conservation.",
      },
      { property: "og:title", content: "Ecology, Education for Liberty" },
      {
        property: "og:description",
        content: "Precaution, stewardship, irreversibility: AI ethics borrowed from conservation.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/ecology" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/ecology" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Ecology, Education for Liberty",
          description:
            "A short note, not a body of work. Where the ethics of artificial intelligence were borrowed from ecological conservation.",
          datePublished: "2026-01-15",
          author: {
            "@type": "Person",
            name: "Fazal Ibrahim Ali",
            url: "https://omeros-cipher-glass.lovable.app/about",
          },
          publisher: { "@type": "Person", name: "Fazal Ibrahim Ali" },
          mainEntityOfPage: "https://omeros-cipher-glass.lovable.app/ecology",
        }),
      },
    ],
  }),
  component: EcologyPage,
});

const READING_SLUGS = [
  "the-earth-and-green-ai",
  "green-and-blue-ai-in-the-caribbean",
  "development-and-the-dna-of-ai",
  "finding-the-still-point-in-the-age-of-ai",
];

const FEATURED_MANIFESTO = articles.find((a) => a.slug === "the-ai-earth-manifesto");

const ECOLOGY_READINGS = READING_SLUGS.map((s) => articles.find((a) => a.slug === s)).filter(
  (a): a is (typeof articles)[number] => Boolean(a),
);

function EcologyPage() {
  return (
    <div>
      <PageHero
        eyebrow={ecology.eyebrow}
        title={
          <>
            {ecology.title.replace(/\.$/, "")}
            <em className="">.</em>
          </>
        }
        standfirst={ecology.standfirst}
        meta={
          <>
            <span>Note</span>
            <span className="size-1 bg-foreground/30" />
            <span>Short read</span>
            <span className="size-1 bg-foreground/30" />
            <span>From the West Indies</span>
          </>
        }
        video={assetUrl(ecoHeroVideo)}
        imageAlt={ecology.heroImageAlt}
        mediaClassName="mx-auto w-full max-w-[520px] md:justify-self-center"
        mediaAspect="landscape"
      />

      <article className="mx-auto max-w-[820px] px-5 py-12 sm:px-8 sm:py-10">
        {ecology.sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.04}>
            <section className="mb-16 last:mb-0">
              <p className="eyebrow text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · Note
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{s.h}</h2>
              <figure className="mt-8">
                <div className="relative aspect-[16/9] w-full overflow-hidden border hairline bg-[#e9e6e1]">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </figure>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
                {s.body.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </article>

      <section className="border-t hairline">
        <div className="mx-auto max-w-[1800px] px-5 py-16 sm:px-8">
          <p className="eyebrow text-muted-foreground">Field notes</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
            The ground the ethics stand on.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {ecology.strip.map((item, i) => (
              <Reveal key={item.image} delay={i * 0.05}>
                <figure>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border hairline bg-[#e9e6e1]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {FEATURED_MANIFESTO && (
        <section className="border-t hairline bg-[#f5f3f0]">
          <div className="mx-auto grid max-w-[1800px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
            <Reveal>
              <Link
                to="/writing/$slug"
                params={{ slug: FEATURED_MANIFESTO.slug }}
                className="group block overflow-hidden border hairline"
              >
                <img
                  src={FEATURED_MANIFESTO.image}
                  alt="A Geneva street beneath Swiss flags, featured image for The AI Earth Manifesto"
                  className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="eyebrow text-muted-foreground">Featured manifesto · 30 August 2026</p>
              <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
                {FEATURED_MANIFESTO.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
                {FEATURED_MANIFESTO.excerpt}
              </p>
              <Link
                to="/writing/$slug"
                params={{ slug: FEATURED_MANIFESTO.slug }}
                className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em]"
              >
                Read the manifesto
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="border-t hairline bg-[#f5f3f0]">
        <div className="mx-auto max-w-[1800px] px-5 py-16 sm:px-8">
          <p className="eyebrow text-muted-foreground">Selected readings</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
            Where ecology enters the argument.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Five essays that carry the borrowed ethics: climate justice, green computation, and the
            sea around us.
          </p>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {ECOLOGY_READINGS.map((a, i) => (
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
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.2em] self-start transition-colors group-hover:border-foreground">
                    Read
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline">

        <div className="mx-auto flex max-w-[1800px] flex-wrap items-end justify-between gap-6 px-5 py-10 sm:px-8">
          <p className="font-display text-3xl md:text-5xl">Read on.</p>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.2em]">
            <Link
              to="/inequality"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1"
            >
              Inequality <ArrowUpRight className="size-4" />
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
