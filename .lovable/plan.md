
# Final polish: match fazalali.com + minimal header/footer

Goal: bring the new site to production parity with fazalali.com on contact info and article content, while keeping the expanded section structure (Palimpsest, Omeros, Podcast, Ecology, Inequality, Gallery). Tighten the header and footer for a cleaner, more minimal feel.

## 1. Contact / social parity (whole site)

Source of truth from fazalali.com:
- Email: `writeme@fazalali.com`
- Instagram: `https://www.instagram.com/thefazalali/` (handle `@thefazalali`)
- Location: Trinidad & Tobago, West Indies
- No phone number on old site → remove any phone references from new site
- No Twitter/LinkedIn on old site → remove any social icons not present there

Audit & fix in: `SiteFooter.tsx`, `ContactDrawer.tsx`, `contact.tsx`, `about.tsx`, `Newsletter.tsx`, `InstagramGrid.tsx`, hero CTAs. Replace any stale email/handle with the values above.

## 2. Articles — import real content from fazalali.com/blog

- Scrape `fazalali.com/blog` and the first ~3 pagination pages via `lov-fetch-website` to get: title, slug, date, excerpt, full body, cover image URL.
- For each article, download the cover image, upload via `lovable-assets` CLI, and reference the `.asset.json`.
- Rebuild `src/content/articles.ts` so the array contains the real articles (newest first). Keep the existing `Article` interface.
- `writing.index.tsx` and `writing.$slug.tsx` already read from this content file — no route changes needed.
- Cover image continues to render at the top of `writing.$slug.tsx` (already implemented in prior turn).

Scope cap: import ~20 most recent articles (covers the visible homepage list + a buffer). More can be added later.

## 3. Header — keep logo, tighten everything (`SiteNav.tsx`)

- Reduce logo height: `h-7 sm:h-8` → `h-5 sm:h-6`.
- Lighter nav type: tracking `0.22em` → `0.16em`, font-size `0.72rem` → `0.68rem`, weight 500 → 400.
- Tighter spacing: `gap-7` → `gap-5`.
- Remove the `ChevronDown` icon on the EFL dropdown (hover-only, no visual chevron).
- Remove the standalone "Write Me" nav button; move it into the EFL dropdown? → No: keep "Write Me" reachable as a small link at the far right but styled identically to other nav links (no button treatment).
- Remove `shadow-[0_1px_0_...]` under header; keep only the hairline border.
- Mobile: same trims (smaller logo, lighter type).

## 4. Footer — keep "FAZAL ALI" wordmark, minimalize the nav links

User clarification: keep `JustifiedWordmark` as-is. Make the three footer columns more minimal:

- Reduce link list font-size from `text-sm` → `text-[13px]`, weight 400.
- Switch link list to a single condensed column layout per section, tighter `space-y-2` → `space-y-1.5`.
- Smaller eyebrow labels (already eyebrow class — fine).
- Reduce footer top padding `pt-16` → `pt-12`, gap `gap-12` → `gap-10`.
- Remove the email icon + map pin icon — text-only is more minimal. Keep the Instagram icon only on the @thefazalali line.
- Bottom bar: lighter tracking, same content.

## 5. Cross-page consistency pass (UI/UX review)

After the above, walk each route and fix any inconsistencies:

- `index.tsx` — hero, featured, BookSection, InstagramGrid, Newsletter spacing rhythm.
- `writing.index.tsx` / `writing.$slug.tsx` — confirm cover image + meta consistent.
- `education-for-liberty.tsx` — flipbook section already single-viewport; just verify spacing matches new header height.
- `palimpsest.tsx`, `omeros-ai.tsx`, `ecology.tsx`, `inequality.tsx`, `podcast.tsx`, `gallery.tsx`, `about.tsx`, `contact.tsx` — verify PageHero usage, consistent section padding (`py-20 sm:py-24` standard), consistent eyebrow/h1/lede pattern.
- Ensure every page sets distinct `head()` metadata (title + description + og:title + og:description).

## 6. Quality bar

- No layout shift; no horizontal scroll on mobile (viewport 1054 reported, also check 375).
- Lighthouse-style mental check: single H1 per route, alt text on images, semantic sections.
- Reduced-motion respected (already handled in styles.css).
- Build/typecheck clean.

## Out of scope

- Backend/CMS for articles (static import file is fine for now).
- Twitter feed reproduction (old site had a Twitter widget — modern site has no equivalent and Twitter API isn't connected).
- reCAPTCHA on contact form (old site had it — not requested explicitly).

## Technical notes

- Use `lov-fetch-website` to scrape blog list + individual article pages. Parse markdown output.
- For each cover image: `curl -o /tmp/img.jpg <url>` → `lovable-assets create --file /tmp/img.jpg --filename article-<slug>.jpg > src/assets/article-<slug>.jpg.asset.json` → reference `imgX.url` in `articles.ts`.
- Delete unused old article asset JSON files after replacement.
- All edits stay frontend-only; no DB, no server functions touched.
