'use client';

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { Button } from "@/components/ui/Button";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.9 2.9l3 2.3c1.8-1.7 2.9-4.2 2.9-7.1 0-.7-.1-1.4-.2-2.1H12z"
      />
      <path
        fill="#34A853"
        d="M6.5 14.1l-.7.5-2.6 2c1.7 3.4 5.2 5.7 9.1 5.7 2.7 0 5-.9 6.8-2.5l-3-2.3c-.8.5-1.8.8-3 .8-2.4 0-4.5-1.6-5.2-3.8z"
      />
      <path
        fill="#4285F4"
        d="M22 12.3c0-.7-.1-1.3-.2-1.9H12v3.7h5.5c-.3 1.2-1 2.2-2 2.9v2.4h3.2c1.9-1.8 3.3-4.7 3.3-7.1z"
      />
      <path
        fill="#FBBC05"
        d="M6.2 9.9c-.2.6-.4 1.3-.4 2.1s.1 1.5.4 2.1v1.8l-3 2.3c-.9-1.8-1.5-3.8-1.5-6.2s.6-4.4 1.5-6.2l3 2.1v2z"
      />
      <path
        fill="#FBBC05"
        d="M12 5c1.5 0 2.8.5 3.8 1.4l2.8-2.8C17 1.9 14.7 1 12 1 8.1 1 4.6 3.3 2.9 6.7l3.3 2.5C7.5 6.6 9.6 5 12 5z"
      />
    </svg>
  );
}

export function GoogleSignInButton({
  next = "/dashboard",
  label = "Continue with Google",
  loadingLabel = "Connecting...",
  className
}: {
  next?: string;
  label?: string;
  loadingLabel?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const config = getSupabaseConfig();

      if (!config.isReady) {
        throw new Error(
          "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local, then restart the dev server."
        );
      }

      if (!config.isLikelyValidKey) {
        throw new Error(
          "The Supabase public key loaded by the app does not look valid. Make sure NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY matches the key from your Supabase dashboard, then restart the dev server."
        );
      }

      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            prompt: "select_account"
          }
        }
      });

      if (oauthError) {
        if (/invalid api key/i.test(oauthError.message)) {
          setError(
            "Supabase rejected the public key. Check NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local and restart the dev server."
          );
        } else {
          setError(oauthError.message);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong starting Google sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="outline"
        className="w-full justify-center"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <GoogleMark />
        {loading ? loadingLabel : label}
      </Button>
      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
