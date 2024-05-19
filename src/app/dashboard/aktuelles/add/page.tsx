import { DashboardFormNews } from "@/components/dashboardPage/dashboardFormNews";
import { H2 } from "@/components/typography/h2";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/server/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | News | Hinzufügen",
};
const AddEventPage = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) return;
  return (
    <main>
      <div className="p-4">
        <Card>
          <CardHeader>
            <H2>Neuigkeiten Hinzufügen</H2>
          </CardHeader>
          <CardContent>
            <DashboardFormNews userId={user.data.user.id} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddEventPage;
