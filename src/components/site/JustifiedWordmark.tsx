/**
 * Edge-to-edge wordmark that always perfectly spans the container width.
 * SVG-based — scales fluidly, no JS measurement, no letter-spacing hacks.
 */
export function JustifiedWordmark({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
        className="block w-full"
        aria-label={text}
      >
        <text
          x="500"
          y="160"
          textAnchor="middle"
          fontFamily="Bodoni Moda, Times New Roman, serif"
          fontWeight="400"
          fontSize="220"
          letterSpacing="2"
          fill="currentColor"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
