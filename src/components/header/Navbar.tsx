import Image from "next/image";
import app_logo from "@/assets/images/app-logo.png";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { CircleUserRound, Menu } from "lucide-react";
import NavButtons from "./NavButtons";
import NavDrawer from "./NavDrawer";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-10 w-full border-b-2 bg-opacity-30 shadow-md backdrop-blur-md ">
      <div className="flex items-center justify-between rounded-t-xl bg-background px-7 text-foreground md:px-10">
        <Image src={app_logo} alt="app logo" className="size-14"></Image>

        <div className="hidden md:flex">
          <NavButtons href="/">Dashboard</NavButtons>
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
      </div>
    </header>
  );
}

export default Navbar;
