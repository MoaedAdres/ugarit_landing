import Link from "next/link";
import { MobileMenuToggle } from "./mobile-menu-toggle";
import { ModeToggle } from "../theme/toggle-theme";
import { LocaleSwitcher } from "../locale/locale-switcher";
import Image from "next/image";
import Logo from "@/public/pngs/Color logo - no background.png";
import DarkLogo from "@/public/pngs/Color logo with background.png";
import { IMenu } from "@/api/services/home/header-and-footer/interfaces";

export function Header({ logo, navigations }: { navigations: IMenu[]; logo: string }) {
  console.log('navigations', navigations);
  return (
    <header className="fixed top-0 left-0 right-0 z-[99] backdrop-blur-lg bg-transparent transition-smooth">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image fill className="size-16" alt="logo" src={logo} />
          </Link>
          {/* <Link href="/" className="flex dark:hidden items-center space-x-2">
            <Image className="size-16" alt="logo" src={Logo} />
          </Link>
          <Link href="/" className="dark:flex hidden items-center space-x-2">
            <Image className="size-16" alt="logo" src={DarkLogo} />
          </Link> */}
          <LocaleSwitcher />
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigations?.map(navigation =>
              <Link
                key={navigation.id}
                href={navigation.route}
                className="text-foreground hover:text-primary-700 transition-smooth"
              >
                {navigation.name}
              </Link>)}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <ModeToggle />
          </div>

          {/* Mobile Menu Toggle - Client Component */}
          <MobileMenuToggle />
        </nav>

        {/* Mobile Navigation */}
        <div id="mobile-menu" className="lg:hidden py-4 border-t hidden">
          <div className="flex flex-col space-y-4">
            {navigations?.map(navigation =>
              <Link
                key={navigation.id}
                href={navigation.route}
                className="text-foreground hover:text-secondary transition-smooth"
              >
                {navigation.name}
              </Link>)}
          </div>
        </div>
      </div>
    </header>
  );
}
