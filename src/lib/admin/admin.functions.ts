import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { assertArticleReadyToPublish, isArticleLive, resolveArticlePublication } from "./article-publishing";

const S = () => import("./session.server");
const DB = async () => (await import("@/integrations/supabase/client.server")).supabaseAdmin;

/* ───────────── Auth ───────────── */

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ phone: z.string().min(6).max(20), otp: z.string().min(4).max(8) }))
  .handler(async ({ data }) => {
    const s = await S();
    const db = await DB();
    const phone = s.normalizePhone(data.phone);
    const { data: staff, error } = await db
      .from("cms_staff")
      .select("id, otp_hash, active, name")
      .eq("phone", phone)
      .maybeSingle();
    if (error) {
      console.error("adminLogin failed", error);
      return { ok: false as const, error: "Sign-in is temporarily unavailable: the server can't reach the database." };
    }
    if (!staff || !staff.active || staff.otp_hash !== (await s.sha256(data.otp.trim()))) {
      return { ok: false as const, error: "That number and code don't match an active account." };
    }
    await s.createSession(staff.id);
    await db.from("cms_staff").update({ last_login_at: new Date().toISOString() }).eq("id", staff.id);
    await db.from("cms_audit").insert({
      staff_id: staff.id,
      staff_name: staff.name || phone,
      action: "login",
      entity: "session",
    });
    return { ok: true as const };
  });

export const adminCheckPhone = createServerFn({ method: "POST" })
  .inputValidator(z.object({ phone: z.string().min(6).max(20) }))
  .handler(async ({ data }) => {
    const s = await S();
    const db = await DB();
    const { data: staff, error } = await db
      .from("cms_staff")
      .select("id, active")
      .eq("phone", s.normalizePhone(data.phone))
      .maybeSingle();
    if (error) {
      console.error("adminCheckPhone failed", error);
      throw new Error("Sign-in is temporarily unavailable: the server can't reach the database.");
    }
    return { exists: Boolean(staff?.active) };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const s = await S();
  await s.destroySession();
  return { ok: true };
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  return await s.currentStaff();
});

/* ───────────── Dashboard ───────────── */

export const adminDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  await s.requireStaff();
  const db = await DB();
  const now = new Date().toISOString();
  const since7 = new Date(Date.now() - 7 * 864e5).toISOString();
  const since30 = new Date(Date.now() - 30 * 864e5).toISOString();
  const count = async (q: PromiseLike<{ count: number | null }>) => (await q).count ?? 0;
  const [published, drafts, scheduled, media, unread, subs, views7, viewsRows, recent, upcoming] =
    await Promise.all([
      count(db.from("cms_articles").select("id", { count: "exact", head: true }).in("status", ["published", "scheduled"]).lte("publish_at", now)),
      count(db.from("cms_articles").select("id", { count: "exact", head: true }).eq("status", "draft")),
      count(db.from("cms_articles").select("id", { count: "exact", head: true }).eq("status", "scheduled").gt("publish_at", now)),
      count(db.from("cms_media").select("id", { count: "exact", head: true })),
      count(db.from("cms_messages").select("id", { count: "exact", head: true }).eq("read", false).eq("archived", false)),
      count(db.from("cms_subscribers").select("id", { count: "exact", head: true })),
      count(db.from("cms_page_views").select("id", { count: "exact", head: true }).gte("created_at", since7)),
      db.from("cms_page_views").select("path, created_at").gte("created_at", since30).limit(20000),
      db.from("cms_audit").select("*").order("created_at", { ascending: false }).limit(8),
      db.from("cms_articles").select("id, title, publish_at").eq("status", "scheduled").gt("publish_at", now).order("publish_at").limit(5),
    ]);
  const byDay: Record<string, number> = {};
  const byPath: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) byDay[new Date(Date.now() - i * 864e5).toISOString().slice(0, 10)] = 0;
  for (const r of viewsRows.data ?? []) {
    const d = r.created_at.slice(0, 10);
    if (d in byDay) byDay[d]++;
    byPath[r.path] = (byPath[r.path] ?? 0) + 1;
  }
  return {
    stats: { published, drafts, scheduled, media, unread, subs, views7 },
    series: Object.entries(byDay).map(([day, views]) => ({ day, views })),
    topPages: Object.entries(byPath)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([path, views]) => ({ path, views })),
    recent: recent.data ?? [],
    upcoming: upcoming.data ?? [],
  };
});

