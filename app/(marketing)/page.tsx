import { cookies } from "next/headers";
import { AuthenticatedLandingGate } from "@/components/marketing/AuthenticatedLandingGate";
import { NavBar } from "@/components/marketing/NavBar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { Footer } from "@/components/marketing/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function MarketingPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    return <AuthenticatedLandingGate />;
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <FeatureGrid />
      </main>
      <Footer />
    </div>
  );
}
