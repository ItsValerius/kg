import DashboardFormSettings from "@/components/dashboardPage/dashboardFormSettings";
import { db } from "@/server/db";
import { accountsTable } from "@/server/db/schema";
import { createClient } from "@/server/supabase/server";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Settings",
};

const SettingsPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) return;

  const account = await db.query.accountsTable.findFirst({
    where: eq(accountsTable.id, data.user.id),
  });
  if (!account) return;
  return (
    <main>
      <div className="p-4">
        <DashboardFormSettings account={account} />
      </div>
    </main>
  );
};

export default SettingsPage;
