"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import { BlogPostDetails } from "./blog-post-details";
import { BlogPostActions } from "./blog-post-actions";

// Mock blog post data
const mockBlogPost = {
	id: 1,
	title: "The Future of Web Development",
	slug: "future-of-web-development",
	excerpt:
		"Exploring upcoming trends and technologies that will shape web development in 2024 and beyond. From AI-powered development tools to new frameworks, discover what's coming next.",
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
	seoDescription:
		"Discover the latest trends and technologies shaping web development in 2024, from AI-powered tools to modern frameworks.",
	featuredImage: "/api/placeholder/800/400",
	updatedAt: "2 days ago",
};

export default function ViewBlogPost() {
	const [blogPostData] = useState(mockBlogPost);

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => (window.location.href = "/dashboard/blog")}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Blog"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-emerald-500/20">
								<i className={`${myIcons.bookOpen} h-7 w-7 text-emerald-600`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{blogPostData.title}</h1>
								<RFlex className="items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">
										{blogPostData.category}
									</Badge>
									<Badge variant={blogPostData.status === "published" ? "default" : "secondary"} className="font-medium">
										{blogPostData.status === "published" ? "Published" : "Draft"}
									</Badge>
									{blogPostData.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											<i className={`${myIcons.star} h-3 w-3 mr-1`} />
											Featured
										</Badge>
									)}
								</RFlex>
							</div>
						</RFlex>
					</div>
				</RFlex>
				<RButton
					size="lg"
					className="shadow-lg"
					onClick={() => (window.location.href = `/dashboard/blog/${blogPostData.id}?isEdit=true`)}
					icon={<i className={`${myIcons.edit} h-4 w-4`} />}
					text="Edit Post"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<BlogPostDetails blogPostData={blogPostData} />
				</div>

				{/* Sidebar */}
				<div>
					<BlogPostActions blogPostData={blogPostData} />
				</div>
			</div>
		</div>
	);
}
