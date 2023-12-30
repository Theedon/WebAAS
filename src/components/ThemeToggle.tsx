/**
 * ThemeToggle component allows the user to toggle between light, dark and system themes.
 *
 * It uses the useTheme hook from next-themes to get and set the theme.
 *
 * It renders a dropdown menu with menu items for each theme option.
 *
 * The theme is persisted across pages using the ThemeProvider from next-themes.
 */

"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          system
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
