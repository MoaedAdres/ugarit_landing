"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { myIcons } from "@/constants/icons";
import { BlogPostForm } from "./blog-post-form";
import { BlogPostPreview } from "./blog-post-preview";

export default function AddBlogPost() {
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

	const handleSave = (status = "draft") => {
		const dataToSave = { ...postData, status };
		console.log("Saving blog post:", dataToSave);
		// Save logic would go here
	};

	return (
		<div className="space-y-6">
			<RFlex className="items-center gap-4">
				<RButton
					variant="ghost"
					size="sm"
					onClick={() => window.location.href = "/dashboard/blog"}
					icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
					text="Back to Blog"
				/>
				<div>
					<h1 className="text-2xl font-bold">Add New Blog Post</h1>
					<p className="text-muted-foreground">Write and publish a new blog post</p>
				</div>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<BlogPostForm postData={postData} setPostData={setPostData} />
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<BlogPostPreview postData={postData} />
					
					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("published")}
							className="w-full"
							icon={<i className={`${myIcons.calendar} h-4 w-4`} />}
							text="Publish Now"
						/>
						<RButton
							onClick={() => handleSave("draft")}
							variant="outline"
							className="w-full"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Save Draft"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = "/dashboard/blog"}
							className="w-full bg-transparent"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
