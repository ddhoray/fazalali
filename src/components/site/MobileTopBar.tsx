import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

const links = [
  { to: "/education-for-liberty", label: "Education for Liberty" },
  { to: "/writing", label: "Journal" },
  { to: "/podcast", label: "Podcast" },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/ecology", label: "Ecology" },
  { to: "/inequality", label: "Inequality" },
  { to: "/palimpsest", label: "Palimpsest" },
] as const;

/**
 * Mobile / tablet top bar: logo on the left, hamburger on the right.
 * Replaces the floating bottom nav below the lg breakpoint.
 */
export function MobileTopBar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between border-b border-black/10 bg-white px-4 py-3 lg:hidden">
        <Link
          to="/"
          aria-label="Fazal Ali — Home"
          className="inline-flex h-10 w-10 items-center justify-center"
        >
          <img src={fiaLogo} alt="FIA" className="h-8 w-8 object-contain" draggable={false} />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-black"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col bg-white pt-16 lg:hidden"
          >
            <nav className="flex flex-col overflow-y-auto px-6 py-6">
              {links.map((l) => {
                const active = pathname === l.to || pathname.startsWith(l.to + "/");
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "border-b border-black/10 py-4 text-[13px] font-medium uppercase tracking-[0.18em]",
                      active ? "text-black" : "text-black/65",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openContactDrawer();
                }}
                className="mt-6 rounded-full bg-black px-6 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white"
              >
                Write Me
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
