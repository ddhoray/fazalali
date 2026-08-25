import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Crossfades through a set of images on a timer ("set of rotation").
 */
export function RotatingImage({
  images,
  alt = "",
  interval = 4500,
  className = "",
}: {
  images: string[];
  alt?: string;
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % images.length), interval);
    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden bg-foreground/5 ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={images[i]}
          src={images[i]}
          alt={alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 z-10 flex gap-2">
        {images.map((src, n) => (
          <button
            key={src}
            type="button"
            aria-label={`Show image ${n + 1}`}
            onClick={() => setI(n)}
            className={`h-px w-8 transition-all duration-500 ${
              n === i ? "bg-background" : "bg-background/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
