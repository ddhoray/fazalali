import { useEffect, useRef, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ImageIcon, Loader2, Search, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { adminAiAssist, adminListMedia, adminUploadMedia } from "@/lib/admin/admin.functions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 border-b border-border pb-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div className="min-w-0">
        {eyebrow && <p className="text-[11px] uppercase tracking-[0.24em] text-omeros">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex min-w-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("border border-border bg-card shadow-sm", className)}>{children}</div>;
}

export function AdminButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button className={cn("min-h-10 rounded-none", className)} {...props} />;
}

export function StatCard({ label, value, hint, icon }: { label: string; value: ReactNode; hint?: string; icon?: ReactNode }) {
  return (
    <Panel className="p-5">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        <span className="text-omeros">{icon}</span>
      </div>
      <p className="mt-4 truncate font-display text-3xl tracking-tight sm:text-4xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Panel>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-success/15 text-success",
    scheduled: "bg-omeros-soft text-omeros",
    draft: "bg-muted text-muted-foreground",
    owner: "bg-omeros text-background",
    editor: "bg-omeros-soft text-omeros",
    author: "bg-muted text-foreground",
    viewer: "bg-muted text-muted-foreground",
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]", map[status] ?? "bg-muted")}>
      {status}
    </span>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        {hint && <span className="normal-case tracking-normal">{hint}</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputCls =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-omeros";

export function Empty({ icon, title, body, action }: { icon?: ReactNode; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="text-muted-foreground">{icon}</div>
      <p className="font-display text-xl">{title}</p>
      {body && <p className="max-w-sm text-sm text-muted-foreground">{body}</p>}
      {action}
    </div>
  );
}

export function fmtDateTime(d: string | null | undefined) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(d));
}

export function timeAgo(d: string) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

/** AI suggestions popover. */
export function AiAssist({
  kind,
  title,
  text,
  onPick,
}: {
  kind: "seo_title" | "seo_description" | "excerpt" | "alt" | "tags";
  title: string;
  text: string;
  onPick: (v: string) => void;
}) {
  const ai = useServerFn(adminAiAssist);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  async function run() {
    setBusy(true);
    setItems([]);
    try {
      const r = await ai({ data: { kind, title, text } });
      if (r.error) toast.error(r.error);
      setItems(r.suggestions);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o && !items.length) run();
      }}
    >
      <PopoverTrigger asChild>
        <button type="button" className="inline-flex items-center gap-1 text-[11px] normal-case tracking-normal text-omeros hover:underline">
          <Sparkles className="size-3" /> Suggest
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] p-0 sm:w-96" align="end">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          AI suggestions
          <button type="button" onClick={run} className="normal-case tracking-normal text-omeros">Regenerate</button>
        </div>
        <div className="max-h-80 overflow-auto">
          {busy && (
            <div className="flex items-center gap-2 px-4 py-6 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Thinking…
            </div>
          )}
          {items.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onPick(s);
                setOpen(false);
              }}
              className="block w-full border-b border-border px-4 py-3 text-left text-sm last:border-0 hover:bg-muted"
            >
              {s}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export type MediaRow = { id: string; url: string; filename: string; alt: string; content_type: string; size: number; created_at: string; path: string };

export function useUpload() {
  const upload = useServerFn(adminUploadMedia);
  const qc = useQueryClient();
  return async (files: FileList | File[]) => {
    const out: MediaRow[] = [];
    for (const f of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", f);
      try {
        const row = (await upload({ data: fd })) as MediaRow | null;
        if (row) out.push(row);
      } catch (e) {
        toast.error(`${f.name}: ${(e as Error).message}`);
      }
    }
    if (out.length) toast.success(`${out.length} file${out.length > 1 ? "s" : ""} uploaded`);
    qc.invalidateQueries({ queryKey: ["admin", "media"] });
    return out;
  };
}

/** Video / audio field with library picker, upload and URL paste. */
export function MediaUrlField({ value, onChange, label, kind }: { value: string; onChange: (v: string) => void; label: string; kind: "video" | "audio" }) {
  const [open, setOpen] = useState(false);
  return (
    <Field label={label}>
      <div className="space-y-2">
        {value && (kind === "video" ? <video src={value} muted controls className="max-h-48 w-full bg-black object-contain" /> : <audio src={value} controls className="w-full" />)}
        <input className={inputCls} placeholder={`Leave empty to keep the built-in ${kind}`} value={value} onChange={(e) => onChange(e.target.value)} />
        <div className="flex gap-3 text-xs">
          <button type="button" className="text-omeros hover:underline" onClick={() => setOpen(true)}>Choose or upload {kind}</button>
          {value && <button type="button" className="text-muted-foreground hover:underline" onClick={() => onChange("")}>Use built-in</button>}
        </div>
      </div>
      <MediaPicker kind={kind} open={open} onOpenChange={setOpen} onPick={(m) => onChange(m.url)} />
    </Field>
  );
}

