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

// Mock testimonials data
const testimonials = [
	{
		id: 1,
		name: "John Smith",
		role: "CEO",
		company: "TechCorp Inc.",
		content:
			"Excellent service and outstanding results. The team delivered beyond our expectations and helped transform our business operations.",
		rating: 5,
		avatar: "/avatar1.jpg",
		status: "published",
		featured: true,
		createdAt: "2024-01-20",
		project: "E-commerce Platform",
	},
	{
		id: 2,
		name: "Sarah Johnson",
		role: "Marketing Director",
		company: "GrowthCo",
		content:
			"Professional, reliable, and innovative. They understood our needs perfectly and delivered a solution that exceeded our goals.",
		rating: 5,
		avatar: "/avatar2.jpg",
		status: "published",
		featured: false,
		createdAt: "2024-01-18",
		project: "Digital Marketing Campaign",
	},
	{
		id: 3,
		name: "Mike Chen",
		role: "CTO",
		company: "StartupXYZ",
		content:
			"The technical expertise and attention to detail were impressive. Our mobile app launch was a huge success thanks to their work.",
		rating: 4,
		avatar: "/avatar3.jpg",
		status: "draft",
		featured: false,
		createdAt: "2024-01-15",
		project: "Mobile App Development",
	},
	{
		id: 4,
		name: "Emily Davis",
		role: "Founder",
		company: "InnovateLab",
		content: "Great communication throughout the project. They kept us informed at every step and delivered exactly what we needed.",
		rating: 5,
		avatar: "/avatar4.jpg",
		status: "published",
		featured: true,
		createdAt: "2024-01-12",
		project: "Web Development",
	},
];

