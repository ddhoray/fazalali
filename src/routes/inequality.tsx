import { CmsReadings, CmsTestimonials, CmsPalimpsest, useCmsEntries } from "@/components/site/CmsExtras";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { inequality } from "@/content/inequality";
import { articles } from "@/content/articles";
import { ArrowUpRight } from "lucide-react";
import { ImageMarquee } from "@/components/site/ImageMarquee";
import { assetUrl } from "@/lib/asset-url";
import img1 from "@/assets/inequality/1.asset.json";
import img2 from "@/assets/inequality/2.asset.json";
import img3 from "@/assets/inequality/3.asset.json";
import img4 from "@/assets/inequality/4.asset.json";
import img5 from "@/assets/inequality/5.asset.json";
import img6 from "@/assets/inequality/6.asset.json";
import img7 from "@/assets/inequality/7.asset.json";
import img8 from "@/assets/inequality/8.asset.json";
import img9 from "@/assets/inequality/9.asset.json";
import img10 from "@/assets/inequality/10.asset.json";

const rotation = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10].map((p) =>
  assetUrl(p),
);

export const Route = createFileRoute("/inequality")({
  head: () => ({
    meta: [
      { title: "Inequality, Education for Liberty | Fazal Ali" },
      {
        name: "description",
        content:
          "The capability gap, the inherited geometry of the colonial economy, and what the West Indian classroom owes the child who arrived hungry.",
      },
      { property: "og:title", content: "Inequality, Education for Liberty" },
      {
        property: "og:description",
        content: "A capability reading of inequality from a West Indian classroom.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/inequality" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/inequality" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Inequality, Education for Liberty",
          description:
            "The capability gap, the inherited geometry of the colonial economy, and what the West Indian classroom owes the child who arrived hungry.",
          datePublished: "2026-01-15",
          author: {
            "@type": "Person",
            name: "Fazal Ibrahim Ali",
            url: "https://omeros-cipher-glass.lovable.app/about",
          },
          publisher: { "@type": "Person", name: "Fazal Ibrahim Ali" },
          mainEntityOfPage: "https://omeros-cipher-glass.lovable.app/inequality",
        }),
      },
    ],
  }),
  component: InequalityPage,
});

const TRACK = /inherited inequalit|intergenerational immobilit|intergenerational inequalit/i;

const SELECTED_SLUGS = [
  "ai-and-a-digital-pause",
  "covid-19-in-a-dutch-diseased-economy",
  "ai-assemblages-and-the-end-of-historical-struggles",
];

const SELECTED = SELECTED_SLUGS.map((s) => articles.find((a) => a.slug === s)).filter(
  (a): a is (typeof articles)[number] => Boolean(a),
);


const tracked = articles
  .filter((a) => TRACK.test([a.title, a.excerpt, ...a.body].join(" ")))
  .slice(0, 8);

function InequalityPage() {
  return (
    <div>
      <PageHero
        eyebrow={inequality.eyebrow}
        title={
          <>
            {inequality.title.replace(/\.$/, "")}
            <em className="">.</em>
          </>
        }
        standfirst={inequality.standfirst}
        meta={
          <>
            <span>Journal</span>
            <span className="size-1 bg-white/40" />
            <span>{inequality.sections.length} parts</span>
            <span className="size-1 bg-white/40" />
            <span>After Sen</span>
          </>
        }
        image={rotation[0]}
        imageAlt="Field and archive photographs from the Caribbean"
      />

      <section className="border-b hairline">
        <div className="mx-auto max-w-[1500px] py-12">
          <p className="eyebrow px-5 text-muted-foreground sm:px-8">A set in rotation</p>
          <ImageMarquee
            images={rotation}
            alt="Rotating field and archive photographs"
            className="mt-6 w-full"
            speed={70}
          />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
          <p className="eyebrow text-muted-foreground">Selected readings</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
            Where the argument is carried further.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Three essays on rents, resource economies, and what the machine inherits from the
            struggles that came before it.
          </p>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {SELECTED.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.05}>
                <Link
                  to="/writing/$slug"
                  params={{ slug: a.slug }}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden border hairline bg-[#e9e6e1]">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="size-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {a.date}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{a.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/65">
                    {a.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 self-start border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.2em] transition-colors group-hover:border-foreground">
                    Read
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <CmsReadings page="inequality" />
        </div>
      </section>


      <article className="mx-auto max-w-[820px] px-5 py-12 sm:px-8 sm:py-10">
        {inequality.sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.04}>
            <section className="mb-16 last:mb-0">
              <p className="eyebrow text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · Section
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{s.h}</h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
                {s.body.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </article>

      <section className="border-t hairline bg-[#f5f3f0]">
        <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
          <p className="eyebrow text-muted-foreground">Traced through the essays</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
            Inherited inequality and intergenerational immobility.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            The recurring argument of the journal. These entries carry it directly.
          </p>

          <ul className="mt-10 border-t hairline">
            {tracked.map((a) => (
              <li key={a.slug} className="border-b hairline">
                <Link
                  to="/writing/$slug"
                  params={{ slug: a.slug }}
                  className="group grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-snug md:text-2xl">{a.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/65">
                      {a.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {a.date}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/writing"
            className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm uppercase tracking-[0.2em]"
          >
            All entries <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-6 px-5 py-10 sm:px-8">
          <p className="font-display text-3xl md:text-5xl">Read on.</p>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.2em]">
            <Link
              to="/ecology"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1"
            >
              Ecology <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/education-for-liberty"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1"
            >
              The Book <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
