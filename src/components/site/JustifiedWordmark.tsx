/**
 * Edge-to-edge wordmark — uses SVG textLength to force the text to span
 * exactly the container width without cropping or letter-spacing hacks.
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
        viewBox="0 0 1000 180"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: "clamp(60px, 14vw, 220px)" }}
        aria-label={text}
      >
        <text
          x="500"
          y="148"
          textAnchor="middle"
          textLength="980"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="Bodoni Moda, Times New Roman, serif"
          fontWeight="400"
          fontSize="180"
          fill="currentColor"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
