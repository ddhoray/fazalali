import { CmsTestimonials, useCmsEntries, useCmsText } from "@/components/site/CmsExtras";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "lucide-react";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fazalPortrait from "@/assets/fazal-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Profile, Fazal Ibrahim Ali" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali, Cambridge Commonwealth Scholar, former Provost of UTT, and writer on critical theory in AI from the West Indies.",
      },
      { property: "og:title", content: "Profile, Fazal Ibrahim Ali" },
      {
        property: "og:description",
        content:
          "Cambridge Commonwealth Scholar, scholar of Amartya Sen and John Rawls, writer on AI from the West Indies.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/about" }],
  }),
  component: AboutPage,
});

const concerns = [
  "Screen economies",
  "The Law of AI & policy intent",
  "Epistemic justice",
  "Algorithmic fairness",
  "Data embassies",
  "National data libraries",
  "Cybersecurity of critical infrastructure",
  "Low-orbit satellite connectivity",
  "AI-driven surveillance",
  "Technological sovereignty",
  "Data architectures",
  "Data fabric of state enterprises",
  "Autonomous creative economies",
  "Prosperity engines & specialised education",
  "Intelligent failure",
  "Intellectual property of AI",
  "Democratic drift",
  "Economic geography of AI",
  "Electronic personhood for AI",
];

const roles = [
  {
    year: "UWI · MPhil",
    text: "Completed his Masters in Philosophy at the University of the West Indies.",
  },
  {
    year: "Cambridge",
    text: "Commonwealth Scholar who read for his doctorate at the University of Cambridge, Hughes Hall, and the University of the West Indies as a split site PhD candidate. Influenced there by Nobel laureate Amartya Sen, Sir Leszek Borysiewicz, C. W. R. D. Moseley, and Lord Martin Rees.",
  },
  {
    year: "UWI · ICT",
    text: "Planned and organised the international conference launching The Institute of Critical Thinking at the University of the West Indies, mirroring the innovation and entrepreneurship model of the Hebrew University of Jerusalem.",
  },
  {
    year: "UWI · Evening University",
    text: "Head of Evening University at The UWI, widening pathways into higher education for working adults across the Caribbean.",
  },
  {
    year: "UCSIS",
    text: "Secretary to the University Consortium of Small Island States (UCSIS) at the UWI Office of Graduate Studies and Research, a Kofi Annan mandate uniting the universities of Malta, the South Pacific, the US Virgin Islands, the West Indies, and Mauritius into a global capacity-building team for SIDS.",
  },
  {
    year: "Lok Jack GSB",
    text: "Programme Director of the DBA programme at the Arthur Lok Jack Graduate School of Business, UWI.",
  },
  {
    year: "UTT",
    text: "Provost of the University of Trinidad and Tobago; established the UTT Aviation Campus and served as acting President.",
  },
  { year: "UNESCO", text: "Member of the UNESCO Memory of the World team in Trinidad and Tobago." },
  {
    year: "TSC",
    text: "Chairman of the Teaching Service Commission of Trinidad and Tobago, a statutory body of the State.",
  },
  {
    year: "NIHERST",
    text: "President of the National Institute of Higher Education, Research, Science and Technology, the country's lead body for STEM popularisation and applied research.",
  },
  {
    year: "IDB",
    text: "External services consultant with the Inter-American Development Bank (IDB).",
  },
];

