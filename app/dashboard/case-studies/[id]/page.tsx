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
import { ArrowLeft, Save, Plus, X, Upload, Calendar, Edit, Eye, Clock, Users, Target, CheckCircle, Quote } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

// Mock case study data
const mockCaseStudy = {
	id: 1,
	title: "E-commerce Platform Redesign",
	client: "TechCorp Inc.",
	industry: "E-commerce",
	challenge: "The client's existing e-commerce platform was experiencing slow loading times, poor mobile responsiveness, and a high cart abandonment rate of 68%. The outdated design was not converting visitors into customers effectively.",
	solution: "We redesigned the entire platform using modern technologies including React, Node.js, and optimized database queries. Implemented a mobile-first approach with progressive web app features and integrated advanced analytics for better user behavior tracking.",
	results: "Achieved a 45% increase in conversion rate, reduced cart abandonment to 23%, improved page load times by 60%, and increased mobile traffic by 85%. The client saw a 120% increase in revenue within 6 months.",
	duration: "4 months",
	teamSize: "6 people",
	technologies: ["React", "Node.js", "MongoDB", "AWS", "Stripe", "Analytics"],
	images: [],
	testimonial: "The team delivered exceptional results that exceeded our expectations. The new platform has transformed our business and significantly improved our customer experience.",
	testimonialAuthor: "Sarah Johnson",
	testimonialRole: "CEO, TechCorp Inc.",
	status: "published",
	featured: true,
	publishDate: "2024-01-15",
	updatedAt: "2 days ago",
};

