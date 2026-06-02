import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurReveal, SlideIn } from "@/components/site/BlurReveal";
import bookCoverAsset from "@/assets/book-education-for-liberty-cover.png.asset.json";
const bookCover = bookCoverAsset.url;

/**
 * Dedicated book section — appears on the home page above the journal block.
 * Cool slate background, book cover on the left, copy + credits on the right.
 */
export function BookSection() {
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-12">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-5">
          <BlurReveal as="p" className="eyebrow text-muted-foreground">
            The Monograph · 2026
          </BlurReveal>
          <BlurReveal as="p" delay={0.1} className="eyebrow text-muted-foreground">
            Foreword · Epilogue
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
                src={bookCover}
                alt="Education for Liberty — a monograph by Fazal Ali"
                className="size-full object-contain"
                width={920}
                height={1227}
                loading="lazy"
              />
            </motion.div>
          </SlideIn>

          <div className="md:col-span-7">
            <BlurReveal as="p" className="eyebrow text-muted-foreground">
              A Monograph · FIA
            </BlurReveal>
            <BlurReveal
              as="h2"
              delay={0.08}
              className="mt-4 font-display text-[12vw] leading-[0.92] tracking-[-0.03em] sm:text-6xl md:text-7xl"
            >
              Education
              <br />
              <span className="italic">for Liberty.</span>
            </BlurReveal>

            <BlurReveal
              delay={0.18}
              className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg"
            >
              A small book about what a child needs to learn so that the next
              machine becomes a freedom, not a fence. Written from Trinidad,
              read against the global conversation on AI and the future of the
              human curriculum.
            </BlurReveal>

            <BlurReveal delay={0.26} className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="border-l-2 pl-4" style={{ borderColor: "oklch(0.55 0.10 235)" }}>
                <p className="eyebrow text-muted-foreground">Foreword</p>
                <p className="mt-2 font-display text-lg italic leading-snug">
                  Sir George Alleyne
                </p>
                <p className="text-xs text-muted-foreground">
                  M.D., F.R.C.P., F.A.C.P. (Hon), DSc (Hon)
                </p>
              </div>
              <div className="border-l-2 pl-4" style={{ borderColor: "oklch(0.55 0.10 235)" }}>
                <p className="eyebrow text-muted-foreground">Epilogue</p>
                <p className="mt-2 font-display text-lg italic leading-snug">
                  Archbishop Joseph Everard Harris
                </p>
                <p className="text-xs text-muted-foreground">C.S.Sp.</p>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.34} className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/education-for-liberty"
                className="group inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm text-background transition-opacity hover:opacity-90"
              >
                Read the monograph
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm transition-colors hover:bg-foreground/5"
              >
                Request a copy
              </Link>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
