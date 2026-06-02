## Scope

Frontend-only refinements to homepage + footer. No backend, no routes, no copy rewrites beyond the requested footer spelling.

## 1. Hero — unified statue aesthetic + normal parallax

- Generate a new hero image in the same classical / sculptural register as `featured-education.jpg` / `featured-omeros.jpg` (monochrome neutral stone, museum lighting, soft grain). Save as `src/assets/hero-statue.jpg`.
- Replace `heroImage` import with the new statue image.
- Remove the pinned/sticky scroll-frame mechanic in `Hero`:
  - Drop the `180svh` track, `sticky top-0`, and the `opacity` transform on the scrolling frame.
  - Section becomes a normal `min-h-screen` hero.
  - Add a subtle parallax (`useScroll` + `useTransform` on the image only, ~`y: 0 → -12%`), so the image drifts slowly while the section scrolls normally past it.
- Cleaner composition:
  - Lighter overlay (`from-black/55 via-black/25 to-black/10`) so the statue reads clearly.
  - Headline stays, but reduce vertical noise — eyebrow top-left, headline + lede bottom-left, no other chrome.

## 2. Featured Work (sticky three pointers) — spacing + equal scroll

- Increase vertical breathing room between the three list items: change `gap-4` → `gap-10 lg:gap-14` on the `<ul>` and remove the `justify-center` cramming.
- Make scroll distance per slide equal and a touch longer: change track height from `featured.length * 100vh` → `featured.length * 110vh`, and switch the index mapper to use evenly-divided thresholds (`Math.min(n-1, Math.floor(p * n))` with a small `0.0001` epsilon) so each pointer gets exactly the same scroll window.
- Progress bar already there; verify it animates 0 → 1 linearly across the full track.

## 3. Blur-reveal on headings across all sections

Audit every section heading and wrap with `BlurReveal` (already used in Quietline / Manifesto / Portrait / Range / LatestWriting headings — extend to the ones missing it):

- Hero `<h1>` — convert inline `motion.h1` to `<BlurReveal as="h1">` for consistency.
- FeaturedSticky section heading "Three things, in order." — wrap in `<BlurReveal as="h2">`.
- FeaturedSticky active item `<motion.h3>` titles — leave (size animates), but add a one-shot `BlurReveal` wrapper on the sidebar list container.
- BookSection headings — confirm `BlurReveal` is applied; add where missing.

## 4. Recent Pieces — distinct hover images + reliable preview

- The three list items currently all share the same three-image pool but cycle by index. Define three new dedicated hover images per piece — reuse existing assets explicitly mapped per slug if available, otherwise pick distinct images from: `featured-writing.jpg`, `practice-essays.jpg`, `practice-book.jpg`, `practice-omeros.jpg`, `featured-omeros.jpg` so each row gets a unique image.
- Fix `HoverImage` visibility: enlarge preview to `h-[380px] w-[280px]`, raise z-index, ensure `object-cover` and `opacity-100` on enter (currently fine but verify no parent `overflow-hidden` clips it — `SlideIn` wrapper may clip on the row; move `HoverImage` to wrap only the `<Link>` content inside `SlideIn`, with `overflow-visible` on the row).

## 5. Newsletter section above footer

New component `src/components/site/Newsletter.tsx`, mounted at the bottom of `Home()` before `<SiteFooter />` is rendered (footer lives in root layout — instead, place Newsletter as the last section in `index.tsx`).

- Editorial layout matching site tone: left column eyebrow + headline ("A letter, now and then."), right column email input + submit button.
- Email field + button styled with existing tokens; on submit show a thank-you state (client-side only — no backend wiring this turn).
- Pure white/black background (`bg-background`), hairline top border.

## 6. Footer fixes (`SiteFooter.tsx`)

- Replace "Designed & developed by Hyperium" with **Hyperevamp** (spelling: `Hyperevamp`).
- Update link to `https://hyperevamp.com` (target `_blank`, `rel="noreferrer"`).
- Verify "FAZAL ALI" justified wordmark renders cleanly — no change unless it's broken at current viewport.

## Out of scope

- Backend newsletter persistence (no Cloud changes).
- New routes or copy rewrites.
- Changes to nav glass behavior (already shipped).

## Files touched

- `src/assets/hero-statue.jpg` (new, generated)
- `src/routes/index.tsx` (Hero rewrite, FeaturedSticky spacing/scroll, BlurReveal additions, Recent Pieces hover images, mount Newsletter)
- `src/components/site/Newsletter.tsx` (new)
- `src/components/site/SiteFooter.tsx` (Hyperevamp spelling + link)