/* ───────────── Articles ───────────── */

const ArticleInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(2000).default(""),
  body_html: z.string().max(400000).default(""),
  cover_image: z.string().max(2000).default(""),
  topic: z.string().max(80).default("Technology"),
  tags: z.array(z.string().max(60)).max(30).default([]),
  status: z.enum(["draft", "scheduled", "published"]),
  publish_at: z.string().datetime({ offset: true }),
  seo_title: z.string().max(200).nullable().optional(),
  seo_description: z.string().max(400).nullable().optional(),
  og_image: z.string().max(2000).nullable().optional(),
});

export const adminListArticles = createServerFn({ method: "GET" })
  .inputValidator(z.object({ q: z.string().optional(), status: z.string().optional(), topic: z.string().optional() }))
  .handler(async ({ data }) => {
    const s = await S();
    await s.requireStaff();
    const db = await DB();
    let q = db
      .from("cms_articles")
      .select("id, slug, title, status, publish_at, topic, tags, cover_image, updated_at")
      .order("publish_at", { ascending: false })
      .limit(1000);
    const now = new Date().toISOString();
    if (data.status === "published") q = q.in("status", ["published", "scheduled"]).lte("publish_at", now);
    else if (data.status === "scheduled") q = q.eq("status", "scheduled").gt("publish_at", now);
    else if (data.status === "draft") q = q.eq("status", "draft");
    if (data.topic && data.topic !== "all") q = q.eq("topic", data.topic);
    if (data.q) q = q.ilike("title", `%${data.q}%`);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return (rows ?? []).map((row) => ({
      ...row,
      status: isArticleLive(row.status, row.publish_at) ? "published" : row.status,
    }));
  });

export const adminGetArticle = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const s = await S();
    await s.requireStaff();
    const db = await DB();
    const { data: row } = await db.from("cms_articles").select("*").eq("id", data.id).maybeSingle();
    return row && isArticleLive(row.status, row.publish_at) ? { ...row, status: "published" } : row;
  });

export const adminSaveArticle = createServerFn({ method: "POST" })
  .inputValidator(ArticleInput)
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("author");
    const db = await DB();
    if (me.role === "author") {
      if (data.status !== "draft") throw new Error("Authors can only save drafts.");
      if (data.id) {
        const { data: ex } = await db.from("cms_articles").select("author_id").eq("id", data.id).maybeSingle();
        if (ex && ex.author_id !== me.id) throw new Error("Authors can only edit their own drafts.");
      }
    }
    assertArticleReadyToPublish(data);
    const publication = resolveArticlePublication(data);
    const row = {
      ...data,
      ...publication,
      body_html: s.sanitizeHtml(data.body_html),
      updated_at: new Date().toISOString(),
    };
    if (data.id) {
      const { error } = await db.from("cms_articles").update(row).eq("id", data.id);
      if (error) throw new Error(error.message.includes("duplicate") ? "That URL slug is already used." : error.message);
      await s.audit(me, "update", "article", data.id, data.title);
      return { id: data.id };
    }
    const { id: _omit, ...insert } = row;
    const { data: created, error } = await db
      .from("cms_articles")
      .insert({ ...insert, author_id: me.id })
      .select("id")
      .single();
    if (error) throw new Error(error.message.includes("duplicate") ? "That URL slug is already used." : error.message);
    await s.audit(me, "create", "article", created.id, data.title);
    return { id: created.id };
  });

export const adminDeleteArticle = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    const { data: ex } = await db.from("cms_articles").select("title").eq("id", data.id).maybeSingle();
    await db.from("cms_articles").delete().eq("id", data.id);
    await s.audit(me, "delete", "article", data.id, ex?.title);
    return { ok: true };
  });

export const adminDuplicateArticle = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("author");
    const db = await DB();
    const { data: ex } = await db.from("cms_articles").select("*").eq("id", data.id).single();
    if (!ex) throw new Error("Not found");
    const { id: _i, created_at: _c, updated_at: _u, ...rest } = ex;
    const { data: created, error } = await db
      .from("cms_articles")
      .insert({ ...rest, slug: `${ex.slug}-copy-${Date.now().toString(36)}`, title: `${ex.title} (copy)`, status: "draft", author_id: me.id })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    await s.audit(me, "duplicate", "article", created.id, ex.title);
    return { id: created.id };
  });

