import app_logo from "@/assets/images/app-logo.png";
import Image from "next/image";
import { FacebookIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import NavButtons from "./header/NavButtons";

function Footer() {
  return (
    <footer className="fixed bottom-0 mb-0 flex w-full flex-col items-center justify-between rounded-t-xl border-t-2 bg-background px-5 text-foreground md:flex-row">
      <section className="flex items-center gap-3">
        <Image src={app_logo} alt="app logo" className="size-20"></Image>
        <h2 className="text-2xl">WebAAS</h2>
      </section>

      <NavButtons className="border-none" href="">
        Company
      </NavButtons>
      <NavButtons className="border-none" href="">
        Resources
      </NavButtons>
      <NavButtons className="border-none" href="">
        Contact us
      </NavButtons>

      <div className="flex items-center gap-3">
        <Link href="">
          <FacebookIcon />
        </Link>
        <Link href="">
          <TwitterIcon />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
