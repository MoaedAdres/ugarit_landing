"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Plus, X, Upload, Calendar, Edit, Eye, Clock, User, BookOpen, MessageCircle, Star, BarChart3, PenTool, Hash } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

// Mock blog post data
const mockBlogPost = {
	id: 1,
	title: "The Future of Web Development",
	slug: "future-of-web-development",
	excerpt: "Exploring upcoming trends and technologies that will shape web development in 2024 and beyond. From AI-powered development tools to new frameworks, discover what's coming next.",
	content: `# The Future of Web Development

The web development landscape is evolving at an unprecedented pace. As we move through 2024, several key trends are emerging that will fundamentally change how we build and interact with web applications.

## AI-Powered Development

Artificial Intelligence is revolutionizing the development process. Tools like GitHub Copilot and ChatGPT are becoming essential for developers, helping with code generation, debugging, and documentation.

### Key Benefits:
- Faster development cycles
- Reduced boilerplate code
- Improved code quality
- Enhanced learning opportunities

## Modern Frameworks and Tools

New frameworks are emerging that prioritize performance and developer experience:

- **Next.js 14**: Enhanced App Router and Server Components
- **SvelteKit**: Compile-time optimizations
- **Astro**: Content-focused architecture
- **Qwik**: Resumable applications

## The Rise of Edge Computing

Edge computing is becoming crucial for modern web applications, enabling:
- Reduced latency
- Better performance
- Enhanced security
- Improved user experience

## Conclusion

The future of web development is exciting and full of possibilities. By staying current with these trends and technologies, developers can build better, faster, and more efficient applications.`,
	author: "John Smith",
	publishDate: "2024-01-15T10:00:00",
	status: "published",
	category: "Technology",
	tags: ["Web Dev", "Trends", "Future", "AI", "Frameworks"],
	readTime: "5 min read",
	views: 1250,
	allowComments: true,
	featured: true,
	seoTitle: "The Future of Web Development: Trends and Technologies for 2024",
	seoDescription: "Discover the latest trends and technologies shaping web development in 2024, from AI-powered tools to modern frameworks.",
	featuredImage: "/api/placeholder/800/400",
	updatedAt: "2 days ago",
};

