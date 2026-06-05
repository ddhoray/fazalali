import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/components/site/ContactDrawer";

/**
 * Minimal fluid.glass-style top bar — used only on the homepage.
 * Centered wordmark + single "Write Me" link on the right.
 * Transparent over the hero, fades to a hairline glass bar after scroll.
 */
export function HomeTopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b hairline bg-white transition-all duration-500",
        scrolled ? "shadow-sm" : "",
      )}
      style={{ color: "var(--accent-cool)" }}
    >
      <div className="relative mx-auto flex max-w-[1700px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] opacity-80">
          Folio I
        </span>
        <Link
          to="/"
          aria-label="Fazal Ali — Home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-base tracking-tight sm:text-lg"
        >
          Fazal Ali
        </Link>
        <button
          type="button"
          onClick={() => openContactDrawer()}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--accent-cool)" }}
        >
          <span aria-hidden>↳</span> Write Me
        </button>
      </div>
    </header>
  );
}
