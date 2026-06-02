import { AnimatePresence, motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Wraps route content. On pathname change:
 * - A navy curtain swipes down across the viewport
 * - Then the new page fades+slides up underneath
 * Disabled under prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Curtain swipe overlay — keyed on pathname so it replays each navigation */}
      <AnimatePresence>
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden
          initial={{ y: "-100%" }}
          animate={{ y: ["-100%", "0%", "100%"] }}
          transition={{
            duration: 0.9,
            times: [0, 0.45, 1],
            ease: [0.83, 0, 0.17, 1],
          }}
          className="pointer-events-none fixed inset-0 z-[90] bg-background"
          style={{ willChange: "transform" }}
        />
      </AnimatePresence>
    </>
  );
}
