import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight, Download, ShoppingCart } from "lucide-react";

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
        content:
          "Building on Amartya Sen and John Rawls — education as the substrate of freedom.",
      },
    ],
  }),
  component: BookPage,
});

const PDF_URL =
  "https://fazalali.com/wp-content/uploads/2026/02/EducationforLiberty.pdf";
const AMAZON_URL =
  "https://www.amazon.com/Education-Liberty-future-open-suggestions-ebook/dp/B072KJSQ6P/";

const chapters = [
  { n: "I", title: "Freedom as the medium", body: "Why education, before it is a system, is a metaphysical claim about what people are for." },
  { n: "II", title: "Sen, in the islands", body: "A reading of Development as Freedom from a small state, where capability is not abstract." },
  { n: "III", title: "Rawls, repositioned", body: "The veil of ignorance is heavier in the Caribbean. It is also more honest." },
  { n: "IV", title: "The classroom as a polity", body: "If liberty is the goal, the classroom is its first parliament." },
  { n: "V", title: "What we owe the future", body: "The pedagogy of failure, of patience, of refusal — in the age of AI." },
];

function BookPage() {
  return (
    <div>
      <PageHero
        eyebrow="The Book"
        title={<>Education <em className="italic">for</em> Liberty</>}
        standfirst={
          <>
            A persuasive work built on Amartya Sen's <em>Development as Freedom</em> and
            John Rawls' <em>A Theory of Justice</em>. After Sen. After Rawls. From Trinidad.
          </>
        }
        meta={
          <>
            <span>142 pages</span>
            <span className="size-1 bg-white/40" />
            <span>Omeros AI · First Edition</span>
            <span className="size-1 bg-white/40" />
            <span>Available on Amazon</span>
          </>
        }
      />

      {/* Book cover + premise */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <Reveal>
            <div className="relative bg-foreground/5 p-8 md:p-14">
              <div className="flex aspect-[3/4] w-full flex-col justify-between border border-foreground/25 bg-background p-8 shadow-2xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Fazal Ibrahim Ali
                </p>
                <div>
                  <p className="font-display text-5xl leading-[0.95]">
                    Education<br />for<br /><em className="italic">Liberty</em>
                  </p>
                  <p className="mt-6 text-xs text-muted-foreground">
                    After Sen. After Rawls. From Trinidad.
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Omeros AI · First Edition
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-center gap-8">
              <div>
                <p className="eyebrow text-muted-foreground">Premise</p>
                <p className="mt-5 font-display text-3xl leading-tight md:text-5xl">
                  Liberty is not the absence of constraint. It is the cultivated
                  capacity to <em className="italic">choose well.</em>
                </p>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Education, properly understood, is the manufacture of that
                capacity at scale. This monograph traces the lineage from Sen
                and Rawls through West Indian thinkers — Lloyd Best, C. L. R.
                James, Walter Rodney — and asks what freedom can mean in an age
                of artificial intelligence.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm uppercase tracking-[0.2em] text-background"
                >
                  <ShoppingCart className="size-4" /> Buy on Amazon
                </a>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-sm uppercase tracking-[0.2em]"
                >
                  <Download className="size-4" /> Download PDF
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Embedded PDF reader */}
      <section data-nav="dark" className="section-invert">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-white/55">Read it here</p>
                <p className="mt-4 font-display text-3xl md:text-5xl">
                  The full monograph, in your browser.
                </p>
              </div>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-b border-white pb-1 text-sm uppercase tracking-[0.2em] text-white"
              >
                Open in new tab <ArrowUpRight className="size-4" />
              </a>
            </div>
            <div className="mt-10 aspect-[4/5] w-full border border-white/15 bg-white/5 md:aspect-[16/10]">
              <iframe
                src={PDF_URL}
                title="Education for Liberty — PDF"
                className="size-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Contents</p>
          <h2 className="mt-5 font-display text-4xl md:text-7xl">
            Five <em className="italic">chapters.</em>
          </h2>
        </Reveal>
        <div className="mt-16 border-t hairline">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.04}>
              <div className="grid gap-6 border-b hairline py-10 md:grid-cols-[120px_1fr_2fr] md:gap-12 md:py-12">
                <p className="font-display text-5xl text-muted-foreground">{c.n}</p>
                <p className="font-display text-2xl leading-tight md:text-3xl">
                  {c.title}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cross-links to Podcast + Palimpsest */}
      <section className="border-t hairline">
        <div className="mx-auto grid max-w-[1700px] gap-px bg-foreground/15 md:grid-cols-2">
          <Link to="/podcast" className="group flex flex-col gap-4 bg-background p-10 md:p-16">
            <p className="eyebrow text-muted-foreground">Listen</p>
            <p className="font-display text-3xl md:text-6xl">The Podcast.</p>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              The Preface and Prolegomenon, read aloud.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              Open podcast{" "}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
          <Link to="/palimpsest" className="group flex flex-col gap-4 bg-background p-10 md:p-16">
            <p className="eyebrow text-muted-foreground">Long read</p>
            <p className="font-display text-3xl md:text-6xl">The Palimpsest.</p>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              West Indian education from 1096 to 1979 in one timeline.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              Open palimpsest{" "}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
