import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Grain } from "./Grain";

export interface FeaturedItem {
  eyebrow: string;
  title: string;
  year: string;
  image: string;
  to: string;
}

export function FeaturedStack({ items }: { items: FeaturedItem[] }) {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <StickyCard key={item.title} item={item} index={i} total={items.length} />
      ))}
    </div>
  );
}

function StickyCard({ item, index, total }: { item: FeaturedItem; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const topOffset = 6 + index * 2;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{
        top: `${topOffset}vh`,
        zIndex: 10 + index,
        marginBottom: index === total - 1 ? 0 : "12vh",
      }}
    >
      <Link
        to={item.to as never}
        className="group relative mx-auto block aspect-[16/10] w-[92vw] max-w-[1500px] overflow-hidden bg-foreground/5"
      >
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <img
            src={item.image}
            alt={item.title}
            className="size-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <Grain />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent z-20" />

        <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 md:p-14">
          <div className="flex items-start justify-between text-background">
            <span className="nav-link">{item.eyebrow}</span>
            <span className="nav-link">{`(0${index + 1})`}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-6 text-background">
              <h3 className="font-display text-5xl leading-[0.95] md:text-8xl">
                {item.title}
                <span className="">.</span>
              </h3>
              <span className="nav-link hidden md:inline">{item.year}</span>
            </div>
            <div className="flex items-center gap-3 text-background">
              <span className="nav-link">View</span>
              <span className="block h-px w-12 bg-background transition-all duration-500 group-hover:w-24" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
