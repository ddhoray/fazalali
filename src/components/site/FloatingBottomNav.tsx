import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/writing", label: "Journal" },
  { to: "/education-for-liberty", label: "Book" },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

/**
 * fluid.glass-style floating pill nav, anchored bottom-center.
 * Transparent glassmorphism, reveals after a small scroll.
 */
export function FloatingBottomNav() {
  const [visible, setVisible] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4 sm:bottom-7"
        >
          <nav
            aria-label="Floating navigation"
            style={{
              backdropFilter: "blur(110px) saturate(260%) contrast(118%) brightness(0.92)",
              WebkitBackdropFilter:
                "blur(110px) saturate(260%) contrast(118%) brightness(0.92)",
            }}
            className={cn(
              "pointer-events-auto relative isolate flex items-center gap-1 overflow-hidden rounded-full border border-white/45",
              "bg-black/70 px-2.5 py-2 text-white backdrop-blur-[110px] backdrop-saturate-[260%]",
              "shadow-[0_1px_0_0_rgba(255,255,255,0.42)_inset,0_36px_110px_-16px_rgba(0,0,0,0.96)]",
              "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white/[0.12] before:content-['']",
              "after:pointer-events-none after:absolute after:inset-px after:-z-10 after:rounded-full after:bg-gradient-to-b after:from-white/[0.18] after:to-transparent after:content-['']",
            )}
          >
            <Link
              to="/"
              aria-label="Fazal Ali — Home"
              className="mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-white/60 shadow-sm transition-colors hover:bg-white/90"
            >
              <img
                src={fiaLogo}
                alt="FIA"
                className="h-6 w-6 object-contain"
                draggable={false}
              />
            </Link>
            {links.slice(1).map((l) => {
              const active =
                pathname === l.to || pathname.startsWith(l.to + "/");
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
                    active ? "text-white" : "text-white/70 hover:text-white",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="floating-nav-pill"
                      className="absolute inset-0 rounded-full bg-white/20"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
            <span className="mx-1 h-5 w-px bg-white/20" />
            <button
              type="button"
              onClick={() => openContactDrawer()}
              className="rounded-full bg-white px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-black transition-opacity hover:opacity-90"
            >
              Write Me
            </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
