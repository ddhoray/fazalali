import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
      { title: "Books, Fazal Ali" },
      {
        name: "description",
        content:
          "Books by Fazal Ibrahim Ali, Education for Liberty, and the forthcoming volumes on Caribbean thought, AI, and intergenerational immobility.",
      },
      { property: "og:title", content: "Books, Fazal Ali" },
      {
        property: "og:description",
        content: "Education for Liberty and the forthcoming volumes from Omeros AI.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/books" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/books" }],
  }),
  component: BooksPage,
});

const PDF_URL = "https://fazalali.com/wp-content/uploads/2026/02/EducationforLiberty.pdf";
const AMAZON_URL =
  "https://www.amazon.com/Education-Liberty-future-open-suggestions-ebook/dp/B072KJSQ6P/";

const forthcoming = [
  {
    title: "After the Future",
    note: "An anthology of short essays on artificial intelligence and its impact on development in Latin America and the Caribbean. On algorithmic fairness, epistemic justice, and the coming wave that could reverse, or deepen, inherited inequality. Foreword by David Rosenblatt.",
    year: "Forthcoming · Essays on AI",
    image: afterTheFutureCover,
    imageAlt: "Cover of After the Future, essays on AI by Fazal Ali",
  },
  {
    title: "Secure Development",
    note: "A construct of his own making: development that holds. Growth measured not by the height of the peak but by how little of it can be taken away, from a region where gains have always been reversible.",
    year: "Forthcoming · A construct",
    image:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Open sky and sea horizon, freedom as an atmosphere",
  },
  {
    title: "Abbreviated Development",
    note: "The second construct: development cut short, arrested mid-sentence by export concentration, revenue shortfalls, and the digital and governance gaps that keep a small state from finishing its own argument.",
    year: "In preparation · A construct",
    image: intergenerationalImage,
    imageAlt: "An elder's hand resting on a child's hand, generations in contact",
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
            The <em className="text-accent">work</em>, in volumes.
          </>
        }
        standfirst={
          <>
            A body of writing built on Amartya Sen's <em>Development as Freedom</em> and John Rawls'{" "}
            <em>A Theory of Justice</em>, Caribbean in origin, global in address.
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
            Education for <em className="text-accent">Liberty.</em>
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
                alt="Education for Liberty, a monograph by Fazal Ali"
                className="size-full object-contain"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">First edition · 142 pages</p>
            <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
              "Standing on the shoulders of Amartya Sen's Development as Freedom and John Rawls' A
              Theory of Justice, Omeros AI builds a body of work that adds to the critical theory on
              AI, written from the West Indies, for a reader anywhere who suspects the conversation
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
                  Books to <em className="text-accent">come.</em>
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Three volumes in preparation, each extending the Omeros AI argument into a distinct
                register of public life.
              </p>
            </div>
          </Reveal>

          <div
            className="mt-12 flex flex-col gap-4 md:flex-row md:gap-5"
            onMouseLeave={() => setActive(null)}
          >
            {forthcoming.map((b, i) => (
              <motion.article
                key={b.title}
                data-book-card
                onMouseEnter={() => setActive(i)}
                className="group relative h-[540px] min-w-0 cursor-default overflow-hidden border hairline bg-card md:h-[600px]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                animate={{
                  flexGrow: active === null ? 1 : active === i ? 1.35 : 0.85,
                }}
                style={{ flexBasis: 0, flexGrow: 1 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={b.image}
                  alt={b.imageAlt}
                  loading="lazy"
                  className={`absolute inset-0 size-full object-cover transition-all duration-700 ease-out ${
                    active !== null && active !== i ? "grayscale brightness-75" : "grayscale-0"
                  } ${active === i ? "scale-[1.03] brightness-110" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/55 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 text-background">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <BookOpen className="size-4 opacity-80" strokeWidth={1.8} />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-[245px] px-6 pb-7 pt-5 text-background md:h-[270px] md:px-7 md:pb-8">
                  <p className="eyebrow h-5 text-background/80">{b.year}</p>
                  <h3
                    data-book-title
                    className="mt-3 flex h-[82px] items-end font-display text-[2rem] leading-[1.02] md:h-[94px] md:text-[2.25rem]"
                  >
                    {b.title}
                  </h3>
                  <div
                    className={`mt-4 h-px bg-accent transition-[width] duration-500 ${active === i ? "w-16" : "w-10"}`}
                  />
                  <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-background/85">
                    {b.note}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
