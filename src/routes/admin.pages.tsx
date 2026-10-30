import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { CalendarClock, ChevronDown, ExternalLink, Loader2, RotateCcw, Send, X } from "lucide-react";
import { toast } from "sonner";
import { adminCancelPageSchedule, adminGetPages, adminSavePage } from "@/lib/admin/admin.functions";
import { PAGE_SCHEMAS, fieldType, type PageField } from "@/lib/cms-schema";
import { Field, ImageField, MediaUrlField, PageHeader, Panel, fmtDateTime, inputCls } from "@/components/admin/AdminUi";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/pages")({ component: PagesEditor });

type PageRow = { key: string; data: unknown; scheduled_data?: unknown; scheduled_at?: string | null; updated_at?: string };
const EMPTY_PAGES: PageRow[] = [];

function toLocal(iso: string) {
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function PagesEditor() {
  const get = useServerFn(adminGetPages);
  const save = useServerFn(adminSavePage);
  const cancel = useServerFn(adminCancelPageSchedule);
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["admin", "pages"], queryFn: () => get() as Promise<PageRow[]> });
  const data = query.data ?? EMPTY_PAGES;
  const [active, setActive] = useState(PAGE_SCHEMAS[0].key);
  const schema = useMemo(() => PAGE_SCHEMAS.find((p) => p.key === active) ?? PAGE_SCHEMAS[0], [active]);
  const row = data.find((p) => p.key === active);
  const [values, setValues] = useState<Record<string, string>>({});
  const [scheduleAt, setScheduleAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const { me } = Route.useRouteContext();
  const canEdit = me?.role !== "viewer" && me?.role !== "author";

  useEffect(() => {
    const saved = (row?.data ?? {}) as Record<string, string>;
    setValues(Object.fromEntries(schema.fields.map((f) => [f.key, saved[f.key] ?? (fieldType(f) === "image" || fieldType(f) === "video" ? "" : f.def)])));
    setScheduleAt("");
  }, [active, row, schema]);

  const groups = useMemo(() => {
    const m = new Map<string, PageField[]>();
    for (const f of schema.fields) {
      const g = f.group ?? "Content";
      m.set(g, [...(m.get(g) ?? []), f]);
    }
    return [...m.entries()];
  }, [schema]);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", "pages"] });
    qc.invalidateQueries({ queryKey: ["cms", "pages"] });
  };

  async function submit(schedule: boolean) {
    if (schedule && (!scheduleAt || new Date(scheduleAt) <= new Date())) {
      toast.error("Pick a future date and time to schedule");
      return;
    }
    setBusy(true);
    try {
      await save({ data: { key: active, data: values, scheduleAt: schedule ? new Date(scheduleAt).toISOString() : null } });
      toast.success(schedule ? `Scheduled for ${fmtDateTime(new Date(scheduleAt).toISOString())}` : "Published, live on the site now");
      refresh();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Content"
        title="Site pages"
        description="Every heading, paragraph, image, video, button and link on the public site. Publish changes now or schedule them for later. Leave an image or video empty to keep the built-in one."
      />
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="flex gap-1 overflow-x-auto border-b border-border lg:flex-col lg:border-b-0">
          {PAGE_SCHEMAS.map((p) => {
            const r = data.find((x) => x.key === p.key);
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={cn("flex min-h-11 shrink-0 items-center justify-between gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-left text-sm lg:border-b-0 lg:border-l-2", active === p.key ? "border-omeros bg-foreground text-background" : "border-transparent hover:bg-muted")}
              >
                {p.label}
                {r?.scheduled_at && <CalendarClock className="size-3.5 text-omeros" aria-label="Update scheduled" />}
              </button>
            );
          })}
        </div>

        <div className="min-w-0 space-y-4">
          <Panel className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-5">
            <div className="min-w-0">
              <p className="font-display text-2xl">{schema.label}</p>
              <p className="text-xs text-muted-foreground">{row?.updated_at ? `Last saved ${fmtDateTime(row.updated_at)}` : "Showing the built-in content"}</p>
            </div>
            <a href={schema.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-omeros">
              View page <ExternalLink className="size-3" />
            </a>
          </Panel>

          {row?.scheduled_at && (
            <Panel className="flex flex-wrap items-center justify-between gap-3 border-omeros/40 bg-omeros-soft p-4 text-sm">
              <span className="inline-flex items-center gap-2"><CalendarClock className="size-4 text-omeros" /> An update goes live {fmtDateTime(row.scheduled_at)}.</span>
              <span className="flex gap-3">
                <button className="text-omeros hover:underline" onClick={() => setValues({ ...values, ...((row.scheduled_data ?? {}) as Record<string, string>) })}>Load it to edit</button>
                {canEdit && (
                  <button className="inline-flex items-center gap-1 text-destructive hover:underline" onClick={async () => { await cancel({ data: { key: active } }); toast.success("Scheduled update cancelled"); refresh(); }}>
                    <X className="size-3.5" /> Cancel
                  </button>
                )}
              </span>
            </Panel>
          )}

          {groups.map(([g, fields]) => (
            <Panel key={g}>
              <button type="button" onClick={() => setClosed((c) => ({ ...c, [g]: !c[g] }))} className="flex w-full items-center justify-between px-5 py-4 text-left">
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{g} · {fields.length}</span>
                <ChevronDown className={cn("size-4 transition-transform", closed[g] && "-rotate-90")} />
              </button>
              {!closed[g] && (
                <div className="grid gap-5 border-t border-border p-5 md:grid-cols-2">
                  {fields.map((f) => (
                    <div key={f.key} className={cn(["long", "links", "image", "video", "audio"].includes(fieldType(f)) && "md:col-span-2")}>
                      <FieldInput f={f} value={values[f.key] ?? ""} onChange={(v) => set(f.key, v)} />
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          ))}

          {canEdit && (
            <Panel className="sticky bottom-0 z-10 flex flex-wrap items-end gap-3 p-4">
              <button disabled={busy} onClick={() => submit(false)} className="inline-flex min-h-11 items-center gap-2 bg-omeros px-5 text-sm text-background">
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Publish now
              </button>
              <label className="min-w-[200px] flex-1 sm:flex-none">
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Or schedule for</span>
                <input type="datetime-local" className={cn(inputCls, "mt-1")} value={scheduleAt} min={toLocal(new Date().toISOString())} onChange={(e) => setScheduleAt(e.target.value)} />
              </label>
              <button disabled={busy || !scheduleAt} onClick={() => submit(true)} className="inline-flex min-h-11 items-center gap-2 border border-omeros px-5 text-sm text-omeros disabled:opacity-40">
                <CalendarClock className="size-4" /> Schedule
              </button>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldInput({ f, value, onChange }: { f: PageField; value: string; onChange: (v: string) => void }) {
  const type = fieldType(f);
  const reset = f.def && value !== f.def ? (
    <button type="button" className="inline-flex items-center gap-1 text-omeros" onClick={() => onChange(f.def)}>
      <RotateCcw className="size-3" /> Default
    </button>
  ) : undefined;
  if (type === "image") return <ImageField label={`${f.label} (empty = built-in)`} value={value} onChange={onChange} />;
  if (type === "video" || type === "audio") return <MediaUrlField label={f.label} kind={type} value={value} onChange={onChange} />;
  if (type === "links")
    return (
      <Field label={f.label} hint={reset}>
        <textarea rows={Math.max(3, value.split("\n").length + 1)} className={cn(inputCls, "font-mono text-xs")} value={value} onChange={(e) => onChange(e.target.value)} />
        <p className="mt-1 text-xs text-muted-foreground">One per line: Label | /page or https://link. Reorder lines to reorder the menu.</p>
      </Field>
    );
  return (
    <Field label={f.label} hint={reset}>
      {type === "long" ? (
        <textarea rows={4} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {/\*/.test(f.def) && <p className="mt-1 text-xs text-muted-foreground">Wrap words in *asterisks* for the accent italic.</p>}
    </Field>
  );
}
