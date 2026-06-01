# Plan: Refresh + content migration for fazalali.com clone

## 1. Asset regeneration (sharper, color, cool/neutral tone)
Using the 3 uploaded references — DO NOT alter the logo mark, Fazal Ali's face, or the book cover artwork.
- `src/assets/brand-fia.png` — upscale uploaded FIA mark, transparent background, kept identical.
- `src/assets/fazal-portrait.jpg` — regenerate sharper version of the portrait (same face, same suit/tie); replace the warm-tone `fazal-portrait.jpg`.
- `src/assets/book-education-for-liberty.jpg` — regenerate sharper version of the book cover, unchanged composition/typography.
- Replace all current warm/sepia hero & section imagery with cool/neutral colour photography (cool-blue desk, library, classroom, AI/tech, Caribbean coast). Files to regenerate: `hero-desk.jpg`, `hero-book.jpg`, `featured-*.jpg`, `practice-*.jpg`. Hero gets a brighter, lighter palette (off-white / pale blue).

## 2. Book section ("Education for Liberty")
On the home page, add a dedicated section above the footer:
- Left: large book cover (new asset).
- Right: title, subtitle "A Monograph", short synopsis (drawn from the existing `/education-for-liberty` copy on fazalali.com), foreword (Sir George Alleyne) and epilogue (Archbishop Joseph Everard Harris) credits, and a CTA to `/education-for-liberty`.
Also tighten the existing `/education-for-liberty` route to use the new cover + cool palette.

## 3. Content migration from fazalali.com
Scrape and port verbatim (text unchanged):
- **Articles index** → `/writing` rebuilt as a chronological list of all posts found on fazalali.com/blog (titles, dates, excerpts, slugs).
- **Individual articles** → `/writing/$slug` for each post. Body copy copied as-is from the source post.
- **About** → `/about` replaced with the bio text from fazalali.com/about.
- **Education for Liberty** → `/education-for-liberty` updated with the full description from the source page.
- **Write Me / Contact** → `/contact` updated to match source form fields.
Nav order matches source: Home, Articles, Education for Liberty, About, Write Me.

## 4. Visual system — cool / neutral
- Shift `src/styles.css` tokens from warm cream/sepia to a cool neutral palette: off-white background (oklch ~0.98 0.005 240), deep navy ink (matching FIA logo navy #1B1F3A), muted slate, soft sky accent. Keep the editorial typography pairing.
- Replace any remaining black-and-white image treatments with the new colour photography. No grayscale filters on imagery.

## 5. Intro reveal animation (FIA logo)
- New `src/components/site/IntroReveal.tsx`: full-screen overlay on first visit per session. FIA logo draws/fades in, wordmark "FAZAL ALI" types in beneath, overlay swipes down to reveal site. ~1.6s, skippable on click, respects `prefers-reduced-motion`. Mounted in `__root.tsx`, gated by `sessionStorage`.

## 6. Page transitions
- New `src/components/site/PageTransition.tsx` wrapping `<Outlet />` in `__root.tsx`. Uses framer-motion `AnimatePresence` keyed on `useLocation().pathname`: outgoing swipes down + fades, incoming swipes up + fades (~450ms, eased). Disabled under reduced motion.

## 7. Header, accessibility & UX review
- Audit every route at 390px and 1440px: header contrast on light bg (navy ink on off-white, glassy blur on scroll), tap targets ≥44px, alt text on every image, single `<h1>` per page, focus-visible rings, `aria-label` on icon buttons, skip-to-content link.
- Verify no horizontal overflow, fluid type scales, image aspect ratios, and that animations don't trap focus or block scroll.

## Technical notes
- Asset regen via `imagegen--edit_image` with the three uploads as references (no facial/cover/logo changes — only resolution + sharpness + slight colour grading where appropriate). New scenic images via `imagegen--generate_image` (cool palette prompts). All registered via `lovable-assets` CLI → `.asset.json` pointers.
- Article scraping: fetch fazalali.com/blog pagination + each post URL via `code--fetch_website`, store as TS data module `src/content/articles.ts` keyed by slug; `writing.tsx` and `writing.$slug.tsx` read from it.
- Page transition + intro reveal use existing `framer-motion` dependency.
- All new colour tokens go through `src/styles.css`; no hard-coded hex in components.
- Each route keeps a unique `head()` (title, description, og); `og:image` only at leaves.

## Out of scope
- No changes to article wording, bio wording, or book copy.
- Logo mark, portrait face, book cover artwork remain visually identical — only resolution/sharpness improved.
