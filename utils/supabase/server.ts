import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const createClient = async (
  cookieStore: Awaited<ReturnType<typeof cookies>>
) => {
  const { url, key } = getSupabaseConfig();

  return createSupabaseServerClient(url!, key!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // If called from a Server Component, cookie writes are ignored.
          // Middleware/proxy refreshes sessions for request/response updates.
        }
      }
    }
  });
};
