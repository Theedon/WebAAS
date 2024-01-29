import Image from "next/image";
import app_logo from "@/assets/images/app-logo.png";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import NavButtons from "./NavButtons";
import NavDrawer from "./NavDrawer";
import { UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-10 my-1 w-full max-w-full border-b-2 bg-opacity-30 shadow-md backdrop-blur-md">
      <div className="flex h-[10vh] items-center justify-between rounded-b-xl bg-primary px-7 md:px-10 dark:text-background">
        <Image src={app_logo} alt="app logo" className="size-14"></Image>

        <div className="hidden md:flex">
          <NavButtons href="/">Dashboard</NavButtons>
          <NavButtons href="/results">Results</NavButtons>
          <NavButtons href="/advisors">advisor&apos;s contact</NavButtons>
          <NavButtons href="/schedule">class schedule</NavButtons>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button variant={"ghost"} className="flex" size={"icon"}>
            <UserButton afterSignOutUrl="/" />
          </Button>
          <NavDrawer>
            <Menu />
          </NavDrawer>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
