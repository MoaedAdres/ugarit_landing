import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PartnersPage() {
	return (
		<div className="grid gap-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Partners & Certifications</h3>
					<p className="text-sm text-muted-foreground">12 partners, 8 certifications</p>
				</div>
				<Button>
					<i className="fas fa-plus mr-2 h-4 w-4" />
					Add Partner
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<Card key={i} className="text-center">
						<CardContent className="p-6">
							<div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
								<i className="fas fa-building text-2xl text-muted-foreground" />
							</div>
							<h4 className="font-medium">Partner {i + 1}</h4>
							<p className="text-sm text-muted-foreground">Technology Partner</p>
							<Button size="sm" variant="outline" className="mt-3 bg-transparent">
								Edit
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
