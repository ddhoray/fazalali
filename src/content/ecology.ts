import eco1 from "@/assets/ecology/eco-1.jpg.asset.json";
import eco2 from "@/assets/ecology/eco-2.jpg.asset.json";
import eco3 from "@/assets/ecology/eco-3.jpg.asset.json";
import eco4 from "@/assets/ecology/eco-4.jpg.asset.json";
import eco5 from "@/assets/ecology/eco-5.jpg.asset.json";
import eco6 from "@/assets/ecology/eco-6.jpg.asset.json";
import eco7 from "@/assets/ecology/eco-7.jpg.asset.json";
import { assetUrl } from "@/lib/asset-url";

export const ecology = {
  eyebrow: "A short note",
  title: "Ecology.",
  standfirst:
    "Not a body of work, a note. Ecology appears in the writing mostly where it is borrowed: the ethics we now ask of artificial intelligence were first argued out in conservation.",
  heroImage: assetUrl(eco1),
  heroImageAlt: "A quiet Caribbean beach at dusk, waves folding over dark sand",
  sections: [
    {
      h: "What the note claims",
      image: assetUrl(eco3),
      imageAlt: "A garden path beside a weathered standing stone among green planting",
      body: [
        "He has not written at length on ecology. It surfaces in the essays as a source rather than a subject, and this page keeps to that scale.",
        "The island still matters to how he reads scale: the coast is close enough to teach, the hurricane close enough to test. But that is context, not a thesis.",
      ],
    },
    {
      h: "Borrowed principles",
      image: assetUrl(eco2),
      imageAlt: "An ancient carved stone face, worked by hand and weathered by time",
      body: [
        "Most of the ethical vocabulary now attached to artificial intelligence, precaution, stewardship, carrying capacity, irreversibility, the duty owed to people who are not yet in the room, was developed first in ecological conservation.",
        "Naming the loan matters. It tells you the arguments are older than the technology, and that they were tested on systems we already knew how to ruin.",
      ],
    },
    {
      h: "Where it leads",
      image: assetUrl(eco4),
      imageAlt: "Cattle grazing under a palm tree as the sun sets over open grassland",
      body: [
        "The through line for him runs from conservation to Omeros AI: long time horizons held next to short political ones, without flinching.",
        "If ecology earns a longer treatment later, it will be there, in the ethics, rather than in a curriculum chapter of its own.",
      ],
    },
  ],
  strip: [
    {
      image: assetUrl(eco5),
      imageAlt: "An indigenous ceremony around a fire, participants in woven red garments",
    },
    {
      image: assetUrl(eco7),
      imageAlt: "Fazal Ali beside an indigenous colleague in traditional dress",
    },
    {
      image: assetUrl(eco6),
      imageAlt: "An alpine village street beneath steep cliffs and a waterfall",
    },
  ],
};
