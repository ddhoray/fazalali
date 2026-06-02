import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookPage {
  eyebrow?: string;
  title?: string;
  body?: string;
  pageNumber?: string | number;
}

interface FlipbookProps {
  pages: BookPage[];
  /** Author / book name shown on the cover. */
  cover: { title: ReactNode; subtitle?: string; author?: string };
}

/**
 * Client-only flippable book. Uses react-pageflip which touches `window`,
 * so we dynamically import after mount.
 */
export function Flipbook({ pages, cover }: FlipbookProps) {
  const [mounted, setMounted] = useState(false);
  const [HTMLFlipBook, setHTMLFlipBook] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [page, setPage] = useState(0);
  const bookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void; getPageCount: () => number } } | null>(null);

  useEffect(() => {
    setMounted(true);
    import("react-pageflip").then((mod) => {
      setHTMLFlipBook(() => mod.default as unknown as React.ComponentType<Record<string, unknown>>);
    });
  }, []);

  // total pages = cover + content + back cover
  const total = pages.length + 2;

  if (!mounted || !HTMLFlipBook) {
    return (
      <div className="mx-auto flex aspect-[3/2] w-full max-w-[1000px] items-center justify-center border border-white/15 bg-white/5 text-sm uppercase tracking-[0.2em] text-white/60">
        Loading the book…
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[1100px]">
      <div className="flex items-center justify-center">
        <HTMLFlipBook
          width={500}
          height={680}
          minWidth={280}
          maxWidth={600}
          minHeight={400}
          maxHeight={820}
          size="stretch"
          maxShadowOpacity={0.4}
          showCover
          mobileScrollSupport
          drawShadow
          flippingTime={700}
          className="!mx-auto"
          style={{}}
          startPage={0}
          usePortrait
          startZIndex={0}
          autoSize
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          ref={(el: unknown) => {
            bookRef.current = el as typeof bookRef.current;
          }}
          onFlip={(e: { data: number }) => setPage(e.data)}
        >
          {/* Front cover */}
          <div className="flex h-full w-full flex-col items-center justify-between bg-neutral-900 p-10 text-white">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {cover.author ?? "Fazal Ibrahim Ali"}
            </p>
            <div className="text-center">
              <p className="font-display text-5xl leading-[0.95] md:text-6xl">
                {cover.title}
              </p>
              {cover.subtitle && (
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/60">
                  {cover.subtitle}
                </p>
              )}
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              Omeros AI · First Edition
            </p>
          </div>

          {/* Content pages */}
          {pages.map((p, i) => (
            <div
              key={i}
              className="flex h-full w-full flex-col bg-[#fafaf6] p-8 text-neutral-900 md:p-12"
            >
              {p.eyebrow && (
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  {p.eyebrow}
                </p>
              )}
              {p.title && (
                <p className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                  {p.title}
                </p>
              )}
              {p.body && (
                <p className="mt-6 text-sm leading-relaxed text-neutral-700 md:text-base">
                  {p.body}
                </p>
              )}
              <p className="mt-auto pt-6 text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                {p.pageNumber ?? i + 1}
              </p>
            </div>
          ))}

          {/* Back cover */}
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-neutral-900 p-10 text-white">
            <p className="font-display text-3xl">Fin.</p>
            <p className="max-w-xs text-center text-xs uppercase tracking-[0.25em] text-white/60">
              Download the full monograph below.
            </p>
          </div>
        </HTMLFlipBook>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          className="inline-flex size-10 items-center justify-center border border-white/30 text-white/80 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
          {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          className="inline-flex size-10 items-center justify-center border border-white/30 text-white/80 transition-colors hover:bg-white/10"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
