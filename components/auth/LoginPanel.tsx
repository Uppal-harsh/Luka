'use client';

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

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

export function LoginPanel({
  next = "/dashboard",
  initialError
}: {
  next?: string;
  initialError?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
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
        setError(oauthError.message);
      }
    } catch {
      setError("Something went wrong starting Google sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">Login</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
        Sign in with Google to continue building generated apps.
      </p>

      <div className="mt-8 space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-center"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <GoogleMark />
          {loading ? "Connecting..." : "Continue with Google"}
        </Button>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-[color:var(--border-subtle)]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">or</span>
          <div className="h-px flex-1 bg-[color:var(--border-subtle)]" />
        </div>

        <div className="space-y-3 opacity-70">
          <Input type="email" placeholder="Email address" disabled />
          <Input type="password" placeholder="Password" disabled />
          <Button type="button" className="w-full" disabled>
            Email sign-in coming soon
          </Button>
        </div>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </Card>
  );
}
