import DashboardAside from "@/components/dashboardPage/dashboardAside";
import DashboardTableHeader from "@/components/dashboardPage/dashboardTableHeader";
import { Toaster } from "@/components/ui/sonner";
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
      <Toaster />
    </div>
  );
}
