## Vision

A story-driven, premium-minimal site for **Dr. Fazal Ibrahim Ali** — writer, scholar, and brand identity *Omeros AI*. The aesthetic mirrors the reference site fluid.glass: vast white space, a single small mark anchoring the viewport, slow reveals on scroll, and a quiet, confident voice. The current WordPress site is replaced entirely with a hand-crafted TanStack Start build.

## Design Language

- **Palette:** milk-white background `oklch(0.96 0.005 80)` (#F1EEE8-ish), iron-ore foreground `oklch(0.22 0.01 250)` (deep graphite, not pure black), soft warm shadows. No accent colors — contrast comes from typography and depth.
- **Typography:** display in a refined serif (Instrument Serif or Cormorant) for headlines & pull-quotes; body in a clean grotesque (Inter Tight or Söhne-alike via Geist) — pairing signals literary + technological.
- **Frosted glass system:** translucent panels using `backdrop-filter: blur()` with layered soft shadows over subtle moving gradient blobs in the background. (Authored with the standard property only, per the Tailwind 4 gotcha — no hand-written `-webkit-` prefixes.)
- **Bento grid that grows on scroll:** tiles start compact near the fold and progressively scale up / gain prominence as the user scrolls, using IntersectionObserver + transform/scale tied to scroll progress (Motion for React).
- **Motion vocabulary:** ultra-slow fades, masked text reveals, a tiny logo that "settles" on load (fluid.glass-style), cursor-follow soft glow on glass panels. Restrained — never decorative for its own sake.

## Site Structure (separate routes, real metadata each)

```text
/                 Home — story-driven scroll narrative
/about            Who he is: Cambridge, UWI, Amartya Sen lineage
/writing          Articles index (curated, story-grouped)
/writing/$slug    Individual article (long-form reading layout)
/education-for-liberty   Signature book — hero feature page
/omeros-ai        Brand/identity statement: critical theory + AI
/contact          Write Me
```

## Page-by-page

**Home — the narrative scroll**
1. Hero: enormous whitespace, small wordmark center, single line "Writer. Scholar. West Indian voice on AI." — fluid.glass-style settle animation.
2. Manifesto block: a slow-typed pull-quote on his shift to *Omeros AI* and critical theory in AI (drawn from the brief: "my writing is about critical theory in AI… my contribution to the West Indies").
3. Bento grid of "ideas" — 6–8 frosted tiles (Books, Articles, Omeros AI, West Indies, Education for Liberty, Art, Speaking, Contact). Tiles begin small/uniform; as the user scrolls each tile grows and the active one expands to dominate.
4. Featured writing strip — 3 most recent articles as glass cards over a drifting gradient.
5. Closing CTA: "Write Me" — single iron-ore button on milk-white.

**About** — long-form portrait with his Cambridge/UWI story, mentors (Sen, Rees, Borysiewicz), institutional roles. Editorial two-column layout, large portrait in a frosted frame.

**Education for Liberty** — book as hero: cover, premise (built on Sen's *Development as Freedom* & Rawls' *A Theory of Justice*), chapter teasers in a vertical bento.

**Omeros AI** — brand identity page: what it is, why critical theory in AI, the West Indies frame. The "braver, more adventurous" voice he asked for lives here.

**Writing index** — chronological / topic-grouped; each post a glass card. Article template optimized for long reading (max-width measure, generous leading, drop caps optional).

**Contact** — simple form (name, email, message) posting to a server function; success state in a glass panel.

## Content Sourcing

- Bio, scholarship, and book description: paraphrased from the existing About page.
- Article titles/excerpts: pulled from the current home feed (AI & carnival costumes, failure in the age of AI, Mythos, AI chats & prosecutors, AI gravity, defence of data, etc.) — re-typeset, not re-styled from WordPress.
- Imagery: reuse his existing portrait (`Fazal-Ali-Profile-2025.jpeg`) plus newly generated abstract glass/light textures for the bento background layer. No stock photos.

## Technical Section

- TanStack Start file-based routes under `src/routes/` (one file per page above; flat dot-separated for `writing.$slug.tsx`). Each route's `head()` sets unique title/description/og.
- Design tokens defined in `src/styles.css` (`--background`, `--foreground`, `--surface-glass`, `--shadow-soft`, `--gradient-aurora`, `--radius`). No raw color classes in components.
- Motion: `motion/react` for entrances, scroll-driven scale (`useScroll` + `useTransform`) for the growing bento.
- Frosted panels: Tailwind `backdrop-blur-2xl` utilities + `bg-white/40` surfaces; never hand-write `-webkit-backdrop-filter`.
- Fonts via Google Fonts `<link>` in root `head()`.
- Reusable components: `GlassPanel`, `BentoTile`, `ScrollGrowBento`, `Reveal`, `Marquee`, `SiteNav`, `SiteFooter`, `ArticleCard`.
- Articles stored as a typed TS array in `src/content/articles.ts` for now (no CMS) — easy to migrate later.
- Contact form: `createServerFn({ method: 'POST' })` with Zod validation; logs submission (no email provider wired unless requested).
- SEO: per-route metadata, semantic landmarks, alt text, lazy images, single H1 per page.
- Delete the existing placeholder index content and the blank-app SVG reference.

## What I'll Build in This Pass

1. Tokens + global styles (palette, fonts, glass primitives, gradient backdrop).
2. Shared `SiteNav`, `SiteFooter`, `GlassPanel`, `Reveal`, `ScrollGrowBento`.
3. All 7 routes above with real content, real metadata.
4. Generated background texture(s) for the aurora layer.
5. Contact server function.

## Open Questions (will assume defaults unless you say otherwise)

- **Typography pair:** default to Instrument Serif + Inter Tight. Want to pick differently?
- **Articles:** hardcode the ~6 visible on the current home page, or fetch live from WordPress? Default: hardcode for now.
- **Contact submission:** log only (no email send) unless you want me to wire an email provider.
