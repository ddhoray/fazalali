/**
 * Continuous auto-scrolling marquee of equal-sized image tiles.
 */
export function ImageMarquee({
  images,
  alt = "",
  speed = 60,
  className = "",
}: {
  images: string[];
  alt?: string;
  /** seconds for one full loop */
  speed?: number;
  className?: string;
}) {
  const track = [...images, ...images];

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-4 marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((src, i) => (
          <figure
            key={`${src}-${i}`}
            className="relative aspect-square w-40 shrink-0 overflow-hidden bg-foreground/5 sm:w-52 lg:w-60"
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
