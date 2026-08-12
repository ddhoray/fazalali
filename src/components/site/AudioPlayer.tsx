import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
 src: string;
 className?: string;
 variant?: "dark" | "light";
}

function fmt(s: number) {
 if (!isFinite(s) || s < 0) s = 0;
 const m = Math.floor(s / 60);
 const r = Math.floor(s % 60);
 return `${m}:${r.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ src, className, variant = "light" }: AudioPlayerProps) {
 const ref = useRef<HTMLAudioElement>(null);
 const [playing, setPlaying] = useState(false);
 const [current, setCurrent] = useState(0);
 const [duration, setDuration] = useState(0);

 useEffect(() => {
 const a = ref.current;
 if (!a) return;
 const onTime = () => setCurrent(a.currentTime);
 const onMeta = () => setDuration(a.duration || 0);
 const onEnd = () => setPlaying(false);
 a.addEventListener("timeupdate", onTime);
 a.addEventListener("loadedmetadata", onMeta);
 a.addEventListener("ended", onEnd);
 return () => {
 a.removeEventListener("timeupdate", onTime);
 a.removeEventListener("loadedmetadata", onMeta);
 a.removeEventListener("ended", onEnd);
    };
  }, []);

 const toggle = () => {
 const a = ref.current;
 if (!a) return;
 if (playing) {
 a.pause();
 setPlaying(false);
    } else {
 a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

 const seek = (e: React.MouseEvent<HTMLDivElement>) => {
 const a = ref.current;
 if (!a || !duration) return;
 const rect = e.currentTarget.getBoundingClientRect();
 const pct = (e.clientX, rect.left) / rect.width;
 a.currentTime = pct * duration;
  };

 const isDark = variant === "dark";
 const fg = isDark ? "text-white" : "text-foreground";
 const bgBar = isDark ? "bg-white/15" : "bg-foreground/15";
 const fillBar = isDark ? "bg-white" : "bg-foreground";
 const btn = isDark
    ? "bg-white text-black hover:bg-white/90"
    : "bg-foreground text-background hover:opacity-90";

 return (
    <div className={cn("flex items-center gap-5", fg, className)}>
      <audio ref={ref} src={src} preload="metadata" crossOrigin="anonymous" />
      <button
 type="button"
 onClick={toggle}
 aria-label={playing ? "Pause" : "Play"}
 className={cn(
          "inline-flex size-14 shrink-0 items-center justify-center transition-opacity",
 btn,
        )}
      >
        {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div
 onClick={seek}
 className={cn("relative h-1 w-full cursor-pointer", bgBar)}
        >
          <div
 className={cn("absolute inset-y-0 left-0", fillBar)}
 style={{ width: duration ? `${(current / duration) * 100}%` : "0%" }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>
    </div>
  );
}
