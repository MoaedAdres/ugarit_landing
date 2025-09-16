"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star, User, Calendar, Search, Filter, MessageSquare, TrendingUp, Award, Heart, Quote, ArrowRight, Eye, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
		));
	};

	return (
		<div className="space-y-8">
			{/* Hero Header Section */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 p-8 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative z-10">
					<div className="flex items-start justify-between mb-6">
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl">
									<Heart className="h-6 w-6" />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Client Testimonials</h1>
									<p className="text-rose-100">Showcase your success stories</p>
								</div>
							</div>
							<div className="flex items-center gap-6 text-sm">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									<span>{testimonials.filter((t) => t.status === "published").length} Published</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
									<span>{testimonials.filter((t) => t.featured).length} Featured</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
									<span>{testimonials.length} Total</span>
								</div>
							</div>
						</div>
						<Button asChild size="lg" className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg">
							<Link href="/dashboard/testimonials/add">
								<MessageSquare className="h-4 w-4 mr-2" />
								Add Testimonial
							</Link>
						</Button>
					</div>
				</div>
				{/* Decorative elements */}
				<div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
			</div>

			{/* Search and Filter Section */}
			<div className="flex flex-col lg:flex-row gap-4">
				{/* Search Bar */}
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search testimonials..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
					</div>
				</div>
				
				{/* Filter Pills */}
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
					<div className="flex gap-2">
						{["all", "published", "drafts", "featured", "5stars", "4stars"].map((filter) => (
							<button
								key={filter}
								onClick={() => setSelectedFilter(filter)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
									selectedFilter === filter
										? "bg-primary text-primary-foreground shadow-md"
										: "bg-muted text-muted-foreground hover:bg-muted/80"
								}`}
							>
								{filter === "5stars" ? "5 Stars" : filter === "4stars" ? "4+ Stars" : filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Testimonials Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{testimonials.map((testimonial: any) => (
					<Card key={testimonial.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
						<CardContent className="p-0">
							{/* Quote Header */}
							<div className="relative p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
								<div className="absolute top-4 left-4">
									<Quote className="h-8 w-8 text-rose-200 dark:text-rose-800" />
								</div>
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1 ml-8">
										<div className="flex items-center gap-2 mb-2">
											<Badge variant={testimonial.status === "published" ? "default" : "secondary"} className="text-xs">
												{testimonial.status}
											</Badge>
											{testimonial.featured && (
												<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
													<Star className="h-3 w-3 mr-1" />
													Featured
												</Badge>
											)}
										</div>
										<h3 className="font-bold text-lg mb-1 group-hover:text-rose-600 transition-colors">
											{testimonial.name}
										</h3>
										<p className="text-sm text-rose-600/80 font-medium">{testimonial.role} at {testimonial.company}</p>
									</div>
									<div className="flex items-center gap-1">
										<Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
											<Link href={`/dashboard/testimonials/${testimonial.id}?isEdit=false`}>
												<Eye className="h-4 w-4" />
											</Link>
										</Button>
										<Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
											<Link href={`/dashboard/testimonials/${testimonial.id}?isEdit=true`}>
												<Edit className="h-4 w-4" />
											</Link>
										</Button>
									</div>
								</div>
							</div>

							{/* Testimonial Content */}
							<div className="p-6 space-y-4">
								{/* Quote Text */}
								<div className="relative">
									<p className="text-muted-foreground leading-relaxed italic text-sm line-clamp-3">
										"{testimonial.content}"
									</p>
								</div>

								{/* Rating */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="flex">{renderStars(testimonial.rating)}</div>
										<span className="text-sm font-medium text-muted-foreground">{testimonial.rating}/5</span>
									</div>
									<Badge variant="outline" className="text-xs">
										{testimonial.project}
									</Badge>
								</div>

								{/* Footer */}
								<div className="flex items-center justify-between pt-4 border-t">
									<div className="flex items-center gap-2 text-xs text-muted-foreground">
										<Calendar className="h-3 w-3" />
										<span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
									</div>
									<Button variant="ghost" size="sm" asChild className="text-xs">
										<Link href={`/dashboard/testimonials/${testimonial.id}?isEdit=false`}>
											View Details
											<ArrowRight className="h-3 w-3 ml-1" />
										</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Testimonials Analytics Section */}
			<div className="space-y-6">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl">
						<BarChart3 className="h-5 w-5 text-white" />
					</div>
					<div>
						<h2 className="text-xl font-bold">Testimonials Analytics</h2>
						<p className="text-sm text-muted-foreground">Track your client satisfaction</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Total Testimonials */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-3xl font-bold text-rose-600 dark:text-rose-400">{testimonials.length}</div>
									<p className="text-sm font-medium text-rose-800 dark:text-rose-200">Total Testimonials</p>
									<p className="text-xs text-rose-600/70 dark:text-rose-400/70">All client feedback</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
									<MessageSquare className="h-6 w-6 text-rose-600 dark:text-rose-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Published */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-3xl font-bold text-green-600 dark:text-green-400">
										{testimonials.filter((t) => t.status === "published").length}
									</div>
									<p className="text-sm font-medium text-green-800 dark:text-green-200">Published</p>
									<p className="text-xs text-green-600/70 dark:text-green-400/70">Live on website</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl">
									<Award className="h-6 w-6 text-green-600 dark:text-green-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Average Rating */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
										{(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
									</div>
									<p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Average Rating</p>
									<p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Client satisfaction</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
									<Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Featured */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
										{testimonials.filter((t) => t.featured).length}
									</div>
									<p className="text-sm font-medium text-purple-800 dark:text-purple-200">Featured</p>
									<p className="text-xs text-purple-600/70 dark:text-purple-400/70">Homepage highlights</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
									<Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				{/* <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold mb-1">Build trust with social proof</h3>
								<p className="text-sm text-muted-foreground">Collect and showcase client testimonials to build credibility and trust.</p>
							</div>
							<div className="flex gap-3">
								<Button variant="outline" size="sm">
									<TrendingUp className="h-4 w-4 mr-2" />
									View Analytics
								</Button>
								<Button asChild size="sm">
									<Link href="/dashboard/testimonials/add">
										<MessageSquare className="h-4 w-4 mr-2" />
										Add Testimonial
									</Link>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card> */}
			</div>
		</div>
	);
}
