import { useCmsEntries, useCmsSaved, useCmsText } from "@/components/site/CmsExtras";
import { withSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ImageExpand } from "@/components/site/ImageExpand";
import { palimpsest as builtinPalimpsest } from "@/content/palimpsest";
import heroPalimpsest from "@/assets/hero-palimpsest.jpg";

// An editorial rhythm of wide, square and upright photographs, without cards.
const photoLayouts = [
  { frame: "mr-auto w-[92%] md:w-[88%]", ratio: "aspect-[4/3]" },
  { frame: "ml-auto w-[82%] md:w-[66%]", ratio: "aspect-square" },
  { frame: "mx-auto w-full", ratio: "aspect-[16/10]" },
  { frame: "mr-auto w-[78%] md:ml-[8%] md:w-[58%]", ratio: "aspect-[4/5]" },
  { frame: "ml-auto w-[94%] md:w-[90%]", ratio: "aspect-[3/2]" },
  { frame: "mr-auto w-[86%] md:w-[72%]", ratio: "aspect-square" },
  { frame: "ml-auto w-[92%] md:w-[84%]", ratio: "aspect-[4/3]" },
  { frame: "mr-auto w-full md:w-[94%]", ratio: "aspect-[16/9]" },
  { frame: "mx-auto w-[82%] md:mr-[5%] md:w-[64%]", ratio: "aspect-square" },
  { frame: "mr-auto w-[94%] md:w-[86%]", ratio: "aspect-[5/4]" },
];

export const Route = createFileRoute("/palimpsest")({
  head: (ctx) =>
    withSeo("palimpsest", ctx, ({
    meta: [
      { title: "A Palimpsest of West Indian Education, Fazal Ali" },
      {
        name: "description",
        content:
          "A palimpsest of periods in West Indian education set inside a frame of world events before and after Columbus, traced from 1096 to 1979.",
      },
      { property: "og:title", content: "A Palimpsest of West Indian Education" },
      {
        property: "og:description",
        content: "Periods of West Indian education set inside a frame of world events.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/palimpsest" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/palimpsest" }],
  })),
  component: PalimpsestPage,
});

function PalimpsestPage() {
  const cms = useCmsEntries("palimpsest");
  const palimpsest = cms.length
    ? cms.map((e, i) => ({ id: `section-${i + 1}`, title: e.title, image: e.image_url ?? "", imageAlt: ((e.data as { alt?: string })?.alt) || e.title, imageCaption: e.subtitle ?? "", entries: (e.body ?? "").split(/\n\s*\n/).filter(Boolean).map((text) => ({ text })) }))
    : builtinPalimpsest;
  const heroTitle = useCmsText("palimpsest", "heroTitle");
  const heroIntro = useCmsText("palimpsest", "heroIntro");
  const heroEyebrow = useCmsSaved("palimpsest", "heroEyebrow");
  const heroImage = useCmsSaved("palimpsest", "heroImage") || heroPalimpsest;
  return (
    <div>
      <PageHero
        eyebrow={heroEyebrow || "Long read"}
        title={
          <>
            {heroTitle}
          </>
        }
        standfirst={
          <>
            {heroIntro}
          </>
        }
        meta={
          <>
            <span>10 sections</span>
            <span className="size-1 bg-muted-foreground/40" />
            <span>1096 → 1979</span>
            <span className="size-1 bg-muted-foreground/40" />
            <span>Sources: Williams · Campbell · PNM</span>
          </>
        }
      />

      <ImageExpand src={heroImage} alt="The Palimpsest opening image" height="h-[160vh]" />

      <section className="mx-auto max-w-[1800px] bg-background px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20 xl:gap-28">
          {/* Sticky section index */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-muted-foreground">Index</p>
            <nav className="mt-6 flex flex-col gap-3 border-l hairline pl-5">
              {palimpsest.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="font-mono text-[10px] opacity-50">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="leading-tight">{s.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Timeline */}
          <div className="min-w-0 space-y-24 md:space-y-36">
            {palimpsest.map((s, si) => {
              const layout = photoLayouts[si % photoLayouts.length];
              return (
              <Reveal key={s.id}>
                <section id={s.id} className="scroll-mt-32">
                  <div className="flex items-baseline gap-5 border-b hairline pb-6">
                    <span className="font-mono text-xs text-muted-foreground">
                      {(si + 1).toString().padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-3xl leading-tight md:text-5xl">{s.title}</h2>
                  </div>

                  <figure className={`palimpsest-photo my-12 md:my-16 ${layout.frame}`}>
                    <div className={`relative w-full overflow-hidden ${layout.ratio}`}>
                      <img
                        src={s.image}
                        alt={s.imageAlt}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-[1200ms] ease-out motion-safe:hover:scale-[1.03]"
                      />
                    </div>
                    {s.imageCaption ? (
                      <figcaption className="mt-3 text-xs text-muted-foreground">
                        {s.imageCaption}
                      </figcaption>
                    ) : null}
                  </figure>

                  <ol className="mx-auto mt-10 max-w-[760px] space-y-8">
                    {s.entries.map((e, ei) => (
                      <li key={ei} className="grid gap-4 md:grid-cols-[40px_1fr]">
                        <span className="font-mono text-xs text-muted-foreground md:pt-1.5">
                          ·{(ei + 1).toString().padStart(2, "0")}
                        </span>
                        <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
                          {e.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
