import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, Download, Mail, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { adminDeleteSubscriber, adminListSubscribers } from "@/lib/admin/admin.functions";
import { Empty, PageHeader, Panel, StatCard, downloadCsv, fmtDateTime, inputCls } from "@/components/admin/AdminUi";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/subscribers")({ component: SubscribersPage });

function SubscribersPage() {
  const list = useServerFn(adminListSubscribers);
  const del = useServerFn(adminDeleteSubscriber);
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["admin", "subscribers"], queryFn: () => list() });
  const [q, setQ] = useState("");
  const items = data.filter((s) => s.email.includes(q.toLowerCase()));
  const week = data.filter((s) => Date.now() - new Date(s.created_at).getTime() < 7 * 864e5).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Audience"
        title="Newsletter"
        description="People who signed up for “A letter, now and then.”"
        actions={
          <>
            <button onClick={() => { navigator.clipboard.writeText(data.map((s) => s.email).join(", ")); toast.success("Emails copied"); }} className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm">
              <Copy className="size-4" /> Copy all
            </button>
            <button onClick={() => downloadCsv("omeros-subscribers.csv", data.map(({ email, created_at }) => ({ email, created_at })))} className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background">
              <Download className="size-4" /> Export CSV
            </button>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-4 md:max-w-md">
        <StatCard label="Total" value={data.length} />
        <StatCard label="This week" value={`+${week}`} />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input className={cn(inputCls, "pl-9")} placeholder="Search email" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <Panel>
        {!items.length ? (
          <Empty icon={<Mail className="size-8" />} title="No subscribers yet" />
        ) : (
          <ul>
            {items.map((s) => (
              <li key={s.id} className="flex items-center justify-between border-b border-border px-4 py-3 text-sm last:border-0">
                <span>{s.email}</span>
                <span className="flex items-center gap-4 text-xs text-muted-foreground">
                  {fmtDateTime(s.created_at)}
                  <button aria-label="Remove" className="hover:text-destructive" onClick={async () => { if (!confirm(`Remove ${s.email}?`)) return; await del({ data: { id: s.id } }); qc.invalidateQueries({ queryKey: ["admin", "subscribers"] }); }}>
                    <Trash2 className="size-4" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
