import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { inequality } from "@/content/inequality";
import { ArrowUpRight } from "lucide-react";
import heroInequality from "@/assets/hero-inequality.jpg";

export const Route = createFileRoute("/inequality")({
  head: () => ({
    meta: [
      { title: "Inequality — Education for Liberty | Fazal Ali" },
      {
        name: "description",
        content:
          "The capability gap, the inherited geometry of the colonial economy, and what the West Indian classroom owes the child who arrived hungry.",
      },
      { property: "og:title", content: "Inequality — Education for Liberty" },
      {
        property: "og:description",
        content: "A capability reading of inequality from a West Indian classroom.",
      },
    ],
  }),
  component: InequalityPage,
});

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
