import React from "react";
import { Badge } from "../ui/badge";

const StatusBadge = ({ status }: { status: string }) => {
  const variant =
    status === "draft"
      ? "outline"
      : status === "active"
        ? "default"
        : "destructive";
  const formatted =
    status === "draft" ? "Entwurf" : status === "active" ? "Aktiv" : "Inaktiv";
  return <Badge variant={variant}>{formatted}</Badge>;
};

export default StatusBadge;
