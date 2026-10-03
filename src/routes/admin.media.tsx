import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Copy, FileAudio, FileText, FileVideo, Grid2X2, List, Loader2, Search, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { adminDeleteMedia, adminListMedia, adminMediaUsage, adminUpdateMedia } from "@/lib/admin/admin.functions";
import { AiAssist, Empty, Field, PageHeader, Panel, fmtDateTime, inputCls, useUpload, type MediaRow } from "@/components/admin/AdminUi";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/media")({ component: MediaPage });

const kb = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

function Thumb({ m, className }: { m: MediaRow; className?: string }) {
  if (m.content_type.startsWith("image/")) return <img src={m.url} alt={m.alt} loading="lazy" className={cn("size-full object-cover", className)} />;
  const Icon = m.content_type.startsWith("video/") ? FileVideo : m.content_type.startsWith("audio/") ? FileAudio : FileText;
  return <div className="flex size-full items-center justify-center bg-muted"><Icon className="size-8 text-muted-foreground" /></div>;
}

function MediaPage() {
  const list = useServerFn(adminListMedia);
  const del = useServerFn(adminDeleteMedia);
  const upd = useServerFn(adminUpdateMedia);
  const usage = useServerFn(adminMediaUsage);
  const qc = useQueryClient();
  const upload = useUpload();
  const { data = [], isLoading } = useQuery({ queryKey: ["admin", "media"], queryFn: () => list() as Promise<MediaRow[]> });
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sel, setSel] = useState<MediaRow | null>(null);
  const [alt, setAlt] = useState("");
  const [used, setUsed] = useState<{ label: string }[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const items = data.filter(
    (m) => (type === "all" || m.content_type.startsWith(type)) && (m.filename + " " + m.alt).toLowerCase().includes(q.toLowerCase()),
  );

  async function doUpload(files: FileList | File[]) {
    setBusy(true);
    await upload(files);
    setBusy(false);
  }
  function open(m: MediaRow) {
    setSel(m);
    setAlt(m.alt);
    setUsed(null);
    usage({ data: { url: m.url } }).then(setUsed).catch(() => setUsed([]));
  }

  return (
    <div
      className="space-y-6"
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (e.dataTransfer.files.length) doUpload(e.dataTransfer.files);
      }}
    >
      <PageHeader
        eyebrow="Media"
        title="Media library"
        description="Images, video, audio and documents used across the site. Drag files anywhere on this page to upload."
        actions={
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 bg-omeros px-4 py-2 text-sm text-background">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Upload files
          </button>
        }
      />
      <input ref={fileRef} type="file" multiple hidden accept="image/*,video/*,audio/*,application/pdf" onChange={(e) => e.target.files && doUpload(e.target.files)} />

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className={cn(inputCls, "pl-9")} placeholder="Search by name or alt text" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex border border-border bg-background">
          {[["all", "All"], ["image/", "Images"], ["video/", "Video"], ["audio/", "Audio"], ["application/", "Docs"]].map(([v, l]) => (
            <button key={v} onClick={() => setType(v)} className={cn("px-3 py-2.5 text-xs uppercase tracking-[0.14em]", type === v ? "bg-foreground text-background" : "text-muted-foreground")}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex border border-border bg-background">
          <button onClick={() => setView("grid")} className={cn("px-3", view === "grid" && "bg-muted")} aria-label="Grid"><Grid2X2 className="size-4" /></button>
          <button onClick={() => setView("list")} className={cn("px-3", view === "list" && "bg-muted")} aria-label="List"><List className="size-4" /></button>
        </div>
      </div>

      <Panel className={cn("p-3 transition-colors", drag && "border-omeros bg-omeros-soft")}>
        {isLoading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : !items.length ? (
          <Empty icon={<Upload className="size-8" />} title="Drop files here" body="Or use the Upload button. Up to 50 MB per file." />
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {items.map((m) => (
              <button key={m.id} onClick={() => open(m)} className="group text-left">
                <div className="aspect-square overflow-hidden border border-border group-hover:border-omeros"><Thumb m={m} /></div>
                <p className="mt-1.5 truncate text-xs">{m.filename}</p>
                <p className="text-[10px] text-muted-foreground">{kb(m.size)}</p>
              </button>
            ))}
          </div>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {items.map((m) => (
                <tr key={m.id} onClick={() => open(m)} className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="w-14 p-2"><div className="size-10 overflow-hidden"><Thumb m={m} /></div></td>
                  <td className="p-2">{m.filename}<p className="text-xs text-muted-foreground">{m.alt || "No alt text"}</p></td>
                  <td className="hidden p-2 text-muted-foreground md:table-cell">{m.content_type}</td>
                  <td className="p-2 text-muted-foreground">{kb(m.size)}</td>
                  <td className="hidden p-2 text-muted-foreground md:table-cell">{fmtDateTime(m.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>

      <Sheet open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader><SheetTitle className="truncate">{sel?.filename}</SheetTitle></SheetHeader>
          {sel && (
            <div className="space-y-5 px-4 pb-8">
              <div className="aspect-[4/3] overflow-hidden border border-border">
                {sel.content_type.startsWith("video/") ? <video src={sel.url} controls className="size-full" /> : sel.content_type.startsWith("audio/") ? <audio src={sel.url} controls className="mt-16 w-full" /> : <Thumb m={sel} className="object-contain" />}
              </div>
              <p className="text-xs text-muted-foreground">{sel.content_type} · {kb(sel.size)} · {fmtDateTime(sel.created_at)}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sel.url);
                  toast.success("Link copied");
                }}
                className="inline-flex w-full items-center justify-center gap-2 border border-border py-2 text-sm"
              >
                <Copy className="size-4" /> Copy link
              </button>
              <Field label="Alt text" hint={<AiAssist kind="alt" title={sel.filename} text={alt} onPick={setAlt} />}>
                <textarea rows={3} className={inputCls} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the image for screen readers and search" />
              </Field>
              <button
                onClick={async () => {
                  await upd({ data: { id: sel.id, alt } });
                  toast.success("Saved");
                  qc.invalidateQueries({ queryKey: ["admin", "media"] });
                }}
                className="w-full bg-foreground py-2.5 text-sm text-background"
              >
                Save alt text
              </button>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Used in</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {used === null && <li className="text-muted-foreground">Checking…</li>}
                  {used?.length === 0 && <li className="text-muted-foreground">Not used anywhere yet.</li>}
                  {used?.map((u, i) => <li key={i}>{u.label}</li>)}
                </ul>
              </div>
              <button
                onClick={async () => {
                  if (!confirm(used?.length ? "This file is in use. Delete anyway?" : "Delete this file permanently?")) return;
                  try {
                    await del({ data: { id: sel.id } });
                    toast.success("Deleted");
                    setSel(null);
                    qc.invalidateQueries({ queryKey: ["admin", "media"] });
                  } catch (e) {
                    toast.error((e as Error).message);
                  }
                }}
                className="inline-flex w-full items-center justify-center gap-2 py-2 text-sm text-destructive"
              >
                <Trash2 className="size-4" /> Delete file
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
