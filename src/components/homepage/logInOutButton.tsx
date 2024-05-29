"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LogInOutButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <Button variant="ghost" className="w-9 px-0" asChild>
        <Link href="/login">
          <LogIn className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Login Button</span>
        </Link>
      </Button>
    );
  }
  return (
    <Button
      variant="ghost"
      className="w-9 px-0"
      onClick={() => {
        router.push("/logout");
        router.refresh();
      }}
    >
      <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      <span className="sr-only">Logout Button</span>
    </Button>
  );
};

export default LogInOutButton;
