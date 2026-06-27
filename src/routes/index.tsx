import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { BookOpen, Sparkles, PenLine, Compass, ArrowUpRight } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import { WordScrollReveal } from "@/components/site/WordScrollReveal";


import { HoverImage } from "@/components/site/HoverImage";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { BookSection } from "@/components/site/BookSection";

import { Newsletter } from "@/components/site/Newsletter";
import { articles } from "@/content/articles";
import portrait from "@/assets/fazal-cutout.png";
const heroImage = "/hero-beach.jpg";
const heroVideo = "/hero-loop.mp4";
import fiaLogo from "@/assets/brand-omeros-lockup-transparent.png";
import featuredEducation from "@/assets/featured-education.jpg";
import featuredOmeros from "@/assets/featured-omeros.jpg";
import featuredWriting from "@/assets/featured-writing.jpg";
import practiceEssays from "@/assets/practice-essays.jpg";
import practiceBook from "@/assets/practice-book.jpg";
import practiceOmeros from "@/assets/practice-omeros.jpg";
import practiceWestIndies from "@/assets/practice-westindies.jpg";
import heroDesk from "@/assets/hero-desk.jpg";

function formatArticleDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fazal Ali — Writer, Scholar, Founder of Omeros AI" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali — a Cambridge-trained, Trinidad-born writer on critical theory in AI, founder of Omeros AI, and author of Education for Liberty.",
      },
      { property: "og:title", content: "Fazal Ali — Writer, Scholar, Founder of Omeros AI" },
      {
        property: "og:description",
        content:
          "Critical theory in AI, from the West Indies. The Omeros AI identity and the book Education for Liberty.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-background">
        <Quietline />
        <CoreStatement />
        <IdeasAndThemes />
        <FeaturedSticky />
        <Manifesto />

        {/* Fixed-background photographic break — image stays anchored while content scrolls */}
        <section
          aria-label="A quiet desk"
          className="relative h-[70vh] w-full overflow-hidden sm:h-[85vh]"
          style={{
            backgroundImage: `url(${heroDesk})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
          <div className="text-on-image relative flex h-full w-full items-end p-6 sm:p-12">
            <div className="max-w-xl">
              <p className="eyebrow opacity-85">A quiet desk</p>
              <h3 className="mt-3 font-display text-3xl leading-[1.04] sm:text-5xl">
                Slow reading, <em className="italic text-accent">long sentences.</em>
              </h3>
            </div>
          </div>
        </section>

        <Portrait />
        <BookSection />
        <Range />
        <LatestWriting />
        
        <Newsletter />
      </div>
    </>
  );
}

/* ─────────────────── Core Statement ─────────────────── */

function CoreStatement() {
  return (
    <section className="border-b hairline bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <BlurReveal as="p" className="eyebrow text-muted-foreground">
          A core statement
        </BlurReveal>
        <BlurReveal
          as="h2"
          delay={0.08}
          className="mt-6 font-display text-[8vw] leading-[1.02] tracking-[-0.025em] text-balance sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The ethics of AI must be the preserve of{" "}
          <em className="italic text-accent">all cultures and continents.</em>
        </BlurReveal>
        <div className="mt-10 grid max-w-4xl gap-6 text-base leading-relaxed text-foreground/75 md:text-lg">
          <BlurReveal as="p" delay={0.16}>
            Every agency, company, institution and country designing,
            developing and deploying AI architectures has an obligation to
            incorporate a more geographically, culturally and socially diverse
            array of perspectives.
          </BlurReveal>
          <BlurReveal as="p" delay={0.22}>
            Only then do we begin to achieve algorithmic fairness, epistemic
            justice, and the eradication of intergenerational immobility and
            inherited inequality.
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Ideas & Themes ─────────────────── */

const ideas = [
  { title: "Freedom as a Medium", note: "Liberty as the substrate of thought, not a destination.", to: "/writing" as const },
  { title: "Sen in the Islands", note: "The capability approach, read from a small state.", to: "/writing" as const },
  { title: "AI Ethics", note: "A globally distributed obligation, not a Silicon Valley deliverable.", to: "/writing" as const },
  { title: "Algorithmic Fairness", note: "On the geography of training data and the politics of inference.", to: "/writing" as const },
  { title: "Epistemic Justice", note: "Whose knowledge is held to be knowledge in the age of the model.", to: "/writing" as const },
  { title: "Inequality", note: "The data fabric of state enterprises and what it reproduces.", to: "/inequality" as const },
  { title: "Intergenerational Immobility", note: "Inherited inequality, and what the next century owes the last.", to: "/inequality" as const },
  { title: "Education for Liberty", note: "What a child needs to learn so the next machine is a freedom.", to: "/education-for-liberty" as const },
];

function IdeasAndThemes() {
  return (
    <section className="border-b hairline bg-background">
      <div className="mx-auto max-w-[1700px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
          <div>
            <BlurReveal as="p" className="eyebrow text-muted-foreground">
              Ideas &amp; themes
            </BlurReveal>
            <BlurReveal
              as="h2"
              delay={0.08}
              className="mt-3 font-display text-4xl leading-[1] md:text-6xl"
            >
              Areas of <em className="italic text-accent">inquiry.</em>
            </BlurReveal>
          </div>
          <BlurReveal delay={0.16}>
            <Link to="/writing" className="nav-link">
              All entries →
            </Link>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {ideas.map((idea, i) => (
            <SlideIn key={idea.title} from="bottom" delay={i * 0.04}>
              <Link
                to={idea.to}
                className="group flex h-full flex-col justify-between gap-8 bg-background p-7 transition-colors hover:bg-foreground/[0.03] md:p-9"
              >
                <div>
                  <p className="eyebrow text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
                    {idea.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {idea.note}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Read
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Image expands first (0 → 0.5), then text fades in only after full-bleed.
  const width = useTransform(scrollYProgress, [0, 0.5, 1], ["64%", "100%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.5, 1], ["70svh", "100svh", "100svh"]);
  const radius = useTransform(scrollYProgress, [0, 0.5, 1], ["3px", "0px", "0px"]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0.55, 0.7, 1], [0, 1, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0.6, 0.8, 1], ["22px", "0px", "0px"]);
  const logoOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);
  const logoY = useTransform(scrollYProgress, [0.6, 0.8, 1], ["-10px", "0px", "0px"]);

  // Hard gate: keep the text/logo fully hidden (not just transparent) until the
  // image has reached full-bleed. This prevents any flash during SSR/hydration
  // and any rendering inconsistencies from motion values resolving late.
  const [revealed, setRevealed] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setRevealed(v >= 0.5);
  });

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative h-[180svh] w-full bg-background"
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="relative overflow-hidden bg-neutral-900"
        >
          <video
            src={heroVideo}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 size-full object-cover"
          />

          <motion.div
            style={{ opacity: heroOverlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10"
          />
          <motion.div
            style={{ opacity: heroOverlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
          />
          <motion.div style={{ opacity: heroOverlayOpacity }}>
            <Grain />
          </motion.div>

          {/* FIA logo — revealed last in the scroll sequence */}
          <motion.div
            style={{ opacity: logoOpacity, y: logoY, visibility: revealed ? "visible" : "hidden" }}
            initial={{ opacity: 0 }}
            aria-hidden={!revealed}
            className="pointer-events-none absolute inset-x-0 top-6 z-20 hidden justify-center sm:top-10 lg:flex"
          >
            <img
              src={fiaLogo}
              alt="Omeros AI — Fazal Ibrahim Ali"
              className="h-14 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:h-20"
              draggable={false}
            />
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity, y: titleY, visibility: revealed ? "visible" : "hidden" }}
            initial={{ opacity: 0 }}
            aria-hidden={!revealed}
            className="text-on-image absolute inset-0 z-10 flex flex-col justify-between px-6 pt-28 pb-12 text-white sm:px-12 sm:pt-32 sm:pb-16"
          >
            <p className="eyebrow opacity-85">
              Omeros AI · Trinidad &amp; the World
            </p>

            <div>
              <h1 className="font-display text-[12vw] leading-[1.02] tracking-[-0.035em] text-balance sm:text-[9vw] md:text-[7vw] md:leading-[0.96]">
                A writer, schooled in <span className="italic">freedom.</span>
              </h1>

              <p className="mt-5 max-w-md text-[13px] leading-relaxed opacity-90 sm:mt-6 sm:text-sm md:text-base">
                Dr. Fazal Ibrahim Ali — Cambridge-trained, Trinidad-born.
                Critical theory on artificial intelligence, written from the
                West Indies, for a reader anywhere who suspects the
                conversation has been{" "}
                <em className="italic text-accent">too narrow for too long.</em>
              </p>

              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] opacity-70">
                Scroll to explore
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


/* ───────────────── Quiet editorial divider ──────────────── */

function Quietline() {
  return (
    <section className="border-y hairline bg-background">
      <div className="mx-auto grid max-w-[1700px] grid-cols-1 items-center gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8 sm:py-6">
        <BlurReveal as="span" className="eyebrow text-muted-foreground">
          Est. Trinidad, 1974
        </BlurReveal>
        <BlurReveal delay={0.1} className="text-center font-display text-xl italic md:text-2xl">
          This is the next world.
        </BlurReveal>
        <BlurReveal as="span" delay={0.2} className="eyebrow text-right text-muted-foreground">
          Issue 01 / Folio I
        </BlurReveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Featured — Omeros AI (single focus, scroll-driven) ─────────────────────── */

function FeaturedSticky() {
  return (
    <section
      data-nav="dark"
      className="section-invert relative bg-background"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:py-32">
        {/* Left: text */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 lg:self-start">
          <BlurReveal as="div" className="flex items-center gap-2 text-white/70">
            <Sparkles className="size-4" />
            <span className="eyebrow">Featured — Identity</span>
          </BlurReveal>

          <BlurReveal
            as="h2"
            delay={0.08}
            className="mt-6 font-display text-[18vw] leading-[0.9] tracking-[-0.04em] text-white sm:text-[12vw] lg:text-[8vw]"
          >
            Omeros<span className="italic text-white/80">.</span>
          </BlurReveal>

          <BlurReveal as="p" delay={0.14} className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            The Greek name for Homer — poet of the sea, of journeys, of voices
            passed down. <em className="italic">Omeros</em> is the name Fazal Ali
            gives to a Caribbean initiative in artificial intelligence: a
            prophet provocateur for the West Indies, convening the world's
            frontier labs and building regional capacity toward a strategic AI
            hub by 2030.
          </BlurReveal>

          <BlurReveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/omeros-ai"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium tracking-wide text-black transition-all hover:bg-white/90"
            >
              Enter Omeros
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/omeros-ai"
              className="nav-link text-[11px] text-white/70 underline-offset-[6px] hover:text-white hover:underline"
            >
              Read the six principles
            </Link>
          </BlurReveal>
        </div>

        {/* Right: image */}
        <SlideIn from="right" className="lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <img
              src={featuredOmeros}
              alt="Omeros AI — a Caribbean reading of intelligence"
              className="size-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-on-image">
              <span className="nav-link text-[10px] text-white/80">Ongoing · Trinidad</span>
              <span className="nav-link text-[10px] text-white/60">01 / 01</span>
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}








/* ─────────────────────── Manifesto (word-by-word scroll reveal) ────────────────────── */

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1400px] bg-background px-5 py-8 sm:px-8 md:py-12">
      <BlurReveal as="p" className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground">
        <Compass className="size-4" /> A note before reading
      </BlurReveal>
      <WordScrollReveal
        className="font-display text-[8vw] leading-[1.04] tracking-[-0.025em] text-balance sm:text-[5vw] sm:leading-[1.08] md:text-[3.4vw]"
        text="I am not building AI. I am not selling chips. I am thinking with the machines, against them, around them — from a small island that has always read the world more carefully than the world has read it."
      />
      <BlurReveal as="p" delay={0.1} className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        — Fazal Ali, on opening the new site, 2026.
      </BlurReveal>
    </section>

  );
}

/* ─────────────────────── Portrait ─────────────────────── */

function Portrait() {
  const navigateRoot = useNavigate();
  return (
    <section

      data-nav="dark"
      className="section-invert relative overflow-hidden py-10 md:py-14"
    >
      <Grain />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8">
        {/* Top meta bar */}
        <div
          className="mb-10 flex items-center justify-between border-b pb-4"
          style={{ borderColor: "rgba(246,244,239,0.2)" }}
        >
          <BlurReveal as="p" className="eyebrow">
            <span style={{ color: "rgba(246,244,239,0.65)" }}>The writer</span>
          </BlurReveal>
          <BlurReveal as="p" delay={0.1} className="eyebrow">
            <span style={{ color: "rgba(246,244,239,0.65)" }}>Trinidad · b. 1974</span>
          </BlurReveal>
        </div>

        {/* Hero composition: huge name behind, cutout center, flanking text */}
        <div className="relative">
          {/* Massive wordmark behind */}
          <BlurReveal
            as="div"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 -translate-y-[18%] select-none text-center md:-translate-y-[22%]"
            y={20}
          >
            <h2
              className="font-display font-medium leading-[0.82] tracking-[-0.05em]"
              style={{
                color: "rgba(255,255,255,0.22)",
                fontSize: "clamp(96px, 22vw, 360px)",
                whiteSpace: "nowrap",
              }}
            >
              FAZAL ALI
            </h2>

          </BlurReveal>

          {/* 3-column row with flanking text and centered cutout */}
          <div className="relative z-10 grid grid-cols-12 items-center gap-6 md:gap-10">
            {/* Left text */}
            <div className="order-2 col-span-6 md:order-1 md:col-span-3">
              <BlurReveal delay={0.1} className="space-y-4 text-left">
                <p
                  className="eyebrow"
                  style={{ color: "rgba(246,244,239,0.55)" }}
                >
                  Origin
                </p>
                <p
                  className="font-display text-lg italic leading-snug md:text-xl"
                  style={{ color: "rgba(246,244,239,0.9)" }}
                >
                  Born in Trinidad. Read at Cambridge. Mentored by Sen, Rees and
                  Borysiewicz.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(246,244,239,0.6)" }}
                >
                  Twenty years of work that lived inside lecture rooms — now
                  stepping out from behind the lectern.
                </p>
              </BlurReveal>
            </div>

            {/* Cutout — centered hero with hold-to-open */}
            <SlideIn
              from="bottom"
              className="order-1 col-span-12 md:order-2 md:col-span-6"
            >
              <HoverImage
                src={portrait}
                alt="Dr. Fazal Ibrahim Ali"
                imageless
                holdMs={6000}
                onHoldComplete={() => navigateRoot({ to: "/about" })}
              >
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[460px] cursor-pointer">
                  <img
                    src={portrait}
                    alt="Dr. Fazal Ibrahim Ali"
                    className="absolute inset-0 size-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                    loading="lazy"
                    width={1024}
                    height={1365}
                  />
                </div>
              </HoverImage>
            </SlideIn>


            {/* Right text */}
            <div className="order-3 col-span-6 md:col-span-3">
              <BlurReveal delay={0.18} className="space-y-4 text-right">
                <p
                  className="eyebrow"
                  style={{ color: "rgba(246,244,239,0.55)" }}
                >
                  Today
                </p>
                <p
                  className="font-display text-lg italic leading-snug md:text-xl"
                  style={{ color: "rgba(246,244,239,0.9)" }}
                >
                  Writer · Scholar · Founder of{" "}
                  <span className="not-italic">Omeros AI</span>.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(246,244,239,0.6)" }}
                >
                  A Caribbean reading of intelligence — and a contribution from
                  Trinidad to a conversation usually written elsewhere.
                </p>
              </BlurReveal>
            </div>
          </div>
        </div>

        {/* Quote row */}
        <BlurReveal
          delay={0.22}
          className="mx-auto mt-14 max-w-3xl text-center font-display text-2xl italic leading-[1.25] md:mt-20 md:text-4xl"
        >
          <span style={{ color: "rgba(246,244,239,0.95)" }}>
            &ldquo;I have grown braver. A little more adventurous.&rdquo;
          </span>
        </BlurReveal>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t pt-5"
          style={{ borderColor: "rgba(246,244,239,0.2)" }}
        >
          <p className="eyebrow" style={{ color: "rgba(246,244,239,0.55)" }}>
            Cambridge · Trinidad · 2026
          </p>
          <CirclePill to="/about" label="More about me" invert />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Range ──────────────────────── */

const range = [
  { n: "01", title: "Critical Theory in AI", body: "Frontier models read as social substrate — not products, not miracles.", icon: Sparkles, tag: "Theory", to: "/writing" as const },
  { n: "02", title: "Education for Liberty", body: "What a child needs to learn so the next machine is a freedom, not a fence.", icon: BookOpen, tag: "Book", to: "/education-for-liberty" as const },
  { n: "03", title: "Omeros AI", body: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea.", icon: Compass, tag: "Studio", to: "/omeros-ai" as const },
  { n: "04", title: "From the West Indies", body: "A contribution from Trinidad to a conversation rarely written from here.", icon: PenLine, tag: "Journal", to: "/writing" as const },
];


const rangeImages = [practiceEssays, practiceBook, practiceOmeros, practiceWestIndies];

function Range() {
  const navigate = useNavigate();

  return (
    <section data-nav="dark" className="section-invert relative px-5 py-10 sm:px-8 md:py-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
          <div className="max-w-3xl">
            <BlurReveal as="p" className="eyebrow text-muted-foreground">Range</BlurReveal>
            <BlurReveal as="h2" delay={0.08} className="mt-3 font-display text-[12vw] leading-[1.02] sm:text-5xl md:text-7xl">
              Four threads, <em className="italic text-accent">one practice.</em>
            </BlurReveal>
          </div>
          <BlurReveal delay={0.16} className="eyebrow text-muted-foreground">
            Selected · 2024 — 2026
          </BlurReveal>
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          {range.map((r, i) => (
            <ZigzagRow
              key={r.n}
              r={r}
              image={rangeImages[i]}
              reverse={i % 2 === 1}
              onOpen={() => navigate({ to: r.to })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ZigzagRow({
  r,
  image,
  reverse,
  onOpen,
}: {
  r: (typeof range)[number];
  image: string;
  reverse: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={`grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-12 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image — sticky, stays pinned while content scrolls past */}
      <div className={`md:col-span-7 ${reverse ? "md:col-start-6" : ""}`}>
        <div className="md:sticky md:top-24">
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open ${r.title}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden bg-foreground/5 md:aspect-[5/4]"
          >
            <img
              src={image}
              alt={r.title}
              className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              loading="lazy"
            />
            <Grain />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <span
              aria-hidden
              className={`pointer-events-none absolute top-4 font-display text-[80px] leading-none text-white/85 sm:text-[120px] md:text-[160px] ${
                reverse ? "right-4 md:right-8" : "left-4 md:left-8"
              }`}
            >
              {r.n}
            </span>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white md:p-5">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                <r.icon className="size-4" />
              </span>
              <span className="nav-link rounded-full bg-black/45 px-3 py-1.5 backdrop-blur-md">
                {r.tag}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Text — scrolls past the pinned image */}
      <div
        className={`md:col-span-5 md:min-h-[50vh] md:py-4 ${
          reverse ? "md:col-start-1 md:row-start-1" : ""
        }`}
      >
        <BlurReveal>
          <p className="eyebrow text-muted-foreground">Thread {r.n}</p>
          <h3 className="mt-3 font-display text-4xl leading-[1.02] md:text-6xl">
            {r.title}<span className="italic">.</span>
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            {r.body}
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="group mt-6 inline-flex items-center gap-2 text-sm"
          >
            Read the thread
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </BlurReveal>
      </div>
    </div>
  );
}

