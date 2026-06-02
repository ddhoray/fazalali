import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import pdfAsset from "@/assets/EducationforLiberty.pdf.asset.json";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface FlipbookProps {
  /** Optional file override. Defaults to the bundled Education for Liberty PDF. */
  file?: string;
}

const PDF_FILE_DEFAULT = pdfAsset.url;

/** Render distance: how many pages around the current spread should fully render. */
const RENDER_RADIUS = 4;

/**
 * Client-only flippable book that renders an actual PDF page-by-page.
 * Uses react-pageflip for the flip animation and react-pdf for rendering.
 */
export function Flipbook({ file = PDF_FILE_DEFAULT }: FlipbookProps) {
  const [mounted, setMounted] = useState(false);
  const [HTMLFlipBook, setHTMLFlipBook] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 500, h: 680 });
  const bookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void; getPageCount: () => number } } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    import("react-pageflip").then((mod) => {
      setHTMLFlipBook(() => mod.default as unknown as React.ComponentType<Record<string, unknown>>);
    });
  }, []);

  // Responsive sizing — fit within viewport so the entire book + controls show without scrolling.
  useEffect(() => {
    const recompute = () => {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const vh = window.innerHeight;
      const isSingle = cw < 720;
      // Reserve vertical space for surrounding header + controls.
      const reserved = isSingle ? 260 : 200;
      const maxH = Math.max(360, vh - reserved);
      let pageW = isSingle ? Math.min(cw - 16, 520) : Math.min((cw - 24) / 2, 560);
      let pageH = Math.round(pageW * 1.36);
      if (pageH > maxH) {
        pageH = maxH;
        pageW = Math.round(pageH / 1.36);
      }
      setSize({ w: Math.round(pageW), h: Math.round(pageH) });
    };
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [mounted, numPages]);

  const fileOption = useMemo(() => ({ url: file }), [file]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[1200px]">
      <Document
        file={fileOption}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="mx-auto flex aspect-[3/2] w-full max-w-[1000px] items-center justify-center border border-white/15 bg-white/5 text-sm uppercase tracking-[0.2em] text-white/60">
            <Loader2 className="mr-3 size-4 animate-spin" /> Loading the book…
          </div>
        }
        error={
          <div className="mx-auto flex aspect-[3/2] w-full max-w-[1000px] items-center justify-center border border-red-400/30 bg-red-500/10 text-sm uppercase tracking-[0.2em] text-red-200">
            Could not load the PDF.
          </div>
        }
      >
        {mounted && HTMLFlipBook && numPages > 0 && (
          <div className="flex items-center justify-center">
            <HTMLFlipBook
              key={`${size.w}x${size.h}-${numPages}`}
              width={size.w}
              height={size.h}
              minWidth={280}
              maxWidth={620}
              minHeight={400}
              maxHeight={900}
              size="fixed"
              maxShadowOpacity={0.4}
              showCover
              mobileScrollSupport
              drawShadow
              flippingTime={650}
              className="!mx-auto"
              style={{}}
              startPage={0}
              usePortrait
              startZIndex={0}
              autoSize={false}
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
              {Array.from({ length: numPages }, (_, i) => {
                const visible = Math.abs(i - page) <= RENDER_RADIUS;
                return (
                  <div
                    key={i}
                    className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#fafaf6]"
                    style={{ width: size.w, height: size.h }}
                  >
                    {visible ? (
                      <Page
                        pageNumber={i + 1}
                        width={size.w}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        loading={
                          <div className="flex h-full w-full items-center justify-center text-neutral-400">
                            <Loader2 className="size-5 animate-spin" />
                          </div>
                        }
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                        {i + 1}
                      </div>
                    )}
                    <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                      {i + 1}
                    </span>
                  </div>
                );
              })}
            </HTMLFlipBook>
          </div>
        )}
      </Document>

      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          className="inline-flex size-10 items-center justify-center border border-white/30 text-white/80 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
          {String(page + 1).padStart(3, "0")} / {String(Math.max(numPages, 1)).padStart(3, "0")}
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
