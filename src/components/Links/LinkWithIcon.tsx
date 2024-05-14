import { cn } from "@/lib/utils";
import { type LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";
const LinkWithIcon = ({
  Icon,
  href,
  className,
  iconClassName,
  children,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <Link href={href} className={cn("flex gap-1 items-center justify-center", className)}>
      {children}
      <Icon className={cn("", iconClassName)} />
    </Link>
  );
};

export default LinkWithIcon;
