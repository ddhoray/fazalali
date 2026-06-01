import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-32 max-w-7xl px-5 pb-12 sm:px-8">
      <div className="glass rounded-[2.5rem] p-10 md:p-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-none">Fazal Ibrahim Ali</p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Writing on critical theory in AI from the West Indies.
              The Omeros AI brand identity — books, ideas, art.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Pages
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-foreground/80">About</Link></li>
              <li><Link to="/writing" className="hover:text-foreground/80">Writing</Link></li>
              <li><Link to="/education-for-liberty" className="hover:text-foreground/80">Education for Liberty</Link></li>
              <li><Link to="/omeros-ai" className="hover:text-foreground/80">Omeros AI</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:writeme@fazalali.com" className="hover:text-foreground/80">writeme@fazalali.com</a></li>
              <li><a href="https://www.instagram.com/thefazalali/" target="_blank" rel="noreferrer" className="hover:text-foreground/80">Instagram</a></li>
              <li><Link to="/contact" className="hover:text-foreground/80">Write me a note</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Fazal Ibrahim Ali. Trinidad &amp; Tobago.</p>
          <p className="font-display tracking-tight">Omeros AI</p>
        </div>
      </div>
    </footer>
  );
}
