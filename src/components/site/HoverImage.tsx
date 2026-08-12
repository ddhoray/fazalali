import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

/**
 * Cursor-following image preview (desktop only).
 * Optional: shows a circular progress ring while hovered and fires
 * `onHoldComplete` after `holdMs`. Useful for "hover to open" interactions.
 */
export function HoverImage({
 src,
 alt,
 children,
 className = "",
 holdMs,
 onHoldComplete,
 imageless = false,
}: {
 src: string;
 alt: string;
 children: ReactNode;
 className?: string;
 holdMs?: number;
 onHoldComplete?: () => void;
  /** When true, hide the floating image preview and show only the circular loader at the cursor. */
 imageless?: boolean;
}) {

 const [visible, setVisible] = useState(false);
 const [mounted, setMounted] = useState(false);
 const [progress, setProgress] = useState(0); // 0 → 1
 const rafRef = useRef<number | null>(null);
 const startRef = useRef<number | null>(null);
 const firedRef = useRef(false);

 const mx = useMotionValue(-9999);
 const my = useMotionValue(-9999);
 const x = useSpring(mx, { stiffness: 350, damping: 28, mass: 0.4 });
 const y = useSpring(my, { stiffness: 350, damping: 28, mass: 0.4 });

 useEffect(() => {
 setMounted(true);
  }, []);

  // Drive the circular progress while hovered.
 useEffect(() => {
 if (!visible || !holdMs || !onHoldComplete) return;
 firedRef.current = false;
 startRef.current = performance.now();
 const tick = (t: number) => {
 const start = startRef.current ?? t;
 const p = Math.min(1, (t - start) / holdMs);
 setProgress(p);
 if (p >= 1) {
 if (!firedRef.current) {
 firedRef.current = true;
 onHoldComplete();
        }
 return;
      }
 rafRef.current = requestAnimationFrame(tick);
    };
 rafRef.current = requestAnimationFrame(tick);
 return () => {
 if (rafRef.current) cancelAnimationFrame(rafRef.current);
 setProgress(0);
    };
  }, [visible, holdMs, onHoldComplete]);

 function setFromEvent(e: React.PointerEvent) {
 mx.set(e.clientX);
 my.set(e.clientY);
  }

 const R = 26;
 const C = 2 * Math.PI * R;

 const preview = (
    <AnimatePresence>
      {visible && (
        <motion.div
 initial={{ opacity: 0, scale: 0.94 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.96 }}
 transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
 style={{ x, y, translateX: "-50%", translateY: "-50%" }}
 className={
 imageless
              ? "pointer-events-none fixed left-0 top-0 z-[100] hidden size-[96px] md:block"
              : "pointer-events-none fixed left-0 top-0 z-[100] hidden h-[380px] w-[280px] overflow-hidden shadow-2xl md:block"
          }
        >
          {!imageless && (
            <img
 src={src}
 alt={alt}
 className="size-full object-cover"
 loading="lazy"
            />
          )}

          {holdMs && onHoldComplete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="72" height="72" viewBox="0 0 72 72" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                <circle
 cx="36"
 cy="36"
 r={R}
 fill="none"
 stroke="rgba(255,255,255,0.25)"
 strokeWidth="2"
                />
                <circle
 cx="36"
 cy="36"
 r={R}
 fill="none"
 stroke="white"
 strokeWidth="2"
 strokeLinecap="round"
 strokeDasharray={C}
 strokeDashoffset={C * (1 - progress)}
 transform="rotate(-90 36 36)"
 style={{ transition: "stroke-dashoffset 80ms linear" }}
                />
                <text
 x="36"
 y="40"
 textAnchor="middle"
 fill="white"
 fontSize="10"
 fontFamily="ui-sans-serif, system-ui"
 letterSpacing="0.15em"
                >
                  OPEN
                </text>
              </svg>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

 return (
    <div
 onPointerEnter={(e) => {
 if (e.pointerType !== "mouse") return;
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
      {mounted && createPortal(preview, document.body)}
    </div>
  );
}
