'use client';

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { Button } from "@/components/ui/Button";

export function LoginPanel({
  next = "/dashboard",
  initialError
}: {
  next?: string;
  initialError?: string;
}) {
  return (
    <Card className="w-full max-w-md">
      <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">Login</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
        Sign in with Google to continue building generated apps.
      </p>

      <div className="mt-8 space-y-4">
        <GoogleSignInButton next={next} />

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
      </div>
    </Card>
  );
}
