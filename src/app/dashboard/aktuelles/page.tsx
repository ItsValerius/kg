"use client";
import DashboardTable from "@/components/dashboardPage/dashboardTable";
import React from "react";

const AktuellesDashboardPage = () => {
  return (
    <main className="w-full ">
      <div className="flex flex-col gap-4 px-4 py-2 sm:p-4">
        <DashboardTable />
      </div>
    </main>
  );
};

export default AktuellesDashboardPage;
