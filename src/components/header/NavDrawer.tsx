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
          <NavButtons className="w-full border-none" href="/dashboard">
            Dashboard
          </NavButtons>
          <NavButtons className="w-full border-none" href="/results">
            Results
          </NavButtons>
          <NavButtons className="w-full border-none" href="/advisors">
            advisor's contact
          </NavButtons>
          <NavButtons className="w-full border-none" href="/schedule">
            class schedule
          </NavButtons>
          <Button onClick={() => {}} variant={"default"}>
            Sign out
          </Button>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
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
