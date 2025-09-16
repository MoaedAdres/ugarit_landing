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
import { ArrowLeft, Save, Plus, X, Upload, Calendar, Edit, Eye, Clock, Users, Target, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AddCaseStudyPage() {
	const [studyData, setStudyData] = useState({
		title: "",
		client: "",
		industry: "",
		challenge: "",
		solution: "",
		results: "",
		duration: "",
		teamSize: "",
		technologies: [] as string[],
		images: [] as string[],
		testimonial: "",
		testimonialAuthor: "",
		testimonialRole: "",
		status: "draft",
		featured: false,
		publishDate: "",
	});

	const [newTechnology, setNewTechnology] = useState("");
	const industries = ["Technology", "Healthcare", "Finance", "E-commerce", "Analytics", "Education"];

	const addTechnology = () => {
		if (newTechnology.trim() && !studyData.technologies.includes(newTechnology.trim())) {
			setStudyData({
				...studyData,
				technologies: [...studyData.technologies, newTechnology.trim()],
			});
			setNewTechnology("");
		}
	};

	const removeTechnology = (techToRemove: string) => {
		setStudyData({
			...studyData,
			technologies: studyData.technologies.filter((tech: string) => tech !== techToRemove),
		});
	};

	const handleSave = (status = "draft") => {
		const dataToSave = { ...studyData, status };
		console.log("Saving case study:", dataToSave);
		// Save logic would go here
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
								<h1 className="text-3xl font-bold tracking-tight">Create New Case Study</h1>
								<p className="text-muted-foreground">Document a successful project and showcase your results</p>
							</div>
						</div>
					</div>
				</div>
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
										value={studyData.title}
										onChange={(e) => setStudyData({ ...studyData, title: e.target.value })}
										placeholder="E-commerce Platform Redesign"
										className="h-11"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="client" className="text-sm font-medium">Client Name</Label>
									<Input
										id="client"
										value={studyData.client}
										onChange={(e) => setStudyData({ ...studyData, client: e.target.value })}
										placeholder="TechCorp Inc."
										className="h-11"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-2">
									<Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
									<Select value={studyData.industry} onValueChange={(value) => setStudyData({ ...studyData, industry: value })}>
										<SelectTrigger className="h-11">
											<SelectValue placeholder="Select industry" />
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
										value={studyData.duration}
										onChange={(e) => setStudyData({ ...studyData, duration: e.target.value })}
										placeholder="3 months"
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
										value={studyData.teamSize}
										onChange={(e) => setStudyData({ ...studyData, teamSize: e.target.value })}
										placeholder="5 people"
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
									value={studyData.challenge}
									onChange={(e) => setStudyData({ ...studyData, challenge: e.target.value })}
									placeholder="Describe the main challenges faced by the client"
									rows={4}
									className="resize-none"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="solution" className="text-sm font-medium">Solution</Label>
								<Textarea
									id="solution"
									value={studyData.solution}
									onChange={(e) => setStudyData({ ...studyData, solution: e.target.value })}
									placeholder="Explain the solution you provided"
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
									value={studyData.results}
									onChange={(e) => setStudyData({ ...studyData, results: e.target.value })}
									placeholder="Quantify the results and impact"
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
								{studyData.technologies.map((tech: string) => (
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
									value={studyData.testimonial}
									onChange={(e) => setStudyData({ ...studyData, testimonial: e.target.value })}
									placeholder="Client's feedback about the project"
									rows={3}
									className="resize-none"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="testimonialAuthor" className="text-sm font-medium">Author Name</Label>
									<Input
										id="testimonialAuthor"
										value={studyData.testimonialAuthor}
										onChange={(e) => setStudyData({ ...studyData, testimonialAuthor: e.target.value })}
										placeholder="John Smith"
										className="h-11"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="testimonialRole" className="text-sm font-medium">Role/Title</Label>
									<Input
										id="testimonialRole"
										value={studyData.testimonialRole}
										onChange={(e) => setStudyData({ ...studyData, testimonialRole: e.target.value })}
										placeholder="CEO, TechCorp Inc."
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
									value={studyData.publishDate}
									onChange={(e) => setStudyData({ ...studyData, publishDate: e.target.value })}
									className="h-11"
								/>
							</div>

							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Featured Case Study</Label>
									<p className="text-xs text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={studyData.featured}
									onCheckedChange={(checked: boolean) => setStudyData({ ...studyData, featured: checked })}
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
							Publish Case Study
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
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
