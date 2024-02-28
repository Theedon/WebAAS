"use client";
import { ReactNode } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

function NavDrawer({
  NavItems,
}: {
  NavItems: {
    name: string;
    href: string;
  }[];
}) {
  const router = useRouter();
  return (
    <Menubar className="md:hidden">
      <MenubarMenu>
        <MenubarTrigger className="flex cursor-pointer items-center justify-center">
          <Menu />
        </MenubarTrigger>
        <MenubarContent className="md:hidden">
          {NavItems.map((item) => (
            <div key={item.href}>
              <MenubarItem onClick={() => router.push(item.href)}>
                {item.name}
              </MenubarItem>
              <MenubarSeparator />
            </div>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default NavDrawer;
