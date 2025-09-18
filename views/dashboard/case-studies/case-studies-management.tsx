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

// Mock case studies data
const caseStudies = [
	{
		id: 1,
		title: "E-commerce Platform Redesign",
		client: "TechCorp Inc.",
		industry: "Technology",
		challenge: "Outdated user interface leading to poor conversion rates",
		solution: "Complete UX/UI redesign with modern React architecture",
		results: "150% increase in conversion rate, 40% reduction in bounce rate",
		duration: "3 months",
		teamSize: "5 people",
		technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
		status: "published",
		publishDate: "2024-01-20",
		featured: true,
		views: 2340,
	},
	{
		id: 2,
		title: "Mobile App Development for Healthcare",
		client: "HealthFirst Medical",
		industry: "Healthcare",
		challenge: "Need for patient management system on mobile devices",
		solution: "Cross-platform mobile app with secure data handling",
		results: "90% user adoption rate, 60% reduction in administrative time",
		duration: "4 months",
		teamSize: "6 people",
		technologies: ["React Native", "Firebase", "HIPAA Compliance"],
		status: "draft",
		publishDate: "",
		featured: false,
		views: 0,
	},
	{
		id: 3,
		title: "AI-Powered Analytics Dashboard",
		client: "DataViz Solutions",
		industry: "Analytics",
		challenge: "Complex data visualization and real-time processing",
		solution: "Custom dashboard with machine learning insights",
		results: "200% faster data processing, 85% user satisfaction",
		duration: "6 months",
		teamSize: "8 people",
		technologies: ["Python", "TensorFlow", "D3.js", "Docker"],
		status: "published",
		publishDate: "2024-01-15",
		featured: false,
		views: 1890,
	},
];

const industries = ["Technology", "Healthcare", "Finance", "E-commerce", "Analytics", "Education"];

