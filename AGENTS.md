
## Admin CMS
- `/admin` uses its own phone + code login (cms_staff, cms_staff_roles, cms_sessions with an httpOnly cookie), not Lovable Cloud Auth, because staff sign in by mobile number without email accounts.
- Every admin server function calls `requireStaff(minRole)` from `src/lib/admin/session.server.ts` and uses the service-role client; CMS tables have no anon write policies.
- Once any row exists in `cms_articles`, the Journal reads only from the database; `src/content/articles.ts` is the fallback/seed source for "Sync existing entries".
- Books, gallery, palimpsest, readings and testimonials share the `cms_entries` table keyed by `collection`; editable page text lives in `cms_pages` with defaults declared in `src/lib/cms-schema.ts`.
- Media lives in the private `cms-media` bucket served through long-lived signed URLs, because the workspace blocks public buckets.
