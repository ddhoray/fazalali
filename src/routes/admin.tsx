import { createFileRoute, Link, Outlet, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Images,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  Newspaper,
  PanelsTopLeft,
  Shield,
  History,
  Trees,
  UserRound,
  X,
  Library,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { adminLogout, adminMe } from "@/lib/admin/admin.functions";
import { cn } from "@/lib/utils";
import mark from "@/assets/brand-omeros-mark.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Omeros Admin" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Omeros content management." },
      { property: "og:title", content: "Omeros Admin" },
      { property: "og:description", content: "Omeros content management." },
    ],
  }),
  beforeLoad: async ({ location }) => {
    if (location.pathname.startsWith("/admin/login")) return { me: null };
    const me = await adminMe();
    if (!me) throw redirect({ to: "/admin/login" });
    return { me };
  },
  component: AdminLayout,
});

type NavItem = { to: string; label: string; icon: ReactNode; params?: Record<string, string>; min?: "editor" | "owner" };
const NAV: { group: string; items: NavItem[] }[] = [
  { group: "Overview", items: [{ to: "/admin", label: "Dashboard", icon: <LayoutDashboard /> }] },
  {
    group: "Content",
    items: [
      { to: "/admin/articles", label: "Journal", icon: <Newspaper /> },
      { to: "/admin/pages", label: "Site pages", icon: <PanelsTopLeft /> },
      { to: "/admin/collections/$collection", params: { collection: "books" }, label: "Books", icon: <BookOpen /> },
      { to: "/admin/collections/$collection", params: { collection: "gallery" }, label: "Gallery", icon: <Images /> },
      { to: "/admin/collections/$collection", params: { collection: "palimpsest" }, label: "Palimpsest", icon: <Layers /> },
      { to: "/admin/collections/$collection", params: { collection: "education_chapters" }, label: "Education themes", icon: <BookOpen /> },
      { to: "/admin/collections/$collection", params: { collection: "field_notes" }, label: "Field notes photos", icon: <Images /> },
      { to: "/admin/collections/$collection", params: { collection: "readings" }, label: "Ecology & Inequality", icon: <Trees /> },
      { to: "/admin/collections/$collection", params: { collection: "testimonials" }, label: "Testimonials", icon: <MessageSquareQuote /> },
      { to: "/admin/collections/$collection", params: { collection: "ecology" }, label: "Ecology sections", icon: <Trees /> },
      { to: "/admin/collections/$collection", params: { collection: "inequality" }, label: "Inequality sections", icon: <Layers /> },
      { to: "/admin/collections/$collection", params: { collection: "omeros" }, label: "Omeros AI", icon: <FileText /> },
      { to: "/admin/collections/$collection", params: { collection: "podcast" }, label: "Podcast", icon: <Library /> },
      { to: "/admin/collections/$collection", params: { collection: "home_ideas" }, label: "Homepage ideas", icon: <Sparkles /> },
      { to: "/admin/collections/$collection", params: { collection: "home_streams" }, label: "Homepage streams", icon: <PanelsTopLeft /> },
      { to: "/admin/collections/$collection", params: { collection: "profile_roles" }, label: "Profile timeline", icon: <UserRound /> },
    ],
  },
  { group: "Media", items: [{ to: "/admin/media", label: "Media library", icon: <Library /> }] },
  {
    group: "Audience",
    items: [
      { to: "/admin/inbox", label: "Inbox", icon: <Inbox /> },
      { to: "/admin/subscribers", label: "Newsletter", icon: <Mail /> },
    ],
  },
  {
    group: "Team",
    items: [
      { to: "/admin/staff", label: "Staff & roles", icon: <Shield />, min: "owner" },
      { to: "/admin/audit", label: "Audit log", icon: <History />, min: "editor" },
      { to: "/admin/profile", label: "My profile", icon: <UserRound /> },
    ],
  },
];
const RANK = { viewer: 0, author: 1, editor: 2, owner: 3 } as const;

