import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import { ParallaxImage } from "@/components/site/ParallaxImage";
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
      <ParallaxBreak />
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
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground text-background"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[10%] h-[120%]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/80" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-20 sm:px-10 sm:pb-28"
      >
        <h1 className="font-display text-[13vw] leading-[0.92] tracking-[-0.035em] sm:text-[10vw] md:text-[8vw]">
          <Word delay={0.1}>Reading the</Word>{" "}
          <Word delay={0.22} italic>machines</Word>
          <br />
          <Word delay={0.36}>slowly,</Word>{" "}
          <Word delay={0.48} italic>by hand.</Word>
        </h1>
      </motion.div>

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
      <div className="mx-auto grid max-w-[1700px] grid-cols-1 items-center gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8">
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

/* ─────────────────────── Featured ─────────────────────── */

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
    <section className="relative py-20 md:py-28">
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

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <SlideIn from="left" className="col-span-12 lg:col-span-7">
            <FeatureCard item={hero} large />
          </SlideIn>

          <div className="col-span-12 flex flex-col gap-6 md:gap-10 lg:col-span-5">
            {rest.map((item, i) => (
              <SlideIn key={item.title} from="right" delay={0.1 + i * 0.1}>
                <FeatureCard item={item} />
              </SlideIn>
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
          className="card-image absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
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

/* ─────────────────── Parallax Break (fixed image band) ─────────────────── */

function ParallaxBreak() {
  return (
    <section className="relative h-[60svh] min-h-[420px] w-full overflow-hidden">
      <ParallaxImage src={featuredWriting} alt="" className="absolute inset-0" strength={22} />
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-background">
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

/* ─────────────────────── Manifesto ────────────────────── */

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:py-32">
      <BlurReveal as="p" className="eyebrow mb-8 text-muted-foreground">
        A note before reading
      </BlurReveal>
      <BlurReveal
        as="h2"
        delay={0.08}
        className="font-display text-[7vw] leading-[1.04] tracking-[-0.025em] text-balance sm:text-[3.6vw]"
      >
        I am not building <em className="italic">AI</em>. I am not selling chips. I am
        thinking <em className="italic">with</em> the machines, against them, around
        them — from a small island that has always read the world more carefully than
        the world has read it.
      </BlurReveal>
      <BlurReveal as="p" delay={0.2} className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
        — Fazal Ali, on opening the new site, 2026.
      </BlurReveal>
    </section>
  );
}

/* ─────────────────────── Portrait ─────────────────────── */

function Portrait() {
  return (
    <section className="section-dark relative overflow-hidden py-20 md:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="mb-10 flex items-center justify-between border-b border-current/20 pb-5">
          <BlurReveal as="p" className="eyebrow opacity-60">On the writer</BlurReveal>
          <BlurReveal as="p" delay={0.1} className="eyebrow opacity-60">Trinidad · b. 1974</BlurReveal>
        </div>

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

          <div className="col-span-12 flex flex-col justify-between gap-6 md:col-span-7">
            <BlurReveal as="h3" className="font-display text-4xl leading-[1.02] tracking-[-0.02em] md:text-6xl">
              My name is <em className="italic">Fazal Ali</em>.
            </BlurReveal>

            <BlurReveal delay={0.1} className="max-w-xl text-base leading-relaxed text-background/75 md:text-lg">
              Cambridge-trained, mentored by Amartya Sen, Lord Martin Rees and Sir
              Leszek Borysiewicz. For twenty years the work stayed inside lecture
              rooms. This site is the first time I have stepped out from behind the
              lectern — the books, the ideas, the art, and a contribution from
              Trinidad to a conversation usually written elsewhere.
            </BlurReveal>

            <BlurReveal delay={0.18} className="font-display text-2xl italic leading-[1.2] text-background/85 md:text-3xl">
              &ldquo;I have grown braver. A little more adventurous.&rdquo;
            </BlurReveal>

            <SlideIn delay={0.24} className="flex flex-wrap items-center justify-between gap-6 pt-2">
              <p className="eyebrow opacity-55">
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
  { n: "01", title: "Critical Theory in AI", body: "Frontier models read as social substrate — not products, not miracles." },
  { n: "02", title: "Education for Liberty", body: "What a child needs to learn so the next machine is a freedom, not a fence." },
  { n: "03", title: "Omeros AI", body: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea." },
  { n: "04", title: "From the West Indies", body: "A contribution from Trinidad to a conversation rarely written from here." },
];

const rangeImages = [practiceEssays, practiceBook, practiceOmeros, featuredWriting];

function Range() {
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-20 sm:px-8 md:py-28">
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
    <section className="mx-auto max-w-[1700px] px-5 py-20 sm:px-8 md:py-28">
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
