import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import { ApolloWrapper } from "@/lib/apollo-clients/CCProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/Footer";
import { dark } from "@clerk/themes";

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
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      afterSignUpUrl="/onboarding"
      afterSignInUrl="/results"
    >
      <ApolloWrapper>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "flex min-h-screen flex-col gap-2 overflow-x-hidden",
              poppins.className,
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />

              <main className="mx-10 mb-10 mt-[14vh]">{children}</main>
              <Footer />
            </ThemeProvider>
          </body>
        </html>
      </ApolloWrapper>
    </ClerkProvider>
  );
}
