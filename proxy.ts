import { createClient } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const {
    data: { session }
  } = await supabase.auth.getSession();
  const { pathname, search } = request.nextUrl;
  const nextPath = encodeURIComponent(`${pathname}${search}`);

  if (
    (!session && pathname.startsWith("/dashboard")) ||
    (!session && pathname.startsWith("/apps")) ||
    (!session && pathname.startsWith("/settings"))
  ) {
    return NextResponse.redirect(new URL(`/login?next=${nextPath}`, request.url));
  }

  if (session && (pathname === "/login" || pathname === "/signup")) {
    const target = request.nextUrl.searchParams.get("next") ?? "/dashboard";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)"]
};
