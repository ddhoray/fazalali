create table public.cms_staff (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  name text not null default '',
  email text,
  avatar_url text,
  bio text,
  otp_hash text not null,
  active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.cms_staff_roles (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.cms_staff(id) on delete cascade unique,
  role text not null default 'editor' check (role in ('owner','editor','author','viewer'))
);
create table public.cms_sessions (
  token_hash text primary key,
  staff_id uuid not null references public.cms_staff(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create table public.cms_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body_html text not null default '',
  cover_image text not null default '',
  topic text not null default 'Technology',
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','scheduled','published')),
  publish_at timestamptz not null default now(),
  seo_title text,
  seo_description text,
  og_image text,
  principles jsonb,
  author_id uuid references public.cms_staff(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.cms_articles (status, publish_at desc);
create table public.cms_entries (
  id uuid primary key default gen_random_uuid(),
  collection text not null,
  title text not null default '',
  subtitle text,
  body text,
  image_url text,
  link_url text,
  data jsonb not null default '{}'::jsonb,
  position int not null default 0,
  published boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.cms_entries (collection, position);
create table public.cms_pages (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.cms_staff(id) on delete set null
);
create table public.cms_media (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  url text not null,
  filename text not null,
  content_type text not null default '',
  size bigint not null default 0,
  alt text not null default '',
  created_by uuid references public.cms_staff(id) on delete set null,
  created_at timestamptz not null default now()
);
create table public.cms_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.cms_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
create table public.cms_audit (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid references public.cms_staff(id) on delete set null,
  staff_name text,
  action text not null,
  entity text not null,
  entity_id text,
  summary text,
  created_at timestamptz not null default now()
);
create index on public.cms_audit (created_at desc);
create table public.cms_page_views (
  id bigint generated always as identity primary key,
  path text not null,
  created_at timestamptz not null default now()
);
create index on public.cms_page_views (created_at desc);

grant all on public.cms_staff, public.cms_staff_roles, public.cms_sessions, public.cms_articles, public.cms_entries, public.cms_pages, public.cms_media, public.cms_messages, public.cms_subscribers, public.cms_audit, public.cms_page_views to service_role;
grant select on public.cms_articles, public.cms_entries, public.cms_pages to anon, authenticated;

alter table public.cms_staff enable row level security;
alter table public.cms_staff_roles enable row level security;
alter table public.cms_sessions enable row level security;
alter table public.cms_articles enable row level security;
alter table public.cms_entries enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_messages enable row level security;
alter table public.cms_subscribers enable row level security;
alter table public.cms_audit enable row level security;
alter table public.cms_page_views enable row level security;

create policy "Public reads published articles" on public.cms_articles for select to anon, authenticated
  using (status in ('published','scheduled') and publish_at <= now());
create policy "Public reads published entries" on public.cms_entries for select to anon, authenticated
  using (published);
create policy "Public reads pages" on public.cms_pages for select to anon, authenticated using (true);

-- Seed administrator (OTP 1122, sha256)
insert into public.cms_staff (phone, name, otp_hash)
values ('8105391122', 'Administrator', encode(sha256('1122'::bytea), 'hex'));
insert into public.cms_staff_roles (staff_id, role)
select id, 'owner' from public.cms_staff where phone = '8105391122';
