import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Download, History } from "lucide-react";
import { adminListAudit } from "@/lib/admin/admin.functions";
import { Empty, PageHeader, Panel, downloadCsv, fmtDateTime, inputCls } from "@/components/admin/AdminUi";

export const Route = createFileRoute("/admin/audit")({ component: AuditPage });

const ENTITIES = ["all", "article", "media", "page", "books", "gallery", "palimpsest", "readings", "testimonials", "staff", "profile", "session", "message", "subscriber"];

function AuditPage() {
  const list = useServerFn(adminListAudit);
  const [entity, setEntity] = useState("all");
  const { data = [] } = useQuery({ queryKey: ["admin", "audit", entity], queryFn: () => list({ data: { entity, limit: 500 } }) });
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Team"
        title="Audit log"
        description="Every change made in the admin: who, what and when."
        actions={
          <button onClick={() => downloadCsv("omeros-audit.csv", data)} className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm">
            <Download className="size-4" /> Export
          </button>
        }
      />
      <select className={`${inputCls} max-w-xs`} value={entity} onChange={(e) => setEntity(e.target.value)}>
        {ENTITIES.map((e) => <option key={e} value={e}>{e === "all" ? "All activity" : e}</option>)}
      </select>
      <Panel>
        {!data.length ? (
          <Empty icon={<History className="size-8" />} title="No activity yet" />
        ) : (
          <ul>
            {data.map((r) => (
              <li key={r.id} className="grid grid-cols-[1fr_auto] gap-2 border-b border-border px-4 py-3 text-sm last:border-0 md:grid-cols-[180px_1fr_auto]">
                <span className="font-medium">{r.staff_name}</span>
                <span className="col-span-2 text-muted-foreground md:col-span-1">
                  <span className="text-foreground">{r.action}</span> {r.entity}
                  {r.summary && <> · {r.summary}</>}
                </span>
                <span className="row-start-1 whitespace-nowrap text-right text-xs text-muted-foreground md:row-start-auto">{fmtDateTime(r.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
