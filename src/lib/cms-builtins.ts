/**
 * Built-in site content converted to admin collection items, used by "Import built-in items"
 * so editors start from what the site already shows instead of a blank list.
 */
import { palimpsest } from "@/content/palimpsest";
import { ecology } from "@/content/ecology";
import { inequality } from "@/content/inequality";
import { builtinChapters } from "@/content/education";
import { assetUrl } from "@/lib/asset-url";
import afterTheFuture from "@/assets/after-the-future-cover.jpg.asset.json";
import secureDev from "@/assets/secure-development-cover.jpg.asset.json";
import abbrevDev from "@/assets/abbreviated-development-cover.jpg.asset.json";
import i1 from "@/assets/inequality/1.asset.json";
import i2 from "@/assets/inequality/2.asset.json";
import i3 from "@/assets/inequality/3.asset.json";
import i4 from "@/assets/inequality/4.asset.json";
import i5 from "@/assets/inequality/5.asset.json";
import i6 from "@/assets/inequality/6.asset.json";
import i7 from "@/assets/inequality/7.asset.json";
import i8 from "@/assets/inequality/8.asset.json";
import i9 from "@/assets/inequality/9.asset.json";
import i10 from "@/assets/inequality/10.asset.json";

export type BuiltinItem = { title: string; subtitle?: string; body?: string; image_url?: string; link_url?: string; data?: Record<string, unknown> };

const abs = (u: string) => (u.startsWith("/") && typeof window !== "undefined" ? window.location.origin + u : u);

export const BUILTINS: Partial<Record<string, () => BuiltinItem[]>> = {
  books: () => [
    {
      title: "After the Future",
      subtitle: "Forthcoming · Essays on AI",
      image_url: assetUrl(afterTheFuture),
      body: "Where are we? The future is here, it is just not sprinkled equally. So what happens [after the future](https://fazalali.com/2024/05/04/after-the-future/)? We cannot relinquish our reasoned agency and hope to live freely in a future that will never be our own. A future that belongs to someone else is not freedom, and the struggle to secure equal rights can only find a remedy from behind a Rawlsian Veil of Ignorance.",
    },
    {
      title: "Secure Development",
      subtitle: "Forthcoming · A construct",
      image_url: assetUrl(secureDev),
      body: "The constellation of values, technologies, and practices that lessen vulnerabilities, a [sensitivity to vulnerability](https://fazalali.com/2023/03/19/sensitivity-to-vulnerability/) balanced against resilience. An [always-on intelligent security fabric](https://fazalali.com/2026/05/16/ai-as-an-always-on-intelligent-security-fabric/) for a net-zero future, alert to [the model wars and shadow AI](https://fazalali.com/2026/04/12/the-100-model-war-and-shadow-ai/). A skills-and-capabilities approach to development that holds.",
    },
    {
      title: "Abbreviated Development",
      subtitle: "In preparation · A construct",
      image_url: assetUrl(abbrevDev),
      body: "The dangerous gap that opens when the speed of code outpaces the state's ability to write primary law: legislative lag, amplified risk, a state unable to protect its citizens. The remedy is [unusual thinking](https://fazalali.com/2023/05/27/unusual-thinking-and-abbreviated-development/), open-source legal frameworks, and continuously updated regulation.",
    },
  ],
  palimpsest: () =>
    palimpsest.map((s) => ({
      title: s.title,
      subtitle: s.imageCaption ?? "",
      image_url: abs(s.image),
      body: s.entries.map((e) => e.text).join("\n\n"),
      data: { alt: s.imageAlt },
    })),
  education_chapters: () => builtinChapters.map((c) => ({ title: c.title, subtitle: c.n, body: c.body })),
  ecology: () => ecology.sections.map((s) => ({ title: s.h, subtitle: s.imageAlt, image_url: s.image, body: s.body.join("\n\n") })),
  inequality: () => inequality.sections.map((s) => ({ title: s.h, body: s.body.join("\n\n") })),
  field_notes: () => [
    ...ecology.strip.map((s) => ({ title: s.imageAlt, image_url: s.image, data: { page: "ecology" } })),
    ...[i1, i2, i3, i4, i5, i6, i7, i8, i9, i10].map((a, n) => ({ title: `Field and archive photograph ${n + 1}`, image_url: assetUrl(a), data: { page: "inequality" } })),
  ],
};
