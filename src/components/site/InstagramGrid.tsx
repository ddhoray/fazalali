import { posts } from "@/content/gallery";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

interface InstagramGridProps {
  limit?: number;
  showHeader?: boolean;
}

export function InstagramGrid({ limit, showHeader = true }: InstagramGridProps) {
  const items = limit ? posts.slice(0, limit) : posts;
  return (
    <section className="mx-auto max-w-[1700px] px-5 py-12 sm:px-8 sm:py-14">
      {showHeader && (
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-muted-foreground">Elsewhere</p>
              <h2 className="mt-4 font-display text-4xl md:text-7xl">
                <em className="italic">@thefazalali</em>
              </h2>
              <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
                Field notes, drone footage, carnival, and the occasional book.
              </p>
            </div>
            <a
              href="https://www.instagram.com/thefazalali/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm uppercase tracking-[0.2em]"
            >
              <Instagram className="size-4" /> Follow on Instagram
            </a>
          </div>
        </Reveal>
      )}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((p, i) => (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-square overflow-hidden bg-foreground/5"
          >
            <img
              src={p.image}
              alt={p.caption}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs leading-tight">{p.caption}</p>
              {p.tags && (
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {p.tags}
                </p>
              )}
            </div>
            <div className="absolute right-2 top-2 inline-flex size-7 items-center justify-center bg-white/0 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <ArrowUpRight className="size-4" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
