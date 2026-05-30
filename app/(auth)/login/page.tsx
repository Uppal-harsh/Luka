import { LoginPanel } from "@/components/auth/LoginPanel";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const next = resolvedSearchParams.next ?? "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <LoginPanel next={next} />
    </div>
  );
}
