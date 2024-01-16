import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
        variant="default"
        className={cn(
          "rounded-none border-x font-semibold uppercase hover:text-primary-foreground",
          className,
        )}
      >
        {children}
      </Button>
    </Link>
  );
};

export default NavButtons;
