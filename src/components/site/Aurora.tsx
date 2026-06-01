import { useEffect, useRef } from "react";

/**
 * Slow drifting gradient blobs sitting behind everything.
 * Pure CSS blur, no canvas, no images — keeps the page light.
 */
export function Aurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.0015;
      const el = ref.current;
      if (el) {
        const x1 = 50 + Math.sin(t) * 18;
        const y1 = 35 + Math.cos(t * 0.8) * 14;
        const x2 = 65 + Math.cos(t * 0.6) * 20;
        const y2 = 70 + Math.sin(t * 0.5) * 12;
        el.style.setProperty("--x1", `${x1}%`);
        el.style.setProperty("--y1", `${y1}%`);
        el.style.setProperty("--x2", `${x2}%`);
        el.style.setProperty("--y2", `${y2}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40rem 40rem at var(--x1,40%) var(--y1,30%), oklch(0.88 0.04 60 / 0.55), transparent 60%), radial-gradient(50rem 50rem at var(--x2,70%) var(--y2,70%), oklch(0.82 0.05 250 / 0.35), transparent 65%), radial-gradient(30rem 30rem at 20% 80%, oklch(0.86 0.05 30 / 0.4), transparent 60%)",
          filter: "blur(40px)",
          transition: "background 800ms ease-out",
        }}
      />
      <div className="absolute inset-0 bg-[var(--color-background)]/40" />
    </div>
  );
}
