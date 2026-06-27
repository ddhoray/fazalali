import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

import heroGallery from "@/assets/hero-gallery.jpg";
import { Instagram } from "lucide-react";

import p1 from "@/assets/paintings/1.runintotheshimmeringlightthb.jpg.asset.json";
import p2 from "@/assets/paintings/2.plungeintoyourdepths.jpg.asset.json";
import p3 from "@/assets/paintings/3.everyonehereissearching.jpg.asset.json";
import p4 from "@/assets/paintings/4.gotothelimitsthb.jpg.asset.json";
import p5 from "@/assets/paintings/5.andtheangelswillleap.jpg.asset.json";
import p6 from "@/assets/paintings/6.nofellingisfinal.jpg.asset.json";
import p7 from "@/assets/paintings/7.givemeahandthb.jpg.asset.json";
import p8 from "@/assets/paintings/8.throughtheemptybranches.jpg.asset.json";
import p9 from "@/assets/paintings/9.itiswhatyouhave.jpg.asset.json";
import p10 from "@/assets/paintings/10.leteverythinghappentoyouthb.jpg.asset.json";
import p11 from "@/assets/paintings/11.givemeyourhand.jpg.asset.json";
import p12 from "@/assets/paintings/12.sowearegraspedby.jpg.asset.json";
import p13 from "@/assets/paintings/13.myeyestouchthehillthb.jpg.asset.json";
import p14 from "@/assets/paintings/14.Ipromisetoholdyouforever.jpg.asset.json";
import p15 from "@/assets/paintings/15.godspeakstoeachofus.jpg.asset.json";
import p16 from "@/assets/paintings/16.makebigshadowsthb.jpg.asset.json";
import p17 from "@/assets/paintings/17.betheground.jpg.asset.json";
import p18 from "@/assets/paintings/18.youarethesun.jpg.asset.json";
import p19 from "@/assets/paintings/19.hardlysenseinitthb.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Fazal Ali" },
      {
        name: "description",
        content:
          "A curated visual feed — paintings, postcards, and field notes from the West Indies.",
      },
      { property: "og:title", content: "Gallery — Fazal Ali" },
      {
        property: "og:description",
        content: "Paintings and visual field notes from Trinidad and elsewhere.",
      },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/gallery" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/gallery" },
    ],
  }),
  component: GalleryPage,
});

type Work = {
  src: string;
  title: string;
  year?: string;
  medium?: string;
};

const works: Work[] = [
  { src: p1.url, title: "Run Into the Shimmering Light", year: "2023", medium: "Oil on canvas" },
  { src: p2.url, title: "Plunge Into Your Depths", year: "2022", medium: "Oil on canvas" },
  { src: p3.url, title: "Everyone Here Is Searching", year: "2023", medium: "Mixed media on board" },
  { src: p4.url, title: "Go to the Limits", year: "2022", medium: "Oil on canvas" },
  { src: p5.url, title: "And the Angels Will Leap", year: "2023", medium: "Oil on canvas" },
  { src: p6.url, title: "No Feeling Is Final", year: "2022", medium: "Oil on canvas" },
  { src: p7.url, title: "Give Me a Hand", year: "2023", medium: "Oil on canvas" },
  { src: p8.url, title: "Through the Empty Branches", year: "2022", medium: "Acrylic on canvas" },
  { src: p9.url, title: "It Is What You Have", year: "2023", medium: "Oil on canvas" },
];

function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Visual field notes"
        title={<>The <em className="italic">gallery.</em></>}
        standfirst={
          <>
            A curated selection of paintings — colour, coastline, and the page life of a working writer.
            More on <a href="https://www.instagram.com/thefazalali/" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">@thefazalali</a>.
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
        image={heroGallery}
        imageAlt="Aerial view of a Trinidad coastline"
      />

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 md:gap-y-24">
          {works.map((w, i) => (
            <figure
              key={w.src}
              className={`group ${i % 3 === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="relative overflow-hidden bg-muted">
                <img
                  src={w.src}
                  alt={w.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} — {w.medium}
                  </div>
                  <h3 className="mt-1 text-xl md:text-2xl font-serif italic">
                    {w.title}
                  </h3>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground shrink-0">
                  {w.year}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
