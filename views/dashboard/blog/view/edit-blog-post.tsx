"use client";

import { useState } from "react";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RSelect from "@/RComponents/RSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

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

export default function EditBlogPost() {
	const [post, setPost] = useState(mockBlogPost);
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
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => window.location.href = "/dashboard/blog"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Blog"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-emerald-500/20">
								<i className={`${myIcons.pen} h-7 w-7 text-emerald-600`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
								<p className="text-muted-foreground">Update your blog post content and settings</p>
							</div>
						</RFlex>
					</div>
				</RFlex>
				<RButton
					variant="outline"
					size="lg"
					onClick={() => window.location.href = `/dashboard/blog/${post.id}?isEdit=false`}
					icon={<i className={`${myIcons.eye} h-4 w-4`} />}
					text="View Post"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Post Content Card */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-primary rounded-full"></div>
								Post Content
							</RFlex>
						}
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
						contentComponent={
							<div className="space-y-6">
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
							</div>
						}
					/>

					{/* SEO Settings Card */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								SEO Settings
							</RFlex>
						}
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
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
							</div>
						}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<RCard
						title="Publish Settings"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
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
							</div>
						}
					/>

					<RCard
						title="Categories & Tags"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
								<div className="space-y-3">
									<Label htmlFor="category" className="text-sm font-medium">Category</Label>
									<RSelect
										value={post.category}
										handleChange={(value: string) => setPost({ ...post, category: value })}
										placeholder="Select category"
										options={categories.map(cat => ({ value: cat, label: cat }))}
										triggerClassName="h-11"
									/>
								</div>

								<div className="space-y-3">
									<Label className="text-sm font-medium">Tags</Label>
									<RFlex className="gap-3">
										<Input
											value={newTag}
											onChange={(e) => setNewTag(e.target.value)}
											placeholder="Add tag"
											onKeyPress={(e: any) => e.key === "Enter" && addTag()}
											className="h-11"
										/>
										<RButton onClick={addTag} size="lg" className="px-6" icon={<i className={`${myIcons.plus} h-4 w-4`} />} text="Add" />
									</RFlex>
									<RFlex className="flex-wrap gap-3">
										{post.tags.map((tag: string) => (
											<Badge key={tag} variant="secondary" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
												{tag}
												<i className={`${myIcons.xmark} h-3 w-3 cursor-pointer hover:text-red-500 transition-colors`} onClick={() => removeTag(tag)} />
											</Badge>
										))}
									</RFlex>
								</div>
							</div>
						}
					/>

					<RCard
						title="Featured Image"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-4">
								<div className="space-y-3">
									<Input
										value={post.featuredImage}
										onChange={(e) => setPost({ ...post, featuredImage: e.target.value })}
										placeholder="Image URL"
										className="h-11"
									/>
									<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
										<i className={`${myIcons.upload} h-4 w-4`} />
										Upload Image
									</button>
								</div>
							</div>
						}
					/>

					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("published")}
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.calendar} h-4 w-4`} />}
							text="Update & Publish"
						/>
						<RButton
							onClick={() => handleSave("draft")}
							variant="outline"
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Save Draft"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = `/dashboard/blog/${post.id}?isEdit=false`}
							className="w-full"
							text="View Post"
						/>
						<RButton
							variant="ghost"
							onClick={() => window.location.href = "/dashboard/blog"}
							className="w-full"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
