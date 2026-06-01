import { Link } from "@tanstack/react-router";
import { JustifiedWordmark } from "./JustifiedWordmark";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t hairline bg-background">
      <div className="mx-auto max-w-[1700px] px-5 pt-16 pb-12 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="eyebrow text-muted-foreground">Correspondence</p>
            <a
              href="mailto:writeme@fazalali.com"
              className="mt-4 block font-display text-2xl tracking-tight hover:underline"
            >
              writeme@fazalali.com
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              Trinidad &amp; Tobago, West Indies
            </p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Index</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/writing" className="hover:underline">Writing</Link></li>
              <li><Link to="/education-for-liberty" className="hover:underline">The Book</Link></li>
              <li><Link to="/omeros-ai" className="hover:underline">Omeros AI</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/thefazalali/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Instagram — @thefazalali
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Edge-to-edge justified wordmark */}
      <div className="px-5 pb-6 sm:px-8">
        <JustifiedWordmark text="FAZAL ALI" />
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1700px] flex-col justify-between gap-2 px-5 py-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Fazal Ibrahim Ali</p>
          <p>All work, all writing</p>
        </div>
      </div>
    </footer>
  );
}
