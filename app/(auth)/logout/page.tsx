'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/Card";
import { Loader2, LogOut } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Signing you out...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();

        if (!active) return;

        setMessage("Redirecting you home...");
        setTimeout(() => {
          if (active) {
            router.replace("/");
          }
        }, 220);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Logout failed.");
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)]">
          <LogOut className="h-6 w-6 text-brand-gold" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold">Logging out</h1>
        <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{message}</p>

        {error ? (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        ) : (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[color:var(--text-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Please wait
          </div>
        )}
      </Card>
    </div>
  );
}
