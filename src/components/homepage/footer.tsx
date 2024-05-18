import Link from "next/link";
import P from "../typography/p";
const Footer = () => {
  return (
    <footer className="flex h-24 flex-col items-center justify-between border-t bg-white px-4 py-6 text-black shadow-inner dark:bg-gray-950 dark:text-gray-50 sm:h-16 sm:flex-row md:px-6">
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
      </div>
    </footer>
  );
};

export default Footer;
