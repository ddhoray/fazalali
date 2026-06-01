import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  strong?: boolean;
}

/**
 * Minimal editorial panel. Sharp edges, hairline border.
 */
export const GlassPanel = forwardRef<HTMLDivElement, Props>(
  ({ className, bordered = true, strong: _strong, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card",
          bordered && "border hairline",
          className,
        )}
        {...rest}
      />
    );
  },
);
GlassPanel.displayName = "GlassPanel";
