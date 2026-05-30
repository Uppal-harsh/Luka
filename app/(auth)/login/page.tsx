import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Login</p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to continue building generated apps.</p>
        <form className="mt-8 space-y-4">
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
