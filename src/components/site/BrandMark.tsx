import { Link } from "@tanstack/react-router";

/**
 * Editorial monogram mark. Uses `currentColor` so it inverts with the
 * surrounding text color (white on dark hero, black on light sections).
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Fazal Ali, Home"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 64 48"
        className="h-7 w-auto"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden
      >
        {/* F */}
        <path d="M6 42 V8 H26" />
        <path d="M6 24 H22" />
        {/* A, slim serif */}
        <path d="M34 42 L46 8 L58 42" />
        <path d="M38.5 30 H53.5" />
        {/* hairline rule beneath */}
        <path d="M6 46 H58" opacity="0.4" />
      </svg>
      <span className="font-display text-[15px] tracking-[0.02em]">
        Fazal<span className=""> Ali</span>
      </span>
    </Link>
  );
}
