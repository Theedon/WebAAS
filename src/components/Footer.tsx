import app_logo from "@/assets/images/app-logo.png";
import Image from "next/image";
import { Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import NavButtons from "./header/NavButtons";

function Footer() {
  const FACEBOOK_LINK = "https://www.facebook.com/johnny.cruize.39";
  const TWITTER_LINK = "https://x.com/johnnycruize";
  return (
    <footer className="z-20 mt-auto rounded-t-xl border-t-2 bg-primary ">
      <div className="px-4 py-7 shadow-xl sm:px-12 md:flex md:items-center md:justify-between dark:text-background">
        <section className="hidden items-center justify-center md:flex">
          <Image src={app_logo} alt="app logo" className="size-20" />
          <h2 className="text-2xl font-semibold">WebAAS</h2>
        </section>

        <NavButtons className="w-full border-none md:w-auto" href="">
          Company
        </NavButtons>
        <NavButtons className="w-full border-none md:w-auto" href="">
          Resources
        </NavButtons>
        <NavButtons className="w-full border-none md:w-auto" href="">
          Contact us
        </NavButtons>

        <div className="mt-5 flex w-full justify-center gap-3 md:w-auto">
          <Link href={FACEBOOK_LINK}>
            <p className="md:hidden">Facebook</p>

            <Facebook className="hidden md:flex" />
          </Link>
          <Link href={TWITTER_LINK}>
            <p className="md:hidden">Twitter</p>
            <Twitter className="hidden md:flex" />
          </Link>
        </div>
        <section className="mt-10 flex items-center justify-center md:hidden">
          <Image src={app_logo} alt="app logo" className="size-20" />
          {/* <h2 className="text-2xl font-semibold">WebddfAAS</h2> */}
        </section>
      </div>
    </footer>
  );
}

export default Footer;
