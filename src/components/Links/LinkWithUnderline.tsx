import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LinkWithUnderline = ({
  children,
  className,
  href,
  spanClassName,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  spanClassName?: string;
  href: string;
}>) => {
  return (
    <Link
      className={cn(
        "text-sm font-medium group ease-in-out duration-300",
        className
      )}
      href={href}
    >
      <span
        className={cn(
          "bg-left-bottom bg-gradient-to-r from-emerald-300 to-emerald-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out",
          spanClassName
        )}
      >
        {children}
      </span>
    </Link>
  );
};

export default LinkWithUnderline;
