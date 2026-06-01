import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { GlassPanel } from "@/components/site/GlassPanel";

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
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Brand identity</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.92] text-balance md:text-[8rem]">
          Omeros <em className="italic">AI.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-foreground/85">
          A name borrowed from Derek Walcott's epic. A practice of writing on artificial
          intelligence that refuses the industry's two default registers — boosterism and panic — and
          tries for a third: <em>literacy.</em>
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <GlassPanel strong className="mt-20 p-10 md:p-16">
          <p className="font-display text-3xl leading-[1.2] text-balance md:text-5xl">
            <em>“Someone may say it doesn't look like technology.</em> But my writing is about
            critical theory in AI. I am not building AI or selling chips. The site is about
            me — my books, my ideas, my writing, my art. My contribution to the West Indies.<em>”</em>
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.24em] text-muted-foreground">Fazal Ali · 2026</p>
        </GlassPanel>
      </Reveal>

      <section className="mt-28">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">Tenets.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tenets.map((t, i) => (
            <Reveal key={t.k} delay={i * 0.05}>
              <GlassPanel className="h-full p-7">
                <p className="font-display text-3xl text-muted-foreground">{t.k}</p>
                <p className="mt-4 font-display text-2xl leading-tight">{t.t}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t.b}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <div className="mt-24 text-center">
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm text-background"
          >
            Read the essays
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
