import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { BookOpen, Sparkles, PenLine, Compass, ArrowUpRight } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import { WordScrollReveal } from "@/components/site/WordScrollReveal";


import { HoverImage } from "@/components/site/HoverImage";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { BookSection } from "@/components/site/BookSection";
import { InstagramGrid } from "@/components/site/InstagramGrid";
import { Newsletter } from "@/components/site/Newsletter";
import { articles } from "@/content/articles";
import portrait from "@/assets/fazal-cutout.png";
import heroImage from "@/assets/hero-statue.jpg";
import fiaLogo from "@/assets/brand-fia.png";
import featuredEducation from "@/assets/featured-education.jpg";
import featuredOmeros from "@/assets/featured-omeros.jpg";
import featuredWriting from "@/assets/featured-writing.jpg";
import practiceEssays from "@/assets/practice-essays.jpg";
import practiceBook from "@/assets/practice-book.jpg";
import practiceOmeros from "@/assets/practice-omeros.jpg";
import heroDesk from "@/assets/hero-desk.jpg";

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
                Slow reading, <em className="italic">long sentences.</em>
              </h3>
            </div>
          </div>
        </section>

        <Portrait />
        <BookSection />
        <Range />
        <LatestWriting />
        <InstagramGrid limit={10} />
        <Newsletter />
      </div>
    </>
  );
}


/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cinematic reveal — strictly sequential, no overlap, no blur:
  // 0    → 0.40 : image frame expands from inset to full bleed (nothing else visible).
  // 0.50 → 0.68 : hero text reveals (opacity + subtle lift, no blur).
  // 0.70 → 0.86 : FIA logo reveals at top.
  const width = useTransform(scrollYProgress, [0, 0.4], ["68%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.4], ["74svh", "100svh"]);
  const radius = useTransform(scrollYProgress, [0, 0.4], ["2px", "0px"]);
  const titleOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.5, 0.68], ["20px", "0px"]);
  const logoOpacity = useTransform(scrollYProgress, [0.7, 0.86], [0, 1]);
  const logoY = useTransform(scrollYProgress, [0.7, 0.86], ["-10px", "0px"]);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative h-[180svh] w-full bg-background"
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        <motion.div
          style={reduce ? undefined : { width, height, borderRadius: radius }}
          className="relative overflow-hidden bg-neutral-900"
        >
          {/* Fixed image — does NOT scale or move with scroll */}
          <img
            src={heroImage}
            alt="A classical marble bust in warm museum light — symbolizing critical theory and humanist reading of AI"
            className="absolute inset-0 size-full object-cover"
            width={1920}
            height={1280}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          <Grain />

          {/* FIA logo — revealed last in the scroll sequence */}
          <motion.div
            style={reduce ? undefined : { opacity: logoOpacity, y: logoY }}
            initial={reduce ? undefined : { opacity: 0 }}
            className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center sm:top-10"
          >
            <img
              src={fiaLogo}
              alt="FIA — Fazal Ibrahim Ali"
              className="h-12 w-auto brightness-0 invert sm:h-16"
              draggable={false}
            />
          </motion.div>

          <motion.div
            style={reduce ? undefined : { opacity: titleOpacity, y: titleY }}
            initial={reduce ? undefined : { opacity: 0 }}
            className="text-on-image absolute inset-0 z-10 flex flex-col justify-between px-6 pt-28 pb-12 sm:px-12 sm:pt-32 sm:pb-16"
          >
            <p className="eyebrow opacity-85">
              Folio I · Trinidad &amp; the Machines
            </p>

            <div>
              <h1 className="font-display text-[12vw] leading-[1.02] tracking-[-0.035em] text-balance sm:text-[9vw] md:text-[7vw] md:leading-[0.96]">
                Reading the <span className="italic">machines</span> slowly,{" "}
                <span className="italic">by hand.</span>
              </h1>

              <p className="mt-5 max-w-md text-[13px] leading-relaxed opacity-90 sm:mt-6 sm:text-sm md:text-base">
                Dr. Fazal Ibrahim Ali — Cambridge-trained, Trinidad-born. Writing
                on critical theory in AI, the founding of Omeros AI, and a small
                book called <em className="italic">Education for Liberty.</em>
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
    note: "Journal entries on critical theory, AI as social substrate, and the West Indies as a place that reads the world.",
    image: featuredWriting,
    icon: PenLine,
    to: "/writing",
  },
];

