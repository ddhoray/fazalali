import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { AudioPlayer } from "@/components/site/AudioPlayer";
import { episodes } from "@/content/podcast";
import { ArrowUpRight } from "lucide-react";
import heroPodcast from "@/assets/hero-podcast.jpg";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast — Education for Liberty | Fazal Ali" },
      {
        name: "description",
        content:
          "Education for Liberty — the podcast. Episodes of Fazal Ali's monograph read aloud, beginning with the Preface and Prolegomenon.",
      },
      { property: "og:title", content: "Education for Liberty — The Podcast" },
      {
        property: "og:description",
        content: "A monograph by Fazal Ali, read aloud. Listen to the Preface and Prolegomenon.",
      },
    ],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  return (
    <div>
      <PageHero
        eyebrow="Education for Liberty"
        title={<>The <em className="italic">podcast.</em></>}
        standfirst={
          <>
            A monograph, read aloud. Begin at the Preface, continue with the
            Prolegomenon — long-form, unhurried, made for headphones.
          </>
        }
        meta={
          <>
            <span>{episodes.length} episodes</span>
            <span className="size-1 bg-white/40" />
            <span>Listen anywhere</span>
            <span className="size-1 bg-white/40" />
            <Link to="/education-for-liberty" className="underline-offset-4 hover:underline">
              Read the book
            </Link>
          </>
        }
        image={heroPodcast}
        imageAlt="Studio microphone in low-key light"
      />

      <section className="mx-auto max-w-[1300px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="space-y-px border-y hairline">
          {episodes.map((ep, i) => (
            <Reveal key={ep.slug} delay={i * 0.05}>
              <article className="group grid gap-8 border-b hairline py-12 last:border-b-0 md:grid-cols-[auto_1fr] md:gap-14 md:py-16">
                <div className="font-display text-7xl leading-none text-foreground/15 md:text-[9rem]">
                  {ep.number}
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {ep.subtitle}
                  </p>
                  <h2 className="font-display text-4xl leading-tight md:text-6xl">
                    {ep.title}
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {ep.description}
                  </p>
                  <div className="mt-2 max-w-xl border-t hairline pt-6">
                    <AudioPlayer src={ep.audio} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-wrap items-end justify-between gap-8 border-t hairline pt-12">
            <div>
              <p className="eyebrow text-muted-foreground">Continue</p>
              <p className="mt-3 font-display text-3xl md:text-5xl">
                The Palimpsest of West Indian education.
              </p>
            </div>
            <Link
              to="/palimpsest"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm uppercase tracking-[0.22em]"
            >
              Open palimpsest <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
