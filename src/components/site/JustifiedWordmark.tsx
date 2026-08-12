/**
 * Edge-to-edge wordmark, uses SVG textLength to force the text to span
 * exactly the container width without cropping or letter-spacing hacks.
 */
export function JustifiedWordmark({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full"
        role="img"
        aria-label={text}
      >
        <text
          x="500"
          y="160"
          textAnchor="middle"
          textLength="990"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="Bodoni Moda, Times New Roman, serif"
          fontWeight="400"
          fontSize="190"
          fill="currentColor"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