/** Image field with media library picker + direct upload + URL paste. */
export function ImageField({ value, onChange, label = "Image" }: { value: string | null | undefined; onChange: (v: string) => void; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Field label={label}>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden border border-dashed border-border bg-muted/50 hover:border-omeros"
        >
          {value ? <img src={value} alt="" className="size-full object-cover" /> : <ImageIcon className="size-5 text-muted-foreground" />}
        </button>
        <div className="min-w-0 space-y-2">
          <input className={inputCls} placeholder="https://… or pick from library" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
          <div className="flex gap-3 text-xs">
            <button type="button" className="text-omeros hover:underline" onClick={() => setOpen(true)}>Choose from library</button>
            {value && <button type="button" className="text-muted-foreground hover:underline" onClick={() => onChange("")}>Remove</button>}
          </div>
        </div>
      </div>
      <MediaPicker open={open} onOpenChange={setOpen} onPick={(m) => onChange(m.url)} />
    </Field>
  );
}

export function MediaPicker({ open, onOpenChange, onPick, kind = "image" }: { open: boolean; onOpenChange: (o: boolean) => void; onPick: (m: MediaRow) => void; kind?: "image" | "video" | "audio" }) {
  const list = useServerFn(adminListMedia);
  const { data = [], isLoading } = useQuery({ queryKey: ["admin", "media"], queryFn: () => list() as Promise<MediaRow[]>, enabled: open });
  const [q, setQ] = useState("");
  const upload = useUpload();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const items = data.filter((m) => m.content_type.startsWith(`${kind}/`) && (m.filename + m.alt).toLowerCase().includes(q.toLowerCase()));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92svh] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Media library</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input className={cn(inputCls, "pl-9")} placeholder="Search images" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 bg-omeros px-4 text-sm text-background"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Upload
          </button>
          <input
            ref={fileRef}
            type="file"
            accept={`${kind}/*`}
            hidden
            multiple
            onChange={async (e) => {
              if (!e.target.files?.length) return;
              setBusy(true);
              const rows = await upload(e.target.files);
              setBusy(false);
              if (rows[0]) {
                onPick(rows[0]);
                onOpenChange(false);
              }
            }}
          />
        </div>
        <div className="grid max-h-[60vh] grid-cols-3 gap-2 overflow-auto sm:grid-cols-5">
          {isLoading && <p className="col-span-full p-6 text-sm text-muted-foreground">Loading…</p>}
          {!isLoading && !items.length && <p className="col-span-full p-6 text-sm text-muted-foreground">No images yet. Upload one to get started.</p>}
          {items.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                onPick(m);
                onOpenChange(false);
              }}
              className="group relative aspect-square overflow-hidden border border-border hover:border-omeros"
            >
              <img src={m.url} alt={m.alt} className="size-full object-cover" loading="lazy" />
              <span className="absolute inset-x-0 bottom-0 truncate bg-foreground/70 px-2 py-1 text-left text-[10px] text-background opacity-0 group-hover:opacity-100">
                {m.filename}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim().replace(/,$/, "");
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div className={cn(inputCls, "flex flex-wrap items-center gap-1.5 py-2")}>
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 text-xs">
          {t}
          <button type="button" onClick={() => onChange(value.filter((x) => x !== t))}>
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={add}
        placeholder={value.length ? "" : "Add tag, press Enter"}
        className="min-w-24 flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="inline-flex items-center gap-2 text-sm">
      <span className={cn("flex size-4 items-center justify-center border", checked ? "border-omeros bg-omeros text-background" : "border-border")}>
        {checked && <Check className="size-3" />}
      </span>
      {label}
    </button>
  );
}

export function useDebounced<T>(v: T, ms = 300) {
  const [d, setD] = useState(v);
  useEffect(() => {
    const t = setTimeout(() => setD(v), ms);
    return () => clearTimeout(t);
  }, [v, ms]);
  return d;
}

export function downloadCsv(name: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = name;
  a.click();
}
