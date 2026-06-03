import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

const eflChildren = [
  { to: "/education-for-liberty", label: "The Book" },
  { to: "/podcast", label: "Podcast" },
  { to: "/ecology", label: "Ecology" },
  { to: "/inequality", label: "Inequality" },
] as const;

const links = [
  { to: "/writing", label: "Journal" },
  { to: "/education-for-liberty", label: "Education for Liberty", children: eflChildren },
  { to: "/palimpsest", label: "Palimpsest" },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

// Animated swipe underline on hover (current color, left-origin).
const navUnderline =
  "relative after:pointer-events-none after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100";
const dropdownUnderline =
  "relative after:pointer-events-none after:absolute after:left-4 after:right-4 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [eflOpen, setEflOpen] = useState(false);
  const [eflOpenMobile, setEflOpenMobile] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <Link to="/" aria-label="Fazal Ali — Home" className="inline-flex items-center">
          <img
            src={fiaLogo}
            alt="Fazal Ali"
            className={cn(
              "h-7 w-auto sm:h-8 transition-[filter] duration-500",
              lightOnDark
                ? "brightness-0 invert"
                : "brightness-0",
            )}
          />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-6 lg:flex",
            lightOnDark && "[text-shadow:0_1px_2px_rgba(0,0,0,0.45)]",
          )}
        >
          {links.map((l) =>
            "children" in l && l.children ? (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => setEflOpen(true)}
                onMouseLeave={() => setEflOpen(false)}
              >
                <Link
                  to={l.to}
                  className={cn("nav-link-minimal opacity-100", navUnderline)}
                  activeProps={{ className: "opacity-100" }}
                >
                  {l.label}
                </Link>
                {eflOpen && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <div
                      className={cn(
                        "min-w-[180px] border hairline",
                        lightOnDark ? "bg-black text-white" : "bg-background text-foreground",
                      )}
                    >
                      {l.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className={cn("block px-4 py-2.5 nav-link-minimal opacity-100", dropdownUnderline)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={cn("nav-link-minimal opacity-100", navUnderline)}
                activeProps={{ className: "opacity-100" }}
              >
                {l.label}
              </Link>
            ),
          )}
          <button
            type="button"
            onClick={() => openContactDrawer()}
            className={cn("nav-link-minimal opacity-100", navUnderline)}
          >
            Write Me
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
            {links.map((l) =>
              "children" in l && l.children ? (
                <div key={l.to}>
                  <button
                    type="button"
                    onClick={() => setEflOpenMobile((v) => !v)}
                    className="nav-link-minimal flex w-full items-center justify-between py-3.5 text-left text-foreground/75"
                  >
                    <span>{l.label}</span>
                    <span className={cn("text-[10px] transition-transform", eflOpenMobile && "rotate-45")}>+</span>
                  </button>
                  {eflOpenMobile && (
                    <div className="flex flex-col border-l hairline pl-4">
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="nav-link-minimal py-2.5 text-foreground/65"
                      >
                        Overview
                      </Link>
                      {l.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="nav-link-minimal py-2.5 text-foreground/65"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="nav-link-minimal py-3.5 text-foreground/75"
                >
                  {l.label}
                </Link>
              ),
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openContactDrawer();
              }}
              className="nav-link-minimal py-3.5 text-left text-foreground/75"
            >
              Write Me
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
