"use client";
import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Contact2,
  Home,
  MenuIcon,
  Newspaper,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6 ">
      <Link className="flex items-center space-x-2" href="/">
        <Image
          src="https://knallkoepp-golkrath.de/s/misc/logo.png"
          width={24}
          height={24}
          alt="logo"
        />
        <span className="font-medium">KG Knallköpp Golkrath</span>
      </Link>
      <nav className="hidden items-center space-x-4 md:flex">
        <LinkWithUnderline
          href="/"
          spanClassName={pathname === "/" ? "bg-[length:100%_2px]" : ""}
        >
          Home
        </LinkWithUnderline>
        <LinkWithUnderline
          href="/veranstaltungen"
          spanClassName={
            pathname.includes("/veranstaltungen") ? "bg-[length:100%_2px]" : ""
          }
        >
          Veranstaltungen
        </LinkWithUnderline>
        <LinkWithUnderline
          href="/aktuelles"
          spanClassName={
            pathname.includes("/aktuelles") ? "bg-[length:100%_2px]" : ""
          }
        >
          Aktuelles
        </LinkWithUnderline>
        <LinkWithUnderline
          href="/ueberuns"
          spanClassName={pathname === "/ueberuns" ? "bg-[length:100%_2px]" : ""}
        >
          Über uns
        </LinkWithUnderline>
        <LinkWithUnderline
          href="/kontakt"
          spanClassName={pathname === "/kontakt" ? "bg-[length:100%_2px]" : ""}
        >
          Kontakt
        </LinkWithUnderline>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="text-white  md:hidden"
            size="icon"
            variant="outline"
          >
            <MenuIcon className="h-6 w-6 stroke-emerald-600" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-xs">
          <nav className=" grid gap-6 text-lg font-medium">
            <SheetClose asChild>
              <Link
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full "
              >
                <Image
                  src="https://knallkoepp-golkrath.de/s/misc/logo.png"
                  width={40}
                  height={40}
                  alt="logo"
                />
                <span className="sr-only">Home</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home
                  className={cn("h-5 w-5 ", {
                    "stroke-emerald-500": pathname === "/",
                  })}
                />
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/veranstaltungen"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Calendar
                  className={cn("h-5 w-5 ", {
                    "stroke-emerald-500": pathname.includes("/veranstaltungen"),
                  })}
                />
                Veranstaltungen
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/aktuelles"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Newspaper
                  className={cn("h-5 w-5 ", {
                    "stroke-emerald-500": pathname.includes("/aktuelles"),
                  })}
                />
                Aktuelles
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/ueberuns"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2
                  className={cn("h-5 w-5 ", {
                    "stroke-emerald-500": pathname === "/ueberuns",
                  })}
                />
                Über uns
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/kontakt"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Contact2
                  className={cn("h-5 w-5 ", {
                    "stroke-emerald-500": pathname === "/kontakt",
                  })}
                />
                Kontakt
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
