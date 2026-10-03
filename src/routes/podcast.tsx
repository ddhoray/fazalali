import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { AudioPlayer } from "@/components/site/AudioPlayer";
import { episodes } from "@/content/podcast";
import { ArrowUpRight } from "lucide-react";
import heroPodcast from "@/assets/hero-podcast.jpg";
import { useCmsEntries, useCmsText } from "@/components/site/CmsExtras";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast, Education for Liberty | Fazal Ali" },
      {
        name: "description",
        content:
          "Education for Liberty, the podcast. Episodes of Fazal Ali's monograph read aloud, beginning with the Preface and Prolegomenon.",
      },
      { property: "og:title", content: "Education for Liberty, The Podcast" },
      {
        property: "og:description",
        content: "A monograph by Fazal Ali, read aloud. Listen to the Preface and Prolegomenon.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/podcast" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/podcast" }],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  const heroTitle = useCmsText("podcast", "heroTitle");
  const heroIntro = useCmsText("podcast", "heroIntro");
  const cmsEpisodes = useCmsEntries("podcast").map((e, i) => ({ slug: e.id, number: (e.data as { number?: string })?.number ?? String(i + 1).padStart(2, "0"), title: e.title, subtitle: e.subtitle ?? "Education for Liberty", description: e.body ?? "", duration: (e.data as { duration?: string })?.duration ?? "", audio: e.link_url ?? "" }));
  const displayedEpisodes = cmsEpisodes.length ? cmsEpisodes : episodes;
  return (
    <div>
      <PageHero
        eyebrow="Education for Liberty"
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
            <span>{displayedEpisodes.length} episodes</span>
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

      <section className="mx-auto max-w-[1300px] px-5 py-12 sm:px-8 sm:py-10">
        <div className="space-y-px border-y hairline">
           {displayedEpisodes.map((ep, i) => (
            <Reveal key={ep.slug} delay={i * 0.05}>
              <article className="group grid gap-8 border-b hairline py-12 last:border-b-0 md:grid-cols-[auto_1fr] md:gap-14 md:py-10">
                <div className="font-display text-7xl leading-none text-foreground/15 md:text-[9rem]">
                  {ep.number}
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {ep.subtitle}
                  </p>
                  <h2 className="font-display text-4xl leading-tight md:text-6xl">{ep.title}</h2>
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
