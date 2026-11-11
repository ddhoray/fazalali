import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export type VirtualGalleryItem = {
  src: string;
  alt: string;
};

const layouts = [
  { frame: "col-span-2 md:col-span-7", ratio: "aspect-[4/3]" },
  { frame: "col-span-1 md:col-span-5 md:mt-28", ratio: "aspect-[4/5]" },
  { frame: "col-span-1 md:col-span-5 md:-mt-16", ratio: "aspect-square" },
  { frame: "col-span-2 md:col-span-7 md:mt-20", ratio: "aspect-[16/11]" },
  { frame: "col-span-2 md:col-span-8", ratio: "aspect-[16/10]" },
  { frame: "col-span-1 md:col-span-4 md:mt-32", ratio: "aspect-[3/4]" },
  { frame: "col-span-1 md:col-span-4 md:-mt-10", ratio: "aspect-square" },
  { frame: "col-span-2 md:col-span-8 md:mt-16", ratio: "aspect-[4/3]" },
  { frame: "col-span-1 md:col-span-5 md:-mt-12", ratio: "aspect-square" },
  { frame: "col-span-1 md:col-span-7 md:mt-24", ratio: "aspect-[16/10]" },
];

function ExpandingWork({ item, index }: { item: VirtualGalleryItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const frameScale = useTransform(scrollYProgress, [0, 0.38, 1], [0.86, 1, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.38, 1],
    ["inset(10% 8% 10% 8%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.22, 1.04, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const layout = layouts[index % layouts.length];

  return (
    <figure ref={ref} className={`min-w-0 ${layout.frame}`}>
      <motion.div
        style={reduceMotion ? undefined : { scale: frameScale, clipPath }}
        className={`relative w-full overflow-hidden bg-muted will-change-transform ${layout.ratio}`}
      >
        <motion.img
          src={item.src}
          alt={item.alt}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
          className="absolute inset-0 size-full object-cover will-change-transform"
        />
      </motion.div>
    </figure>
  );
}

export function VirtualGallery({ items }: { items: VirtualGalleryItem[] }) {
  return (
    <section aria-label="Virtual gallery" data-auto-reveal="off" className="border-t hairline">
      <div className="mx-auto max-w-[1800px] px-3 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
        <div className="grid grid-flow-dense grid-cols-2 items-start gap-3 sm:gap-5 md:grid-cols-12 lg:gap-8">
          {items.map((item, index) => (
            <ExpandingWork key={`${item.src}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
