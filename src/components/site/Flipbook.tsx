import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
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

/**
 * Client-only flippable book that renders an actual PDF page-by-page.
 * Renders a deterministic two-page spread so the complete book is visible in one viewport.
 */
export function Flipbook({ file = PDF_FILE_DEFAULT }: FlipbookProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 420, h: 570 });
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Responsive sizing — fit within viewport so the entire book + controls show without scrolling.
  useEffect(() => {
    const recompute = () => {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const vh = window.innerHeight;
      const isSingle = cw < 720;
      // Reserve space for the compact section header, action buttons, and controls.
      const reserved = isSingle ? 360 : 300;
      const maxH = Math.max(isSingle ? 330 : 420, vh - reserved);
      let pageW = Math.max(130, Math.min((cw - 28) / 2, isSingle ? 220 : 540));
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
  }, [numPages]);

  const fileOption = useMemo(() => ({ url: file }), [file]);
  const maxStart = Math.max(0, numPages - 2);
  const visiblePages = [page + 1, page + 2].filter((pageNumber) => pageNumber <= numPages);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[1120px]">
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
        {numPages > 0 && (
          <motion.div
            key={`${page}-${size.w}x${size.h}`}
            initial={reduceMotion ? false : { opacity: 0, rotateY: page === 0 ? 0 : -8 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto grid justify-center overflow-hidden shadow-[0_24px_70px_-26px_rgba(255,255,255,0.35)] sm:grid-cols-2"
            style={{ width: size.w * 2, maxWidth: "100%", perspective: 1200 }}
          >
            {visiblePages.map((pageNumber, index) => (
              <div
                key={pageNumber}
                className="relative flex items-center justify-center overflow-hidden bg-[#fafaf6]"
                style={{ width: size.w, height: size.h }}
              >
                <Page
                  pageNumber={pageNumber}
                  width={size.w}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  loading={
                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                      <Loader2 className="size-5 animate-spin" />
                    </div>
                  }
                />
                <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                  {pageNumber}
                </span>
                {index === 0 && <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-black/15" />}
              </div>
            ))}
          </motion.div>
        )}
      </Document>

      <div className="mt-3 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => setPage((current) => Math.max(0, current - 2))}
          disabled={page === 0}
          className="inline-flex size-10 items-center justify-center border border-white/30 text-white/80 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
          {String(page + 1).padStart(3, "0")}–{String(Math.min(page + 2, Math.max(numPages, 1))).padStart(3, "0")} / {String(Math.max(numPages, 1)).padStart(3, "0")}
        </p>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => setPage((current) => Math.min(maxStart, current + 2))}
          disabled={page >= maxStart}
          className="inline-flex size-10 items-center justify-center border border-white/30 text-white/80 transition-colors hover:bg-white/10"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
