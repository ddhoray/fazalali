import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight, Download, ShoppingCart, BookOpen } from "lucide-react";
import bookCoverAsset from "@/assets/book-education-for-liberty-cover.png.asset.json";
import { assetUrl } from "@/lib/asset-url";

const bookCover = assetUrl(bookCoverAsset);

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — Fazal Ali" },
      {
        name: "description",
        content:
          "Books by Fazal Ibrahim Ali — Education for Liberty, and the forthcoming volumes on Caribbean thought, AI, and intergenerational immobility.",
      },
      { property: "og:title", content: "Books — Fazal Ali" },
      {
        property: "og:description",
        content:
          "Education for Liberty and the forthcoming volumes from Omeros AI.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/books" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/books" },
    ],
  }),
  component: BooksPage,
});

const PDF_URL =
  "https://fazalali.com/wp-content/uploads/2026/02/EducationforLiberty.pdf";
const AMAZON_URL =
  "https://www.amazon.com/Education-Liberty-future-open-suggestions-ebook/dp/B072KJSQ6P/";

const forthcoming = [
  {
    title: "Freedom as a Medium",
    note: "A long essay on liberty not as a state to be reached, but as the substrate in which thought and policy take shape.",
    year: "Forthcoming",
    image:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Open sky and sea horizon — freedom as an atmosphere",
  },
  {
    title: "Sen in the Islands",
    note: "Reading Amartya Sen's capability approach from a small state — where freedom is never abstract.",
    year: "Forthcoming",
    image:
      "https://images.unsplash.com/photo-1559666126-84f389727b9a?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "A small Caribbean island ringed by turquoise water",
  },
  {
    title: "Intergenerational Immobility",
    note: "On inherited inequality, the data fabric of state enterprises, and what the next century owes the last.",
    year: "In preparation",
    image:
      "https://images.unsplash.com/photo-1531253450048-2a0a965096ff?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "An elder's hand resting on a child's hand — generations in contact",
  },
];

function BooksPage() {
  return (
    <div>
      <PageHero
        eyebrow="Books"
        title={
          <>
            The <em className="italic text-accent">work</em>, in volumes.
          </>
        }
        standfirst={
          <>
            A body of writing built on Amartya Sen's <em>Development as
            Freedom</em> and John Rawls' <em>A Theory of Justice</em> — Caribbean
            in origin, global in address.
          </>
        }
        meta={
          <>
            <span>Omeros AI</span>
            <span className="size-1 bg-white/40" />
            <span>One published · Three forthcoming</span>
          </>
        }
      />

      {/* Featured: Education for Liberty */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="eyebrow text-muted-foreground">In print</p>
          <h2 className="mt-4 font-display text-4xl leading-[1] md:text-6xl">
            Education for <em className="italic text-accent">Liberty.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <div
              className="relative mx-auto aspect-[3/4] w-full max-w-[440px]"
              style={{
                filter:
                  "drop-shadow(0 30px 40px rgba(15, 27, 61, 0.25)) drop-shadow(0 8px 16px rgba(15, 27, 61, 0.18))",
              }}
            >
              <img
                src={bookCover}
                alt="Education for Liberty — a monograph by Fazal Ali"
                className="size-full object-contain"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">First edition · 142 pages</p>
            <p className="mt-6 font-display text-2xl italic leading-snug md:text-3xl">
              "Standing on the shoulders of Amartya Sen's Development as Freedom
              and John Rawls' A Theory of Justice, Omeros AI builds a body of
              work that adds to the critical theory on AI, written from the
              West Indies, for a reader anywhere who suspects the conversation
              has been too narrow for too long."
            </p>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
              A small book about what a child needs to learn so that the next
              machine becomes a freedom, not a fence. With a foreword by Sir
              George Alleyne and an epilogue by Archbishop Joseph Everard Harris.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/education-for-liberty" className="group btn-cta btn-primary">
                Read the monograph
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noreferrer"
                download
                className="btn-cta btn-on-light"
              >
                <Download className="size-4" /> Download PDF
              </a>
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-cta btn-on-light"
              >
                <ShoppingCart className="size-4" /> Buy on Amazon
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Forthcoming */}
      <section className="border-t hairline bg-background">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
              <div>
                <p className="eyebrow text-muted-foreground">Forthcoming</p>
                <h2 className="mt-4 font-display text-4xl leading-[1] md:text-6xl">
                  Books to <em className="italic text-accent">come.</em>
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Three volumes in preparation — each extending the Omeros AI
                argument into a distinct register of public life.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-3">
            {forthcoming.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <article className="flex h-full flex-col gap-6 bg-background p-8 md:p-10">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <BookOpen className="size-5" />
                    <span className="eyebrow">{b.year}</span>
                  </div>
                  <div
                    className="aspect-[3/4] w-full overflow-hidden border hairline bg-foreground/5"
                  >
                    <img
                      src={b.image}
                      alt={b.imageAlt}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl leading-tight md:text-3xl">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {b.note}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
