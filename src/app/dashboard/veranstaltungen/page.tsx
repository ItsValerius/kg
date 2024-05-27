import DashboardDetailsHeader from "@/components/dashboardPage/dashboardDetailsHeader";
import { columns } from "@/components/dashboardPage/datatable/eventColumns";
import { DataTable } from "@/components/dashboardPage/datatable/dataTable";
import { db } from "@/server/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Veranstaltungen",
};

const VeranstaltungenDashboardPage = async () => {
  const events = await db.query.eventsTable.findMany();

  return (
    <main className="w-full ">
      <div className="flex flex-col gap-4 px-4 py-2 sm:p-4">
        <DashboardDetailsHeader type="events" />
        <DataTable data={events} columns={columns} />
      </div>
    </main>
  );
};

export default VeranstaltungenDashboardPage;
