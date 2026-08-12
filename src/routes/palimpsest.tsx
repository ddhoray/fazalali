import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { palimpsest } from "@/content/palimpsest";
import heroPalimpsest from "@/assets/hero-palimpsest.jpg";

export const Route = createFileRoute("/palimpsest")({
 head: () => ({
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
    ],
 links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/palimpsest" },
    ],
  }),
 component: PalimpsestPage,
});

function PalimpsestPage() {
 return (
    <div>
      <PageHero
 eyebrow="Long read"
 title={
          <>
            A palimpsest of West Indian <em className="">education.</em>
          </>
        }
 standfirst={
          <>
            Set inside a frame of world events before and after Christopher
            Columbus set sail for the New World in 1492, from Oxford in 1096
 to the JFK Library in 1969, from the Encomienda to Eric Williams.
          </>
        }
 meta={
          <>
            <span>10 sections</span>
            <span className="size-1 bg-white/40" />
            <span>1096 → 1979</span>
            <span className="size-1 bg-white/40" />
            <span>Sources: Williams · Campbell · PNM</span>
          </>
        }
 image={heroPalimpsest}
 imageAlt="An open manuscript on a dark desk"
      />

      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
        <div className="grid gap-16 lg:grid-cols-[260px_1fr] lg:gap-24">
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
          <div className="space-y-24">
            {palimpsest.map((s, si) => (
              <Reveal key={s.id}>
                <section id={s.id} className="scroll-mt-32">
                  <div className="flex items-baseline gap-5 border-b hairline pb-6">
                    <span className="font-mono text-xs text-muted-foreground">
                      {(si + 1).toString().padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-3xl leading-tight md:text-5xl">
                      {s.title}
                    </h2>
                  </div>

                  <figure className="mt-10 overflow-hidden bg-foreground/5">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <img
 src={s.image}
 alt={s.imageAlt}
 loading="lazy"
 className="size-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                      />
                    </div>
                    {s.imageCaption ? (
                      <figcaption className="mt-3 text-xs text-muted-foreground">
                        {s.imageCaption}
                      </figcaption>
                    ) : null}
                  </figure>

                  <ol className="mt-10 space-y-8">
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
