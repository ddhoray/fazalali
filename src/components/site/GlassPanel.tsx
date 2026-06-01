import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  as?: "div" | "section" | "article" | "aside";
}

export const GlassPanel = forwardRef<HTMLDivElement, Props>(
  ({ className, strong, as: Tag = "div", ...rest }, ref) => {
    return (
      <Tag
        ref={ref as never}
        className={cn(
          strong ? "glass-strong" : "glass",
          "rounded-3xl",
          className,
        )}
        {...rest}
      />
    );
  },
);
GlassPanel.displayName = "GlassPanel";
