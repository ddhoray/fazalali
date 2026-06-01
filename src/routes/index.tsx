import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { GlassPanel } from "@/components/site/GlassPanel";
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
        content:
          "Writing on critical theory in AI from the West Indies. Books, ideas, art.",
      },
    ],
  }),
  component: Home,
});

const bento: BentoItem[] = [
  {
    eyebrow: "Book",
    title: "Education for Liberty",
    body: "A persuasive work built on Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice.",
    to: "/education-for-liberty",
    span: "lg:col-span-4 lg:row-span-2",
  },
  {
    eyebrow: "Identity",
    title: "Omeros AI",
    body: "The brand identity for a body of writing on critical theory in AI — not building AI, thinking with it.",
    to: "/omeros-ai",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "Place",
    title: "From the West Indies",
    body: "A contribution from Trinidad to a conversation that has, until now, mostly been written elsewhere.",
    to: "/about",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "Writing",
    title: "Articles & essays",
    body: "Weekly pieces on AI, education, infrastructure, and the future the children we have will inherit.",
    to: "/writing",
    span: "lg:col-span-3",
  },
  {
    eyebrow: "About",
    title: "Cambridge, UWI, and what came after",
    body: "Mentored by Amartya Sen, Lord Martin Rees, and Sir Leszek Borysiewicz. Provost. Chairman. Writer.",
    to: "/about",
    span: "lg:col-span-3",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <BentoSection />
      <FeaturedWriting />
      <ClosingCTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-5 text-center sm:px-8">
      <motion.div style={{ y, opacity }} className="flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-none px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground"
        >
          <span className="size-1.5 rounded-none bg-foreground/70" />
          Omeros AI · Est. Trinidad
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[14vw] leading-[0.92] tracking-tight text-balance sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5rem]"
        >
          Fazal <em className="italic">Ali</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-balance text-base text-muted-foreground md:text-lg"
        >
          Writer. Scholar. A West Indian voice on the critical theory of artificial intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 rounded-none bg-foreground px-6 py-3 text-sm text-background transition-opacity hover:opacity-90"
          >
            Read the writing
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/about"
            className="glass inline-flex items-center gap-2 rounded-none px-6 py-3 text-sm"
          >
            About Fazal
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.4 }}
        className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="mx-auto mt-24 max-w-5xl px-5 sm:px-8 md:mt-40">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          A note from Fazal
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-6 font-display text-3xl leading-[1.15] text-balance md:text-5xl">
          <em>“The site is about me</em> — my books, my ideas, my writing, my art. My contribution to the West Indies. For the first time I am adding character. I have grown. I am a bit braver, and more adventurous.<em>”</em>
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-xl text-sm text-muted-foreground">
          The writing is about critical theory in AI. Not building AI. Not selling chips.
          Thinking with the machines, against them, around them — from a small island that has always
          read the world more carefully than the world has read it.
        </p>
      </Reveal>
    </section>
  );
}

function BentoSection() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-5 sm:px-8 md:mt-40">
      <Reveal className="mb-10 flex items-end justify-between gap-6">
        <h2 className="font-display text-4xl md:text-6xl">The work, in pieces.</h2>
        <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
          A bento of the things that matter — book, identity, place, writing.
        </p>
      </Reveal>
      <ScrollGrowBento items={bento} />
    </section>
  );
}

function FeaturedWriting() {
  const latest = articles.slice(0, 3);
  return (
    <section className="mx-auto mt-28 max-w-7xl px-5 sm:px-8 md:mt-40">
      <Reveal className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Latest</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">From the desk.</h2>
        </div>
        <Link to="/writing" className="hidden text-sm underline-offset-4 hover:underline md:inline">
          All articles →
        </Link>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {latest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08}>
            <Link
              to="/writing/$slug"
              params={{ slug: a.slug }}
              className="group block"
            >
              <GlassPanel className="flex h-full flex-col p-7 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {a.topic}
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight text-balance">
                  {a.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground text-pretty">
                  {a.excerpt}
                </p>
                <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{new Date(a.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  <span className="inline-flex items-center gap-1">Read <ArrowRight className="size-3" /></span>
                </div>
              </GlassPanel>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="mx-auto mt-32 max-w-5xl px-5 sm:px-8 md:mt-48">
      <Reveal>
        <GlassPanel strong className="relative overflow-hidden p-12 text-center md:p-20">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Correspondence
          </p>
          <h2 className="mt-6 font-display text-5xl text-balance md:text-7xl">
            Write me <em className="italic">a note.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Press, residencies, conversations on AI and the Caribbean — all welcome.
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-none bg-foreground px-7 py-3.5 text-sm text-background transition-opacity hover:opacity-90"
            >
              Start a letter <ArrowRight className="size-4" />
            </Link>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
