import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Sparkles, PenLine, Compass, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import { WordScrollReveal } from "@/components/site/WordScrollReveal";

import { HoverImage } from "@/components/site/HoverImage";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { BookSection } from "@/components/site/BookSection";

import { Newsletter } from "@/components/site/Newsletter";
import { articles } from "@/content/articles";
import portraitAsset from "@/assets/fazal-cutout.png.asset.json";
const portrait = assetUrl(portraitAsset);
import heroVideoAsset from "@/assets/hero-loop-web.mp4.asset.json";
import { assetUrl } from "@/lib/asset-url";
const heroImage = "/hero-beach.jpg";
const heroVideo = assetUrl(heroVideoAsset);
import fiaLogo from "@/assets/brand-omeros-lockup-transparent.png";
import featuredEducation from "@/assets/featured-education.jpg";
import featuredOmeros from "@/assets/featured-omeros.jpg";
import featuredWriting from "@/assets/featured-writing.jpg";
import practiceEssays from "@/assets/practice-essays.jpg";
import practiceBook from "@/assets/practice-book.jpg";
import practiceOmeros from "@/assets/practice-omeros.jpg";
import heroDesk from "@/assets/hero-desk.jpg";
import streamResearch from "@/assets/stream-research.jpg";
import streamPublications from "@/assets/stream-publications.jpg";
import streamConversation from "@/assets/stream-conversation.jpg";

function formatArticleDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1, day)));
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fazal Ali, Writer, Scholar, Founder of Omeros AI" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali, a Cambridge-educated, Trinidad-born writer on critical theory in AI, founder of Omeros AI, and author of Education for Liberty.",
      },
      { property: "og:title", content: "Fazal Ali, Writer, Scholar, Founder of Omeros AI" },
      {
        property: "og:description",
        content:
          "Critical theory in AI, from the West Indies. The Omeros AI identity and the book Education for Liberty.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/" }],
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

        {/* Fixed-background photographic break, image stays anchored while content scrolls */}
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
                Slow reading, <em className="text-accent">long sentences.</em>
              </h3>
            </div>
          </div>
        </section>

        <Manifesto />
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
          <em className="text-accent">all cultures and continents.</em>
        </BlurReveal>
        <div className="mt-10 grid max-w-4xl gap-6 text-base leading-relaxed text-foreground/75 md:text-lg">
          <BlurReveal as="p" delay={0.16}>
            Every agency, company, institution and country designing, developing and deploying AI
            architectures has an obligation to incorporate a more geographically, culturally and
            socially diverse array of perspectives.
          </BlurReveal>
          <BlurReveal as="p" delay={0.22}>
            Only then do we begin to achieve fair algorithms, fairness in whose knowledge counts,
            and an end to inequality passed down from one generation to the next.
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Ideas & Themes ─────────────────── */

