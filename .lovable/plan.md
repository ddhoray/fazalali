## Goal
Make every non-portrait, non-book image on the site feel like it came from one warm, sunlit, Caribbean-editorial photo essay. Soft natural light, cream/amber/ochre highlights, deep warm shadows, fine 35mm grain, no neon, no purple, no synthetic-AI sheen.

## Scope (locked by your answers)
**Replacing 16 images:**
- Featured + practice tiles (6): `featured-omeros.jpg`, `featured-writing.jpg`, `featured-education.jpg`, `practice-omeros.jpg`, `practice-essays.jpg`, `practice-book.jpg`
- Article thumbnails (10): `article-100model`, `article-carnival`, `article-cern`, `article-datacenter`, `article-divine`, `article-fabric`, `article-failure`, `article-gravity`, `article-shelf`, `article-shield`

**Not touched (per your instruction):**
- All hero images (heroes stay as-is — you only confirmed featured/practice + articles)
- Book cover + `book-education-for-liberty.jpg`, `hero-book.jpg`, `practice-book.jpg` book scenes → wait: `practice-book.jpg` is in scope as a tile. I'll keep it book-themed (a real photo of an open book in warm window light) so it still reads as the Education-for-Liberty practice tile, just retoned.
- Fazal portraits + cutout
- Instagram gallery feed (real IG content stays)
- Brand lockups + PDFs

> If you actually want heroes in scope too, say so and I'll add them — current plan is conservative to your checklist.

## Visual contract (applied to every replaced image)
- Palette: warm cream `#f3ead8`, sand `#d8b98a`, terracotta `#b86c43`, deep umber `#3a261b`, sea `#3f6f7a` as the only cool accent
- Light: golden-hour or soft window light, never flat midday
- Mood: literary magazine (think Aperture / Wallpaper / The Common), not stock-photo cliché
- Format: 1600×1000 landscape JPG, ~75 quality, mild film grain
- Subjects map 1:1 to each tile/article topic (see below)

## Sourcing strategy
1. **Real photos first**: pull from Unsplash's public direct-image CDN (no API key needed — I use curated photo IDs by hand-selecting via web search for each topic, downloading the 1600w variant, then color-grading to the warm palette in a single ImageMagick pass for tonal consistency).
2. **AI fallback**: if no real photo cleanly fits a topic (e.g. "Omeros AI" abstract, "datacenter as poetry"), generate via Lovable AI Gateway `openai/gpt-image-2` with a locked style prompt suffix that pins the palette + 35mm grain + editorial framing.
3. Every image — stock or AI — goes through the same final grade pass so the set looks like one photographer shot it in one week.

## Per-image subject map

**Featured / practice tiles**
| File | Subject |
|---|---|
| `featured-omeros.jpg` | Hands on a warmly-lit keyboard, open notebook beside it, soft window light — "writing with the machine" |
| `featured-writing.jpg` | Stack of marked-up manuscript pages on a wooden desk, fountain pen, morning light |
| `featured-education.jpg` | Empty Caribbean classroom at golden hour, chalkboard, wooden desks |
| `practice-omeros.jpg` | Close crop of a screen reflecting a face in shadow, warm desk lamp glow |
| `practice-essays.jpg` | Open book + handwritten margin notes, coffee cup edge, natural light |
| `practice-book.jpg` | Open hardcover book on a window sill, sea visible blurred behind |

**Article thumbnails (subject inferred from slug)**
| File | Subject |
|---|---|
| `article-100model` | Architectural model / scale models on a desk under warm lamp |
| `article-carnival` | Trinidad carnival detail — costume feathers in soft light, not crowd shot |
| `article-cern` | Long industrial corridor, warm sodium light (CERN-feel without logos) |
| `article-datacenter` | Server-room aisle softened by warm grade, single figure silhouette |
| `article-divine` | Sunlit cathedral interior or stained glass casting amber light |
| `article-fabric` | Folded textile / loom detail in golden light |
| `article-failure` | Cracked plaster wall or torn page, single shaft of light |
| `article-gravity` | Long-exposure of falling water or pendulum, warm tone |
| `article-shelf` | Wall of books, spines glowing in lamp light |
| `article-shield` | Weathered metal / armor detail or barred window, warm rust tones |

(I'll confirm each slug against `src/content/articles.ts` before fetching so the image matches what the article actually argues.)

## Execution steps
1. Read `src/content/articles.ts` to verify article topics match my subject map; adjust any mismatches.
2. Fetch real candidates from Unsplash CDN for the ~10–12 images where stock works cleanly.
3. AI-generate the remaining 4–6 with a single locked prompt suffix (palette + grain + framing).
4. Run all 16 through one ImageMagick warm-grade + grain pass so they're tonally identical.
5. Save over the existing filenames in `src/assets/` — no code changes needed since all imports stay the same.
6. Spot-check three key pages in the preview (`/`, `/writing`, `/education-for-liberty`) and confirm tiles read cohesively.

## Trade-offs / notes
- Heroes are **not** in this pass per your scope checklist. If after the tiles+articles land the heroes look out-of-family, I'll come back and propose a second pass for them.
- Without stock API keys I'm hand-picking Unsplash photo IDs rather than search-querying — that's slower per image but produces a more curated set than algorithmic search would.
- AI generation will use Lovable AI credits (~4–6 images at `gpt-image-2` low quality).
- The final grade pass makes stock and AI indistinguishable in tone, which is the whole point of the cohesion ask.
