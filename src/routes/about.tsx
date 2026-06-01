import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { GlassPanel } from "@/components/site/GlassPanel";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Fazal Ibrahim Ali" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali: Cambridge Commonwealth Scholar, former Provost of UTT, chairman, and writer on critical theory in AI from the West Indies.",
      },
      { property: "og:title", content: "About — Fazal Ibrahim Ali" },
      {
        property: "og:description",
        content:
          "Cambridge Commonwealth Scholar, scholar of Amartya Sen and John Rawls, writer on AI from the West Indies.",
      },
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
    <article className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          About
        </p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95] text-balance md:text-8xl">
          A writer, schooled in <em className="italic">freedom.</em>
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal>
          <GlassPanel className="overflow-hidden p-3">
            <img
              src="https://fazalali.com/wp-content/uploads/2025/10/Fazal-Ali-Profile-2025.jpeg"
              alt="Dr. Fazal Ibrahim Ali"
              className="aspect-[4/5] w-full rounded-none object-cover"
              loading="lazy"
            />
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 md:text-xl">
            <p>
              <strong className="font-display text-2xl">Fazal Ibrahim Ali</strong> is best known
              for his persuasive work, <em>Education for Liberty</em>, which builds on
              Amartya Sen's <em>Development as Freedom</em> and John Rawls'
              {" "}<em>A Theory of Justice</em>.
            </p>
            <p className="text-base text-muted-foreground">
              His writing now sits under the identity <span className="font-display italic">Omeros AI</span> —
              a body of critical theory on artificial intelligence, written from the West Indies,
              for a reader anywhere who suspects the conversation has been
              too narrow for too long.
            </p>
            <p className="text-base text-muted-foreground">
              At Cambridge he planned and implemented the launch of The Institute of Critical
              Thinking at UWI — a regional think tank modelled on Hebrew University's
              innovation engine. He has led the Office of Graduate Studies and Research,
              the DBA programme at Arthur Lok Jack, and served as Provost of the
              University of Trinidad and Tobago.
            </p>
          </div>
        </Reveal>
      </div>

      <section className="mt-32">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">A working life.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.04}>
              <GlassPanel className="p-7">
                <p className="font-display text-3xl">{m.year}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
