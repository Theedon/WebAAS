import Image from "next/image";
import app_logo from "@/assets/images/app-logo.png";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { CircleUserRound, Menu } from "lucide-react";
import NavButtons from "./NavButtons";
import NavDrawer from "./NavDrawer";

function Navbar() {
  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between rounded-t-xl border-b-2 bg-background bg-opacity-30 px-5 text-foreground backdrop-blur-md">
      <Image src={app_logo} alt="app logo" className="size-14"></Image>

      <div className="hidden md:flex">
        <NavButtons href="/dashboard">Dashboard</NavButtons>
        <NavButtons href="/results">Results</NavButtons>
        <NavButtons href="/advisors">advisor&apos;s contact</NavButtons>
        <NavButtons href="/schedule">class schedule</NavButtons>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <NavDrawer>
          <Menu />
        </NavDrawer>
        <Button variant={"ghost"} className="hidden md:flex" size={"icon"}>
          <CircleUserRound />
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
