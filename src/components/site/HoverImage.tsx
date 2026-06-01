import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

/**
 * Cursor-following image preview (desktop only).
 * The image is rendered in a fixed-position portal-like layer
 * so it follows the actual cursor across the viewport.
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
  const [visible, setVisible] = useState(false);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const x = useSpring(mx, { stiffness: 350, damping: 28, mass: 0.4 });
  const y = useSpring(my, { stiffness: 350, damping: 28, mass: 0.4 });

  function setFromEvent(e: React.PointerEvent) {
    mx.set(e.clientX);
    my.set(e.clientY);
  }

  return (
    <div
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        // Jump (no spring) to cursor before showing to avoid a flash from 0,0
        mx.jump(e.clientX);
        my.jump(e.clientY);
        setVisible(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        setVisible(false);
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        setFromEvent(e);
      }}
      className={`relative ${className}`}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[320px] w-[240px] overflow-hidden shadow-2xl md:block"
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
