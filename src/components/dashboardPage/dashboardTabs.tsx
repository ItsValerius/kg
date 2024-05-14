import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import DashboardTable from "./dashboardTable";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="aktuelles">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="aktuelles">Aktuelles</TabsTrigger>
        <TabsTrigger value="veranstaltungen">Veranstaltungen</TabsTrigger>
      </TabsList>
      <TabsContent value="aktuelles">
        <DashboardTable />
      </TabsContent>
      <TabsContent value="veranstaltungen">
        <DashboardTable />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
