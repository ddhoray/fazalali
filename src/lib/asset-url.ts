/**
 * Resolve a Lovable asset pointer (.asset.json) URL so it works from any host.
 *
 * The CDN path `/__l5e/assets-v1/...` is only served by Lovable's preview and
 * published hosting. On other hosts (Vercel, Netlify, custom static deploys)
 * those paths return 404. This helper rewrites them to the absolute Lovable
 * published origin, which serves the same files with permissive caching.
 */
const LOVABLE_ASSET_ORIGIN = "https://omeros-cipher-glass.lovable.app";

export function assetUrl(pointer: { url: string }): string {
  const url = pointer.url;
  if (!url.startsWith("/__l5e/")) return url;

  // Always emit one stable URL. Returning a relative URL in the browser but
  // an absolute URL during SSR causes React hydration mismatches and can leave
  // image elements pointing at a preview host that cannot serve CDN assets.
  return `${LOVABLE_ASSET_ORIGIN}${url}`;
}
