import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { FeaturedStack, type FeaturedItem } from "@/components/site/FeaturedStack";
import { CirclePill } from "@/components/site/CirclePill";
import { Grain } from "@/components/site/Grain";
import { articles } from "@/content/articles";
import portrait from "@/assets/fazal-portrait.jpg";

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

const featured: FeaturedItem[] = [
  {
    eyebrow: "Featured Work",
    title: "Education for Liberty",
    year: "(2026)",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2400&q=80",
    to: "/education-for-liberty",
  },
  {
    eyebrow: "Identity",
    title: "Omeros AI",
    year: "(2026)",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80",
    to: "/omeros-ai",
  },
  {
    eyebrow: "Essays",
    title: "Selected Writing",
    year: "(2024 — 2026)",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2400&q=80",
    to: "/writing",
  },
];

function Home() {
  return (
    <>
      <Hero />
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
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center px-5 sm:px-8"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-[1400px] text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="eyebrow mb-8 text-muted-foreground"
        >
          Writer · Scholar · Critical Theory in AI
        </motion.p>

        <h1 className="font-display text-[10vw] leading-[1.02] tracking-[-0.025em] text-balance sm:text-[6.5vw]">
          <Word delay={0.1}>Writing on</Word>{" "}
          <Word delay={0.2} italic>Critical Theory</Word>
          <br />
          <Word delay={0.35}>from the</Word>{" "}
          <Word delay={0.45} italic>West Indies.</Word>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.3 }}
        className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-5 text-muted-foreground sm:px-8"
      >
        <span className="nav-link">(Edition One · FW/26)</span>
        <span className="nav-link hidden sm:inline">Scroll ↓</span>
        <span className="nav-link">Omeros AI</span>
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

/* ─────────────────────── Featured ─────────────────────── */

function FeaturedSection() {
  return (
    <section className="relative mt-32">
      <div className="mx-auto mb-16 max-w-[1700px] px-5 sm:px-8">
        <Reveal className="flex items-end justify-between gap-6">
          <p className="eyebrow text-muted-foreground">(Featured Work)</p>
          <Link to="/writing" className="nav-link hidden md:inline">All work →</Link>
        </Reveal>
      </div>
      <FeaturedStack items={featured} />
    </section>
  );
}

/* ─────────────────────── Manifesto ────────────────────── */

function Manifesto() {
  return (
    <section className="mx-auto mt-48 max-w-[1500px] px-5 sm:px-8">
      <Reveal className="mb-10">
        <p className="eyebrow text-muted-foreground">More than just introduction</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[6vw] leading-[1.05] tracking-[-0.02em] text-balance sm:text-[3.4vw]">
          The work is not about <em className="italic">building AI</em> — it is
          about thinking <em className="italic">with</em> the machines, against
          them, around them — from a small island that has always read the
          world more carefully than the world has read it.
        </h2>
      </Reveal>
    </section>
  );
}

/* ─────────────────────── Portrait ─────────────────────── */

function Portrait() {
  return (
    <section className="mx-auto mt-40 grid max-w-[1700px] gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1fr] md:gap-20">
      <Reveal>
        <div className="grain relative aspect-[3/4] w-full overflow-hidden bg-foreground/5">
          <img
            src={portrait}
            alt="Dr. Fazal Ibrahim Ali"
            className="absolute inset-0 size-full object-cover"
          />
          <Grain />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col justify-end pb-2">
        <p className="eyebrow text-muted-foreground">(About)</p>
        <h3 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">
          My name is <em className="italic">Fazal Ali</em>, and I write on
          critical theory in artificial intelligence.
        </h3>
        <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
          Cambridge-trained, mentored by Amartya Sen, Lord Martin Rees, and Sir
          Leszek Borysiewicz. The site is about me now — my books, my ideas, my
          writing, my art. My contribution to the West Indies. For the first
          time I am adding character: I have grown, and I am a bit braver and
          more adventurous.
        </p>
        <div className="mt-10">
          <CirclePill to="/about" label="More about me" />
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────── Practice ─────────────────────── */

const practice = [
  {
    title: "Essays",
    body:
      "Weekly pieces on AI, education, infrastructure, and the future the children we have will inherit.",
    to: "/writing",
    image:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "The Book",
    body:
      "Education for Liberty — built on Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice.",
    to: "/education-for-liberty",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Omeros AI",
    body:
      "A practice, a name borrowed from Walcott, a way of doing critical theory inside the substrate of AI itself.",
    to: "/omeros-ai",
    image:
      "https://images.unsplash.com/photo-1496781276565-e7e9b07f3da6?auto=format&fit=crop&w=2000&q=80",
  },
];

function Practice() {
  return (
    <section className="mx-auto mt-48 max-w-[1700px] px-5 sm:px-8">
      <Reveal className="mb-16 max-w-3xl">
        <p className="eyebrow text-muted-foreground">The Practice</p>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
          A tailored body of work, <em className="italic">slowly built.</em>
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
      <div
        className={`grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-[0.9fr_1fr_0.7fr] md:gap-14 ${
          reverse ? "md:[&>*:nth-child(1)]:order-2" : ""
        }`}
      >
        <div className="grain relative aspect-[5/4] w-full overflow-hidden bg-foreground/5">
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          <Grain />
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">{`(0${index + 1})`}</p>
          <h3 className="mt-4 font-display text-4xl leading-[1.02] md:text-6xl">
            {item.title}<span className="italic">.</span>
          </h3>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.body}
          </p>
          <CirclePill to={item.to} label="More" />
        </div>
      </div>
    </Reveal>
  );
}

/* ───────────────────────── Range ──────────────────────── */

const range = [
  {
    n: "01",
    title: "Critical Theory in AI",
    body: "Frontier models read as social substrate, not as products.",
  },
  {
    n: "02",
    title: "Education for Liberty",
    body: "The pedagogical conditions a child needs to live with AI well.",
  },
  {
    n: "03",
    title: "Omeros AI",
    body: "A Caribbean reading of intelligence — named for Walcott's Omeros.",
  },
  {
    n: "04",
    title: "From the West Indies",
    body: "A contribution from Trinidad to a conversation written elsewhere.",
  },
];

function Range() {
  return (
    <section className="mx-auto mt-48 max-w-[1700px] px-5 sm:px-8">
      <Reveal className="mb-16 max-w-3xl">
        <p className="eyebrow text-muted-foreground">Range of work</p>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
          Four threads, <em className="italic">one practice.</em>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-4">
        {range.map((r, i) => (
          <Reveal key={r.n} delay={i * 0.05}>
            <div className="flex h-full flex-col justify-between gap-10 bg-background p-8 md:min-h-[320px]">
              <span className="nav-link text-muted-foreground">({r.n})</span>
              <div>
                <h4 className="font-display text-3xl leading-[1.05] md:text-4xl">
                  {r.title}<span className="italic">.</span>
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── Writing ──────────────────────── */

function LatestWriting() {
  const latest = articles.slice(0, 3);
  return (
    <section className="mx-auto mt-48 max-w-[1700px] px-5 sm:px-8">
      <Reveal className="mb-12 flex items-end justify-between gap-6 border-b hairline pb-6">
        <div>
          <p className="eyebrow text-muted-foreground">(Editorial)</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">
            From the journal<span className="italic">.</span>
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
              <h3 className="font-display text-3xl leading-[1.05] md:text-5xl">
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
