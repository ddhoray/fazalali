import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { adminGetPages, adminSavePage } from "@/lib/admin/admin.functions";
import { PAGE_SCHEMAS } from "@/lib/cms-schema";
import { Field, PageHeader, Panel, inputCls } from "@/components/admin/AdminUi";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/pages")({ component: PagesEditor });

function PagesEditor() {
  const get = useServerFn(adminGetPages);
  const save = useServerFn(adminSavePage);
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["admin", "pages"], queryFn: () => get() });
  const [active, setActive] = useState(PAGE_SCHEMAS[0].key);
  const schema = PAGE_SCHEMAS.find((p) => p.key === active)!;
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { me } = Route.useRouteContext();

  useEffect(() => {
    const saved = (data.find((p) => p.key === active)?.data ?? {}) as Record<string, string>;
    setValues(Object.fromEntries(schema.fields.map((f) => [f.key, saved[f.key] ?? f.def])));
  }, [active, data, schema]);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Content" title="Page text" description="Edit headings, intros and details that appear across the site." />
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="flex gap-1 overflow-x-auto lg:flex-col">
          {PAGE_SCHEMAS.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={cn("whitespace-nowrap px-4 py-2.5 text-left text-sm", active === p.key ? "bg-foreground text-background" : "hover:bg-muted")}
            >
              {p.label}
            </button>
          ))}
        </div>
        <Panel className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl">{schema.label}</p>
            <a href={schema.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-omeros">
              View page <ExternalLink className="size-3" />
            </a>
          </div>
          {schema.fields.map((f) => (
            <Field key={f.key} label={f.label}>
              {f.long ? (
                <textarea rows={4} className={inputCls} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
              ) : (
                <input className={inputCls} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
              )}
            </Field>
          ))}
          {me?.role !== "viewer" && me?.role !== "author" && (
            <button
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await save({ data: { key: active, data: values } });
                  toast.success("Page text saved");
                  qc.invalidateQueries({ queryKey: ["admin", "pages"] });
                } catch (e) {
                  toast.error((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
              className="inline-flex items-center gap-2 bg-omeros px-5 py-2.5 text-sm text-background"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save changes
            </button>
          )}
        </Panel>
      </div>
    </div>
  );
}
