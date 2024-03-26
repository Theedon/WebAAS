import Image from "next/image";
import app_logo from "@/assets/images/app-logo.png";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import NavButtons from "./NavButtons";
import NavDrawer from "./NavDrawer";
import { UserButton } from "@clerk/nextjs";
import gql from "graphql-tag";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import {
  UserQuery,
  UserQueryVariables,
} from "./__generated__/Navbar.generated";
import getCurrentUserId from "@/lib/globalUserContext";

const query = gql`
  query User($userId: String!) {
    user(id: $userId) {
      role
    }
  }
`;

async function Navbar() {
  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Results", href: "/results" },
    { name: "Schedule", href: "/schedule" },
  ];

  try {
    const { data, error } = await getClient().query<
      UserQuery,
      UserQueryVariables
    >({
      query,
      variables: { userId: getCurrentUserId() as string },
      fetchPolicy: "no-cache",
    });

    if (data?.user?.role === "admin") {
      navItems.push({ name: "Students", href: "/students" });
      navItems.push({ name: "Advisors", href: "/advisors" });
      navItems.push({ name: "Add Event", href: "/add-event" });
    } else if (data?.user?.role === "advisor") {
      navItems.push({ name: "Students", href: "/students" });
    } else if (data?.user?.role === "student") {
      navItems.push({ name: "Advisors", href: "/advisors" });
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <header className="fixed left-0 top-0 z-10 my-1 w-full max-w-full border-b-2 bg-opacity-30 shadow-md backdrop-blur-md">
      <div className="flex h-[10vh] items-center justify-between rounded-b-xl bg-primary px-7 md:px-10 dark:text-background">
        <Image src={app_logo} alt="app logo" className="size-14" />

        <div className="hidden md:flex">
          {navItems.map((item, index) => (
            <NavButtons key={index} href={item.href}>
              {item.name}
            </NavButtons>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant={"ghost"} className="flex" size={"icon"}>
            <UserButton afterSignOutUrl="/" />
          </Button>
          <NavDrawer NavItems={navItems} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
