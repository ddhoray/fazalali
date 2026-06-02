import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { Flipbook } from "@/components/site/Flipbook";

import { ArrowUpRight, Download, ShoppingCart } from "lucide-react";
import heroBook from "@/assets/hero-book.jpg";

export const Route = createFileRoute("/education-for-liberty")({
  head: () => ({
    meta: [
      { title: "Education for Liberty — Fazal Ali" },
      {
        name: "description",
        content:
          "Fazal Ali's monograph after Sen and Rawls — read a flippable preview, download the PDF, or buy on Amazon.",
      },
      { property: "og:title", content: "Education for Liberty — Fazal Ali" },
      {
        property: "og:description",
        content:
          "Building on Amartya Sen and John Rawls — education as the substrate of freedom. Flip through a preview or download the PDF.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/education-for-liberty" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/education-for-liberty" },
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
        image={heroBook}
        imageAlt="Education for Liberty — monograph cover by Fazal Ibrahim Ali"
        imageFit="contain"
      />

      {/* Flippable book preview */}
      <section data-nav="dark" className="section-invert min-h-[calc(100svh-72px)] overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100svh-72px)] max-w-[1500px] flex-col justify-center px-5 py-4 sm:px-8 sm:py-5">
          <Reveal>
            <div className="grid items-end gap-4 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow text-white/55">Preview</p>
                <p className="mt-2 font-display text-3xl leading-none md:text-4xl">
                  Flip <em className="italic">through</em> the book.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90"
                >
                  <Download className="size-4" /> Download PDF
                </a>
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/40 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
                >
                  <ShoppingCart className="size-4" /> Buy on Amazon
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-4">
            <Flipbook />
          </div>

          <Reveal>
            <p className="mx-auto mt-3 max-w-xl text-center text-[10px] uppercase tracking-[0.22em] text-white/45">
              Prefer to read offline?{" "}
              <a href={PDF_URL} target="_blank" rel="noreferrer" download className="text-white underline-offset-4 hover:underline">
                Download the full 142-page PDF
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
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

      {/* Cross-links */}
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
