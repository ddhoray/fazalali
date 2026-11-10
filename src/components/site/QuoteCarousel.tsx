import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type CarouselQuote = { text: string; cite?: string };

/**
 * Splits editor text into quotes: one quote per block, blocks separated by a blank line.
 * A trailing "(p. vi)" style reference becomes the citation; outer quote marks are removed.
 */
export function parseQuotes(raw: string): CarouselQuote[] {
  return raw
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .map((block) => {
      let text = block;
      let cite: string | undefined;
      const m = text.match(/\s*\(([^()]{1,40})\)\.?\s*$/);
      if (m) {
        cite = m[1].trim();
        text = text.slice(0, m.index).trim();
      }
      text = text.replace(/^["“”]+/, "").replace(/["“”]+$/, "").trim();
      return { text, cite };
    });
}

const AUTO_MS = 9000;

export function QuoteCarousel({ quotes, source }: { quotes: CarouselQuote[]; source?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const slides = useRef<(HTMLElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const count = quotes.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // Match the frame height to the visible quote so short quotes don't leave a gap.
  useLayoutEffect(() => {
    const el = slides.current[index];
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index, count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setTimeout(() => go(index + 1), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count, go]);

  if (!count) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Quotes from the monograph"
      data-auto-reveal="off"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div
        className="overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ height }}
      >
        <div
          className="flex items-start transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {quotes.map((q, i) => {
            const long = q.text.length > 420;
            return (
              <figure
                key={i}
                ref={(el) => {
                  slides.current[i] = el;
                }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                className={`w-full shrink-0 pr-6 transition-[opacity,visibility] duration-700 ${i === index ? "visible opacity-100" : "invisible opacity-0"}`}
              >
                <blockquote
                  className={`relative font-display text-foreground ${
                    long
                      ? "text-lg leading-relaxed md:text-xl"
                      : "text-2xl leading-snug md:text-3xl"
                  }`}
                >
                  <span aria-hidden className="mr-1 text-accent">“</span>
                  {q.text}
                  <span aria-hidden className="ml-0.5 text-accent">”</span>
                </blockquote>
                {(q.cite || source) && (
                  <figcaption className="mt-5 eyebrow text-muted-foreground">
                    {[source, q.cite].filter(Boolean).join(" · ")}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-8 flex items-center gap-3">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show quote ${i + 1}`}
              aria-current={i === index}
              className="group grid size-6 place-items-center"
            >
              {/* SVG circle: the site's global sharp-corner rule would square off a rounded box. */}
              <svg
                viewBox="0 0 12 12"
                aria-hidden
                className={`size-3 transition-all duration-300 ${
                  i === index ? "scale-110 text-accent" : "text-foreground/50 group-hover:text-foreground"
                }`}
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  fill={i === index ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>
            </button>
          ))}
          <span className="ml-2 eyebrow tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
