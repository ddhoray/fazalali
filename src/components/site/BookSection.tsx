import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import bookCoverAsset from "@/assets/book-education-for-liberty-cover.png.asset.json";
import { assetUrl } from "@/lib/asset-url";
import { Rich, useCmsSaved, useCmsText } from "@/components/site/CmsExtras";
const bookCover = assetUrl(bookCoverAsset);

/**
 * Dedicated book section, appears on the home page above the journal block.
 * Cool slate background, book cover on the left, copy + credits on the right.
 */
function CmsLink({ to, className, children }: { to: string; className: string; children: React.ReactNode }) {
  if (/^https?:|^mailto:/.test(to)) return <a href={to} target="_blank" rel="noreferrer" className={className}>{children}</a>;
  return <Link to={to as "/"} className={className}>{children}</Link>;
}

export function BookSection() {
  const c = (k: string) => useCmsText("home", k);
  const cover = useCmsSaved("home", "bookCover") || bookCover;
  const [l, r, kicker, title, tagline, fN, fC, eN, eC, b1, b1l, b2, b2l] = [
    c("bookEyebrowLeft"), c("bookEyebrowRight"), c("bookKicker"), c("bookTitle"), c("bookTagline"),
    c("forewordName"), c("forewordCreds"), c("epilogueName"), c("epilogueCreds"),
    c("bookCta1"), c("bookCta1Link"), c("bookCta2"), c("bookCta2Link"),
  ];
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-12">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
          <BlurReveal as="p" className="eyebrow text-muted-foreground">
            {l}
          </BlurReveal>
          <BlurReveal as="p" delay={0.1} className="eyebrow text-muted-foreground">
            {r}
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
          <SlideIn from="left" className="md:col-span-5">
            <motion.div
              whileHover={{ y: -6, rotate: -0.6 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-[3/4] w-full max-w-[460px]"
              style={{
                filter:
                  "drop-shadow(0 30px 40px rgba(15, 27, 61, 0.25)) drop-shadow(0 8px 16px rgba(15, 27, 61, 0.18))",
              }}
            >
              <img
                src={cover}
                alt="Education for Liberty, a monograph by Fazal Ali"
                className="size-full object-contain"
                width={920}
                height={1227}
                loading="lazy"
              />
            </motion.div>
          </SlideIn>

          <div className="md:col-span-7">
            <BlurReveal as="p" className="eyebrow text-muted-foreground">
              {kicker}
            </BlurReveal>
            <BlurReveal
              as="h2"
              delay={0.08}
              className="mt-4 font-display text-[clamp(2.5rem,12vw,4.5rem)] leading-[0.92] tracking-[-0.03em]"
            >
              <Rich text={title} accent="" />
            </BlurReveal>

            <BlurReveal
              delay={0.18}
              className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg"
            >
              {tagline}
            </BlurReveal>

            <BlurReveal delay={0.26} className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="border-l-2 pl-4" style={{ borderColor: "oklch(0.55 0.10 235)" }}>
                <p className="eyebrow text-muted-foreground">Foreword</p>
                <p className="mt-2 font-display text-lg leading-snug">{fN}</p>
                <p className="text-xs text-muted-foreground">
                  {fC}
                </p>
              </div>
              <div className="border-l-2 pl-4" style={{ borderColor: "oklch(0.55 0.10 235)" }}>
                <p className="eyebrow text-muted-foreground">Epilogue</p>
                <p className="mt-2 font-display text-lg leading-snug">
                  {eN}
                </p>
                <p className="text-xs text-muted-foreground">{eC}</p>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.34} className="mt-10 flex flex-wrap gap-3">
              <CmsLink to={b1l} className="group btn-cta btn-primary">
                {b1}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </CmsLink>
              <CmsLink to={b2l} className="btn-cta btn-on-light">
                {b2}
              </CmsLink>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
