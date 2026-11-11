import { useCmsEntries, useCmsText } from "@/components/site/CmsExtras";
import { withSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";


import { Instagram } from "lucide-react";

import p2 from "@/assets/paintings/2.plungeintoyourdepths.jpg.asset.json";
import p3 from "@/assets/paintings/3.everyonehereissearching.jpg.asset.json";
import p5 from "@/assets/paintings/5.andtheangelswillleap.jpg.asset.json";
import p6 from "@/assets/paintings/6.nofellingisfinal.jpg.asset.json";
import p7 from "@/assets/paintings/7.givemeahandthb.jpg.asset.json";
import p8 from "@/assets/paintings/8.throughtheemptybranches.jpg.asset.json";
import p11 from "@/assets/paintings/11.givemeyourhand.jpg.asset.json";
import p12 from "@/assets/paintings/12.sowearegraspedby.jpg.asset.json";
import p14 from "@/assets/paintings/14.Ipromisetoholdyouforever.jpg.asset.json";
import p15 from "@/assets/paintings/15.godspeakstoeachofus.jpg.asset.json";
import p16 from "@/assets/paintings/16.makebigshadowsthb.jpg.asset.json";
import p17 from "@/assets/paintings/17.betheground.jpg.asset.json";
import p20 from "@/assets/paintings/20.somehowwesurvive.jpg.asset.json";
import p21 from "@/assets/paintings/21.beginagainandagain.jpg.asset.json";
import p23 from "@/assets/paintings/23.aboveusonlysky.jpg.asset.json";
import p24 from "@/assets/paintings/24.theinnerlightofallthings.jpg.asset.json";
import p25 from "@/assets/paintings/25.thedarknessofeachendlessfathbl.jpg.asset.json";
import p26 from "@/assets/paintings/26.wemoveaboutintheworld.jpg.asset.json";
import pSpiritual from "@/assets/paintings/spiritualbaptists.jpg.asset.json";
import newNocturneHouse from "@/assets/gallery/nocturne-house-painting.webp.asset.json";
import newBeachFigure from "@/assets/gallery/beach-figure-painting.webp.asset.json";
import newUrbanCarrying from "@/assets/gallery/urban-carrying-painting.webp.asset.json";
import newFazalPiano from "@/assets/gallery/fazal-piano-upscaled.png.asset.json";
import galleryHero from "@/assets/gallery/fazal-piano-hero.jpg.asset.json";
import newBluePalms from "@/assets/gallery/blue-palms-painting.png.asset.json";
import newUnfinishedTropical from "@/assets/gallery/unfinished-tropical-painting.webp.asset.json";
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

const works: Work[] = [
  { src: assetUrl(newNocturneHouse), title: "A night painting of a house and palms", hideCaption: true },
  { src: assetUrl(newBeachFigure), title: "A figure walking through palms beside the sea", hideCaption: true },
  { src: assetUrl(newUrbanCarrying), title: "An urban scene with a carried corrugated panel", hideCaption: true },
  { src: assetUrl(newFazalPiano), title: "Fazal Ali seated beside a piano", hideCaption: true },
  { src: assetUrl(newBluePalms), title: "A painting of palms in blue and green", hideCaption: true },
  { src: assetUrl(newUnfinishedTropical), title: "A developing tropical city painting", hideCaption: true },
  { src: assetUrl(p2), title: "Plunge Into Your Depths", year: "2022", medium: "Oil on canvas" },
  {
    src: assetUrl(p3),
    title: "Everyone Here Is Searching",
    year: "2023",
    medium: "Mixed media on board",
  },
  { src: assetUrl(p5), title: "And the Angels Will Leap", year: "2023", medium: "Oil on canvas" },
  { src: assetUrl(p6), title: "No Feeling Is Final", year: "2022", medium: "Oil on canvas" },
  { src: assetUrl(p7), title: "Give Me a Hand", year: "2023", medium: "Oil on canvas" },
  { src: assetUrl(p8), title: "Through the Empty Branches", year: "2022", medium: "Acrylic on canvas" },
  { src: assetUrl(p11), title: "Give Me Your Hand", year: "2023", medium: "Oil on canvas" },
  { src: assetUrl(p12), title: "So We Are Grasped By", year: "2022", medium: "Acrylic on canvas" },
  { src: assetUrl(p14), title: "I Promise to Hold You Forever", year: "2023", medium: "Oil on canvas" },
  { src: assetUrl(p15), title: "God Speaks to Each of Us", year: "2022", medium: "Oil on canvas" },
  { src: assetUrl(p16), title: "Make Big Shadows", year: "2023", medium: "Oil on canvas" },
  { src: assetUrl(p17), title: "Be the Ground", year: "2022", medium: "Mixed media on canvas" },
  { src: assetUrl(p20), title: "Somehow We Survive", year: "2022", medium: "Mixed media on canvas" },
  { src: assetUrl(p21), title: "Begin Again and Again", year: "2023", medium: "Acrylic on canvas" },
  { src: assetUrl(p23), title: "Above Us Only Sky", year: "2022", medium: "Oil on canvas" },
  { src: assetUrl(p24), title: "The Inner Light of All Things", year: "2023", medium: "Oil on canvas" },
  {
    src: assetUrl(p25),
    title: "The Darkness of Each Endless Fall",
    year: "2022",
    medium: "Oil on canvas",
  },
  { src: assetUrl(p26), title: "We Move About in the World", year: "2023", medium: "Oil on canvas" },
  { src: assetUrl(pSpiritual), title: "Spiritual Baptists", year: "2022", medium: "Oil on canvas" },
];

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
