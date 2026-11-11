import { useCmsEntries, useCmsText } from "@/components/site/CmsExtras";
import { withSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";


import { Instagram } from "lucide-react";

import galleryHero from "@/assets/gallery/fazal-piano-hero.jpg.asset.json";
import { assetUrl } from "@/lib/asset-url";

export const Route = createFileRoute("/gallery")({
  head: (ctx) =>
    withSeo("gallery", ctx, ({
    meta: [
      { title: "Gallery, Fazal Ali" },
      {
        name: "description",
        content:
          "A curated visual feed, paintings, postcards, and the canvas life of a working writer.",
      },
      { property: "og:title", content: "Gallery, Fazal Ali" },
      {
        property: "og:description",
        content: "Paintings and visual field notes from Trinidad and elsewhere.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/gallery" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/gallery" }],
  })),
  component: GalleryPage,
});

type Work = {
  src: string;
  title: string;
  year?: string;
  medium?: string;
  hideCaption?: boolean;
};

const works: Work[] = [];

function GalleryPage() {
  const heroTitle = useCmsText("gallery", "heroTitle");
  const heroIntro = useCmsText("gallery", "heroIntro");
  const cmsWorks: Work[] = useCmsEntries("gallery").filter((e) => e.image_url).map((e) => ({ src: e.image_url!, title: e.body || e.title, year: e.subtitle ?? undefined, hideCaption: !e.subtitle }));
  const allWorks = cmsWorks.length ? cmsWorks : works;
  return (
    <div>
      <PageHero
        cmsKey="gallery"
        eyebrow="Visual field notes"
        title={
          <>
            {heroTitle}
          </>
        }
        standfirst={
          <>
            {heroIntro} More on{" "}
            <a
              href="https://www.instagram.com/thefazalali/"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              @thefazalali
            </a>
            .
          </>
        }
        meta={
          <>
            <span>Paintings · Trinidad</span>
            <span className="size-1 bg-white/40" />
            <a
              href="https://www.instagram.com/thefazalali/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
            >
              <Instagram className="size-3" /> Follow @thefazalali
            </a>
          </>
        }
        image={assetUrl(galleryHero)}
        imageAlt="Fazal Ali beside a grand piano in a wood-panelled room"
      />

      <section className="border-t hairline">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="columns-2 gap-5 md:columns-3 md:gap-6 xl:columns-4 [column-fill:_balance]">
            {allWorks.map((w) => (
              <figure key={w.src} className="group mb-5 break-inside-avoid md:mb-6">
                <div className="relative overflow-hidden border hairline bg-muted">
                  <img
                    src={w.src}
                    alt={w.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                {!w.hideCaption && (
                  <figcaption className="mt-2 flex items-baseline justify-between gap-3">
                    <h3 className="truncate font-display text-xs md:text-sm">{w.title}</h3>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground shrink-0">
                      {w.year}
                    </span>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
