import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { articles } from "@/content/articles";
import { ArrowUpRight } from "lucide-react";
import heroBook from "@/assets/hero-writing.jpg";

export const Route = createFileRoute("/writing/")({
  head: () => ({
    meta: [
      { title: "Journal, Essays on AI, Education & the West Indies by Fazal Ali" },
      {
        name: "description",
        content:
          "The journal of Fazal Ali, 140+ essays on critical theory in AI, education, ecology, inequality, decolonial thought, and the West Indian future.",
      },
      {
        name: "keywords",
        content:
          "Fazal Ali journal, critical theory AI, Caribbean AI, West Indies philosophy, decolonial AI, Omeros AI essays, Trinidad writing, AI ethics essays, education philosophy, algorithmic justice, Global South AI",
      },
      { property: "og:title", content: "Journal, Fazal Ali" },
      {
        property: "og:description",
        content: "140+ essays on critical theory in AI, education, and Caribbean futures.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/writing" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Journal, Fazal Ali" },
      {
        name: "twitter:description",
        content: "140+ essays on critical theory in AI, education, and Caribbean futures.",
      },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/writing" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The Fazal Ali Journal",
          description: "Essays on critical theory in AI, education, and the West Indies.",
          url: "https://omeros-cipher-glass.lovable.app/writing",
          author: {
            "@type": "Person",
            name: "Fazal Ibrahim Ali",
            url: "https://omeros-cipher-glass.lovable.app/about",
          },
          inLanguage: "en",
          blogPost: articles.slice(0, 20).map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            url: `https://omeros-cipher-glass.lovable.app/writing/${a.slug}`,
            datePublished: a.date,
            image: a.image,
            keywords: (a.tags ?? []).join(", "),
          })),
        }),
      },
    ],
  }),
  component: WritingIndex,
});

function fmtDate(d: string) {
  const [year, month, day] = d.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1, day)));
}

function WritingIndex() {
  const [featured, ...rest] = articles;

  return (
    <div>
      <PageHero
        eyebrow="Journal"
        title={
          <>
            Entries, slowly, <em className="">often.</em>
          </>
        }
        standfirst={
          <>
            A weekly note on AI, education and the West Indian future. Read in order, or pick a
            thread.
          </>
        }
        meta={
          <>
            <span>{articles.length} entries</span>
            <span className="size-1 bg-white/40" />
            <span>Updated weekly</span>
            <span className="size-1 bg-white/40" />
            <span>Critical theory · AI · Caribbean futures</span>
          </>
        }
        image={heroBook}
        imageAlt="A stack of books on a dark surface"
      />

      {/* Featured */}
      <section className="border-b hairline">
        <Link to="/writing/$slug" params={{ slug: featured.slug }} className="group block">
          <div className="mx-auto grid max-w-[1700px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:gap-16 md:py-14">
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
                <h2 className="mt-6 font-display text-4xl leading-[1.02] text-balance md:text-6xl">
                  {featured.title}
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
                  <span>Read entry</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="ml-4 opacity-60">{fmtDate(featured.date)}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Link>
      </section>

      {/* Editorial grid, alternating */}
      <section className="mx-auto max-w-[1700px] px-5 py-12 sm:px-8 sm:py-14">
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
                  Read entry{" "}
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
