import app_logo from "@/assets/images/app-logo.png";
import Image from "next/image";
import { FacebookIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import NavButtons from "./header/NavButtons";

function Footer() {
  return (
    <footer className="z-20 rounded-t-xl border-t-2 bg-background text-foreground ">
      <div className="px-4 py-7 shadow-xl sm:px-12 md:flex md:items-center md:justify-between">
        <section className="flex items-center gap-3">
          <Image src={app_logo} alt="app logo" className="size-20"></Image>
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

        <div className="flex w-full justify-center gap-3 md:w-auto">
          <Link href="">
            <FacebookIcon />
          </Link>
          <Link href="">
            <TwitterIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
