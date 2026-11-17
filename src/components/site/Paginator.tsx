import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function pages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const s = Math.max(2, current - 1);
  const e = Math.min(total - 1, current + 1);
  if (s > 2) out.push("…");
  for (let i = s; i <= e; i++) out.push(i);
  if (e < total - 1) out.push("…");
  out.push(total);
  return out;
}

export function Paginator({
  page,
  total,
  onChange,
  className,
}: {
  page: number;
  total: number;
  onChange: (p: number) => void;
  className?: string;
}) {
  if (total <= 1) return null;
  const btn = "inline-flex min-h-11 min-w-11 items-center justify-center text-sm transition-colors";
  return (
    <nav aria-label="Pagination" className={cn("flex flex-wrap items-center justify-center gap-1", className)}>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={cn(btn, "gap-2 px-4 uppercase tracking-[0.18em] text-[11px] disabled:opacity-30 hover:text-omeros")}
      >
        <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Newer</span>
      </button>
      {pages(page, total).map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className={cn(btn, "text-muted-foreground")}>…</span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={cn(
              btn,
              "border font-display tabular-nums",
              p === page
                ? "border-foreground bg-foreground text-background"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            {String(p).padStart(2, "0")}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={page >= total}
        onClick={() => onChange(page + 1)}
        className={cn(btn, "gap-2 px-4 uppercase tracking-[0.18em] text-[11px] disabled:opacity-30 hover:text-omeros")}
      >
        <span className="hidden sm:inline">Older</span> <ArrowRight className="size-4" />
      </button>
    </nav>
  );
}
