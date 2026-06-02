import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { articles } from "@/content/articles";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.article.title} — Fazal Ali` },
            { name: "description", content: loaderData.article.excerpt },
            { property: "og:title", content: loaderData.article.title },
            { property: "og:description", content: loaderData.article.excerpt },
            { property: "og:type", content: "article" },
            { property: "og:image", content: loaderData.article.image },
          ],
        }
      : { meta: [{ title: "Essay — Fazal Ali" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl">Essay not found</h1>
      <Link to="/writing" className="mt-6 inline-block underline">All articles</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">This essay didn't load</h1>
        <button onClick={reset} className="mt-6 underline">Try again</button>
      </div>
    );
  },
  component: ArticlePage,
});

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const i = articles.findIndex((a) => a.slug === article.slug);
  const next = articles[(i + 1) % articles.length];
  const readingTime = Math.max(
    3,
    Math.round(article.body.join(" ").split(/\s+/).length / 220),
  );

  return (
    <article>
      {/* Dark cinematic hero with image backdrop */}
      <section
        data-nav="dark"
        className="section-invert relative isolate w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt=""
            className="size-full object-cover opacity-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-40 sm:px-8 sm:pb-32 sm:pt-48">
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3" /> All articles
          </Link>
          <p className="eyebrow mt-12 text-white/60">{article.topic}</p>
          <h1 className="mt-6 font-display text-5xl leading-[0.98] text-balance md:text-8xl">
            {article.title}
          </h1>
          <p className="mt-10 max-w-3xl text-xl leading-relaxed text-white/80">
            {article.excerpt}
          </p>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.22em] text-white/55">
            <time>{fmtDate(article.date)}</time>
            <span className="size-1 bg-white/40" />
            <span>{readingTime} min read</span>
            <span className="size-1 bg-white/40" />
            <span>Fazal Ali</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="prose-essay space-y-7 text-lg leading-[1.8] text-foreground/85">
            {article.body.map((p: string, idx: number) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "first-letter:font-display first-letter:text-7xl first-letter:leading-none first-letter:mr-3 first-letter:float-left first-letter:mt-2"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <hr className="my-20 border-foreground/15" />
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            — Fazal Ali · {fmtDate(article.date)} —
          </p>
        </Reveal>
      </section>

      {/* Next essay dark band */}
      <section data-nav="dark" className="section-invert">
        <Link
          to="/writing/$slug"
          params={{ slug: next.slug }}
          className="group block"
        >
          <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow text-white/55">Next essay · {next.topic}</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-6xl">
                {next.title}
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/65 md:text-lg">
                {next.excerpt}
              </p>
            </div>
            <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-white">
              Read next
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
