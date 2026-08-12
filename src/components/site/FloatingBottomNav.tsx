import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

// Primary links shown inline (compact pill).
const primaryLinks = [
  { to: "/books", label: "Books" },
  { to: "/writing", label: "Journal" },
  { to: "/podcast", label: "Podcast" },
  { to: "/about", label: "Profile" },
] as const;

// Secondary links shown only when expanded (excludes primary ones to avoid repeats).
const extraLinks = [
  { to: "/gallery", label: "Gallery" },
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
  const [visible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
          className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] hidden justify-center px-4 sm:bottom-7 lg:flex"
        >
          <div className="pointer-events-auto relative flex flex-col items-center">
            {/* Single container that grows when expanded */}
            <motion.nav
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
              layout
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative isolate cursor-pointer overflow-hidden border border-white/10 bg-[#1c1c1c] text-[#f1efec]",
                "shadow-[0_28px_80px_-24px_rgba(0,0,0,0.55)]",
                expanded ? "rounded-[1.25rem] p-2.5" : "rounded-[0.9rem] p-1.5",
              )}
            >
              <motion.div layout className="flex items-center gap-1">
                <Link
                  to="/"
                  aria-label="Fazal Ali, Home"
                  onClick={(e) => e.stopPropagation()}
                  className="mr-1 inline-flex h-11 w-11 items-center justify-center rounded-[0.6rem] bg-[#f1efec] transition-colors hover:bg-white overflow-hidden"
                >
                  <img
                    src={fiaLogo}
                    alt="FIA"
                    className="h-7 w-7 object-contain"
                    draggable={false}
                  />
                </Link>
                {primaryLinks.map((l) => {
                  const active = pathname === l.to || pathname.startsWith(l.to + "/");
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "relative rounded-[0.6rem] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
                        active ? "text-[#f1efec]" : "text-[#f1efec]/60 hover:text-[#f1efec]",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="floating-nav-pill"
                          className="absolute inset-0 rounded-[0.6rem] bg-white/10"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{l.label}</span>
                    </Link>
                  );
                })}
                <span className="mx-1 h-5 w-px bg-white/15" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded((v) => !v);
                  }}
                  aria-expanded={expanded}
                  aria-label={expanded ? "Close index" : "Open index"}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-[0.6rem] border border-white/15 text-[#f1efec]/75 transition-all hover:bg-white/10 hover:text-[#f1efec]",
                    expanded && "bg-white/10 text-[#f1efec]",
                  )}
                >
                  {expanded ? (
                    <X className="h-4 w-4 transition-transform duration-300" />
                  ) : (
                    <Menu className="h-4 w-4 transition-transform duration-300" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openContactDrawer();
                  }}
                  className="ml-1 rounded-[0.6rem] bg-[#f1efec] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1c1c1c] transition-opacity hover:opacity-85"
                >
                  Write Me
                </button>
              </motion.div>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="extras"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-[#f1efec]/55">
                        More
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {extraLinks.map((l) => {
                          const active = pathname === l.to || pathname.startsWith(l.to + "/");
                          return (
                            <li key={l.to}>
                              <Link
                                to={l.to}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpanded(false);
                                }}
                                className={cn(
                                  "block rounded-[0.6rem] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
                                  active
                                    ? "bg-white/10 text-[#f1efec]"
                                    : "text-[#f1efec]/60 hover:bg-white/10 hover:text-[#f1efec]",
                                )}
                              >
                                {l.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
