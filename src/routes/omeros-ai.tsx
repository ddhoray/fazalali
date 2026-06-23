import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "lucide-react";
import heroOmeros from "@/assets/hero-omeros.jpg";

export const Route = createFileRoute("/omeros-ai")({
  head: () => ({
    meta: [
      { title: "Omeros AI — Fazal Ali's brand identity" },
      {
        name: "description",
        content:
          "Omeros AI is the brand identity for Fazal Ali's body of writing on critical theory in artificial intelligence — from the West Indies.",
      },
      { property: "og:title", content: "Omeros AI — A West Indian voice on AI" },
      {
        property: "og:description",
        content:
          "Critical theory in AI. Not building AI. Not selling chips. Writing, ideas, art — from Trinidad.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/omeros-ai" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/omeros-ai" },
    ],
  }),
  component: OmerosPage,
});

const tenets = [
  {
    k: "01",
    t: "Writing, not building",
    b: "This site publishes ideas about AI. It does not sell software, chips, or services. The work is to think clearly in public.",
  },
  {
    k: "02",
    t: "A Caribbean point of view",
    b: "Fazal writes from Trinidad. The West Indies has long experience reading powerful systems from the outside — that lens is brought to AI.",
  },
  {
    k: "03",
    t: "Plain language",
    b: "No jargon, no hype, no doom. Each essay aims to leave the reader more literate about AI than when they arrived.",
  },
  {
    k: "04",
    t: "Books matter most",
    b: "Long-form arguments live in books. Education for Liberty is the first. Essays and the podcast lead readers toward them.",
  },
  {
    k: "05",
    t: "Art counts as thinking",
    b: "Photography, music, carnival, film — culture is part of how we understand technology, not a decoration on the side.",
  },
  {
    k: "06",
    t: "Slow and steady",
    b: "A weekly rhythm, not a daily feed. Fewer pieces, written with care, meant to be read more than once.",
  },
];

function OmerosPage() {
  return (
    <div>
      <PageHero
        eyebrow="The name"
        title={<>Omeros<span className="italic">.</span></>}
        standfirst={
          <>
            <em>Omeros</em> is the Greek name for Homer — the poet of the sea,
            of journeys, of voices passed from one generation to the next. It
            is the name Fazal Ali gives to his writing on artificial
            intelligence: a practice that refuses the industry's two default
            registers — boosterism and panic — and tries for a third:{" "}
            <em>literacy.</em>
          </>
        }
        meta={
          <>
            <span>Writing on AI</span>
            <span className="size-1 bg-white/40" />
            <span>Six principles</span>
            <span className="size-1 bg-white/40" />
            <span>From Trinidad</span>
          </>
        }
        image={heroOmeros}
        imageAlt="Open sea at first light — the world Homer sang"
      />


      {/* Manifesto quote */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-10">
        <Reveal>
          <div className="border-y hairline py-10 md:py-12">
            <p className="font-display text-3xl leading-[1.18] text-balance md:text-6xl">
              <em>"Someone may say it doesn't look like technology.</em> But my
              writing is about critical theory in AI. I am not building AI or
              selling chips. The site is about me — my books, my ideas, my
              writing, my art. My contribution to the West Indies.<em>"</em>
            </p>
            <p className="mt-10 eyebrow text-muted-foreground">Fazal Ali · 2026</p>
          </div>
        </Reveal>
      </section>

      {/* Tenets — numbered editorial list */}
      <section data-nav="dark" className="section-invert">
        <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
          <Reveal>
            <p className="eyebrow text-white/55">Tenets</p>
            <h2 className="mt-5 font-display text-4xl md:text-7xl">
              Six rules of the <em className="italic">house.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {tenets.map((t, i) => (
              <Reveal key={t.k} delay={i * 0.04}>
                <div className="bg-background p-8 md:p-10">
                  <p className="font-display text-5xl text-white/30">{t.k}</p>
                  <p className="mt-6 font-display text-2xl leading-tight">{t.t}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{t.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
        <div className="grid gap-px bg-foreground/15 md:grid-cols-2">
          <Link to="/writing" className="group flex flex-col gap-4 bg-background p-10 md:p-14">
            <p className="eyebrow text-muted-foreground">Begin reading</p>
            <p className="font-display text-3xl md:text-5xl">The journal.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Weekly notes on AI, education, and Caribbean futures.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              Open <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
          <Link to="/education-for-liberty" className="group flex flex-col gap-4 bg-background p-10 md:p-14">
            <p className="eyebrow text-muted-foreground">The book</p>
            <p className="font-display text-3xl md:text-5xl">Education for Liberty.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Built on Sen and Rawls. Read the full PDF, hear the podcast.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              Open <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
