import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Settings, Shield, Code, Database, Smartphone, ArrowRight } from "lucide-react";

const services = [
	{
		icon: Cloud,
		title: "Cloud Solutions",
		description:
			"Migrate and optimize your infrastructure with AWS, Azure, and Google Cloud platforms for maximum scalability and cost-efficiency.",
		features: ["Cloud Migration", "Infrastructure Optimization", "Multi-cloud Strategy"],
	},
	{
		icon: Settings,
		title: "DevOps & CI/CD",
		description: "Streamline your development pipeline with automated testing, deployment, and monitoring solutions for faster delivery.",
		features: ["Automated Deployment", "Container Orchestration", "Monitoring & Logging"],
	},
	{
		icon: Shield,
		title: "Cybersecurity",
		description: "Protect your digital assets with comprehensive security solutions, compliance frameworks, and threat monitoring.",
		features: ["Security Audits", "Compliance Management", "Threat Detection"],
	},
	{
		icon: Code,
		title: "Custom Development",
		description: "Build scalable applications with modern technologies including microservices, APIs, and cloud-native architectures.",
		features: ["Full-stack Development", "API Integration", "Legacy Modernization"],
	},
	{
		icon: Database,
		title: "Data Analytics",
		description:
			"Transform your data into actionable insights with advanced analytics, machine learning, and business intelligence solutions.",
		features: ["Data Warehousing", "ML/AI Solutions", "Business Intelligence"],
	},
	{
		icon: Smartphone,
		title: "Digital Transformation",
		description: "Modernize your business processes with digital solutions that improve efficiency and customer experience.",
		features: ["Process Automation", "Digital Strategy", "Change Management"],
	},
];

export function ServicesGrid() {
	return (
		<section className="py-16 bg-gradient-hero">
			<div className="container mx-auto px-6 sm:px-8 lg:px-12">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-tech-navy mb-4">
						Our <span className="text-primary">Services</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						We deliver comprehensive IT solutions that drive innovation, enhance security, and accelerate your digital transformation
						journey.
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
					{services.map((service, index) => {
						const Icon = service.icon;
						return (
							<Card key={index} className="group hover:shadow-glow transition-all duration-300 border-0 gradient-card hover:-translate-y-2">
								<CardContent className="p-6">
									<div className="flex items-center justify-center w-14 h-14 gradient-primary rounded-xl mb-5 group-hover:scale-110 transition-transform">
										<Icon className="h-7 w-7 text-white" />
									</div>

									<h3 className="text-xl font-bold text-tech-navy mb-3 group-hover:text-primary transition-colors">{service.title}</h3>

									<p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>

									<ul className="space-y-1.5 mb-5">
										{service.features.map((feature, idx) => (
											<li key={idx} className="flex items-center text-xs text-muted-foreground">
												<div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
												{feature}
											</li>
										))}
									</ul>

									<Button
										variant="ghost"
										className="group/btn text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-medium text-sm"
									>
										Learn More
										<ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* CTA */}
				<div className="text-center">
					<Button className="gradient-primary hover:opacity-90 transition-smooth px-6 py-3 font-semibold">
						Explore All Services
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
