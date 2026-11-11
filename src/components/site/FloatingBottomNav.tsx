import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import menuImage from "@/assets/menu-archive.jpg.asset.json";
import omerosMark from "@/assets/omeros-dock-mark.png.asset.json";
import { assetUrl } from "@/lib/asset-url";
import { useCmsLinks, useCmsSaved, useCmsText } from "@/components/site/CmsExtras";

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

const extraLabels: Record<string, string> = {
  "/contact": "Contact",
  "/omeros-ai": "Omeros AI",
  "/education-for-liberty": "Education for Liberty",
};

function currentLabel(pathname: string, primary: readonly { to: string; label: string }[], secondary: readonly { to: string; label: string }[]) {
  if (pathname === "/") return "Home";
  const all = [
    ...primary,
    ...secondary,
    ...Object.entries(extraLabels).map(([to, label]) => ({ to, label })),
  ];
  const match = all
    .filter((l) => pathname === l.to || pathname.startsWith(l.to + "/"))
    .sort((a, b) => b.to.length - a.to.length)[0];
  return match?.label ?? "Menu";
}

/**
 * Fluid-glass style dock: compact pill bottom-centre that opens a dark
 * translucent panel above it; the pill becomes a single close button.
 */
export function FloatingBottomNav() {
  const [expanded, setExpanded] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cmsPrimary = useCmsLinks("site", "navPrimary");
  const cmsSecondary = useCmsLinks("site", "navSecondary");
  const primary = cmsPrimary.length ? cmsPrimary : primaryLinks;
  const secondary = cmsSecondary.length ? cmsSecondary : [...secondaryLinks, { to: "/education-for-liberty", label: "Education for Liberty" }, { to: "/omeros-ai", label: "Omeros AI" }];
  const menuLabel = useCmsText("site", "menuLabel");
  const menuCta = useCmsText("site", "menuCta");
  const dockLogo = useCmsSaved("site", "dockLogo") || assetUrl(omerosMark);
  const half = Math.ceil(secondary.length / 2);

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] hidden flex-col items-center px-4 lg:flex">
      {/* Expanding panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="menu-backdrop"
            aria-hidden
            onClick={() => setExpanded(false)}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.6, ease: easing, delay: 0.15 } }}
            transition={{ duration: 0.9, ease: easing }}
            className="pointer-events-auto fixed inset-0 z-0 overflow-hidden bg-[#111]"
          >
            <motion.img
              src={assetUrl(menuImage)}
              alt=""
              initial={{ scale: 1.25, y: "8%" }}
              animate={{ scale: 1.04, y: "0%" }}
              exit={{ scale: 1.12 }}
              transition={{ duration: 1.4, ease: easing }}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
          </motion.div>
        )}
        {expanded && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto", transition: { duration: 0.6, ease: easing, delay: 0.55 } }}
            exit={{ opacity: 0, y: 16, height: 0, transition: { duration: 0.35, ease: easing } }}
            className="pointer-events-auto relative z-10 mb-3 w-[480px] max-w-[86vw] overflow-hidden border border-white/10 bg-[#1c1c1c]/55 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]"
          >
            <div className="px-10 py-10">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                {menuLabel}
              </p>

              <ul className="mt-6 space-y-1">
                {primary.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to as "/"}
                      onClick={() => setExpanded(false)}
                      className="block text-[34px] leading-[1.18] font-normal text-white/90 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-white/60">
                {[secondary.slice(0, half), secondary.slice(half)].map((col, ci) => (
                  <div key={ci} className="space-y-2">
                    {col.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to as "/"}
                        onClick={() => setExpanded(false)}
                        className="block transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  openContactDrawer();
                }}
                className="mt-8 flex w-full items-center justify-center gap-3 border border-white/15 bg-white/[0.04] px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-white/10"
              >
                <span aria-hidden>↳</span> {menuCta}
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
          "pointer-events-auto relative z-10 flex items-center overflow-hidden",
          "border border-white/10 bg-[#1c1c1c]/55 backdrop-blur-2xl backdrop-saturate-150",
          "shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]",
        )}
      >
        {expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close menu"
            aria-expanded
            className="flex h-14 w-14 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        ) : (
          <div className="flex h-14 items-center">
            <Link
              to="/"
              aria-label="Home"
              className="flex h-full w-16 shrink-0 items-center justify-center"
            >
              <img
                src={dockLogo}
                alt="Omeros"
                className="block h-11 w-11 object-contain"
                draggable={false}
              />
            </Link>


            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              className="flex h-full items-center gap-8 border-l border-white/10 px-5 text-[11px] uppercase tracking-[0.28em] text-white/80 transition-colors hover:text-white"
            >
              <span className="whitespace-nowrap">{currentLabel(pathname, primary, secondary)}</span>
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