const ideas = [
  {
    title: "Freedom as a Medium",
    note: "Liberty as the substrate of thought, not a destination.",
    to: "/writing" as const,
  },
  {
    title: "Sen in the Islands",
    note: "The capability approach, read from a small state.",
    to: "/writing" as const,
  },
  {
    title: "AI Ethics",
    note: "A globally distributed obligation, not a Silicon Valley deliverable.",
    to: "/writing" as const,
  },
  {
    title: "Algorithmic Fairness",
    note: "On the geography of training data and the politics of inference.",
    to: "/writing" as const,
  },
  {
    title: "Epistemic Justice",
    note: "Whose knowledge is held to be knowledge in the age of the model.",
    to: "/writing" as const,
  },
  {
    title: "Inequality",
    note: "The data fabric of state enterprises and what it reproduces.",
    to: "/inequality" as const,
  },
  {
    title: "Intergenerational Immobility",
    note: "Inherited inequality, and what the next century owes the last.",
    to: "/inequality" as const,
  },
  {
    title: "Education for Liberty",
    note: "What a child needs to learn so the next machine is a freedom.",
    to: "/education-for-liberty" as const,
  },
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
              Areas of <em className="text-accent">inquiry.</em>
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
                  <p className="eyebrow text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
                    {idea.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{idea.note}</p>
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

  // Hero audio: browsers block unmuted autoplay, so start muted and turn the
  // sound on at the first user gesture. A manual toggle stays available.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const userMutedRef = useRef(false);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    userMutedRef.current = !next;
    v.muted = !next;
    v.volume = 1;
    if (next) void v.play().catch(() => {});
    setSoundOn(next);
  };

  useEffect(() => {
    let done = false;
    const v = videoRef.current;
    if (!v) return;

    // The picture must never stop: keep it playing muted at all times.
    const keepPlaying = () => {
      if (v.paused) void v.play().catch(() => {});
    };

    // Only try sound once the page has real user activation, otherwise the
    // browser rejects it and pauses the video, which is what made it stutter.
    const enable = () => {
      if (done || userMutedRef.current) return;
      const activated =
        typeof navigator !== "undefined" &&
        (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } })
          .userActivation?.hasBeenActive !== false;
      if (!activated) return;
      v.muted = false;
      v.volume = 1;
      keepPlaying();
      window.setTimeout(() => {
        if (v.muted || v.paused) {
          v.muted = true;
          keepPlaying();
        } else {
          done = true;
          setSoundOn(true);
        }
      }, 150);
    };

    keepPlaying();
    enable();
    const mediaEvents = ["loadeddata", "canplay", "stalled", "pause", "waiting"];
    mediaEvents.forEach((e) => v.addEventListener(e, keepPlaying));
    const onVisible = () => keepPlaying();
    document.addEventListener("visibilitychange", onVisible);

    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "click",
      "keydown",
      "touchstart",
      "wheel",
      "scroll",
    ];
    const onFirst = () => {
      keepPlaying();
      enable();
      if (done) events.forEach((e) => window.removeEventListener(e, onFirst, { capture: true }));
    };
    events.forEach((e) =>
      window.addEventListener(e, onFirst, { passive: true, capture: true }),
    );
    return () => {
      mediaEvents.forEach((e) => v.removeEventListener(e, keepPlaying));
      document.removeEventListener("visibilitychange", onVisible);
      events.forEach((e) => window.removeEventListener(e, onFirst, { capture: true }));
    };

  }, []);





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
            ref={videoRef}
            src={heroVideo}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            style={{ backgroundImage: `url(${heroImage})` }}
            className="absolute inset-0 size-full bg-cover bg-center object-cover"
          />

          {/* Sound control — fixed to the viewport bottom-right so it stays put */}
          <button
            type="button"
            onClick={() => toggleSound()}
            aria-label={soundOn ? "Mute hero audio" : "Unmute hero audio"}
            className="fixed bottom-5 right-5 z-[70] inline-flex size-11 items-center justify-center border border-white/25 bg-black/40 text-white backdrop-blur transition-colors duration-300 hover:bg-black/60"
          >
            {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>



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

          {/* FIA logo, revealed last in the scroll sequence */}
          <motion.div
            style={{ opacity: logoOpacity, y: logoY, visibility: revealed ? "visible" : "hidden" }}
            initial={{ opacity: 0 }}
            aria-hidden={!revealed}
            className="pointer-events-none absolute inset-x-0 top-6 z-20 hidden justify-center sm:top-10 lg:flex"
          >
            <img
              src={fiaLogo}
              alt="Omeros AI, Fazal Ibrahim Ali"
              className="h-14 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:h-20"
              draggable={false}
            />
          </motion.div>

          <motion.div
            style={{
              opacity: titleOpacity,
              y: titleY,
              visibility: revealed ? "visible" : "hidden",
            }}
            initial={{ opacity: 0 }}
            aria-hidden={!revealed}
            className="text-on-image absolute inset-0 z-10 flex flex-col justify-between px-6 pt-28 pb-12 text-white sm:px-12 sm:pt-32 sm:pb-16"
          >
            <p className="eyebrow opacity-85">Omeros AI :West Indies &amp; the World</p>

            <div>
              <h1 className="font-display text-[12vw] leading-[1.02] tracking-[-0.035em] text-balance sm:text-[9vw] md:text-[7vw] md:leading-[0.96]">
                A prophet provocateur, schooled in <span className="">freedom.</span>
              </h1>

              <p className="mt-5 max-w-md text-[13px] leading-relaxed opacity-90 sm:mt-6 sm:text-sm md:text-base">
                Dr. Fazal Ibrahim Ali, Cambridge-educated, Trinidad-born. Critical theory on
                artificial intelligence, written from the West Indies, for a reader anywhere who
                suspects the conversation has been{" "}
                <em className="text-accent">too narrow for too long.</em>
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
        <BlurReveal delay={0.1} className="text-center font-display text-xl md:text-2xl">
          This is the next world.
        </BlurReveal>
        <BlurReveal as="span" delay={0.2} className="eyebrow text-right text-muted-foreground">
          Issue 01 / Folio I
        </BlurReveal>
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
        text="Goodness, as rationality, does not attribute any special virtue to the process of deciding. Human thinking is imperfect. The AI frontier opens the possibility to augment each person's Agility Quotient (AQ) to think better. In that ferment lies the possibility of a blossoming of human ideas boosted by AI. The true challenge is therefore to build AI systems that prompt us to think more benevolently than we naturally do."
      />
      <BlurReveal
        as="p"
        delay={0.1}
        className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground"
      >
        , Fazal Ali, on opening the new site, 2026.
      </BlurReveal>
    </section>
  );
}

