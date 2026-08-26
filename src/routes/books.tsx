import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight, Download, ShoppingCart, BookOpen, X } from "lucide-react";
import bookCoverAsset from "@/assets/book-education-for-liberty-cover.png.asset.json";
import afterTheFutureAsset from "@/assets/after-the-future-cover.jpg.asset.json";
import intergenerationalImage from "@/assets/intergenerational-immobility-cover.jpg";
import { assetUrl } from "@/lib/asset-url";

const bookCover = assetUrl(bookCoverAsset);
const afterTheFutureCover = assetUrl(afterTheFutureAsset);

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/books" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/books" }],
  }),
  component: BooksPage,
});

const PDF_URL = "https://fazalali.com/wp-content/uploads/2026/02/EducationforLiberty.pdf";
const AMAZON_URL =
  "https://www.amazon.com/Education-Liberty-future-open-suggestions-ebook/dp/B072KJSQ6P/";

const cardLink =
  "text-inherit underline decoration-accent underline-offset-4 transition-colors hover:text-accent";

const forthcoming: {
  title: string;
  note: ReactNode;
  year: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    title: "After the Future",
    note: (
      <>
        Where are we? The future is here, it is just not sprinkled equally. So what happens{" "}
        <a
          href="https://fazalali.com/2024/05/04/after-the-future/"
          target="_blank"
          rel="noreferrer"
          className={cardLink}
        >
          after the future
        </a>
        ? We cannot relinquish our reasoned agency and hope to live freely in a future that will
        never be our own. A future that belongs to someone else is not freedom, and the struggle to
        secure equal rights can only find a remedy from behind a Rawlsian Veil of Ignorance.
      </>
    ),
    year: "Forthcoming · Essays on AI",
    image: afterTheFutureCover,
    imageAlt: "Cover of After the Future, essays on AI by Fazal Ali",
  },
  {
    title: "Secure Development",
    note: (
      <>
        The constellation of values, technologies, and practices that lessen vulnerabilities, a{" "}
        <a
          href="https://fazalali.com/2023/03/19/sensitivity-to-vulnerability/"
          target="_blank"
          rel="noreferrer"
          className={cardLink}
        >
          sensitivity to vulnerability
        </a>{" "}
        balanced against resilience. An{" "}
        <a
          href="https://fazalali.com/2026/05/16/ai-as-an-always-on-intelligent-security-fabric/"
          target="_blank"
          rel="noreferrer"
          className={cardLink}
        >
          always-on intelligent security fabric
        </a>{" "}
        for a net-zero future, alert to{" "}
        <a
          href="https://fazalali.com/2026/04/12/the-100-model-war-and-shadow-ai/"
          target="_blank"
          rel="noreferrer"
          className={cardLink}
        >
          the model wars and shadow AI
        </a>
        . A skills-and-capabilities approach to development that holds.
      </>
    ),
    year: "Forthcoming · A construct",
    image:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Open sky and sea horizon, freedom as an atmosphere",
  },
  {
    title: "Abbreviated Development",
    note: (
      <>
        The dangerous gap that opens when the speed of code outpaces the state's ability to write
        primary law: legislative lag, amplified risk, a state unable to protect its citizens. The
        remedy is{" "}
        <a
          href="https://fazalali.com/2023/05/27/unusual-thinking-and-abbreviated-development/"
          target="_blank"
          rel="noreferrer"
          className={cardLink}
        >
          unusual thinking
        </a>
        , open-source legal frameworks, and continuously updated regulation.
      </>
    ),
    year: "In preparation · A construct",
    image: intergenerationalImage,
    imageAlt: "An elder's hand resting on a child's hand, generations in contact",
  },
];

function BooksPage() {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
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
                onClick={() => setOpen(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setOpen(i);
                }}
                className="group relative min-w-0 cursor-pointer overflow-hidden border hairline bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:h-[600px] md:basis-0"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                animate={{
                  flexGrow: active === null ? 1 : active === i ? 1.35 : 0.85,
                }}
                style={{ flexGrow: 1 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative h-[390px] overflow-hidden bg-foreground md:absolute md:inset-0 md:h-auto">
                  <img
                    src={b.image}
                    alt={b.imageAlt}
                    loading="lazy"
                    className={`size-full transition-all duration-700 ease-out ${
                      i === 0 ? "object-contain" : "object-cover"
                    } ${active !== null && active !== i ? "grayscale brightness-75" : "grayscale-0"} ${
                      active === i && i !== 0 ? "scale-[1.03] brightness-110" : ""
                    }`}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-foreground via-foreground/45 to-transparent md:block" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 text-background">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <BookOpen className="size-4 opacity-80" strokeWidth={1.8} />
                </div>

                <div className="relative min-h-[210px] bg-foreground px-6 pb-7 pt-6 text-background md:absolute md:inset-x-0 md:bottom-0 md:h-[245px] md:min-h-0 md:bg-transparent md:px-7 md:pb-8 md:pt-5">
                  <p className="eyebrow text-background/80">{b.year}</p>
                  <h3
                    data-book-title
                    className="mt-3 font-display text-[2rem] leading-[1.08] md:flex md:h-[94px] md:items-end md:text-[2.25rem]"
                  >
                    {b.title}
                  </h3>
                  <div
                    className={`mt-4 h-px bg-accent transition-[width] duration-500 ${active === i ? "w-16" : "w-10"}`}
                  />
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-background/80">
                    Open full note
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Full-content overlay */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            key="book-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border hairline bg-card"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={forthcoming[open].title}
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center border hairline bg-background/90 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <X className="size-4" />
              </button>

              <div className="grid md:min-h-[620px] md:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.15fr)]">
                <div className="flex min-h-[430px] items-center justify-center overflow-hidden bg-foreground p-5 sm:min-h-[540px] sm:p-8 md:min-h-0">
                  <img
                    src={forthcoming[open].image}
                    alt={forthcoming[open].imageAlt}
                    className={`max-h-[72vh] size-full ${open === 0 ? "object-contain" : "object-cover"}`}
                  />
                </div>

                <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12">
                  <p className="eyebrow text-muted-foreground">{forthcoming[open].year}</p>
                  <h3 className="mt-4 max-w-lg font-display text-4xl leading-[1.05] sm:text-5xl">
                    {forthcoming[open].title}
                  </h3>
                  <div className="mt-7 h-px w-14 bg-accent" />
                  <p className="mt-7 text-base leading-relaxed text-foreground/85 sm:text-lg">
                    {forthcoming[open].note}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
