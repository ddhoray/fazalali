import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { SiteFooter } from "../components/site/SiteFooter";
import { SmoothScroll } from "../components/site/SmoothScroll";
import { PageTransition } from "../components/site/PageTransition";
import { ContactDrawer } from "../components/site/ContactDrawer";
import { FloatingBottomNav } from "../components/site/FloatingBottomNav";



function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-none p-10 text-center">
        <p className="font-display text-7xl">404</p>
        <h2 className="mt-3 font-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has drifted out of frame.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-none bg-foreground px-5 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-none p-10 text-center">
        <h1 className="font-display text-2xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-none bg-foreground px-5 py-2.5 text-sm text-background"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-none border border-foreground/20 px-5 py-2.5 text-sm"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fazal Ali — Writer, Scholar, Omeros AI" },
      {
        name: "description",
        content:
          "Dr. Fazal Ibrahim Ali — writing on critical theory in AI from the West Indies. Books, ideas, art, and the Omeros AI identity.",
      },
      { name: "author", content: "Fazal Ibrahim Ali" },
      { name: "keywords", content: "Fazal Ali, Fazal Ibrahim Ali, Omeros AI, Education for Liberty, critical theory AI, Caribbean philosophy, Trinidad writer, West Indies AI, Cambridge scholar" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "theme-color", content: "#0f1b3d" },
      { property: "og:site_name", content: "Fazal Ali" },
      { property: "og:title", content: "Fazal Ali — Writer, Scholar, Omeros AI" },
      { property: "og:description", content: "Writing on critical theory in AI from the West Indies. The Omeros AI brand identity." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Fazal Ali — Writer, Scholar, Omeros AI" },
      { name: "twitter:description", content: "Writing on critical theory in AI from the West Indies. The Omeros AI brand identity." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Geist:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://omeros-cipher-glass.lovable.app/#person",
              name: "Fazal Ibrahim Ali",
              alternateName: "Dr. Fazal Ali",
              jobTitle: "Writer, Scholar, Founder of Omeros AI",
              nationality: "Trinidadian",
              birthPlace: "Trinidad and Tobago",
              alumniOf: { "@type": "CollegeOrUniversity", name: "University of Cambridge" },
              url: "https://omeros-cipher-glass.lovable.app",
              sameAs: ["https://fazalali.com"],
              knowsAbout: [
                "Critical theory in artificial intelligence",
                "Caribbean philosophy",
                "Education",
                "Decolonial thought",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://omeros-cipher-glass.lovable.app/#website",
              url: "https://omeros-cipher-glass.lovable.app",
              name: "Fazal Ali",
              description: "Writer, scholar, and founder of Omeros AI.",
              publisher: { "@id": "https://omeros-cipher-glass.lovable.app/#person" },
              inLanguage: "en",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          // No-flash theme init — default LIGHT, only opt-in to dark.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <SiteFooter />
      <div aria-hidden className="h-28 sm:h-32" />
      <FloatingBottomNav />
      <ContactDrawer />
    </QueryClientProvider>

  );
}
