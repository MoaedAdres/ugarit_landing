import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star, User, Calendar } from "lucide-react";
import Link from "next/link";

// Mock testimonials data
const testimonials = [
	{
		id: 1,
		name: "John Smith",
		role: "CEO",
		company: "TechCorp Inc.",
		content:
			"Excellent service and outstanding results. The team delivered beyond our expectations and helped transform our business operations.",
		rating: 5,
		avatar: "/avatar1.jpg",
		status: "published",
		featured: true,
		createdAt: "2024-01-20",
		project: "E-commerce Platform",
	},
	{
		id: 2,
		name: "Sarah Johnson",
		role: "Marketing Director",
		company: "GrowthCo",
		content:
			"Professional, reliable, and innovative. They understood our needs perfectly and delivered a solution that exceeded our goals.",
		rating: 5,
		avatar: "/avatar2.jpg",
		status: "published",
		featured: false,
		createdAt: "2024-01-18",
		project: "Digital Marketing Campaign",
	},
	{
		id: 3,
		name: "Mike Chen",
		role: "CTO",
		company: "StartupXYZ",
		content:
			"The technical expertise and attention to detail were impressive. Our mobile app launch was a huge success thanks to their work.",
		rating: 4,
		avatar: "/avatar3.jpg",
		status: "draft",
		featured: false,
		createdAt: "2024-01-15",
		project: "Mobile App Development",
	},
	{
		id: 4,
		name: "Emily Davis",
		role: "Founder",
		company: "InnovateLab",
		content: "Great communication throughout the project. They kept us informed at every step and delivered exactly what we needed.",
		rating: 5,
		avatar: "/avatar4.jpg",
		status: "published",
		featured: true,
		createdAt: "2024-01-12",
		project: "Web Development",
	},
];

export default function TestimonialsPage() {
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
		));
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Testimonials Management</h3>
					<p className="text-sm text-muted-foreground">
						{testimonials.length} testimonials • {testimonials.filter((t) => t.status === "published").length} published •{" "}
						{testimonials.filter((t) => t.featured).length} featured
					</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/testimonials/add">
						<Plus className="h-4 w-4 mr-2" />
						Add Testimonial
					</Link>
				</Button>
			</div>

			{/* Filter Bar */}
			<Card>
				<CardContent className="p-4">
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline" className="cursor-pointer">
							All Testimonials
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Published
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Drafts
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Featured
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							5 Stars
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							4+ Stars
						</Badge>
					</div>
				</CardContent>
			</Card>

			{/* Testimonials Grid */}
			<div className="grid gap-4 md:grid-cols-2">
				{testimonials.map((testimonial: any) => (
					<Card key={testimonial.id}>
						<CardHeader>
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
										<User className="h-6 w-6 text-muted-foreground" />
									</div>
									<div>
										<CardTitle className="text-base">{testimonial.name}</CardTitle>
										<CardDescription>
											{testimonial.role} at {testimonial.company}
										</CardDescription>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Badge variant={testimonial.status === "published" ? "default" : "secondary"}>{testimonial.status}</Badge>
									{testimonial.featured && <Badge className="bg-yellow-500">Featured</Badge>}
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="flex">{renderStars(testimonial.rating)}</div>
										<span className="text-sm text-muted-foreground">{testimonial.rating}/5</span>
									</div>
									<div className="flex items-center gap-1">
										<Button variant="ghost" size="sm" asChild>
											<Link href={`/dashboard/testimonials/${testimonial.id}/edit`}>
												<Edit className="h-4 w-4" />
											</Link>
										</Button>
										<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>

								<div className="pt-2 border-t text-xs text-muted-foreground">
									<div className="flex items-center justify-between">
										<span>Project: {testimonial.project}</span>
										<div className="flex items-center gap-1">
											<Calendar className="h-3 w-3" />
											{new Date(testimonial.createdAt).toLocaleDateString()}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">24</div>
						<p className="text-sm text-muted-foreground">Total Testimonials</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">18</div>
						<p className="text-sm text-muted-foreground">Published</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">4.8</div>
						<p className="text-sm text-muted-foreground">Average Rating</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">6</div>
						<p className="text-sm text-muted-foreground">Featured</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
