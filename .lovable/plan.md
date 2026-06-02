## Goals

1. Rework `/education-for-liberty` so the PDF is no longer embedded inline. Replace with a flippable book viewer + prominent download button.
2. Move **Palimpsest** out of the Education for Liberty mega-menu and promote it to a top-level nav link.
3. Expand the EFL dropdown with the additional subsections present on the old site's mega-menu.
4. Add an Instagram gallery section so visitors can see @thefazalali posts inside the site.
5. Add hero imagery to every internal page so no page feels "bare".
6. End-to-end design pass: same black/white editorial language across every route, articles fully readable, nav links all working.

---

## 1. Education for Liberty page

Replace the current `<iframe>` PDF embed with a **flippable book**.

- Add `react-pageflip` (small, no native deps, Worker-safe — pure React/CSS).
- Render the book as a 2-page spread on desktop, single page on mobile.
- Pages are rasterized previews of the PDF. To avoid a heavy PDF.js runtime, I will pre-render the PDF's pages to JPGs at build time using a small script, upload them via `lovable-assets`, and feed the URLs into the flipbook. (First pass: render ~24 representative pages — Preface, Prolegomenon, chapter openers, closing. Full 142-page rasterization is possible but heavy; happy to do it if you want all pages.)
- Below the book: a large **Download the PDF** button (links to the existing `EducationforLiberty.pdf` on `fazalali.com`) + **Buy on Amazon** secondary CTA.
- Keep the chapter breakdown + Podcast/Palimpsest cross-links below.

## 2. Navigation

Update `SiteNav.tsx`:

- Top-level links become: **Articles · Education for Liberty ▾ · Palimpsest · Omeros · About · Write Me**.
- Education for Liberty dropdown contains: **The Book**, **Podcast**, **Ecology**, **Inequality**, **New Ecology / Inequality Podcast** (the items you referenced from the old site's submenu).
- Palimpsest is a standalone top-level link (no longer nested).
- Mobile menu mirrors the same structure with a collapsible EFL group.

New routes to add:
- `/ecology` — essay-style landing page for Ecology content.
- `/inequality` — essay-style landing page for Inequality content.
- (Podcast already exists at `/podcast`.)

## 3. Articles

- Audit `src/content/articles.ts` against the full article list on fazalali.com/blog and add any missing entries with title, date, excerpt, body, and topic.
- Confirm every article slug renders correctly at `/writing/$slug` with hero image, drop-cap body, pull quotes, and "Next essay" footer.
- Articles index keeps the editorial layout (featured + 2-col stagger) and links into the detail pages.

## 4. Instagram gallery

- Add an **Instagram** section to the homepage and a dedicated `/gallery` route.
- Approach: a static curated grid of 9–12 posts from `@thefazalali` (image + caption + link to the post on instagram.com). Images uploaded via `lovable-assets`.
- I will **not** wire a live Instagram Graph API feed by default — that requires a Meta Business account, app review, and a long-lived token. If you want live posts, we can add that as a follow-up via a connector.

## 5. Hero imagery on every page

Each internal page gets a `PageHero` with a relevant background image (right-side image on desktop, full-bleed image on mobile), keeping the black/white editorial palette:

- `/about` — portrait photograph treatment.
- `/writing` — abstract editorial typography texture.
- `/education-for-liberty` — book cover backdrop.
- `/podcast` — waveform / studio imagery.
- `/palimpsest` — archival manuscript texture.
- `/ecology`, `/inequality` — thematic imagery.
- `/omeros-ai` — abstract neural / poetic imagery.
- `/gallery` — Instagram-grid mosaic backdrop.

All images generated via `imagegen` in a consistent monochrome editorial style.

## 6. Site-wide polish pass

- Verify every nav link (desktop + mobile + footer) resolves to an existing route.
- Verify the dark/light nav theme switcher fires on every page that uses `PageHero`.
- Verify Write Me drawer opens from every page.
- Run through every route at 1054px (current viewport) and at mobile, fix any overflow / overlap / spacing issues.
- Update `head()` meta on every route (title, description, og:title, og:description) so each page is uniquely shareable.

---

## Technical notes

- New dep: `react-pageflip` (added via `bun add`).
- PDF rasterization: one-off Node script using `pdfjs-dist` + `@napi-rs/canvas` run in the sandbox, writing JPGs to `src/assets/book/`, each uploaded via `lovable-assets` and referenced from `src/content/book.ts`.
- New routes (file-based): `src/routes/ecology.tsx`, `src/routes/inequality.tsx`, `src/routes/gallery.tsx`.
- New content modules: `src/content/book.ts`, `src/content/ecology.ts`, `src/content/inequality.ts`, `src/content/gallery.ts`.
- New components: `src/components/site/Flipbook.tsx` (client-only wrapper for `react-pageflip`, SSR-guarded), `src/components/site/InstagramGrid.tsx`.
- `PageHero` extended with an optional `image` prop for right-side or full-bleed imagery.
- No backend changes. No connectors required for this pass.

---

## Open questions (will assume the defaults below unless you say otherwise)

1. **Flipbook page count** — default: ~24 curated spreads. Say "all pages" if you want full 142-page rasterization (slower build, larger asset payload).
2. **Instagram** — default: curated static grid. Say "live feed" if you want me to wire the Meta Graph API via a connector.
3. **EFL dropdown items** — I'll use **The Book · Podcast · Ecology · Inequality · New Ecology / Inequality Podcast**. Tell me if the labels should differ.
