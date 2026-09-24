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
  head: ({ loaderData, params }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.article.title}, Fazal Ali` },
            { name: "description", content: loaderData.article.excerpt },
            ...(loaderData.article.tags && loaderData.article.tags.length
              ? [{ name: "keywords", content: loaderData.article.tags.join(", ") }]
              : []),
            { name: "author", content: "Fazal Ibrahim Ali" },
            { name: "article:published_time", content: loaderData.article.date },
            { name: "article:section", content: loaderData.article.topic },
            ...(loaderData.article.tags ?? []).map((t: string) => ({
              property: "article:tag",
              content: t,
            })),
            { property: "og:title", content: loaderData.article.title },
            { property: "og:description", content: loaderData.article.excerpt },
            { property: "og:type", content: "article" },
            { property: "og:image", content: loaderData.article.image },
            {
              property: "og:url",
              content: `https://omeros-cipher-glass.lovable.app/writing/${params.slug}`,
            },
            { name: "twitter:image", content: loaderData.article.image },
            { name: "twitter:card", content: "summary_large_image" },
          ],
          links: [
            {
              rel: "canonical",
              href: `https://omeros-cipher-glass.lovable.app/writing/${params.slug}`,
            },
          ],
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Article",
                    headline: loaderData.article.title,
                    description: loaderData.article.excerpt,
                    image: [loaderData.article.image],
                    datePublished: loaderData.article.date,
                    dateModified: loaderData.article.date,
                    articleSection: loaderData.article.topic,
                    keywords: (loaderData.article.tags ?? []).join(", "),
                    wordCount: loaderData.article.body.join(" ").split(/\s+/).length,
                    articleBody: [
                      ...loaderData.article.body,
                      ...(loaderData.article.principles ?? []).flatMap((principle) => [
                        principle.title,
                        principle.body,
                      ]),
                    ].join("\n\n"),
                    inLanguage: "en",
                    author: {
                      "@type": "Person",
                      name: "Fazal Ibrahim Ali",
                      url: "https://omeros-cipher-glass.lovable.app/about",
                    },
                    publisher: {
                      "@type": "Person",
                      name: "Fazal Ibrahim Ali",
                    },
                    mainEntityOfPage: `https://omeros-cipher-glass.lovable.app/writing/${params.slug}`,
                  },
                  {
                    "@type": "BreadcrumbList",
                    itemListElement: [
                      {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://omeros-cipher-glass.lovable.app/",
                      },
                      {
                        "@type": "ListItem",
                        position: 2,
                        name: "Journal",
                        item: "https://omeros-cipher-glass.lovable.app/writing",
                      },
                      {
                        "@type": "ListItem",
                        position: 3,
                        name: loaderData.article.title,
                        item: `https://omeros-cipher-glass.lovable.app/writing/${params.slug}`,
                      },
                    ],
                  },
                ],
              }),
            },
          ],
        }
      : { meta: [{ title: "Journal, Fazal Ali" }] },

  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-10 text-center">
      <h1 className="font-display text-4xl">Entry not found</h1>
      <Link to="/writing" className="mt-6 inline-block underline">
        All entries
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="mx-auto max-w-3xl px-5 py-10 text-center">
        <h1 className="font-display text-4xl">This entry didn't load</h1>
        <button onClick={reset} className="mt-6 underline">
          Try again
        </button>
      </div>
    );
  },
  component: ArticlePage,
});

function fmtDate(d: string) {
  const [year, month, day] = d.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1, day)));
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const i = articles.findIndex((a) => a.slug === article.slug);
  const next = articles[(i + 1) % articles.length];
  const readingTime = Math.max(3, Math.round(article.body.join(" ").split(/\s+/).length / 220));

  return (
    <article>
      {/* Dark cinematic hero with image backdrop */}
      <section data-nav="dark" className="section-invert relative isolate w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={article.image} alt="" className="size-full object-cover opacity-[0.35]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3" /> All entries
          </Link>
          <p className="eyebrow mt-12 text-white/60">{article.topic}</p>
          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.02] text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            {article.title}
          </h1>
          <p className="mt-10 max-w-3xl text-xl leading-relaxed text-white/80">{article.excerpt}</p>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.22em] text-white/55">
            <time>{fmtDate(article.date)}</time>
            <span className="size-1 bg-white/40" />
            <span>{readingTime} min read</span>
            <span className="size-1 bg-white/40" />
            <span>Fazal Ali</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="mx-auto max-w-5xl px-5 pt-12 sm:px-8">
        <Reveal>
          <figure className="relative aspect-[16/9] w-full overflow-hidden border border-foreground/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
            <img
              src={article.image}
              alt={article.title}
              className="size-full object-cover"
              loading="eager"
            />
          </figure>
        </Reveal>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-10">
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
            {article.principles?.map((principle) => (
              <section key={principle.title} className="border-t border-foreground/15 pt-7">
                <h2 className="font-display text-2xl leading-snug sm:text-3xl">{principle.title}</h2>
                <p className="mt-4">{principle.body}</p>
              </section>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <hr className="my-20 border-foreground/15" />
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            , Fazal Ali · {fmtDate(article.date)} -
          </p>
        </Reveal>
      </section>

      {/* Next entry dark band */}
      <section data-nav="dark" className="section-invert">
        <Link to="/writing/$slug" params={{ slug: next.slug }} className="group block">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow text-white/55">Next entry · {next.topic}</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-6xl">
                {next.title}
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/65 md:text-lg">{next.excerpt}</p>
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
