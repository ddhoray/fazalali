import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Blurry → clear text reveal animation. Triggers on viewport entry.
 * Used for headlines and editorial text.
 */
export function BlurReveal({
 children,
 delay = 0,
 className = "",
 as: As = "div",
 y = 14,
}: {
 children: ReactNode;
 delay?: number;
 className?: string;
 as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
 y?: number;
}) {
 const reduce = useReducedMotion();
 const MotionTag = motion[As as keyof typeof motion] as typeof motion.div;
 return (
    <MotionTag
 initial={reduce ? false : { opacity: 0, y, filter: "blur(14px)" }}
 whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
 viewport={{ once: true, margin: "-12% 0px" }}
 transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
 className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Card / image slide-in from below with a soft blur lift.
 */
export function SlideIn({
 children,
 delay = 0,
 className = "",
 from = "bottom",
}: {
 children: ReactNode;
 delay?: number;
 className?: string;
 from?: "bottom" | "left" | "right";
}) {
 const reduce = useReducedMotion();
 const initial =
 from === "left"
      ? { opacity: 0, x: -60, filter: "blur(10px)" }
      : from === "right"
        ? { opacity: 0, x: 60, filter: "blur(10px)" }
        : { opacity: 0, y: 64, filter: "blur(10px)" };
 return (
    <motion.div
 initial={reduce ? false : initial}
 whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
 viewport={{ once: true, margin: "-8% 0px" }}
 transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
 className={className}
    >
      {children}
    </motion.div>
  );
}
