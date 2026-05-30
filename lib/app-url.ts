const DEFAULT_LOCAL_URL = "http://localhost:3000";

function normalizeUrl(value: string | undefined | null) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/\/+$/, "");
}

export function getAppOrigin(fallbackOrigin?: string) {
  const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? normalizeUrl(process.env.NEXT_PUBLIC_APP_URL);

  if (typeof window !== "undefined") {
    return siteUrl ?? fallbackOrigin ?? window.location.origin;
  }

  if (siteUrl) return siteUrl;

  const vercelUrl = normalizeUrl(process.env.VERCEL_URL);
  if (vercelUrl) return `https://${vercelUrl}`;

  return fallbackOrigin ?? DEFAULT_LOCAL_URL;
}

export function buildAppUrl(pathname: string, fallbackOrigin?: string) {
  const origin = getAppOrigin(fallbackOrigin);
  return new URL(pathname, origin).toString();
}
