"use client";
import type { SelectEvent, SelectPost } from "@/server/db/schema";
import React from "react";
import { Button } from "../ui/button";
import { updateStatus } from "@/app/dashboard/actions";

const DashboardUpdateStatus = ({
  data,
}: {
  data: SelectPost | SelectEvent;
}) => {
  const isPost = (data: SelectEvent | SelectPost): data is SelectPost => {
    return (data as SelectPost).title !== undefined;
  };

  return (
    <Button
      onClick={async () => {
        await updateStatus(
          data.id,
          data.status === "active" ? "inactive" : "active",
          isPost(data),
        );
      }}
    >
      {data.status === "active" ? "Deaktivieren" : "Aktivieren"}
    </Button>
  );
};

export default DashboardUpdateStatus;