// View Case Study Component
function ViewCaseStudyPage({ caseStudy }: { caseStudy: any }) {
	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<Link href="/dashboard/case-studies">
						<Button variant="ghost" size="sm" className="mt-1">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Case Studies
						</Button>
					</Link>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
								<Target className="h-7 w-7 text-primary" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{caseStudy.title}</h1>
								<div className="flex items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{caseStudy.industry}</Badge>
									<Badge variant={caseStudy.status === "published" ? "default" : "secondary"} className="font-medium">
										{caseStudy.status === "published" ? "Published" : "Draft"}
									</Badge>
									{caseStudy.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											⭐ Featured
										</Badge>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button asChild size="lg" className="shadow-lg">
					<Link href={`/dashboard/case-studies/${caseStudy.id}?isEdit=true`}>
						<Edit className="h-4 w-4 mr-2" />
						Edit Case Study
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Overview Card */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardContent className="p-8">
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-semibold mb-3 text-foreground">Project Overview</h2>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-xl">
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{caseStudy.client}</div>
											<div className="text-sm font-medium text-muted-foreground">Client</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{caseStudy.duration}</div>
											<div className="text-sm font-medium text-muted-foreground">Duration</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{caseStudy.teamSize}</div>
											<div className="text-sm font-medium text-muted-foreground">Team Size</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Challenge, Solution, Results */}
					<div className="grid grid-cols-1 gap-6">
						<Card className="border-0 shadow-lg">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg flex items-center gap-2">
									<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									Challenge
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg flex items-center gap-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									Solution
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg flex items-center gap-2">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									Results
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed">{caseStudy.results}</p>
							</CardContent>
						</Card>
					</div>

					{/* Technologies Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl">Technologies Used</CardTitle>
							<CardDescription>Technical stack and tools</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-3">
								{caseStudy.technologies.map((tech: string, index: number) => (
									<Badge key={index} variant="secondary" className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
										{tech}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Testimonial Card */}
					{caseStudy.testimonial && (
						<Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
							<CardHeader className="pb-4">
								<CardTitle className="text-xl flex items-center gap-2">
									<Quote className="h-5 w-5 text-purple-600" />
									Client Testimonial
								</CardTitle>
							</CardHeader>
							<CardContent>
								<blockquote className="text-lg italic text-foreground mb-4">
									"{caseStudy.testimonial}"
								</blockquote>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center">
										<span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
											{caseStudy.testimonialAuthor.split(' ').map((n: string) => n[0]).join('')}
										</span>
									</div>
									<div>
										<div className="font-semibold text-foreground">{caseStudy.testimonialAuthor}</div>
										<div className="text-sm text-muted-foreground">{caseStudy.testimonialRole}</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Case Study Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Status</div>
										<div className="text-xs text-muted-foreground">Publication status</div>
									</div>
									<Badge variant={caseStudy.status === "published" ? "default" : "secondary"} className="font-medium">
										{caseStudy.status === "published" ? "Published" : "Draft"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Featured</div>
										<div className="text-xs text-muted-foreground">Homepage highlight</div>
									</div>
									<Badge variant={caseStudy.featured ? "default" : "secondary"} className="font-medium">
										{caseStudy.featured ? "Yes" : "No"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Publish Date</div>
										<div className="text-xs text-muted-foreground">When published</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">{caseStudy.publishDate}</span>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Last Updated</div>
										<div className="text-xs text-muted-foreground">Recent changes</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">{caseStudy.updatedAt}</span>
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
								<Link href={`/dashboard/case-studies/${caseStudy.id}?isEdit=true`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Case Study
								</Link>
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<Eye className="h-4 w-4 mr-2" />
								Preview on Site
							</Button>
							<Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20" size="lg">
								<X className="h-4 w-4 mr-2" />
								Delete Case Study
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

// Edit Case Study Component
function EditCaseStudyPage({ caseStudy, setCaseStudy }: { caseStudy: any; setCaseStudy: any }) {
	const [newTechnology, setNewTechnology] = useState("");
	const industries = ["Technology", "Healthcare", "Finance", "E-commerce", "Analytics", "Education"];

	const addTechnology = () => {
		if (newTechnology.trim() && !caseStudy.technologies.includes(newTechnology.trim())) {
			setCaseStudy({
				...caseStudy,
				technologies: [...caseStudy.technologies, newTechnology.trim()],
			});
			setNewTechnology("");
		}
	};

	const removeTechnology = (techToRemove: string) => {
		setCaseStudy({
			...caseStudy,
			technologies: caseStudy.technologies.filter((tech: string) => tech !== techToRemove),
		});
	};

	const handleSave = (status = "draft") => {
		const dataToSave = { ...caseStudy, status };
		console.log("Updating case study:", dataToSave);
		// Update logic would go here
	};

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<Link href="/dashboard/case-studies">
						<Button variant="ghost" size="sm" className="mt-1">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Case Studies
						</Button>
					</Link>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
								<Target className="h-7 w-7 text-primary" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Edit Case Study</h1>
								<p className="text-muted-foreground">Update case study information</p>
							</div>
						</div>
					</div>
				</div>
				<Button asChild variant="outline" size="lg">
					<Link href={`/dashboard/case-studies/${caseStudy.id}?isEdit=false`}>
						<Eye className="h-4 w-4 mr-2" />
						View Case Study
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Basic Information Card */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-primary rounded-full"></div>
								Basic Information
							</CardTitle>
							<CardDescription>Project overview and client details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="title" className="text-sm font-medium">Project Title</Label>
									<Input
										id="title"
										value={caseStudy.title}
										onChange={(e) => setCaseStudy({ ...caseStudy, title: e.target.value })}
										className="h-11"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="client" className="text-sm font-medium">Client Name</Label>
									<Input
										id="client"
										value={caseStudy.client}
										onChange={(e) => setCaseStudy({ ...caseStudy, client: e.target.value })}
										className="h-11"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-2">
									<Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
									<Select value={caseStudy.industry} onValueChange={(value) => setCaseStudy({ ...caseStudy, industry: value })}>
										<SelectTrigger className="h-11">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{industries.map((industry: string) => (
												<SelectItem key={industry} value={industry}>
													{industry}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="duration" className="text-sm font-medium flex items-center gap-1">
										<Clock className="h-3 w-3" />
										Duration
									</Label>
									<Input
										id="duration"
										value={caseStudy.duration}
										onChange={(e) => setCaseStudy({ ...caseStudy, duration: e.target.value })}
										className="h-11"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="teamSize" className="text-sm font-medium flex items-center gap-1">
										<Users className="h-3 w-3" />
										Team Size
									</Label>
									<Input
										id="teamSize"
										value={caseStudy.teamSize}
										onChange={(e) => setCaseStudy({ ...caseStudy, teamSize: e.target.value })}
										className="h-11"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Project Details Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Project Details
							</CardTitle>
							<CardDescription>Challenge, solution, and results</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<Label htmlFor="challenge" className="text-sm font-medium">Challenge</Label>
								<Textarea
									id="challenge"
									value={caseStudy.challenge}
									onChange={(e) => setCaseStudy({ ...caseStudy, challenge: e.target.value })}
									rows={4}
									className="resize-none"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="solution" className="text-sm font-medium">Solution</Label>
								<Textarea
									id="solution"
									value={caseStudy.solution}
									onChange={(e) => setCaseStudy({ ...caseStudy, solution: e.target.value })}
									rows={4}
									className="resize-none"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="results" className="text-sm font-medium flex items-center gap-1">
									<CheckCircle className="h-3 w-3" />
									Results
								</Label>
								<Textarea
									id="results"
									value={caseStudy.results}
									onChange={(e) => setCaseStudy({ ...caseStudy, results: e.target.value })}
									rows={4}
									className="resize-none"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Technologies Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Technologies Used
							</CardTitle>
							<CardDescription>Technical stack and tools</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex gap-3">
								<Input
									value={newTechnology}
									onChange={(e) => setNewTechnology(e.target.value)}
									placeholder="Add technology (e.g., React, Node.js)"
									onKeyPress={(e: any) => e.key === "Enter" && addTechnology()}
									className="h-11"
								/>
								<Button onClick={addTechnology} size="lg" className="px-6">
									<Plus className="h-4 w-4 mr-2" />
									Add
								</Button>
							</div>
							<div className="flex flex-wrap gap-3">
								{caseStudy.technologies.map((tech: string) => (
									<Badge key={tech} variant="secondary" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
										{tech}
										<X className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => removeTechnology(tech)} />
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Testimonial Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								Client Testimonial
							</CardTitle>
							<CardDescription>Optional client feedback</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<Label htmlFor="testimonial" className="text-sm font-medium">Testimonial</Label>
								<Textarea
									id="testimonial"
									value={caseStudy.testimonial}
									onChange={(e) => setCaseStudy({ ...caseStudy, testimonial: e.target.value })}
									rows={3}
									className="resize-none"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="testimonialAuthor" className="text-sm font-medium">Author Name</Label>
									<Input
										id="testimonialAuthor"
										value={caseStudy.testimonialAuthor}
										onChange={(e) => setCaseStudy({ ...caseStudy, testimonialAuthor: e.target.value })}
										className="h-11"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="testimonialRole" className="text-sm font-medium">Role/Title</Label>
									<Input
										id="testimonialRole"
										value={caseStudy.testimonialRole}
										onChange={(e) => setCaseStudy({ ...caseStudy, testimonialRole: e.target.value })}
										className="h-11"
									/>
								</div>
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
								<Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
								<Input
									id="publishDate"
									type="date"
									value={caseStudy.publishDate}
									onChange={(e) => setCaseStudy({ ...caseStudy, publishDate: e.target.value })}
									className="h-11"
								/>
							</div>

							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Featured Case Study</Label>
									<p className="text-xs text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={caseStudy.featured}
									onCheckedChange={(checked: boolean) => setCaseStudy({ ...caseStudy, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Project Images</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button variant="outline" size="lg" className="w-full">
								<Upload className="h-4 w-4 mr-2" />
								Upload Images
							</Button>
							<p className="text-xs text-muted-foreground text-center">Add screenshots, mockups, or before/after images</p>
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
							<Link href={`/dashboard/case-studies/${caseStudy.id}?isEdit=false`}>View Case Study</Link>
						</Button>
						<Button variant="ghost" asChild className="w-full" size="lg">
							<Link href="/dashboard/case-studies">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Main Component
export default function CaseStudyPage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const [caseStudy, setCaseStudy] = useState(mockCaseStudy);
	
	const isEdit = searchParams.get('isEdit') === 'true';

	return isEdit ? (
		<EditCaseStudyPage caseStudy={caseStudy} setCaseStudy={setCaseStudy} />
	) : (
		<ViewCaseStudyPage caseStudy={caseStudy} />
	);
}
