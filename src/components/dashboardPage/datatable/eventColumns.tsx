"use client";

import { Badge } from "@/components/ui/badge";
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
import events from "events";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import DashboardUpdateStatus from "../dashboardUpdateStatus";
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
  },
  {
    accessorKey: "teaser",
    header: "Teaser",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") satisfies SelectEvent["status"];
      const variant =
        status === "draft"
          ? "outline"
          : status === "active"
            ? "default"
            : "destructive";
      const formatted =
        status === "draft"
          ? "Entwurf"
          : status === "active"
            ? "Aktiv"
            : "Inaktiv";
      return <Badge variant={variant}>{formatted}</Badge>;
    },
  },
  {
    accessorKey: "price",
    header: "Preis",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
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
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Erstellt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
              <Link
                href={
                  "/dashboard" +
                  (events ? "/veranstaltungen" : "/aktuelles") +
                  "/edit" +
                  "/" +
                  event.slug
                }
              >
                Bearbeiten
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={
                  "/dashboard" +
                  (events ? "/veranstaltungen" : "/aktuelles") +
                  "/delete" +
                  "/" +
                  event.slug
                }
              >
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
