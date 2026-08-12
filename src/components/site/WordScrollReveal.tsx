import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";

/**
 * Reveals text word-by-word as the user scrolls through the element.
 * Words fade from low-opacity to full opacity in sequence, driven by scroll progress.
 */
export function WordScrollReveal({
 text,
 className = "",
 wordClassName = "",
}: {
 text: string;
 className?: string;
 wordClassName?: string;
}) {
 const reduce = useReducedMotion();
 const ref = useRef<HTMLParagraphElement>(null);
 const { scrollYProgress } = useScroll({
 target: ref,
    // Start when the element enters from the bottom, finish before it exits the top
 offset: ["start 0.85", "end 0.4"],
  });

 const words = text.split(/\s+/).filter(Boolean);

 return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
 const start = i / words.length;
 const end = start + 1 / words.length;
 return (
          <Word
 key={i}
 progress={scrollYProgress}
 range={[start, end]}
 reduce={!!reduce}
 className={wordClassName}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </Word>

        );
      })}
    </p>
  );
}

function Word({
 children,
 progress,
 range,
 reduce,
 className = "",
}: {
 children: React.ReactNode;
 progress: MotionValue<number>;
 range: [number, number];
 reduce: boolean;
 className?: string;
}) {
 const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.12, 1]);
 const blur = useTransform(progress, range, reduce ? ["0px", "0px"] : ["6px", "0px"]);
 const filter = useTransform(blur, (b) => `blur(${b})`);

 return (
    <motion.span style={{ opacity, filter }} className={`inline ${className}`}>
      {children}
    </motion.span>
  );
}
