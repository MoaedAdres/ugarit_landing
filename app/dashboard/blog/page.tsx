"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Plus,
	Edit,
	Trash2,
	Eye,
	Calendar,
	User,
	Search,
	Filter,
	BookOpen,
	TrendingUp,
	Clock,
	MessageCircle,
	Star,
	ArrowRight,
	PenTool,
	BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock blog posts data
const blogPosts = [
	{
		id: 1,
		title: "The Future of Web Development",
		slug: "future-of-web-development",
		excerpt: "Exploring upcoming trends and technologies that will shape web development in 2024 and beyond.",
		author: "John Smith",
		publishDate: "2024-01-15",
		status: "published",
		category: "Technology",
		tags: ["Web Dev", "Trends", "Future"],
		readTime: "5 min read",
		views: 1250,
	},
	{
		id: 2,
		title: "Building Scalable React Applications",
		slug: "building-scalable-react-applications",
		excerpt: "Best practices and patterns for creating maintainable and scalable React applications.",
		author: "Sarah Johnson",
		publishDate: "2024-01-10",
		status: "draft",
		category: "Development",
		tags: ["React", "Architecture", "Best Practices"],
		readTime: "8 min read",
		views: 0,
	},
	{
		id: 3,
		title: "UX Design Principles for Developers",
		slug: "ux-design-principles-for-developers",
		excerpt: "Essential UX principles every developer should know to create better user experiences.",
		author: "Mike Chen",
		publishDate: "2024-01-05",
		status: "published",
		category: "Design",
		tags: ["UX", "Design", "Development"],
		readTime: "6 min read",
		views: 890,
	},
];

const categories = ["Technology", "Development", "Design", "Business", "Marketing"];

export default function BlogPage() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="space-y-8">
			{/* Hero Header Section */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative z-10">
					<div className="flex items-start justify-between mb-6">
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl">
									<BookOpen className="h-6 w-6" />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Blog Management</h1>
									<p className="text-emerald-100">Share your insights and expertise</p>
								</div>
							</div>
							<div className="flex items-center gap-6 text-sm">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									<span>{blogPosts.filter((p) => p.status === "published").length} Published</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
									<span>{blogPosts.filter((p) => p.status === "draft").length} Drafts</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
									<span>{blogPosts.length} Total</span>
								</div>
							</div>
						</div>
						<Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg">
							<Link href="/dashboard/blog/add">
								<PenTool className="h-4 w-4 mr-2" />
								Write New Post
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
							placeholder="Search blog posts..."
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
						{["all", "published", "drafts"].map((filter) => (
							<button
								key={filter}
								onClick={() => setSelectedFilter(filter)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
									selectedFilter === filter
										? "bg-primary text-primary-foreground shadow-md"
										: "bg-muted text-muted-foreground hover:bg-muted/80"
								}`}
							>
								{filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Blog Posts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{blogPosts.map((post: any) => (
					<Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
						<CardContent className="p-0">
							{/* Card Header with Gradient */}
							<div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
												{post.status}
											</Badge>
											<Badge variant="outline" className="text-xs">
												{post.category}
											</Badge>
										</div>
										<h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
										<p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
									</div>
									<div className="flex items-center gap-1">
										<Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
											<Link href={`/dashboard/blog/${post.id}?isEdit=false`}>
												<Eye className="h-4 w-4" />
											</Link>
										</Button>
										<Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
											<Link href={`/dashboard/blog/${post.id}?isEdit=true`}>
												<Edit className="h-4 w-4" />
											</Link>
										</Button>
									</div>
								</div>
							</div>

							{/* Card Body */}
							<div className="p-6 space-y-4">
								{/* Author and Date */}
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-2">
										<User className="h-4 w-4 text-muted-foreground" />
										<span className="font-medium">{post.author}</span>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4 text-muted-foreground" />
										<span className="text-muted-foreground">{new Date(post.publishDate).toLocaleDateString()}</span>
									</div>
								</div>

								{/* Tags */}
								<div>
									<div className="flex flex-wrap gap-1">
										{post.tags.slice(0, 3).map((tag: string) => (
											<Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
												{tag}
											</Badge>
										))}
										{post.tags.length > 3 && (
											<Badge variant="outline" className="text-xs px-2 py-1">
												+{post.tags.length - 3} more
											</Badge>
										)}
									</div>
								</div>

								{/* Stats */}
								<div className="flex items-center justify-between pt-4 border-t">
									<div className="flex items-center gap-4 text-xs text-muted-foreground">
										<div className="flex items-center gap-1">
											<Clock className="h-3 w-3" />
											<span>{post.readTime}</span>
										</div>
										<div className="flex items-center gap-1">
											<BarChart3 className="h-3 w-3" />
											<span>{post.views.toLocaleString()} views</span>
										</div>
									</div>
									<Button variant="ghost" size="sm" asChild className="text-xs">
										<Link href={`/dashboard/blog/${post.id}?isEdit=false`}>
											Read More
											<ArrowRight className="h-3 w-3 ml-1" />
										</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Blog Analytics Section */}
			<div className="space-y-6">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
						<BarChart3 className="h-5 w-5 text-white" />
					</div>
					<div>
						<h2 className="text-xl font-bold">Blog Analytics</h2>
						<p className="text-sm text-muted-foreground">Track your content performance</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Total Posts */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{blogPosts.length}</div>
									<p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Posts</p>
									<p className="text-xs text-blue-600/70 dark:text-blue-400/70">All blog posts</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
									<BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
										{blogPosts.filter((p) => p.status === "published").length}
									</div>
									<p className="text-sm font-medium text-green-800 dark:text-green-200">Published</p>
									<p className="text-xs text-green-600/70 dark:text-green-400/70">Live on website</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl">
									<Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Drafts */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
										{blogPosts.filter((p) => p.status === "draft").length}
									</div>
									<p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Drafts</p>
									<p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Work in progress</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
									<PenTool className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Total Views */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
										{blogPosts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
									</div>
									<p className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Views</p>
									<p className="text-xs text-purple-600/70 dark:text-purple-400/70">All time views</p>
								</div>
								<div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
									<TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>


			</div>
		</div>
	);
}
