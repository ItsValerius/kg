import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import DashboardTable from "./dashboardTable";
import { type SelectEvent, type SelectPost } from "@/server/db/schema";

const DashboardTabs = ({
  events,
  posts,
}: {
  events: SelectEvent[];
  posts: SelectPost[];
}) => {
  return (
    <Tabs defaultValue="aktuelles">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="aktuelles">Aktuelles</TabsTrigger>
        <TabsTrigger value="veranstaltungen">Veranstaltungen</TabsTrigger>
      </TabsList>
      <TabsContent value="aktuelles">
        <DashboardTable posts={posts} />
      </TabsContent>
      <TabsContent value="veranstaltungen">
        <DashboardTable events={events} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
