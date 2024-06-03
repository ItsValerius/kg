import DashboardTableEvents from "@/components/dashboardPage/dashboardTableEvents";
import DashboardTablePosts from "@/components/dashboardPage/dashboardTablePosts";
import DashboardTabs from "@/components/dashboardPage/dashboardTabs";
import { createClient } from "@/server/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main>
      <div className="p-4">
        <div className="hidden md:grid md:grid-cols-2 md:gap-2">
          <Suspense fallback={"Lade Newstabelle..."}>
            <DashboardTablePosts />
          </Suspense>
          <Suspense fallback={"Lade Veranstaltungstabelle..."}>
            <DashboardTableEvents />
          </Suspense>
        </div>
        <div className="md:hidden">
          <DashboardTabs />
        </div>
      </div>
    </main>
  );
}