export const adminImportArticles = createServerFn({ method: "POST" }).handler(async () => {
  const s = await S();
  const me = await s.requireStaff("editor");
  const db = await DB();
  const { articles } = await import("@/content/articles");
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rows = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    body_html: a.html ?? a.body.map((p) => `<p>${esc(p)}</p>`).join(""),
    cover_image: a.image,
    topic: a.topic,
    tags: a.tags ?? [],
    status: "published",
    publish_at: new Date(`${a.date}T09:00:00Z`).toISOString(),
    principles: a.principles ?? null,
    seo_title: a.seoTitle ?? a.title,
    seo_description: a.seoDescription ?? a.excerpt.slice(0, 390),
    og_image: a.image,
    author_id: me.id,
  }));
  let imported = 0;
  for (let i = 0; i < rows.length; i += 40) {
    const { error, count } = await db
      .from("cms_articles")
      .upsert(rows.slice(i, i + 40), { onConflict: "slug", ignoreDuplicates: true, count: "exact" });
    if (error) throw new Error(error.message);
    imported += count ?? 0;
  }
  await s.audit(me, "import", "article", null, `Imported ${imported} existing journal entries`);
  return { imported, total: rows.length };
});

/* ───────────── Collections (books, gallery, palimpsest, testimonials, readings) ───────────── */

const EntryInput = z.object({
  id: z.string().uuid().optional(),
  collection: z.enum(["books", "gallery", "palimpsest", "testimonials", "readings", "ecology", "inequality", "omeros", "podcast", "profile_roles", "home_ideas", "home_streams", "education_chapters", "field_notes"]),
  title: z.string().max(300).default(""),
  subtitle: z.string().max(300).nullable().optional(),
  body: z.string().max(20000).nullable().optional(),
  image_url: z.string().max(2000).nullable().optional(),
  link_url: z.string().max(2000).nullable().optional(),
  data: z.record(z.string(), z.unknown()).default({}),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  position: z.number().int().optional(),
  publish_at: z.string().datetime().nullable().optional(),
});

export const adminListEntries = createServerFn({ method: "GET" })
  .inputValidator(z.object({ collection: z.string() }))
  .handler(async ({ data }) => {
    const s = await S();
    await s.requireStaff();
    const db = await DB();
    const { data: rows } = await db
      .from("cms_entries")
      .select("*")
      .eq("collection", data.collection)
      .order("position")
      .order("created_at");
    return rows ?? [];
  });

export const adminSaveEntry = createServerFn({ method: "POST" })
  .inputValidator(EntryInput)
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    const row = { ...data, data: data.data as never, updated_at: new Date().toISOString() };
    if (data.id) {
      await db.from("cms_entries").update(row).eq("id", data.id);
      await s.audit(me, "update", data.collection, data.id, data.title);
      return { id: data.id };
    }
    const { count } = await db.from("cms_entries").select("id", { count: "exact", head: true }).eq("collection", data.collection);
    const { id: _o, ...ins } = row;
    const { data: c, error } = await db.from("cms_entries").insert({ ...ins, position: count ?? 0 }).select("id").single();
    if (error) throw new Error(error.message);
    await s.audit(me, "create", data.collection, c.id, data.title);
    return { id: c.id };
  });

export const adminDeleteEntry = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    const { data: ex } = await db.from("cms_entries").select("title, collection").eq("id", data.id).maybeSingle();
    await db.from("cms_entries").delete().eq("id", data.id);
    await s.audit(me, "delete", ex?.collection ?? "entry", data.id, ex?.title);
    return { ok: true };
  });

export const adminReorderEntries = createServerFn({ method: "POST" })
  .inputValidator(z.object({ ids: z.array(z.string().uuid()).max(500) }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    await Promise.all(data.ids.map((id, i) => db.from("cms_entries").update({ position: i }).eq("id", id)));
    await s.audit(me, "reorder", "collection", null, `${data.ids.length} items`);
    return { ok: true };
  });

/* ───────────── Pages ───────────── */

export const adminGetPages = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  await s.requireStaff();
  const db = await DB();
  const { data } = await db.from("cms_pages").select("*");
  return data ?? [];
});

