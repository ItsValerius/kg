import DashboardDetailsHeader from "@/components/dashboardPage/dashboardDetailsHeader";
import DashboardTable from "@/components/dashboardPage/dashboardTable";
import { db } from "@/server/db";

const AktuellesDashboardPage = async() => {
  const posts = await db.query.postsTable.findMany();
  return (
    <main className="w-full ">
      <div className="flex flex-col gap-4 px-4 py-2 sm:p-4">
        <DashboardDetailsHeader type="news" />
        <DashboardTable posts={posts} />
      </div>
    </main>
  );
};

export default AktuellesDashboardPage;
