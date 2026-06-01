import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function SiteFooter() {
  return (
    <footer className="relative mt-40 overflow-hidden border-t hairline bg-background">
      <div className="mx-auto max-w-[1700px] px-5 pt-24 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="eyebrow text-muted-foreground">Correspondence</p>
            <a
              href="mailto:writeme@fazalali.com"
              className="mt-4 block font-display text-2xl tracking-tight hover:underline"
            >
              writeme@fazalali.com
            </a>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Index</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/writing" className="hover:underline">Writing</Link></li>
              <li><Link to="/education-for-liberty" className="hover:underline">The Book</Link></li>
              <li><Link to="/omeros-ai" className="hover:underline">Omeros AI</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
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
                  Instagram
                </a>
              </li>
              <li><Link to="/contact" className="hover:underline">Write a note</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="px-2 pb-4 sm:px-4"
      >
        <h2 className="font-display leading-[0.78] tracking-[-0.05em] text-foreground text-[24vw] sm:text-[22vw]">
          Fazal<span className="italic">Ali</span>
        </h2>
      </motion.div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1700px] flex-col justify-between gap-2 px-5 py-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Fazal Ibrahim Ali</p>
          <p>Trinidad &amp; Tobago · Omeros AI</p>
          <p>Critical Theory in AI</p>
        </div>
      </div>
    </footer>
  );
}
