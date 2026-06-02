import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { articles } from "@/content/articles";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Articles — Fazal Ali" },
      {
        name: "description",
        content:
          "Essays and articles by Fazal Ali on critical theory in AI, education, infrastructure, and the West Indies.",
      },
      { property: "og:title", content: "Articles — Fazal Ali" },
      { property: "og:description", content: "Essays on critical theory in AI from the West Indies." },
    ],
  }),
  component: WritingIndex,
});

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function WritingIndex() {
  const [featured, ...rest] = articles;

  return (
    <div>
      <PageHero
        eyebrow="Articles"
        title={
          <>
            Essays, slowly, <em className="italic">often.</em>
          </>
        }
        standfirst={
          <>
            A weekly note on AI, education and the West Indian future. Read in
            order, or pick a thread.
          </>
        }
        meta={
          <>
            <span>{articles.length} essays</span>
            <span className="size-1 bg-white/40" />
            <span>Updated weekly</span>
            <span className="size-1 bg-white/40" />
            <span>Critical theory · AI · Caribbean futures</span>
          </>
        }
      />

      {/* Featured */}
      <section className="border-b hairline">
        <Link
          to="/writing/$slug"
          params={{ slug: featured.slug }}
          className="group block"
        >
          <div className="mx-auto grid max-w-[1700px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16 md:py-28">
            <Reveal>
              <div className="relative aspect-[5/4] overflow-hidden bg-foreground/5">
                <img
                  src={featured.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-center">
                <p className="eyebrow text-muted-foreground">Featured · {featured.topic}</p>
                <h2 className="mt-6 font-display text-4xl leading-[1.02] text-balance md:text-7xl">
                  {featured.title}
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
                  <span>Read essay</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="ml-4 opacity-60">{fmtDate(featured.date)}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Link>
      </section>

      {/* Editorial grid — alternating */}
      <section className="mx-auto max-w-[1700px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 md:gap-y-28">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 2) * 0.06}>
              <Link
                to="/writing/$slug"
                params={{ slug: a.slug }}
                className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                </div>
                <div className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span>{a.topic}</span>
                  <span className="size-1 bg-muted-foreground/60" />
                  <span>{fmtDate(a.date)}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl leading-tight text-balance md:text-4xl">
                  {a.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {a.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm">
                  Read essay{" "}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
