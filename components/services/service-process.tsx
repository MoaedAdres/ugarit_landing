import { Card, CardContent } from "@/components/ui/card";

interface ProcessStep {
	title: string;
	description: string;
}

interface ServiceProcessProps {
	steps: ProcessStep[];
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">Our Process</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
						A proven methodology that ensures successful project delivery
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<Card key={index} className="relative">
							<CardContent className="p-8 text-center">
								<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-heading font-bold text-lg">
									{index + 1}
								</div>
								<h3 className="font-heading font-semibold text-xl text-foreground mb-4">{step.title}</h3>
								<p className="text-muted-foreground leading-relaxed">{step.description}</p>
							</CardContent>

							{/* Connector Line */}
							{index < steps.length - 1 && (
								<div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2" />
							)}
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
