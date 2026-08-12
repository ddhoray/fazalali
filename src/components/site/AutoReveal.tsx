import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Applies the homepage's damped fade-up reveal to every section on every page.
 * Sections are tagged on route change and revealed as they enter the viewport.
 */
export function AutoReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;

    const run = () => {
      const main = document.querySelector("main");
      if (!main) return;

      const candidates = Array.from(
        main.querySelectorAll<HTMLElement>(":scope > section, :scope > div > section"),
      );

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );

      candidates.forEach((el, i) => {
        // Leave the first (hero) block alone so it is visible immediately.
        if (i === 0) return;
        if (el.dataset.reveal === "on") return;
        el.dataset.reveal = "on";
        observer?.observe(el);
      });
    };

    const id = window.setTimeout(run, 60);
    return () => {
      window.clearTimeout(id);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
