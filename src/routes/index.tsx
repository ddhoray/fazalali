import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
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
import portrait from "@/assets/fazal-portrait-aesthetic.jpg";
import heroImage from "@/assets/hero-statue.jpg";
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
      <Portrait />
      <BookSection />
      <Range />
      <LatestWriting />
      <Newsletter />
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
  // Subtle parallax — image drifts upward as the section scrolls past.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  return (
    <section
      ref={ref}
      className="relative min-h-svh w-full overflow-hidden bg-neutral-100 text-white"
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={heroImage}
          alt="A classical marble bust in warm museum light"
          className="size-full object-cover"
          width={1920}
          height={1280}
        />
      </motion.div>
      {/* Soft cinematic overlay — keeps the statue readable while text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      <Grain />

      {/* Content frame */}
      <div className="text-on-image relative z-10 flex min-h-svh flex-col justify-between px-5 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.05 }}
          className="eyebrow opacity-85"
        >
          Folio I · Trinidad &amp; the Machines
        </motion.p>

        <div>
          <BlurReveal
            as="h1"
            className="font-display text-[14vw] leading-[1.02] tracking-[-0.035em] text-balance sm:text-[10vw] md:text-[8vw] md:leading-[0.96]"
          >
            Reading the <span className="italic">machines</span> slowly,{" "}
            <span className="italic">by hand.</span>
          </BlurReveal>

          <BlurReveal
            as="p"
            delay={0.25}
            className="mt-5 max-w-md text-[13px] leading-relaxed opacity-90 sm:mt-6 sm:text-sm md:text-base"
          >
            Dr. Fazal Ibrahim Ali — Cambridge-trained, Trinidad-born. Writing on
            critical theory in AI, the founding of Omeros AI, and a small book
            called <em className="italic">Education for Liberty.</em>
          </BlurReveal>
        </div>
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
    note: "Essays on critical theory, AI as social substrate, and the West Indies as a place that reads the world.",
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

        <div className="mx-auto w-full max-w-[1700px] flex-1 px-5 pt-24 pb-6 sm:px-8 sm:pt-28 sm:pb-8 lg:pt-32">
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
                      scale: i === active ? 1 : 1.08,
                    }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-full object-cover"
                      loading="lazy"
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
                        >
                          Read more
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
                >
                  Read more
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
    <section className="mx-auto max-w-[1400px] bg-background px-5 py-12 sm:px-8 md:py-16">
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
  return (
    <section
      data-nav="dark"
      className="section-invert relative overflow-hidden py-14 md:py-16"
    >

      <Grain />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8">
        <div
          className="mb-8 flex items-center justify-between border-b pb-4"
          style={{ borderColor: "rgba(246,244,239,0.2)" }}
        >
          <BlurReveal as="p" className="eyebrow">
            <span style={{ color: "rgba(246,244,239,0.65)" }}>The writer</span>
          </BlurReveal>
          <BlurReveal as="p" delay={0.1} className="eyebrow">
            <span style={{ color: "rgba(246,244,239,0.65)" }}>Trinidad · b. 1974</span>
          </BlurReveal>
        </div>

        {/* Compact composition: name on top on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-12 items-end gap-6 md:gap-10">
          {/* Name first on mobile (order-1), image right column on desktop */}
          <div className="order-1 col-span-12 md:order-2 md:col-span-6 lg:col-span-7">
            <BlurReveal
              as="h2"
              className="font-display font-medium leading-[0.84] tracking-[-0.04em]"
              y={28}
            >
              <span
                className="block text-[26vw] sm:text-[20vw] md:text-[9.5vw] lg:text-[11vw]"
                style={{ color: "#ffffff" }}
              >
                Fazal
              </span>
              <span
                className="block italic text-[26vw] sm:text-[20vw] md:text-[9.5vw] lg:text-[11vw]"
                style={{ color: "#ffffff" }}
              >
                Ali<span className="not-italic">.</span>
              </span>
            </BlurReveal>

            <BlurReveal delay={0.16} className="mt-4 max-w-xl md:mt-5">
              <p
                className="font-display text-lg italic sm:text-xl md:text-2xl"
                style={{ color: "rgba(246,244,239,0.85)" }}
              >
                Writer · Scholar · Founder of <span className="not-italic">Omeros AI</span>
              </p>
            </BlurReveal>
          </div>

          <SlideIn from="left" className="order-2 col-span-12 md:order-1 md:col-span-6 lg:col-span-5">
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
        </div>

        {/* Bio + quote row */}
        <div className="mt-12 grid grid-cols-12 gap-8 md:mt-14 md:gap-12">
          <div className="col-span-12 md:col-span-7">
            <WordScrollReveal
              className="text-base leading-relaxed md:text-lg"
              wordClassName="[color:rgba(246,244,239,0.82)]"
              text="Cambridge-trained, mentored by Amartya Sen, Lord Martin Rees and Sir Leszek Borysiewicz. For twenty years the work stayed inside lecture rooms. This site is the first time I have stepped out from behind the lectern — the books, the ideas, the art, and a contribution from Trinidad to a conversation usually written elsewhere."
            />
          </div>


          <BlurReveal
            delay={0.18}
            className="col-span-12 font-display text-2xl italic leading-[1.2] md:col-span-5 md:text-3xl"
          >
            <span style={{ color: "rgba(246,244,239,0.95)" }}>
              &ldquo;I have grown braver. A little more adventurous.&rdquo;
            </span>
          </BlurReveal>
        </div>

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
  { n: "01", title: "Critical Theory in AI", body: "Frontier models read as social substrate — not products, not miracles.", icon: Sparkles, tag: "Theory" },
  { n: "02", title: "Education for Liberty", body: "What a child needs to learn so the next machine is a freedom, not a fence.", icon: BookOpen, tag: "Book" },
  { n: "03", title: "Omeros AI", body: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea.", icon: Compass, tag: "Studio" },
  { n: "04", title: "From the West Indies", body: "A contribution from Trinidad to a conversation rarely written from here.", icon: PenLine, tag: "Essays" },
];

const rangeImages = [practiceEssays, practiceBook, practiceOmeros, featuredWriting];

function Range() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section data-nav="dark" className="section-invert relative px-5 py-14 sm:px-8 md:py-16">
      <div className="mx-auto max-w-[1700px]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
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

      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
        onMouseLeave={() => setHover(null)}
      >
        {range.map((r, i) => (
          <SlideIn key={r.n} delay={i * 0.06} from={i % 2 === 0 ? "left" : "right"}>
            <RangeCard
              r={r}
              image={rangeImages[i]}
              isHover={hover === i}
              isDim={hover !== null && hover !== i}
              onEnter={() => setHover(i)}
            />
          </SlideIn>
        ))}
      </div>
      </div>
    </section>
  );
}

