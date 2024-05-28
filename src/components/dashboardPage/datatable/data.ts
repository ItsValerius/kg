import { CheckCircleIcon, CircleDashed, XCircle } from "lucide-react";

export const statuses = [
  {
    value: "active",
    label: "Aktiv",
    icon: CheckCircleIcon,
  },
  {
    value: "draft",
    label: "Entwurf",
    icon: CircleDashed,
  },
  {
    value: "inactive",
    label: "Inaktiv",
    icon: XCircle,
  },
];
