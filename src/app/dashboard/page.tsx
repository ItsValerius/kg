import DashboardTable from "@/components/dashboardPage/dashboardTable";
import DashboardTabs from "@/components/dashboardPage/dashboardTabs";
import { db } from "@/server/db";
import { createClient } from "@/server/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const posts = db.query.postsTable.findMany();

  return (
    <main>
      <div className="p-4">
        <div className="hidden md:grid md:grid-cols-2 md:gap-2">
          <DashboardTable />
          <DashboardTable />
        </div>
        <div className="md:hidden">
          <DashboardTabs />
        </div>
      </div>
    </main>
  );
}
