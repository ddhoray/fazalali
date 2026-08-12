import { Link } from "@tanstack/react-router";
import { HoverImage } from "./HoverImage";

export interface FloatingItem {
 eyebrow: string;
 title: string;
 year: string;
 image: string;
 to: string;
}

export function FloatingImageList({ items }: { items: FloatingItem[] }) {
 return (
    <div className="mx-auto max-w-[1700px] divide-y divide-current/15 border-y border-current/15 px-5 sm:px-8">
      {items.map((item, i) => (
        <HoverImage key={item.title} src={item.image} alt={item.title}>
          <Link
 to={item.to as never}
 className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-6 py-10 md:py-16"
          >
            <span className="nav-link opacity-50">{`0${i + 1}`}</span>
            <h3 className="font-display text-[10vw] leading-[0.95] tracking-[-0.025em] transition-transform duration-700 ease-out group-hover:translate-x-3 md:text-[6.5vw]">
              {item.title}
              <span className="">.</span>
            </h3>
            <span className="nav-link hidden text-right opacity-60 md:inline">
              {item.eyebrow} · {item.year}
            </span>
          </Link>
          {/* Mobile inline image */}
          <Link to={item.to as never} className="block pb-10 md:hidden">
            <img
 src={item.image}
 alt={item.title}
 className="aspect-[5/4] w-full object-cover grayscale"
 loading="lazy"
            />
          </Link>
        </HoverImage>
      ))}
    </div>
  );
}
