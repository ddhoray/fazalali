import eco1 from "@/assets/ecology/eco-1.jpg.asset.json";
import eco2 from "@/assets/ecology/eco-2.jpg.asset.json";
import eco3 from "@/assets/ecology/eco-3.jpg.asset.json";
import eco4 from "@/assets/ecology/eco-4.jpg.asset.json";
import eco5 from "@/assets/ecology/eco-5.jpg.asset.json";
import eco6 from "@/assets/ecology/eco-climbers-tunnel.jpg.asset.json";
import eco7 from "@/assets/ecology/eco-7.jpg.asset.json";
import { assetUrl } from "@/lib/asset-url";

export const ecology = {
  eyebrow: "A short note",
  title: "Ecology.",
  standfirst:
    "The ethics of AI finds its footing in earth sciences.",
  heroImage: assetUrl(eco1),
  heroImageAlt: "A quiet Caribbean beach at dusk, waves folding over dark sand",
  sections: [
    {
      h: "What the note claims",
      image: assetUrl(eco3),
      imageAlt: "A garden path beside a weathered standing stone among green planting",
      body: [
        "In these notes, the earth surfaces as a source rather than a subject, and this page keeps to that scale. The coast is close enough to teach, the hurricane close enough to test.",
      ],
    },
    {
      h: "Borrowed principles",
      image: assetUrl(eco2),
      imageAlt: "An ancient carved stone face, worked by hand and weathered by time",
      body: [
        "The principles of AI Ethics, precaution, stewardship, carrying capacity, irreversibility, and the duty owed to people who are not yet in the room, were first coined in ecological conservation.",
        "Naming this appropriation matters. The arguments are older than AI architectures. They have been tested on living systems on land and in the sea long before the age of artificial life.",
      ],
    },
    {
      h: "Where it leads",
      image: assetUrl(eco4),
      imageAlt: "Cattle grazing under a palm tree as the sun sets over open grassland",
      body: [
        "Omeros AI traces a long line from conservation to artificial life without flinching.",
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
