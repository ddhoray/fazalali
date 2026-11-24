/**
 * Resolve an asset pointer (.asset.json) URL to where the file is hosted.
 *
 * The pointers still carry their original Lovable CDN path
 * (`/__l5e/assets-v1/<id>/<file>`). Those files now live in the public
 * `site-assets` Supabase Storage bucket under the same key
 * (`assets-v1/<id>/<file>`), so the mapping is a prefix swap.
 *
 * Files above the Supabase plan's 50 MB upload limit are served by Vercel
 * from `public/__l5e/...` instead, so their relative path is kept as-is.
 *
 * Always emit one stable URL for SSR and the browser to avoid hydration
 * mismatches.
 */
export const SITE_ASSETS_ORIGIN =
  "https://aiszqvrrcjtecrchefgp.supabase.co/storage/v1/object/public/site-assets";

const SERVED_FROM_PUBLIC = new Set([
  "/__l5e/assets-v1/abf744fd-4218-4183-8518-589071bdf634/prolegomenon.mp3",
  "/__l5e/assets-v1/b0df17e5-3d5d-451b-8f3e-a68cfcc6b277/preface.mp3",
]);

export function assetUrl(pointer: { url: string }): string {
  const url = pointer.url;
  if (!url.startsWith("/__l5e/") || SERVED_FROM_PUBLIC.has(url)) return url;
  return `${SITE_ASSETS_ORIGIN}/${url.slice("/__l5e/".length)}`;
}
