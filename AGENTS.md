
## Admin CMS
- `/admin` uses its own phone + code login (cms_staff, cms_staff_roles, cms_sessions with an httpOnly cookie), not Lovable Cloud Auth, because staff sign in by mobile number without email accounts.
- Every admin server function calls `requireStaff(minRole)` from `src/lib/admin/session.server.ts` and uses the service-role client; CMS tables have no anon write policies.
- Public CMS reads use `createPublicCmsClient` with the publishable key and RLS, never the staff credential, so public rendering also works on Vercel without admin-only environment access.
- Once any row exists in `cms_articles`, the Journal reads only from the database; `src/content/articles.ts` is the fallback/seed source for "Sync existing entries".
- Books, gallery, palimpsest, readings and testimonials share the `cms_entries` table keyed by `collection`; editable page text lives in `cms_pages` with defaults declared in `src/lib/cms-schema.ts`.
- Media lives in the private `cms-media` bucket served through long-lived signed URLs, because the workspace blocks public buckets.
- Public content uses CMS-first collections with static source files only as an empty-database fallback, so the site remains available before editors populate a section.
- Every public text/media item is declared as a field in `PAGE_SCHEMAS` (src/lib/cms-schema.ts) and read via `useCmsText`/`useCmsSaved`; banners use `<PageHero cmsKey>`, so adding a field there makes it editable in /admin without new admin code.
- Page edits can be scheduled (`cms_pages.scheduled_data/scheduled_at`) and entries via `cms_entries.publish_at`; schedules are applied lazily on the next public read, so no cron is required.
- Collection pages offer "Import what the site shows now" from `src/lib/cms-builtins.ts`; keep it in sync when a page's built-in fallback content changes, so editors never start from a blank list.
- Public route `head()`s are wrapped in `withSeo(pageKey, ctx, …)` (src/lib/seo.ts), which overlays the admin "Search & sharing" fields from the root loader, so SEO edits apply during SSR.
- Palimpsest photo framing is a responsive, repeating layout rhythm in its route; keep the CMS images and section order unchanged so visual changes never detach photos from their historical text.
