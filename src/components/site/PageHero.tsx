import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  standfirst?: ReactNode;
  meta?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
  /** Optional right-side image (desktop) / soft backdrop (mobile). */
  image?: string;
  imageAlt?: string;
}

/**
 * Full-bleed black editorial hero band. Sets data-nav="dark" so the
 * fixed nav flips to light-on-dark over it.
 */
export function PageHero({
  eyebrow,
  title,
  standfirst,
  meta,
  align = "left",
  className,
  children,
  image,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section
      data-nav="dark"
      className={cn(
        "section-invert relative isolate w-full overflow-hidden",
        className,
      )}
    >
      {/* Mobile backdrop image (fades into black) */}
      {image && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 md:hidden"
        >
          <img
            src={image}
            alt=""
            className="size-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>
      )}

      {/* faint vertical hairlines for editorial texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "12.5% 100%",
        }}
      />
      <div
        className={cn(
          "relative mx-auto grid max-w-[1700px] items-end gap-12 px-5 pb-20 pt-40 sm:px-8 sm:pb-28 sm:pt-48",
          image ? "md:grid-cols-[1.2fr_1fr] md:gap-16" : "md:grid-cols-1",
          align === "center" && !image && "text-center",
        )}
      >
        <div className="min-w-0">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-white/60"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className={cn(
              "mt-6 font-display leading-[0.95] text-balance text-5xl sm:text-7xl",
              image ? "md:text-[6.5rem]" : "md:text-[8.5rem]",
            )}
          >
            {title}
          </motion.h1>
          {standfirst && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className={cn(
                "mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl",
                align === "center" && !image && "mx-auto",
              )}
            >
              {standfirst}
            </motion.div>
          )}
          {meta && (
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.22em] text-white/55">
              {meta}
            </div>
          )}
          {children}
        </div>

        {/* Desktop side image */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="relative hidden aspect-[4/5] w-full overflow-hidden border border-white/15 md:block"
          >
            <img
              src={image}
              alt={imageAlt}
              className="size-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
