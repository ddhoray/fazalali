import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, GripVertical, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { adminDeleteEntry, adminListEntries, adminReorderEntries, adminSaveEntry } from "@/lib/admin/admin.functions";
import { COLLECTIONS, type CollectionKey } from "@/lib/cms-schema";
import { AiAssist, Empty, Field, ImageField, PageHeader, Panel, Toggle, inputCls } from "@/components/admin/AdminUi";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/collections/$collection")({
  beforeLoad: ({ params }) => {
    if (!(params.collection in COLLECTIONS)) throw notFound();
  },
  component: CollectionPage,
});

type Entry = {
  id?: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  data: Record<string, unknown>;
  published: boolean;
  featured: boolean;
};

function CollectionPage() {
  const { collection } = Route.useParams();
  const key = collection as CollectionKey;
  const cfg = COLLECTIONS[key];
  const list = useServerFn(adminListEntries);
  const save = useServerFn(adminSaveEntry);
  const del = useServerFn(adminDeleteEntry);
  const reorder = useServerFn(adminReorderEntries);
  const qc = useQueryClient();
  const { me } = Route.useRouteContext();
  const canEdit = me?.role === "owner" || me?.role === "editor";
  const { data = [], isLoading } = useQuery({ queryKey: ["admin", "entries", key], queryFn: () => list({ data: { collection: key } }) });
  const [items, setItems] = useState(data);
  useEffect(() => setItems(data), [data]);
  const [edit, setEdit] = useState<Entry | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "entries", key] });

  async function persistOrder(next: typeof items) {
    setItems(next);
    await reorder({ data: { ids: next.map((i) => i.id) } });
    refresh();
  }
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    persistOrder(next);
  };

  async function quick(e: (typeof items)[number], patch: Partial<Entry>) {
    await save({ data: { ...toInput(e), ...patch, collection: key } as never });
    refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Collection"
        title={cfg.label}
        description={cfg.description}
        actions={
          canEdit && (
            <button
              onClick={() => setEdit({ title: "", subtitle: "", body: "", image_url: "", link_url: "", data: "pagePicker" in cfg ? { page: cfg.pagePicker[0] } : {}, published: true, featured: false })}
              className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background"
            >
              <Plus className="size-4" /> Add item
            </button>
          )
        }
      />
      <Panel>
        {isLoading ? (
          <p className="p-8 text-sm text-muted-foreground">Loading…</p>
        ) : !items.length ? (
          <Empty title={`No ${cfg.label.toLowerCase()} items yet`} body="Add the first one. You can drag to reorder and hide items without deleting them." />
        ) : (
          <ul>
            {items.map((e, i) => (
              <li
                key={e.id}
                draggable={canEdit}
                onDragStart={() => setDragId(e.id)}
                onDragOver={(ev) => ev.preventDefault()}
                onDrop={() => {
                  if (!dragId || dragId === e.id) return;
                  const next = items.filter((x) => x.id !== dragId);
                  next.splice(i, 0, items.find((x) => x.id === dragId)!);
                  setDragId(null);
                  persistOrder(next);
                }}
                className={cn("grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-3 border-b border-border px-3 py-3 sm:flex sm:gap-4 sm:px-4", !e.published && "opacity-50", dragId === e.id && "bg-omeros-soft")}
              >
                {canEdit && <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground" />}
                <span className="size-14 shrink-0 overflow-hidden bg-muted">{e.image_url && <img src={e.image_url} alt="" className="size-full object-cover" />}</span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-medium">
                    {e.title || "Untitled"} {e.featured && <Star className="size-3.5 fill-omeros text-omeros" />}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {[e.subtitle, (e.data as { page?: string })?.page].filter(Boolean).join(" · ") || e.body?.slice(0, 90)}
                  </p>
                </div>
                {canEdit && (
                  <div className="col-span-3 flex flex-wrap justify-end gap-1 text-muted-foreground sm:col-span-1 [&_button]:inline-flex [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:items-center [&_button]:justify-center [&_svg]:size-4">
                    <button title="Move up" onClick={() => move(i, -1)}><ArrowUp /></button>
                    <button title="Move down" onClick={() => move(i, 1)}><ArrowDown /></button>
                    <button title={e.featured ? "Unfeature" : "Feature"} onClick={() => quick(e, { featured: !e.featured })}><Star /></button>
                    <button title={e.published ? "Hide" : "Show"} onClick={() => quick(e, { published: !e.published })}>{e.published ? <Eye /> : <EyeOff />}</button>
                    <button title="Edit" onClick={() => setEdit(toInput(e))}><Pencil /></button>
                    <button
                      title="Delete"
                      className="hover:text-destructive"
                      onClick={async () => {
                        if (!confirm(`Delete “${e.title}”?`)) return;
                        await del({ data: { id: e.id } });
                        toast.success("Deleted");
                        refresh();
                      }}
                    >
                      <Trash2 />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Sheet open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl">{edit?.id ? "Edit item" : "New item"}</SheetTitle>
          </SheetHeader>
          {edit && (
            <form
              className="space-y-5 px-4 pb-8"
              onSubmit={async (ev) => {
                ev.preventDefault();
                try {
                  await save({ data: { ...edit, collection: key } as never });
                  toast.success("Saved");
                  setEdit(null);
                  refresh();
                } catch (e) {
                  toast.error((e as Error).message);
                }
              }}
            >
              {cfg.image && <ImageField value={edit.image_url} onChange={(v) => setEdit({ ...edit, image_url: v })} />}
              <Field label={cfg.titleLabel}>
                <input required className={inputCls} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
              </Field>
              <Field label={cfg.subtitleLabel}>
                <input className={inputCls} value={edit.subtitle ?? ""} onChange={(e) => setEdit({ ...edit, subtitle: e.target.value })} />
              </Field>
              <Field label={cfg.bodyLabel} hint={key === "gallery" ? <AiAssist kind="alt" title={edit.title} text={edit.subtitle ?? ""} onPick={(v) => setEdit({ ...edit, body: v })} /> : undefined}>
                <textarea rows={key === "gallery" ? 2 : 6} className={inputCls} value={edit.body ?? ""} onChange={(e) => setEdit({ ...edit, body: e.target.value })} />
              </Field>
              {cfg.linkLabel && (
                <Field label={cfg.linkLabel}>
                  <input type="url" className={inputCls} value={edit.link_url ?? ""} onChange={(e) => setEdit({ ...edit, link_url: e.target.value })} placeholder="https://" />
                </Field>
              )}
              {"pagePicker" in cfg && (
                <Field label="Show on page">
                  <select className={inputCls} value={(edit.data.page as string) ?? cfg.pagePicker[0]} onChange={(e) => setEdit({ ...edit, data: { ...edit.data, page: e.target.value } })}>
                    {cfg.pagePicker.map((p) => <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </Field>
              )}
              <div className="flex gap-6">
                <Toggle checked={edit.published} onChange={(v) => setEdit({ ...edit, published: v })} label="Visible on site" />
                <Toggle checked={edit.featured} onChange={(v) => setEdit({ ...edit, featured: v })} label="Featured" />
              </div>
              <button className="w-full bg-omeros py-3 text-sm text-background">Save changes</button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function toInput(e: { id: string; title: string; subtitle: string | null; body: string | null; image_url: string | null; link_url: string | null; data: unknown; published: boolean; featured: boolean }): Entry {
  return {
    id: e.id,
    title: e.title,
    subtitle: e.subtitle,
    body: e.body,
    image_url: e.image_url,
    link_url: e.link_url,
    data: (e.data ?? {}) as Record<string, unknown>,
    published: e.published,
    featured: e.featured,
  };
}
