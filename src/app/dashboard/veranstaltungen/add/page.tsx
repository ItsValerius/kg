import { DashboardFormEvents } from "@/components/dashboardPage/dashboardFormEvents";
import { H2 } from "@/components/typography/h2";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddEventPage = () => {
  return (
    <main>
      <div className="p-4">
        <Card>
          <CardHeader>
            <H2>Veranstaltung Hinzufügen</H2>
          </CardHeader>
          <CardContent>
            <DashboardFormEvents />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddEventPage;
