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

export default function EditCaseStudy() {
	const [caseStudy, setCaseStudy] = useState(mockCaseStudy);
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
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => window.location.href = "/dashboard/case-studies"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Case Studies"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
								<i className={`${myIcons.target} h-7 w-7 text-primary`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Edit Case Study</h1>
								<p className="text-muted-foreground">Update case study information</p>
							</div>
						</RFlex>
					</div>
				</RFlex>
				<RButton
					variant="outline"
					size="lg"
					onClick={() => window.location.href = `/dashboard/case-studies/${caseStudy.id}?isEdit=false`}
					icon={<i className={`${myIcons.eye} h-4 w-4`} />}
					text="View Case Study"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Basic Information Card */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-primary rounded-full"></div>
								Basic Information
							</RFlex>
						}
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
						contentComponent={
							<div className="space-y-6">
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
										<RSelect
											value={caseStudy.industry}
											onValueChange={(value) => setCaseStudy({ ...caseStudy, industry: value })}
											placeholder="Select industry"
											options={industries.map(industry => ({ value: industry, label: industry }))}
											className="h-11"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="duration" className="text-sm font-medium flex items-center gap-1">
											<i className={`${myIcons.clock} h-3 w-3`} />
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
											<i className={`${myIcons.users} h-3 w-3`} />
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
							</div>
						}
					/>

					{/* Project Details Card */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Project Details
							</RFlex>
						}
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
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
										<i className={`${myIcons.check} h-3 w-3`} />
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
							</div>
						}
					/>

					{/* Technologies Card */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Technologies Used
							</RFlex>
						}
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
								<RFlex className="gap-3">
									<Input
										value={newTechnology}
										onChange={(e) => setNewTechnology(e.target.value)}
										placeholder="Add technology (e.g., React, Node.js)"
										onKeyPress={(e: any) => e.key === "Enter" && addTechnology()}
										className="h-11"
									/>
									<RButton onClick={addTechnology} size="lg" className="px-6" icon={<i className={`${myIcons.plus} h-4 w-4`} />} text="Add" />
								</RFlex>
								<RFlex className="flex-wrap gap-3">
									{caseStudy.technologies.map((tech: string) => (
										<Badge key={tech} variant="secondary" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
											{tech}
											<i className={`${myIcons.xmark} h-3 w-3 cursor-pointer hover:text-red-500 transition-colors`} onClick={() => removeTechnology(tech)} />
										</Badge>
									))}
								</RFlex>
							</div>
						}
					/>

					{/* Testimonial Card */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								Client Testimonial
							</RFlex>
						}
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
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
							</div>
						}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<RCard
						title="Publish Settings"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
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
							</div>
						}
					/>

					<RCard
						title="Project Images"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-4">
								<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
									<i className={`${myIcons.upload} h-4 w-4`} />
									Upload Images
								</button>
								<p className="text-xs text-muted-foreground text-center">Add screenshots, mockups, or before/after images</p>
							</div>
						}
					/>

					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("published")}
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.calendar} h-4 w-4`} />}
							text="Update & Publish"
						/>
						<RButton
							onClick={() => handleSave("draft")}
							variant="outline"
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Save Draft"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = `/dashboard/case-studies/${caseStudy.id}?isEdit=false`}
							className="w-full"
							text="View Case Study"
						/>
						<RButton
							variant="ghost"
							onClick={() => window.location.href = "/dashboard/case-studies"}
							className="w-full"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
