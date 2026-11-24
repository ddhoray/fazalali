import { useCmsEntries, useCmsText } from "@/components/site/CmsExtras";
import { withSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { VirtualGallery, type VirtualGalleryItem } from "@/components/site/VirtualGallery";
import { Instagram } from "lucide-react";

import galleryHero from "@/assets/gallery/fazal-piano-hero.jpg.asset.json";
import v2 from "@/assets/gallery/virtual/02-gallery-visit.jpg.asset.json";
import v3 from "@/assets/gallery/virtual/03-nocturne.webp.asset.json";
import v4 from "@/assets/gallery/virtual/04-angels.jpg.asset.json";
import v5 from "@/assets/gallery/virtual/05-ground.jpg.asset.json";
import v6 from "@/assets/gallery/virtual/06-beach-figure.webp.asset.json";
import v7 from "@/assets/gallery/virtual/07-boats.jpg.asset.json";
import v8 from "@/assets/gallery/virtual/08-urban-carrying.webp.asset.json";
import v9 from "@/assets/gallery/virtual/09-empty-branches.jpg.asset.json";
import v10 from "@/assets/gallery/virtual/10-inner-light.jpg.asset.json";
import v18 from "@/assets/gallery/virtual/18-pink-flowers.jpg.asset.json";
import v19 from "@/assets/gallery/virtual/19-mountain-colour.jpg.asset.json";
import v20 from "@/assets/gallery/virtual/20-blue-green-landscape.jpg.asset.json";
import v21 from "@/assets/gallery/virtual/21-gallery-gathering.jpg.asset.json";
import v22 from "@/assets/gallery/virtual/22-gallery-conversation.jpg.asset.json";
import v23 from "@/assets/gallery/virtual/23-gallery-discussion.jpg.asset.json";
import v24 from "@/assets/gallery/virtual/24-umbrella-figures.jpg.asset.json";
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
      { property: "og:url", content: "https://omeros.hyperrevamp.com/gallery" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://omeros.hyperrevamp.com/gallery" }],
  })),
  component: GalleryPage,
});

const works: VirtualGalleryItem[] = [
  { src: assetUrl(v2), alt: "A visitor at the gallery show" },
  { src: assetUrl(v3), alt: "A nocturnal painting of a house and palms" },
  { src: assetUrl(v4), alt: "An expressive blue painting with an angelic figure" },
  { src: assetUrl(v5), alt: "An abstract painting in yellow, black and red" },
  { src: assetUrl(v6), alt: "A figure walking through palms beside the sea" },
  { src: assetUrl(v7), alt: "Boats resting beside a house in a lush landscape" },
  { src: assetUrl(v8), alt: "An urban scene with a carried corrugated panel" },
  { src: assetUrl(v9), alt: "A green landscape with a path through empty branches" },
  { src: assetUrl(v10), alt: "Figures moving through a vivid blue and orange landscape" },
  { src: assetUrl(v18), alt: "A painting of pink flowers and dense green foliage" },
  { src: assetUrl(v19), alt: "A colourful mountain landscape painting" },
  { src: assetUrl(v20), alt: "An expressive blue and green landscape painting" },
  { src: assetUrl(v21), alt: "Visitors taking a selfie at the gallery show" },
  { src: assetUrl(v22), alt: "Two visitors talking beside paintings at the gallery show" },
  { src: assetUrl(v23), alt: "Visitors in conversation at the gallery show" },
  { src: assetUrl(v24), alt: "A vivid painting of figures beneath black umbrellas" },
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
