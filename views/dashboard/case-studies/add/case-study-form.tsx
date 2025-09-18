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

interface CaseStudyFormProps {
	studyData: any;
	setStudyData: (data: any) => void;
}

export function CaseStudyForm({ studyData, setStudyData }: CaseStudyFormProps) {
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

	return (
		<div className="space-y-8">
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
								<RSelect
									value={studyData.industry}
									onValueChange={(value) => setStudyData({ ...studyData, industry: value })}
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
									value={studyData.duration}
									onChange={(e) => setStudyData({ ...studyData, duration: e.target.value })}
									placeholder="3 months"
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
									value={studyData.teamSize}
									onChange={(e) => setStudyData({ ...studyData, teamSize: e.target.value })}
									placeholder="5 people"
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
								<i className={`${myIcons.check} h-3 w-3`} />
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
							{studyData.technologies.map((tech: string) => (
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
					</div>
				}
			/>
		</div>
	);
}
