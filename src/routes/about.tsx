import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "lucide-react";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fazalPortrait from "@/assets/fazal-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Fazal Ibrahim Ali" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali — Cambridge Commonwealth Scholar, former Provost of UTT, and writer on critical theory in AI from the West Indies.",
      },
      { property: "og:title", content: "About — Fazal Ibrahim Ali" },
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

const milestones = [
  { year: "UWI", text: "Read at the University of the West Indies under American curriculum theorist Nelson Haggerson; completed an MPhil in Philosophy." },
  { year: "Cambridge", text: "Commonwealth Scholar at the University of Cambridge as a split-site doctoral candidate." },
  { year: "Mentors", text: "Shaped by Nobel laureate Amartya Sen, Sir Leszek Borysiewicz, C. W. R. D. Moseley, and Lord Martin Rees." },
  { year: "UCSIS", text: "Secretary to the University Consortium of Small Island Developing States — a first-of-its-kind global capacity-building cluster from a Kofi Annan mandate." },
  { year: "UTT", text: "Provost and acting President of the University of Trinidad and Tobago; member of the UNESCO Memory of the World team." },
  { year: "TSC", text: "Chairman of the Teaching Service Commission of Trinidad and Tobago for two terms." },
];

function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About"
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
                src="https://fazalali.com/wp-content/uploads/2025/10/Fazal-Ali-Profile-2025.jpeg"
                alt="Dr. Fazal Ibrahim Ali"
                className="relative aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-7">
              <p className="font-display text-4xl leading-tight md:text-5xl">
                <em>Fazal Ibrahim Ali</em> is best known for his persuasive work,
                Education for Liberty, which builds on Amartya Sen's Development
                as Freedom and John Rawls' A Theory of Justice.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                His writing now sits under the identity{" "}
                <span className="font-display italic">Omeros AI</span> — a body
                of critical theory on artificial intelligence, written from the
                West Indies, for a reader anywhere who suspects the conversation
                has been too narrow for too long.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                At Cambridge he planned and implemented the launch of The
                Institute of Critical Thinking at UWI — a regional think tank
                modelled on Hebrew University's innovation engine. He has led
                the Office of Graduate Studies and Research, the DBA programme
                at Arthur Lok Jack, and served as Provost of the University of
                Trinidad and Tobago.
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
              <em className="text-white/40">"</em>The site is about me — my
              books, my ideas, my writing, my art. My contribution to the West
              Indies.<em className="text-white/40">"</em>
            </p>
            <p className="mt-10 eyebrow text-white/55">Fazal Ali · 2026</p>
          </Reveal>
        </div>
      </section>

      {/* Working life timeline */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">A working life</p>
          <h2 className="mt-5 font-display text-4xl md:text-7xl">
            Five decades, one <em className="italic text-accent">thesis.</em>
          </h2>
        </Reveal>
        <div className="mt-16 border-t hairline">
          {milestones.map((m, i) => (
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
