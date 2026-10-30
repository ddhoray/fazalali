import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Rich, useCmsSaved } from "@/components/site/CmsExtras";

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
  /** Optional muted looping video shown instead of the image. */
  video?: string;
  /** Optional sizing overrides for the image or video frame. */
  mediaClassName?: string;
  mediaAspect?: "portrait" | "landscape";
  /** Page key in the admin panel; saved banner fields override the props. */
  cmsKey?: string;
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
  video,
  mediaClassName,
  mediaAspect = "portrait",
  cmsKey,
}: PageHeroProps) {
  const k = cmsKey ?? "__none";
  const sEyebrow = useCmsSaved(k, "heroEyebrow");
  const sTitle = useCmsSaved(k, "heroTitle");
  const sIntro = useCmsSaved(k, "heroIntro");
  const sImage = useCmsSaved(k, "heroImage");
  const sVideo = useCmsSaved(k, "heroVideo");
  if (sEyebrow) eyebrow = sEyebrow;
  if (sTitle) title = <Rich text={sTitle} />;
  if (sIntro) standfirst = <Rich text={sIntro} />;
  if (sImage) {
    image = sImage;
    if (!sVideo) video = undefined;
  }
  if (sVideo) video = sVideo;
  return (
    <section className={cn("relative isolate w-full overflow-hidden bg-[#f5f3f0]", className)}>
      {/* faint vertical hairlines for editorial texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "12.5% 100%",
        }}
      />

      <div
        className={cn(
          "relative mx-auto grid max-w-[1500px] items-center gap-12 px-5 pb-12 pt-24 sm:px-8 sm:pb-12 sm:pt-24 md:gap-16 md:py-10",
          image || video ? "md:grid-cols-2" : "md:grid-cols-1",
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
              "mt-5 font-display leading-[1.02] text-balance text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem]",
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
        {(image || video) && (
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.1 }}
            className={cn(
              "relative w-full overflow-hidden",
              mediaAspect === "landscape" ? "aspect-[5/4]" : "aspect-[4/5]",
              imageFit === "contain"
                ? "flex items-center justify-center bg-[#e9e6e1] p-6 sm:p-8"
                : "border border-foreground/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]",
              mediaClassName,
            )}
          >
            {video ? (
              <video
                src={video}
                poster={image}
                aria-label={imageAlt}
                className="size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
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
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
