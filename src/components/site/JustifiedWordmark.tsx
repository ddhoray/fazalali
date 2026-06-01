import { useEffect, useRef, useState } from "react";

/**
 * Word that auto-scales its font-size so it spans the container width
 * at a fixed, tasteful letter-spacing (no massive gaps between letters).
 */
export function JustifiedWordmark({
  text,
  className = "",
  letterSpacingEm = 0.02,
  maxFontPx = 360,
}: {
  text: string;
  className?: string;
  letterSpacingEm?: number;
  maxFontPx?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(64);

  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      const measure = measureRef.current;
      if (!wrap || !measure) return;
      const containerWidth = wrap.clientWidth;
      // Measure natural width at 100px
      measure.style.fontSize = "100px";
      const baseWidth = measure.getBoundingClientRect().width;
      if (baseWidth === 0) return;
      const next = Math.min(maxFontPx, (containerWidth / baseWidth) * 100);
      setFontSize(next);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [text, maxFontPx]);

  return (
    <div ref={wrapRef} className={`w-full overflow-hidden ${className}`}>
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute whitespace-nowrap font-display"
        style={{ letterSpacing: `${letterSpacingEm}em` }}
      >
        {text}
      </span>
      <div
        className="whitespace-nowrap text-center font-display leading-[0.82]"
        style={{
          fontSize: `${fontSize}px`,
          letterSpacing: `${letterSpacingEm}em`,
        }}
      >
        {text}
      </div>
    </div>
  );
}