// View Blog Post Component
function ViewBlogPostPage({ post }: { post: any }) {
	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<Link href="/dashboard/blog">
						<Button variant="ghost" size="sm" className="mt-1">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Blog
						</Button>
					</Link>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-emerald-500/20">
								<BookOpen className="h-7 w-7 text-emerald-600" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
								<div className="flex items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{post.category}</Badge>
									<Badge variant={post.status === "published" ? "default" : "secondary"} className="font-medium">
										{post.status === "published" ? "Published" : "Draft"}
									</Badge>
									{post.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											<Star className="h-3 w-3 mr-1" />
											Featured
										</Badge>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button asChild size="lg" className="shadow-lg">
					<Link href={`/dashboard/blog/${post.id}?isEdit=true`}>
						<Edit className="h-4 w-4 mr-2" />
						Edit Post
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Post Overview */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardContent className="p-8">
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-semibold mb-3 text-foreground">Post Overview</h2>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-xl">
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{post.author}</div>
											<div className="text-sm font-medium text-muted-foreground">Author</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{post.readTime}</div>
											<div className="text-sm font-medium text-muted-foreground">Read Time</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{post.views.toLocaleString()}</div>
											<div className="text-sm font-medium text-muted-foreground">Views</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Excerpt */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Post Excerpt
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground leading-relaxed text-lg">{post.excerpt}</p>
						</CardContent>
					</Card>

					{/* Content Preview */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Content Preview
							</CardTitle>
							<CardDescription>First 500 characters of the post content</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="prose prose-sm max-w-none">
								<p className="text-muted-foreground leading-relaxed">
									{post.content.substring(0, 500)}...
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Tags */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								Tags
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-3">
								{post.tags.map((tag: string, index: number) => (
									<Badge key={index} variant="secondary" className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
										<Hash className="h-3 w-3 mr-1" />
										{tag}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Post Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Status</div>
										<div className="text-xs text-muted-foreground">Publication status</div>
									</div>
									<Badge variant={post.status === "published" ? "default" : "secondary"} className="font-medium">
										{post.status === "published" ? "Published" : "Draft"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Featured</div>
										<div className="text-xs text-muted-foreground">Homepage highlight</div>
									</div>
									<Badge variant={post.featured ? "default" : "secondary"} className="font-medium">
										{post.featured ? "Yes" : "No"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Comments</div>
										<div className="text-xs text-muted-foreground">Reader engagement</div>
									</div>
									<Badge variant={post.allowComments ? "default" : "secondary"} className="font-medium">
										{post.allowComments ? "Enabled" : "Disabled"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Publish Date</div>
										<div className="text-xs text-muted-foreground">When published</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">
										{new Date(post.publishDate).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Last Updated</div>
										<div className="text-xs text-muted-foreground">Recent changes</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">{post.updatedAt}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Quick Actions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button asChild className="w-full" size="lg">
								<Link href={`/dashboard/blog/${post.id}?isEdit=true`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Post
								</Link>
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<Eye className="h-4 w-4 mr-2" />
								Preview on Site
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<MessageCircle className="h-4 w-4 mr-2" />
								View Comments
							</Button>
							<Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20" size="lg">
								<X className="h-4 w-4 mr-2" />
								Delete Post
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

// Edit Blog Post Component
function EditBlogPostPage({ post, setPost }: { post: any; setPost: any }) {
	const [newTag, setNewTag] = useState("");
	const categories = ["Technology", "Development", "Design", "Business", "Marketing"];

	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.trim();
	};

	const handleTitleChange = (title: string) => {
		setPost({
			...post,
			title,
			slug: generateSlug(title),
			seoTitle: title,
		});
	};

	const addTag = () => {
		if (newTag.trim() && !post.tags.includes(newTag.trim())) {
			setPost({
				...post,
				tags: [...post.tags, newTag.trim()],
			});
			setNewTag("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		setPost({
			...post,
			tags: post.tags.filter((tag: string) => tag !== tagToRemove),
		});
	};

	const handleSave = (status = "draft") => {
		const dataToSave = { ...post, status };
		console.log("Updating blog post:", dataToSave);
		// Update logic would go here
	};

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<Link href="/dashboard/blog">
						<Button variant="ghost" size="sm" className="mt-1">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Blog
						</Button>
					</Link>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-emerald-500/20">
								<PenTool className="h-7 w-7 text-emerald-600" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
								<p className="text-muted-foreground">Update your blog post content and settings</p>
							</div>
						</div>
					</div>
				</div>
				<Button asChild variant="outline" size="lg">
					<Link href={`/dashboard/blog/${post.id}?isEdit=false`}>
						<Eye className="h-4 w-4 mr-2" />
						View Post
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Post Content Card */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-primary rounded-full"></div>
								Post Content
							</CardTitle>
							<CardDescription>Main blog post information</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<Label htmlFor="title" className="text-sm font-medium">Title</Label>
								<Input
									id="title"
									value={post.title}
									onChange={(e) => handleTitleChange(e.target.value)}
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="slug" className="text-sm font-medium">URL Slug</Label>
								<Input
									id="slug"
									value={post.slug}
									onChange={(e) => setPost({ ...post, slug: e.target.value })}
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="excerpt" className="text-sm font-medium">Excerpt</Label>
								<Textarea
									id="excerpt"
									value={post.excerpt}
									onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
									rows={3}
									className="resize-none"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="content" className="text-sm font-medium">Content</Label>
								<Textarea
									id="content"
									value={post.content}
									onChange={(e) => setPost({ ...post, content: e.target.value })}
									rows={12}
									className="resize-none min-h-[300px]"
								/>
							</div>
						</CardContent>
					</Card>

					{/* SEO Settings Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								SEO Settings
							</CardTitle>
							<CardDescription>Search engine optimization</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<Label htmlFor="seoTitle" className="text-sm font-medium">SEO Title</Label>
								<Input
									id="seoTitle"
									value={post.seoTitle}
									onChange={(e) => setPost({ ...post, seoTitle: e.target.value })}
									className="h-11"
								/>
								<p className="text-xs text-muted-foreground">{post.seoTitle.length}/60 characters</p>
							</div>

							<div className="space-y-3">
								<Label htmlFor="seoDescription" className="text-sm font-medium">Meta Description</Label>
								<Textarea
									id="seoDescription"
									value={post.seoDescription}
									onChange={(e) => setPost({ ...post, seoDescription: e.target.value })}
									rows={3}
									className="resize-none"
								/>
								<p className="text-xs text-muted-foreground">{post.seoDescription.length}/160 characters</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Publish Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<Label htmlFor="author" className="text-sm font-medium">Author</Label>
								<Input
									id="author"
									value={post.author}
									onChange={(e) => setPost({ ...post, author: e.target.value })}
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
								<Input
									id="publishDate"
									type="datetime-local"
									value={post.publishDate}
									onChange={(e) => setPost({ ...post, publishDate: e.target.value })}
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="readTime" className="text-sm font-medium">Read Time</Label>
								<Input
									id="readTime"
									value={post.readTime}
									onChange={(e) => setPost({ ...post, readTime: e.target.value })}
									className="h-11"
								/>
							</div>

							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Allow Comments</Label>
									<p className="text-xs text-muted-foreground">Enable reader comments</p>
								</div>
								<Switch
									checked={post.allowComments}
									onCheckedChange={(checked: boolean) => setPost({ ...post, allowComments: checked })}
								/>
							</div>

							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Featured Post</Label>
									<p className="text-xs text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={post.featured}
									onCheckedChange={(checked: boolean) => setPost({ ...post, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Categories & Tags</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<Label htmlFor="category" className="text-sm font-medium">Category</Label>
								<Select value={post.category} onValueChange={(value: string) => setPost({ ...post, category: value })}>
									<SelectTrigger className="h-11">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{categories.map((cat: string) => (
											<SelectItem key={cat} value={cat}>
												{cat}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-3">
								<Label className="text-sm font-medium">Tags</Label>
								<div className="flex gap-3">
									<Input
										value={newTag}
										onChange={(e) => setNewTag(e.target.value)}
										placeholder="Add tag"
										onKeyPress={(e: any) => e.key === "Enter" && addTag()}
										className="h-11"
									/>
									<Button onClick={addTag} size="lg" className="px-6">
										<Plus className="h-4 w-4 mr-2" />
										Add
									</Button>
								</div>
								<div className="flex flex-wrap gap-3">
									{post.tags.map((tag: string) => (
										<Badge key={tag} variant="secondary" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
											{tag}
											<X className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => removeTag(tag)} />
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Featured Image</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<Input
									value={post.featuredImage}
									onChange={(e) => setPost({ ...post, featuredImage: e.target.value })}
									placeholder="Image URL"
									className="h-11"
								/>
								<Button variant="outline" size="lg" className="w-full">
									<Upload className="h-4 w-4 mr-2" />
									Upload Image
								</Button>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("published")} className="w-full" size="lg">
							<Calendar className="h-4 w-4 mr-2" />
							Update & Publish
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
						</Button>
						<Button variant="outline" asChild className="w-full" size="lg">
							<Link href={`/dashboard/blog/${post.id}?isEdit=false`}>View Post</Link>
						</Button>
						<Button variant="ghost" asChild className="w-full" size="lg">
							<Link href="/dashboard/blog">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Main Component
export default function BlogPostPage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const [post, setPost] = useState(mockBlogPost);
	
	const isEdit = searchParams.get('isEdit') === 'true';

	return isEdit ? (
		<EditBlogPostPage post={post} setPost={setPost} />
	) : (
		<ViewBlogPostPage post={post} />
	);
}