export const adminSavePage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      key: z.string().max(60),
      data: z.record(z.string(), z.string().max(20000)),
      scheduleAt: z.string().datetime().nullable().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    const now = new Date().toISOString();
    if (data.scheduleAt && new Date(data.scheduleAt).getTime() > Date.now()) {
      const { data: ex } = await db.from("cms_pages").select("key").eq("key", data.key).maybeSingle();
      const sched = { scheduled_data: data.data, scheduled_at: data.scheduleAt, updated_at: now, updated_by: me.id };
      if (ex) await db.from("cms_pages").update(sched).eq("key", data.key);
      else await db.from("cms_pages").insert({ key: data.key, data: {}, ...sched });
      await s.audit(me, "schedule", "page", data.key, `Scheduled ${data.key} update for ${data.scheduleAt}`);
      return { ok: true, scheduled: true };
    }
    await db.from("cms_pages").upsert({ key: data.key, data: data.data, scheduled_data: null, scheduled_at: null, updated_at: now, updated_by: me.id });
    await s.audit(me, "update", "page", data.key, `Published ${data.key} content`);
    return { ok: true, scheduled: false };
  });

export const adminCancelPageSchedule = createServerFn({ method: "POST" })
  .inputValidator(z.object({ key: z.string().max(60) }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    await db.from("cms_pages").update({ scheduled_data: null, scheduled_at: null }).eq("key", data.key);
    await s.audit(me, "update", "page", data.key, `Cancelled scheduled ${data.key} update`);
    return { ok: true };
  });

/* ───────────── Media ───────────── */

export const adminListMedia = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  await s.requireStaff();
  const db = await DB();
  const { data } = await db.from("cms_media").select("*").order("created_at", { ascending: false }).limit(1000);
  return data ?? [];
});

export const adminUploadMedia = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    if (!(d instanceof FormData)) throw new Error("Expected form data");
    const file = d.get("file");
    if (!(file instanceof File)) throw new Error("No file");
    if (file.size > 50 * 1024 * 1024) throw new Error("Files must be under 50 MB");
    return { file, alt: String(d.get("alt") ?? "") };
  })
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("author");
    const db = await DB();
    const safe = data.file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-80);
    const path = `${new Date().toISOString().slice(0, 7)}/${Date.now().toString(36)}-${safe}`;
    const { error } = await db.storage
      .from("cms-media")
      .upload(path, await data.file.arrayBuffer(), { contentType: data.file.type, upsert: false });
    if (error) throw new Error(error.message);
    const { data: signed } = await db.storage.from("cms-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 20);
    const url = signed?.signedUrl ?? "";
    const { data: row } = await db
      .from("cms_media")
      .insert({ path, url, filename: data.file.name, content_type: data.file.type, size: data.file.size, alt: data.alt, created_by: me.id })
      .select("*")
      .single();
    await s.audit(me, "upload", "media", row?.id, data.file.name);
    return row;
  });

export const adminUpdateMedia = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid(), alt: z.string().max(500) }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("author");
    const db = await DB();
    await db.from("cms_media").update({ alt: data.alt }).eq("id", data.id);
    await s.audit(me, "update", "media", data.id, "Edited alt text");
    return { ok: true };
  });

export const adminDeleteMedia = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    const { data: m } = await db.from("cms_media").select("path, filename").eq("id", data.id).maybeSingle();
    if (m) await db.storage.from("cms-media").remove([m.path]);
    await db.from("cms_media").delete().eq("id", data.id);
    await s.audit(me, "delete", "media", data.id, m?.filename);
    return { ok: true };
  });

export const adminMediaUsage = createServerFn({ method: "POST" })
  .inputValidator(z.object({ url: z.string().max(3000) }))
  .handler(async ({ data }) => {
    const s = await S();
    await s.requireStaff();
    const db = await DB();
    const key = data.url.split("?")[0].split("/").pop() ?? data.url;
    const [a, e] = await Promise.all([
      db.from("cms_articles").select("id, title").or(`cover_image.ilike.%${key}%,body_html.ilike.%${key}%`).limit(20),
      db.from("cms_entries").select("id, title, collection").ilike("image_url", `%${key}%`).limit(20),
    ]);
    return [
      ...(a.data ?? []).map((r) => ({ label: `Article: ${r.title}` })),
      ...(e.data ?? []).map((r) => ({ label: `${r.collection}: ${r.title}` })),
    ];
  });

