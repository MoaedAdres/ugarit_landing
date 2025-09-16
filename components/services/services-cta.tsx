import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Calendar } from "lucide-react";
import Link from "next/link";

export function ServicesCta() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">Ready to Get Started?</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
						Let's discuss how our services can help transform your business
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					<Card className="text-center hover:shadow-lg transition-shadow">
						<CardContent className="p-6">
							<Phone className="h-8 w-8 text-primary mx-auto mb-4" />
							<h3 className="font-heading font-semibold text-lg mb-2">Call Us</h3>
							<p className="text-muted-foreground mb-4">Speak directly with our experts</p>
							<Button variant="outline" asChild>
								<Link href="tel:+15551234567">+1 (555) 123-4567</Link>
							</Button>
						</CardContent>
					</Card>

					<Card className="text-center hover:shadow-lg transition-shadow">
						<CardContent className="p-6">
							<Mail className="h-8 w-8 text-primary mx-auto mb-4" />
							<h3 className="font-heading font-semibold text-lg mb-2">Email Us</h3>
							<p className="text-muted-foreground mb-4">Get detailed information</p>
							<Button variant="outline" asChild>
								<Link href="mailto:info@ugarittech.com">Send Email</Link>
							</Button>
						</CardContent>
					</Card>

					<Card className="text-center hover:shadow-lg transition-shadow">
						<CardContent className="p-6">
							<Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
							<h3 className="font-heading font-semibold text-lg mb-2">Schedule Call</h3>
							<p className="text-muted-foreground mb-4">Book a consultation</p>
							<Button asChild>
								<Link href="/contact">Schedule Now</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