/* ─────────────────────── Writing ──────────────────────── */

const writingImages = [featuredWriting, practiceEssays, featuredOmeros];

function LatestWriting() {
  const latest = articles.slice(0, 3);
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-[1700px] scroll-mt-24 bg-background px-5 py-10 sm:px-8 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b hairline pb-5">
        <div>
          <BlurReveal as="p" className="eyebrow text-muted-foreground">From the Journal</BlurReveal>
          <BlurReveal as="h2" delay={0.08} className="mt-3 font-display text-[11vw] leading-[1] sm:text-5xl md:text-6xl">
            Recent pieces<span className="italic">.</span>
          </BlurReveal>
        </div>
        <BlurReveal delay={0.16}>
          <Link to="/writing" className="nav-link">All entries →</Link>
        </BlurReveal>
      </div>

      <div className="divide-y hairline overflow-visible">
        {latest.map((a, i) => (
          <div key={a.slug} className="overflow-visible">
            <SlideIn delay={i * 0.06} from="bottom" className="overflow-visible">
              <HoverImage
                src={writingImages[i % writingImages.length]}
                alt={a.title}
                holdMs={6000}
                onHoldComplete={() =>
                  navigate({ to: "/writing/$slug", params: { slug: a.slug } })
                }
              >
                <Link
                  to="/writing/$slug"
                  params={{ slug: a.slug }}
                  className="group grid grid-cols-1 gap-3 py-6 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-12 md:py-8"
                >
                  <span className="eyebrow text-muted-foreground">
                    {formatArticleDate(a.date)}
                  </span>
                  <h3 className="font-display text-[7vw] leading-[1.05] transition-transform duration-700 group-hover:translate-x-3 sm:text-3xl md:text-5xl">
                    {a.title}
                  </h3>
                  <span className="nav-link text-muted-foreground transition-colors group-hover:text-foreground">
                    {a.topic} →
                  </span>
                </Link>
              </HoverImage>
            </SlideIn>
          </div>
        ))}
      </div>
    </section>
  );
}

