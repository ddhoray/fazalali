import { Link } from "@tanstack/react-router";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 text-foreground",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b hairline"
          : "bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link to="/" aria-label="Fazal Ali — Home" className="inline-flex items-center gap-2">
          <img src={fiaLogo} alt="" className="h-7 w-auto sm:h-8" />
          <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:inline">
            Fazal Ali
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link opacity-60 transition-opacity hover:opacity-100"
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
        <div className="border-t hairline bg-background md:hidden">
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
