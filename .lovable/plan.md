# Homepage UI/UX Review — Findings & Fixes

I walked through `/` end‑to‑end at desktop (1440), tablet, and mobile (375). The composition is strong, but a handful of consistent issues hurt polish. Here is what I found, by section, and what I will change.

## Findings

### 1. Site header (`SiteNav.tsx`)
- The glass background (`bg-background/70 backdrop-blur-xl`) is too transparent — Latest Writing titles and the "Three things" heading read **through** the bar.
- Over the dark Portrait section the bar shows a light glass, and the inverted logo becomes a black mark on a near‑white blur — barely visible.
- No bottom hairline visible against white sections.

### 2. Hero (`Hero` in `index.tsx`)
- Word‑by‑word `<Word>` spans break the headline awkwardly on mobile ("Reading the" stays on line 1, "machines" jumps alone) because each word is `inline-block` with overflow hidden — they don't wrap as a flowing paragraph.
- Eyebrow ("FOLIO I · …") sits flush under the fixed header and reads behind the dark logo at first paint.

### 3. Featured sticky (`FeaturedSticky`)
- **Title overflow:** active title uses `clamp(2.2rem, 4.2vw, 3.6rem)` inside a `col-span-4` column. "Selected Writing" breaks to two lines and "Writing." touches the right edge.
- **Vertical balance:** at slide 1 the right column's content sits centered but reads as an empty top half; the eyebrow + icon strip floats with no anchor.
- **Header collision:** the section heading "Three things, in order." sits right under the fixed nav and is partially covered while sticky.
- **Mobile:** with one column, the active item's expanded description pushes the inactive items off‑screen but the small inactive titles still float oddly. The bottom progress bar is hidden behind the section's content.

### 4. Manifesto
- Works. Tighten only the leading on mobile (currently 1.08 at 8vw causes uneven gaps).

### 5. Portrait
- Black section is fine, but `Fazal / Ali.` at `11vw` overlaps the portrait column on narrower desktops (≈1024–1180). Needs a slightly smaller cap or different grid weight.
- Header glass over this dark section is the worst offender for logo legibility.

### 6. Book section (`BookSection.tsx`)
- Background is a pale blue tint (`bg-muted` style) — the user explicitly required all section backgrounds to be **pure white or pure black**. Must switch to `--background`.

### 7. Range / Four threads cards
- Works. Cards align well desktop + mobile. Keep.

### 8. Latest Writing
- The hero article title sits flush at the top of its section and is overlapped by the transparent header on scroll. Need extra top padding + the header fix above.

---

## Fixes (all frontend / presentation only)

### `src/components/site/SiteNav.tsx`
- Strengthen scrolled state: `bg-background/85 backdrop-blur-2xl border-b border-border` and add a subtle shadow.
- Add a `useSectionTheme` effect using `IntersectionObserver` (or a simple `data-nav-theme` attribute on sections) so the nav can flip to `text-white` + white logo when over the Portrait (`#000000`) section, in addition to the existing hero rule. Cheap implementation: tag the Portrait `<section>` with `data-nav="dark"` and use an observer in `SiteNav` to detect it.

### `src/routes/index.tsx` — Hero
- Replace per‑word `<Word>` spans with a single `BlurReveal` headline (still animated) so the paragraph wraps naturally on small screens. Keep the slide‑up but lose the rigid line breaks.
- Add `pt-28` to the eyebrow container so it clears the header.

### `src/routes/index.tsx` — FeaturedSticky
- Reduce active title clamp to `clamp(1.9rem, 3.2vw, 2.8rem)`; let inactive stay small. Add `pr-4` and `break-words` to the column.
- Change grid weights from `8 / 4` to `7 / 5` so the text column has room.
- Add `pt-32` on the sticky container (currently `pt-20/24`) so the section heading clears the fixed nav while pinned.
- On mobile (`<lg`): switch the layout to image first (aspect 4/5) then a single active block (title + note + link) below — drop the small inactive stack on mobile; rely on the progress bar + counter to communicate position. Move the mobile progress bar to the **top** of the sticky pane so it isn't hidden.

### `src/routes/index.tsx` — Portrait
- Drop the `Fazal / Ali` size from `md:text-[11vw]` to `md:text-[9.5vw]` and add `md:col-span-6` for the name on mid desktop so columns balance.
- Add `data-nav="dark"` on the `<section>` for the nav observer.

### `src/components/site/BookSection.tsx`
- Replace any tinted background with `bg-background` (pure white / pure black via tokens). Remove the light blue panel; keep the cover artwork.

### `src/routes/index.tsx` — Latest Writing
- Add `scroll-mt-24` and `pt-24` to the section so headlines aren't kissed by the nav on scroll.

### Manifesto (small)
- Tighten leading on mobile: `leading-[1.04]` at the `8vw` step.

---

## Out of scope
- No backend changes, no copy rewrites, no new sections, no route changes.
- Animations stay; only headline animation in Hero is simplified to fix wrapping.

## Verification
After the edits I will re‑capture at **1440**, **820**, and **375** widths, scroll each section, and confirm: header legibility on every section, no title overflow in FeaturedSticky, pure white/black backgrounds, hero headline wrapping cleanly on mobile.
