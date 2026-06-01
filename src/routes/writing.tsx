import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { GlassPanel } from "@/components/site/GlassPanel";
import { articles } from "@/content/articles";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing — Fazal Ali" },
      {
        name: "description",
        content:
          "Essays and articles by Fazal Ali on critical theory in AI, education, infrastructure, and the West Indies.",
      },
      { property: "og:title", content: "Writing — Fazal Ali" },
      {
        property: "og:description",
        content: "Essays on critical theory in AI from the West Indies.",
      },
    ],
  }),
  component: WritingIndex,
});

function WritingIndex() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Writing</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95] text-balance md:text-8xl">
          Essays, slowly, <em className="italic">often.</em>
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          A weekly note on AI, education, and the West Indian future. Read in order or pick a thread.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Link to="/writing/$slug" params={{ slug: a.slug }} className="group block h-full">
              <GlassPanel className="flex h-full flex-col p-7 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{a.topic}</span>
                  <span>{new Date(a.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                </div>
                <h2 className="mt-6 font-display text-2xl leading-tight text-balance">{a.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground text-pretty">{a.excerpt}</p>
                <div className="mt-8 inline-flex items-center gap-1 text-sm">
                  Read essay <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </GlassPanel>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
