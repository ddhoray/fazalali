import { motion, useReducedMotion } from "motion/react";

/**
 * Reveals an array of lines sequentially, blurry → clear with a soft rise.
 * Uses the same proven pattern as BlurReveal so it always renders even if
 * the IntersectionObserver fires late.
 */
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.14,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{
            duration: 1.0,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={lineClassName}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Reveals children word-by-word in sequence.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={reduce ? false : { y: "110%", filter: "blur(10px)", opacity: 0 }}
            whileInView={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
