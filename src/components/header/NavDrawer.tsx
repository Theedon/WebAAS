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
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function NavDrawer({ children }: { children: ReactNode }) {
  const session = useSession();
  const router = useRouter();

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
          <Button
            onClick={() => {
              if (session.status === "authenticated") {
                signOut();
                router.push("/login");
              }
            }}
            variant={"default"}
          >
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
