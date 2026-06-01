import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { GlassPanel } from "@/components/site/GlassPanel";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/education-for-liberty")({
  head: () => ({
    meta: [
      { title: "Education for Liberty — Fazal Ali" },
      {
        name: "description",
        content:
          "Fazal Ali's persuasive work that builds on Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice.",
      },
      { property: "og:title", content: "Education for Liberty — Fazal Ali" },
      {
        property: "og:description",
        content: "Building on Amartya Sen and John Rawls — education as the substrate of freedom.",
      },
    ],
  }),
  component: BookPage,
});

const chapters = [
  { n: "I", title: "Freedom as the medium", body: "Why education, before it is a system, is a metaphysical claim about what people are for." },
  { n: "II", title: "Sen, in the islands", body: "A reading of Development as Freedom from a small state, where capability is not abstract." },
  { n: "III", title: "Rawls, repositioned", body: "The veil of ignorance is heavier in the Caribbean. It is also more honest." },
  { n: "IV", title: "The classroom as a polity", body: "If liberty is the goal, the classroom is its first parliament." },
  { n: "V", title: "What we owe the future", body: "The pedagogy of failure, of patience, of refusal — in the age of AI." },
];

function BookPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The Book</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.92] text-balance md:text-[7.5rem]">
          Education <em className="italic">for</em> Liberty
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          A persuasive work built on Amartya Sen's <em>Development as Freedom</em> and
          John Rawls' <em>A Theory of Justice</em>.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <GlassPanel strong className="flex aspect-[4/5] items-center justify-center p-10">
            <div className="flex aspect-[3/4] w-full max-w-sm flex-col justify-between rounded-2xl border border-foreground/15 bg-background/60 p-7 shadow-[var(--shadow-lift)]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Fazal Ibrahim Ali</p>
              <div>
                <p className="font-display text-4xl leading-[0.95]">Education for Liberty</p>
                <p className="mt-4 text-xs text-muted-foreground">After Sen. After Rawls. From Trinidad.</p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Omeros AI · First Edition</p>
            </div>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col justify-between gap-6">
            <GlassPanel className="p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Premise</p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                Liberty is not the absence of constraint. It is the cultivated capacity
                to choose well. Education, properly understood, is the manufacture
                of that capacity at scale.
              </p>
            </GlassPanel>

            <GlassPanel className="p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Lineage</p>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85">
                <li>· Amartya Sen — capability, freedom, development as the unfolding of agency.</li>
                <li>· John Rawls — justice as fairness, the original position, the basic structure.</li>
                <li>· West Indian thinkers — Lloyd Best, C. L. R. James, Walter Rodney.</li>
              </ul>
            </GlassPanel>

            <Link
              to="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background"
            >
              Enquire about the book <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <section className="mt-32">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">Chapters.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.05}>
              <GlassPanel className="flex gap-6 p-7">
                <p className="font-display text-4xl text-muted-foreground">{c.n}</p>
                <div>
                  <p className="font-display text-2xl">{c.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
