import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import fiaLogo from "@/assets/brand-fia.png";

const links = [
  { to: "/writing", label: "Articles" },
  { to: "/education-for-liberty", label: "Education for Liberty" },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Write Me" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the hero (home + top of page) → transparent, white text.
  // Otherwise → glass-white blur.
  const overHero = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero
          ? "bg-transparent text-white"
          : "bg-background/70 backdrop-blur-xl border-b hairline text-foreground",
      )}
    >
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link to="/" aria-label="Fazal Ali — Home" className="inline-flex items-center">
          <img
            src={fiaLogo}
            alt="Fazal Ali"
            className={cn(
              "h-7 w-auto sm:h-8 transition-[filter] duration-500",
              // Over hero: always white. Otherwise: black in light mode, white in dark mode.
              overHero
                ? "brightness-0 invert"
                : "brightness-0 dark:brightness-0 dark:invert",
            )}
          />
        </Link>


        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link opacity-70 transition-opacity hover:opacity-100"
              activeProps={{ className: "opacity-100" }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t hairline bg-background text-foreground md:hidden">
          <nav className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="nav-link py-4 text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
