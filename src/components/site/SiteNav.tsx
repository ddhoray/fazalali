import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

const links = [
  { to: "/books", label: "Books" },
  { to: "/writing", label: "Journal" },
  { to: "/podcast", label: "Podcast" },
  { to: "/about", label: "Profile" },
] as const;

// Animated swipe underline on hover (current color, left-origin).
const navUnderline =
  "relative after:pointer-events-none after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  // Homepage uses HomeTopBar (a minimal fluid.glass-style bar). Hide the full nav there.
  if (isHome) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="dark"]'));
    if (sections.length === 0) {
      setOverDark(false);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const anyDark = entries.some((e) => e.isIntersecting);
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

  const overHero = isHome && !scrolled && !open;
  const lightOnDark = overHero || overDark;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero
          ? "bg-transparent text-white"
          : overDark
            ? "bg-black border-b border-white/10 text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
            : "bg-white border-b hairline text-black shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]",
      )}
    >
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <Link to="/" aria-label="Fazal Ali, Home" className="inline-flex items-center">
          <img
            src={fiaLogo}
            alt="Fazal Ali"
            className={cn(
              "h-7 w-auto sm:h-8 transition-[filter] duration-500",
              lightOnDark ? "brightness-0 invert" : "brightness-0",
            )}
          />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-6 lg:flex",
            lightOnDark && "[text-shadow:0_1px_2px_rgba(0,0,0,0.45)]",
          )}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn("nav-link-minimal opacity-100", navUnderline)}
              activeProps={{ className: "opacity-100" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => openContactDrawer()}
            className={cn("nav-link-minimal opacity-100", navUnderline)}
          >
            Write to him
          </button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
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
        <div className="border-t hairline bg-background text-foreground lg:hidden">
          <nav className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="nav-link-minimal py-3.5 text-foreground/75"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openContactDrawer();
              }}
              className="nav-link-minimal py-3.5 text-left text-foreground/75"
            >
              Write to him
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
