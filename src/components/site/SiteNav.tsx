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
  const [overDark, setOverDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch for sections tagged data-nav="dark" — flip nav to light text.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav="dark"]'),
    );
    if (sections.length === 0) {
      setOverDark(false);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // If any dark section intersects the top band of the viewport, treat as dark.
        const anyDark = entries.some((e) => e.isIntersecting);
        // Fallback recompute against all (because IO only reports changed entries).
        const dark = sections.some((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= 80 && r.bottom >= 80;
        });
        setOverDark(dark || anyDark === false ? dark : true);
      },
      { rootMargin: "-64px 0px -85% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  // Over the hero (home + top of page) → transparent, white text.
  // Otherwise → glass-white blur, or glass-dark when over a dark section.
  const overHero = isHome && !scrolled && !open;
  const lightOnDark = overHero || overDark;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero
          ? "bg-transparent text-white"
          : overDark
            ? "bg-black/55 backdrop-blur-xl border-b border-white/10 text-white"
            : "bg-background/85 backdrop-blur-2xl border-b hairline text-foreground shadow-[0_1px_0_rgba(0,0,0,0.03)]",
      )}
    >
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link to="/" aria-label="Fazal Ali — Home" className="inline-flex items-center">
          <img
            src={fiaLogo}
            alt="Fazal Ali"
            className={cn(
              "h-7 w-auto sm:h-8 transition-[filter] duration-500",
              lightOnDark
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
