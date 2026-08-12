import { useLayoutEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Ensures each route renders starting at the top of the page.
 * Uses useLayoutEffect so the reset happens before the browser paints
 * the new route, no visible scroll animation, no flash at the previous
 * scroll position.
 */
export function ScrollToTop() {
 const pathname = useRouterState({ select: (s) => s.location.pathname });

 useLayoutEffect(() => {
 if (typeof window === "undefined") return;
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;
  }, [pathname]);

 return null;
}
