import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import fiaLogo from "@/assets/brand-fia.png";

/**
 * Full-bleed brand reveal on first visit (per session).
 * - Logo fades + scales in
 * - Wordmark slides up
 * - Overlay swipes down to expose the site
 * - Skips entirely under prefers-reduced-motion
 */
export function IntroReveal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    try {
      if (sessionStorage.getItem("fia-intro-played")) return;
      sessionStorage.setItem("fia-intro-played", "1");
    } catch {
      /* private mode — still play once */
    }
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2200);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          onClick={() => setShow(false)}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.img
            src={fiaLogo}
            alt=""
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-16 w-auto sm:h-24"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mt-6 text-foreground/70"
          >
            Fazal Ibrahim Ali
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.83, 0, 0.17, 1] }}
            style={{ transformOrigin: "left" }}
            className="mt-8 block h-px w-40 bg-foreground/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
