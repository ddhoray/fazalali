import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import fiaLogo from "@/assets/brand-omeros-lockup-transparent.png";
import { useCmsSaved, useCmsText } from "@/components/site/CmsExtras";

/**
 * Splash screen shown on first load of the session.
 * Fades out after a short delay; uses sessionStorage so it only appears once.
 */
export function SplashScreen() {
  const [show, setShow] = useState(true);
  const logo = useCmsSaved("site", "splashLogo") || fiaLogo;
  const customLogo = !!useCmsSaved("site", "splashLogo");
  const enabled = !/^(no|off|false|0)$/i.test(useCmsText("site", "splashEnabled").trim());
  const seconds = Math.min(10, Math.max(0.5, parseFloat(useCmsText("site", "splashSeconds")) || 1.6));
  const tagline = useCmsText("site", "splashTagline").trim();

  useEffect(() => {
    if (!enabled || sessionStorage.getItem("fia-splash-seen")) setShow(false);
  }, [enabled]);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("fia-splash-seen", "1");
      setShow(false);
    }, seconds * 1000);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show, seconds]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <img
              src={logo}
              alt="Omeros AI"
              className={customLogo ? "h-16 w-auto object-contain sm:h-20" : "h-16 w-auto object-contain brightness-0 invert sm:h-20"}
              draggable={false}
            />
            {tagline && <p className="text-[11px] uppercase tracking-[0.28em] opacity-70">{tagline}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
