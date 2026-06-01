import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export interface BentoItem {
  eyebrow: string;
  title: string;
  body: string;
  to: string;
  span?: string; // tailwind grid span classes
}

/**
 * A bento grid whose tiles scale up as the section scrolls into view.
 * Tiles start at ~88% scale and settle at 100% when the section is centered.
 */
export function ScrollGrowBento({ items }: { items: BentoItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.04]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.4, 1, 1, 0.7]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
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
        "glass group relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-7 transition-transform duration-500 hover:-translate-y-1",
        item.span ?? "lg:col-span-2",
      )}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {item.eyebrow}
      </span>

      <div className="mt-10">
        <h3 className="font-display text-3xl leading-[1.05] text-balance md:text-4xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md text-sm text-muted-foreground text-pretty">
          {item.body}
        </p>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm">
        <span>Read</span>
        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <Glow />
    </Link>
  );
}

function Glow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-px -z-10 rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(20rem 12rem at 30% 0%, oklch(0.9 0.05 60 / 0.55), transparent 70%)",
      }}
    />
  );
}

export function BentoSlot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass rounded-[2rem] p-7", className)}>{children}</div>
  );
}
