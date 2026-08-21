import { Link } from "@tanstack/react-router";
import { JustifiedWordmark } from "./JustifiedWordmark";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t hairline bg-background">
      <div className="mx-auto max-w-[1700px] px-5 pt-8 pb-6 sm:px-8">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">Correspondence</p>
            <a
              href="mailto:writeme@fazalali.com"
              className="mt-2 block text-[13px] hover:underline underline-offset-4"
            >
              writeme@fazalali.com
            </a>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Trinidad &amp; Tobago, West Indies
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">Index</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
              <li>
                <Link
                  to="/books"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/writing"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  to="/podcast"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/education-for-liberty"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Education for Liberty
                </Link>
              </li>
              <li>
                <Link
                  to="/palimpsest"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Palimpsest
                </Link>
              </li>
              <li>
                <Link
                  to="/inequality"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Inequality
                </Link>
              </li>
              <li>
                <Link
                  to="/ecology"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Ecology
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-muted-foreground">Elsewhere</p>
            <a
              href="https://www.instagram.com/thefazalali/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-[13px] text-foreground/75 hover:text-foreground transition-colors"
            >
              Instagram, @thefazalali
            </a>
          </div>
        </div>
      </div>

      {/* Edge-to-edge justified wordmark */}
      <div className="px-5 pb-6 sm:px-8">
        <JustifiedWordmark text="FAZAL ALI" />
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-2 px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Fazal Ibrahim Ali</p>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://hyperrevamp.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:underline underline-offset-4"
            >
              HyperRevamp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
