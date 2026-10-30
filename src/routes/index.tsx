import { Rich, useCmsEntries, useCmsSaved, useCmsText } from "@/components/site/CmsExtras";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Sparkles, PenLine, Compass, ArrowUpRight, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import { WordScrollReveal } from "@/components/site/WordScrollReveal";

import { HoverImage } from "@/components/site/HoverImage";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { BookSection } from "@/components/site/BookSection";

import { Newsletter } from "@/components/site/Newsletter";
import { articles } from "@/content/articles";
import { getJournal } from "@/lib/cms.functions";
import fazalPortrait from "@/assets/fazal-portrait.jpg";
import heroVideoAsset from "@/assets/hero-loop-web.mp4.asset.json";
import { assetUrl } from "@/lib/asset-url";

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
  loader: () => getJournal(),
  head: () => ({
    meta: [
      { title: "Fazal Ali, Writer, Scholar, Founder of Omeros AI" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali, born in Trinidad and educated at Cambridge, a writer on critical theory in AI, founder of Omeros AI, and author of Education for Liberty.",
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
        <QuietDesk />
        {false && <section
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
        </section>}

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

function QuietDesk() {
  const image = useCmsSaved("home", "deskImage") || heroDesk;
  const eyebrow = useCmsText("home", "deskEyebrow");
  const heading = useCmsText("home", "deskHeading");
  return (
    <section
      aria-label={eyebrow}
      className="relative h-[70vh] w-full overflow-hidden sm:h-[85vh]"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
      <div className="text-on-image relative flex h-full w-full items-end p-6 sm:p-12">
        <div className="max-w-xl">
          <p className="eyebrow opacity-85">{eyebrow}</p>
          <h3 className="mt-3 font-display text-3xl leading-[1.04] sm:text-5xl">
            <Rich text={heading} />
          </h3>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Core Statement ─────────────────── */

function CoreStatement() {
  const eyebrow = useCmsText("home", "coreEyebrow");
  const heading = useCmsText("home", "coreHeading");
  const body = useCmsText("home", "coreBody");
  return (
    <section className="border-b hairline bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <BlurReveal as="p" className="eyebrow text-muted-foreground">
          {eyebrow}
        </BlurReveal>
        <BlurReveal
          as="h2"
          delay={0.08}
          className="mt-6 font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.02] tracking-[-0.025em] text-balance"
        >
          {heading}
        </BlurReveal>
        <div className="mt-10 grid max-w-4xl gap-6 text-base leading-relaxed text-foreground/75 md:text-lg">
          <BlurReveal as="p" delay={0.16}>
            {body}
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Ideas & Themes ─────────────────── */

const ideas = [
  {
    title: "AI Reindustrialisation",
    note: "The global AI hyperscale buildout is not just creating a new computing age; it\u2019s driving the Reindustrialisation of nation-states.",
    to: "/writing" as const,
  },
  {
    title: "Capability deprivation is an unfreedom",
    note: "The capability approach, read from a small state.",
    to: "/writing" as const,
  },
  {
    title: "The Ethics of AI",
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
    title: "Inherited Inequality",
    note: "The data fabric of state enterprises and what it reproduces.",
    to: "/inequality" as const,
  },
  {
    title: "Intergenerational Immobility",
    note: "Inherited inequality, and what the next century owes the last.",
    to: "/inequality" as const,
  },
  {
    title: "Uneven Development",
    note: "On the geographies of growth and the margins it leaves behind.",
    to: "/writing" as const,
  },
];

function IdeasAndThemes() {
  const cmsIdeas = useCmsEntries("home_ideas");
  const ideasEyebrow = useCmsText("home", "ideasEyebrow");
  const ideasHeading = useCmsText("home", "ideasHeading");
  const ideasCta = useCmsText("home", "ideasCta");
  const cardCta = useCmsText("home", "ideasCardCta");
  const displayedIdeas = cmsIdeas.length ? cmsIdeas.map((idea) => ({ title: idea.title, note: idea.body ?? "", to: idea.link_url || "/writing" })) : ideas;
  return (
    <section className="border-b hairline bg-background">
      <div className="mx-auto max-w-[1700px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
          <div>
            <BlurReveal as="p" className="eyebrow text-muted-foreground">
              {ideasEyebrow}
            </BlurReveal>
            <BlurReveal
              as="h2"
              delay={0.08}
              className="mt-3 font-display text-4xl leading-[1] md:text-6xl"
            >
              <Rich text={ideasHeading} />
            </BlurReveal>
          </div>
          <BlurReveal delay={0.16}>
            <Link to="/writing" className="nav-link">
              {ideasCta}
            </Link>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
           {displayedIdeas.map((idea, i) => (
            <SlideIn key={idea.title} from="bottom" delay={i * 0.04}>
               <a
                 href={idea.to}
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
                  {cardCta}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
               </a>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const videoSrc = useCmsSaved("home", "heroVideo") || heroVideo;
  const logoSrc = useCmsSaved("home", "heroLogo") || fiaLogo;
  const hEyebrow = useCmsText("home", "heroEyebrow");
  const hTitle = useCmsText("home", "heroTitle");
  const hIntro = useCmsText("home", "heroIntro");
  const hHint = useCmsText("home", "heroHint");
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
  const [soundControlReady, setSoundControlReady] = useState(false);
  const userMutedRef = useRef(false);

  useEffect(() => {
    setSoundControlReady(true);
  }, []);

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
    const v = videoRef.current;
    if (!v) return;
    let unmounted = false;
    let soundDone = false;

    // Picture first: always keep the muted video rolling. Never fight the
    // browser with repeated play()/muted toggles, that is what made it stutter.
    const keepPlaying = () => {
      if (!unmounted && v.paused) void v.play().catch(() => {});
    };
    keepPlaying();
    v.addEventListener("loadeddata", keepPlaying);
    v.addEventListener("canplay", keepPlaying);
    document.addEventListener("visibilitychange", keepPlaying);

    // Sound: a single attempt, made only once the browser reports a real user
    // activation. One attempt avoids the pause/restart loop entirely.
    const tryUnmute = () => {
      if (soundDone || unmounted || userMutedRef.current) return;
      const activated =
        (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation
          ?.hasBeenActive ?? true;
      if (!activated) return;
      soundDone = true;
      v.muted = false;
      v.volume = 1;
      void Promise.resolve(v.play())
        .then(() => {
          if (v.muted || v.paused) {
            soundDone = false;
            v.muted = true;
            keepPlaying();
          } else {
            setSoundOn(true);
            cleanupGestures();
          }
        })
        .catch(() => {
          soundDone = false;
          v.muted = true;
          keepPlaying();
        });
    };

    const gestures: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "click",
      "keydown",
      "touchstart",
      "wheel",
      "scroll",
    ];
    const onGesture = () => tryUnmute();
    const cleanupGestures = () =>
      gestures.forEach((e) => window.removeEventListener(e, onGesture, { capture: true }));
    gestures.forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true, capture: true }),
    );
    tryUnmute();

    return () => {
      unmounted = true;
      v.removeEventListener("loadeddata", keepPlaying);
      v.removeEventListener("canplay", keepPlaying);
      document.removeEventListener("visibilitychange", keepPlaying);
      cleanupGestures();
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
            src={videoSrc}
            
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 size-full bg-neutral-900 object-cover"
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

          {/* FIA logo, revealed last in the scroll sequence */}
          <motion.div
            style={{ opacity: logoOpacity, y: logoY, visibility: revealed ? "visible" : "hidden" }}
            initial={{ opacity: 0 }}
            aria-hidden={!revealed}
            className="pointer-events-none absolute inset-x-0 top-6 z-20 hidden justify-center sm:top-10 lg:flex"
          >
            <img
              src={logoSrc}
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
            <p className="eyebrow opacity-85">{hEyebrow}</p>

            <div>
              <h1 className="font-display text-[clamp(2.5rem,12vw,6.5rem)] leading-[1.02] tracking-[-0.035em] text-balance md:leading-[0.96]">
                <Rich text={hTitle} />
              </h1>

              <p className="mt-5 max-w-md text-[13px] leading-relaxed opacity-90 sm:mt-6 sm:text-sm md:text-base">
                <Rich text={hIntro} />
              </p>

              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] opacity-70">
                {hHint}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {soundControlReady
        ? createPortal(
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundOn ? "Mute hero audio" : "Unmute hero audio"}
              className="fixed bottom-5 right-5 z-[9999] inline-flex size-11 items-center justify-center border border-white/25 bg-black/40 text-white backdrop-blur transition-colors duration-300 hover:bg-black/60"
            >
              {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>,
            document.body,
          )
        : null}
    </section>
  );
}

/* ───────────────── Quiet editorial divider ──────────────── */

function Quietline() {
  const left = useCmsText("home", "quietLeft");
  const center = useCmsText("home", "quietCenter");
  const right = useCmsText("home", "quietRight");
  return (
    <section className="border-y hairline bg-background">
      <div className="mx-auto grid max-w-[1700px] grid-cols-1 items-center gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8 sm:py-6">
        <BlurReveal as="span" className="eyebrow text-muted-foreground">
          {left}
        </BlurReveal>
        <BlurReveal delay={0.1} className="text-center font-display text-xl md:text-2xl">
          <Rich text={center} />
        </BlurReveal>
        <BlurReveal as="span" delay={0.2} className="eyebrow text-right text-muted-foreground">
          {right}
        </BlurReveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Manifesto (word-by-word scroll reveal) ────────────────────── */

function Manifesto() {
  const eyebrow = useCmsText("home", "noteEyebrow");
  const text = useCmsText("home", "noteText");
  return (
    <section className="mx-auto max-w-[1400px] bg-background px-5 py-8 sm:px-8 md:py-12">
      <BlurReveal as="p" className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground">
        <Compass className="size-4" /> {eyebrow}
      </BlurReveal>
      <WordScrollReveal
        className="font-display text-[8vw] leading-[1.04] tracking-[-0.025em] text-balance sm:text-[5vw] sm:leading-[1.08] md:text-[3.4vw]"
        key={text}
        text={text}
        data-default="Goodness, as rationality, does not attribute any special virtue to the process of deciding. Human thinking is imperfect. The AI frontier opens the possibility to augment each person's Agility Quotient (AQ) to think better. In that ferment lies the possibility of a blossoming of human ideas boosted by AI. The true challenge is therefore to build AI systems that prompt us to think more benevolently than we naturally do."
      />
    </section>
  );
}

/* ─────────────────────── Portrait ─────────────────────── */

function Portrait() {
  const navigateRoot = useNavigate();
  const pImage = useCmsSaved("home", "portraitImage") || fazalPortrait;
  const w1 = useCmsText("home", "portraitWord1");
  const w2 = useCmsText("home", "portraitWord2");
  const plate = useCmsText("home", "portraitNameplate");
  const cta = useCmsText("home", "portraitCta");
  const ctaLink = useCmsText("home", "portraitCtaLink");
  return (
    <section data-nav="dark" className="section-invert relative min-h-[88vh] overflow-hidden">
      <Grain />

      <div className="relative z-10 mx-auto grid min-h-[88vh] w-full max-w-[1500px] grid-cols-1 items-stretch md:grid-cols-2">
        {/* Left: large full-height portrait */}
        <div className="relative order-1 min-h-[60vh] overflow-hidden md:min-h-[88vh]">
          <img
            src={pImage}
            alt="Dr. Fazal Ibrahim Ali"
            className="absolute inset-0 size-full object-cover [filter:grayscale(1)_contrast(1.12)_brightness(0.94)]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#17100b]/80 md:to-[#17100b]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* editorial corner accent ticks */}
          <div className="pointer-events-none absolute left-4 top-4 size-12 border-l border-t border-white/30" />
          <div className="pointer-events-none absolute bottom-4 left-4 size-12 border-b border-l border-white/30" />
        </div>

        {/* Right: wordmark + nameplate + CTA, vertically centered */}
        <div className="relative order-2 flex flex-col justify-center px-6 py-16 md:px-16 md:py-0">
          {/* Stacked wordmark */}
          <BlurReveal
            as="div"
            className="pointer-events-none select-none font-display leading-[1.05] tracking-[-0.05em] text-white/[0.10]"
          >
            <span className="block text-[19vw] md:text-[9vw]">{w1}</span>
            <span className="block text-[19vw] md:text-[9vw]">{w2}</span>
          </BlurReveal>

          {/* Nameplate */}
          <div className="mt-12 flex items-center gap-4">
            <span className="h-px w-12 bg-white/30" />
            <BlurReveal as="p" delay={0.15} className="eyebrow text-white/70">
              {plate}
            </BlurReveal>
          </div>

          {/* CTA */}
          <BlurReveal delay={0.3} className="mt-8">
            <button
              type="button"
              onClick={() => (/^https?:/.test(ctaLink) ? window.open(ctaLink, "_blank") : navigateRoot({ to: ctaLink as "/" }))}
              className="btn-cta btn-on-blue"
            >
              {cta}
              <ArrowRight className="size-3.5" />
            </button>
          </BlurReveal>
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
  const cmsStreams = useCmsEntries("home_streams");
  const sEyebrow = useCmsText("home", "streamsEyebrow");
  const sHeading = useCmsText("home", "streamsHeading");
  const sIntro = useCmsText("home", "streamsIntro");
  const displayedStreams = cmsStreams.length ? cmsStreams.map((stream, i) => ({ n: stream.subtitle ?? String(i + 1).padStart(2, "0"), title: stream.title, kicker: (stream.data as { kicker?: string })?.kicker ?? stream.subtitle ?? "", body: stream.body ?? "", icon: streams[i % streams.length].icon, image: stream.image_url || streams[i % streams.length].image, to: stream.link_url || "/writing", cta: (stream.data as { cta?: string })?.cta ?? "Open" })) : streams;

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
              {sEyebrow}
            </BlurReveal>
            <BlurReveal
              as="h2"
              delay={0.08}
              className="mt-4 font-display text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl"
            >
              <Rich text={sHeading} />
            </BlurReveal>
          </div>
          <BlurReveal
            delay={0.14}
            className="text-base leading-relaxed text-muted-foreground md:pb-2"
          >
            {sIntro}
          </BlurReveal>
        </div>

        {/* expanding panels, desktop */}
        <div className="mt-10 hidden flex-1 gap-3 md:flex md:min-h-[30rem]">
           {displayedStreams.map((s, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={s.n}
                onMouseEnter={() => setActive(i)}
                animate={{ flexGrow: isActive ? 2.6 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-w-0 flex-1 basis-0 cursor-default overflow-hidden border hairline"
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

                <div className="relative flex h-full min-w-0 flex-col justify-between p-6 lg:p-8">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                    <span className="eyebrow shrink-0 text-white/70">{s.n}</span>
                    <motion.span
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      className={`eyebrow min-w-0 text-right leading-relaxed text-white/70 ${isActive ? "" : "pointer-events-none opacity-0"}`}
                    >
                      {s.kicker}
                    </motion.span>
                  </div>

                  <div>
                    {/* Keep every title within its panel, including at tablet widths. */}
                    <h3
                      className={`max-w-full text-pretty font-display leading-[1.05] text-white transition-[font-size] duration-700 ${
                        isActive ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"
                      }`}
                    >
                      {s.title}
                      <span className="text-accent">.</span>
                    </h3>

                    {/* Reserve enough room for the complete copy and CTA. */}
                    <div className="min-h-[11rem]">
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
                         <a
                           href={s.to}
                          className="mt-5 inline-flex items-center gap-3 border-b border-white/40 pb-1 text-xs uppercase tracking-[0.22em] text-white hover:text-accent"
                        >
                          {s.cta}
                          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                         </a>
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
           {displayedStreams.map((s) => (
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
                   <a
                     href={s.to}
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white hover:text-accent"
                  >
                    {s.cta}
                    <ArrowUpRight className="size-4" />
                   </a>
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
  const latest = Route.useLoaderData().slice(0, 3);
  const navigate = useNavigate();
  const eyebrow = useCmsText("home", "journalEyebrow");
  const heading = useCmsText("home", "journalHeading");
  const jCta = useCmsText("home", "journalCta");
  return (
    <section className="mx-auto max-w-[1700px] scroll-mt-24 bg-background px-5 py-10 sm:px-8 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b hairline pb-5">
        <div>
          <BlurReveal as="p" className="eyebrow text-muted-foreground">
            {eyebrow}
          </BlurReveal>
          <BlurReveal
            as="h2"
            delay={0.08}
            className="mt-3 font-display text-[11vw] leading-[1] sm:text-5xl md:text-6xl"
          >
            {heading}
          </BlurReveal>
        </div>
        <BlurReveal delay={0.16}>
          <Link to="/writing" className="nav-link">
            {jCta}
          </Link>
        </BlurReveal>
      </div>

      <div className="divide-y hairline overflow-visible">
        {latest.map((a, i) => (
          <div key={a.slug} className="overflow-visible">
            <SlideIn delay={i * 0.06} from="bottom" className="overflow-visible">
              <HoverImage
                 src={a.image || writingImages[i % writingImages.length]}
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
