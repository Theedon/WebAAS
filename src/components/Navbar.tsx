"use client";

import Image from "next/image";
import app_logo from "@/assets/images/app-logo.png";
import ThemeToggle from "./ThemeToggle";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { CircleUserRound, Menu, MoreVertical } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between rounded-xl border-b-2 bg-background bg-opacity-30 backdrop-blur-md">
      <Image src={app_logo} alt="app logo" className="size-14"></Image>

      <div className="hidden md:flex">
        <NavButtons href="/results">Results</NavButtons>
        <NavButtons href="/advisors">advisor's contact</NavButtons>
        <NavButtons href="/schedule">class schedule</NavButtons>
      </div>

      <div className="just flex items-center ">
        <ThemeToggle />

        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            setToggled((s) => !s);
          }}
          className={` md:hidden`}
        >
          <Menu />
        </Button>
        <Button variant={"ghost"} className="hidden md:flex" size={"icon"}>
          <CircleUserRound />
        </Button>
      </div>
    </header>
  );
}

const NavButtons = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "rounded-none border-x uppercase hover:text-primary-foreground",
          className,
        )}
      >
        {children}
      </Button>
    </Link>
  );
};

export default Navbar;
