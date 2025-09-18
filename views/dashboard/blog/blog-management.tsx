"use client";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import RTooltip from "@/RComponents/RTooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { myIcons } from "@/constants/icons";
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

export default function BlogManagement() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="space-y-8">
			{/* Hero Header Section */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative z-10">
					<RFlex className="items-start justify-between mb-6">
						<div className="space-y-4">
							<RFlex className="items-center gap-3">
								<div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl">
									<i className={`${myIcons.bookOpen} h-6 w-6`} />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Blog Management</h1>
									<p className="text-emerald-100">Share your insights and expertise</p>
								</div>
							</RFlex>
							<RFlex className="items-center gap-6 text-sm">
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									<span>{blogPosts.filter((p) => p.status === "published").length} Published</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
									<span>{blogPosts.filter((p) => p.status === "draft").length} Drafts</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
									<span>{blogPosts.length} Total</span>
								</RFlex>
							</RFlex>
						</div>
						<RButton
							size="lg"
							className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg"
							onClick={() => (window.location.href = "/dashboard/blog/add")}
							icon={<i className={`${myIcons.pen} h-4 w-4`} />}
							text="Write New Post"
						/>
					</RFlex>
				</div>
				{/* Decorative elements */}
				<div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
			</div>

			{/* Search and Filter Section */}
			<RFlex className="flex-col lg:flex-row gap-4">
				{/* Search Bar */}
				<div className="flex-1">
					<div className="relative">
						<i className={`${myIcons.search} absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
						<Input
							type="text"
							placeholder="Search blog posts..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
					</div>
				</div>

				{/* Filter Pills */}
				<RFlex className="items-center gap-2">
					<i className={`${myIcons.filter} h-4 w-4 text-muted-foreground`} />
					<RFlex className="gap-2">
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
					</RFlex>
				</RFlex>
			</RFlex>

			{/* Blog Posts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{blogPosts.map((post: any) => (
					<RCard
						key={post.id}
						cardClassName="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
						contentComponent={
							<div className="p-0">
								{/* Card Header with Gradient */}
								<div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
									<RFlex className="items-start justify-between mb-4">
										<div className="flex-1">
											<RFlex className="items-center gap-2 mb-2">
												<Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
													{post.status}
												</Badge>
												<Badge variant="outline" className="text-xs">
													{post.category}
												</Badge>
											</RFlex>
											<h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
											<RParagraphTruncated paragraph={post.excerpt} numOfChars={100} typographyStyles="text-sm text-muted-foreground" />
										</div>
										<RFlex className="items-center gap-1">
											<RTooltip
												triggerComponent={
													<RButton
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
														icon={<i className={`${myIcons.eye} h-4 w-4`} />}
														onClick={() => (window.location.href = `/dashboard/blog/${post.id}?isEdit=false`)}
													/>
												}
												tooltipText="View Post"
											/>
											<RTooltip
												triggerComponent={
													<RButton
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
														icon={<i className={`${myIcons.edit} h-4 w-4`} />}
														onClick={() => (window.location.href = `/dashboard/blog/${post.id}?isEdit=true`)}
													/>
												}
												tooltipText="Edit Post"
											/>
										</RFlex>
									</RFlex>
								</div>

								{/* Card Body */}
								<div className="p-6 space-y-4">
									{/* Author and Date */}
									<RFlex className="items-center justify-between text-sm">
										<RFlex className="items-center gap-2">
											<i className={`${myIcons.user} h-4 w-4 text-muted-foreground`} />
											<span className="font-medium">{post.author}</span>
										</RFlex>
										<RFlex className="items-center gap-2">
											<i className={`${myIcons.calendar} h-4 w-4 text-muted-foreground`} />
											<span className="text-muted-foreground">{new Date(post.publishDate).toLocaleDateString()}</span>
										</RFlex>
									</RFlex>

									{/* Tags */}
									<div>
										<RFlex className="flex-wrap gap-1">
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
										</RFlex>
									</div>

									{/* Stats */}
									<RFlex className="items-center justify-between pt-4 border-t">
										<RFlex className="items-center gap-4 text-xs text-muted-foreground">
											<RFlex className="items-center gap-1">
												<i className={`${myIcons.clock} h-3 w-3`} />
												<span>{post.readTime}</span>
											</RFlex>
											<RFlex className="items-center gap-1">
												<i className={`${myIcons.chart} h-3 w-3`} />
												<span>{post.views.toLocaleString()} views</span>
											</RFlex>
										</RFlex>
										<RButton
											variant="ghost"
											size="sm"
											className="text-xs"
											onClick={() => (window.location.href = `/dashboard/blog/${post.id}?isEdit=false`)}
											icon={<i className={`${myIcons.arrowRight} h-3 w-3`} />}
											text="Read More"
										/>
									</RFlex>
								</div>
							</div>
						}
					/>
				))}
			</div>

			{/* Blog Analytics Section */}
			<div className="space-y-6">
				<RFlex className="items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
						<i className={`${myIcons.chart} h-5 w-5 text-white`} />
					</div>
					<div>
						<h2 className="text-xl font-bold">Blog Analytics</h2>
						<p className="text-sm text-muted-foreground">Track your content performance</p>
					</div>
				</RFlex>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Total Posts */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{blogPosts.length}</div>
										<p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Posts</p>
										<p className="text-xs text-blue-600/70 dark:text-blue-400/70">All blog posts</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
										<i className={`${myIcons.bookOpen} h-6 w-6 text-blue-600 dark:text-blue-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Published */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-green-600 dark:text-green-400">
											{blogPosts.filter((p) => p.status === "published").length}
										</div>
										<p className="text-sm font-medium text-green-800 dark:text-green-200">Published</p>
										<p className="text-xs text-green-600/70 dark:text-green-400/70">Live on website</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl">
										<i className={`${myIcons.calendar} h-6 w-6 text-green-600 dark:text-green-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Drafts */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
											{blogPosts.filter((p) => p.status === "draft").length}
										</div>
										<p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Drafts</p>
										<p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Work in progress</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
										<i className={`${myIcons.pen} h-6 w-6 text-yellow-600 dark:text-yellow-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Total Views */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
											{blogPosts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
										</div>
										<p className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Views</p>
										<p className="text-xs text-purple-600/70 dark:text-purple-400/70">All time views</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
										<i className={`${myIcons?.trendingUp} h-6 w-6 text-purple-600 dark:text-purple-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
}
