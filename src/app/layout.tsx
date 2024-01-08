import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import { ApolloWrapper } from "@/lib/apollo-clients/CCProvider";
import NextAuthProvider from "@/lib/NextAuthProvider";
import { getServerSession } from "next-auth";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WebAAS",
  description: "Application for WebAAS",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex", poppins.className)}>
        <ApolloWrapper>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />

              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </NextAuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
