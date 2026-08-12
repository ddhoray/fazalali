import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

// Full index, revealed in the expanding panel.
const indexLinks = [
  { to: "/books", label: "Books" },
  { to: "/writing", label: "Journal" },
  { to: "/podcast", label: "Podcast" },
  { to: "/about", label: "Profile" },
  { to: "/gallery", label: "Gallery" },
  { to: "/ecology", label: "Ecology" },
  { to: "/inequality", label: "Inequality" },
  { to: "/palimpsest", label: "Palimpsest" },
] as const;

/**
 * Minimal glass dock, anchored bottom-centre.
 * Sharp edges, transparent frosted surface, one expanding index.
 */
export function FloatingBottomNav() {
  const [expanded, setExpanded] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] hidden justify-center px-4 lg:flex">
      <motion.nav
        aria-label="Site navigation"
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-auto relative isolate overflow-hidden rounded-none",
          "border border-foreground/10 bg-background/55 backdrop-blur-xl",
          "shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]",
        )}
      >
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="index"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="flex flex-col px-3 pt-3">
                {indexLinks.map((l) => {
                  const active =
                    pathname === l.to || pathname.startsWith(l.to + "/");
                  return (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        onClick={() => setExpanded(false)}
                        className={cn(
                          "block px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors",
                          active
                            ? "text-foreground"
                            : "text-foreground/55 hover:text-foreground",
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mx-3 mt-3 border-t border-foreground/10" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="flex items-center gap-2 p-2">
          <Link
            to="/"
            aria-label="Fazal Ali, Home"
            className="inline-flex h-10 w-10 items-center justify-center"
          >
            <img
              src={fiaLogo}
              alt="FIA"
              className="h-7 w-7 object-contain mix-blend-multiply"
              draggable={false}
            />
          </Link>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
          >
            {expanded ? "Close" : "Index"}
          </button>

          <span className="h-5 w-px bg-foreground/15" />

          <button
            type="button"
            onClick={() => openContactDrawer()}
            className="bg-foreground px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-85"
          >
            Write Me
          </button>
        </motion.div>
      </motion.nav>
    </div>
  );
}
