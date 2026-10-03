# Omeros Admin Panel (/admin)

A full content manager at omeros.hyperrevamp.com/admin, modeled on Luvomen's admin but built around the Omeros writing, art and research content.

## Login
- `/admin/login`: phone number + 4-digit OTP screen, styled like Luvomen.
- Administrator: **8105391122 / OTP 1122**. No real SMS is sent. Each team member gets their own number and code.
- Sessions are checked on the server. Every admin action is checked again, not only the page.

## Layout
- A sidebar with grouped sections (Content, Media, Audience, Team, Settings), a top bar with search, and a profile menu.
- Uses the Omeros brand: bone/graphite colors, Omeros blue accents, sharp edges and General Sans.
- Works on desktop and tablet; the sidebar collapses on mobile.

## Sections
1. **Dashboard**: page views, top articles, recent edits, new messages and scheduled posts, plus quick buttons ("New article", "Upload media").
2. **Journal articles**: a searchable, filterable table (status, category, tag, date).
   - The editor has rich text, a featured image picked from the media library, an excerpt, tags and category.
   - It also has SEO fields with a Google preview, a slug and an Open Graph image.
   - Posts can be Draft, Scheduled (publish date and time) or Published. Live preview in a side pane. Duplicate and delete with confirmation.
   - **AI assist** suggests SEO titles, meta descriptions, excerpts and image alt text.
   - All 150+ existing posts are imported, so the public Journal reads from the admin.
3. **Books**: add, edit and reorder the forthcoming books (cover, status, description, links).
4. **Ecology & Inequality**: page text, Selected readings links, image strips and the featured manifesto.
5. **Gallery**: paintings with captions and alt text, drag to reorder, hide or show.
6. **Palimpsest**: edit the 10 sections (title, text, image).
7. **Homepage & Profile text**: hero lines, biography, buttons, footer and contact details, all editable as fields.
8. **Testimonials**: quote, name, role and photo, with reordering and a featured toggle; shown on the site where you choose.
9. **Media library**: upload images, video, audio and PDFs in a grid or list. Search, copy the link, edit alt text, see where each file is used, and delete.
10. **Inbox & Newsletter**: contact-form messages (read/unread, archive) and newsletter sign-ups, with CSV export.
11. **Staff & Roles**: add CMS users by phone and set their role.
    - **Owner**: full access.
    - **Editor**: content and media.
    - **Author**: own drafts only.
    - **Viewer**: read-only.
    - Users can be deactivated or removed.
12. **Audit log**: who changed what and when, with filters.
13. **Profile**: your name, photo, email, phone, role, recent activity and sign out.

## What changes on the public site
The Journal, Books, Gallery, Palimpsest, Ecology, Inequality, Homepage and Profile pages read their content from the admin. They look exactly the same as now.

## Technical details
- Lovable Cloud tables: articles, pages/content blocks (JSON per page), books, gallery_items, palimpsest_sections, testimonials, media, messages, subscribers, staff, staff_roles (separate table), admin_sessions, audit_log, page_views.
- OTP login is checked by server functions. The session is an httpOnly cookie stored in admin_sessions. A `requireAdmin` middleware with a role check guards every admin server function. Content tables have public read access only for published rows.
- Files are stored in a Cloud storage bucket. The editor is TipTap. AI assist uses the Lovable AI Gateway.
- A seed migration copies the current static content (articles.ts, palimpsest.ts, ecology.ts, gallery, books and so on) into the tables. Public routes switch to loaders with the current files as a fallback.
- Routes: `/admin/login` plus `/admin/*` pages, all marked noindex.

## Build order
1. Cloud, schema, seed data and login
2. Shell, dashboard and profile
3. Journal editor
4. Media library
5. Other content modules
6. Inbox, testimonials, staff and audit log
7. Connect the public pages to the admin and check everything
