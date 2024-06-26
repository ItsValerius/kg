"use client";
import { signOut } from "@/app/dashboard/actions";
import type { SelectAccount } from "@/server/db/schema";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NextAvatar from "../nextAvatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { env } from "@/env";

const DashboardTableHeader = ({
  currentAccount,
}: {
  currentAccount: SelectAccount;
}) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((name) => !!name);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {pathnames.map((name, i) => {
            return (
              <React.Fragment key={i}>
                <BreadcrumbItem
                  className={
                    i + 1 === pathnames.length
                      ? "text-xl text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  <BreadcrumbLink asChild>
                    <Link
                      href={
                        i === 0
                          ? `/${name}`
                          : `/${pathnames.slice(0, i + 1).join("/")}`
                      }
                      className="capitalize"
                    >
                      {name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i + 1 < pathnames.length && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <NextAvatar
              src={
                `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/account_images/` +
                  currentAccount.imageUrl ?? ""
              }
              alt="Avatar"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default DashboardTableHeader;
