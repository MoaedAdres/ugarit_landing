import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Settings, Shield } from "lucide-react";
import Link from "next/link";

interface RelatedServicesProps {
	relatedIds: string[];
}

// Mock related services data
const relatedServicesData: Record<string, any> = {
	cloud: {
		slug: "cloud",
		title: "Cloud Services",
		excerpt: "Migrate and optimize your cloud infrastructure",
		icon: Cloud,
	},
	devops: {
		slug: "devops",
		title: "DevOps Solutions",
		excerpt: "Streamline development with automation",
		icon: Settings,
	},
	security: {
		slug: "security",
		title: "Security Services",
		excerpt: "Comprehensive cybersecurity solutions",
		icon: Shield,
	},
};

export function RelatedServices({ relatedIds }: RelatedServicesProps) {
	const relatedServices = relatedIds.map((id) => relatedServicesData[id]).filter(Boolean);

	if (relatedServices.length === 0) return null;

	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="font-heading font-bold text-3xl text-foreground mb-4 text-balance">Related Services</h2>
					<p className="text-xl text-muted-foreground text-pretty">Explore other services that complement your needs</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{relatedServices.map((service, index) => {
						const IconComponent = service.icon;
						return (
							<Card key={service.slug} className="group hover:shadow-lg transition-all duration-300">
								<CardContent className="p-6 flex items-center space-x-4">
									<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
										<IconComponent className="h-6 w-6 text-primary" />
									</div>
									<div className="flex-1">
										<h3 className="font-heading font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
											{service.title}
										</h3>
										<p className="text-muted-foreground text-sm">{service.excerpt}</p>
									</div>
									<Button variant="outline" size="sm" asChild>
										<Link href={`/services/${service.slug}`}>Learn More</Link>
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
