## Goal
Replace all warm-toned imagery (sepia, golden, amber, warm beach) with **cool, neutral, modern editorial photography** — crisp greys, slate blues, fog whites, charcoal — and tighten the layout into a clean minimal editorial feel.

## Image Replacements (regenerate via imagegen, save over existing .jpg paths)

All new images: cool grey/slate/fog palette, soft natural light, modern editorial photography, no warm yellow/orange/sepia cast, no parchment, no colonial/historic textures.

**Hero images** (modern, cool, atmospheric)
- `hero-beach.jpg` (asset) → cool overcast Caribbean coast, silver sea, grey sky
- `hero-desk.jpg` → minimalist desk, white/oak, soft cool window light
- `hero-writing.jpg` → open notebook, cool morning light, neutral linen
- `hero-podcast.jpg` → modern matte-black mic, soft grey backdrop
- `hero-omeros.jpg` → abstract data/neural mesh in cool blues
- `hero-ecology.jpg` → mangrove/sea in muted teal-grey
- `hero-inequality.jpg` → modern architecture, concrete, cool light
- `hero-palimpsest.jpg` → layered paper textures in cool greys
- `hero-gallery.jpg` → minimal gallery wall, cool whites
- `hero-book.jpg`, `hero-statue.jpg` → cool tones if still referenced

**Featured / practice** (homepage cards)
- `featured-education.jpg`, `featured-omeros.jpg`, `featured-writing.jpg`
- `practice-essays.jpg`, `practice-book.jpg`, `practice-omeros.jpg`
→ editorial modern still lifes, cool neutral palette

**Article thumbnails** (10 in `src/content/articles.ts`)
- carnival, failure, fabric, shield, gravity, datacenter, shelf, 100model, cern, divine → modern cool-toned editorial photography matching each topic (data center, fabric textures, architecture, etc.) — no warm cast

**Portraits** — keep `fazal-portrait.jpg` / `fazal-cutout.png` (real photos of the author, do not replace), but adjust surrounding frame styling to cool neutral.

## Styling refinements (`src/styles.css` + components)
- Audit and remove any remaining warm beige/cream/amber section backgrounds; shift to ivory/off-white `oklch(0.97 0.005 250)` and cool charcoal `oklch(0.18 0.015 250)`.
- Cards/borders: hairline cool grey, no warm shadows.
- Confirm `PageHero` cream bg → swap to cool fog white.
- Remove `grain` warm tint if present.

## Layout polish (minimal editorial)
- Tighten section spacing, larger negative space.
- Confirm typography stays as-is (client loves the font).
- Image treatments: rounded-none or rounded-sm, hairline border, no heavy shadows — gallery/editorial feel.

## Files touched
- All `src/assets/*.jpg` (regenerated in place, cool palette)
- `src/styles.css` (warm token audit)
- `src/components/site/PageHero.tsx` (background)
- `src/components/site/BookSection.tsx`, `FeaturedStack.tsx`, `ScrollGrowBento.tsx` (frame styling if warm)
- No route logic changes; image imports stay the same.

## Out of scope
- No layout/route restructuring
- No font changes
- No copy changes
- Author portraits kept as-is