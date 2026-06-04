import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import fiaLogo from "@/assets/brand-fia.png";

/**
 * Full-bleed brand reveal on load.
 * Shows only the black FIA mark, then slides up to expose the site.
 */
export function IntroReveal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("intro-reveal-played") === "true";
    if (hasPlayed) return;

    sessionStorage.setItem("intro-reveal-played", "true");
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 1900);
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
          onClick={() => {
            setShow(false);
            document.documentElement.style.overflow = "";
          }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.img
            src={fiaLogo}
            alt=""
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="h-16 w-auto brightness-0 sm:h-24"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
