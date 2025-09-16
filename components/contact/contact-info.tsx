import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function ContactInfo() {
	return (
		<div className="space-y-8">
			{/* Contact Details */}
			<Card>
				<CardContent className="p-8">
					<h3 className="font-heading font-bold text-xl text-foreground mb-6">Contact Information</h3>
					<div className="space-y-6">
						<div className="flex items-start space-x-4">
							<Mail className="h-6 w-6 text-primary mt-1" />
							<div>
								<div className="font-medium text-foreground">Email</div>
								<Link href="mailto:info@ugarittech.com" className="text-muted-foreground hover:text-primary">
									info@ugarittech.com
								</Link>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<Phone className="h-6 w-6 text-primary mt-1" />
							<div>
								<div className="font-medium text-foreground">Phone</div>
								<Link href="tel:+15551234567" className="text-muted-foreground hover:text-primary">
									+1 (555) 123-4567
								</Link>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<MapPin className="h-6 w-6 text-primary mt-1" />
							<div>
								<div className="font-medium text-foreground">Address</div>
								<div className="text-muted-foreground">
									123 Technology Drive
									<br />
									New York, NY 10001
									<br />
									United States
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<Clock className="h-6 w-6 text-primary mt-1" />
							<div>
								<div className="font-medium text-foreground">Business Hours</div>
								<div className="text-muted-foreground">
									Monday - Friday: 9:00 AM - 6:00 PM EST
									<br />
									Saturday: 10:00 AM - 2:00 PM EST
									<br />
									Sunday: Closed
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Social Media */}
			<Card>
				<CardContent className="p-8">
					<h3 className="font-heading font-bold text-xl text-foreground mb-6">Follow Us</h3>
					<div className="flex space-x-4">
						<Link
							href="#"
							className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
						>
							<Linkedin className="h-5 w-5" />
						</Link>
						<Link
							href="#"
							className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
						>
							<Twitter className="h-5 w-5" />
						</Link>
					</div>
				</CardContent>
			</Card>

			{/* Quick Response */}
			<Card className="bg-primary text-primary-foreground">
				<CardContent className="p-8">
					<h3 className="font-heading font-bold text-xl mb-4">Need Immediate Assistance?</h3>
					<p className="mb-4 text-primary-foreground/90">For urgent technical support or emergency situations, call our 24/7 hotline:</p>
					<Link href="tel:+15551234999" className="font-heading font-bold text-xl hover:text-primary-foreground/80 transition-colors">
						+1 (555) 123-4999
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
