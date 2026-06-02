import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";
import fiaLogo from "@/assets/brand-fia.png";

const eflChildren = [
  { to: "/education-for-liberty", label: "The Book" },
  { to: "/podcast", label: "Podcast" },
  { to: "/palimpsest", label: "Palimpsest" },
] as const;

const links = [
  { to: "/writing", label: "Articles" },
  { to: "/education-for-liberty", label: "Education for Liberty", children: eflChildren },
  { to: "/omeros-ai", label: "Omeros" },
  { to: "/about", label: "About" },
] as const;

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
                  className="nav-link inline-flex items-center gap-1 opacity-70 transition-opacity hover:opacity-100"
                  activeProps={{ className: "opacity-100" }}
                >
                  {l.label}
                  <ChevronDown className="size-3 opacity-60" />
                </Link>
                {eflOpen && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <div
                      className={cn(
                        "min-w-[200px] border hairline shadow-lg",
                        lightOnDark ? "bg-black text-white" : "bg-background text-foreground",
                      )}
                    >
                      {l.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-5 py-3 text-xs uppercase tracking-[0.2em] opacity-75 transition-opacity hover:opacity-100"
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
                className="nav-link opacity-70 transition-opacity hover:opacity-100"
                activeProps={{ className: "opacity-100" }}
              >
                {l.label}
              </Link>
            ),
          )}
          <button
            type="button"
            onClick={() => openContactDrawer()}
            className="nav-link opacity-70 transition-opacity hover:opacity-100"
          >
            Write Me
          </button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
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
            {links.map((l) =>
              "children" in l && l.children ? (
                <div key={l.to}>
                  <button
                    type="button"
                    onClick={() => setEflOpenMobile((v) => !v)}
                    className="nav-link flex w-full items-center justify-between py-4 text-left text-foreground/80"
                  >
                    {l.label}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        eflOpenMobile && "rotate-180",
                      )}
                    />
                  </button>
                  {eflOpenMobile && (
                    <div className="flex flex-col border-l hairline pl-4">
                      {l.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="nav-link py-3 text-foreground/70"
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
                  className="nav-link py-4 text-foreground/80"
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
              className="nav-link py-4 text-left text-foreground/80"
            >
              Write Me
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
