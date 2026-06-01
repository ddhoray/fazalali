import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BookOpen, Sparkles, PenLine, Compass, ArrowUpRight } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import { LineReveal, WordReveal } from "@/components/site/LineReveal";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { HoverImage } from "@/components/site/HoverImage";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { articles } from "@/content/articles";
import portrait from "@/assets/fazal-portrait.jpg";
import heroImage from "@/assets/hero-book.jpg";
import featuredEducation from "@/assets/featured-education.jpg";
import featuredOmeros from "@/assets/featured-omeros.jpg";
import featuredWriting from "@/assets/featured-writing.jpg";
import practiceEssays from "@/assets/practice-essays.jpg";
import practiceBook from "@/assets/practice-book.jpg";
import practiceOmeros from "@/assets/practice-omeros.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fazal Ali — Writer, Scholar, Omeros AI" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali — a writer from Trinidad reading the world's largest machines, slowly, by hand.",
      },
      { property: "og:title", content: "Fazal Ali — Writer, Scholar, Omeros AI" },
      {
        property: "og:description",
        content:
          "Critical theory in AI, from the West Indies. The Omeros AI identity and the book Education for Liberty.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Quietline />
      <FeaturedSticky />
      <Manifesto />
      <ParallaxBreak />
      <Portrait />
      <Range />
      <LatestWriting />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0a0a0a] text-on-image"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img
          src={heroImage}
          alt="An open book, a fountain pen, and the Caribbean horizon"
          className="size-full object-cover"
          width={1920}
          height={1280}
        />
        <Grain />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-5 pt-28 pb-20 sm:px-10 sm:pb-28"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.05 }}
            className="eyebrow opacity-80"
          >
            Folio I · Trinidad &amp; the Machines
          </motion.p>
        </div>

        <div>
          <h1 className="font-display text-[13vw] leading-[0.92] tracking-[-0.035em] sm:text-[10vw] md:text-[8vw]">
            <Word delay={0.1}>Reading</Word>{" "}
            <Word delay={0.22}>the</Word>{" "}
            <Word delay={0.34} italic>machines</Word>
            <br />
            <Word delay={0.5}>slowly,</Word>{" "}
            <Word delay={0.66} italic>by hand.</Word>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-sm leading-relaxed opacity-80 md:text-base"
          >
            Dr. Fazal Ibrahim Ali — Cambridge-trained, Trinidad-born. Writing on
            critical theory in AI, the founding of Omeros AI, and a small book
            called <em className="italic">Education for Liberty.</em>
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-on-image"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
}

