import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { BookOpen, Sparkles, PenLine, Compass, ArrowUpRight } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import { WordScrollReveal } from "@/components/site/WordScrollReveal";
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
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#0a0a0a] text-on-image"
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
        {/* Stronger scrim on mobile for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/90 md:from-black/55 md:via-black/20 md:to-black/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-5 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24"
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
          <h1 className="font-display text-[15vw] leading-[0.94] tracking-[-0.035em] sm:text-[10vw] md:text-[8vw]">
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
            className="mt-5 max-w-md text-[13px] leading-relaxed opacity-85 sm:mt-6 sm:text-sm md:text-base"
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
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-on-image"
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
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-14 md:py-18">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
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

        {/* Sticky image (works on mobile too), scrolling frames right */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="sticky top-20 lg:top-24">
              <ActiveImageStack items={featured} active={active} />
            </div>
          </div>

          <ol className="lg:col-span-6">
            {featured.map((item, i) => (
              <motion.li
                key={item.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.4, margin: "-25% 0px -40% 0px" }}
                className="border-b hairline py-8 first:pt-0 last:border-b-0 md:py-14"
              >
                <SlideIn from="right" delay={0.04}>
                  <Link to={item.to as never} className="group block">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-muted-foreground">
                      <item.icon className="size-4 shrink-0" />
                      <span className="nav-link">{item.eyebrow}</span>
                      <span className="ml-auto nav-link">{item.year}</span>
                    </div>
                    <h3 className="font-display text-[10vw] leading-[0.98] tracking-[-0.02em] transition-transform duration-700 group-hover:translate-x-2 sm:text-5xl md:text-6xl">
                      {item.title}<span className="italic">.</span>
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:mt-4 md:text-base">
                      {item.note}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs transition-opacity opacity-70 group-hover:opacity-100 md:mt-5 md:text-sm">
                      Read more <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </SlideIn>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ActiveImageStack({
  items,
  active,
}: {
  items: typeof featured;
  active: number;
}) {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden bg-foreground/5 sm:aspect-[4/3] lg:aspect-[4/5]">
      {items.map((item, i) => (
        <motion.img
          key={item.title}
          src={item.image}
          alt={item.title}
          initial={false}
          animate={{
            opacity: i === active ? 1 : 0,
            scale: i === active ? 1.02 : 1.08,
            filter: i === active ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
      ))}
      <Grain />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 text-on-image md:p-7">
        <span className="nav-link text-[10px]">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="nav-link text-[10px] truncate">{items[active].title}</span>
      </div>
    </div>
  );
}

/* ─────────────────── Parallax Break ─────────────────── */

function ParallaxBreak() {
  return (
    <section className="relative h-[55svh] min-h-[380px] w-full overflow-hidden">
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

/* ─────────────────────── Manifesto (word-by-word scroll reveal) ────────────────────── */

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:py-20">
      <BlurReveal as="p" className="eyebrow mb-6 flex items-center gap-3 text-muted-foreground">
        <Compass className="size-4" /> A note before reading
      </BlurReveal>
      <WordScrollReveal
        className="font-display text-[7vw] leading-[1.08] tracking-[-0.025em] text-balance sm:text-[3.4vw]"
        text="I am not building AI. I am not selling chips. I am thinking with the machines, against them, around them — from a small island that has always read the world more carefully than the world has read it."
      />
      <BlurReveal as="p" delay={0.1} className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
        — Fazal Ali, on opening the new site, 2026.
      </BlurReveal>
    </section>
  );
}

/* ─────────────────────── Portrait ─────────────────────── */

function Portrait() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{ backgroundColor: "#0a0a0a", color: "#f6f4ef" }}
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
          <div className="order-1 col-span-12 md:order-2 md:col-span-7">
            <BlurReveal
              as="h2"
              className="font-display font-medium leading-[0.84] tracking-[-0.04em]"
              y={28}
            >
              <span
                className="block text-[26vw] sm:text-[20vw] md:text-[11vw]"
                style={{ color: "#ffffff" }}
              >
                Fazal
              </span>
              <span
                className="block italic text-[26vw] sm:text-[20vw] md:text-[11vw]"
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

          <SlideIn from="left" className="order-2 col-span-12 md:order-1 md:col-span-5">
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
          <BlurReveal
            delay={0.1}
            className="col-span-12 md:col-span-7 text-base leading-relaxed md:text-lg"
          >
            <span style={{ color: "rgba(246,244,239,0.82)" }}>
              Cambridge-trained, mentored by Amartya Sen, Lord Martin Rees and
              Sir Leszek Borysiewicz. For twenty years the work stayed inside
              lecture rooms. This site is the first time I have stepped out
              from behind the lectern — the books, the ideas, the art, and a
              contribution from Trinidad to a conversation usually written
              elsewhere.
            </span>
          </BlurReveal>

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
    <section className="mx-auto max-w-[1700px] px-5 py-16 sm:px-8 md:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
        <div className="max-w-3xl">
          <BlurReveal as="p" className="eyebrow text-muted-foreground">Range</BlurReveal>
          <BlurReveal as="h2" delay={0.08} className="mt-3 font-display text-5xl leading-[1.02] md:text-7xl">
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
          className="pointer-events-none absolute -bottom-2 left-4 font-display text-[110px] leading-none text-white/85 md:left-6 md:text-[160px]"
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

const writingImages = [practiceEssays, practiceBook, practiceOmeros];

function LatestWriting() {
  const latest = articles.slice(0, 3);
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-16 sm:px-8 md:py-20">
      <div className="mb-8 flex items-end justify-between gap-6 border-b hairline pb-5">
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
                className="group grid grid-cols-1 gap-3 py-6 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-12 md:py-8"
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
