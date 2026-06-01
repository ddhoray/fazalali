import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { FeaturedStack, type FeaturedItem } from "@/components/site/FeaturedStack";
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
          "Dr. Fazal Ibrahim Ali — a writer from Trinidad reading the world's largest machines, slowly, by hand. Books, essays, and the Omeros AI identity.",
      },
      { property: "og:title", content: "Fazal Ali — Writer, Scholar, Omeros AI" },
      {
        property: "og:description",
        content:
          "Critical theory in AI, from the West Indies. The Omeros AI identity, the book Education for Liberty, and a journal kept slowly.",
      },
    ],
  }),
  component: Home,
});

const featured: FeaturedItem[] = [
  {
    eyebrow: "The Book",
    title: "Education for Liberty",
    year: "(Forthcoming, 2026)",
    image: featuredEducation,
    to: "/education-for-liberty",
  },
  {
    eyebrow: "The Identity",
    title: "Omeros AI",
    year: "(Ongoing)",
    image: featuredOmeros,
    to: "/omeros-ai",
  },
  {
    eyebrow: "The Journal",
    title: "Selected Writing",
    year: "(2024 — 2026)",
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
      <Practice />
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-foreground text-background"
    >
      {/* Parallax hero image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img
          src={heroImage}
          alt="A writer's desk at the edge of the Caribbean — books, a pen, the sea."
          className="size-full object-cover opacity-70"
          width={1920}
          height={1080}
        />
        <Grain />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </motion.div>

      {/* Hero text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-5 py-10 sm:px-8 sm:py-14"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <span className="nav-link">Vol. I &nbsp;·&nbsp; Edition One</span>
          <span className="nav-link hidden md:inline">Trinidad &nbsp;·&nbsp; 10.7°N 61.5°W</span>
          <span className="nav-link">FW / 2026</span>
        </motion.div>

        {/* Main title */}
        <div className="mx-auto max-w-[1500px] self-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="eyebrow mb-8"
          >
            Fazal Ibrahim Ali &nbsp;—&nbsp; Writer &amp; Scholar
          </motion.p>

          <h1 className="font-display text-[12vw] leading-[0.95] tracking-[-0.03em] text-balance sm:text-[8vw] md:text-[7.2vw]">
            <Word delay={0.1}>Reading the</Word>{" "}
            <Word delay={0.22} italic>machines</Word>
            <br />
            <Word delay={0.36}>slowly,</Word>{" "}
            <Word delay={0.48} italic>by hand.</Word>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-background/70"
          >
            A writer from the West Indies on critical theory in AI — books, essays, and an
            identity called Omeros, named for the sea.
          </motion.p>
        </div>

        {/* Bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.3 }}
          className="flex items-end justify-between"
        >
          <div className="max-w-xs">
            <span className="nav-link block opacity-60">(Currently)</span>
            <p className="mt-2 text-sm leading-relaxed">
              Writing <em className="italic">Education for Liberty</em> —<br />
              a book about the child who will inherit AI.
            </p>
          </div>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="nav-link hidden sm:inline"
          >
            Scroll &nbsp;↓
          </motion.span>
          <span className="nav-link text-right">
            Omeros AI<br />
            <span className="opacity-60">est. 2024</span>
          </span>
        </motion.div>
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
          <span
            key={i}
            className="font-display text-3xl italic md:text-5xl"
          >
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
    <section className="section-dark relative py-32">
      <div className="mx-auto mb-20 max-w-[1700px] px-5 sm:px-8">
        <Reveal className="flex items-end justify-between gap-6 border-b hairline pb-6">
          <div>
            <p className="eyebrow opacity-60">(I) Featured Work</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">
              Three things, <em className="italic">in order.</em>
            </h2>
          </div>
          <Link to="/writing" className="nav-link hidden md:inline opacity-70 hover:opacity-100">
            All work →
          </Link>
        </Reveal>
      </div>
      <FeaturedStack items={featured} />
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

function Portrait() {
  return (
    <section className="section-dark py-32">
      <div className="mx-auto grid max-w-[1700px] gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1fr] md:gap-20">
        <Reveal>
          <div className="grain card-expand relative aspect-[3/4] w-full overflow-hidden bg-white/5">
            <img
              src={portrait}
              alt="Dr. Fazal Ibrahim Ali at his writing desk."
              className="card-image absolute inset-0 size-full object-cover"
              loading="lazy"
              width={1024}
              height={1344}
            />
            <Grain />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-end pb-2">
          <p className="eyebrow opacity-60">(III) On the writer</p>
          <h3 className="mt-6 font-display text-4xl leading-[1.04] md:text-6xl">
            My name is <em className="italic">Fazal Ali</em>. I write — and have been
            writing — for a long time.
          </h3>
          <p className="mt-8 max-w-md text-base leading-relaxed text-background/70">
            Cambridge-trained. Mentored by Amartya Sen, Lord Martin Rees, and Sir Leszek
            Borysiewicz. For twenty years the work stayed inside lecture rooms and journals.
            This site is the first time I have stepped out from behind it — the books, the
            ideas, the art, and a contribution from Trinidad to a conversation usually
            written elsewhere. I have grown braver. A little more adventurous.
          </p>
          <div className="mt-10">
            <CirclePill to="/about" label="More about me" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Practice ─────────────────────── */

const practice = [
  {
    title: "Essays",
    body:
      "A journal kept slowly. Pieces on AI, education, infrastructure, and the children we have — written for the long shelf, not the feed.",
    to: "/writing",
    image: practiceEssays,
  },
  {
    title: "The Book",
    body:
      "Education for Liberty — what a child in Trinidad needs to learn so that AI becomes a freedom and not a fence. Built on Sen and Rawls.",
    to: "/education-for-liberty",
    image: practiceBook,
  },
  {
    title: "Omeros AI",
    body:
      "A name borrowed from Walcott. A way of doing critical theory from inside the substrate — the sea, the script, the model, all read together.",
    to: "/omeros-ai",
    image: practiceOmeros,
  },
];

function Practice() {
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-32 sm:px-8">
      <Reveal className="mb-16 max-w-3xl">
        <p className="eyebrow text-muted-foreground">(IV) The Practice</p>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
          A small body of work, <em className="italic">slowly built.</em>
        </h2>
      </Reveal>

      <div className="divide-y hairline border-y hairline">
        {practice.map((p, i) => (
          <PracticeRow key={p.title} item={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function PracticeRow({
  item,
  index,
}: {
  item: (typeof practice)[number];
  index: number;
}) {
  const reverse = index % 2 === 1;
  return (
    <Reveal>
      <Link
        to={item.to as never}
        className={`group grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-[0.9fr_1fr_0.7fr] md:gap-14 ${
          reverse ? "md:[&>*:nth-child(1)]:order-2" : ""
        }`}
      >
        <div className="grain card-expand relative aspect-[5/4] w-full overflow-hidden bg-foreground/5">
          <img
            src={item.image}
            alt={item.title}
            className="card-image absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          <Grain />
          <div className="card-overlay absolute inset-0 bg-black/30" />
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">{`(0${index + 1})`}</p>
          <h3 className="mt-4 font-display text-4xl leading-[1.02] transition-transform duration-700 group-hover:translate-x-3 md:text-6xl">
            {item.title}<span className="italic">.</span>
          </h3>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.body}
          </p>
          <CirclePill to={item.to} label="Read more" />
        </div>
      </Link>
    </Reveal>
  );
}

/* ───────────────────────── Range ──────────────────────── */

const range = [
  {
    n: "01",
    title: "Critical Theory in AI",
    body: "Frontier models read as social substrate — not as products, not as miracles.",
  },
  {
    n: "02",
    title: "Education for Liberty",
    body: "What a child needs to learn so the next machine is a freedom, not a fence.",
  },
  {
    n: "03",
    title: "Omeros AI",
    body: "A Caribbean reading of intelligence — named for Walcott, kept close to the sea.",
  },
  {
    n: "04",
    title: "From the West Indies",
    body: "A contribution from Trinidad to a conversation that is rarely written from here.",
  },
];

function Range() {
  return (
    <section className="section-dark py-32">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-8">
        <Reveal className="mb-16 max-w-3xl">
          <p className="eyebrow opacity-60">(V) Range</p>
          <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
            Four threads, <em className="italic">one practice.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-4">
          {range.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.05}>
              <div className="group flex h-full cursor-default flex-col justify-between gap-10 bg-[#0a0a0a] p-8 transition-colors duration-500 hover:bg-[#161616] md:min-h-[340px]">
                <span className="nav-link opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                  ({r.n})
                </span>
                <div>
                  <h4 className="font-display text-3xl leading-[1.05] transition-transform duration-700 group-hover:-translate-y-2 md:text-4xl">
                    {r.title}<span className="italic">.</span>
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-background/55 transition-colors duration-500 group-hover:text-background/80">
                    {r.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Writing ──────────────────────── */

function LatestWriting() {
  const latest = articles.slice(0, 3);
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-40 sm:px-8">
      <Reveal className="mb-12 flex items-end justify-between gap-6 border-b hairline pb-6">
        <div>
          <p className="eyebrow text-muted-foreground">(VI) From the Journal</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">
            Recent pieces<span className="italic">.</span>
          </h2>
        </div>
        <Link to="/writing" className="nav-link">All essays →</Link>
      </Reveal>

      <div className="divide-y hairline">
        {latest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Link
              to="/writing/$slug"
              params={{ slug: a.slug }}
              className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-12"
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
