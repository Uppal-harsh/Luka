'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { LukaLogo } from "@/components/brand/LukaLogo";
import { Loader2 } from "lucide-react";

export function AuthenticatedLandingGate() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace("/dashboard");
    }, 240);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="flex justify-center">
            <LukaLogo compact />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
            Taking you to your dashboard.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[color:var(--text-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading workspace
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
