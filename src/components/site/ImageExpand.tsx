import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * fluid.glass-style image expansion. Image starts inset with rounded
 * corners; as the section scrolls through the viewport, width grows
 * toward full bleed and radius collapses to 0. Optional overlay content
 * sits above the image.
 */
export function ImageExpand({
 src,
 alt = "",
 height = "h-[140vh]",
 children,
 caption,
}: {
 src: string;
 alt?: string;
 height?: string;
 children?: ReactNode;
 caption?: string;
}) {
 const ref = useRef<HTMLDivElement>(null);
 const reduce = useReducedMotion();
 const { scrollYProgress } = useScroll({
 target: ref,
 offset: ["start end", "end start"],
  });

  // 0 → entering bottom of viewport; 0.5 → centered; 1 → leaving top.
  // Expansion happens from ~0.05 to 0.45, then it stays full-bleed.
 const width = useTransform(scrollYProgress, [0.05, 0.45, 1], ["72%", "100%", "100%"]);
 const radius = useTransform(scrollYProgress, [0.05, 0.45, 1], [28, 0, 0]);
 const imgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.0]);
 const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

 return (
    <section ref={ref} className={`relative w-full ${height} bg-background`}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
 style={
 reduce
              ? undefined
              : { width, borderRadius: radius }
          }
 className="relative h-[88vh] overflow-hidden bg-foreground/5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
        >
          <motion.img
 src={src}
 alt={alt}
 style={reduce ? undefined : { scale: imgScale, y: imgY }}
 className="absolute inset-0 size-full object-cover will-change-transform"
 loading="lazy"
          />
          {/* Subtle vignette so any overlay text stays readable */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
          {children && (
            <div className="text-on-image relative z-10 flex h-full w-full items-end p-8 sm:p-14">
              {children}
            </div>
          )}
        </motion.div>
        {caption && (
          <span className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/70">
            {caption}
          </span>
        )}
      </div>
    </section>
  );
}
