import { LoginPanel } from "@/components/auth/LoginPanel";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ next?: string; error?: string; message?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const next = resolvedSearchParams.next ?? "/dashboard";
  const error = resolvedSearchParams.error;
  const message = resolvedSearchParams.message;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <LoginPanel next={next} initialError={error ? message ?? "Sign in failed." : undefined} />
    </div>
  );
}
