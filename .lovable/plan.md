
## Goal
Make every image's color tone match the section it sits in, and enforce a consistent color/text/CTA system everywhere.

## Color system (locked)
- Blue sections (`.section-invert`, bg `#024bcc`): all text, headings, eyebrows, dividers, icons → pure white. Images shift toward cool/blue duotone. CTAs: white pill with blue text.
- Dark sections (`.section-dark`, bg `#17100b`): warm sepia/amber image tone, white text, hairlines at white/22%.
- Light sections (cream `--background`): black text, hairlines neutral, accents in `#024bcc` (links, eyebrows on chosen accents, underline color). CTAs: blue pill with white text, or white pill with blue text + blue border.
- "Text on image" overlays keep white text.

## Image regeneration plan (AI, gpt-image-2)
Each image regenerated at 1536×1024 (landscape) or 1024×1536 (portrait) to match current aspect, then saved over the same filename so all imports keep working. Prompts include locked palette + grain + 35mm editorial style for consistency.

Grouped by destination tone:

**Cool-blue duotone (lands on blue sections)**
- `featured-omeros.jpg`, `practice-omeros.jpg`, `hero-omeros.jpg` — Omeros AI sections
- `featured-writing.jpg`, `practice-essays.jpg`, `hero-writing.jpg`, `article-*.jpg` (10 article thumbs) — writing index uses invert grid
- `hero-palimpsest.jpg`, `hero-inequality.jpg`, `hero-ecology.jpg` — topical pages

**Warm dark/sepia (lands on `.section-dark` and the desk parallax)**
- `hero-desk.jpg`, `hero-statue.jpg` — home dark breaks
- `practice-book.jpg`, `hero-book.jpg`, `featured-education.jpg` — Education for Liberty
- `hero-podcast.jpg`

**Natural warm cream (light sections)**
- `fazal-portrait.jpg`, `fazal-portrait-aesthetic.jpg`, `fazal-portrait-statue.jpg`, `fazal-cutout.png`
- `hero-gallery.jpg`

Total: ~28 images. Run sequentially via the AI gateway script with consistent style anchors per group, save into `src/assets/` overwriting originals. No code changes needed for image imports.

## Global text/CTA pass
1. `src/styles.css`
   - Add utility `.text-accent { color: var(--accent-cool); }` and `.accent-underline` (blue underline on hover for inline links in light sections).
   - Add `.btn-primary` (blue bg, white text), `.btn-on-blue` (white bg, blue text), `.btn-on-light` (blue border, blue text, hover invert).
   - Tighten `.section-invert`: also force `.text-muted-foreground` and any `border-*` utility to white/22%.
2. Sweep all routes + `src/components/site/*`:
   - Replace hard-coded `text-white`, `text-black`, `text-foreground`, `text-muted-foreground` inside blue sections with reliance on `.section-invert` cascade (remove conflicting `text-*` classes).
   - In light sections, add `.text-accent` to: eyebrows on key feature blocks, inline links, hover state of headlines/CTAs, key emphasized words (italics in manifesto/quietline).
   - Normalize all CTAs (`Link`/`button` styled as pill/arrow) to the 3 button utilities above. Remove ad-hoc `bg-foreground text-background` button styles.
3. Hairlines/dividers inside blue sections → white/22%; in dark sections already handled; in light sections → keep neutral but switch decorative accent rules to blue.

## Pages touched
`index.tsx`, `about.tsx`, `omeros-ai.tsx`, `education-for-liberty.tsx`, `writing.index.tsx`, `writing.$slug.tsx`, `gallery.tsx`, `podcast.tsx`, `ecology.tsx`, `inequality.tsx`, `palimpsest.tsx`, `contact.tsx`, plus shared `SiteNav`, `FloatingBottomNav`, `MobileTopBar`, `SiteFooter`, `Newsletter`, `BookSection`, `FeaturedStack`, `InstagramGrid`, `PageHero`, `ContactDrawer`.

## Verification
- TypeScript check after edits.
- Walk each route in preview at 1075px and full-page screenshot, visually confirm: (a) image tone matches its section, (b) no grey/black text inside blue sections, (c) CTAs follow the 3-variant system, (d) inline accents are present where called for.

## Notes / trade-offs
- AI regeneration of ~28 images will consume credits and take several minutes. If any prompt is rejected (e.g. likeness for portraits), I'll fall back to a CSS duotone overlay for those specific images and flag them.
- Article thumb prompts will be derived from each article's title/slug for thematic relevance, not just palette.
