import { useCmsEntries, useCmsText } from "@/components/site/CmsExtras";
import { withSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { VirtualGallery, type VirtualGalleryItem } from "@/components/site/VirtualGallery";
import { Instagram } from "lucide-react";

import galleryHero from "@/assets/gallery/fazal-piano-hero.jpg.asset.json";
import v1 from "@/assets/gallery/virtual/01-piano.png.asset.json";
import v2 from "@/assets/gallery/virtual/02-gallery-visit.jpg.asset.json";
import v3 from "@/assets/gallery/virtual/03-nocturne.webp.asset.json";
import v4 from "@/assets/gallery/virtual/04-angels.jpg.asset.json";
import v5 from "@/assets/gallery/virtual/05-ground.jpg.asset.json";
import v6 from "@/assets/gallery/virtual/06-beach-figure.webp.asset.json";
import v7 from "@/assets/gallery/virtual/07-boats.jpg.asset.json";
import v8 from "@/assets/gallery/virtual/08-urban-carrying.webp.asset.json";
import v9 from "@/assets/gallery/virtual/09-empty-branches.jpg.asset.json";
import v10 from "@/assets/gallery/virtual/10-inner-light.jpg.asset.json";
import v11 from "@/assets/gallery/virtual/11-world-movement.jpg.asset.json";
import v12 from "@/assets/gallery/virtual/12-spiritual-baptists.jpg.asset.json";
import v13 from "@/assets/gallery/virtual/13-paramin-house.jpg.asset.json";
import v14 from "@/assets/gallery/virtual/14-gallery-visitors.jpg.asset.json";
import v15 from "@/assets/gallery/virtual/15-forest-path.jpg.asset.json";
import v16 from "@/assets/gallery/virtual/16-blue-umbrellas.jpg.asset.json";
import v17 from "@/assets/gallery/virtual/17-red-sails.jpg.asset.json";
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

const works: VirtualGalleryItem[] = [
  { src: assetUrl(v1), alt: "Fazal Ali seated beside a grand piano" },
  { src: assetUrl(v2), alt: "A visitor at the gallery show" },
  { src: assetUrl(v3), alt: "A nocturnal painting of a house and palms" },
  { src: assetUrl(v4), alt: "An expressive blue painting with an angelic figure" },
  { src: assetUrl(v5), alt: "An abstract painting in yellow, black and red" },
  { src: assetUrl(v6), alt: "A figure walking through palms beside the sea" },
  { src: assetUrl(v7), alt: "Boats resting beside a house in a lush landscape" },
  { src: assetUrl(v8), alt: "An urban scene with a carried corrugated panel" },
  { src: assetUrl(v9), alt: "A green landscape with a path through empty branches" },
  { src: assetUrl(v10), alt: "Figures moving through a vivid blue and orange landscape" },
  { src: assetUrl(v11), alt: "An expressive painting in red, pink and white" },
  { src: assetUrl(v12), alt: "Two spiritual figures against a vivid orange sky" },
  { src: assetUrl(v13), alt: "A weathered wooden house in Paramin" },
  { src: assetUrl(v14), alt: "Three visitors viewing paintings at the gallery show" },
  { src: assetUrl(v15), alt: "A painting of a sunlit path through a dense forest" },
  { src: assetUrl(v16), alt: "An architectural painting with blue umbrellas" },
  { src: assetUrl(v17), alt: "A painting of red sails among trees" },
];

function GalleryPage() {
  const heroTitle = useCmsText("gallery", "heroTitle");
  const heroIntro = useCmsText("gallery", "heroIntro");
  const cmsWorks: VirtualGalleryItem[] = useCmsEntries("gallery")
    .filter((e) => e.image_url)
    .map((e, index) => ({ src: e.image_url!, alt: e.body || e.title || `Gallery image ${index + 1}` }));
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

      <VirtualGallery items={allWorks} />
    </div>
  );
}
