import imgCarnival from "@/assets/article-carnival.jpg";
import imgFailure from "@/assets/article-failure.jpg";
import imgFabric from "@/assets/article-fabric.jpg";
import imgShield from "@/assets/article-shield.jpg";
import imgGravity from "@/assets/article-gravity.jpg";
import imgDatacenter from "@/assets/article-datacenter.jpg";
import imgShelf from "@/assets/article-shelf.jpg";
import img100Model from "@/assets/article-100model.jpg";
import imgCern from "@/assets/article-cern.jpg";
import imgDivine from "@/assets/article-divine.jpg";

export interface Post {
  image: string;
  caption: string;
  href: string;
  tags?: string;
}

/**
 * Curated grid of @thefazalali Instagram references. Each card opens the
 * Instagram profile in a new tab; live feed wiring would require the Meta
 * Graph API + business app review.
 */
export const posts: Post[] = [
  { image: imgCarnival, caption: "Trinidad Carnival, archwire and feathers", tags: "#carnival #trinidad", href: "https://www.instagram.com/thefazalali/" },
  { image: imgGravity, caption: "On AI gravity", tags: "#omerosai", href: "https://www.instagram.com/thefazalali/" },
  { image: imgCern, caption: "A CERN for the Caribbean?", tags: "#caribbean #ai", href: "https://www.instagram.com/thefazalali/" },
  { image: imgDatacenter, caption: "Hyperscale, in the islands", tags: "#datacenter", href: "https://www.instagram.com/thefazalali/" },
  { image: imgFabric, caption: "The fabric, always on", tags: "#frontier", href: "https://www.instagram.com/thefazalali/" },
  { image: imgFailure, caption: "Failure as essential", tags: "#education", href: "https://www.instagram.com/thefazalali/" },
  { image: imgShield, caption: "Shielding the chat", tags: "#policy", href: "https://www.instagram.com/thefazalali/" },
  { image: imgShelf, caption: "Screen economies", tags: "#retail #ai", href: "https://www.instagram.com/thefazalali/" },
  { image: img100Model, caption: "The 100-Model War", tags: "#geopolitics", href: "https://www.instagram.com/thefazalali/" },
  { image: imgDivine, caption: "Scaling curves, divine attributes", tags: "#theology #ai", href: "https://www.instagram.com/thefazalali/" },
];
