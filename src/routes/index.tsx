import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ScrollGrowBento, type BentoItem } from "@/components/site/ScrollGrowBento";
import { articles } from "@/content/articles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fazal Ali — Writer, Scholar, Omeros AI" },
      {
        name: "description",
        content:
          "A writer and scholar from the West Indies. Critical theory in AI, the book Education for Liberty, and the Omeros AI identity.",
      },
      { property: "og:title", content: "Fazal Ali — Writer, Scholar, Omeros AI" },
      {
        property: "og:description",
        content: "Writing on critical theory in AI from the West Indies. Books, ideas, art.",
      },
    ],
  }),
  component: Home,
});

const PORTRAIT =
  "https://fazalali.com/wp-content/uploads/2025/10/Fazal-Ali-Profile-2025.jpeg";

const bento: BentoItem[] = [
  {
    eyebrow: "01 — The Book",
    title: "Education for Liberty",
    body: "Built on Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice.",
    to: "/education-for-liberty",
    span: "lg:col-span-4",
  },
  {
    eyebrow: "02 — Identity",
    title: "Omeros AI",
    body: "A name borrowed from Walcott. A practice of critical theory in artificial intelligence.",
    to: "/omeros-ai",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "03 — Place",
    title: "From the West Indies",
    body: "A contribution from Trinidad to a conversation that has, until now, mostly been written elsewhere.",
    to: "/about",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "04 — Writing",
    title: "Essays, slowly, often",
    body: "Weekly pieces on AI, education, infrastructure, and the future the children we have will inherit.",
    to: "/writing",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "05 — About",
    title: "Cambridge, UWI, after",
    body: "Mentored by Amartya Sen, Lord Martin Rees, and Sir Leszek Borysiewicz.",
    to: "/about",
    span: "lg:col-span-2",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Editorial />
      <BentoSection />
      <FeaturedWriting />
      <ClosingCTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 px-5 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <motion.div style={{ y }} className="flex flex-col justify-between pt-6 lg:py-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow text-muted-foreground"
          >
            New Identity · Spring 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-display text-[18vw] leading-[0.86] tracking-[-0.03em] sm:text-[14vw] lg:text-[11vw] xl:text-[12rem]"
          >
            FAZAL
            <br />
            <em className="italic">Ali.</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 gap-10 border-t hairline pt-8 lg:mt-auto"
          >
            <div>
              <p className="eyebrow text-muted-foreground">The Subject</p>
              <p className="mt-3 font-display text-2xl leading-tight">
                Critical theory in artificial intelligence.
              </p>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">The Place</p>
              <p className="mt-3 font-display text-2xl leading-tight">
                Trinidad &amp; Tobago, West Indies.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 lg:mt-0 lg:pt-16"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
            <img
              src={PORTRAIT}
              alt="Dr. Fazal Ibrahim Ali"
              className="absolute inset-0 size-full object-cover grayscale-[0.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-background mix-blend-difference">
              <span className="nav-link">FW/26 · Edition One</span>
              <span className="nav-link">Omeros AI</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="mt-10 flex items-center justify-center gap-3 text-muted-foreground"
      >
        <span className="block h-px w-12 bg-current" />
        <span className="nav-link">Scroll</span>
        <span className="block h-px w-12 bg-current" />
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [
    "WRITER", "SCHOLAR", "CAMBRIDGE", "UWI", "OMEROS AI", "TRINIDAD", "EDUCATION FOR LIBERTY",
    "CRITICAL THEORY", "WEST INDIES", "WRITER", "SCHOLAR",
  ];
  return (
    <div className="mt-32 overflow-hidden border-y hairline py-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex w-max gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-3xl tracking-tight md:text-5xl">
            {t} <span className="mx-6 text-muted-foreground">—</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Editorial() {
  return (
    <section className="mx-auto mt-32 max-w-[1600px] px-5 sm:px-10">
      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow text-muted-foreground">A note</p>
        </Reveal>
        <Reveal delay={0.05} className="lg:col-span-9">
          <p className="font-display text-[2.2rem] leading-[1.08] text-balance md:text-6xl">
            <em className="italic">“The site is about me.</em> My books, my ideas, my writing, my art. My contribution to the West Indies. For the first time I am adding character. I have grown — I am a bit braver, and more adventurous.<em>”</em>
          </p>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The work is critical theory in AI. Not building AI. Not selling chips. Thinking with the
            machines, against them, around them — from a small island that has always read the world
            more carefully than the world has read it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BentoSection() {
  return (
    <section className="mt-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-muted-foreground">The Collection</p>
            <h2 className="mt-4 font-display text-5xl leading-none md:text-7xl">The work, in pieces.</h2>
          </div>
          <Link to="/writing" className="nav-link hidden md:inline">View all →</Link>
        </Reveal>
      </div>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <ScrollGrowBento items={bento} />
      </div>
    </section>
  );
}

function FeaturedWriting() {
  const latest = articles.slice(0, 3);
  return (
    <section className="mx-auto mt-32 max-w-[1600px] px-5 sm:px-10">
      <Reveal className="mb-12 flex items-end justify-between gap-6 border-b hairline pb-6">
        <h2 className="font-display text-5xl leading-none md:text-7xl">Editorial.</h2>
        <Link to="/writing" className="nav-link">All essays</Link>
      </Reveal>

      <div className="grid gap-px bg-foreground/15 md:grid-cols-3">
        {latest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Link to="/writing/$slug" params={{ slug: a.slug }} className="group block h-full bg-background p-8 transition-colors hover:bg-muted">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-muted-foreground">{a.topic}</span>
                <span className="eyebrow text-muted-foreground">
                  {new Date(a.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </div>
              <h3 className="mt-10 font-display text-3xl leading-[1.05] text-balance md:text-4xl">
                {a.title}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {a.excerpt}
              </p>
              <div className="mt-10 flex items-center gap-3">
                <span className="nav-link">Read essay</span>
                <span className="block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-20" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="mt-32 border-t hairline">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-32 sm:px-10 md:grid-cols-2 md:items-end">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Correspondence</p>
          <h2 className="mt-6 font-display text-6xl leading-[0.95] text-balance md:text-9xl">
            Write me <em className="italic">a note.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="max-w-md text-base text-muted-foreground">
            Press, residencies, conversations on AI and the Caribbean — all welcome.
            Read personally, replied to from <span className="text-foreground">writeme@fazalali.com</span>.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-4 border-b hairline pb-2 font-display text-2xl"
          >
            Start a letter <span className="block h-px w-12 bg-foreground" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
