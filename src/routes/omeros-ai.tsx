import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "lucide-react";

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
    ],
  }),
  component: OmerosPage,
});

const tenets = [
  { k: "01", t: "Critical, not technical", b: "The work is theory. It interrogates AI rather than ships it. There are enough builders." },
  { k: "02", t: "From the islands", b: "The West Indies has always read empires from below. AI is another empire. The reading transfers." },
  { k: "03", t: "Slow writing", b: "Weekly essays, deliberately small, deliberately patient. The model is correspondence, not the feed." },
  { k: "04", t: "Books over posts", b: "The argument that matters happens at book length. Education for Liberty is the first. There will be more." },
  { k: "05", t: "Art is part of it", b: "Carnival, drone footage, photography, music — all signal. AI doesn't get to draw the boundary." },
  { k: "06", t: "Braver, now", b: "The new identity is more adventurous. Less polite. Still careful. There is a tone shift, on purpose." },
];

function OmerosPage() {
  return (
    <div>
      <PageHero
        eyebrow="Brand identity"
        title={<>Omeros <em className="italic">AI.</em></>}
        standfirst={
          <>
            A name borrowed from Derek Walcott's epic. A practice of writing on
            artificial intelligence that refuses the industry's two default
            registers — boosterism and panic — and tries for a third:{" "}
            <em>literacy.</em>
          </>
        }
        meta={
          <>
            <span>Critical theory · AI</span>
            <span className="size-1 bg-white/40" />
            <span>Six tenets</span>
            <span className="size-1 bg-white/40" />
            <span>Est. Trinidad</span>
          </>
        }
      />

      {/* Manifesto quote */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="border-y hairline py-16 md:py-24">
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
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="eyebrow text-white/55">Tenets</p>
            <h2 className="mt-5 font-display text-4xl md:text-7xl">
              Six rules of the <em className="italic">house.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {tenets.map((t, i) => (
              <Reveal key={t.k} delay={i * 0.04}>
                <div className="bg-black p-8 md:p-10">
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
      <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-px bg-foreground/15 md:grid-cols-2">
          <Link to="/writing" className="group flex flex-col gap-4 bg-background p-10 md:p-14">
            <p className="eyebrow text-muted-foreground">Begin reading</p>
            <p className="font-display text-3xl md:text-5xl">The essays.</p>
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
