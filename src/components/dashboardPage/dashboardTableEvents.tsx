import React from "react";
import DashboardTable from "./dashboardTable";
import { db } from "@/server/db";

const DashboardTableEvents = async () => {
  const events = await db.query.eventsTable.findMany({ limit: 10 });

  return <DashboardTable events={events} />;
};

export default DashboardTableEvents;
