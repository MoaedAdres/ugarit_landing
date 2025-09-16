import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactMap } from "@/components/contact/contact-map";

export default function ContactPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-16">
				<ContactHero />
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<ContactForm />
						<ContactInfo />
					</div>
				</div>
				<ContactMap />
			</main>
			<Footer />
		</div>
	);
}
