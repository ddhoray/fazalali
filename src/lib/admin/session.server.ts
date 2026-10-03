import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const SESSION_COOKIE = "omeros_admin";
export type Role = "owner" | "editor" | "author" | "viewer";
export interface StaffUser {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: Role;
}

export async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function normalizePhone(p: string) {
  const d = p.replace(/\D/g, "");
  return d.length > 10 ? d.slice(-10) : d;
}

export async function createSession(staffId: string) {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  await supabaseAdmin
    .from("cms_sessions")
    .insert({ token_hash: await sha256(token), staff_id: staffId, expires_at: expires.toISOString() });
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function destroySession() {
  const token = getCookie(SESSION_COOKIE);
  if (token) await supabaseAdmin.from("cms_sessions").delete().eq("token_hash", await sha256(token));
  deleteCookie(SESSION_COOKIE, { path: "/" });
}

export async function currentStaff(): Promise<StaffUser | null> {
  const token = getCookie(SESSION_COOKIE);
  if (!token) return null;
  const { data: s } = await supabaseAdmin
    .from("cms_sessions")
    .select("staff_id, expires_at")
    .eq("token_hash", await sha256(token))
    .maybeSingle();
  if (!s || new Date(s.expires_at) < new Date()) return null;
  const { data: staff } = await supabaseAdmin
    .from("cms_staff")
    .select("id, phone, name, email, avatar_url, bio, active, cms_staff_roles(role)")
    .eq("id", s.staff_id)
    .maybeSingle();
  if (!staff || !staff.active) return null;
  const roleRow = (staff as unknown as { cms_staff_roles: { role: Role } | { role: Role }[] | null })
    .cms_staff_roles;
  const role = (Array.isArray(roleRow) ? roleRow[0]?.role : roleRow?.role) ?? "viewer";
  return {
    id: staff.id,
    phone: staff.phone,
    name: staff.name,
    email: staff.email,
    avatar_url: staff.avatar_url,
    bio: staff.bio,
    role,
  };
}

const RANK: Record<Role, number> = { viewer: 0, author: 1, editor: 2, owner: 3 };

export async function requireStaff(min: Role = "viewer") {
  const me = await currentStaff();
  if (!me) throw new Error("UNAUTHORIZED");
  if (RANK[me.role] < RANK[min]) throw new Error("FORBIDDEN");
  return me;
}

export async function audit(
  me: StaffUser,
  action: string,
  entity: string,
  entityId?: string | null,
  summary?: string,
) {
  await supabaseAdmin.from("cms_audit").insert({
    staff_id: me.id,
    staff_name: me.name || me.phone,
    action,
    entity,
    entity_id: entityId ?? null,
    summary: summary ?? null,
  });
}

/** Strip scripts, event handlers and javascript: URLs from staff-authored HTML. */
export function sanitizeHtml(html: string) {
  return html
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
}
