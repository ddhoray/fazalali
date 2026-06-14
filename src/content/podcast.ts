import prefaceAudio from "@/assets/preface.mp3.asset.json";
import prolegomenonAudio from "@/assets/prolegomenon.mp3.asset.json";
import { assetUrl } from "@/lib/asset-url";

export interface Episode {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  audio: string;
}

export const episodes: Episode[] = [
  {
    slug: "episode-two-prolegomenon",
    number: "02",
    title: "Prolegomenon",
    subtitle: "Education for Liberty — A Monograph by Fazal Ali",
    description:
      "A prolegomenon to a body of work that argues liberty is the medium of education, not its outcome. Fazal Ali sets out the West Indian conditions that make the case both urgent and original.",
    duration: "33:10",
    audio: assetUrl(prolegomenonAudio),
  },
  {
    slug: "episode-one-preface",
    number: "01",
    title: "Preface",
    subtitle: "Education for Liberty — A Monograph by Fazal Ali",
    description:
      "The opening note. Why this book exists, who it is for, and what it owes to Amartya Sen, John Rawls, and a Trinidad classroom that taught the author to keep asking.",
    duration: "33:58",
    audio: prefaceAudio.url,
  },
];
