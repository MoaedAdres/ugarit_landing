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
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Link href="/dashboard/case-studies">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Case Studies
					</Button>
				</Link>
				<div>
					<h1 className="text-2xl font-bold">Create New Case Study</h1>
					<p className="text-muted-foreground">Document a successful project</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
							<CardDescription>Project overview and client details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="title">Project Title</Label>
									<Input
										id="title"
										value={studyData.title}
										onChange={(e) => setStudyData({ ...studyData, title: e.target.value })}
										placeholder="E-commerce Platform Redesign"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="client">Client Name</Label>
									<Input
										id="client"
										value={studyData.client}
										onChange={(e) => setStudyData({ ...studyData, client: e.target.value })}
										placeholder="TechCorp Inc."
									/>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="industry">Industry</Label>
									<Select value={studyData.industry} onValueChange={(value) => setStudyData({ ...studyData, industry: value })}>
										<SelectTrigger>
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
									<Label htmlFor="duration">Duration</Label>
									<Input
										id="duration"
										value={studyData.duration}
										onChange={(e) => setStudyData({ ...studyData, duration: e.target.value })}
										placeholder="3 months"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="teamSize">Team Size</Label>
									<Input
										id="teamSize"
										value={studyData.teamSize}
										onChange={(e) => setStudyData({ ...studyData, teamSize: e.target.value })}
										placeholder="5 people"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Project Details</CardTitle>
							<CardDescription>Challenge, solution, and results</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="challenge">Challenge</Label>
								<Textarea
									id="challenge"
									value={studyData.challenge}
									onChange={(e) => setStudyData({ ...studyData, challenge: e.target.value })}
									placeholder="Describe the main challenges faced by the client"
									rows={4}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="solution">Solution</Label>
								<Textarea
									id="solution"
									value={studyData.solution}
									onChange={(e) => setStudyData({ ...studyData, solution: e.target.value })}
									placeholder="Explain the solution you provided"
									rows={4}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="results">Results</Label>
								<Textarea
									id="results"
									value={studyData.results}
									onChange={(e) => setStudyData({ ...studyData, results: e.target.value })}
									placeholder="Quantify the results and impact"
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Technologies Used</CardTitle>
							<CardDescription>Technical stack and tools</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex gap-2">
								<Input
									value={newTechnology}
									onChange={(e) => setNewTechnology(e.target.value)}
									placeholder="Add technology"
									onKeyPress={(e: any) => e.key === "Enter" && addTechnology()}
								/>
								<Button onClick={addTechnology} size="sm">
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex flex-wrap gap-2">
								{studyData.technologies.map((tech: string) => (
									<Badge key={tech} variant="secondary" className="flex items-center gap-1">
										{tech}
										<X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Client Testimonial</CardTitle>
							<CardDescription>Optional client feedback</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="testimonial">Testimonial</Label>
								<Textarea
									id="testimonial"
									value={studyData.testimonial}
									onChange={(e) => setStudyData({ ...studyData, testimonial: e.target.value })}
									placeholder="Client's feedback about the project"
									rows={3}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="testimonialAuthor">Author Name</Label>
									<Input
										id="testimonialAuthor"
										value={studyData.testimonialAuthor}
										onChange={(e) =>
											setStudyData({
												...studyData,
												testimonialAuthor: e.target.value,
											})
										}
										placeholder="John Smith"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="testimonialRole">Role/Title</Label>
									<Input
										id="testimonialRole"
										value={studyData.testimonialRole}
										onChange={(e) =>
											setStudyData({
												...studyData,
												testimonialRole: e.target.value,
											})
										}
										placeholder="CEO, TechCorp Inc."
									/>
								</div>
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
								<Label htmlFor="publishDate">Publish Date</Label>
								<Input
									id="publishDate"
									type="date"
									value={studyData.publishDate}
									onChange={(e) => setStudyData({ ...studyData, publishDate: e.target.value })}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Featured Case Study</Label>
									<p className="text-sm text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={studyData.featured}
									onCheckedChange={(checked: boolean) => setStudyData({ ...studyData, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Project Images</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button variant="outline" size="sm" className="w-full bg-transparent">
								<Upload className="h-4 w-4 mr-2" />
								Upload Images
							</Button>
							<p className="text-xs text-muted-foreground">Add screenshots, mockups, or before/after images</p>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("published")} className="w-full">
							<Calendar className="h-4 w-4 mr-2" />
							Publish Case Study
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
						</Button>
						<Button variant="ghost" asChild className="w-full">
							<Link href="/dashboard/case-studies">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
