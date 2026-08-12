import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  PenLine,
  Mic,
  User,
  Image as ImageIcon,
  Leaf,
  Scale,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import omerosMark from "@/assets/brand-omeros-mark.png";

// Full menu, revealed in the expanding panel.
const menuLinks = [
  { to: "/books", label: "Books", icon: BookOpen },
  { to: "/writing", label: "Journal", icon: PenLine },
  { to: "/podcast", label: "Podcast", icon: Mic },
  { to: "/about", label: "Profile", icon: User },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/ecology", label: "Ecology", icon: Leaf },
  { to: "/inequality", label: "Inequality", icon: Scale },
  { to: "/palimpsest", label: "Palimpsest", icon: Layers },
] as const;

/**
 * Dark translucent dock, anchored bottom-centre.
 * Sharp edges, frosted graphite surface, one expanding menu.
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
        className={cn(
          "pointer-events-auto relative isolate w-[560px] max-w-[80vw] overflow-hidden rounded-none",
          "border border-white/10 bg-[#1c1c1c]/85 backdrop-blur-2xl",
          "shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]",
        )}
      >
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pt-5">
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Menu
                </p>
                <ul className="grid grid-cols-2 gap-1">
                  {menuLinks.map((l) => {
                    const Icon = l.icon;
                    const active =
                      pathname === l.to || pathname.startsWith(l.to + "/");
                    return (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          onClick={() => setExpanded(false)}
                          className={cn(
                            "group flex items-center gap-3 px-3 py-3 transition-colors",
                            active
                              ? "bg-white/10 text-white"
                              : "text-white/60 hover:bg-white/5 hover:text-white",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" strokeWidth={1.4} />
                          <span className="text-[11px] uppercase tracking-[0.2em]">
                            {l.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mx-5 mt-5 border-t border-white/10" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1 p-2">
          <Link
            to="/"
            aria-label="Home"
            className="inline-flex h-12 items-center justify-center px-2"
          >
            <img
              src={omerosMark}
              alt="Omeros"
              className="h-7 w-auto object-contain brightness-0 invert"
              draggable={false}
            />
          </Link>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="justify-self-center px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
          >
            {expanded ? "Close" : "Menu"}
          </button>

          <button
            type="button"
            onClick={() => openContactDrawer()}
            className="bg-white px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#1c1c1c] transition-opacity hover:opacity-85"
          >
            Write Me
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
