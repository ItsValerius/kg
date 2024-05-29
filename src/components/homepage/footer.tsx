import Link from "next/link";
import P from "../typography/p";
import { ModeToggle } from "../mode-toggle";
import LoginButton from "./logInOutButton";
import { createClient } from "@/server/supabase/server";



const Footer = async() => {
  
const supabase = createClient();
const {data} = await supabase.auth.getUser();

  return (
    <footer className="flex h-24 flex-col items-center justify-between border-t  px-4 py-6 text-black shadow-inner dark:bg-gray-950 dark:text-gray-50 sm:h-16 sm:flex-row md:px-6">
      <P className="text-sm">
        © 2024 KG Knallköpp Golkrath e.V. All rights reserved.
      </P>
      <div className="mt-4 flex items-center space-x-4 sm:mt-0">
        <Link className="text-sm hover:underline" href="/impressum">
          Impressum
        </Link>
        <Link className="text-sm hover:underline" href="/datenschutzerklaerung">
          Datenschutzerklärung
        </Link>
        <ModeToggle />
        <LoginButton isLoggedIn={!!data.user} />
      </div>
    </footer>
  );
};

export default Footer;
