
## Goal

Bring every page on the nav to the same hero-grade black/white editorial language as the homepage, add the two missing sections from the old site (Podcast + Palimpsest), and make every journal click open a full long-form reading view.

## Scope (page by page)

### 1. Global design language
- Lock a strict black/white editorial system across all non-home routes: full-bleed black hero band at the top of each page (so the fixed nav reads in light-on-dark like the homepage), then a white reading surface below with hairline rules, oversized display type, and asymmetric grids.
- Each page gets: dark hero (eyebrow + huge display headline + standfirst + meta strip), one signature visual moment (cutout portrait, justified wordmark, parallax image, or marquee), then content sections.
- Remove the current "centered max-w container on white" look. Replace with magazine-style alternating sections (wide image / narrow text, full-bleed quote bands, numbered chapter rails).

### 2. Nav additions
Update `SiteNav` links to mirror the old site + new sections:
- Articles → `/writing`
- Education for Liberty → `/education-for-liberty` (with hover mega-menu listing: The Book, Podcast, Palimpsest)
- Omeros → `/omeros-ai`
- About → `/about`
- Write Me → opens contact drawer (keep)

Mega-menu opens on hover for desktop; on mobile the three children appear as indented links under Education for Liberty.

### 3. Articles index (`/writing`)
- Replace the uniform 3-up card grid with an editorial layout: 1 large featured essay (full-width image, big headline, dek), then a 2-column stagger of remaining essays with alternating image alignment and a thin meta rail (topic · date · reading time).
- Black hero band at top: "Essays, slowly, often." with running count.

### 4. Article reading page (`/writing/$slug`)
- Already routes correctly. Upgrade visual: black hero band with cover image as backdrop (dimmed), title in serif display, meta strip; white reading column below with drop cap, pull-quotes, hairline section breaks, "Next essay" + "Back to all" footer band in black.
- Ensure every article in `src/content/articles.ts` has full body content (expand any thin ones to multi-paragraph long-form so clicking a journal lands on real text).

### 5. Education for Liberty (`/education-for-liberty`)
- Keep premise / chapters content, restyle to match: black hero, then a flipbook-style book mockup section, then chapters as a numbered rail, then CTA bands for **Podcast** and **Palimpsest** at the bottom (cross-links).
- Embed the real PDF from old site (`https://fazalali.com/wp-content/uploads/2026/02/EducationforLiberty.pdf`) using a simple `<iframe>` viewer + "Download PDF" + "Buy on Amazon" links.

### 6. Podcast (`/podcast`) — NEW
- Black hero: "Education for Liberty — The Podcast".
- Episode list (2 episodes from old site):
  - Episode One — Preface
  - Episode Two — Prolegomenon
- Each episode = large card with episode number in oversized display numeral, title, description, custom HTML5 `<audio>` player with black/white styling (play, scrubber, time). Audio source URLs from the old site episode pages (will scrape during build).
- Add a compact podcast player on the homepage: a sticky black band ("Latest episode · Prolegomenon") with mini play button that expands inline.

### 7. Palimpsest (`/palimpsest`) — NEW
- Black hero: "A palimpsest of periods in West Indian education".
- Long-form timeline rendered as a vertical chronology rail with section headers (Prelude: The Old World, Los Reyes Católicos, etc.) and bullet entries with bold dates/keywords (porting the content from the old page).
- Sticky section index on the left at desktop widths.

### 8. About (`/about`)
- Black hero with portrait cutout on the right, name + role on the left.
- Bio body in two columns with a justified pull-quote band, then a "Work" timeline strip, then CTA to Write Me.

### 9. Omeros (`/omeros-ai`)
- Same hero/editorial treatment, keep existing content but reflow into the new black/white grid with one signature visual.

## Technical notes

- Add routes: `src/routes/podcast.tsx`, `src/routes/palimpsest.tsx`. Update `SiteNav` mega-menu component.
- Reuse `Reveal`, `GlassPanel`, `HoverImage`, `JustifiedWordmark`, `ParallaxImage`, `Grain` for consistency.
- Introduce a shared `<PageHero variant="dark" eyebrow title standfirst meta />` component so every internal page starts with the same black band that pairs with the fixed nav's `data-nav="dark"` light-on-dark behavior.
- Audio player: lightweight custom component using `<audio>` + framer-motion progress bar. No new deps.
- PDF embed: native `<iframe src={pdfUrl}>` with `aspect-[3/4]` wrapper; "Download" + "Buy" buttons.
- Articles content: expand `src/content/articles.ts` bodies where they are thin so the reading page is meaningful for all 10 essays.
- No backend changes. No new packages required.

## Out of scope (confirm if you want these too)
- Scraping every old article body verbatim (legal/voice). I'll keep the current rewritten bodies but expand to full long-form length and tone-match.
- Instagram feed embed from old site footer.
- Real podcast hosting — I'll link to the audio files from the old site if reachable; otherwise stub with a "Coming soon" state on each episode.
