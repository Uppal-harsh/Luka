const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawSupabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function normalizeUrl(url: string | undefined) {
  return url?.trim().replace(/\/+$/, "");
}

function normalizeKey(key: string | undefined) {
  return key?.trim();
}

export function getSupabaseConfig() {
  const url = normalizeUrl(rawSupabaseUrl);
  const key = normalizeKey(rawSupabasePublishableKey ?? rawSupabaseAnonKey);

  return {
    url,
    key,
    isReady: Boolean(url && key),
    isLikelyValidKey: Boolean(key && (key.startsWith("sb_publishable_") || key.startsWith("eyJ")))
  };
}
