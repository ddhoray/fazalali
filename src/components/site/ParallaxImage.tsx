import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Parallax background image — image slides slower than the section as
 * the page scrolls, creating depth.
 */
export function ParallaxImage({
  src,
  alt = "",
  className = "",
  strength = 18,
  overlay = true,
  children,
}: {
  src: string;
  alt?: string;
  className?: string;
  strength?: number;
  overlay?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 size-full scale-[1.25] object-cover"
        loading="lazy"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      )}
      {children && <div className="relative z-10 size-full">{children}</div>}
    </div>
  );
}
