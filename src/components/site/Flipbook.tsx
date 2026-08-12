import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import pdfAsset from "@/assets/EducationforLiberty.pdf.asset.json";
import { assetUrl } from "@/lib/asset-url";

interface FlipbookProps {
 file?: string;
}

type PdfViewerModules = {
  Document: ComponentType<any>;
  Page: ComponentType<any>;
  HTMLFlipBook: ComponentType<any>;
};

const PDF_FILE_DEFAULT = assetUrl(pdfAsset);
const RENDER_RADIUS = 3;

/**
 * Real flippable book: react-pageflip for the page-turn animation,
 * react-pdf to render the actual PDF pages. Sized to fit the viewport
 * so the entire spread + controls are visible without scrolling.
 */
export function Flipbook({ file = PDF_FILE_DEFAULT }: FlipbookProps) {
 const [numPages, setNumPages] = useState<number>(0);
 const [current, setCurrent] = useState(0);
 const [size, setSize] = useState({ w: 380, h: 520, isSingle: true });
 const [modules, setModules] = useState<PdfViewerModules | null>(null);
 const containerRef = useRef<HTMLDivElement | null>(null);
  // react-pageflip's ref typing is loose; using any for the imperative API.
 const bookRef = useRef<any>(null);

 useEffect(() => {
 let cancelled = false;

 async function loadPdfViewer() {
 const [{ Document, Page, pdfjs }, pageflip, worker] = await Promise.all([
 import("react-pdf"),
 import("react-pageflip"),
 import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
 import("react-pdf/dist/Page/AnnotationLayer.css"),
 import("react-pdf/dist/Page/TextLayer.css"),
      ]);

 pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

 if (!cancelled) {
 setModules({
          Document,
          Page,
          HTMLFlipBook: pageflip.default,
        });
      }
    }

 loadPdfViewer().catch((error) => {
 console.error(error);
    });

 return () => {
 cancelled = true;
    };
  }, []);

 useEffect(() => {
 const recompute = () => {
 const el = containerRef.current;
 if (!el) return;
 const cw = el.clientWidth;
 const vh = window.innerHeight;
 const isSingle = cw < 760;
 const reserved = isSingle ? 320 : 290;
 const maxH = Math.max(isSingle ? 340 : 420, vh, reserved);
 const horizontalBudget = isSingle ? cw - 24 : (cw - 40) / 2;
 let pageW = Math.max(150, Math.min(horizontalBudget, isSingle ? 360 : 540));
 let pageH = Math.round(pageW * 1.36);
 if (pageH > maxH) {
 pageH = maxH;
 pageW = Math.round(pageH / 1.36);
      }
 setSize({ w: Math.round(pageW), h: Math.round(pageH), isSingle });
    };
 recompute();
 window.addEventListener("resize", recompute);
 return () => window.removeEventListener("resize", recompute);
  }, [numPages]);

 const fileOption = useMemo(() => ({ url: file }), [file]);
 const pageNumbers = useMemo(
    () => Array.from({ length: numPages }, (_, i) => i + 1),
 [numPages],
  );

 if (!modules) {
 return (
      <div ref={containerRef} className="relative mx-auto w-full max-w-[1180px]">
        <div className="mx-auto flex aspect-[3/2] w-full max-w-[1000px] items-center justify-center border border-white/15 bg-white/5 text-sm uppercase tracking-[0.2em] text-white/60">
          <Loader2 className="mr-3 size-4 animate-spin" /> Loading the book…
        </div>
      </div>
    );
  }

 const { Document, Page, HTMLFlipBook } = modules;

 return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[1180px]">
      <Document
 file={fileOption}
 onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
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
          <div className="flex justify-center">
            <HTMLFlipBook
 ref={bookRef}
 width={size.w}
 height={size.h}
 size="fixed"
 minWidth={150}
 maxWidth={900}
 minHeight={200}
 maxHeight={1400}
 showCover
 flippingTime={650}
 usePortrait={size.isSingle}
 mobileScrollSupport
 maxShadowOpacity={0.4}
 drawShadow
 className="shadow-[0_24px_70px_-26px_rgba(255,255,255,0.35)]"
 onFlip={(e: { data: number }) => setCurrent(e.data)}
            >
              {pageNumbers.map((pageNumber) => {
 const inRange = Math.abs(pageNumber - current) <= RENDER_RADIUS;
 return (
                  <div
 key={pageNumber}
 className="relative overflow-hidden bg-[#fafaf6]"
 style={{ width: size.w, height: size.h }}
                  >
                    {inRange ? (
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
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-neutral-300">
                        <Loader2 className="size-5 animate-spin" />
                      </div>
                    )}
                    <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                      {pageNumber}
                    </span>
                  </div>
                );
              })}
            </HTMLFlipBook>
          </div>
        )}
      </Document>

      <div className="mt-3 flex items-center justify-center gap-5">
        <button
 type="button"
 aria-label="Previous page"
 onClick={() => bookRef.current?.pageFlip?.()?.flipPrev?.()}
 disabled={current === 0}
 className="inline-flex size-10 items-center justify-center border border-white/30 text-white/80 transition-colors hover:bg-white/10 disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
          {String(current + 1).padStart(3, "0")} / {String(Math.max(numPages, 1)).padStart(3, "0")}
        </p>
        <button
 type="button"
 aria-label="Next page"
 onClick={() => bookRef.current?.pageFlip?.()?.flipNext?.()}
 disabled={current >= numPages - 1}
 className="inline-flex size-10 items-center justify-center border border-white/30 text-white/80 transition-colors hover:bg-white/10 disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
