import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";

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
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Blog Management</h3>
					<p className="text-sm text-muted-foreground">
						{blogPosts.length} posts • {blogPosts.filter((p) => p.status === "published").length} published •{" "}
						{blogPosts.filter((p) => p.status === "draft").length} drafts
					</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/blog/add">
						<Plus className="h-4 w-4 mr-2" />
						New Post
					</Link>
				</Button>
			</div>

			{/* Filter Bar */}
			<Card>
				<CardContent className="p-4">
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline" className="cursor-pointer">
							All Posts
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Published
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Drafts
						</Badge>
						{categories.map((category: string) => (
							<Badge key={category} variant="outline" className="cursor-pointer">
								{category}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Blog Posts List */}
			<div className="grid gap-4">
				{blogPosts.map((post: any) => (
					<Card key={post.id}>
						<CardContent className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<h4 className="font-semibold text-lg">{post.title}</h4>
										<Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
										<Badge variant="outline">{post.category}</Badge>
									</div>

									<p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>

									<div className="flex flex-wrap gap-2 mb-3">
										{post.tags.map((tag: string) => (
											<Badge key={tag} variant="outline" className="text-xs">
												{tag}
											</Badge>
										))}
									</div>

									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
										<div className="flex items-center gap-1">
											<User className="h-4 w-4" />
											<span>{post.author}</span>
										</div>
										<div className="flex items-center gap-1">
											<Calendar className="h-4 w-4" />
											<span>{new Date(post.publishDate).toLocaleDateString()}</span>
										</div>
										<div>
											<span className="font-medium">Read Time:</span>
											<span className="text-muted-foreground ml-1">{post.readTime}</span>
										</div>
										<div>
											<span className="font-medium">Views:</span>
											<span className="text-muted-foreground ml-1">{post.views.toLocaleString()}</span>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2 ml-4">
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/blog/${post.id}/preview`}>
											<Eye className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/blog/${post.id}/edit`}>
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

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">12</div>
						<p className="text-sm text-muted-foreground">Total Posts</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">8</div>
						<p className="text-sm text-muted-foreground">Published</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">4</div>
						<p className="text-sm text-muted-foreground">Drafts</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">15.2K</div>
						<p className="text-sm text-muted-foreground">Total Views</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
