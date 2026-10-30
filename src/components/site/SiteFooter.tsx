import { Link } from "@tanstack/react-router";
import { JustifiedWordmark } from "./JustifiedWordmark";
import { useCmsLinks, useCmsText } from "./CmsExtras";

const isExternal = (to: string) => /^https?:|^mailto:/.test(to);

export function SiteFooter() {
  const c = (k: string) => useCmsText("site", k);
  const footerLinks = useCmsLinks("site", "footerLinks");
  const social = useCmsLinks("site", "socialLinks");
  const email = c("email");
  const linkCls = "text-foreground/75 hover:text-foreground transition-colors";
  return (
    <footer className="relative overflow-hidden border-t hairline bg-background">
      <div className="mx-auto max-w-[1700px] px-5 pt-8 pb-6 sm:px-8">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">{c("contactLabel")}</p>
            <a href={`mailto:${email}`} className="mt-2 block text-[13px] hover:underline underline-offset-4">
              {email}
            </a>
            <p className="mt-1 text-[12px] text-muted-foreground">{c("location")}</p>
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">{c("indexLabel")}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
              {footerLinks.map((l) => (
                <li key={l.to + l.label}>
                  {isExternal(l.to) ? (
                    <a href={l.to} target="_blank" rel="noreferrer" className={linkCls}>{l.label}</a>
                  ) : (
                    <Link to={l.to as "/"} className={linkCls}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-muted-foreground">{c("elsewhereLabel")}</p>
            {social.map((s) => (
              <a key={s.to} href={s.to} target="_blank" rel="noreferrer" className={`mt-2 block text-[13px] ${linkCls}`}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 sm:px-8">
        <JustifiedWordmark text={c("wordmark")} />
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-2 px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {c("copyright")}</p>
          <p>
            {c("creditPrefix")}{" "}
            <a href={c("creditUrl")} target="_blank" rel="noreferrer" className="text-foreground hover:underline underline-offset-4">
              {c("creditName")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
