import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "lucide-react";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fazalPortrait from "@/assets/fazal-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Profile — Fazal Ibrahim Ali" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali — Cambridge Commonwealth Scholar, former Provost of UTT, and writer on critical theory in AI from the West Indies.",
      },
      { property: "og:title", content: "Profile — Fazal Ibrahim Ali" },
      {
        property: "og:description",
        content:
          "Cambridge Commonwealth Scholar, scholar of Amartya Sen and John Rawls, writer on AI from the West Indies.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/about" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/about" },
    ],
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
  { year: "Cambridge", text: "Commonwealth Scholar at the University of Cambridge as a split-site doctoral candidate. Influenced there by Nobel laureate Amartya Sen, Sir Leszek Borysiewicz, C. W. R. D. Moseley, and Lord Martin Rees." },
  { year: "UWI · ICT", text: "Planned and organised the international conference launching The Institute of Critical Thinking at the University of the West Indies — mirroring the innovation and entrepreneurship model of the Hebrew University of Jerusalem." },
  { year: "UWI · Evening University", text: "Head of Evening University at The UWI — widening pathways into higher education for working adults across the Caribbean." },
  { year: "UCSIS", text: "Secretary to the University Consortium of Small Island States (UCSIS) at the UWI Office of Graduate Studies and Research — a Kofi Annan mandate uniting the universities of Malta, the South Pacific, the US Virgin Islands, the West Indies, and Mauritius into a global capacity-building team for SIDS." },
  { year: "Lok Jack GSB", text: "Programme Director of the DBA programme at the Arthur Lok Jack Graduate School of Business, UWI." },
  { year: "UTT", text: "Provost of the University of Trinidad and Tobago; established the UTT Aviation Campus and served as acting President." },
  { year: "UNESCO · TSC", text: "Member of the UNESCO Memory of the World team in Trinidad and Tobago; Chairman of the Teaching Service Commission of Trinidad and Tobago." },
  { year: "NIHERST", text: "President of the National Institute of Higher Education, Research, Science and Technology — the country's lead body for STEM popularisation and applied research." },
];

function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Profile"
        title={
          <>
            A prophet provocateur, schooled in <em className="italic text-accent">freedom.</em>
          </>
        }
        standfirst={
          <>
            Dr. Fazal Ibrahim Ali — Cambridge Commonwealth Scholar, former
            Provost of the University of Trinidad and Tobago, President of
            NIHERST, and the author of <em>Education for Liberty.</em>
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

      {/* Portrait + bio */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 border hairline" />
              <img
                src={fazalPortrait}
                alt="Dr. Fazal Ibrahim Ali"
                className="relative aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-7">
              <p className="font-display text-4xl leading-tight md:text-5xl">
                <em>Fazal Ali</em> is a prophet provocateur who disrupts the
                status quo to reveal uncomfortable truths — work that unsettles,
                and forces Latin America and the Caribbean to confront its
                hypocrisies.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                A thinker, consultant, academic and technical expert, he
                explores how AI is shaping the future of innovation — through
                the lens of <em>development as freedom.</em> His persuasive
                book, <em>Education for Liberty,</em> draws on Amartya Sen's{" "}
                <em>Development as Freedom</em> and John Rawls'{" "}
                <em>A Theory of Justice.</em>
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Fazal was awarded a Commonwealth Scholarship to read for his
                doctorate at the University of Cambridge as a split-site
                candidate, where Nobel laureate Amartya Sen, Sir Leszek
                Borysiewicz, C. W. R. D. Moseley and Lord Martin Rees shaped his
                thinking.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                His writing now sits under the identity{" "}
                <span className="font-display italic">Omeros AI</span> — a
                Caribbean initiative on artificial intelligence, written from
                the West Indies, for a reader anywhere who suspects the
                conversation has been too narrow for too long.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Concerns — what his work explores */}
      <section data-nav="dark" className="section-invert">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-white/55">What the work explores</p>
            <h2 className="mt-5 font-display text-4xl md:text-6xl">
              Screen economies, the Law of AI, and policy intent —{" "}
              <em className="italic text-white/70">through the lens of freedom.</em>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
              A working index of the concerns that move across his essays,
              consultancies and lectures.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-12 flex flex-wrap gap-2.5">
              {concerns.map((c) => (
                <li
                  key={c}
                  className="border border-white/20 px-4 py-2 text-sm text-white/85"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Pull-quote band */}
      <section className="mx-auto max-w-[1300px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="font-display text-3xl leading-[1.15] text-balance md:text-6xl">
            <em className="text-muted-foreground">"</em>Standing on the shoulders
            of Amartya Sen's Development as Freedom and John Rawls' A Theory of
            Justice, Omeros AI builds a body of work that adds to the critical
            theory on AI — written from the West Indies, for a reader anywhere
            who suspects the conversation has been too narrow for too
            long.<em className="text-muted-foreground">"</em>
          </p>
          <p className="mt-10 eyebrow text-muted-foreground">Fazal Ali · Omeros AI</p>
        </Reveal>
      </section>


      {/* Professional background */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Professional background</p>
          <h2 className="mt-5 font-display text-4xl md:text-7xl">
            Institutional <em className="italic text-accent">work.</em>
          </h2>
        </Reveal>
        <div className="mt-16 border-t hairline">
          {roles.map((m, i) => (
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
            <p className="font-display text-3xl md:text-5xl">
              Write to him.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openContactDrawer()}
                className="btn-cta btn-primary"
              >
                Write Me <ArrowUpRight className="size-4" />
              </button>
              <Link
                to="/writing"
                className="btn-cta btn-on-light"
              >
                Read the journal
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
