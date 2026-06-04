## Goal

Homepage `/` mirrors fluid.glass's cadence: tiny top chrome, a centered floating glass pill at the bottom, a hero whose image expands inset → full bleed, large full-bleed parallax photo bands between text sections, and tall image-card grids — all on the existing Fazal Ali content (Hero, Featured, Manifesto, Portrait, BookSection, Range, LatestWriting, InstagramGrid, Newsletter). Existing red/iron palette and Bodoni display stay.

## Navigation

- On `/` only, hide the full top `SiteNav` (Journal, EFL, etc.). Replace it with a minimal top bar: small centered wordmark + single top-right `Write Me` link.
- All other routes keep the current solid-white top nav untouched.
- Globally mount `FloatingBottomNav` (already exists from last pass) — small glass pill, centered bottom, slides in after scroll. Refine it to read more like fluid.glass: tighter padding, smaller type, brand mark on the left, links in the middle, single accent CTA on the right.

## Hero — image expansion

Rebuild `Hero` so the marble-bust image starts inset with soft rounded corners and ~80% width, then expands to full-bleed with radius 0 as the user scrolls down the first viewport. Title and eyebrow stay overlaid; both fade as the frame widens. Drop the current fixed-position spacer trick — use a normal sticky section instead so the expansion reads cleanly.

## Section cadence (top to bottom)

1. **Hero (image-expand)** — new behavior above.
2. **Quietline** — keep, minor type tightening.
3. **Parallax band #1** — full-bleed photographic break, image scrolls slower than the page (uses existing `ParallaxImage`). Caption-only overlay.
4. **FeaturedSticky** — keep the existing sticky 3-slide section.
5. **Manifesto** — keep.
6. **ImageExpand interlude** — already added; keep.
7. **Portrait** — keep.
8. **Parallax band #2** — second full-bleed parallax break with a different image and a quiet pull-quote.
9. **BookSection** — keep.
10. **Range (cards)** — restyle as a fluid.glass-style 4-up tall image card grid (portrait aspect ~3:4, hairline border, title + chip labels, subtle hover lift). Reuse existing `Range` data, no new content.
11. **LatestWriting** — keep.
12. **InstagramGrid** — keep.
13. **Newsletter** — keep.

## Motion details

- Parallax bands use `ParallaxImage` with `strength={22}` and a longer `h-[120vh]` outer so the speed differential is obvious.
- Card grid uses `SlideIn` from the bottom with staggered delays (0, 0.06, 0.12, 0.18).
- Honor `prefers-reduced-motion` everywhere (existing components already do).

## Files

New / changed:

- `src/components/site/FloatingBottomNav.tsx` — tighten styling (smaller pill, brand mark, condensed links).
- `src/components/site/SiteNav.tsx` — early-return `null` when `pathname === "/"` so it is hidden only on the homepage.
- `src/components/site/HomeTopBar.tsx` *(new)* — minimal centered wordmark + `Write Me` link, mounted only on `/`.
- `src/components/site/ImageExpand.tsx` — already exists, reuse.
- `src/routes/index.tsx` — restructure `Home()` per the cadence above; rewrite `Hero` to use image-expand; add two `ParallaxImage` break bands; restyle `Range` cards into the tall 4-up image grid; mount `HomeTopBar` at the top of `Home`.

No content/copy changes, no palette changes, no new dependencies, no other routes touched.

## Out of scope

- Top nav on non-home routes (untouched).
- Footer (untouched).
- Color system / typography tokens (untouched).
- Any backend / data work.
