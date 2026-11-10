import { createFileRoute, Link } from "@tanstack/react-router";
import { withSeo } from "@/lib/seo";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "lucide-react";
import { ImageMarquee } from "@/components/site/ImageMarquee";
import { assetUrl } from "@/lib/asset-url";
import om44 from "@/assets/omeros/44.asset.json";
import om45 from "@/assets/omeros/45.asset.json";
import om46 from "@/assets/omeros/46.asset.json";
import om47 from "@/assets/omeros/47.asset.json";
import om48 from "@/assets/omeros/48.asset.json";
import { useCmsEntries, useCmsText } from "@/components/site/CmsExtras";

const omerosImages = [om44, om45, om46, om47, om48].map((a) => assetUrl(a));

export const Route = createFileRoute("/omeros-ai")({
  head: (ctx) =>
    withSeo("omeros", ctx, ({
    meta: [
      { title: "Omeros AI, A Caribbean voice in artificial intelligence" },
      {
        name: "description",
        content:
          "Omeros AI is a Caribbean initiative to spark open debate, build skills, and make the West Indies a strategic AI hub by 2030.",
      },
      { property: "og:title", content: "Omeros AI, A Caribbean voice in artificial intelligence" },
      {
        property: "og:description",
        content:
          "Prophet provocateur for AI in the West Indies, convening, capacity-building, and Global South leadership in AI governance.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/omeros-ai" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/omeros-ai" }],
  })),
  component: OmerosPage,
});

const pillars = [
  {
    k: "01",
    t: "Prophet provocateur",
    b: "Be a prophet provocateur for AI in the West Indies, starting honest public debate that refuses both hype and panic.",
  },
  {
    k: "02",
    t: "Open source & AI security",
    b: "Support the adoption of open-source AI innovations across the Caribbean, alongside the AI security initiatives that make that adoption safe.",
  },
  {
    k: "03",
    t: "Convene the frontier",
    b: "Bring AI experts from Google, Apple, NVIDIA, Netflix, AWS, OpenAI, Anthropic, Google DeepMind, Hugging Face, Lovable, Cursor and leading OSS communities into Caribbean rooms.",
  },
  {
    k: "04",
    t: "Build capacity",
    b: "Deliver workshops, fellowships and curricula that grow AI literacy and engineering depth across the region, from school benches to government cabinets.",
  },
  {
    k: "05",
    t: "Industrial digitalisation",
    b: "Drive autonomous machines, robotics, accelerated computing, data centres, national data libraries and data embassies across the Caribbean.",
  },
  {
    k: "06",
    t: "Fair algorithms, fair knowledge",
    b: "Make sure algorithms are fair and that small island developing states are counted, measured and represented on their own terms.",
  },
  {
    k: "07",
    t: "Global–local linkages",
    b: "Link AI adoption in Brazil, Chile and Uruguay to SIDS in the West Indies, and nest regional initiatives inside global AI agendas and projects.",
  },
  {
    k: "08",
    t: "Energy-aware architectures",
    b: "Accelerate AI-optimised architectures that augment performance while reducing energy cost, from cloud to edge, so high-performance AI is democratised, not gated.",
  },
];

const goals = [
  {
    year: "2026",
    title: "Caribbean Algorithmic Equity Framework",
    body: "Launch a regional framework on fair algorithms and fair representation, designed in the Caribbean, built for small islands, shared outward.",
  },
  {
    year: "2029",
    title: "15 joint LATAM–Caribbean AI products",
    body: "Formal partnerships with Brazil, Chile and Uruguay on shared datasets, talent exchange and joint ventures, yielding 15 cross-border products serving both markets.",
  },
  {
    year: "2030",
    title: "Caribbean as a strategic AI hub",
    body: "Measured by regional AI startups scaled, government AI policies adopted, and Caribbean representation in global standards bodies, UN, G20, OECD and frontier-lab safety protocols.",
  },
];

function OmerosPage() {
  const heroTitle = useCmsText("omeros", "heroTitle");
  const heroIntro = useCmsText("omeros", "heroIntro");
  const manifesto = useCmsText("omeros", "manifesto");
  const cmsItems = useCmsEntries("omeros");
  const cmsPillars = cmsItems.filter((i) => (i.data as { page?: string })?.page === "pillar").map((i, n) => ({ k: i.subtitle ?? String(n + 1).padStart(2, "0"), t: i.title, b: i.body ?? "" }));
  const cmsGoals = cmsItems.filter((i) => (i.data as { page?: string })?.page === "goal").map((i) => ({ year: i.subtitle ?? "", title: i.title, body: i.body ?? "" }));
  const displayedPillars = cmsPillars.length ? cmsPillars : pillars;
  const displayedGoals = cmsGoals.length ? cmsGoals : goals;
  return (
    <div>
      <PageHero
        cmsKey="omeros"
        eyebrow="The initiative"
        title={
          <>
            {heroTitle}
          </>
        }
        standfirst={heroIntro ? <>{heroIntro}</> : undefined}
        meta={
          <>
            <span>AI in the West Indies</span>
            <span className="size-1 bg-white/40" />
            <span>Eight pillars</span>
            <span className="size-1 bg-white/40" />
            <span>Hub by 2030</span>
          </>
        }
        image={omerosImages[0]}
        imageAlt="A research campus, solar roof and sphere, the infrastructure of intelligence"
      />

      {/* Field images */}
      <section className="mx-auto max-w-[1500px] px-5 pt-10 sm:px-8">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Field notes</p>
          <ImageMarquee
            images={omerosImages}
            alt="Research campuses and laboratories visited for Omeros AI"
            className="mt-6 w-full"
            speed={70}
          />
        </Reveal>
      </section>

      {/* Manifesto quote */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-10">
        <Reveal>
          <div className="border-y hairline py-10 md:py-12">
            <p className="font-display text-3xl leading-[1.18] text-balance md:text-6xl">
               <em>"</em>{manifesto}<em>"</em>
            </p>
            <p className="mt-10 eyebrow text-muted-foreground">Fazal Ali · 2026</p>
          </div>
        </Reveal>
      </section>

      {/* Pillars, what Omeros AI sets out to do */}
      <section data-nav="dark" className="section-invert">
        <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
          <Reveal>
            <p className="eyebrow text-white/55">What Omeros AI sets out to do</p>
            <h2 className="mt-5 font-display text-4xl md:text-6xl">Eight pillars of the work.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              From convening the world's frontier labs in the Caribbean to driving open-source
              adoption, industrial digitalisation and algorithmic fairness, the work is plural, and
              it is regional.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-4">
             {displayedPillars.map((t, i) => (
              <Reveal key={t.k} delay={i * 0.04}>
                <div className="bg-background p-8 md:p-10 h-full">
                  <p className="font-display text-5xl text-white/30">{t.k}</p>
                  <p className="mt-6 font-display text-2xl leading-tight">{t.t}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{t.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic goals */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Where we are headed</p>
          <h2 className="mt-5 font-display text-4xl md:text-6xl">
            Strategic horizons, 2026, 2029, 2030.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Concrete commitments on a fixed timeline, a flagship summit series connecting 500+
            regional builders annually with teams from OpenAI, Anthropic, Google DeepMind, NVIDIA,
            AWS, Hugging Face and key OSS communities, with a target of 50+ cross-border
            collaborations a year.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px bg-foreground/15 md:grid-cols-3">
           {displayedGoals.map((g, i) => (
            <Reveal key={g.year} delay={i * 0.06}>
              <div className="bg-background p-8 md:p-10 h-full">
                <p className="font-display text-6xl text-accent">{g.year}</p>
                <p className="mt-6 font-display text-2xl leading-tight">{g.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
        <div className="grid gap-px bg-foreground/15 md:grid-cols-2">
          <Link to="/writing" className="group flex flex-col gap-4 bg-background p-10 md:p-14">
            <p className="eyebrow text-muted-foreground">Begin reading</p>
            <p className="font-display text-3xl md:text-5xl">The journal.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Notes on AI, education, and Caribbean futures.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              Open{" "}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
          <Link
            to="/education-for-liberty"
            className="group flex flex-col gap-4 bg-background p-10 md:p-14"
          >
            <p className="eyebrow text-muted-foreground">The book</p>
            <p className="font-display text-3xl md:text-5xl">Education for Liberty.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Built on Sen and Rawls. Read the full PDF, hear the podcast.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              Open{" "}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
