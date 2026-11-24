import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarClock, Eye, EyeOff, Loader2, Save, Send } from "lucide-react";
import { toast } from "sonner";
import { adminGetArticle, adminSaveArticle } from "@/lib/admin/admin.functions";
import { AiAssist, Field, ImageField, Panel, StatusBadge, TagInput, inputCls } from "@/components/admin/AdminUi";
import { RichEditor } from "@/components/admin/RichEditor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/articles/$id")({ component: EditorPage });

type Status = "draft" | "scheduled" | "published";
type Draft = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  cover_image: string;
  topic: string;
  tags: string[];
  status: Status;
  publish_at: string;
  seo_title: string;
  seo_description: string;
  og_image: string;
};

const TOPICS = ["Technology", "Education", "Ecology", "Inequality", "Caribbean", "Philosophy", "Culture", "Policy"];
const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 120);
const toLocal = (iso: string) => {
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};
const blank = (): Draft => ({
  slug: "",
  title: "",
  excerpt: "",
  body_html: "",
  cover_image: "",
  topic: "Technology",
  tags: [],
  status: "draft",
  publish_at: new Date().toISOString(),
  seo_title: "",
  seo_description: "",
  og_image: "",
});

function EditorPage() {
  const { id } = Route.useParams();
  const { me } = Route.useRouteContext();
  const isNew = id === "new";
  const get = useServerFn(adminGetArticle);
  const save = useServerFn(adminSaveArticle);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "article", id], queryFn: () => get({ data: { id } }), enabled: !isNew });
  const [d, setD] = useState<Draft>(blank);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (data) {
      setD({
        id: data.id,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        body_html: data.body_html,
        cover_image: data.cover_image,
        topic: data.topic,
        tags: data.tags ?? [],
        status: data.status as Status,
        publish_at: data.publish_at,
        seo_title: data.seo_title ?? "",
        seo_description: data.seo_description ?? "",
        og_image: data.og_image ?? "",
      });
      setDirty(false);
    }
  }, [data]);

  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    setDirty(true);
  };
  const plain = useMemo(() => d.body_html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(), [d.body_html]);
  const isAuthor = me?.role === "author";
  const readOnly = me?.role === "viewer";

  async function onSave(nextStatus?: Status) {
    const status = nextStatus ?? d.status;
    if (!d.title.trim()) return toast.error("Give the article a title.");
    const slug = d.slug || slugify(d.title);
    let publishAt = d.publish_at;
    if (status === "published" && new Date(publishAt) > new Date()) publishAt = new Date().toISOString();
    if (status === "scheduled" && new Date(publishAt) <= new Date()) return toast.error("Pick a future date to schedule.");
    setSaving(true);
    try {
      const r = await save({
        data: {
          ...d,
          slug,
          status,
          publish_at: publishAt,
          seo_title: d.seo_title || null,
          seo_description: d.seo_description || null,
          og_image: d.og_image || null,
        },
      });
      setD((p) => ({ ...p, id: r.id, slug, status, publish_at: publishAt }));
      setDirty(false);
      qc.invalidateQueries({ queryKey: ["admin"] });
      toast.success(status === "published" ? "Published — live on the Journal and homepage" : status === "scheduled" ? `Scheduled for ${new Date(publishAt).toLocaleString()}` : "Draft saved");
      if (isNew) navigate({ to: "/admin/articles/$id", params: { id: r.id }, replace: true });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (!isNew && isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const seoTitle = d.seo_title || `${d.title || "Untitled"}, Fazal Ali`;
  const seoDesc = d.seo_description || d.excerpt || plain.slice(0, 155);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/admin/articles" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Journal
        </Link>
        <StatusBadge status={d.status} />
        {dirty && <span className="text-xs text-muted-foreground">Unsaved changes</span>}
        <div className="ml-auto flex flex-wrap gap-2">
          <button onClick={() => setPreview(!preview)} className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 text-sm">
            {preview ? <EyeOff className="size-4" /> : <Eye className="size-4" />} {preview ? "Hide preview" : "Live preview"}
          </button>
          {!readOnly && (
            <>
              <button disabled={saving} onClick={() => onSave("draft")} className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 text-sm">
                <Save className="size-4" /> Save draft
              </button>
              {!isAuthor && (
                <>
                  <button
                    disabled={saving}
                    onClick={() => onSave("scheduled")}
                    className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 text-sm"
                  >
                    <CalendarClock className="size-4" /> Schedule
                  </button>
                  <button
                    disabled={saving}
                    onClick={() => onSave("published")}
                    className="inline-flex items-center gap-2 bg-omeros px-4 py-2 text-sm text-background"
                  >
                    {saving ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                    {d.status === "published" ? "Update" : "Publish now"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className={cn("grid gap-6", preview ? "xl:grid-cols-2" : "lg:grid-cols-[1fr_340px]")}>
        <div className="space-y-4">
          <input
            value={d.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) setD((p) => ({ ...p, title: e.target.value, slug: slugify(e.target.value) }));
            }}
            placeholder="Article title"
            className="w-full bg-transparent font-display text-4xl tracking-tight outline-none placeholder:text-muted-foreground/50 md:text-5xl"
          />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            /writing/
            <input
              value={d.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className="flex-1 border-b border-transparent bg-transparent outline-none focus:border-omeros"
              placeholder="url-slug"
            />
          </div>
          <RichEditor value={d.body_html} onChange={(v) => set("body_html", v)} />
        </div>

        {preview ? (
          <Panel className="sticky top-20 h-[calc(100vh-7rem)] overflow-y-auto bg-background">
            <div className="relative">
              {d.cover_image && <img src={d.cover_image} alt="" className="aspect-[16/9] w-full object-cover" />}
              <div className="px-8 py-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{d.topic} · {new Date(d.publish_at).toDateString()}</p>
                <h1 className="mt-4 font-display text-4xl leading-tight">{d.title || "Untitled"}</h1>
                {d.excerpt && <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{d.excerpt}</p>}
                <div
                  className="mt-8 space-y-5 text-[17px] leading-[1.8] text-foreground/85 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:font-display [&_h2]:text-2xl [&_h3]:font-display [&_h3]:text-xl [&_img]:w-full [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                  dangerouslySetInnerHTML={{ __html: d.body_html || "<p>Start writing to see the preview…</p>" }}
                />
              </div>
            </div>
          </Panel>
        ) : (
          <aside className="space-y-4">
            <Panel className="space-y-4 p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Publishing</p>
              <Field label="Publish date & time" hint={new Date(d.publish_at) > new Date() ? "Future date: use Schedule, or Publish now to go live immediately" : "Use Schedule with a future date, or Publish now"}>
                <input type="datetime-local" className={inputCls} value={toLocal(d.publish_at)} onChange={(e) => e.target.value && set("publish_at", new Date(e.target.value).toISOString())} />
              </Field>
              <Field label="Topic">
                <select className={inputCls} value={d.topic} onChange={(e) => set("topic", e.target.value)}>
                  {[...new Set([d.topic, ...TOPICS])].map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Tags" hint={<AiAssist kind="tags" title={d.title} text={plain} onPick={(v) => set("tags", v.split(",").map((t) => t.trim()).filter(Boolean))} />}>
                <TagInput value={d.tags} onChange={(v) => set("tags", v)} />
              </Field>
              {d.status !== "draft" && !isAuthor && (
                <button onClick={() => onSave("draft")} className="text-xs text-muted-foreground underline">Unpublish (move to drafts)</button>
              )}
            </Panel>

            <Panel className="space-y-4 p-5">
              <ImageField label="Featured image" value={d.cover_image} onChange={(v) => set("cover_image", v)} />
              <Field label="Excerpt" hint={<AiAssist kind="excerpt" title={d.title} text={plain} onPick={(v) => set("excerpt", v)} />}>
                <textarea rows={4} className={inputCls} value={d.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="A short summary shown on the Journal page" />
              </Field>
            </Panel>

            <Panel className="space-y-4 p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Search & sharing</p>
              <div className="border border-border bg-background p-3">
                <p className="truncate text-xs text-success">omeros.hyperrevamp.com › writing › {d.slug || "…"}</p>
                <p className="mt-1 line-clamp-1 text-[15px] text-omeros">{seoTitle}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{seoDesc}</p>
              </div>
              <Field label="SEO title" hint={<span className="flex gap-2"><span className={cn(seoTitle.length > 60 && "text-destructive")}>{seoTitle.length}/60</span><AiAssist kind="seo_title" title={d.title} text={plain} onPick={(v) => set("seo_title", v)} /></span>}>
                <input className={inputCls} value={d.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder={`${d.title || "Title"}, Fazal Ali`} />
              </Field>
              <Field label="Meta description" hint={<span className="flex gap-2"><span className={cn(seoDesc.length > 160 && "text-destructive")}>{seoDesc.length}/160</span><AiAssist kind="seo_description" title={d.title} text={plain} onPick={(v) => set("seo_description", v)} /></span>}>
                <textarea rows={3} className={inputCls} value={d.seo_description} onChange={(e) => set("seo_description", e.target.value)} />
              </Field>
              <ImageField label="Social share image (optional)" value={d.og_image} onChange={(v) => set("og_image", v)} />
            </Panel>
          </aside>
        )}
      </div>
    </div>
  );
}
