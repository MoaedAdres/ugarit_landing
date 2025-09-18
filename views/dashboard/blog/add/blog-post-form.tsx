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

interface BlogPostFormProps {
	postData: any;
	setPostData: (data: any) => void;
}

export function BlogPostForm({ postData, setPostData }: BlogPostFormProps) {
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
		if (newTag.trim() && !postData.tags.includes(newTag.trim())) {
			setPostData({
				...postData,
				tags: [...postData.tags, newTag.trim()],
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

	return (
		<div className="space-y-8">
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
					</div>
				}
			/>
		</div>
	);
}
