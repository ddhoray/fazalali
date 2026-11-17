import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, DownloadCloud, ExternalLink, Loader2, Newspaper, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  adminDeleteArticle,
  adminDuplicateArticle,
  adminImportArticles,
  adminListArticles,
} from "@/lib/admin/admin.functions";
import { Empty, PageHeader, Panel, StatusBadge, fmtDateTime, inputCls, useDebounced } from "@/components/admin/AdminUi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Paginator } from "@/components/site/Paginator";

export const Route = createFileRoute("/admin/articles/")({ component: ArticlesPage });

function ArticlesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const dq = useDebounced(q);
  const list = useServerFn(adminListArticles);
  const del = useServerFn(adminDeleteArticle);
  const dup = useServerFn(adminDuplicateArticle);
  const imp = useServerFn(adminImportArticles);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState<{ id: string; title: string } | null>(null);
  const [importing, setImporting] = useState(false);
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "articles", dq, status],
    queryFn: () => list({ data: { q: dq || undefined, status } }),
  });
  const PER = 25;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / PER));
  const cur = Math.min(page, totalPages);
  const rows = data.slice((cur - 1) * PER, cur * PER);
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "articles"] });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Content"
        title="Journal"
        description="Write, schedule and publish journal entries. Everything here appears on /writing."
        actions={
          <>
            <button
              disabled={importing}
              onClick={async () => {
                setImporting(true);
                try {
                  const r = await imp();
                  toast.success(`Imported ${r.imported} of ${r.total} existing entries`);
                  refresh();
                } catch (e) {
                  toast.error((e as Error).message);
                } finally {
                  setImporting(false);
                }
              }}
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm"
              title="Copy the site's existing journal entries into the admin (skips ones already here)"
            >
              {importing ? <Loader2 className="size-4 animate-spin" /> : <DownloadCloud className="size-4" />} Sync existing entries
            </button>
            <Link to="/admin/articles/$id" params={{ id: "new" }} className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background">
              <Plus className="size-4" /> New article
            </Link>
          </>
        }
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className={cn(inputCls, "pl-9")} placeholder="Search by title…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <div className="flex border border-border bg-background">
          {["all", "published", "scheduled", "draft"].map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1); }}
              className={cn("px-4 py-2.5 text-xs uppercase tracking-[0.14em]", status === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Panel>
        {isLoading ? (
          <p className="p-8 text-sm text-muted-foreground">Loading…</p>
        ) : !data.length ? (
          <Empty
            icon={<Newspaper className="size-8" />}
            title="No articles here yet"
            body="Start a new entry, or use “Sync existing entries” to bring in the current journal."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="px-4 py-3 font-normal">Article</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="hidden px-4 py-3 font-normal md:table-cell">Topic</th>
                  <th className="hidden px-4 py-3 font-normal md:table-cell">Publish date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.id} className="group border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <Link to="/admin/articles/$id" params={{ id: a.id }} className="flex items-center gap-3">
                        <span className="size-12 shrink-0 overflow-hidden bg-muted">
                          {a.cover_image && <img src={a.cover_image} alt="" className="size-full object-cover" loading="lazy" />}
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-1 font-medium group-hover:text-omeros">{a.title}</span>
                          <span className="block truncate text-xs text-muted-foreground">/writing/{a.slug}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{a.topic}</td>
                    <td className="hidden whitespace-nowrap px-4 py-3 text-muted-foreground md:table-cell">{fmtDateTime(a.publish_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1 text-muted-foreground [&_button]:inline-flex [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:items-center [&_button]:justify-center [&_a]:inline-flex [&_a]:min-h-11 [&_a]:min-w-11 [&_a]:items-center [&_a]:justify-center [&_svg]:size-4">
                        <Link to="/admin/articles/$id" params={{ id: a.id }} title="Edit" className="hover:text-foreground"><Pencil /></Link>
                        <button
                          title="Duplicate"
                          className="hover:text-foreground"
                          onClick={async () => {
                            const r = await dup({ data: { id: a.id } });
                            toast.success("Duplicated as draft");
                            navigate({ to: "/admin/articles/$id", params: { id: r.id } });
                          }}
                        >
                          <Copy />
                        </button>
                        {a.status !== "draft" && (
                          <a href={`/writing/${a.slug}`} target="_blank" rel="noreferrer" title="View" className="hover:text-foreground"><ExternalLink /></a>
                        )}
                        <button title="Delete" className="hover:text-destructive" onClick={() => setConfirm({ id: a.id, title: a.title })}><Trash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <p className="text-xs text-muted-foreground">
          {data.length ? `Showing ${(cur - 1) * PER + 1}–${Math.min(cur * PER, data.length)} of ${data.length} articles` : "0 articles"}
        </p>
        <Paginator page={cur} total={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      </div>

      <AlertDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this article?</AlertDialogTitle>
            <AlertDialogDescription>“{confirm?.title}” will be removed from the site permanently.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={async () => {
                if (!confirm) return;
                try {
                  await del({ data: { id: confirm.id } });
                  toast.success("Article deleted");
                  refresh();
                } catch (e) {
                  toast.error((e as Error).message);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
