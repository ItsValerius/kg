import { DashboardFormEvents } from "@/components/dashboardPage/dashboardFormEvents";
import { db } from "@/server/db";
import { eventsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";

const EditEventsPage = async ({ params }: { params: { slug: string } }) => {
  const event = await db.query.eventsTable.findFirst({
    where: eq(eventsTable.slug, params.slug),
  });

  if (!event) return notFound();

  return (
    <main>
      <DashboardFormEvents event={event} />
    </main>
  );
};

export default EditEventsPage;