export default function TestimonialsManagement() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<i key={i} className={`${myIcons.star} h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} />
		));
	};

	return (
		<div className="space-y-8">
			{/* Hero Header Section */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 p-8 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative z-10">
					<RFlex className="items-start justify-between mb-6">
						<div className="space-y-4">
							<RFlex className="items-center gap-3">
								<div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl">
									<i className={`${myIcons.heart} h-6 w-6`} />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Client Testimonials</h1>
									<p className="text-rose-100">Showcase your success stories</p>
								</div>
							</RFlex>
							<RFlex className="items-center gap-6 text-sm">
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									<span>{testimonials.filter((t) => t.status === "published").length} Published</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
									<span>{testimonials.filter((t) => t.featured).length} Featured</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
									<span>{testimonials.length} Total</span>
								</RFlex>
							</RFlex>
						</div>
						<RButton
							size="lg"
							className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg"
							onClick={() => window.location.href = "/dashboard/testimonials/add"}
							icon={<i className={`${myIcons.comment} h-4 w-4`} />}
							text="Add Testimonial"
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
							placeholder="Search testimonials..."
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
						{["all", "published", "drafts", "featured", "5stars", "4stars"].map((filter) => (
							<button
								key={filter}
								onClick={() => setSelectedFilter(filter)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
									selectedFilter === filter
										? "bg-primary text-primary-foreground shadow-md"
										: "bg-muted text-muted-foreground hover:bg-muted/80"
								}`}
							>
								{filter === "5stars" ? "5 Stars" : filter === "4stars" ? "4+ Stars" : filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						))}
					</RFlex>
				</RFlex>
			</RFlex>

			{/* Testimonials Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{testimonials.map((testimonial: any) => (
					<RCard
						key={testimonial.id}
						cardClassName="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
						contentComponent={
							<div className="p-0">
								{/* Quote Header */}
								<div className="relative p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
									<div className="absolute top-4 left-4">
										<i className={`${myIcons.quote} h-8 w-8 text-rose-200 dark:text-rose-800`} />
									</div>
									<RFlex className="items-start justify-between mb-4">
										<div className="flex-1 ml-8">
											<RFlex className="items-center gap-2 mb-2">
												<Badge variant={testimonial.status === "published" ? "default" : "secondary"} className="text-xs">
													{testimonial.status}
												</Badge>
												{testimonial.featured && (
													<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
														<i className={`${myIcons.star} h-3 w-3 mr-1`} />
														Featured
													</Badge>
												)}
											</RFlex>
											<h3 className="font-bold text-lg mb-1 group-hover:text-rose-600 transition-colors">
												{testimonial.name}
											</h3>
											<p className="text-sm text-rose-600/80 font-medium">{testimonial.role} at {testimonial.company}</p>
										</div>
										<RFlex className="items-center gap-1">
											<RTooltip
												triggerComponent={
													<RButton
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
														icon={<i className={`${myIcons.eye} h-4 w-4`} />}
														onClick={() => window.location.href = `/dashboard/testimonials/${testimonial.id}?isEdit=false`}
													/>
												}
												tooltipText="View Testimonial"
											/>
											<RTooltip
												triggerComponent={
													<RButton
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
														icon={<i className={`${myIcons.edit} h-4 w-4`} />}
														onClick={() => window.location.href = `/dashboard/testimonials/${testimonial.id}?isEdit=true`}
													/>
												}
												tooltipText="Edit Testimonial"
											/>
										</RFlex>
									</RFlex>
								</div>

								{/* Testimonial Content */}
								<div className="p-6 space-y-4">
									{/* Quote Text */}
									<div className="relative">
										<RParagraphTruncated
											paragraph={`"${testimonial.content}"`}
											numOfChars={120}
											typographyStyles="text-muted-foreground leading-relaxed italic text-sm"
										/>
									</div>

									{/* Rating */}
									<RFlex className="items-center justify-between">
										<RFlex className="items-center gap-2">
											<div className="flex">{renderStars(testimonial.rating)}</div>
											<span className="text-sm font-medium text-muted-foreground">{testimonial.rating}/5</span>
										</RFlex>
										<Badge variant="outline" className="text-xs">
											{testimonial.project}
										</Badge>
									</RFlex>

									{/* Footer */}
									<RFlex className="items-center justify-between pt-4 border-t">
										<RFlex className="items-center gap-2 text-xs text-muted-foreground">
											<i className={`${myIcons.calendar} h-3 w-3`} />
											<span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
										</RFlex>
										<RButton
											variant="ghost"
											size="sm"
											className="text-xs"
											onClick={() => window.location.href = `/dashboard/testimonials/${testimonial.id}?isEdit=false`}
											icon={<i className={`${myIcons.arrowRight} h-3 w-3`} />}
											text="View Details"
										/>
									</RFlex>
								</div>
							</div>
						}
					/>
				))}
			</div>

			{/* Testimonials Analytics Section */}
			<div className="space-y-6">
				<RFlex className="items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl">
						<i className={`${myIcons.chart} h-5 w-5 text-white`} />
					</div>
					<div>
						<h2 className="text-xl font-bold">Testimonials Analytics</h2>
						<p className="text-sm text-muted-foreground">Track your client satisfaction</p>
					</div>
				</RFlex>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Total Testimonials */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-rose-600 dark:text-rose-400">{testimonials.length}</div>
										<p className="text-sm font-medium text-rose-800 dark:text-rose-200">Total Testimonials</p>
										<p className="text-xs text-rose-600/70 dark:text-rose-400/70">All client feedback</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
										<i className={`${myIcons.comment} h-6 w-6 text-rose-600 dark:text-rose-400`} />
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
											{testimonials.filter((t) => t.status === "published").length}
										</div>
										<p className="text-sm font-medium text-green-800 dark:text-green-200">Published</p>
										<p className="text-xs text-green-600/70 dark:text-green-400/70">Live on website</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl">
										<i className={`${myIcons.award} h-6 w-6 text-green-600 dark:text-green-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Average Rating */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
											{(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
										</div>
										<p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Average Rating</p>
										<p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Client satisfaction</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
										<i className={`${myIcons.star} h-6 w-6 text-yellow-600 dark:text-yellow-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Featured */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
											{testimonials.filter((t) => t.featured).length}
										</div>
										<p className="text-sm font-medium text-purple-800 dark:text-purple-200">Featured</p>
										<p className="text-xs text-purple-600/70 dark:text-purple-400/70">Homepage highlights</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
										<i className={`${myIcons.heart} h-6 w-6 text-purple-600 dark:text-purple-400`} />
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
