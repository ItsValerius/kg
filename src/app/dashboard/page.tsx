import { createClient } from "@/server/supabase/server";
import { redirect } from "next/navigation";

import { Dashboard } from "@/components/dashboardPage/dashboard";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main >
      <Dashboard />
    </main>
  );
}
