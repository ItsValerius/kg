import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import { Button } from "@/components/ui/button";
import { Calendar, Contact2, Home, MenuIcon, Newspaper, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Header = () => {
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
        <LinkWithUnderline href="/">Home</LinkWithUnderline>
        <LinkWithUnderline href="/veranstaltungen">
          Veranstaltungen
        </LinkWithUnderline>
        <LinkWithUnderline href="/aktuelles">Aktuelles</LinkWithUnderline>
        <LinkWithUnderline href="/ueberuns">Über uns</LinkWithUnderline>
        <LinkWithUnderline href="/kontakt">Kontakt</LinkWithUnderline>
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
            <Link
              href="/"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/veranstaltungen"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Calendar className="h-5 w-5" />
              Veranstaltungen
            </Link>
            <Link
              href="/aktuelles"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Newspaper className="h-5 w-5" />
              Aktuelles
            </Link>
            <Link
              href="/ueberuns"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Contact2 className="h-5 w-5"/>
              Kontakt
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