/* ───────────── Inbox & subscribers ───────────── */

export const adminListMessages = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  await s.requireStaff();
  const db = await DB();
  const { data } = await db.from("cms_messages").select("*").order("created_at", { ascending: false }).limit(1000);
  return data ?? [];
});

export const adminUpdateMessage = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid(), read: z.boolean().optional(), archived: z.boolean().optional(), remove: z.boolean().optional() }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    if (data.remove) {
      await db.from("cms_messages").delete().eq("id", data.id);
      await s.audit(me, "delete", "message", data.id);
    } else {
      const patch: { read?: boolean; archived?: boolean } = {};
      if (data.read !== undefined) patch.read = data.read;
      if (data.archived !== undefined) patch.archived = data.archived;
      await db.from("cms_messages").update(patch).eq("id", data.id);
    }
    return { ok: true };
  });

export const adminListSubscribers = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  await s.requireStaff();
  const db = await DB();
  const { data } = await db.from("cms_subscribers").select("*").order("created_at", { ascending: false }).limit(5000);
  return data ?? [];
});

export const adminDeleteSubscriber = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("editor");
    const db = await DB();
    await db.from("cms_subscribers").delete().eq("id", data.id);
    await s.audit(me, "delete", "subscriber", data.id);
    return { ok: true };
  });

/* ───────────── Staff & roles ───────────── */

export const adminListStaff = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  await s.requireStaff("owner");
  const db = await DB();
  const { data } = await db
    .from("cms_staff")
    .select("id, phone, name, email, avatar_url, active, last_login_at, created_at, cms_staff_roles(role)")
    .order("created_at");
  return (data ?? []).map((r) => {
    const rr = (r as unknown as { cms_staff_roles: { role: string } | { role: string }[] | null }).cms_staff_roles;
    const { cms_staff_roles: _x, ...rest } = r as typeof r & { cms_staff_roles: unknown };
    return { ...rest, role: (Array.isArray(rr) ? rr[0]?.role : rr?.role) ?? "viewer" };
  });
});

export const adminSaveStaff = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().uuid().optional(),
      phone: z.string().min(6).max(20),
      name: z.string().max(120).default(""),
      email: z.string().email().max(200).nullable().optional().or(z.literal("")),
      role: z.enum(["owner", "editor", "author", "viewer"]),
      otp: z.string().regex(/^\d{4,8}$/, "Code must be 4–8 digits").optional().or(z.literal("")),
      active: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("owner");
    const db = await DB();
    const phone = s.normalizePhone(data.phone);
    if (data.id === me.id && (data.role !== "owner" || !data.active)) throw new Error("You can't demote or deactivate yourself.");
    const base = { phone, name: data.name, email: data.email || null, active: data.active };
    let id = data.id;
    if (id) {
      const patch = data.otp ? { ...base, otp_hash: await s.sha256(data.otp) } : base;
      const { error } = await db.from("cms_staff").update(patch).eq("id", id);
      if (error) throw new Error(error.message.includes("duplicate") ? "That number is already a team member." : error.message);
    } else {
      if (!data.otp) throw new Error("Set a login code for the new member.");
      const { data: c, error } = await db.from("cms_staff").insert({ ...base, otp_hash: await s.sha256(data.otp) }).select("id").single();
      if (error) throw new Error(error.message.includes("duplicate") ? "That number is already a team member." : error.message);
      id = c.id;
    }
    await db.from("cms_staff_roles").upsert({ staff_id: id!, role: data.role }, { onConflict: "staff_id" });
    if (!data.active) await db.from("cms_sessions").delete().eq("staff_id", id!);
    await s.audit(me, data.id ? "update" : "create", "staff", id, `${data.name || phone} · ${data.role}`);
    return { id };
  });

export const adminDeleteStaff = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff("owner");
    if (data.id === me.id) throw new Error("You can't remove yourself.");
    const db = await DB();
    await db.from("cms_staff").delete().eq("id", data.id);
    await s.audit(me, "delete", "staff", data.id);
    return { ok: true };
  });

/* ───────────── Audit & profile ───────────── */

