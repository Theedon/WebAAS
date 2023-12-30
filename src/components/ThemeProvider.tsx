/**
 * ThemeProvider component wraps NextThemesProvider and allows configuring
 * next-themes provider.
 *
 * Accepts same props as NextThemesProvider.
 */
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  console.log("here");
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;
