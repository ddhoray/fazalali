import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { KeyRound, Loader2, LogOut, Save } from "lucide-react";
import { toast } from "sonner";
import { adminLogout, adminMyActivity, adminUpdateProfile } from "@/lib/admin/admin.functions";
import { Field, ImageField, PageHeader, Panel, StatusBadge, inputCls, timeAgo } from "@/components/admin/AdminUi";

export const Route = createFileRoute("/admin/profile")({ component: ProfilePage });

function ProfilePage() {
  const { me } = Route.useRouteContext();
  const update = useServerFn(adminUpdateProfile);
  const logout = useServerFn(adminLogout);
  const activity = useServerFn(adminMyActivity);
  const router = useRouter();
  const navigate = useNavigate();
  const { data: acts = [] } = useQuery({ queryKey: ["admin", "my-activity"], queryFn: () => activity() });
  const [f, setF] = useState({ name: me?.name ?? "", email: me?.email ?? "", avatar_url: me?.avatar_url ?? "", bio: me?.bio ?? "" });
  const [codes, setCodes] = useState({ currentOtp: "", newOtp: "" });
  const [busy, setBusy] = useState(false);
  if (!me) return null;

  async function submit(withCode: boolean) {
    setBusy(true);
    try {
      await update({ data: { ...f, ...(withCode ? codes : {}) } });
      toast.success(withCode ? "Login code changed" : "Profile saved");
      setCodes({ currentOtp: "", newOtp: "" });
      router.invalidate();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Account" title="My profile" description="How you appear in the admin and audit log." />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Panel className="p-6 text-center">
          <div className="mx-auto flex size-28 items-center justify-center overflow-hidden bg-foreground font-display text-4xl text-background">
            {f.avatar_url ? <img src={f.avatar_url} alt="" className="size-full object-cover" /> : (f.name || "A").slice(0, 1)}
          </div>
          <p className="mt-4 font-display text-2xl">{f.name || "Unnamed"}</p>
          <p className="text-sm text-muted-foreground">+91 {me.phone}</p>
          <div className="mt-3"><StatusBadge status={me.role} /></div>
          {f.bio && <p className="mt-4 text-sm text-muted-foreground">{f.bio}</p>}
          <button
            onClick={async () => {
              await logout();
              navigate({ to: "/admin/login", replace: true });
            }}
            className="mt-6 inline-flex items-center gap-2 text-sm text-destructive"
          >
            <LogOut className="size-4" /> Sign out
          </button>
          <div className="mt-8 border-t border-border pt-5 text-left">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Your recent activity</p>
            <ul className="mt-3 space-y-2 text-xs">
              {acts.map((a) => (
                <li key={a.id} className="flex justify-between gap-2">
                  <span className="truncate">{a.action} {a.entity}{a.summary ? ` · ${a.summary}` : ""}</span>
                  <span className="shrink-0 text-muted-foreground">{timeAgo(a.created_at)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel className="space-y-5 p-6">
            <p className="font-display text-xl">Details</p>
            <ImageField label="Photo" value={f.avatar_url} onChange={(v) => setF({ ...f, avatar_url: v })} />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name"><input className={inputCls} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
              <Field label="Email"><input type="email" className={inputCls} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
            </div>
            <Field label="Mobile number" hint="Ask an owner to change this"><input disabled className={`${inputCls} opacity-60`} value={`+91 ${me.phone}`} /></Field>
            <Field label="Short bio"><textarea rows={3} className={inputCls} value={f.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} /></Field>
            <button disabled={busy} onClick={() => submit(false)} className="inline-flex items-center gap-2 bg-omeros px-5 py-2.5 text-sm text-background">
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save profile
            </button>
          </Panel>
          <Panel className="space-y-5 p-6">
            <p className="flex items-center gap-2 font-display text-xl"><KeyRound className="size-5" /> Login code</p>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Current code"><input type="password" inputMode="numeric" className={inputCls} value={codes.currentOtp} onChange={(e) => setCodes({ ...codes, currentOtp: e.target.value.replace(/\D/g, "") })} /></Field>
              <Field label="New code (4–8 digits)"><input type="password" inputMode="numeric" maxLength={8} className={inputCls} value={codes.newOtp} onChange={(e) => setCodes({ ...codes, newOtp: e.target.value.replace(/\D/g, "") })} /></Field>
            </div>
            <button disabled={busy || codes.newOtp.length < 4} onClick={() => submit(true)} className="border border-border px-5 py-2.5 text-sm disabled:opacity-50">
              Change code
            </button>
          </Panel>
        </div>
      </div>
    </div>
  );
}