export const adminListAudit = createServerFn({ method: "GET" })
  .inputValidator(z.object({ staffId: z.string().optional(), entity: z.string().optional(), limit: z.number().max(1000).default(300) }))
  .handler(async ({ data }) => {
    const s = await S();
    await s.requireStaff("editor");
    const db = await DB();
    let q = db.from("cms_audit").select("*").order("created_at", { ascending: false }).limit(data.limit);
    if (data.staffId) q = q.eq("staff_id", data.staffId);
    if (data.entity && data.entity !== "all") q = q.eq("entity", data.entity);
    const { data: rows } = await q;
    return rows ?? [];
  });

export const adminMyActivity = createServerFn({ method: "GET" }).handler(async () => {
  const s = await S();
  const me = await s.requireStaff();
  const db = await DB();
  const { data } = await db.from("cms_audit").select("*").eq("staff_id", me.id).order("created_at", { ascending: false }).limit(15);
  return data ?? [];
});

export const adminUpdateProfile = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().max(120),
      email: z.string().email().max(200).or(z.literal("")),
      avatar_url: z.string().max(3000).or(z.literal("")),
      bio: z.string().max(1000).or(z.literal("")),
      currentOtp: z.string().optional(),
      newOtp: z.string().regex(/^\d{4,8}$/).optional().or(z.literal("")),
    }),
  )
  .handler(async ({ data }) => {
    const s = await S();
    const me = await s.requireStaff();
    const db = await DB();
    const patch: { name: string; email: string | null; avatar_url: string | null; bio: string | null; otp_hash?: string } = {
      name: data.name,
      email: data.email || null,
      avatar_url: data.avatar_url || null,
      bio: data.bio || null,
    };
    if (data.newOtp) {
      const { data: row } = await db.from("cms_staff").select("otp_hash").eq("id", me.id).single();
      if (!data.currentOtp || row?.otp_hash !== (await s.sha256(data.currentOtp))) throw new Error("Current code is incorrect.");
      patch.otp_hash = await s.sha256(data.newOtp);
    }
    await db.from("cms_staff").update(patch).eq("id", me.id);
    await s.audit(me, "update", "profile", me.id, data.newOtp ? "Updated profile and login code" : "Updated profile");
    return { ok: true };
  });

/* ───────────── AI assist ───────────── */

export const adminAiAssist = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      kind: z.enum(["seo_title", "seo_description", "excerpt", "alt", "tags"]),
      title: z.string().max(400).default(""),
      text: z.string().max(30000).default(""),
    }),
  )
  .handler(async ({ data }) => {
    const s = await S();
    await s.requireStaff("author");
    if (!process.env.ANTHROPIC_API_KEY) return { suggestions: [] as string[], error: "AI is not available right now." };
    const asks: Record<typeof data.kind, string> = {
      seo_title: "Write 3 SEO page titles (max 60 characters each).",
      seo_description: "Write 3 meta descriptions (140–155 characters each).",
      excerpt: "Write 3 alternative excerpts of 2 sentences each.",
      alt: "Write 3 concise, descriptive image alt texts (max 120 characters).",
      tags: "Suggest 3 comma-separated tag sets of 4–6 tags each.",
    };
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic();
    let raw = "[]";
    try {
      const res = await client.beta.messages.create({
        model: "claude-opus-5-5",
        max_tokens: 16000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        system:
          "You are the editorial assistant for Dr. Fazal Ibrahim Ali, a Trinidad-born, Cambridge-educated writer on critical theory in AI. Write in a measured, literary British-English voice, third person, no hype, no em dashes. Reply ONLY with a JSON array of strings.",
        messages: [
          { role: "user", content: `${asks[data.kind]}\n\nTitle: ${data.title}\n\nContent:\n${data.text.slice(0, 12000)}` },
        ],
      });
      if (res.stop_reason === "refusal") return { suggestions: [], error: "AI declined this request." };
      raw = res.content.map((b) => (b.type === "text" ? b.text : "")).join("") || "[]";
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) return { suggestions: [], error: "Too many requests, try again in a moment." };
      console.error("adminAiAssist", err);
      return { suggestions: [], error: "AI request failed." };
    }
    try {
      const arr = JSON.parse(raw.replace(/```json|```/g, "").trim());
      return { suggestions: (Array.isArray(arr) ? arr : []).map(String).slice(0, 3) };
    } catch {
      return { suggestions: [raw.trim()] };
    }
  });
