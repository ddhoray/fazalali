import { useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

/**
 * Cursor-following image preview (desktop only).
 * Images render in full color for a "live" editorial feel.
 */
export function HoverImage({
  src,
  alt,
  children,
  className = "",
}: {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setVisible(true)}
      onPointerLeave={() => setVisible(false)}
      onPointerMove={onMove}
      className={`relative ${className}`}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ x, y, translateX: "-50%", translateY: "-110%" }}
            className="pointer-events-none absolute left-0 top-0 z-40 hidden h-[300px] w-[230px] overflow-hidden shadow-2xl md:block"
          >
            <img
              src={src}
              alt={alt}
              className="size-full object-cover"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
