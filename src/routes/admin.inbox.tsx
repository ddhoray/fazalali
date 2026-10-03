import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Archive, ArrowLeft, Download, Inbox, Mail, MailOpen, Reply, Search, Trash2 } from "lucide-react";
import { adminListMessages, adminUpdateMessage } from "@/lib/admin/admin.functions";
import { AdminButton, Empty, PageHeader, Panel, downloadCsv, fmtDateTime, inputCls, timeAgo } from "@/components/admin/AdminUi";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/inbox")({ component: InboxPage });

function InboxPage() {
  const list = useServerFn(adminListMessages);
  const upd = useServerFn(adminUpdateMessage);
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["admin", "messages"], queryFn: () => list() });
  const [tab, setTab] = useState<"inbox" | "archived">("inbox");
  const [selId, setSelId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const items = data.filter((m) => (tab === "archived" ? m.archived : !m.archived) && `${m.name} ${m.email} ${m.message}`.toLowerCase().includes(q.toLowerCase()));
  const sel = data.find((m) => m.id === selId) ?? null;
  const act = async (id: string, p: { read?: boolean; archived?: boolean; remove?: boolean }) => {
    await upd({ data: { id, ...p } });
    qc.invalidateQueries({ queryKey: ["admin"] });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Audience"
        title="Inbox"
        description="Every note submitted through the public contact page or contact drawer arrives here. Read, reply by email, archive, or export them."
        actions={
          <AdminButton variant="outline" onClick={() => downloadCsv("omeros-messages.csv", data.map(({ name, email, message, created_at }) => ({ name, email, message, created_at })))}>
            <Download className="size-4" /> Export CSV
          </AdminButton>
        }
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1">
        {(["inbox", "archived"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-4 py-2 text-xs uppercase tracking-[0.16em]", tab === t ? "bg-foreground text-background" : "border border-border")}>
            {t} ({data.filter((m) => (t === "archived" ? m.archived : !m.archived)).length})
          </button>
        ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className={cn(inputCls, "pl-9")} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search messages" />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(300px,390px)_minmax(0,1fr)]">
        <Panel className={cn("max-h-[72vh] overflow-y-auto", sel && "hidden lg:block")}>
          {!items.length && <Empty icon={<Inbox className="size-8" />} title="All clear" body="New messages will land here." />}
          {items.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelId(m.id);
                if (!m.read) act(m.id, { read: true });
              }}
              className={cn("block w-full border-b border-border px-4 py-3 text-left hover:bg-muted/60", selId === m.id && "bg-muted")}
            >
              <div className="flex items-center gap-2">
                {!m.read && <span className="size-2 bg-omeros" />}
                <span className={cn("flex-1 truncate text-sm", !m.read && "font-semibold")}>{m.name}</span>
                <span className="text-xs text-muted-foreground">{timeAgo(m.created_at)}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.message}</p>
            </button>
          ))}
        </Panel>
        <Panel className={cn("min-h-[420px] p-5 sm:p-7", !sel && "hidden lg:block")}>
          {!sel ? (
            <Empty icon={<Mail className="size-8" />} title="Select a message" />
          ) : (
            <div>
              <button className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground lg:hidden" onClick={() => setSelId(null)}><ArrowLeft className="size-4" /> Back to inbox</button>
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="font-display text-2xl">{sel.name}</p>
                  <p className="text-sm text-muted-foreground">{sel.email} · {fmtDateTime(sel.created_at)}</p>
                </div>
                <div className="flex gap-1 [&_button]:p-2 [&_a]:p-2 [&_svg]:size-4">
                  <a href={`mailto:${sel.email}?subject=${encodeURIComponent("Re: your message to Fazal Ali")}`} title="Reply" className="text-omeros"><Reply /></a>
                  <button title={sel.read ? "Mark unread" : "Mark read"} onClick={() => act(sel.id, { read: !sel.read })}>{sel.read ? <Mail /> : <MailOpen />}</button>
                  <button title={sel.archived ? "Move to inbox" : "Archive"} onClick={() => act(sel.id, { archived: !sel.archived })}><Archive /></button>
                  <button title="Delete" className="text-destructive" onClick={() => { if (confirm("Delete this message?")) { act(sel.id, { remove: true }); setSelId(null); } }}><Trash2 /></button>
                </div>
              </div>
              <p className="mt-6 whitespace-pre-wrap text-[15px] leading-relaxed">{sel.message}</p>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
