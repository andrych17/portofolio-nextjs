export const basePath = "/template";

const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Origin only, no basePath. Production is https://andryhuang.com. */
export const siteUrl = fromEnv.replace(/\/$/, "");

/** Absolute URL for an app path ("/fashion/maison" -> https://andryhuang.com/template/fashion/maison). */
export function absoluteUrl(path = "/") {
  const sub = path.startsWith(basePath) ? path.slice(basePath.length) || "/" : path;
  return `${siteUrl}${basePath}${sub === "/" ? "" : sub}`;
}

/** Set NEXT_PUBLIC_NOINDEX=1 on preview deployments to keep everything out of search results. */
export const noIndex = process.env.NEXT_PUBLIC_NOINDEX === "1";
