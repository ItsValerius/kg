import DashboardDetailsHeader from "@/components/dashboardPage/dashboardDetailsHeader";
import DashboardTable from "@/components/dashboardPage/dashboardTable";
import React from "react";

const VeranstaltungenDashboardPage = () => {
  return (
    <main className="w-full ">
      <div className="flex flex-col gap-4 px-4 py-2 sm:p-4">
        <DashboardDetailsHeader type="events" />
        <DashboardTable />
      </div>
    </main>
  );
};

export default VeranstaltungenDashboardPage;
