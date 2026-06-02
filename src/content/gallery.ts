export interface Post {
  image: string;
  caption: string;
  href: string;
  tags?: string;
}

const CDN = "https://fazalali.com/wp-content/uploads/sb-instagram-feed-images";

/**
 * Real @thefazalali posts, mirrored from fazalali.com's Instagram feed.
 * Images are hot-linked from the original site's public CDN; each card
 * opens the corresponding post on instagram.com.
 */
export const posts: Post[] = [
  {
    image: `${CDN}/280671616_537897357776234_8103289356246739410_nfull.webp`,
    caption: "TEMA, Tobago — drone over development",
    tags: "#tema #tobago #drone",
    href: "https://www.instagram.com/p/CdgI1JfLhvW/",
  },
  {
    image: `${CDN}/277759851_2742018709427100_423844077070302181_nfull.webp`,
    caption: "Saut d'Eau, Paramin — north coast",
    tags: "#northcoast #paramin #lavigie",
    href: "https://www.instagram.com/reel/Cb5Rwj1FEaM/",
  },
  {
    image: `${CDN}/272971642_914234522612579_544328825213499647_nfull.jpg`,
    caption: "Digital transformation, digital Caribbean",
    tags: "#digitaltransformation #digitalcaribbean",
    href: "https://www.instagram.com/p/CZb5XJ-LTi1/",
  },
  {
    image: `${CDN}/185291553_390758012081717_8248097101637940150_nfull.jpg`,
    caption: "Ålesund, Norway — back to basics",
    tags: "#ålesund #norway #backtonature",
    href: "https://www.instagram.com/p/CO0_9GsnDC2/",
  },
  {
    image: `${CDN}/139560855_340907250261016_5630642654125850497_nfull.jpg`,
    caption: "Point Radix, Mayaro — Ben Deloraine reserve",
    tags: "#pointradix #mayaro #nature",
    href: "https://www.instagram.com/p/CKLpf9pHiJr/",
  },
  {
    image: `${CDN}/108182476_701581673739508_2638634062506880520_nfull.jpg`,
    caption: "Mayaro, Bodow — Caribbean calm",
    tags: "#mayaro #caribbean #beach",
    href: "https://www.instagram.com/p/CCohgCknO5J/",
  },
  {
    image: `${CDN}/106717492_2639134516368383_6169797147837294880_nfull.jpg`,
    caption: "Preparing for a roast fish feast",
    tags: "#saltlife #mayaro #roastfish",
    href: "https://www.instagram.com/p/CCBHh1bnfQ1/",
  },
  {
    image: `${CDN}/82853421_3053947924642291_5286765379513877413_nfull.jpg`,
    caption: "Sargassum off Mayaro — covid tranquility",
    tags: "#saltlife #mayaro #sargassum",
    href: "https://www.instagram.com/p/CB9nCCzH9wV/",
  },
  {
    image: `${CDN}/80127785_732227147300741_3395314152230673146_nfull.jpg`,
    caption: "Cannes Dance Festival",
    tags: "#cannes #dance",
    href: "https://www.instagram.com/p/B7L9mkpnqnM/",
  },
  {
    image: `${CDN}/80742811_258184341811144_1739832222278453293_nfull.jpg`,
    caption: "Edinburgh",
    tags: "#edinburgh #scotland",
    href: "https://www.instagram.com/p/B66SLmDHwH9/",
  },
  {
    image: `${CDN}/79389888_771334290028641_1157947299678080030_nfull.jpg`,
    caption: "Greta Thunberg — happy new year",
    tags: "#gretathunberg #climatechange",
    href: "https://www.instagram.com/p/B6x_fIzHfaj/",
  },
  {
    image: `${CDN}/72344466_875949522823153_6518911175445972595_nfull.jpg`,
    caption: "West Indies — Caribbean beaches",
    tags: "#westindies #caribbean #beaches",
    href: "https://www.instagram.com/p/B6qxVITHNbP/",
  },
  {
    image: `${CDN}/79649198_171023097454573_8000208178179153959_nfull.jpg`,
    caption: "Hidden Scotland",
    tags: "#visitscotland #hiddenscotland",
    href: "https://www.instagram.com/p/B6qGhSrH8mm/",
  },
  {
    image: `${CDN}/75238439_157417775511325_2132803391441082150_nfull.jpg`,
    caption: "Tutankhamun, priceless treasures — London",
    tags: "#tutankhamun #london",
    href: "https://www.instagram.com/p/B5sBcWjnVkb/",
  },
  {
    image: `${CDN}/77135312_468287493803539_4647651047482264414_nfull.jpg`,
    caption: "Nobel Prize — Peter Ratcliffe at Francis Crick",
    tags: "#nobelprize #francisrick",
    href: "https://www.instagram.com/p/B5UABwsnA8Q/",
  },
  {
    image: `${CDN}/72771780_3305743086135041_6180778711982063356_nfull.jpg`,
    caption: "H&M, New York",
    tags: "#newyork",
    href: "https://www.instagram.com/p/B3y_uHRnV_4/",
  },
  {
    image: `${CDN}/74386704_1827423707401500_5065521725436587717_nfull.jpg`,
    caption: "Fifth Avenue — architecture, New York",
    tags: "#newyork #5thavenue #architecture",
    href: "https://www.instagram.com/p/B3y_f2xH71G/",
  },
  {
    image: `${CDN}/71528602_406518340035967_2560488983043362710_nfull.jpg`,
    caption: "Minton's Playhouse, Harlem — jazz",
    tags: "#harlem #jazz",
    href: "https://www.instagram.com/p/B3hShqYHp7Q/",
  },
  {
    image: `${CDN}/70654716_138902220816993_5837164021259762336_nfull.jpg`,
    caption: "Extinction Rebellion, Times Square",
    tags: "#extinctionrebellion #newyork",
    href: "https://www.instagram.com/p/B3coRNYHSo1/",
  },
  {
    image: `${CDN}/71096759_134710754493926_5843354725110376724_nfull.jpg`,
    caption: "Times Square — Extinction Rebellion, Greta",
    tags: "#newyork #climatechange",
    href: "https://www.instagram.com/p/B3cnieRnd_n/",
  },
];