export default function CaseStudiesManagement() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="space-y-8">
			{/* Hero Header Section */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative z-10">
					<RFlex className="items-start justify-between mb-6">
						<div className="space-y-4">
							<RFlex className="items-center gap-3">
								<div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl">
									<i className={`${myIcons.target} h-6 w-6`} />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Case Studies</h1>
									<p className="text-indigo-100">Showcase your success stories</p>
								</div>
							</RFlex>
							<RFlex className="items-center gap-6 text-sm">
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									<span>{caseStudies.filter((cs: any) => cs.status === "published").length} Published</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
									<span>{caseStudies.filter((cs: any) => cs.featured).length} Featured</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
									<span>{caseStudies.length} Total</span>
								</RFlex>
							</RFlex>
						</div>
						<RButton
							size="lg"
							className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
							onClick={() => window.location.href = "/dashboard/case-studies/add"}
							icon={<i className={`${myIcons.plus} h-4 w-4`} />}
							text="Create Case Study"
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
							placeholder="Search case studies..."
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
						{["all", "published", "drafts", "featured"].map((filter) => (
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

			{/* Case Studies Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{caseStudies.map((study: any) => (
					<RCard
						key={study.id}
						cardClassName="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
						contentComponent={
							<div className="p-0">
								{/* Card Header with Gradient */}
								<div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
									<RFlex className="items-start justify-between mb-4">
										<div className="flex-1">
											<RFlex className="items-center gap-2 mb-2">
												<Badge variant={study.status === "published" ? "default" : "secondary"} className="text-xs">
													{study.status}
												</Badge>
												{study.featured && (
													<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
														<i className={`${myIcons.star} h-3 w-3 mr-1`} />
														Featured
													</Badge>
												)}
											</RFlex>
											<h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">{study.title}</h3>
											<p className="text-sm font-medium text-primary/80">{study.client}</p>
										</div>
										<RFlex className="items-center gap-1">
											<RTooltip
												triggerComponent={
													<RButton
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
														icon={<i className={`${myIcons.eye} h-4 w-4`} />}
														onClick={() => window.location.href = `/dashboard/case-studies/${study.id}?isEdit=false`}
													/>
												}
												tooltipText="View Case Study"
											/>
											<RTooltip
												triggerComponent={
													<RButton
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
														icon={<i className={`${myIcons.edit} h-4 w-4`} />}
														onClick={() => window.location.href = `/dashboard/case-studies/${study.id}?isEdit=true`}
													/>
												}
												tooltipText="Edit Case Study"
											/>
										</RFlex>
									</RFlex>

									{/* Industry Badge */}
									<Badge variant="outline" className="text-xs">
										{study.industry}
									</Badge>
								</div>

								{/* Card Body */}
								<div className="p-6 space-y-4">
									{/* Key Metrics */}
									<div className="grid grid-cols-2 gap-4">
										<RFlex className="items-center gap-2">
											<i className={`${myIcons.clock} h-4 w-4 text-muted-foreground`} />
											<div>
												<div className="text-sm font-medium">{study.duration}</div>
												<div className="text-xs text-muted-foreground">Duration</div>
											</div>
										</RFlex>
										<RFlex className="items-center gap-2">
											<i className={`${myIcons.users} h-4 w-4 text-muted-foreground`} />
											<div>
												<div className="text-sm font-medium">{study.teamSize}</div>
												<div className="text-xs text-muted-foreground">Team</div>
											</div>
										</RFlex>
									</div>

									{/* Results Highlight */}
									<div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
										<RFlex className="items-center gap-2 mb-1">
											<i className={`${myIcons.zap} h-4 w-4 text-green-600`} />
											<span className="text-sm font-medium text-green-800 dark:text-green-200">Key Results</span>
										</RFlex>
										<RParagraphTruncated
											paragraph={study.results}
											numOfChars={100}
											typographyStyles="text-sm text-green-700 dark:text-green-300"
										/>
									</div>

									{/* Technologies */}
									<div>
										<div className="text-xs font-medium text-muted-foreground mb-2">Technologies</div>
										<RFlex className="flex-wrap gap-1">
											{study.technologies.slice(0, 3).map((tech: string) => (
												<Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
													{tech}
												</Badge>
											))}
											{study.technologies.length > 3 && (
												<Badge variant="outline" className="text-xs px-2 py-1">
													+{study.technologies.length - 3} more
												</Badge>
											)}
										</RFlex>
									</div>

									{/* Footer Actions */}
									<RFlex className="items-center justify-between pt-4 border-t">
										<RFlex className="items-center gap-2 text-xs text-muted-foreground">
											<i className={`${myIcons.chart} h-3 w-3`} />
											<span>{study.views.toLocaleString()} views</span>
										</RFlex>
										<RButton
											variant="ghost"
											size="sm"
											className="text-xs"
											onClick={() => window.location.href = `/dashboard/case-studies/${study.id}?isEdit=false`}
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

			{/* Performance Analytics Section */}
			<div className="space-y-6">
				<RFlex className="items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
						<i className={`${myIcons.chart} h-5 w-5 text-white`} />
					</div>
					<div>
						<h2 className="text-xl font-bold">Performance Analytics</h2>
						<p className="text-sm text-muted-foreground">Track your case study success</p>
					</div>
				</RFlex>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Total Studies */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{caseStudies.length}</div>
										<p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Studies</p>
										<p className="text-xs text-blue-600/70 dark:text-blue-400/70">All case studies</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
										<i className={`${myIcons.target} h-6 w-6 text-blue-600 dark:text-blue-400`} />
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
											{caseStudies.filter((cs: any) => cs.status === "published").length}
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

					{/* Featured */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
											{caseStudies.filter((cs: any) => cs.featured).length}
										</div>
										<p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Featured</p>
										<p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Homepage highlights</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
										<i className={`${myIcons.star} h-6 w-6 text-yellow-600 dark:text-yellow-400`} />
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
											{caseStudies.reduce((sum: number, cs: any) => sum + cs.views, 0).toLocaleString()}
										</div>
										<p className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Views</p>
										<p className="text-xs text-purple-600/70 dark:text-purple-400/70">All time views</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
										<i className={`${myIcons.trendingUp} h-6 w-6 text-purple-600 dark:text-purple-400`} />
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
