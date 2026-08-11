import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ecology } from "@/content/ecology";
import { ArrowUpRight } from "lucide-react";
import heroEcology from "@/assets/hero-ecology.jpg";

export const Route = createFileRoute("/ecology")({
  head: () => ({
    meta: [
      { title: "Ecology, Education for Liberty | Fazal Ali" },
      {
        name: "description",
        content:
          "An island is the right scale at which to learn ecology. A West Indian reading of climate, coast, and curriculum.",
      },
      { property: "og:title", content: "Ecology, Education for Liberty" },
      {
        property: "og:description",
        content: "Climate literacy as the substrate of citizenship in the West Indian classroom.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/ecology" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/ecology" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Ecology, Education for Liberty",
          description:
            "An island is the right scale at which to learn ecology. A West Indian reading of climate, coast, and curriculum.",
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

function EcologyPage() {
  return (
    <div>
      <PageHero
        eyebrow={ecology.eyebrow}
        title={<>{ecology.title.replace(/\.$/, "")}<em className="italic">.</em></>}
        standfirst={ecology.standfirst}
        meta={
          <>
            <span>Journal</span>
            <span className="size-1 bg-white/40" />
            <span>{ecology.sections.length} parts</span>
            <span className="size-1 bg-white/40" />
            <span>From the West Indies</span>
          </>
        }
        image={heroEcology}
        imageAlt="Sunlight through a Caribbean forest canopy"
      />

      <article className="mx-auto max-w-[820px] px-5 py-12 sm:px-8 sm:py-10">
        {ecology.sections.map((s, i) => (
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

      <section className="border-t hairline">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-6 px-5 py-10 sm:px-8">
          <p className="font-display text-3xl md:text-5xl">Read on.</p>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.2em]">
            <Link to="/inequality" className="inline-flex items-center gap-2 border-b border-foreground pb-1">
              Inequality <ArrowUpRight className="size-4" />
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
