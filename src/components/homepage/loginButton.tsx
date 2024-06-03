import { LayoutDashboard, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const LogInOutButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Button variant="ghost" className="w-9 px-0" asChild>
      <Link href="/login">
        {!isLoggedIn ? (
          <LogIn className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        ) : (
          <LayoutDashboard className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        )}
        <span className="sr-only">Login Button</span>
      </Link>
    </Button>
  );
};

export default LogInOutButton;
