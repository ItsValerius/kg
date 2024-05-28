"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { PlusCircle, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { statuses } from "./data";
import { DataTableFacetedFilter } from "./dataTableFilter";
import { DataTableViewOptions } from "./datatableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const pathname = usePathname();

  const searchColumn = table.getColumn("title") ? "title" : "name";
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center ">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={`Filter ${searchColumn === "title" ? "Titel" : "Name"}...`}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <Button asChild size="sm" className="h-8 gap-1">
        <Link
          href={
            pathname.includes("veranstaltungen")
              ? "/dashboard/veranstaltungen/add"
              : "/dashboard/aktuelles/add"
          }
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {pathname.includes("veranstaltungen")
              ? "Neue Veranstaltung"
              : "Neue News"}
          </span>
        </Link>
      </Button>
    </div>
  );
}
