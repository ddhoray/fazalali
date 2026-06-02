## Goals

1. Replace the Fazal Ali portrait with a new image in the same sculptural / classical-marble register as the hero statue, so the Portrait section feels unified with the rest of the site.
2. Fix the hover-preview image in the "Recent pieces" list being clipped/overlapped by the Newsletter section below.
3. Pass through every section as a UI/UX designer and tighten anything that still feels off (spacing, alignment, immersion, motion).

---

## 1. New portrait — sculptural aesthetic

- Generate `src/assets/fazal-portrait-statue.jpg` (premium quality, 4:5) in the same visual language as `hero-statue.jpg`: warm museum light, classical bust / sculpted figure, dramatic chiaroscuro, neutral stone palette, fine grain. Not a literal photo of a person — an evocative, artistic, statue-like portrait that reads as "the writer" in the same gallery the hero lives in.
- Swap the import in `src/routes/index.tsx` (`Portrait` section) from `fazal-portrait.jpg` → the new asset. Keep alt text descriptive ("Sculpted portrait evoking the writer").
- Add a subtle Ken-Burns / parallax on the portrait frame (gentle `scale` + `y` via `useScroll`) to match the immersion of the hero and Featured sticky section.
- Keep the existing dark `section-invert` background — the marble tones will pop against it.

## 2. Fix HoverImage overlap with Newsletter

Symptom: cursor-following preview on "Recent pieces" gets visually covered by the next (Newsletter) section as the cursor moves down.

Root cause: `HoverImage` renders inside the article row; even with `z-[60]`, the Newsletter section establishes a new stacking context (transforms / `isolate` / `section-invert`) that sits above it.

Fix in `src/components/site/HoverImage.tsx`:
- Render the floating preview into a `document.body` portal (`createPortal`) so it escapes every parent stacking context.
- Bump z-index to `z-[100]` and keep `position: fixed`.
- Guard with a mounted check for SSR (only portal after `useEffect` sets `mounted = true`).

No change needed in `LatestWriting` itself.

## 3. Section-by-section polish

- **Hero**: verify parallax still feels subtle on the 1054px viewport; nudge bottom padding so the headline doesn't crowd the fold on shorter screens.
- **Quietline**: confirm the 3-column divider stays single-line at md; tighten vertical padding by 2px if needed.
- **Featured sticky (3 pointers)**: confirm progress bar reaches 100% exactly at the last slide; verify mobile progress bar visibility under sticky header.
- **Manifesto**: re-check word-reveal trigger offset so the first words aren't already revealed on entry.
- **Portrait (new)**: composition described in §1.
- **BookSection**: ensure cover drop-shadow still reads on white; verify "Request a copy" button contrast.
- **Range** (`section-invert`): confirm card body text uses muted token, not hardcoded color; verify hover dim doesn't double-apply with image scale.
- **LatestWriting**: with portal fix above, verify hover preview tracks cursor across the full row without jump.
- **Newsletter**: confirm input caret + placeholder color on black; verify submit button focus ring.
- **Footer**: re-verify Hyperevamp spelling + link target `https://hyperevamp.com` (rel="noreferrer").

No layout restructuring — only spacing/contrast/motion micro-fixes where a real issue is found during the pass.

---

## Technical details

**Files touched**
- `src/assets/fazal-portrait-statue.jpg` (new — generated, premium tier, 4:5)
- `src/routes/index.tsx` — swap portrait import, add parallax wrapper on portrait frame, apply any spacing nudges found during the section pass
- `src/components/site/HoverImage.tsx` — portal the floating preview to `document.body`, bump z-index to 100, SSR-safe mount guard

**HoverImage portal sketch**

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
// ...
{mounted && createPortal(
  <AnimatePresence>{visible && (<motion.div .../>)}</AnimatePresence>,
  document.body
)}
```

**Out of scope**
- No backend changes.
- No new sections.
- Existing `fazal-portrait.jpg` is left in the repo (other routes like `/about` may reference it); only the home Portrait section swaps to the sculptural version.
