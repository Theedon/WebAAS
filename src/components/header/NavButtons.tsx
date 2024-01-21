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
    <Button
      asChild
      variant="default"
      className={cn(
        "rounded-none border-x font-semibold uppercase hover:text-primary-foreground",
        className,
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default NavButtons;
