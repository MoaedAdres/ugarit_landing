import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Rss } from "lucide-react";
import Link from "next/link";

export function BlogPostCta() {
	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<Card className="max-w-2xl mx-auto text-center">
					<CardContent className="p-12">
						<h2 className="font-heading font-bold text-2xl text-foreground mb-4 text-balance">Stay Updated with Our Latest Insights</h2>
						<p className="text-muted-foreground mb-8 text-pretty">
							Subscribe to our newsletter and never miss the latest technology trends, best practices, and expert insights.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild size="lg">
								<Link href="/newsletter">
									<Mail className="mr-2 h-4 w-4" />
									Subscribe to Newsletter
								</Link>
							</Button>
							<Button variant="outline" size="lg" asChild>
								<Link href="/blog/rss">
									<Rss className="mr-2 h-4 w-4" />
									RSS Feed
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
