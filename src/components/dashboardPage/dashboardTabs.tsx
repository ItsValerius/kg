import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardTableEvents from "./dashboardTableEvents";
import DashboardTablePosts from "./dashboardTablePosts";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="aktuelles">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="aktuelles">Aktuelles</TabsTrigger>
        <TabsTrigger value="veranstaltungen">Veranstaltungen</TabsTrigger>
      </TabsList>
      <TabsContent value="aktuelles">
        <DashboardTablePosts  />
      </TabsContent>
      <TabsContent value="veranstaltungen">
        <DashboardTableEvents  />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
