/**
 * Resolve a Lovable asset pointer (.asset.json) URL so it works from any host.
 *
 * The CDN path `/__l5e/assets-v1/...` is only served by Lovable's preview and
 * published hosting. On other hosts (Vercel, Netlify, custom static deploys)
 * those paths return 404. This helper rewrites them to the absolute Lovable
 * published origin, which serves the same files with permissive caching.
 */
const LOVABLE_HOSTS = [".lovable.app", ".lovableproject.com", ".lovable.dev"];
const LOVABLE_ASSET_ORIGIN = "https://omeros-cipher-glass.lovable.app";

export function assetUrl(pointer: { url: string }): string {
  const url = pointer.url;
  if (!url.startsWith("/__l5e/")) return url;

  // SSR: emit the absolute URL so prerendered HTML works on any host.
  if (typeof window === "undefined") return `${LOVABLE_ASSET_ORIGIN}${url}`;

  const host = window.location.hostname;
  const isLovable = LOVABLE_HOSTS.some((suffix) => host.endsWith(suffix));
  return isLovable ? url : `${LOVABLE_ASSET_ORIGIN}${url}`;
}
