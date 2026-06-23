# Fazal Ali Website — Editorial Refresh Plan

Goal: keep the elegant editorial typography the client loves, strip out anything that reads sepia/colonial/"about me," and add a modern Caribbean‑meets‑global‑AI register. No redesign into corporate/SaaS tone.

## 1. Navigation (SiteNav + FloatingBottomNav)

New primary order:
- Books (replaces "Education for Liberty")
- Journal
- Podcast
- Omeros
- Profile (replaces "About")
- Write Me

Changes:
- Rename `/about` route label to **Profile** (keep URL `/about` for now to avoid breaking links; optionally add `/profile` redirect).
- Replace "Education for Liberty" dropdown with a single **Books** link → new `/books` route. Keep `/education-for-liberty` reachable from inside Books as the lead title.
- Remove **Ecology** from main nav. Keep `/ecology` route but surface it only as a Journal tag.
- Apply the same changes to mobile nav, FloatingBottomNav primaryLinks, and footer.

## 2. Homepage (`src/routes/index.tsx` + components)

Remove the blue "The site is about me…" block entirely.

New section order:

1. **Hero** — coast/sea visual (keep current hero-beach + hero-loop video).
   - Display headline: *"A writer, schooled in freedom."*
   - Sub: short Fazal Ali intro line.
   - CTAs: Read the Work / Write Me.
   - No "About Me" label anywhere.

2. **Core Statement** (new section, ivory bg, large serif):
   - Pull quote: *"The ethics of AI must be the preserve of all cultures and continents."*
   - Supporting paragraph from the algorithmic-fairness text, broken into 2 short paragraphs.

3. **Ideas & Themes** (replaces "Five Chapters" framing on home):
   - Editorial grid of themes: Freedom as a Medium · Sen in the Islands · AI Ethics · Algorithmic Fairness · Epistemic Justice · Inequality · Intergenerational Immobility.
   - Each links to the matching Journal entry/tag.

4. **Featured Books**
   - Clean two-up: *Education for Liberty* + a "Forthcoming" placeholder card.
   - CTA → /books.

5. **Selected Journal Writing** — 3 featured pieces, editorial rows. CTA → /writing.

6. **Podcast** — latest episode card + 1–2 selected. CTA → /podcast.

7. **Profile** — portrait + 2‑sentence bio. CTA → /about (Profile).

8. **Contact** — "Write Me" CTA opening existing ContactDrawer.

This replaces today's hero copy and the blue panel; uses existing typography tokens (no font swap).

## 3. Visual cleanup — remove sepia/colonial register

Audit and replace any image/treatment that reads sepia, reddish-brown, vintage paper, or archival:
- Inspect `src/content/gallery.ts`, `palimpsest.ts`, `ecology.ts`, hero/section backgrounds, and any `sepia`, `mix-blend`, amber/brown tokens in `src/styles.css` and components.
- Remove sepia filters; switch grade to neutral/cool editorial (ivory, ink, off‑white, deep navy, accent blue italic).
- Keep coast/sea hero (it's the scene‑setter).
- After the hero, introduce a modern register via new generated visuals (artistic, not stock AI): abstract neural mesh over ocean, light data lattices, contemporary architecture, etc. Generated with `imagegen` at editorial quality; used as section backgrounds in Core Statement, Ideas & Themes, and Journal lead.

## 4. Books page (`/books`, new)

New route `src/routes/books.tsx`:
- Header: "Books"
- Lead: *Education for Liberty* — cover, year, short description, buttons (Read excerpt → existing flipbook, Download PDF, Buy).
- Section: **Forthcoming** — 2–3 placeholder cards (title + one‑line synopsis + "Coming soon"). Titles drawn from client's themes (e.g. *Freedom as a Medium*, *Sen in the Islands*, *Intergenerational Immobility*).
- Clean editorial grid, generous whitespace, no brown/parchment styling.
- Redesign `BookSection` usage so the existing EFL surface stops looking "untidy": single hero spread, calm metadata row, no overlapping accents.

The existing `/education-for-liberty` route stays (deep link from the Books page) but is not in main nav.

## 5. Journal simplification

- Rename in‑page heading from "Five Chapters" to **Ideas & Themes** (or *Selected Thinking*). Remove the "chapters" numbering metaphor.
- Restructure list into editorial rows: large title · 1‑line dek · tags · date.
- Promote **Inequality** and **Intergenerational Immobility** as featured topics (top of list + homepage).
- Keep *Freedom as a Medium* and *Sen in the Islands* as flagship entries.
- Move Ecology entries under a tag, not a separate nav item.

## 6. Profile page (`/about` → label "Profile")

Rewrite copy using client's supplied text:
- Lead bio paragraph (Fazal Ibrahim Ali / Education for Liberty / Sen & Rawls).
- Pull quote: *"Standing on the shoulders of Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice, Omeros AI builds a body of work…"*
- **Professional Background** list: Cambridge → Institute of Critical Thinking at UWI; Office of Graduate Studies and Research; DBA at Arthur Lok Jack; Provost, UTT; IDB consultant; President of NIHERST; UTT Aviation Campus; Evening University.
- Do **not** list UCSIS as a standalone item; only mention inside a complete institutional sentence if needed.
- Remove any "About Me" wording.

## 7. Podcast page

Keep structure; tighten card layout: title · description · date · duration · topic · Listen. Neutralize any sepia treatment. (Audio source fix from prior turn stays.)

## 8. Typography & tokens

- Keep current serif/display pairing — client explicitly loves it.
- In `src/styles.css`: remove or repoint any amber/sepia tokens; ensure accent is the editorial blue used for italic highlights. No new font families.

## 9. Out of scope

- No backend changes.
- No auth, no new dependencies beyond image assets.
- `/ecology`, `/palimpsest`, `/inequality`, `/gallery`, `/omeros-ai` routes remain reachable; only nav and styling are touched.

## Technical notes

- Files to edit: `src/components/site/SiteNav.tsx`, `FloatingBottomNav.tsx`, `SiteFooter.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/writing.index.tsx`, `src/routes/podcast.tsx`, `src/components/site/BookSection.tsx`, `src/styles.css`, plus any home sections (`FeaturedStack`, `IntroReveal`, `HomeTopBar`) that render the blue "about me" block or sepia treatments.
- New: `src/routes/books.tsx`, a couple of generated editorial images under `src/assets/` (uploaded via `lovable-assets`).
- Existing CDN asset fix from previous turn is preserved.
- No changes to routing infra, query, or server functions.
