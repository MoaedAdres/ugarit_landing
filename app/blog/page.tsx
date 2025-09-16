import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogFilters } from "@/components/blog/blog-filters";
import { BlogFeatured } from "@/components/blog/blog-featured";

export default function BlogPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
							Insights & Resources
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
							Stay updated with the latest trends, best practices, and insights from our technology experts and industry thought leaders
						</p>
					</div>
				</section>

				<BlogFeatured />
				<BlogFilters />
				<BlogGrid />
			</main>
			<Footer />
		</div>
	);
}
