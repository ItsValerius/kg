import React from "react";
import DashboardTable from "./dashboardTable";
import { db } from "@/server/db";

const DashboardTablePosts = async () => {
  const posts = await db.query.postsTable.findMany({ limit: 10 });
  return <DashboardTable posts={posts} />;
};

export default DashboardTablePosts;
