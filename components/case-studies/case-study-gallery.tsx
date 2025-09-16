interface GalleryItem {
	url: string;
	alt: string;
}

interface CaseStudyGalleryProps {
	gallery: GalleryItem[];
}

export function CaseStudyGallery({ gallery }: CaseStudyGalleryProps) {
	if (!gallery || gallery.length === 0) return null;

	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">Project Gallery</h2>
					<p className="text-xl text-muted-foreground text-pretty">Visual highlights from the implementation process</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{gallery.map((item, index) => (
						<div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-lg group">
							<div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
								<div className="text-center p-6">
									<div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl">📊</span>
									</div>
									<p className="text-muted-foreground font-medium">{item.alt}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
