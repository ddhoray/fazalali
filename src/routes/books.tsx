import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight, Download, ShoppingCart, BookOpen } from "lucide-react";
import bookCoverAsset from "@/assets/book-education-for-liberty-cover.png.asset.json";
import intergenerationalImage from "@/assets/intergenerational-immobility-cover.jpg";
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
    image: intergenerationalImage,
    imageAlt: "An elder's hand resting on a child's hand — generations in contact",
  },
];

function BooksPage() {
  const [active, setActive] = useState<number | null>(null);
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
              A manifesto for releasing the imagination.
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

          <div className="mt-12 flex flex-col gap-3 md:h-[560px] md:flex-row md:items-stretch">
            {forthcoming.map((b, i) => {
              const isActive = active === i;
              const isCollapsed = active !== null && !isActive;
              return (
                <motion.article
                  key={b.title}
                  data-book-card
                  className="group relative flex min-h-0 min-w-0 cursor-default flex-col overflow-hidden border hairline bg-card md:h-[560px] md:flex-[1_1_0%]"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  initial={false}
                  animate={{ flexGrow: isActive ? 2 : isCollapsed ? 0.65 : 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Image */}
                  <div className="relative h-[220px] w-full overflow-hidden md:h-[58%]">
                    <motion.img
                      src={b.image}
                      alt={b.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover"
                      animate={{
                        scale: isActive ? 1.05 : 1,
                        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                      }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-0 bg-foreground/10" />
                    <span className="absolute left-5 top-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-background drop-shadow md:left-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Caption — solid, always legible */}
                  <div className="relative flex min-h-0 flex-1 flex-col border-t hairline px-5 pb-6 pt-5 md:px-7 md:pt-6">
                    <p className="eyebrow text-muted-foreground">{b.year}</p>
                    <h3
                      data-book-title
                      className="mt-3 font-display text-[1.6rem] leading-[1.08] md:text-[2rem]"
                    >
                      {b.title}
                    </h3>
                    <div className="mt-4 h-px w-12 bg-accent" />
                    <motion.p
                      className="mt-4 max-w-[48ch] overflow-hidden text-[15px] leading-relaxed text-foreground/70"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden={!isActive}
                    >
                      {b.note}
                    </motion.p>
                    <motion.div
                      className="mt-auto flex items-center gap-2 pt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.45 }}
                      aria-hidden={!isActive}
                    >
                      <BookOpen className="size-4" strokeWidth={1.8} /> In preparation
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>


        </div>
      </section>
    </div>
  );
}