function AboutPage() {
  const heroEyebrow = useCmsText("profile", "heroEyebrow");
  const heroTitle = useCmsText("profile", "heroTitle");
  const heroIntro = useCmsText("profile", "heroIntro");
  const aboutBody = useCmsText("profile", "aboutBody");
  const cmsRoles = useCmsEntries("profile_roles");
  const displayedRoles = cmsRoles.length ? cmsRoles.map((role) => ({ year: role.title, text: role.body ?? "" })) : roles;
  return (
    <div>
      <PageHero
        cmsKey="profile"
        eyebrow={heroEyebrow}
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
            <span>Trinidad &amp; Tobago</span>
            <span className="size-1 bg-white/40" />
            <span>Cambridge · UWI · UTT</span>
            <span className="size-1 bg-white/40" />
            <span>Omeros AI</span>
          </>
        }
      />

      {/* Portrait + profile details */}
      <section className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-20">
          {/* Left: portrait column */}
          <Reveal>
            <figure className="lg:sticky lg:top-28">
              <img
                src={fazalPortrait}
                alt="Dr. Fazal Ibrahim Ali"
                className="aspect-[4/5] w-full border hairline object-cover"
                loading="lazy"
              />
              <figcaption className="mt-4 eyebrow text-muted-foreground">
                Dr. Fazal Ibrahim Ali
              </figcaption>
            </figure>
          </Reveal>

          {/* Right: text column */}
          <div className="min-w-0">
            <Reveal>
              <p className="max-w-[62ch] text-xl leading-[1.5] text-foreground md:text-[26px] md:leading-[1.42]">
                Fazal Ali disrupts the status quo to reveal uncomfortable truths. Work that
                unsettles, and forces Latin America and the Caribbean to confront its inheritance of
                inherited inequality and intergenerational immobility.
              </p>
            </Reveal>

            <div className="mt-12 border-t hairline">
              <Reveal delay={0.08}>
                <div className="grid gap-2 border-b hairline py-8 xl:grid-cols-[160px_minmax(0,1fr)] xl:gap-10">
                  <p className="eyebrow text-muted-foreground xl:pt-1">About</p>
                  <p className="max-w-[60ch] text-base leading-[1.7] text-foreground/85 md:text-[17px]">
                    {aboutBody}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="grid gap-2 border-b hairline py-8 xl:grid-cols-[160px_minmax(0,1fr)] xl:gap-10">
                  <p className="eyebrow text-muted-foreground xl:pt-1">Background</p>
                  <p className="max-w-[60ch] text-base leading-[1.7] text-muted-foreground md:text-[17px]">
                    A Commonwealth Scholarship winner who read for his doctorate at the University
                    of Cambridge and the University of the West Indies as a split site PhD
                    candidate. Nobel laureate Amartya Sen, Sir Leszek Borysiewicz, C. W. R. D.
                    Moseley and Lord Martin Rees shaped his thinking.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="grid gap-2 border-b hairline py-8 xl:grid-cols-[160px_minmax(0,1fr)] xl:gap-10">
                  <p className="eyebrow text-muted-foreground xl:pt-1">Contact</p>
                  <p className="max-w-[60ch] text-base leading-[1.7] text-muted-foreground md:text-[17px]">
                    He can be reached at{" "}
                    <a
                      href="mailto:fazalalitsc@gmail.com"
                      className="underline underline-offset-4 decoration-accent-cool hover:text-accent-cool transition-colors"
                    >
                      fazalalitsc@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Concerns, what his work explores */}
      <section data-nav="dark" className="section-invert">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-white/55">What the work explores</p>
            <h2 className="mt-5 font-display text-4xl md:text-6xl">
              Screen economies, the Law of AI, and policy intent.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
              A working index of the concerns that move across his essays and consultancies.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-12 flex flex-wrap gap-2.5">
              {concerns.map((c) => (
                <li key={c} className="border border-white/20 px-4 py-2 text-sm text-white/85">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Pull-quote band */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="font-display text-3xl leading-[1.15] text-balance md:text-6xl">
            <em className="text-muted-foreground">"</em>Standing on the shoulders of Amartya Sen's
            Development as Freedom and John Rawls' A Theory of Justice, Omeros AI builds a body of
            work that adds to the critical theory on AI, written from the West Indies.
            <em className="text-muted-foreground">"</em>
          </p>
          <p className="mt-10 eyebrow text-muted-foreground">Fazal Ali · Omeros AI</p>
        </Reveal>
      </section>

      {/* Professional background */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Professional background</p>
          <h2 className="mt-5 font-display text-4xl md:text-6xl">
            Institutional <em className="text-accent">work.</em>
          </h2>
        </Reveal>
        <div className="mt-16 border-t hairline">
           {displayedRoles.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.04}>
              <div className="grid gap-3 border-b hairline py-8 md:grid-cols-[240px_1fr] md:gap-12 md:py-10">
                <p className="font-display text-2xl leading-none md:text-3xl">{m.year}</p>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
                  {m.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-wrap items-end justify-between gap-6">
            <p className="font-display text-3xl md:text-5xl">Get in touch.</p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openContactDrawer()}
                className="btn-cta btn-primary"
              >
                Write to him <ArrowUpRight className="size-4" />
              </button>
              <Link to="/writing" className="btn-cta btn-on-light">
                Read the journal
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <CmsTestimonials />
    </div>
  );
}
