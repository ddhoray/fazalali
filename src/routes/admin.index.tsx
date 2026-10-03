import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, Eye, FileText, Image as ImageIcon, Inbox, Mail, PenLine, Upload } from "lucide-react";
import { adminDashboard } from "@/lib/admin/admin.functions";
import { PageHeader, Panel, StatCard, fmtDateTime, timeAgo } from "@/components/admin/AdminUi";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const { me } = Route.useRouteContext();
  const fetchDash = useServerFn(adminDashboard);
  const { data } = useQuery({ queryKey: ["admin", "dashboard"], queryFn: () => fetchDash() });
  const max = Math.max(1, ...(data?.series.map((s) => s.views) ?? [1]));
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title={`${greet}, ${me?.name?.split(" ")[0] || "there"}.`}
        description="Here's what's happening on omeros.hyperrevamp.com."
        actions={
          <>
            <Link to="/admin/articles/$id" params={{ id: "new" }} className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background">
              <PenLine className="size-4" /> New article
            </Link>
            <Link to="/admin/media" className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm">
              <Upload className="size-4" /> Upload media
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Views · 7 days" value={data?.stats.views7 ?? "—"} icon={<Eye className="size-4" />} />
        <StatCard label="Published" value={data?.stats.published ?? "—"} hint={`${data?.stats.drafts ?? 0} drafts · ${data?.stats.scheduled ?? 0} scheduled`} icon={<FileText className="size-4" />} />
        <StatCard label="Unread messages" value={data?.stats.unread ?? "—"} icon={<Inbox className="size-4" />} />
        <StatCard label="Subscribers" value={data?.stats.subs ?? "—"} hint={`${data?.stats.media ?? 0} media files`} icon={<Mail className="size-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Page views · last 30 days</p>
            <p className="text-xs text-muted-foreground">{data?.series.reduce((a, b) => a + b.views, 0) ?? 0} total</p>
          </div>
          <div className="mt-6 flex h-48 items-end gap-1">
            {(data?.series ?? Array.from({ length: 30 }, (_, i) => ({ day: String(i), views: 0 }))).map((s) => (
              <div key={s.day} className="group relative flex-1">
                <div className="w-full bg-omeros/80 transition-colors group-hover:bg-omeros" style={{ height: `${Math.max(2, (s.views / max) * 180)}px` }} />
                <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap bg-foreground px-1.5 py-0.5 text-[10px] text-background group-hover:block">
                  {s.day.slice(5)} · {s.views}
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Top pages</p>
          <ul className="mt-4 divide-y divide-border">
            {(data?.topPages ?? []).map((p) => (
              <li key={p.path} className="flex items-center justify-between py-2.5 text-sm">
                <span className="truncate">{p.path}</span>
                <span className="text-muted-foreground">{p.views}</span>
              </li>
            ))}
            {data && !data.topPages.length && <li className="py-6 text-sm text-muted-foreground">Views will appear as visitors arrive.</li>}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Recent activity</p>
          <ul className="mt-4 space-y-3">
            {(data?.recent ?? []).map((r) => (
              <li key={r.id} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 bg-omeros" />
                <span className="flex-1">
                  <span className="font-medium">{r.staff_name}</span> {r.action}d {r.entity}
                  {r.summary && <span className="text-muted-foreground"> · {r.summary}</span>}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(r.created_at)}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="p-6">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <CalendarClock className="size-3.5" /> Scheduled
          </p>
          <ul className="mt-4 divide-y divide-border">
            {(data?.upcoming ?? []).map((a) => (
              <li key={a.id}>
                <Link to="/admin/articles/$id" params={{ id: a.id }} className="flex items-center justify-between py-2.5 text-sm hover:text-omeros">
                  <span className="truncate">{a.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{fmtDateTime(a.publish_at)}</span>
                </Link>
              </li>
            ))}
            {data && !data.upcoming.length && (
              <li className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
                <ImageIcon className="size-4" /> Nothing scheduled. Set a future date on any article to queue it.
              </li>
            )}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
