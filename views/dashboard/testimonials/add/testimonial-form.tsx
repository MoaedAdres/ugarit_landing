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
import { myIcons } from "@/constants/icons";

interface TestimonialFormProps {
	testimonialData: any;
	setTestimonialData: (data: any) => void;
}

export function TestimonialForm({ testimonialData, setTestimonialData }: TestimonialFormProps) {
	const projects = ["Web Development", "Mobile App", "E-commerce Platform", "Digital Marketing", "Consulting"];

	const renderStarRating = () => {
		return Array.from({ length: 5 }).map((_, i) => (
			<i
				key={i}
				className={`${myIcons.star} h-6 w-6 cursor-pointer transition-colors ${
					i < testimonialData.rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
				}`}
				onClick={() => setTestimonialData({ ...testimonialData, rating: i + 1 })}
			/>
		));
	};

	return (
		<div className="space-y-8">
			{/* Client Information Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-primary rounded-full"></div>
						Client Information
					</RFlex>
				}
				cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
				contentComponent={
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-3">
								<Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
								<Input
									id="name"
									value={testimonialData.name}
									onChange={(e) => setTestimonialData({ ...testimonialData, name: e.target.value })}
									placeholder="John Smith"
									className="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
								<Input
									id="email"
									type="email"
									value={testimonialData.email}
									onChange={(e) => setTestimonialData({ ...testimonialData, email: e.target.value })}
									placeholder="john@company.com"
									className="h-11"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-3">
								<Label htmlFor="role" className="text-sm font-medium">Job Title</Label>
								<Input
									id="role"
									value={testimonialData.role}
									onChange={(e) => setTestimonialData({ ...testimonialData, role: e.target.value })}
									placeholder="CEO"
									className="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="company" className="text-sm font-medium">Company</Label>
								<Input
									id="company"
									value={testimonialData.company}
									onChange={(e) => setTestimonialData({ ...testimonialData, company: e.target.value })}
									placeholder="TechCorp Inc."
									className="h-11"
								/>
							</div>
						</div>

						<div className="space-y-3">
							<Label htmlFor="project" className="text-sm font-medium">Related Project</Label>
							<RSelect
								value={testimonialData.project}
								handleChange={(value: string) => setTestimonialData({ ...testimonialData, project: value })}
								placeholder="Select project"
								options={projects.map(project => ({ value: project, label: project }))}
								triggerClassName="h-11"
							/>
						</div>
					</div>
				}
			/>

			{/* Testimonial Content Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-rose-500 rounded-full"></div>
						Testimonial Content
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="content" className="text-sm font-medium">Testimonial Text</Label>
							<Textarea
								id="content"
								value={testimonialData.content}
								onChange={(e) => setTestimonialData({ ...testimonialData, content: e.target.value })}
								placeholder="Share your experience working with us..."
								rows={6}
								className="resize-none"
							/>
							<p className="text-xs text-muted-foreground">{testimonialData.content.length}/500 characters</p>
						</div>

						<div className="space-y-3">
							<Label className="text-sm font-medium">Rating</Label>
							<RFlex className="items-center gap-2">
								<div className="flex">{renderStarRating()}</div>
								<span className="text-sm text-muted-foreground ml-2">{testimonialData.rating}/5 stars</span>
							</RFlex>
						</div>
					</div>
				}
			/>

			{/* Privacy & Permissions Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
						Privacy & Permissions
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Allow Public Display</Label>
								<p className="text-xs text-muted-foreground">Show on website and marketing materials</p>
							</div>
							<Switch
								checked={testimonialData.allowPublicDisplay}
								onCheckedChange={(checked) => setTestimonialData({ ...testimonialData, allowPublicDisplay: checked })}
							/>
						</div>

						<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Contact for Follow-up</Label>
								<p className="text-xs text-muted-foreground">Client agrees to be contacted for case studies</p>
							</div>
							<Switch
								checked={testimonialData.contactForFollowup}
								onCheckedChange={(checked) => setTestimonialData({ ...testimonialData, contactForFollowup: checked })}
							/>
						</div>
					</div>
				}
			/>
		</div>
	);
}
