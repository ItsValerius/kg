"use client";
import { cn } from "@/lib/utils";
import { Calendar, Home, Newspaper, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import LinkWithIcon from "../Links/LinkWithIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const DashboardAside = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-row  border-b p-4 sm:w-14 sm:flex-col sm:border-r">
      <TooltipProvider>
        <nav className="hidden flex-row gap-4 sm:flex sm:flex-col">
          <Tooltip>
            <TooltipTrigger>
              <LinkWithIcon
                href="/dashboard"
                Icon={Home}
                iconClassName={cn("", {
                  "stroke-primary": pathname === "/dashboard",
                })}
              />
              <TooltipContent side="right">Dashboard</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <LinkWithIcon
                href="/dashboard/aktuelles"
                Icon={Newspaper}
                iconClassName={cn("", {
                  "stroke-primary": pathname.includes("/dashboard/aktuelles"),
                })}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Aktuelles</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <LinkWithIcon
                href="/dashboard/veranstaltungen"
                Icon={Calendar}
                iconClassName={cn("", {
                  "stroke-primary": pathname.includes(
                    "/dashboard/veranstaltungen",
                  ),
                })}
              />
              <TooltipContent side="right">Veranstaltungen</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </nav>
        <nav className="flex flex-row gap-4 sm:hidden">
          <LinkWithIcon
            href="/dashboard"
            Icon={Home}
            iconClassName={cn("", {
              "stroke-primary": pathname === "/dashboard",
            })}
          />

          <LinkWithIcon
            href="/dashboard/aktuelles"
            Icon={Newspaper}
            iconClassName={cn("", {
              "stroke-primary": pathname.includes("/dashboard/aktuelles"),
            })}
          />

          <LinkWithIcon
            href="/dashboard/veranstaltungen"
            Icon={Calendar}
            iconClassName={cn("", {
              "stroke-primary": pathname.includes("/dashboard/veranstaltungen"),
            })}
          />
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default DashboardAside;
