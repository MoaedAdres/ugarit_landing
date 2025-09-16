import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface RelatedCaseStudiesProps {
	currentSlug: string;
}

// Mock related case studies - replace with actual API call
const relatedCaseStudies = [
	{
		slug: "fintech-cloud-migration",
		client_name: "SecureBank Solutions",
		sector: "Financial Services",
		summary: "Complete cloud migration with enhanced security framework",
		results: [
			{ label: "Uptime", value: "99.9%" },
			{ label: "Security", value: "A+" },
		],
	},
	{
		slug: "healthcare-devops",
		client_name: "MedTech Regional",
		sector: "Healthcare",
		summary: "DevOps transformation with automated CI/CD",
		results: [
			{ label: "Speed", value: "10x faster" },
			{ label: "Compliance", value: "100%" },
		],
	},
];

export function RelatedCaseStudies({ currentSlug }: RelatedCaseStudiesProps) {
	const filteredCaseStudies = relatedCaseStudies.filter((study) => study.slug !== currentSlug);

	if (filteredCaseStudies.length === 0) return null;

	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="font-heading font-bold text-3xl text-foreground mb-4 text-balance">Related Case Studies</h2>
					<p className="text-xl text-muted-foreground text-pretty">Explore more success stories from our portfolio</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{filteredCaseStudies.map((study, index) => (
						<Card key={study.slug} className="group hover:shadow-lg transition-all duration-300">
							<CardContent className="p-6">
								<Badge variant="outline" className="mb-4">
									{study.sector}
								</Badge>
								<h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
									{study.client_name}
								</h3>
								<p className="text-muted-foreground mb-4">{study.summary}</p>

								<div className="grid grid-cols-2 gap-4 mb-6">
									{study.results.map((result, resultIndex) => (
										<div key={resultIndex} className="text-center p-3 bg-muted/50 rounded-lg">
											<div className="font-heading font-bold text-lg text-primary">{result.value}</div>
											<div className="text-sm text-muted-foreground">{result.label}</div>
										</div>
									))}
								</div>

								<Button variant="outline" className="w-full bg-transparent" asChild>
									<Link href={`/case-studies/${study.slug}`}>
										Read Case Study
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
