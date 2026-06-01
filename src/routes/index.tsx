import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { FloatingImageList, type FloatingItem } from "@/components/site/FloatingImageList";
import { HoverImage } from "@/components/site/HoverImage";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { articles } from "@/content/articles";
import portrait from "@/assets/fazal-portrait.jpg";
import heroImage from "@/assets/hero-desk.jpg";
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

const featured: FloatingItem[] = [
  {
    eyebrow: "The Book",
    title: "Education for Liberty",
    year: "2026",
    image: featuredEducation,
    to: "/education-for-liberty",
  },
  {
    eyebrow: "The Identity",
    title: "Omeros AI",
    year: "Ongoing",
    image: featuredOmeros,
    to: "/omeros-ai",
  },
  {
    eyebrow: "The Journal",
    title: "Selected Writing",
    year: "2024 — 2026",
    image: featuredWriting,
    to: "/writing",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedSection />
      <Manifesto />
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
      className="relative h-[100svh] w-full overflow-hidden bg-foreground text-background"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[8%] h-[116%]">
        <img
          src={heroImage}
          alt=""
          className="size-full object-cover opacity-80"
          width={1920}
          height={1080}
        />
        <Grain />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-20 sm:px-10 sm:pb-28"
      >
        <h1 className="font-display text-[14vw] leading-[0.92] tracking-[-0.035em] sm:text-[10vw] md:text-[8.2vw]">
          <Word delay={0.1}>Reading the</Word>{" "}
          <Word delay={0.22} italic>machines</Word>
          <br />
          <Word delay={0.36}>slowly,</Word>{" "}
          <Word delay={0.48} italic>by hand.</Word>
        </h1>
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
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${italic ? "italic" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ───────────────────── Marquee divider ────────────────── */

function Marquee() {
  const items = [
    "Critical Theory",
    "Education for Liberty",
    "Omeros AI",
    "The West Indies",
    "On Walcott",
    "On Sen, On Rawls",
    "A Journal Kept Slowly",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y hairline bg-background py-6">
      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 whitespace-nowrap"
      >
        {loop.map((item, i) => (
          <span key={i} className="font-display text-3xl italic md:text-5xl">
            &nbsp;&nbsp;{item}&nbsp;&nbsp;<span className="not-italic">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────── Featured ─────────────────────── */

function FeaturedSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto mb-12 max-w-[1700px] px-5 sm:px-8">
        <Reveal className="flex items-end justify-between gap-6 border-b hairline pb-6">
          <div>
            <p className="eyebrow text-muted-foreground">(I) Featured Work</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">
              Three things, <em className="italic">in order.</em>
            </h2>
          </div>
          <Link to="/writing" className="nav-link hidden md:inline opacity-70 hover:opacity-100">
            All work →
          </Link>
        </Reveal>
      </div>
      <FloatingImageList items={featured} />
    </section>
  );
}

/* ─────────────────────── Manifesto ────────────────────── */

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-40 sm:px-8">
      <Reveal className="mb-10">
        <p className="eyebrow text-muted-foreground">(II) A note before reading</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[7vw] leading-[1.04] tracking-[-0.025em] text-balance sm:text-[3.6vw]">
          I am not building <em className="italic">AI</em>. I am not selling chips. I am
          thinking <em className="italic">with</em> the machines, against them, around
          them — from a small island that has always read the world more carefully than
          the world has read it.
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground">
          — Fazal Ali, on opening the new site, 2026.
        </p>
      </Reveal>
    </section>
  );
}

/* ─────────────────────── Portrait ─────────────────────── */
/* The writer is the hero: portrait centered, text wraps magazine-style. */

function Portrait() {
  return (
    <section className="section-dark relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-8">
        <Reveal className="mb-16 border-b border-current/20 pb-6">
          <p className="eyebrow opacity-60">(III) On the writer</p>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Top-left: short paragraph */}
          <Reveal className="col-span-12 md:col-span-3">
            <p className="text-sm leading-relaxed text-background/65">
              Cambridge-trained. Mentored by Amartya Sen, Lord Martin Rees, and Sir
              Leszek Borysiewicz. For twenty years the work stayed inside lecture
              rooms.
            </p>
          </Reveal>

          {/* Top-right: credentials */}
          <Reveal delay={0.05} className="col-span-12 text-right md:col-span-3 md:col-start-10">
            <p className="eyebrow opacity-60">Trinidad, b. 1974</p>
            <p className="mt-3 text-sm leading-relaxed text-background/65">
              Writer · Scholar · Founder of <em className="italic">Omeros AI</em>
            </p>
          </Reveal>

          {/* Center: the portrait — held large, in color */}
          <Reveal delay={0.1} className="col-span-12 md:col-span-6 md:col-start-4 md:row-start-2">
            <div className="grain relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden">
              <img
                src={portrait}
                alt="Dr. Fazal Ibrahim Ali"
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
                width={1024}
                height={1344}
              />
              <Grain />
            </div>
          </Reveal>

          {/* Bottom-left: longer bio */}
          <Reveal delay={0.15} className="col-span-12 md:col-span-3 md:row-start-3">
            <h3 className="font-display text-3xl leading-[1.02] md:text-4xl">
              My name is <em className="italic">Fazal Ali</em>.
            </h3>
            <p className="mt-6 text-sm leading-relaxed text-background/65">
              This site is the first time I have stepped out from behind the lectern
              — the books, the ideas, the art, and a contribution from Trinidad to a
              conversation usually written elsewhere.
            </p>
            <div className="mt-8">
              <CirclePill to="/about" label="More about me" invert />
            </div>
          </Reveal>

          {/* Bottom-right: pull-quote */}
          <Reveal delay={0.2} className="col-span-12 md:col-span-3 md:col-start-10 md:row-start-3">
            <p className="font-display text-2xl italic leading-[1.2] text-background/80 md:text-3xl">
              &ldquo;I have grown braver. A little more adventurous.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Range ──────────────────────── */

const range = [
  { n: "01", title: "Critical Theory in AI", body: "Frontier models read as social substrate — not products, not miracles." },
  { n: "02", title: "Education for Liberty", body: "What a child needs to learn so the next machine is a freedom, not a fence." },
  { n: "03", title: "Omeros AI", body: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea." },
  { n: "04", title: "From the West Indies", body: "A contribution from Trinidad to a conversation rarely written from here." },
];

const rangeImages = [practiceEssays, practiceBook, practiceOmeros, featuredWriting];

function Range() {
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-32 sm:px-8">
      <Reveal className="mb-16 max-w-3xl">
        <p className="eyebrow text-muted-foreground">(IV) Range</p>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
          Four threads, <em className="italic">one practice.</em>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-4">
        {range.map((r, i) => (
          <Reveal key={r.n} delay={i * 0.05}>
            <div className="group relative flex h-full min-h-[360px] cursor-default flex-col justify-between gap-10 overflow-hidden bg-background p-8">
              <img
                src={rangeImages[i]}
                alt=""
                className="card-image absolute inset-0 size-full object-cover opacity-0 grayscale transition-all duration-700 ease-out group-hover:opacity-30 group-hover:grayscale-0"
                loading="lazy"
              />
              <span className="nav-link relative opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                ({r.n})
              </span>
              <div className="relative">
                <h4 className="font-display text-3xl leading-[1.05] transition-transform duration-700 group-hover:-translate-y-2 md:text-4xl">
                  {r.title}<span className="italic">.</span>
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                  {r.body}
                </p>
              </div>
            </div>
          </Reveal>
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
    <section className="mx-auto max-w-[1700px] px-5 py-40 sm:px-8">
      <Reveal className="mb-12 flex items-end justify-between gap-6 border-b hairline pb-6">
        <div>
          <p className="eyebrow text-muted-foreground">(V) From the Journal</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">
            Recent pieces<span className="italic">.</span>
          </h2>
        </div>
        <Link to="/writing" className="nav-link">All essays →</Link>
      </Reveal>

      <div className="divide-y hairline">
        {latest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <HoverImage src={writingImages[i % writingImages.length]} alt={a.title}>
              <Link
                to="/writing/$slug"
                params={{ slug: a.slug }}
                className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-12"
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
