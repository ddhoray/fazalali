# Admin usability and complete CMS control

## What will change

- Make Overview, Content, Media, Audience, and Team collapsible in the admin sidebar, with the current section automatically open and each choice remembered.
- Refresh the admin shell and shared controls for clearer hierarchy, roomier spacing, consistent actions, better mobile/tablet behavior, and clearer loading, empty, selected, and destructive states.
- Clarify Inbox as the destination for messages submitted through both the public contact page and contact drawer; improve its list/detail workflow and explain this directly in the admin.
- Expand Page text so all major public pages can be edited: Home, Profile, Books, Gallery, Ecology, Inequality, Palimpsest, Omeros AI, Podcast, and Contact.
- Convert existing built-in Books, Gallery, Palimpsest, Ecology/Inequality readings and related repeated content into backend-managed entries. Existing static content remains only as a temporary fallback until the corresponding backend collection contains entries.
- Ensure Journal lists, article pages, and homepage recent articles use the backend once Journal has been synced, instead of the homepage continuing to read static article data.
- Add missing backend-managed collections for page-specific structured content where plain page text is insufficient, without changing the public visual design.

## Technical details

- Reuse `cms_pages`, `cms_entries`, and `cms_articles`; extend allowed collection keys and editor schemas rather than adding a second CMS system.
- Preserve the current “backend becomes source of truth once populated” rule, while adding explicit sync/import actions for existing content so editors do not start from empty screens.
- Keep contact submissions stored in `cms_messages`; Inbox will support read/unread, archive/restore, reply by email, delete, and export.
- Use existing semantic design tokens and shared admin UI primitives; no hardcoded replacement theme.
- Verify desktop, tablet, and mobile admin layouts plus public content reads, then check the production build signal.
