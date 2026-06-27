import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

import heroGallery from "@/assets/hero-gallery.jpg";
import { Instagram } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Fazal Ali" },
      {
        name: "description",
        content:
          "A curated visual feed from @thefazalali — Trinidad carnival, drone footage, books, and the occasional postcard from the West Indies.",
      },
      { property: "og:title", content: "Gallery — Fazal Ali" },
      {
        property: "og:description",
        content: "Visual field notes from Trinidad and elsewhere.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/gallery" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/gallery" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Visual field notes"
        title={<>The <em className="italic">gallery.</em></>}
        standfirst={
          <>
            A curated cut of <a href="https://www.instagram.com/thefazalali/" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">@thefazalali</a> —
            carnival, coastline, drone footage, and the page life of a working writer.
          </>
        }
        meta={
          <>
            <span>Instagram · Trinidad</span>
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
        image={heroGallery}
        imageAlt="Aerial view of a Trinidad coastline"
      />
    </div>
  );
}
