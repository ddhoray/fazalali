import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/about", label: "About" },
  { to: "/writing", label: "Writing" },
  { to: "/education-for-liberty", label: "Education for Liberty" },
  { to: "/omeros-ai", label: "Omeros AI" },
  { to: "/contact", label: "Write Me" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className={cn(
            "group inline-flex items-center gap-2 rounded-none px-4 py-2 font-display text-lg tracking-tight transition-all",
            scrolled && "glass",
          )}
        >
          <span className="size-2 rounded-none bg-foreground" />
          <span>Fazal Ali</span>
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-none px-2 py-2 text-sm md:flex",
            scrolled && "glass",
          )}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-none px-4 py-1.5 text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground bg-foreground/5" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="glass inline-flex size-11 items-center justify-center rounded-none md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-5 mt-3 md:hidden">
          <nav className="glass flex flex-col rounded-none p-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-none px-4 py-3 text-foreground/80 transition-colors hover:bg-foreground/5"
                activeProps={{ className: "text-foreground bg-foreground/5" }}
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
