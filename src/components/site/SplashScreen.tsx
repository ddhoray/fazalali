import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import fiaLogo from "@/assets/brand-fia.png";

/**
 * Splash screen shown on first load of the session.
 * Fades out after a short delay; uses sessionStorage so it only appears once.
 */
export function SplashScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("fia-splash-seen");
  });

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("fia-splash-seen", "1");
      setShow(false);
    }, 1600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show]);

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
              src={fiaLogo}
              alt="Fazal Ali"
              className="h-16 w-16 object-contain invert"
              draggable={false}
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/70">
              Fazal Ali
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
