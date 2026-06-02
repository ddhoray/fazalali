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
  /** Right-side colored image. */
  image?: string;
  imageAlt?: string;
  /** How the image should fit. Use 'contain' for book covers to avoid cropping. */
  imageFit?: "cover" | "contain";
}

/**
 * Light editorial hero. Cream background, colored image on the right,
 * vertically centered text on the left. Nav stays in its default light mode.
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
  imageFit = "cover",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate w-full overflow-hidden bg-[oklch(0.985_0.005_85)]",
        className,
      )}
    >
      {/* faint vertical hairlines for editorial texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "12.5% 100%",
        }}
      />

      <div
        className={cn(
          "relative mx-auto grid max-w-[1500px] items-center gap-12 px-5 pb-12 pt-24 sm:px-8 sm:pb-12 sm:pt-24 md:gap-16 md:py-10",
          image ? "md:grid-cols-2" : "md:grid-cols-1",
          align === "center" && !image && "text-center",
        )}
      >
        {/* Text column */}
        <div className="min-w-0 text-foreground">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-muted-foreground"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className={cn(
              "mt-5 font-display leading-[0.95] text-balance text-5xl sm:text-6xl",
              image ? "md:text-7xl lg:text-[5.5rem]" : "md:text-[7rem] lg:text-[8.5rem]",
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
                "mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg",
                align === "center" && !image && "mx-auto",
              )}
            >
              {standfirst}
            </motion.div>
          )}
          {meta && (
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t hairline pt-5 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {meta}
            </div>
          )}
          {children}
        </div>

        {/* Image column */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.1 }}
            className={cn(
              "relative aspect-[4/5] w-full overflow-hidden",
              imageFit === "contain"
                ? "flex items-center justify-center bg-[oklch(0.92_0.01_240)] p-6 sm:p-8"
                : "border border-foreground/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]",
            )}
          >
            <img
              src={image}
              alt={imageAlt}
              className={cn(
                "size-full",
                imageFit === "contain" ? "object-contain" : "object-cover",
              )}
              loading="eager"
              width={1152}
              height={1440}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
