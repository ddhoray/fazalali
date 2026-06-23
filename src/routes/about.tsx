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

const roles = [
  { year: "Cambridge", text: "Commonwealth Scholar at the University of Cambridge as a split-site doctoral candidate; planned and implemented the launch of The Institute of Critical Thinking at UWI — a regional think tank modelled on the Hebrew University's innovation engine." },
  { year: "UWI", text: "Read at the University of the West Indies under American curriculum theorist Nelson Haggerson; led the Office of Graduate Studies and Research, and the DBA programme at the Arthur Lok Jack Graduate School of Business." },
  { year: "UTT", text: "Provost of the University of Trinidad and Tobago and, in that period, acting President; member of the UNESCO Memory of the World team and, earlier, of the consortium of small island states (UCSIS) under a Kofi Annan mandate." },
  { year: "NIHERST", text: "President of the National Institute of Higher Education, Research, Science and Technology, with responsibility for the UTT Aviation Campus and the Evening University." },
  { year: "IDB", text: "External consultant with the Inter-American Development Bank on tertiary education, capability development, and the policy architecture of regional research." },
  { year: "Mentors", text: "Shaped by Nobel laureate Amartya Sen, Sir Leszek Borysiewicz, C. W. R. D. Moseley, and Lord Martin Rees." },
];

function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Profile"
        title={
          <>
            A writer, schooled in <em className="italic text-accent">freedom.</em>
          </>
        }
        standfirst={
          <>
            Dr. Fazal Ibrahim Ali — Cambridge Commonwealth Scholar, former
            Provost of the University of Trinidad and Tobago, and the author of
            <em> Education for Liberty.</em>
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
                <em>Fazal Ibrahim Ali</em> is best known for his persuasive
                work, Education for Liberty, which builds on Amartya Sen's
                Development as Freedom and John Rawls' A Theory of Justice.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                A prophet provocateur who disrupts the status quo to reveal
                uncomfortable truths — a notable thinker exploring data
                embassies, screen economies, algorithmic fairness, epistemic
                injustice, the law of AI and policy, technological sovereignty,
                national data libraries, AI security of critical infrastructure,
                the data fabric of state enterprises, intelligent failure, the
                economic geography of AI, and the effects of granting electronic
                personhood to AI.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                His writing now sits under the identity{" "}
                <span className="font-display italic">Omeros AI</span> — a body
                of critical theory on artificial intelligence, written from the
                West Indies, for a reader anywhere who suspects the conversation
                has been too narrow for too long.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pull-quote band */}
      <section data-nav="dark" className="section-invert">
        <div className="mx-auto max-w-[1300px] px-5 py-12 sm:px-8 sm:py-10">
          <Reveal>
            <p className="font-display text-3xl leading-[1.15] text-balance md:text-6xl">
              <em className="text-white/40">"</em>Standing on the shoulders of
              Amartya Sen's Development as Freedom and John Rawls' A Theory of
              Justice, Omeros AI builds a body of work that adds to the critical
              theory on AI — written from the West Indies, for a reader anywhere
              who suspects the conversation has been too narrow for too long.
              <em className="text-white/40">"</em>
            </p>
            <p className="mt-10 eyebrow text-white/55">Fazal Ali · Omeros AI</p>
          </Reveal>
        </div>
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
