import DashboardTable from "@/components/dashboardPage/dashboardTable";
import DashboardTabs from "@/components/dashboardPage/dashboardTabs";
import { db } from "@/server/db";
import { createClient } from "@/server/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

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

  const posts = await db.query.postsTable.findMany({ limit: 10 });
  const events = await db.query.eventsTable.findMany({ limit: 10 });

  return (
    <main>
      <div className="p-4">
        <div className="hidden md:grid md:grid-cols-2 md:gap-2">
          <DashboardTable posts={posts} />
          <DashboardTable events={events} />
        </div>
        <div className="md:hidden">
          <DashboardTabs posts={posts} events={events} />
        </div>
      </div>
    </main>
  );
}