function Word({
  children,
  delay = 0,
  italic = false,
}: {
  children: React.ReactNode;
  delay?: number;
  italic?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%", filter: "blur(12px)" }}
        animate={{ y: "0%", filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${italic ? "italic" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ───────────────── Quiet editorial divider ──────────────── */

function Quietline() {
  return (
    <section className="border-y hairline bg-background">
      <div className="mx-auto grid max-w-[1700px] grid-cols-1 items-center gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8">
        <BlurReveal as="span" className="eyebrow text-muted-foreground">
          Est. Trinidad, 1974
        </BlurReveal>
        <BlurReveal delay={0.1} className="text-center font-display text-xl italic md:text-2xl">
          A small island, a long sentence, a slow machine.
        </BlurReveal>
        <BlurReveal as="span" delay={0.2} className="eyebrow text-right text-muted-foreground">
          Issue 01 / Folio I
        </BlurReveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Featured (sticky image, scrolling frames) ─────────────────────── */

const featured = [
  {
    eyebrow: "(I) The Book",
    title: "Education for Liberty",
    year: "2026",
    note: "A small book about what a child needs to learn so the next machine becomes a freedom, not a fence.",
    image: featuredEducation,
    icon: BookOpen,
    to: "/education-for-liberty",
  },
  {
    eyebrow: "(II) The Identity",
    title: "Omeros AI",
    year: "Ongoing",
    note: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea.",
    image: featuredOmeros,
    icon: Sparkles,
    to: "/omeros-ai",
  },
  {
    eyebrow: "(III) The Journal",
    title: "Selected Writing",
    year: "2024 — 2026",
    note: "Essays on critical theory, AI as social substrate, and the West Indies as a place that reads the world.",
    image: featuredWriting,
    icon: PenLine,
    to: "/writing",
  },
];

function FeaturedSticky() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
          <div>
            <BlurReveal as="p" className="eyebrow text-muted-foreground">
              Featured Work
            </BlurReveal>
            <BlurReveal as="h2" delay={0.08} className="mt-3 font-display text-4xl md:text-6xl">
              Three things, <em className="italic">in order.</em>
            </BlurReveal>
          </div>
          <BlurReveal delay={0.2}>
            <Link to="/writing" className="nav-link opacity-70 hover:opacity-100">
              All work →
            </Link>
          </BlurReveal>
        </div>

        {/* Sticky image left, scrolling frames right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-24">
              <StickyImageStack items={featured} />
            </div>
          </div>

          <ol className="lg:col-span-6 lg:py-[18vh]">
            {featured.map((item, i) => (
              <li key={item.title} className="border-b hairline py-10 first:pt-0 last:border-b-0 md:py-16">
                <SlideIn from="right" delay={i * 0.04}>
                  <Link to={item.to as never} className="group block">
                    <div className="mb-4 flex items-center gap-3 text-muted-foreground">
                      <item.icon className="size-4" />
                      <span className="nav-link">{item.eyebrow}</span>
                      <span className="ml-auto nav-link">{item.year}</span>
                    </div>
                    <h3 className="font-display text-4xl leading-[0.98] tracking-[-0.02em] transition-transform duration-700 group-hover:translate-x-2 md:text-6xl">
                      {item.title}<span className="italic">.</span>
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                      {item.note}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm transition-opacity opacity-70 group-hover:opacity-100">
                      Read more <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </SlideIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StickyImageStack({ items }: { items: typeof featured }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle parallax inside the sticky frame
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full overflow-hidden bg-foreground/5">
      {items.map((item, i) => {
        // Each image fades in for its scroll segment
        const seg = 1 / items.length;
        const start = i * seg;
        const end = start + seg;
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
          i === 0 ? [1, 1, 1, 0] : i === items.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
        );
        return (
          <motion.img
            key={item.title}
            src={item.image}
            alt={item.title}
            style={{ opacity, y }}
            className="absolute inset-0 size-full scale-110 object-cover"
            loading="lazy"
          />
        );
      })}
      <Grain />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-5 text-on-image md:p-7">
        <span className="nav-link">Now showing</span>
        <span className="nav-link">{items.length} frames</span>
      </div>
    </div>
  );
}

/* ─────────────────── Parallax Break ─────────────────── */

function ParallaxBreak() {
  return (
    <section className="relative h-[60svh] min-h-[420px] w-full overflow-hidden">
      <ParallaxImage src={featuredWriting} alt="" className="absolute inset-0" strength={22} />
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-on-image">
        <BlurReveal
          as="p"
          className="max-w-3xl font-display text-3xl italic leading-[1.1] md:text-5xl"
        >
          &ldquo;The machine is a sentence. Read it slowly.&rdquo;
        </BlurReveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Manifesto (line-by-line reveal) ────────────────────── */

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24">
      <BlurReveal as="p" className="eyebrow mb-8 flex items-center gap-3 text-muted-foreground">
        <Compass className="size-4" /> A note before reading
      </BlurReveal>
      <LineReveal
        className="font-display text-[7vw] leading-[1.08] tracking-[-0.025em] text-balance sm:text-[3.4vw]"
        lines={[
          "I am not building AI.",
          "I am not selling chips.",
          "I am thinking with the machines,",
          "against them, around them —",
          "from a small island that has always",
          "read the world more carefully",
          "than the world has read it.",
        ]}
        stagger={0.18}
      />
      <BlurReveal as="p" delay={0.2} className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground">
        — Fazal Ali, on opening the new site, 2026.
      </BlurReveal>
    </section>
  );
}

/* ─────────────────────── Portrait ─────────────────────── */

function Portrait() {
  return (
    <section className="section-dark relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="mb-12 flex items-center justify-between border-b border-current/20 pb-5">
          <BlurReveal as="p" className="eyebrow opacity-60">The writer</BlurReveal>
          <BlurReveal as="p" delay={0.1} className="eyebrow opacity-60">Trinidad · b. 1974</BlurReveal>
        </div>

        {/* Name as hero */}
        <BlurReveal
          as="h2"
          className="mb-12 font-display text-[14vw] leading-[0.92] tracking-[-0.03em] text-white md:text-[8.5vw]"
        >
          <WordReveal text="Fazal" /> <em className="italic"><WordReveal text="Ali." delay={0.15} /></em>
        </BlurReveal>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <SlideIn from="left" className="col-span-12 md:col-span-5">
            <div className="grain relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={portrait}
                alt="Dr. Fazal Ibrahim Ali"
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
                width={1024}
                height={1280}
              />
              <Grain />
            </div>
          </SlideIn>

          <div className="col-span-12 flex flex-col justify-between gap-8 md:col-span-7">
            <BlurReveal delay={0.1} className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Cambridge-trained, mentored by Amartya Sen, Lord Martin Rees and Sir
              Leszek Borysiewicz. For twenty years the work stayed inside lecture
              rooms. This site is the first time I have stepped out from behind the
              lectern — the books, the ideas, the art, and a contribution from
              Trinidad to a conversation usually written elsewhere.
            </BlurReveal>

            <BlurReveal delay={0.18} className="font-display text-2xl italic leading-[1.2] text-white/90 md:text-3xl">
              &ldquo;I have grown braver. A little more adventurous.&rdquo;
            </BlurReveal>

            <SlideIn delay={0.24} className="flex flex-wrap items-center justify-between gap-6 pt-2">
              <p className="eyebrow text-white/55">
                Writer · Scholar · Founder of Omeros AI
              </p>
              <CirclePill to="/about" label="More about me" invert />
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Range ──────────────────────── */

const range = [
  { n: "01", title: "Critical Theory in AI", body: "Frontier models read as social substrate — not products, not miracles.", icon: Sparkles },
  { n: "02", title: "Education for Liberty", body: "What a child needs to learn so the next machine is a freedom, not a fence.", icon: BookOpen },
  { n: "03", title: "Omeros AI", body: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea.", icon: Compass },
  { n: "04", title: "From the West Indies", body: "A contribution from Trinidad to a conversation rarely written from here.", icon: PenLine },
];

const rangeImages = [practiceEssays, practiceBook, practiceOmeros, featuredWriting];

function Range() {
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-20 sm:px-8 md:py-24">
      <div className="mb-12 max-w-3xl">
        <BlurReveal as="p" className="eyebrow text-muted-foreground">Range</BlurReveal>
        <BlurReveal as="h2" delay={0.08} className="mt-5 font-display text-5xl leading-[1.02] md:text-7xl">
          Four threads, <em className="italic">one practice.</em>
        </BlurReveal>
      </div>

      <div className="grid grid-cols-1 gap-px bg-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
        {range.map((r, i) => (
          <SlideIn key={r.n} delay={i * 0.08}>
            <div className="group relative flex h-full min-h-[320px] cursor-default flex-col justify-between gap-10 overflow-hidden bg-background p-7 md:p-8">
              <img
                src={rangeImages[i]}
                alt=""
                className="card-image absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-30"
                loading="lazy"
              />
              <div className="relative flex items-center justify-between">
                <r.icon className="size-5 opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="nav-link opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                  ({r.n})
                </span>
              </div>
              <div className="relative">
                <h4 className="font-display text-3xl leading-[1.05] transition-transform duration-700 group-hover:-translate-y-2 md:text-4xl">
                  {r.title}<span className="italic">.</span>
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                  {r.body}
                </p>
              </div>
            </div>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── Writing ──────────────────────── */

const writingImages = [practiceEssays, practiceBook, practiceOmeros];

function LatestWriting() {
  const latest = articles.slice(0, 3);
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-20 sm:px-8 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6 border-b hairline pb-5">
        <div>
          <BlurReveal as="p" className="eyebrow text-muted-foreground">From the Journal</BlurReveal>
          <BlurReveal as="h2" delay={0.08} className="mt-3 font-display text-4xl md:text-6xl">
            Recent pieces<span className="italic">.</span>
          </BlurReveal>
        </div>
        <BlurReveal delay={0.16}>
          <Link to="/writing" className="nav-link">All essays →</Link>
        </BlurReveal>
      </div>

      <div className="divide-y hairline">
        {latest.map((a, i) => (
          <SlideIn key={a.slug} delay={i * 0.06} from="bottom">
            <HoverImage src={writingImages[i % writingImages.length]} alt={a.title}>
              <Link
                to="/writing/$slug"
                params={{ slug: a.slug }}
                className="group grid grid-cols-1 gap-4 py-7 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-12 md:py-9"
              >
                <span className="eyebrow text-muted-foreground">
                  {new Date(a.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <h3 className="font-display text-3xl leading-[1.05] transition-transform duration-700 group-hover:translate-x-3 md:text-5xl">
                  {a.title}
                </h3>
                <span className="nav-link text-muted-foreground transition-colors group-hover:text-foreground">
                  {a.topic} →
                </span>
              </Link>
            </HoverImage>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}