function RangeCard({
  r,
  image,
  isHover,
  isDim,
  onEnter,
}: {
  r: (typeof range)[number];
  image: string;
  isHover: boolean;
  isDim: boolean;
  onEnter: () => void;
}) {
  return (
    <motion.article
      onMouseEnter={onEnter}
      animate={{ opacity: isDim ? 0.5 : 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative isolate flex h-full flex-col overflow-hidden bg-card"
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground/5">
        <motion.img
          src={image}
          alt={r.title}
          animate={{ scale: isHover ? 1.08 : 1.0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="card-image absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <Grain />

        {/* Floating large number — animates up on hover */}
        <motion.span
          aria-hidden
          animate={{
            y: isHover ? -8 : 0,
            opacity: isHover ? 1 : 0.85,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -bottom-1 left-3 font-display text-[80px] leading-none text-white/85 sm:text-[110px] md:left-6 md:text-[160px]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
        >
          {r.n}
        </motion.span>

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white md:p-5">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-colors group-hover:bg-white/25">
            <r.icon className="size-4" />
          </span>
          <span className="nav-link rounded-full bg-black/45 px-3 py-1.5 backdrop-blur-md">
            {r.tag}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col justify-between gap-5 border-t hairline p-5 md:p-7">
        {/* sliding underline accent */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: isHover ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="absolute left-0 top-0 h-px w-full bg-foreground"
        />

        <div>
          <motion.h4
            animate={{ x: isHover ? 4 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl leading-[1.02] md:text-4xl"
          >
            {r.title}<span className="italic">.</span>
          </motion.h4>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {r.body}
          </p>
        </div>

        <div className="flex items-center justify-between border-t hairline pt-3">
          <span className="eyebrow text-muted-foreground">Thread {r.n}</span>
          <motion.span
            animate={{ x: isHover ? 4 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-sm"
          >
            Read the thread <ArrowUpRight className="size-4" />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────── Writing ──────────────────────── */

const writingImages = [featuredWriting, practiceEssays, featuredOmeros];

function LatestWriting() {
  const latest = articles.slice(0, 3);
  return (
    <section className="mx-auto max-w-[1700px] scroll-mt-24 bg-background px-5 py-14 sm:px-8 md:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b hairline pb-5">
        <div>
          <BlurReveal as="p" className="eyebrow text-muted-foreground">From the Journal</BlurReveal>
          <BlurReveal as="h2" delay={0.08} className="mt-3 font-display text-[11vw] leading-[1] sm:text-5xl md:text-6xl">
            Recent pieces<span className="italic">.</span>
          </BlurReveal>
        </div>
        <BlurReveal delay={0.16}>
          <Link to="/writing" className="nav-link">All essays →</Link>
        </BlurReveal>
      </div>

      <div className="divide-y hairline overflow-visible">
        {latest.map((a, i) => (
          <div key={a.slug} className="overflow-visible">
            <SlideIn delay={i * 0.06} from="bottom" className="overflow-visible">
              <HoverImage src={writingImages[i % writingImages.length]} alt={a.title}>
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
