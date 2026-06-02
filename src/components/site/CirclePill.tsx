import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
  invert?: boolean;
} & Pick<ComponentProps<typeof Link>, "to" | "params">;

export function CirclePill({ label, className, invert, to, params }: Props) {
  return (
    <Link
      to={to as never}
      params={params as never}
      className={cn(
        "group inline-flex items-center gap-3 border px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300",
        invert
          ? "border-white/40 text-white hover:bg-white hover:text-black"
          : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background",
        className,
      )}
    >
      <span>{label}</span>
      <span className="relative flex size-6 items-center justify-center overflow-hidden">
        <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3" />
        <ArrowUpRight className="absolute size-3.5 -translate-x-3 translate-y-3 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </Link>
  );
}
