import { Badge } from "@/components/ui/badge";

interface ServiceHeroProps {
	service: {
		title: string;
		excerpt: string;
		hero_media: { url: string; alt: string };
		body_blocks: Array<{ type: string; content: string }>;
	};
}

export function ServiceHero({ service }: ServiceHeroProps) {
	return (
		<section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<Badge variant="secondary" className="w-fit">
							Service
						</Badge>
						<h1 className="font-heading font-black text-4xl md:text-5xl text-foreground text-balance">{service.title}</h1>
						<p className="text-xl text-muted-foreground leading-relaxed text-pretty">{service.excerpt}</p>
						{service.body_blocks.map((block, index) => (
							<div key={index} className="prose prose-lg max-w-none">
								<p className="text-muted-foreground leading-relaxed">{block.content}</p>
							</div>
						))}
					</div>

					<div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
						<div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
							<div className="text-center p-8">
								<div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-4xl">⚡</span>
								</div>
								<p className="text-muted-foreground">{service.hero_media.alt}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
