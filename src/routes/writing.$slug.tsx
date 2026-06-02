import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { GlassPanel } from "@/components/site/GlassPanel";
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
          ],
        }
      : { meta: [{ title: "Essay — Fazal Ali" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center">
      <h1 className="font-display text-4xl">Essay not found</h1>
      <Link to="/writing" className="mt-6 inline-block underline">All writing</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl">This essay didn't load</h1>
        <button onClick={reset} className="mt-6 underline">Try again</button>
      </div>
    );
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const i = articles.findIndex((a) => a.slug === article.slug);
  const next = articles[(i + 1) % articles.length];

  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <Reveal>
        <Link to="/writing" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3" /> All writing
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>{article.topic}</span>
          <span className="size-1 rounded-none bg-muted-foreground/60" />
          <time>
            {new Date(article.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
          </time>
        </div>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] text-balance md:text-7xl">
          {article.title}
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-muted-foreground text-pretty">
          {article.excerpt}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="prose-essay mt-16 space-y-7 text-lg leading-[1.75] text-foreground/85">
          {article.body.map((p: string, idx: number) => (
            <p key={idx} className={idx === 0 ? "first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:mr-2 first-letter:float-left first-letter:mt-1" : ""}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <GlassPanel className="mt-24 p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Next essay</p>
          <Link to="/writing/$slug" params={{ slug: next.slug }} className="mt-3 block font-display text-3xl leading-tight">
            {next.title}
          </Link>
        </GlassPanel>
      </Reveal>
    </article>
  );
}
