import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Lerp mode (no duration/easing) gives the continuously damped,
    // never-snapping glide of the reference site.
    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      syncTouch: true,
      syncTouchLerp: 0.08,
      overscroll: false,
    });

    // Expose for anchor scrolling elsewhere if needed.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
