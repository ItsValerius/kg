import DashboardAside from "@/components/dashboardPage/dashboardAside";
import DashboardTableHeader from "@/components/dashboardPage/dashboardTableHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardAside />
      <div className="w-full">
        <DashboardTableHeader />
        {children}
      </div>
    </div>
  );
}