/* ─────────────────────── Portrait ─────────────────────── */

function Portrait() {
  const navigateRoot = useNavigate();
  return (
    <section data-nav="dark" className="section-invert relative overflow-hidden py-10 md:py-14">
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
                <p className="eyebrow" style={{ color: "rgba(246,244,239,0.55)" }}>
                  Origin
                </p>
                <p
                  className="font-display text-lg leading-snug md:text-xl"
                  style={{ color: "rgba(246,244,239,0.9)" }}
                >
                  Born in Trinidad. Read at Cambridge. Mentored by Sen, Rees and Borysiewicz.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(246,244,239,0.6)" }}>
                  Twenty years of work that lived inside lecture rooms, now stepping out from behind
                  the lectern.
                </p>
              </BlurReveal>
            </div>

            {/* Cutout, centered hero with hold-to-open */}
            <SlideIn from="bottom" className="order-1 col-span-12 md:order-2 md:col-span-6">
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
                <p className="eyebrow" style={{ color: "rgba(246,244,239,0.55)" }}>
                  Today
                </p>
                <p
                  className="font-display text-lg leading-snug md:text-xl"
                  style={{ color: "rgba(246,244,239,0.9)" }}
                >
                  Writer · Scholar · Founder of <span className="not-italic">Omeros AI</span>.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(246,244,239,0.6)" }}>
                  A Caribbean reading of intelligence, and a contribution from Trinidad to a
                  conversation usually written elsewhere.
                </p>
              </BlurReveal>
            </div>
          </div>
        </div>

        {/* Quote row */}
        <BlurReveal
          delay={0.22}
          className="mx-auto mt-14 max-w-3xl text-center font-display text-2xl leading-[1.25] md:mt-20 md:text-4xl"
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

const streams = [
  {
    n: "01",
    title: "Research",
    kicker: "Critical Theory in AI",
    body: "Frontier models read as social substrate, not products, not miracles. Essays, lectures and working notes.",
    icon: Sparkles,
    image: streamResearch,
    to: "/writing" as const,
    cta: "Read the essays",
  },
  {
    n: "02",
    title: "Publications",
    kicker: "Education for Liberty",
    body: "The first title in a sequence of four. Three further volumes are in preparation.",
    icon: BookOpen,
    image: streamPublications,
    to: "/books" as const,
    cta: "See the publications",
  },
  {
    n: "03",
    title: "Conversation",
    kicker: "The Omeros podcast",
    body: "Readings, interviews and arguments, the written work spoken aloud.",
    icon: PenLine,
    image: streamConversation,
    to: "/podcast" as const,
    cta: "Listen",
  },
];

function Range() {
  const [active, setActive] = useState(0);

  return (
    <section
      data-nav="dark"
      className="section-invert relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-28 pt-16 sm:px-8 md:px-12 md:pb-32 md:pt-20"
    >
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        {/* header */}
        <div className="grid gap-6 border-b hairline pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-end md:gap-16">
          <div className="min-w-0">
            <BlurReveal as="p" className="eyebrow text-muted-foreground">
              Omeros, the house, not a project inside it
            </BlurReveal>
            <BlurReveal
              as="h2"
              delay={0.08}
              className="mt-4 font-display text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl"
            >
              One practice, <em className="text-accent">three streams.</em>
            </BlurReveal>
          </div>
          <BlurReveal
            delay={0.14}
            className="text-base leading-relaxed text-muted-foreground md:pb-2"
          >
            One body of work under a single name, research, publishing, and the conversation around
            both.
          </BlurReveal>
        </div>

        {/* expanding panels, desktop */}
        <div className="mt-10 hidden flex-1 gap-3 md:flex md:min-h-[26rem]">
          {streams.map((s, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={s.n}
                onMouseEnter={() => setActive(i)}
                animate={{ flexGrow: isActive ? 2.6 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex-1 basis-0 cursor-default overflow-hidden border hairline"
              >
                <motion.img
                  src={s.image}
                  alt={s.kicker}
                  loading="lazy"
                  animate={{
                    scale: isActive ? 1.02 : 1.12,
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive ? "grayscale(0)" : "grayscale(1)",
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                <div className="relative flex h-full flex-col justify-between p-6 lg:p-8">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-white/70">{s.n}</span>
                    <motion.span
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      className={`eyebrow truncate pl-4 text-white/70 ${isActive ? "" : "pointer-events-none opacity-0"}`}
                    >
                      {s.kicker}
                    </motion.span>
                  </div>

                  <div>
                    {/* title scales in place, baseline never shifts */}
                    <motion.h3
                      initial={false}
                      animate={{ scale: isActive ? 1.95 : 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left bottom" }}
                      className="origin-bottom-left whitespace-nowrap font-display text-2xl leading-[1] text-white lg:text-3xl"
                    >
                      {s.title}
                      <span className="text-accent">.</span>
                    </motion.h3>

                    {/* reserved space so nothing jumps when copy appears */}
                    <div className="h-[8.5rem] overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 12,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={isActive ? "" : "pointer-events-none"}
                      >
                        <p className="max-w-md pt-5 text-[0.95rem] leading-relaxed text-white/75">
                          {s.body}
                        </p>
                        <Link
                          to={s.to}
                          className="mt-5 inline-flex items-center gap-3 border-b border-white/40 pb-1 text-xs uppercase tracking-[0.22em] text-white hover:text-accent"
                        >
                          {s.cta}
                          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* stacked cards, mobile */}
        <div className="mt-8 grid gap-4 md:hidden">
          {streams.map((s) => (
            <div
              key={s.n}
              className="group relative h-56 w-full cursor-default overflow-hidden border hairline"
            >
              <img
                src={s.image}
                alt={s.kicker}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="relative flex h-full flex-col justify-between p-5">
                <span className="eyebrow text-white/70">
                  {s.n}, {s.kicker}
                </span>
                <div>
                  <h3 className="font-display text-3xl leading-[1] text-white">
                    {s.title}
                    <span className="text-accent">.</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{s.body}</p>
                  <Link
                    to={s.to}
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white hover:text-accent"
                  >
                    {s.cta}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
          <BlurReveal as="p" className="eyebrow text-muted-foreground">
            From the Journal
          </BlurReveal>
          <BlurReveal
            as="h2"
            delay={0.08}
            className="mt-3 font-display text-[11vw] leading-[1] sm:text-5xl md:text-6xl"
          >
            Recent pieces<span className="">.</span>
          </BlurReveal>
        </div>
        <BlurReveal delay={0.16}>
          <Link to="/writing" className="nav-link">
            All entries →
          </Link>
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
                onHoldComplete={() => navigate({ to: "/writing/$slug", params: { slug: a.slug } })}
              >
                <Link
                  to="/writing/$slug"
                  params={{ slug: a.slug }}
                  className="group grid grid-cols-1 gap-3 py-6 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-12 md:py-8"
                >
                  <span className="eyebrow text-muted-foreground">{formatArticleDate(a.date)}</span>
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
