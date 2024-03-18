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
  try {
    const { data, error } = await getClient().query<
      UserQuery,
      UserQueryVariables
    >({
      query,
      variables: { userId: getCurrentUserId() as string },
      fetchPolicy: "no-cache",
    });

    return (
      <header className="fixed left-0 top-0 z-10 my-1 w-full max-w-full border-b-2 bg-opacity-30 shadow-md backdrop-blur-md">
        <div className="flex h-[10vh] items-center justify-between rounded-b-xl bg-primary px-7 md:px-10 dark:text-background">
          <Image src={app_logo} alt="app logo" className="size-14"></Image>

          <div className="hidden md:flex">
            <NavButtons href="/">Dashboard</NavButtons>
            <NavButtons href="/results">Results</NavButtons>
            {(data.user.role === "advisor" || data.user.role === "admin") && (
              <NavButtons href="/students">students</NavButtons>
            )}
            {(data.user.role === "student" || data.user.role === "admin") && (
              <NavButtons href="/advisors">advisors</NavButtons>
            )}
            <NavButtons href="/schedule">class schedule</NavButtons>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button variant={"ghost"} className="flex" size={"icon"}>
              <UserButton afterSignOutUrl="/" />
            </Button>
            <NavDrawer NavItems={NavItems} />
          </div>
        </div>
      </header>
    );
  } catch (error: unknown) {
    console.log(error);
    return (
      <header className="fixed left-0 top-0 z-10 my-1 w-full max-w-full border-b-2 bg-opacity-30 shadow-md backdrop-blur-md">
        <div className="flex h-[10vh] items-center justify-between rounded-b-xl bg-primary px-7 md:px-10 dark:text-background">
          <Image src={app_logo} alt="app logo" className="size-14"></Image>

          <div className="hidden md:flex">
            <NavButtons href="/">Dashboard</NavButtons>
            <NavButtons href="/results">Results</NavButtons>

            <NavButtons href="/schedule">class schedule</NavButtons>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button variant={"ghost"} className="flex" size={"icon"}>
              <UserButton afterSignOutUrl="/" />
            </Button>
            <NavDrawer NavItems={NavItems} />
          </div>
        </div>
      </header>
    );
  }
}

const NavItems: {
  name: string;
  href: string;
}[] = [
  { name: "Dashboard", href: "/" },
  { name: "Results", href: "/results" },
  { name: "Advisors", href: "/advisors" },
  { name: "Schedule", href: "/schedule" },
  { name: "Settings", href: "/settings" },
];

export default Navbar;
