import { Link } from "@tanstack/react-router";
import { Mail, Instagram, MapPin } from "lucide-react";
import { JustifiedWordmark } from "./JustifiedWordmark";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t hairline bg-background">
      <div className="mx-auto max-w-[1700px] px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="eyebrow text-muted-foreground">Correspondence</p>
            <a
              href="mailto:writeme@fazalali.com"
              className="mt-4 inline-flex items-center gap-2 font-display text-2xl tracking-tight hover:underline"
            >
              <Mail className="size-4 opacity-60" />
              writeme@fazalali.com
            </a>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5 opacity-60" />
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
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  <Instagram className="size-4 opacity-60" />
                  @thefazalali
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Edge-to-edge justified wordmark */}
      <div className="px-5 pb-8 sm:px-8">
        <JustifiedWordmark text="FAZAL ALI" />
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-3 px-5 py-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Fazal Ibrahim Ali — All work, all writing</p>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://hyperium.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:underline"
            >
              Hyperium
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