function FeaturedSticky() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      // Equal scroll window per slide; clamp p just under 1 to avoid overflow.
      const clamped = Math.min(0.9999, Math.max(0, p));
      const idx = Math.min(featured.length - 1, Math.floor(clamped * featured.length));
      setActive(idx);
    });
  }, [scrollYProgress]);

  // Progress bar scaleY follows scroll (0 → 1)
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      data-nav="dark"
      className="section-invert relative"
      style={{ height: `${featured.length * 110}vh` }}
    >
      <div className="section-invert sticky top-0 flex h-screen flex-col overflow-hidden">

        {/* Mobile-only progress bar at the top */}
        <div className="block h-px w-full bg-foreground/15 lg:hidden">
          <motion.span
            style={{ scaleX: progressScale, transformOrigin: "left" }}
            className="block h-px w-full bg-foreground"
          />
        </div>

        <div className="mx-auto w-full max-w-[1700px] flex-1 px-5 pt-24 pb-6 sm:px-8 sm:pt-28 sm:pb-8 lg:pt-24">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-3">
            <div>
              <BlurReveal as="p" className="eyebrow text-muted-foreground">
                Featured Work
              </BlurReveal>
              <BlurReveal
                as="h2"
                delay={0.08}
                className="mt-2 font-display text-2xl leading-[1] sm:text-3xl md:text-4xl"
              >
                Three things, <em className="italic">in order.</em>
              </BlurReveal>
            </div>
            <span className="nav-link text-muted-foreground">
              {String(active + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid h-[calc(100%-110px)] grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
            {/* Pinned image */}
            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[260px] w-full overflow-hidden bg-foreground/5">
                {featured.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      scale: i === active ? 1 : 1.04,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: i === active ? 2 : 1 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </motion.div>
                ))}
                <Grain />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 text-on-image md:p-6">
                  <span className="nav-link text-[10px]">{featured[active].eyebrow}</span>
                  <span className="nav-link text-[10px] truncate">{featured[active].year}</span>
                </div>
              </div>
            </div>

            {/* Desktop right column — progress + stacked items */}
            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="absolute left-0 top-0 h-full w-px bg-foreground/15">
                <motion.span
                  style={{ scaleY: progressScale, transformOrigin: "top" }}
                  className="absolute inset-0 block w-px bg-foreground"
                />
              </div>

              <ul className="flex h-full flex-col justify-center gap-10 pl-8 pr-2 lg:gap-14">
                {featured.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <motion.li
                      key={item.title}
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      <div className="mb-1 flex items-center gap-3 text-muted-foreground">
                        <item.icon className="size-4 shrink-0" />
                        <span className="nav-link text-[10px]">{item.eyebrow}</span>
                      </div>

                      <motion.h3
                        animate={{
                          fontSize: isActive
                            ? "clamp(1.9rem, 3.2vw, 2.8rem)"
                            : "clamp(1rem, 1.4vw, 1.35rem)",
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display leading-[1.02] tracking-[-0.02em] break-words"
                      >
                        {item.title}<span className="italic">.</span>
                      </motion.h3>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 12 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                          {item.note}
                        </p>
                        <Link
                          to={item.to as never}
                          className="group mt-3 inline-flex items-center gap-2 text-sm"
                          aria-label={`Explore ${item.title}`}
                        >
                          Explore {item.title}
                          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile — only the active item shown beneath the image */}
            <div className="lg:hidden">
              <motion.div
                key={featured[active].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-1 flex items-center gap-3 text-muted-foreground">
                  {(() => {
                    const Icon = featured[active].icon;
                    return <Icon className="size-4 shrink-0" />;
                  })()}
                  <span className="nav-link text-[10px]">{featured[active].eyebrow}</span>
                </div>
                <h3 className="font-display text-3xl leading-[1.02] tracking-[-0.02em]">
                  {featured[active].title}<span className="italic">.</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {featured[active].note}
                </p>
                <Link
                  to={featured[active].to as never}
                  className="group mt-3 inline-flex items-center gap-2 text-sm"
                  aria-label={`Explore ${featured[active].title}`}
                >
                  Explore {featured[active].title}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
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


const rangeImages = [practiceEssays, practiceBook, practiceOmeros, featuredWriting];

function Range() {
  const navigate = useNavigate();

  return (
    <section data-nav="dark" className="section-invert relative px-5 py-10 sm:px-8 md:py-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
          <div className="max-w-3xl">
            <BlurReveal as="p" className="eyebrow text-muted-foreground">Range</BlurReveal>
            <BlurReveal as="h2" delay={0.08} className="mt-3 font-display text-[12vw] leading-[1.02] sm:text-5xl md:text-7xl">
              Four threads, <em className="italic">one practice.</em>
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
                    {new Date(a.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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

