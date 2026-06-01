import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { HoverImage } from "@/components/site/HoverImage";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { articles } from "@/content/articles";
import portrait from "@/assets/fazal-portrait.jpg";
import heroImage from "@/assets/hero-desk.jpg";
import heroVideo from "@/assets/hero-loop.mp4.asset.json";
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground text-background"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[8%] h-[116%]">
        <video
          src={heroVideo.url}
          poster={heroImage}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="size-full object-cover"
        />
        <Grain />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/75" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-5 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-32"
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow opacity-80">Vol. 01 — Trinidad &amp; the Machines</span>
          <span className="eyebrow hidden opacity-60 md:inline">MMXXVI</span>
        </div>

        <h1 className="font-display text-[13vw] leading-[0.92] tracking-[-0.035em] sm:text-[10vw] md:text-[8vw]">
          <Word delay={0.1}>Reading the</Word>{" "}
          <Word delay={0.22} italic>machines</Word>
          <br />
          <Word delay={0.36}>slowly,</Word>{" "}
          <Word delay={0.48} italic>by hand.</Word>
        </h1>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em]"
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

/* ───────────────── Quiet editorial divider ──────────────── */
/* Replaces the noisy marquee. A still, premium rule with a
   centered editorial line. */

function Quietline() {
  return (
    <section className="border-y hairline bg-background">
      <div className="mx-auto grid max-w-[1700px] grid-cols-1 items-center gap-6 px-5 py-10 sm:grid-cols-3 sm:px-8">
        <span className="eyebrow text-muted-foreground">Est. Trinidad, 1974</span>
        <p className="text-center font-display text-xl italic md:text-2xl">
          A small island, a long sentence, a slow machine.
        </p>
        <span className="eyebrow text-right text-muted-foreground">
          Issue 01 / Folio I
        </span>
      </div>
    </section>
  );
}

/* ─────────────────────── Featured ─────────────────────── */
/* Asymmetric editorial layout — one large hero piece on the left,
   two stacked secondary pieces on the right. Distinct from the
   Latest Writing row list below. */

const featured = [
  {
    eyebrow: "(I) The Book",
    title: "Education for Liberty",
    year: "2026",
    note: "A small book about what a child needs to learn so the next machine becomes a freedom, not a fence.",
    image: featuredEducation,
    to: "/education-for-liberty",
  },
  {
    eyebrow: "(II) The Identity",
    title: "Omeros AI",
    year: "Ongoing",
    note: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea.",
    image: featuredOmeros,
    to: "/omeros-ai",
  },
  {
    eyebrow: "(III) The Journal",
    title: "Selected Writing",
    year: "2024 — 2026",
    note: "Essays on critical theory, AI as social substrate, and the West Indies as a place that reads the world.",
    image: featuredWriting,
    to: "/writing",
  },
];

function FeaturedSection() {
  const [hero, ...rest] = featured;
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-6">
          <div>
            <p className="eyebrow text-muted-foreground">Featured Work</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">
              Three things, <em className="italic">in order.</em>
            </h2>
          </div>
          <Link to="/writing" className="nav-link opacity-70 hover:opacity-100">
            All work →
          </Link>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Hero feature — large left */}
          <Reveal className="col-span-12 lg:col-span-7">
            <FeatureCard item={hero} large />
          </Reveal>

          {/* Two stacked right */}
          <div className="col-span-12 flex flex-col gap-6 md:gap-10 lg:col-span-5">
            {rest.map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.08}>
                <FeatureCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  item,
  large = false,
}: {
  item: (typeof featured)[number];
  large?: boolean;
}) {
  return (
    <Link to={item.to as never} className="group block">
      <div
        className={`relative w-full overflow-hidden bg-foreground/5 ${
          large ? "aspect-[5/6] md:aspect-[4/5]" : "aspect-[16/10]"
        }`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="card-image absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <Grain />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-background md:p-7">
          <span className="nav-link">{item.eyebrow}</span>
          <span className="nav-link">{item.year}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <h3
          className={`font-display leading-[0.98] tracking-[-0.02em] ${
            large ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
          }`}
        >
          {item.title}<span className="italic">.</span>
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {item.note}
        </p>
      </div>
    </Link>
  );
}

/* ─────────────────────── Manifesto ────────────────────── */

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-32 sm:px-8 md:py-40">
      <Reveal className="mb-10">
        <p className="eyebrow text-muted-foreground">A note before reading</p>
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
/* Single-screen, compact: portrait left, text right.
   No scrolling required to read the headline + bio + CTA. */

function Portrait() {
  return (
    <section className="section-dark relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal className="mb-10 flex items-center justify-between border-b border-current/20 pb-5">
          <p className="eyebrow opacity-60">On the writer</p>
          <p className="eyebrow opacity-60">Trinidad · b. 1974</p>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <Reveal className="col-span-12 md:col-span-5">
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
          </Reveal>

          <div className="col-span-12 flex flex-col justify-between gap-8 md:col-span-7">
            <Reveal delay={0.05}>
              <h3 className="font-display text-4xl leading-[1.02] tracking-[-0.02em] md:text-6xl">
                My name is <em className="italic">Fazal Ali</em>.
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-background/75 md:text-lg">
                Cambridge-trained, mentored by Amartya Sen, Lord Martin Rees and Sir
                Leszek Borysiewicz. For twenty years the work stayed inside lecture
                rooms. This site is the first time I have stepped out from behind the
                lectern — the books, the ideas, the art, and a contribution from
                Trinidad to a conversation usually written elsewhere.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="font-display text-2xl italic leading-[1.2] text-background/85 md:text-3xl">
                &ldquo;I have grown braver. A little more adventurous.&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.24} className="flex flex-wrap items-center justify-between gap-6 pt-2">
              <p className="eyebrow opacity-55">
                Writer · Scholar · Founder of Omeros AI
              </p>
              <CirclePill to="/about" label="More about me" invert />
            </Reveal>
          </div>
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
    <section className="mx-auto max-w-[1700px] px-5 py-28 sm:px-8 md:py-32">
      <Reveal className="mb-16 max-w-3xl">
        <p className="eyebrow text-muted-foreground">Range</p>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
          Four threads, <em className="italic">one practice.</em>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-px bg-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
        {range.map((r, i) => (
          <Reveal key={r.n} delay={i * 0.05}>
            <div className="group relative flex h-full min-h-[340px] cursor-default flex-col justify-between gap-10 overflow-hidden bg-background p-7 md:p-8">
              <img
                src={rangeImages[i]}
                alt=""
                className="card-image absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-40"
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
    <section className="mx-auto max-w-[1700px] px-5 py-28 sm:px-8 md:py-40">
      <Reveal className="mb-12 flex items-end justify-between gap-6 border-b hairline pb-6">
        <div>
          <p className="eyebrow text-muted-foreground">From the Journal</p>
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
                className="group grid grid-cols-1 gap-4 py-8 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-12 md:py-10"
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
