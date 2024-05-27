import DashboardAside from "@/components/dashboardPage/dashboardAside";
import DashboardTableHeader from "@/components/dashboardPage/dashboardTableHeader";
import { Toaster } from "@/components/ui/sonner";
import { db } from "@/server/db";
import { accountsTable } from "@/server/db/schema";
import { createClient } from "@/server/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if(!user || user.error) return redirect("/login");
  const account = await db.query.accountsTable.findFirst({
    where: eq(accountsTable.id, user.data.user.id),
  });
  if(!account) return redirect("/login");

  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardAside  />
      <div className="w-full">
        <DashboardTableHeader currentAccount={account} />
        {children}
      </div>
      <Toaster />
    </div>
  );
}
