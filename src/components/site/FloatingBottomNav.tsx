import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import omerosMark from "@/assets/brand-omeros-mark.png";

const primaryLinks = [
  { to: "/about", label: "Profile" },
  { to: "/books", label: "Books" },
  { to: "/writing", label: "Journal" },
  { to: "/podcast", label: "Podcast" },
  { to: "/gallery", label: "Gallery" },
] as const;

const secondaryLinks = [
  { to: "/ecology", label: "Ecology" },
  { to: "/inequality", label: "Inequality" },
  { to: "/palimpsest", label: "Palimpsest" },
] as const;

const easing = [0.22, 1, 0.36, 1] as const;

function currentLabel(pathname: string) {
  if (pathname === "/") return "Home";
  const all = [...primaryLinks, ...secondaryLinks];
  const match = all.find(
    (l) => pathname === l.to || pathname.startsWith(l.to + "/"),
  );
  return match?.label ?? "Menu";
}

/**
 * Fluid-glass style dock: compact pill bottom-centre that opens a dark
 * translucent panel above it; the pill becomes a single close button.
 */
export function FloatingBottomNav() {
  const [expanded, setExpanded] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] hidden flex-col items-center px-4 lg:flex">
      {/* Expanding panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 12, height: 0 }}
            transition={{ duration: 0.45, ease: easing }}
            className="pointer-events-auto mb-3 w-[480px] max-w-[86vw] overflow-hidden border border-white/10 bg-[#1c1c1c]/85 backdrop-blur-2xl shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]"
          >
            <div className="px-10 py-10">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                Menu
              </p>

              <ul className="mt-6 space-y-1">
                {primaryLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setExpanded(false)}
                      className="block text-[34px] leading-[1.18] font-normal text-white/90 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-white/60">
                <div className="space-y-2">
                  {secondaryLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setExpanded(false)}
                      className="block transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2">
                  <Link
                    to="/education-for-liberty"
                    onClick={() => setExpanded(false)}
                    className="block transition-colors hover:text-white"
                  >
                    Education for Liberty
                  </Link>
                  <Link
                    to="/omeros-ai"
                    onClick={() => setExpanded(false)}
                    className="block transition-colors hover:text-white"
                  >
                    Omeros AI
                  </Link>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  openContactDrawer();
                }}
                className="mt-8 flex w-full items-center justify-center gap-3 border border-white/15 bg-white/[0.04] px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-white/10"
              >
                <span aria-hidden>↳</span> Write Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock */}
      <motion.nav
        aria-label="Site navigation"
        layout
        transition={{ duration: 0.45, ease: easing }}
        className={cn(
          "pointer-events-auto flex items-center overflow-hidden",
          "border border-white/10 bg-[#1c1c1c]/85 backdrop-blur-2xl",
          "shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]",
        )}
      >
        {expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close menu"
            aria-expanded
            className="flex h-16 w-16 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        ) : (
          <div className="flex h-16 items-center">
            <Link
              to="/"
              aria-label="Home"
              className="flex h-full items-center px-5"
            >
              <img
                src={omerosMark}
                alt="Omeros"
                className="h-9 w-auto object-contain brightness-0 invert"
                draggable={false}
              />
            </Link>

            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              className="flex h-full items-center gap-14 px-6 text-[11px] uppercase tracking-[0.28em] text-white/80 transition-colors hover:text-white"
            >
              <span>{currentLabel(pathname)}</span>
              <span className="flex flex-col gap-[5px]" aria-hidden>
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-6 bg-current" />
              </span>
            </button>
          </div>
        )}
      </motion.nav>
    </div>
  );
}