function AdminLayout() {
  const { me } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<Record<string, boolean>>(() => Object.fromEntries(NAV.map((g) => [g.group, true])));
  const logout = useServerFn(adminLogout);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("omeros-admin-nav");
      if (saved) setGroups((current) => ({ ...current, ...JSON.parse(saved) }));
    } catch {
      // Navigation remains fully expanded if stored preferences are unavailable.
    }
  }, []);

  const toggleGroup = (group: string) => {
    setGroups((current) => {
      const next = { ...current, [group]: !current[group] };
      window.localStorage.setItem("omeros-admin-nav", JSON.stringify(next));
      return next;
    });
  };

  if (!me) {
    return (
      <>
        <Outlet />
        <Toaster position="top-center" />
      </>
    );
  }

  const isActive = (it: NavItem) => {
    const href = it.params ? it.to.replace("$collection", it.params.collection) : it.to;
    return href === "/admin" ? pathname === "/admin" || pathname === "/admin/" : pathname.startsWith(href);
  };

  const sidebar = (
    <nav className="flex h-full flex-col">
      <div className="flex h-[72px] items-center gap-3 border-b border-border px-5">
        <img src={mark} alt="" className="size-8 object-contain" />
        <div className="leading-tight">
          <p className="font-display text-base tracking-tight">Omeros</p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Admin</p>
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {NAV.map((g) => {
          const items = g.items.filter((i) => !i.min || RANK[me.role] >= RANK[i.min]);
          if (!items.length) return null;
          return (
            <div key={g.group} className="border-b border-border pb-2 last:border-0">
              <button
                type="button"
                onClick={() => toggleGroup(g.group)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                aria-expanded={groups[g.group] !== false}
              >
                {g.group}
                <ChevronDown className={cn("size-3.5 transition-transform", groups[g.group] === false && "-rotate-90")} />
              </button>
              <div className={cn("grid transition-[grid-template-rows]", groups[g.group] === false ? "grid-rows-[0fr]" : "grid-rows-[1fr]")}>
                <div className="overflow-hidden">
                {items.map((it) => (
                <Link
                  key={it.label}
                  to={it.to as "/admin"}
                  params={it.params as never}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "my-0.5 flex min-h-10 items-center gap-3 px-3 py-2 text-sm transition-colors [&_svg]:size-4",
                    isActive(it) ? "bg-foreground text-background" : "text-foreground/75 hover:bg-muted hover:text-foreground",
                  )}
                >
                  {it.icon}
                  {it.label}
                </Link>
                ))}
                </div>
              </div>
            </div>
          );
        })}
        <div className="border-t border-border pt-2">
          <button
            type="button"
            onClick={async () => {
              await logout();
              navigate({ to: "/admin/login", replace: true });
            }}
            className="my-0.5 flex min-h-10 w-full items-center gap-3 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 [&_svg]:size-4"
          >
            <LogOut />
            Sign out
          </button>
        </div>
      </div>
      <div className="border-t border-border p-3">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/75 hover:bg-muted [&_svg]:size-4">
          <ExternalLink /> View website
        </a>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-background lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[min(88vw,320px)] bg-background shadow-2xl">{sidebar}</aside>
        </div>
      )}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:px-8">
          <Button variant="ghost" size="icon" className="min-h-11 min-w-11 rounded-none lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <p className="hidden text-xs uppercase tracking-[0.22em] text-muted-foreground sm:block">omeros.hyperrevamp.com</p>
          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
            <Link to="/admin/articles/$id" params={{ id: "new" }} aria-label="New entry" className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 bg-omeros p-2 text-xs uppercase tracking-[0.16em] text-background sm:min-h-0 sm:min-w-0 sm:px-3 sm:py-2">
              <FileText className="size-4" /> <span className="hidden sm:inline">New entry</span>
            </Link>
            <Link to="/admin/profile" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center overflow-hidden bg-foreground text-xs text-background">
                {me.avatar_url ? <img src={me.avatar_url} alt="" className="size-full object-cover" /> : (me.name || "A").slice(0, 1).toUpperCase()}
              </span>
              <span className="hidden min-w-0 text-left leading-tight sm:block">
                <span className="block text-sm">{me.name || me.phone}</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{me.role}</span>
              </span>
            </Link>
            <button
              onClick={async () => {
                await logout();
                navigate({ to: "/admin/login", replace: true });
              }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1480px] px-4 py-6 sm:px-6 md:px-8 md:py-9">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
