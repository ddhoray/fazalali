ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS scheduled_data jsonb;
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS scheduled_at timestamptz;
ALTER TABLE public.cms_entries ADD COLUMN IF NOT EXISTS publish_at timestamptz;