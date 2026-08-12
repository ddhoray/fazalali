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
import p20 from "@/assets/paintings/20.somehowwesurvive.jpg.asset.json";
import p21 from "@/assets/paintings/21.beginagainandagain.jpg.asset.json";
import p22 from "@/assets/paintings/22.youhavebeensentouthbt.jpg.asset.json";
import p23 from "@/assets/paintings/23.aboveusonlysky.jpg.asset.json";
import p24 from "@/assets/paintings/24.theinnerlightofallthings.jpg.asset.json";
import p25 from "@/assets/paintings/25.thedarknessofeachendlessfathbl.jpg.asset.json";
import p26 from "@/assets/paintings/26.wemoveaboutintheworld.jpg.asset.json";
import p27 from "@/assets/paintings/27.itisnottoolate.jpg.asset.json";
import pScarlet from "@/assets/paintings/scarletibisteaser.jpg.asset.json";
import pSpiritual from "@/assets/paintings/spiritualbaptists.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery, Fazal Ali" },
      {
        name: "description",
        content:
          "A curated visual feed, paintings, postcards, and field notes from the West Indies.",
      },
      { property: "og:title", content: "Gallery, Fazal Ali" },
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
  { src: p10.url, title: "Let Everything Happen to You", year: "2023", medium: "Oil on canvas" },
  { src: p11.url, title: "Give Me Your Hand", year: "2023", medium: "Oil on canvas" },
  { src: p12.url, title: "So We Are Grasped By", year: "2022", medium: "Acrylic on canvas" },
  { src: p13.url, title: "My Eyes Touch the Hill", year: "2023", medium: "Oil on canvas" },
  { src: p14.url, title: "I Promise to Hold You Forever", year: "2023", medium: "Oil on canvas" },
  { src: p15.url, title: "God Speaks to Each of Us", year: "2022", medium: "Oil on canvas" },
  { src: p16.url, title: "Make Big Shadows", year: "2023", medium: "Oil on canvas" },
  { src: p17.url, title: "Be the Ground", year: "2022", medium: "Mixed media on canvas" },
  { src: p18.url, title: "You Are the Sun", year: "2023", medium: "Oil on canvas" },
  { src: p19.url, title: "Hardly Sense In It", year: "2023", medium: "Oil on canvas" },
  { src: p20.url, title: "Somehow We Survive", year: "2022", medium: "Mixed media on canvas" },
  { src: p21.url, title: "Begin Again and Again", year: "2023", medium: "Acrylic on canvas" },
  { src: p22.url, title: "You Have Been Sent Out", year: "2023", medium: "Mixed media on board" },
  { src: p23.url, title: "Above Us Only Sky", year: "2022", medium: "Oil on canvas" },
  { src: p24.url, title: "The Inner Light of All Things", year: "2023", medium: "Oil on canvas" },
  { src: p25.url, title: "The Darkness of Each Endless Fall", year: "2022", medium: "Oil on canvas" },
  { src: p26.url, title: "We Move About in the World", year: "2023", medium: "Oil on canvas" },
  { src: p27.url, title: "It Is Not Too Late", year: "2023", medium: "Acrylic on canvas" },
  { src: pScarlet.url, title: "Scarlet Ibis", year: "2023", medium: "Oil on canvas" },
  { src: pSpiritual.url, title: "Spiritual Baptists", year: "2022", medium: "Oil on canvas" },
];

function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Visual field notes"
        title={<>The <em className="italic">gallery.</em></>}
        standfirst={
          <>
            A curated selection of paintings, colour, coastline, and the canvas life of a working writer.
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

      <section className="mx-auto max-w-[1400px] px-4 md:px-8 py-12 md:py-20">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 [column-fill:_balance]">
          {works.map((w, i) => {
            // irregular sizing: vary widths via margin offsets & varied aspect feel
            const tilt = ["mt-0", "mt-6", "mt-12", "mt-2", "mt-8"][i % 5];
            return (
              <figure
                key={w.src}
                className={`group mb-4 md:mb-6 break-inside-avoid ${tilt}`}
              >
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={w.src}
                    alt={w.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-2 flex items-baseline justify-between gap-3">
                  <h3 className="text-xs md:text-sm font-serif italic truncate">
                    {w.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground shrink-0">
                    {w.year}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

    </div>
  );
}
