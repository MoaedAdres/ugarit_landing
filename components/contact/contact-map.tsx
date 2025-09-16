export function ContactMap() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="font-heading font-bold text-3xl text-foreground mb-4">Visit Our Office</h2>
					<p className="text-xl text-muted-foreground">Located in the heart of New York's tech district</p>
				</div>

				<div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
					<div className="text-center p-8">
						<div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-2xl">🗺️</span>
						</div>
						<p className="text-muted-foreground">Interactive map would be embedded here</p>
						<p className="text-sm text-muted-foreground mt-2">123 Technology Drive, New York, NY 10001</p>
					</div>
				</div>
			</div>
		</section>
	);
}
