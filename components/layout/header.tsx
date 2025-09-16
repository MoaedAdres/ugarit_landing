import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { MobileMenuToggle } from "./mobile-menu-toggle";
import { ModeToggle } from "../theme/toggle-theme";
import { LocaleSwitcher } from "../locale/locale-switcher";
import Image from "next/image";
import Logo from "@/public/pngs/Color logo - no background.png";

const navigation = [
	{ name: "Services", href: "/services" },
	{ name: "Case Studies", href: "/case-studies" },
	{ name: "Blog", href: "/blog" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

export function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-transparent transition-smooth">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Image className="size-16" alt="logo" src={Logo} />
						<span className="text-xl font-bold text-primary-foreground">Ugarit Technologies</span>
					</Link>
					{/* <LocaleSwitcher /> */}
					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-8">
						<Link href="/" className="text-foreground hover:text-primary transition-smooth">
							Home
						</Link>
						<div className="relative group">
							<button className="flex items-center text-foreground hover:text-primary transition-smooth">
								Services
								<ChevronDown className="ml-1 h-4 w-4" />
							</button>
						</div>
						<Link href="/about" className="text-foreground hover:text-primary transition-smooth">
							About
						</Link>
						<Link href="/case-studies" className="text-foreground hover:text-primary transition-smooth">
							Case Studies
						</Link>
						<Link href="/blog" className="text-foreground hover:text-primary transition-smooth">
							Blog
						</Link>
						<Link href="/contact" className="text-foreground hover:text-primary transition-smooth">
							Contact
						</Link>
						<Link href="/dashboard/signin" className="text-foreground hover:text-primary transition-smooth">
							signin
						</Link>
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
						<Link href="/" className="text-foreground hover:text-primary transition-smooth">
							Home
						</Link>
						<Link href="/services" className="text-foreground hover:text-primary transition-smooth">
							Services
						</Link>
						<Link href="/about" className="text-foreground hover:text-primary transition-smooth">
							About
						</Link>
						<Link href="/case-studies" className="text-foreground hover:text-primary transition-smooth">
							Case Studies
						</Link>
						<Link href="/blog" className="text-foreground hover:text-primary transition-smooth">
							Blog
						</Link>
						<Link href="/contact" className="text-foreground hover:text-primary transition-smooth">
							Contact
						</Link>
						<Button variant="default" className="gradient-primary w-full">
							Get Quote
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
