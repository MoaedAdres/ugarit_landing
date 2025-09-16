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
import { ArrowLeft, Save, Plus, X, Upload, Calendar } from "lucide-react";
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
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Link href="/dashboard/blog">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Blog
					</Button>
				</Link>
				<div>
					<h1 className="text-2xl font-bold">Create New Post</h1>
					<p className="text-muted-foreground">Write and publish a new blog post</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Post Content</CardTitle>
							<CardDescription>Main blog post information</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									value={postData.title}
									onChange={(e) => handleTitleChange(e.target.value)}
									placeholder="Enter post title"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="slug">URL Slug</Label>
								<Input
									id="slug"
									value={postData.slug}
									onChange={(e) => setPostData({ ...postData, slug: e.target.value })}
									placeholder="url-friendly-slug"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="excerpt">Excerpt</Label>
								<Textarea
									id="excerpt"
									value={postData.excerpt}
									onChange={(e) => setPostData({ ...postData, excerpt: e.target.value })}
									placeholder="Brief description of the post"
									rows={3}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="content">Content</Label>
								<Textarea
									id="content"
									value={postData.content}
									onChange={(e) => setPostData({ ...postData, content: e.target.value })}
									placeholder="Write your blog post content here..."
									rows={12}
									className="min-h-[300px]"
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>SEO Settings</CardTitle>
							<CardDescription>Search engine optimization</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="seoTitle">SEO Title</Label>
								<Input
									id="seoTitle"
									value={postData.seoTitle}
									onChange={(e) => setPostData({ ...postData, seoTitle: e.target.value })}
									placeholder="SEO optimized title"
								/>
								<p className="text-xs text-muted-foreground">{postData.seoTitle.length}/60 characters</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="seoDescription">Meta Description</Label>
								<Textarea
									id="seoDescription"
									value={postData.seoDescription}
									onChange={(e) => setPostData({ ...postData, seoDescription: e.target.value })}
									placeholder="Brief description for search engines"
									rows={3}
								/>
								<p className="text-xs text-muted-foreground">{postData.seoDescription.length}/160 characters</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Publish Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="author">Author</Label>
								<Input
									id="author"
									value={postData.author}
									onChange={(e) => setPostData({ ...postData, author: e.target.value })}
									placeholder="Author name"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="publishDate">Publish Date</Label>
								<Input
									id="publishDate"
									type="datetime-local"
									value={postData.publishDate}
									onChange={(e) => setPostData({ ...postData, publishDate: e.target.value })}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="readTime">Read Time</Label>
								<Input
									id="readTime"
									value={postData.readTime}
									onChange={(e) => setPostData({ ...postData, readTime: e.target.value })}
									placeholder="5 min read"
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Allow Comments</Label>
									<p className="text-sm text-muted-foreground">Enable reader comments</p>
								</div>
								<Switch
									checked={postData.allowComments}
									onCheckedChange={(checked: boolean) => setPostData({ ...postData, allowComments: checked })}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Featured Post</Label>
									<p className="text-sm text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={postData.featured}
									onCheckedChange={(checked: boolean) => setPostData({ ...postData, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Categories & Tags</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="category">Category</Label>
								<Select value={postData.category} onValueChange={(value: string) => setPostData({ ...postData, category: value })}>
									<SelectTrigger>
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

							<div className="space-y-2">
								<Label>Tags</Label>
								<div className="flex gap-2">
									<Input
										value={newTag}
										onChange={(e) => setNewTag(e.target.value)}
										placeholder="Add tag"
										onKeyPress={(e: any) => e.key === "Enter" && addTag()}
									/>
									<Button onClick={addTag} size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex flex-wrap gap-2">
									{postData.tags.map((tag: string) => (
										<Badge key={tag} variant="secondary" className="flex items-center gap-1">
											{tag}
											<X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Featured Image</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Input
									value={postData.featuredImage}
									onChange={(e) => setPostData({ ...postData, featuredImage: e.target.value })}
									placeholder="Image URL"
								/>
								<Button variant="outline" size="sm" className="w-full bg-transparent">
									<Upload className="h-4 w-4 mr-2" />
									Upload Image
								</Button>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("published")} className="w-full">
							<Calendar className="h-4 w-4 mr-2" />
							Publish Now
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
						</Button>
						<Button variant="ghost" asChild className="w-full">
							<Link href="/dashboard/blog">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
