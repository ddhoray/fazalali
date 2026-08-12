import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { inequality } from "@/content/inequality";
import { articles } from "@/content/articles";
import { ArrowUpRight } from "lucide-react";
import heroInequality from "@/assets/hero-inequality.jpg";

export const Route = createFileRoute("/inequality")({
  head: () => ({
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
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/inequality" },
    ],
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
  }),
  component: InequalityPage,
});

const TRACK = /inherited inequalit|intergenerational immobilit|intergenerational inequalit/i;

const tracked = articles
  .filter((a) => TRACK.test([a.title, a.excerpt, ...a.body].join(" ")))
  .slice(0, 8);

function InequalityPage() {
  return (
    <div>
      <PageHero
        eyebrow={inequality.eyebrow}
        title={<>{inequality.title.replace(/\.$/, "")}<em className="italic">.</em></>}
        standfirst={inequality.standfirst}
        meta={
          <>
            <span>Journal</span>
            <span className="size-1 bg-white/40" />
            <span>{inequality.sections.length} parts</span>
            <span className="size-1 bg-white/40" />
            <span>After Sen</span>
          </>
        }
        image={heroInequality}
        imageAlt="High-contrast Caribbean colonial stairwell"
      />

      <article className="mx-auto max-w-[820px] px-5 py-12 sm:px-8 sm:py-10">
        {inequality.sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.04}>
            <section className="mb-16 last:mb-0">
              <p className="eyebrow text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · Section
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                {s.h}
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
                {s.body.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </article>

      <section className="border-t hairline bg-[oklch(0.98_0.004_250)]">
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
                    <h3 className="font-display text-xl leading-snug md:text-2xl">
                      {a.title}
                    </h3>
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
            <Link to="/ecology" className="inline-flex items-center gap-2 border-b border-foreground pb-1">
              Ecology <ArrowUpRight className="size-4" />
            </Link>
            <Link to="/education-for-liberty" className="inline-flex items-center gap-2 border-b border-foreground pb-1">
              The Book <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
