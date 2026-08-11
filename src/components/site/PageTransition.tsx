import { useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

/**
 * Lightweight route wrapper.
 * No exit/enter animation - clicking a link should open the next page
 * immediately, with no flash of the current page first.
 * Only responsibility: scroll to top on route change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return <>{children}</>;
}
