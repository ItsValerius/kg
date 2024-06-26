"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SelectEvent } from "@/server/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import parse from "html-react-parser";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import DashboardUpdateStatus from "../dashboardUpdateStatus";
import StatusBadge from "../statusBadge";
import { DataTableColumnHeader } from "./dataTableHeader";

export const columns: ColumnDef<SelectEvent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "description",
    header: "Beschreibung",
    id: "Beschreibung",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-3">
          {parse(row.getValue("Beschreibung"))}
        </div>
      );
    },
  },
  {
    accessorKey: "teaser",
    header: "Teaser",
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value: SelectEvent["status"]) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const status = row.getValue("status") satisfies SelectEvent["status"];

      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "price",
    id: "Preis",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Preis" />;
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("Preis"));
      const formatted = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        notation: "standard",
      }).format(price / 100);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "Erstellt",
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Erstellt" />;
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("Erstellt") satisfies Date;
      const formatted = new Intl.DateTimeFormat("de-De", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(createdAt);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/veranstaltungen/edit/" + event.slug}>
                Bearbeiten
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/veranstaltungen/delete/" + event.slug}>
                Löschen
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DashboardUpdateStatus data={event} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
