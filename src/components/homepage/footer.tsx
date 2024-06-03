import Link from "next/link";
import P from "../typography/p";
import { ModeToggle } from "../mode-toggle";
import LoginButton from "./logInOutButton";
import { createClient } from "@/server/supabase/server";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Muted from "../typography/muted";

const Footer = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <footer className="flex sm:min-h-fit h-fit sm:h-full flex-col items-center justify-center gap-2 border-t px-4 py-2 text-black shadow-inner dark:bg-gray-950 dark:text-gray-50 sm:flex-row sm:justify-between ">
      <div className="flex h-10 items-center gap-1 ">
        <Image
          src="https://knallkoepp-golkrath.de/s/misc/logo.png"
          width={24}
          height={24}
          alt="logo"
        />
        <Separator orientation="vertical" />
        <Muted>{"© 2024"}</Muted>
      </div>
      <div className="flex gap-1">
        <div className=" flex items-center gap-1 md:gap-2">
          <Link className="text-sm hover:underline" href="/impressum">
            Impressum
          </Link>
          <Link
            className="text-sm hover:underline"
            href="/datenschutzerklaerung"
          >
            Datenschutzerklärung
          </Link>
        </div>
        <ModeToggle />
        <LoginButton isLoggedIn={!!data.user} />
      </div>
    </footer>
  );
};

export default Footer;
