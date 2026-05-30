import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:py-12">
      <Card className="w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">Signup</p>
        <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Create your LUKA account</h1>
        <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">
          Start with a free workspace and grow from there.
        </p>

        <div className="mt-8 space-y-4">
          <GoogleSignInButton
            label="Continue with Google"
            loadingLabel="Connecting..."
            next="/dashboard"
          />

          <div className="flex items-center gap-4 py-1">
            <div className="h-px flex-1 bg-[color:var(--border-subtle)]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
              or
            </span>
            <div className="h-px flex-1 bg-[color:var(--border-subtle)]" />
          </div>

          <form className="space-y-4">
            <Input type="text" placeholder="Full name" />
            <Input type="email" placeholder="Email address" />
            <Input type="password" placeholder="Password" />
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
