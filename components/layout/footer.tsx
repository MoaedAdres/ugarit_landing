import Link from "next/link";
import { Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-muted border-t border-border">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
								<span className="text-primary-foreground font-bold text-lg">U</span>
							</div>
							<span className="font-heading font-bold text-xl">Ugarit Technologies</span>
						</div>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Professional IT solutions, cloud services, and DevOps consulting for enterprise clients.
						</p>
						<div className="flex space-x-4">
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<Linkedin className="h-5 w-5" />
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<Twitter className="h-5 w-5" />
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<Mail className="h-5 w-5" />
							</Link>
						</div>
					</div>

					{/* Services */}
					<div>
						<h3 className="font-heading font-semibold text-foreground mb-4">Services</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/services/cloud" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									Cloud Services
								</Link>
							</li>
							<li>
								<Link href="/services/devops" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									DevOps
								</Link>
							</li>
							<li>
								<Link href="/services/consulting" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									IT Consulting
								</Link>
							</li>
							<li>
								<Link href="/services/security" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									Security
								</Link>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h3 className="font-heading font-semibold text-foreground mb-4">Company</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									About Us
								</Link>
							</li>
							<li>
								<Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									Case Studies
								</Link>
							</li>
							<li>
								<Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									Blog
								</Link>
							</li>
							<li>
								<Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors text-sm">
									Careers
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className="font-heading font-semibold text-foreground mb-4">Contact</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<Mail className="h-4 w-4" />
								<span>info@ugarittech.com</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<Phone className="h-4 w-4" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span>New York, NY</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-muted-foreground text-sm">© 2024 Ugarit Technologies. All rights reserved.</p>
					<div className="flex space-x-6 mt-4 md:mt-0">
						<Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
							Privacy Policy
						</Link>
						<Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
