import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";
import { useCmsLinks, useCmsSaved, useCmsText } from "@/components/site/CmsExtras";

const links = [
  { to: "/books", label: "Books" },
  { to: "/writing", label: "Journal" },
  { to: "/podcast", label: "Podcast" },
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
  const cmsLinks = useCmsLinks("site", "navMobile");
  const navLinks = cmsLinks.length ? cmsLinks : links;
  const logo = useCmsSaved("site", "mobileLogo") || fiaLogo;
  const cta = useCmsText("site", "menuCta");

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
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between border-b border-black/5 bg-[#f1efec] px-4 py-3 lg:hidden">
        <Link
          to="/"
          aria-label="Fazal Ali, Home"
          className="inline-flex min-h-11 min-w-11 items-center justify-center"
        >
          <img src={logo} alt="FIA" className="h-8 w-8 object-contain" draggable={false} />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[0.6rem] border border-black/15 bg-transparent text-[#1c1c1c]"
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
            className="fixed inset-0 z-[55] flex flex-col bg-[#f1efec] pt-16 lg:hidden"
          >
            <nav className="flex flex-col overflow-y-auto px-6 py-6">
              {navLinks.map((l) => {
                const active = pathname === l.to || pathname.startsWith(l.to + "/");
                return (
                  <Link
                    key={l.to}
                    to={l.to as "/"}
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
                className="mt-6 rounded-[0.6rem] bg-[#1c1c1c] px-6 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white"
              >
                {cta}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
