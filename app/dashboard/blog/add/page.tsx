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

export default function AddBlogPostPage() {
	const [postData, setPostData] = useState({
		title: "",
		slug: "",
		excerpt: "",
		content: "",
		author: "",
		category: "",
		tags: [] as string[],
		featuredImage: "",
		publishDate: "",
		status: "draft",
		allowComments: true,
		featured: false,
		seoTitle: "",
		seoDescription: "",
		readTime: "",
	});

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
		setPostData({
			...postData,
			title,
			slug: generateSlug(title),
			seoTitle: title,
		});
	};

	const addTag = () => {
		if (newTag.trim() && !postData.tags.includes(newTag.trim() as string)) {
			setPostData({
				...postData,
				tags: [...postData.tags, newTag.trim() as string],
			});
			setNewTag("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		setPostData({
			...postData,
			tags: postData.tags.filter((tag: string) => tag !== tagToRemove),
		});
	};

	const handleSave = (status = "draft") => {
		const dataToSave = { ...postData, status };
		console.log("Saving blog post:", dataToSave);
		// Save logic would go here
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
								<h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
								<p className="text-muted-foreground">Write and publish a new blog post</p>
							</div>
						</div>
					</div>
				</div>
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
									value={postData.title}
									onChange={(e) => handleTitleChange(e.target.value)}
									placeholder="Enter post title"
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="slug" className="text-sm font-medium">URL Slug</Label>
								<Input
									id="slug"
									value={postData.slug}
									onChange={(e) => setPostData({ ...postData, slug: e.target.value })}
									placeholder="url-friendly-slug"
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="excerpt" className="text-sm font-medium">Excerpt</Label>
								<Textarea
									id="excerpt"
									value={postData.excerpt}
									onChange={(e) => setPostData({ ...postData, excerpt: e.target.value })}
									placeholder="Brief description of the post"
									rows={3}
									className="resize-none"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="content" className="text-sm font-medium">Content</Label>
								<Textarea
									id="content"
									value={postData.content}
									onChange={(e) => setPostData({ ...postData, content: e.target.value })}
									placeholder="Write your blog post content here..."
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
									value={postData.seoTitle}
									onChange={(e) => setPostData({ ...postData, seoTitle: e.target.value })}
									placeholder="SEO optimized title"
									className="h-11"
								/>
								<p className="text-xs text-muted-foreground">{postData.seoTitle.length}/60 characters</p>
							</div>

							<div className="space-y-3">
								<Label htmlFor="seoDescription" className="text-sm font-medium">Meta Description</Label>
								<Textarea
									id="seoDescription"
									value={postData.seoDescription}
									onChange={(e) => setPostData({ ...postData, seoDescription: e.target.value })}
									placeholder="Brief description for search engines"
									rows={3}
									className="resize-none"
								/>
								<p className="text-xs text-muted-foreground">{postData.seoDescription.length}/160 characters</p>
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
									value={postData.author}
									onChange={(e) => setPostData({ ...postData, author: e.target.value })}
									placeholder="Author name"
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
								<Input
									id="publishDate"
									type="datetime-local"
									value={postData.publishDate}
									onChange={(e) => setPostData({ ...postData, publishDate: e.target.value })}
									className="h-11"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="readTime" className="text-sm font-medium">Read Time</Label>
								<Input
									id="readTime"
									value={postData.readTime}
									onChange={(e) => setPostData({ ...postData, readTime: e.target.value })}
									placeholder="5 min read"
									className="h-11"
								/>
							</div>

							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Allow Comments</Label>
									<p className="text-xs text-muted-foreground">Enable reader comments</p>
								</div>
								<Switch
									checked={postData.allowComments}
									onCheckedChange={(checked: boolean) => setPostData({ ...postData, allowComments: checked })}
								/>
							</div>

							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Featured Post</Label>
									<p className="text-xs text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={postData.featured}
									onCheckedChange={(checked: boolean) => setPostData({ ...postData, featured: checked })}
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
								<Select value={postData.category} onValueChange={(value: string) => setPostData({ ...postData, category: value })}>
									<SelectTrigger className="h-11">
										<SelectValue placeholder="Select category" />
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
									{postData.tags.map((tag: string) => (
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
									value={postData.featuredImage}
									onChange={(e) => setPostData({ ...postData, featuredImage: e.target.value })}
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
							Publish Now
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
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
