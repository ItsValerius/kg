import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 text-black dark:text-gray-50 py-6 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between border-t shadow-inner h-24 sm:h-16">
      <p className="text-sm">© 2024 Carnival Club. All rights reserved.</p>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
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
