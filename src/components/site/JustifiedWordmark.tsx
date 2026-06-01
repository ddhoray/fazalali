import { useEffect, useRef, useState } from "react";

/**
 * Renders a single word that stretches edge-to-edge of its container by
 * computing the precise letter-spacing needed. Works on resize.
 */
export function JustifiedWordmark({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [spacing, setSpacing] = useState(0);

  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      const measure = measureRef.current;
      if (!wrap || !measure) return;
      const containerWidth = wrap.clientWidth;
      const baseWidth = measure.getBoundingClientRect().width;
      // distribute remaining space across gaps between visible chars
      const gaps = Math.max(text.replace(/\s/g, "").length - 1, 1);
      const extra = Math.max(containerWidth - baseWidth, 0);
      setSpacing(extra / gaps);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className={`w-full overflow-hidden ${className}`}>
      {/* hidden measurer — same font/size, zero spacing */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute whitespace-nowrap"
        style={{ letterSpacing: 0 }}
      >
        {text}
      </span>
      <div
        className="whitespace-nowrap font-display leading-[0.82]"
        style={{
          letterSpacing: `${spacing}px`,
          fontSize: "clamp(3rem, 18vw, 22rem)",
        }}
      >
        {text}
      </div>
    </div>
  );
}
