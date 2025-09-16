import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

// Mock data for services
const services = [
	{
		id: 1,
		title: "Web Development",
		category: "Development",
		description: "Custom web applications and websites",
		price: "$2,500 - $15,000",
		duration: "4-12 weeks",
		isActive: true,
		updatedAt: "1 day ago",
	},
	{
		id: 2,
		title: "Mobile App Development",
		category: "Development",
		description: "iOS and Android mobile applications",
		price: "$5,000 - $25,000",
		duration: "8-16 weeks",
		isActive: true,
		updatedAt: "3 days ago",
	},
	{
		id: 3,
		title: "Digital Marketing",
		category: "Marketing",
		description: "SEO, PPC, and social media marketing",
		price: "$1,000 - $5,000/month",
		duration: "Ongoing",
		isActive: false,
		updatedAt: "1 week ago",
	},
];

export default function ServicesPage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Service Management</h3>
					<p className="text-sm text-muted-foreground">
						{services.length} services • {services.filter((s) => s.isActive).length} active
					</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/services/add">
						<Plus className="h-4 w-4 mr-2" />
						Add Service
					</Link>
				</Button>
			</div>

			<div className="grid gap-4">
				{services.map((service: any) => (
					<Card key={service.id}>
						<CardContent className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<h4 className="font-semibold text-lg">{service.title}</h4>
										<Badge variant={service.isActive ? "default" : "secondary"}>{service.isActive ? "Active" : "Inactive"}</Badge>
										<Badge variant="outline">{service.category}</Badge>
									</div>

									<p className="text-muted-foreground mb-3">{service.description}</p>

									<div className="grid grid-cols-3 gap-4 text-sm">
										<div>
											<span className="font-medium">Price Range:</span>
											<p className="text-muted-foreground">{service.price}</p>
										</div>
										<div>
											<span className="font-medium">Duration:</span>
											<p className="text-muted-foreground">{service.duration}</p>
										</div>
										<div>
											<span className="font-medium">Last Updated:</span>
											<p className="text-muted-foreground">{service.updatedAt}</p>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2 ml-4">
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/services/${service.id}/preview`}>
											<Eye className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/services/${service.id}/edit`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Service Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline">Development (2)</Badge>
						<Badge variant="outline">Marketing (1)</Badge>
						<Badge variant="outline">Design (0)</Badge>
						<Badge variant="outline">Consulting (0)</Badge>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
