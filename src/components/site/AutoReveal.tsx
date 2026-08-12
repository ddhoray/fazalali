import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const ITEM_SELECTOR =
  "h1, h2, h3, h4, h5, h6, p, blockquote, li, figure, img, a[class*='btn'], button, .reveal-item";

/**
 * Site-wide scroll reveal.
 * Each section fades up, and the text inside it reveals sequentially,
 * matching the homepage motion language on every page.
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

      const sections = Array.from(
        main.querySelectorAll<HTMLElement>(
          ":scope > section, :scope > div > section, :scope > div > div > section",
        ),
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
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
      );

      sections.forEach((section, sectionIndex) => {
        if (section.dataset.reveal === "on") return;
        section.dataset.reveal = "on";

        // Stagger the text/media blocks inside the section.
        const items = Array.from(
          section.querySelectorAll<HTMLElement>(ITEM_SELECTOR),
        ).filter((el) => {
          // Skip nested items whose ancestor is already an item.
          return !el.parentElement?.closest("[data-reveal-item]");
        });

        items.slice(0, 24).forEach((el, i) => {
          el.dataset.revealItem = "";
          el.style.transitionDelay = `${Math.min(i * 70, 700)}ms`;
        });

        // Hero (first section) reveals immediately, others on scroll.
        if (sectionIndex === 0) {
          requestAnimationFrame(() => section.classList.add("is-revealed"));
        } else {
          observer?.observe(section);
        }
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
