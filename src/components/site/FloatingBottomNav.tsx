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
  { to: "/podcast", label: "Podcast" },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

// Secondary links shown only when expanded (excludes primary ones to avoid repeats).
const extraLinks = [
  { to: "/education-for-liberty", label: "Education for Liberty" },
  { to: "/ecology", label: "Ecology" },
  { to: "/inequality", label: "Inequality" },
  { to: "/palimpsest", label: "Palimpsest" },
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
                  className={cn(
                    "relative isolate w-[min(560px,92vw)] overflow-hidden rounded-3xl border border-black/10 bg-white p-4 text-black",
                    "shadow-[0_1px_0_0_rgba(0,0,0,0.04)_inset,0_36px_110px_-16px_rgba(0,0,0,0.35)]",
                  )}
                >
                  <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-black/55">
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
                                ? "bg-black/10 text-black"
                                : "text-black/70 hover:bg-black/5 hover:text-black",
                            )}
                          >
                            {l.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                    <a
                      href="mailto:writeme@fazalali.com"
                      className="px-2 text-[11px] text-black/65 hover:text-black"
                    >
                      writeme@fazalali.com
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setExpanded(false);
                        openContactDrawer();
                      }}
                      className="rounded-full bg-black px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white hover:opacity-90"
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
              role="button"
              tabIndex={0}
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded((v) => !v);
                }
              }}
              className={cn(
                "relative isolate flex cursor-pointer items-center gap-1 overflow-hidden rounded-full border border-black/10",
                "bg-white px-2.5 py-2 text-black",
                "shadow-[0_1px_0_0_rgba(0,0,0,0.04)_inset,0_36px_110px_-16px_rgba(0,0,0,0.35)]",
              )}
            >
              <Link
                to="/"
                aria-label="Fazal Ali — Home"
                onClick={(e) => e.stopPropagation()}
                className="mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black ring-1 ring-black/10 shadow-sm transition-colors hover:bg-black/90"
              >
                <img
                  src={fiaLogo}
                  alt="FIA"
                  className="h-6 w-6 object-contain invert"
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
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "relative rounded-full px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
                      active ? "text-black" : "text-black/65 hover:text-black",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="floating-nav-pill"
                        className="absolute inset-0 rounded-full bg-black/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                );
              })}
              <span className="mx-1 h-5 w-px bg-black/15" />
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-label={expanded ? "Close index" : "Open index"}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/75 transition-all hover:bg-black/5 hover:text-black",
                  expanded && "bg-black/10 text-black",
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
                onClick={(e) => {
                  e.stopPropagation();
                  openContactDrawer();
                }}
                className="ml-1 rounded-full bg-black px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
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
