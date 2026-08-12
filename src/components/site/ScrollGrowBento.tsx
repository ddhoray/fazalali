import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export interface BentoItem {
 eyebrow: string;
 title: string;
 body: string;
 to: string;
 span?: string;
}

/**
 * Editorial grid. Cells start tight and scale up slightly as the section
 * scrolls into view. Sharp edges, hairline borders.
 */
export function ScrollGrowBento({ items }: { items: BentoItem[] }) {
 const ref = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: ref,
 offset: ["start end", "end start"],
  });
 const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.02]);

 return (
    <motion.div
 ref={ref}
 style={{ scale }}
 className="grid grid-cols-1 gap-px bg-foreground/15 sm:grid-cols-2 lg:grid-cols-6"
    >
      {items.map((item) => (
        <Tile key={item.title} item={item} />
      ))}
    </motion.div>
  );
}

function Tile({ item }: { item: BentoItem }) {
 return (
    <Link
 to={item.to}
 className={cn(
        "group relative flex min-h-[260px] flex-col justify-between bg-background p-8 transition-colors duration-500 hover:bg-muted md:min-h-[320px]",
 item.span ?? "lg:col-span-2",
      )}
    >
      <span className="eyebrow text-muted-foreground">{item.eyebrow}</span>

      <div className="mt-12">
        <h3 className="font-display text-3xl leading-[1.02] text-balance md:text-5xl">
          {item.title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          {item.body}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="nav-link">Discover</span>
        <span className="block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-20" />
      </div>
    </Link>
  );
}
