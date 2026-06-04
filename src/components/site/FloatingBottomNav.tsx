import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

// Primary links shown inline (compact pill).
const primaryLinks = [
  { to: "/writing", label: "Journal" },
  { to: "/education-for-liberty", label: "Book" },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

// Full index — mirrors SiteFooter "Index" list.
const allLinks = [
  { to: "/writing", label: "Journal" },
  { to: "/education-for-liberty", label: "Education for Liberty" },
  { to: "/podcast", label: "Podcast" },
  { to: "/ecology", label: "Ecology" },
  { to: "/inequality", label: "Inequality" },
  { to: "/palimpsest", label: "Palimpsest" },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

/**
 * fluid.glass-style floating pill nav, anchored bottom-center.
 * Transparent glassmorphism, reveals after a small scroll.
 * Expandable: a "+" toggle reveals the full index (synced with footer).
 */
export function FloatingBottomNav() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 1.75 : 160;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Collapse the expanded panel on route change.
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

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
          <div className="pointer-events-auto relative flex flex-col items-center gap-3">
            {/* Expanded full index panel */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    backdropFilter: "blur(110px) saturate(260%) contrast(118%) brightness(0.92)",
                    WebkitBackdropFilter:
                      "blur(110px) saturate(260%) contrast(118%) brightness(0.92)",
                  }}
                  className={cn(
                    "relative isolate w-[min(560px,92vw)] overflow-hidden rounded-3xl border border-white/45 bg-black/70 p-4 text-white",
                    "shadow-[0_1px_0_0_rgba(255,255,255,0.42)_inset,0_36px_110px_-16px_rgba(0,0,0,0.96)]",
                    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-white/[0.12] before:content-['']",
                  )}
                >
                  <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
                    Index
                  </p>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3">
                    {allLinks.map((l) => {
                      const active =
                        pathname === l.to || pathname.startsWith(l.to + "/");
                      return (
                        <li key={l.to}>
                          <Link
                            to={l.to}
                            onClick={() => setExpanded(false)}
                            className={cn(
                              "block rounded-xl px-3 py-2.5 text-[12px] tracking-wide transition-colors",
                              active
                                ? "bg-white/15 text-white"
                                : "text-white/75 hover:bg-white/10 hover:text-white",
                            )}
                          >
                            {l.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                    <a
                      href="mailto:writeme@fazalali.com"
                      className="px-2 text-[11px] text-white/65 hover:text-white"
                    >
                      writeme@fazalali.com
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setExpanded(false);
                        openContactDrawer();
                      }}
                      className="rounded-full bg-white px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-black hover:opacity-90"
                    >
                      Write Me
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compact pill */}
            <nav
              aria-label="Floating navigation"
              style={{
                backdropFilter: "blur(110px) saturate(260%) contrast(118%) brightness(0.92)",
                WebkitBackdropFilter:
                  "blur(110px) saturate(260%) contrast(118%) brightness(0.92)",
              }}
              className={cn(
                "relative isolate flex items-center gap-1 overflow-hidden rounded-full border border-white/45",
                "bg-black/70 px-2.5 py-2 text-white",
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
              {primaryLinks.map((l) => {
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
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-label={expanded ? "Close index" : "Open index"}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/85 transition-all hover:bg-white/15 hover:text-white",
                  expanded && "bg-white/20 text-white",
                )}
              >
                <Plus
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    expanded && "rotate-45",
                  )}
                />
              </button>
              <button
                type="button"
                onClick={() => openContactDrawer()}
                className="ml-1 rounded-full bg-white px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-black transition-opacity hover:opacity-90"
              >
                Write Me
              </button>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
