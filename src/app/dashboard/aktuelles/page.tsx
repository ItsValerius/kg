import DashboardDetailsHeader from "@/components/dashboardPage/dashboardDetailsHeader";
import { DataTable } from "@/components/dashboardPage/datatable/dataTable";
import { columns } from "@/components/dashboardPage/datatable/postColumns";
import { db } from "@/server/db";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | News",
};

const AktuellesDashboardPage = async () => {
  const posts = await db.query.postsTable.findMany();
  return (
    <main className="w-full ">
      <div className="flex flex-col gap-4 px-4 py-2 sm:p-4">
        <DashboardDetailsHeader type="news" />
        <DataTable data={posts} columns={columns} />
      </div>
    </main>
  );
};

export default AktuellesDashboardPage;
