import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { adminDeleteStaff, adminListStaff, adminSaveStaff } from "@/lib/admin/admin.functions";
import { Field, PageHeader, Panel, StatusBadge, Toggle, fmtDateTime, inputCls } from "@/components/admin/AdminUi";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/admin/staff")({
  beforeLoad: ({ context }) => {
    if (context.me?.role !== "owner") throw redirect({ to: "/admin" });
  },
  component: StaffPage,
});

type Role = "owner" | "editor" | "author" | "viewer";
type Form = { id?: string; phone: string; name: string; email: string; role: Role; otp: string; active: boolean };
const ROLES: { role: Role; desc: string }[] = [
  { role: "owner", desc: "Everything, including team and settings" },
  { role: "editor", desc: "Publish and manage all content, media and inbox" },
  { role: "author", desc: "Write and save their own drafts, upload media" },
  { role: "viewer", desc: "Read-only access to the admin" },
];

function StaffPage() {
  const { me } = Route.useRouteContext();
  const list = useServerFn(adminListStaff);
  const save = useServerFn(adminSaveStaff);
  const del = useServerFn(adminDeleteStaff);
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["admin", "staff"], queryFn: () => list() });
  const [f, setF] = useState<Form | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Team"
        title="Staff & roles"
        description="Add people who can sign in to the admin with their mobile number and a personal code."
        actions={
          <button onClick={() => setF({ phone: "", name: "", email: "", role: "editor", otp: "", active: true })} className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background">
            <Plus className="size-4" /> Add member
          </button>
        }
      />
      <div className="grid gap-3 md:grid-cols-4">
        {ROLES.map((r) => (
          <Panel key={r.role} className="p-4">
            <StatusBadge status={r.role} />
            <p className="mt-2 text-xs text-muted-foreground">{r.desc}</p>
            <p className="mt-3 font-display text-2xl">{data.filter((s) => s.role === r.role).length}</p>
          </Panel>
        ))}
      </div>
      <Panel className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <th className="px-4 py-3 font-normal">Member</th>
              <th className="px-4 py-3 font-normal">Role</th>
              <th className="hidden px-4 py-3 font-normal md:table-cell">Last sign in</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center overflow-hidden bg-foreground text-xs text-background">
                      {s.avatar_url ? <img src={s.avatar_url} alt="" className="size-full object-cover" /> : (s.name || "?").slice(0, 1)}
                    </span>
                    <span>
                      <span className="block font-medium">{s.name || "Unnamed"} {s.id === me?.id && <span className="text-xs text-muted-foreground">(you)</span>}</span>
                      <span className="text-xs text-muted-foreground">+91 {s.phone}{s.email ? ` · ${s.email}` : ""}</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={s.role} /></td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{fmtDateTime(s.last_login_at)}</td>
                <td className="px-4 py-3 text-xs">{s.active ? <span className="text-success">Active</span> : <span className="text-muted-foreground">Deactivated</span>}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1 text-muted-foreground [&_button]:inline-flex [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:items-center [&_button]:justify-center [&_svg]:size-4">
                    <button title="Edit" onClick={() => setF({ id: s.id, phone: s.phone, name: s.name, email: s.email ?? "", role: s.role as Role, otp: "", active: s.active })}><Pencil /></button>
                    {s.id !== me?.id && (
                      <button title="Remove" className="hover:text-destructive" onClick={async () => { if (!confirm(`Remove ${s.name || s.phone}?`)) return; await del({ data: { id: s.id } }); toast.success("Removed"); qc.invalidateQueries({ queryKey: ["admin", "staff"] }); }}>
                        <Trash2 />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Sheet open={!!f} onOpenChange={(o) => !o && setF(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader><SheetTitle className="flex items-center gap-2 font-display text-2xl"><Shield className="size-5" /> {f?.id ? "Edit member" : "New member"}</SheetTitle></SheetHeader>
          {f && (
            <form
              className="space-y-5 px-4 pb-8"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await save({ data: { ...f, email: f.email || null } });
                  toast.success("Saved");
                  setF(null);
                  qc.invalidateQueries({ queryKey: ["admin", "staff"] });
                } catch (err) {
                  toast.error((err as Error).message);
                }
              }}
            >
              <Field label="Full name"><input required className={inputCls} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
              <Field label="Mobile number"><input required inputMode="numeric" className={inputCls} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="10-digit number" /></Field>
              <Field label="Email (optional)"><input type="email" className={inputCls} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
              <Field label="Role">
                <div className="space-y-2">
                  {ROLES.map((r) => (
                    <label key={r.role} className={`flex cursor-pointer items-start gap-3 border p-3 ${f.role === r.role ? "border-omeros bg-omeros-soft" : "border-border"}`}>
                      <input type="radio" className="mt-1" checked={f.role === r.role} onChange={() => setF({ ...f, role: r.role })} />
                      <span><span className="block text-sm capitalize">{r.role}</span><span className="text-xs text-muted-foreground">{r.desc}</span></span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label={f.id ? "New login code (leave blank to keep)" : "Login code"} hint="4–8 digits">
                <input inputMode="numeric" maxLength={8} className={inputCls} value={f.otp} onChange={(e) => setF({ ...f, otp: e.target.value.replace(/\D/g, "") })} placeholder="e.g. 4821" />
              </Field>
              <Toggle checked={f.active} onChange={(v) => setF({ ...f, active: v })} label="Active (can sign in)" />
              <button className="w-full bg-omeros py-3 text-sm text-background">Save member</button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
