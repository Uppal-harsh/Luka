import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { buildAppUrl, getAppOrigin } from "@/lib/app-url";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";
  const safeNext = next.startsWith("/") ? next : "/dashboard";
  const appOrigin = getAppOrigin(requestUrl.origin);
  const loginUrl = new URL("/login", appOrigin);

  if (!code) {
    loginUrl.searchParams.set("error", "auth_failed");
    loginUrl.searchParams.set("message", "Missing authorization code.");
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.redirect(buildAppUrl(safeNext, appOrigin));
  const cookieStore = await cookies();
  const { url: supabaseUrl, key: supabaseKey } = getSupabaseConfig();

  if (!supabaseUrl || !supabaseKey) {
    loginUrl.searchParams.set("error", "auth_failed");
    loginUrl.searchParams.set(
      "message",
      "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local."
    );
    return NextResponse.redirect(loginUrl);
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    loginUrl.searchParams.set("error", "auth_failed");
    loginUrl.searchParams.set("message", error.message);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}
