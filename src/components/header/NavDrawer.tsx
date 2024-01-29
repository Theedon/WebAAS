"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import NavButtons from "./NavButtons";

function NavDrawer({ children }: { children: ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger className="md:hidden">{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <NavButtons className="w-full border-none" href="/">
            Dashboard
          </NavButtons>
          <NavButtons className="w-full border-none" href="/results">
            Results
          </NavButtons>
          <NavButtons className="w-full border-none" href="/advisors">
            advisor&apos;s contact
          </NavButtons>
          <NavButtons className="w-full border-none" href="/schedule">
            class schedule
          </NavButtons>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={"destructive"}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default NavDrawer;
