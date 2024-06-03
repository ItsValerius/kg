import DashboardFormSettings from "@/components/dashboardPage/dashboardFormSettings";
import { createClient } from "@/server/supabase/server";

const SettingsPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) return;

  return (
    <main>
      <div className="p-4">
        <DashboardFormSettings accountId={data.user.id} />
      </div>
    </main>
  );
};

export default SettingsPage;
