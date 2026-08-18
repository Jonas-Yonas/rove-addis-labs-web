import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims?.sub) {
    redirect("/auth/login");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
          Rove Addis Labs
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-4 text-muted-foreground">You are authenticated.</p>

        <p className="mt-2 text-sm text-muted-foreground">
          User ID: {claims.claims.sub}
        </p>

        {/* Sign out */}
        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
