import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const createClient = () =>
  createBrowserClient(getSupabaseConfig().url!, getSupabaseConfig().key!);
