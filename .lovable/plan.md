## Reference review — bartoszkolenda.com

Pulled the live site. The homepage is a slow, cinematic, mostly single-column ride with these signature moves:

1. **Opening "title card"** — full-viewport empty stage. A short statement appears center-screen in a refined serif italic mixed with a clean sans ("Designing *Functional and Aesthetic* Outdoor Green Environments."). The page label sits at the very bottom, small. No nav distractions. Long pause before anything else.
2. **Featured work** — large, full-bleed media cards stacked vertically. Each card has a soft noise/grain overlay, a small "View" pill, and a tiny caption row (title + year) below. Cards reveal on scroll with a subtle fade + slight upward translate. There is a perceptible scroll-pinning / parallax feel between cards.
3. **Manifesto block** — an oversized serif sentence ("Landscape design is not just about placing plants…") on its own breath of space.
4. **Portrait + bio** — a tall portrait of him with grain texture beside a short personal paragraph and a "More about me" link with the chunky arrow-circle button motif.
5. **Services list** — alternating image / label / paragraph rows. Image left, big title right, then description and a "MORE" pill. Each row gets its own scroll reveal.
6. **Range / categories** — small numbered chapters "(01) (02)…" with image + 1-line description.
7. **Footer** — gigantic name "BartKolenda" set as a horizon-line wordmark; tiny meta links (Instagram, email, year) anchored at the very bottom.
8. **Texture & finish** — persistent fine film-grain overlay on imagery, hairline rules, monochrome palette, generous negative space, slow easings (~900–1200ms, custom cubic-bezier).

Animation language to mirror: scroll-driven fade-up reveals, image scale-in on enter, sticky/pin behavior on hero, smooth in-page anchor scrolling, hover micro-interactions on pills/buttons (circle grows, label slides).

## What gets built (homepage only, this pass)

Black & white editorial homepage at `/`, replacing the current Zara-flavored layout. Keep the rest of the site (about, writing, book, omeros, contact) untouched for now.

### Sections, top to bottom

```text
┌──────────────────────────────────────────┐
│  minimal nav (left wordmark, right links)│
├──────────────────────────────────────────┤
│  TITLE CARD                               │
│  centered serif+italic statement          │
│  tiny "FazalAli" mark at bottom           │
├──────────────────────────────────────────┤
│  FEATURED WORK (stack of 3 large cards)   │
│  Education for Liberty / Omeros AI /      │
│  Selected Essays — full-bleed media,      │
│  grain overlay, view pill, caption row    │
├──────────────────────────────────────────┤
│  MANIFESTO                                │
│  oversized italic quote, breath of space  │
├──────────────────────────────────────────┤
│  PORTRAIT + BIO                           │
│  tall b&w portrait | short paragraph +    │
│  "More about me" circle-arrow button      │
├──────────────────────────────────────────┤
│  WHAT I DO (services-style rows)          │
│  Writing · Books · Talks · Critical Theory│
│  alternating image/title/paragraph rows   │
├──────────────────────────────────────────┤
│  RANGE / CHAPTERS                         │
│  (01) Essays  (02) Education for Liberty  │
│  (03) Omeros AI  (04) West Indies         │
├──────────────────────────────────────────┤
│  FOOTER                                   │
│  giant "FAZAL ALI" wordmark spanning      │
│  full width; meta row underneath          │
└──────────────────────────────────────────┘
```

### Design system updates

- **Palette:** pure black `#0a0a0a` on milk-white `#f6f4ef` (and inverted for sections). Drop any colored accents from the current build.
- **Type:** keep Bodoni Moda for display (italic carries the editorial gesture), pair with a cleaner geometric sans for body — switch from Inter to **Söhne-like / Geist Sans** (use `Geist` from Google Fonts as the closest free analogue). Tight tracking, generous leading.
- **Grain texture:** reintroduce a subtle SVG/PNG noise overlay (`.grain`) on imagery only.
- **Edges:** stay sharp (no border radius), hairline rules at `foreground/15`.
- **Buttons:** circle-arrow pill ("View", "More about me", "MORE") — fixed-height pill with right-aligned arrow that translates on hover.

### Animation language (motion/react)

- Hero title: staggered word fade-up after 200ms, 1.1s ease `[0.22,1,0.36,1]`.
- Scroll reveals: every section uses `whileInView` opacity 0→1 + y 40→0, 900ms.
- Featured cards: image `scale` 1.05→1 on enter; card stays sticky briefly before the next slides over (CSS `position: sticky` with offset).
- Footer wordmark: scales/fades in as it enters viewport; subtle continuous breathing (1.00 ↔ 1.01) via `motion`.
- Lenis-style smooth scroll: add `lenis` package for buttery scroll.

### Portrait regeneration

Use `imagegen--edit_image` on the current portrait (`https://fazalali.com/wp-content/uploads/2025/10/Fazal-Ali-Profile-2025.jpeg`) with an editorial brief: high-contrast b&w, sharper detail, cleaner background, magazine-cover feel, **facial features preserved exactly**. Save to `src/assets/fazal-portrait.jpg`, aspect 3:4, premium quality.

### Files

- `src/styles.css` — add `.grain`, switch body font to Geist, refine tokens for pure b&w.
- `src/routes/__root.tsx` — load Geist + Bodoni Moda from Google Fonts; mount Lenis smooth-scroll provider.
- `src/components/site/SiteNav.tsx` — slim to just left wordmark + 3 right links, no border, transparent over hero.
- `src/components/site/SiteFooter.tsx` — replace current layout with giant `FAZAL ALI` wordmark + small meta row.
- `src/components/site/FeaturedStack.tsx` — new sticky-stack card component.
- `src/components/site/CirclePill.tsx` — new arrow-circle button.
- `src/components/site/Grain.tsx` — new noise overlay.
- `src/routes/index.tsx` — full rewrite to the layout above.
- `src/assets/fazal-portrait.jpg` — regenerated portrait.
- Add dep: `lenis` (via `bun add lenis`).

### Out of scope (this pass)

- Inner pages (about, writing, writing/$slug, education-for-liberty, omeros-ai, contact) keep their current look. We'll roll the same system through them in the next round once you sign off on the homepage feel.
