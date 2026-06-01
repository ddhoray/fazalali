import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-40 border-t hairline">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 sm:px-10 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl tracking-tight">FAZAL ALI</p>
          <p className="mt-5 max-w-sm text-sm text-muted-foreground">
            Writing on critical theory in AI from the West Indies. Books, ideas, art —
            under the Omeros AI identity.
          </p>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Pages</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/writing" className="hover:underline">Writing</Link></li>
            <li><Link to="/education-for-liberty" className="hover:underline">The Book</Link></li>
            <li><Link to="/omeros-ai" className="hover:underline">Omeros AI</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Elsewhere</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href="mailto:writeme@fazalali.com" className="hover:underline">writeme@fazalali.com</a></li>
            <li><a href="https://www.instagram.com/thefazalali/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></li>
            <li><Link to="/contact" className="hover:underline">Write a note</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-2 px-5 py-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:px-10 md:flex-row">
          <p>© {new Date().getFullYear()} Fazal Ibrahim Ali · Trinidad &amp; Tobago</p>
          <p>Omeros AI</p>
        </div>
      </div>
    </footer>
  );
}
