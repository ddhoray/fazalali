
# Homepage Redesign — Pass 2

A focused refinement pass on the homepage only. Inner pages stay as-is.

## 1. Reference research (before any code)

- Scrape **bartoszkolenda.com** (footer / contact) to lift: email, phone, physical address, and every social link. Use these verbatim in our footer + contact strip.
- Scrape the same site for the **logomark** (SVG/PNG). We will regenerate a sharpened, vectorish version of the same mark as a clean SVG and use it in the header — auto-inverting based on background (white on dark hero, black on light sections). This becomes the brand mark in the nav.
- Pull one or two motion cues from **fluid.glass** (slow image-reveal masks, soft fluid easing on hover, cursor-following image previews). We will adapt — not copy — into our existing motion vocabulary.

## 2. Hero — declutter + fix the image

Current hero has too many micro-labels (Vol. 01, Edition 01, Trinidad, FW2026, etc.). Strip all of it.

New hero:
- Full-bleed editorial photograph (regenerate `hero-desk.jpg` as a sharper, higher-contrast version — currently feels muddy).
- Only three on-screen elements: the brand mark (top-left, in nav), the nav links (top-right), and a single staggered serif statement centered-left. No eyebrow chips, no edition numbers, no location stamps.
- Subtle parallax on the image, slow word-reveal on the headline. Nothing else.

## 3. Featured Work — kill the sticky-stack, build a "floating image" section

Replace `FeaturedStack.tsx` with a new section where the **text is the layout** and the **image floats in response**:

```text
┌──────────────────────────────────────────────────┐
│  01                                              │
│                                                  │
│  Education            ◐ [floating image follows  │
│  for Liberty            cursor / hover target]   │
│                                                  │
│                                  ESSAY · 2026 →  │
├──────────────────────────────────────────────────┤
│  02                                              │
│  Omeros AI                                       │
│  ...                                             │
```

- Each row is a giant serif title on a light field.
- On hover (desktop) a small framed image fades + scales in next to the cursor, locked to the row.
- On mobile, the image sits inline under the title (no cursor logic).
- Image transitions from B&W → full color on hover (see §5).
- Reuses the existing 3 featured images — no new generation needed for this section.

## 4. Portrait section — "Fazal Ali as the hero"

Regenerate the portrait (`fazal-portrait.jpg`) — **same face, same facial features, do not alter likeness**. Direction: high-contrast editorial portrait, soft natural light, magazine cover composition, slightly grainier, more aesthetic, color preserved (this becomes one of our "color-allowed" images).

Layout:
- Portrait centered on the page, large (~55vh tall, portrait crop).
- Bio text wraps **around** the image in a magazine-style layout: short paragraph top-left, role/credentials top-right, longer bio bottom-left, pull-quote bottom-right. Hairline rules between.
- The portrait itself stays in color; everything around it is mono — so he reads as the hero of the page.

## 5. Color system — selective color on hover

Site stays black & white by default. We add a `.mono-to-color` utility:

- All editorial images render through `filter: grayscale(1) contrast(1.05)` by default.
- On hover (and on focus), transition over 700ms to `grayscale(0)` — the image "blooms" into color.
- Applies to: featured-work images, range grid, recent pieces. Does **not** apply to the portrait (always color) or to pure typographic sections.

## 6. Recent pieces / AI mood board — hover preview

For the article/mood-board list, add a cursor-following preview:
- Hovering a list item reveals a small framed thumbnail near the cursor (fluid.glass-style ease-out).
- Thumbnail fades + slightly scales; leaves on mouseout.
- Reuses existing assets; no new images.

## 7. Footer — letter-spaced wordmark + real contact

- "FAZAL ALI" wordmark stretched to **exactly** the footer width using `letter-spacing` + `font-stretch` (computed from container width via a `ResizeObserver` so it always justifies edge-to-edge).
- Real contact info replaces the placeholder Trinidad / Omeros AI strip:
  - Email, phone, address (pulled from reference site research in §1)
  - Social links (Instagram, plus whatever else the reference site lists)
- One-line credit row stays.

## 8. Nav

- Replace text logotype with the regenerated SVG brand mark.
- Mark auto-inverts using `currentColor` so it follows the existing scroll/section text-color logic (white on dark hero → black on light section).
- Remove the "Instagram" link from the nav (moves to footer only) to reduce clutter.

## 9. Files touched

- `src/routes/index.tsx` — declutter hero, replace featured section, restructure portrait section
- `src/components/site/FeaturedStack.tsx` → **replaced** by `FloatingImageList.tsx`
- `src/components/site/SiteNav.tsx` — SVG logo, drop Instagram link
- `src/components/site/SiteFooter.tsx` — justified wordmark, real contact info
- `src/components/site/HoverImage.tsx` — **new**, cursor-following preview component (used by recent pieces + featured list)
- `src/components/site/BrandMark.tsx` — **new**, the regenerated SVG logo
- `src/styles.css` — `.mono-to-color` utility, justified-wordmark helpers
- `src/assets/fazal-portrait.jpg` — regenerate (face preserved)
- `src/assets/hero-desk.jpg` — regenerate (sharper, higher contrast)

## 10. Out of scope

Inner pages (about, writing, book, omeros, contact) — untouched this pass. We tighten the homepage first, then propagate.

---

**Question before I build:** can you confirm the reference site for the address / phone / socials / logo is **bartoszkolenda.com** (the one you sent earlier)? If the contact info should come from somewhere else (your own details, or a different site), paste it and I'll use that instead.
