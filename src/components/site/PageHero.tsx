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
}: PageHeroProps) {
  return (
    <section
      data-nav="dark"
      className={cn(
        "section-invert relative isolate w-full overflow-hidden",
        className,
      )}
    >
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
          "relative mx-auto max-w-[1700px] px-5 pb-20 pt-40 sm:px-8 sm:pb-28 sm:pt-48",
          align === "center" && "text-center",
        )}
      >
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
          className="mt-6 font-display text-5xl leading-[0.95] text-balance sm:text-7xl md:text-[8.5rem]"
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
              align === "center" && "mx-auto",
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
    </section>
  );
}
