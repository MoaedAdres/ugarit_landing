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

// Mock testimonial data
const mockTestimonial = {
	id: 1,
	name: "John Smith",
	role: "CEO",
	company: "TechCorp Inc.",
	email: "john@techcorp.com",
	content: "Excellent service and outstanding results. The team delivered beyond our expectations and helped transform our business operations. Their attention to detail and commitment to quality is unmatched.",
	rating: 5,
	avatar: "/avatar1.jpg",
	status: "published",
	featured: true,
	createdAt: "2024-01-20",
	project: "E-commerce Platform",
	allowPublicDisplay: true,
	contactForFollowup: true,
	updatedAt: "2 days ago",
};

export default function EditTestimonial() {
	const [testimonial, setTestimonial] = useState(mockTestimonial);
	const projects = ["Web Development", "Mobile App", "E-commerce Platform", "Digital Marketing", "Consulting"];

	const renderStarRating = () => {
		return Array.from({ length: 5 }).map((_, i) => (
			<i
				key={i}
				className={`${myIcons.star} h-6 w-6 cursor-pointer transition-colors ${
					i < testimonial.rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
				}`}
				onClick={() => setTestimonial({ ...testimonial, rating: i + 1 })}
			/>
		));
	};

	const handleSave = (status = "draft") => {
		const dataToSave = { ...testimonial, status };
		console.log("Updating testimonial:", dataToSave);
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
						onClick={() => window.location.href = "/dashboard/testimonials"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Testimonials"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-rose-500/10 to-pink-500/5 rounded-2xl border border-rose-500/20">
								<i className={`${myIcons.comment} h-7 w-7 text-rose-600`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
								<p className="text-muted-foreground">Update testimonial information and settings</p>
							</div>
						</RFlex>
					</div>
				</RFlex>
				<RButton
					variant="outline"
					size="lg"
					onClick={() => window.location.href = `/dashboard/testimonials/${testimonial.id}?isEdit=false`}
					icon={<i className={`${myIcons.eye} h-4 w-4`} />}
					text="View Testimonial"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
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
											value={testimonial.name}
											onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })}
											placeholder="John Smith"
											className="h-11"
										/>
									</div>
									<div className="space-y-3">
										<Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
										<Input
											id="email"
											type="email"
											value={testimonial.email}
											onChange={(e) => setTestimonial({ ...testimonial, email: e.target.value })}
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
											value={testimonial.role}
											onChange={(e) => setTestimonial({ ...testimonial, role: e.target.value })}
											placeholder="CEO"
											className="h-11"
										/>
									</div>
									<div className="space-y-3">
										<Label htmlFor="company" className="text-sm font-medium">Company</Label>
										<Input
											id="company"
											value={testimonial.company}
											onChange={(e) => setTestimonial({ ...testimonial, company: e.target.value })}
											placeholder="TechCorp Inc."
											className="h-11"
										/>
									</div>
								</div>

								<div className="space-y-3">
									<Label htmlFor="project" className="text-sm font-medium">Related Project</Label>
									<RSelect
										value={testimonial.project}
										handleChange={(value: string) => setTestimonial({ ...testimonial, project: value })}
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
										value={testimonial.content}
										onChange={(e) => setTestimonial({ ...testimonial, content: e.target.value })}
										placeholder="Share your experience working with us..."
										rows={6}
										className="resize-none"
									/>
									<p className="text-xs text-muted-foreground">{testimonial.content.length}/500 characters</p>
								</div>

								<div className="space-y-3">
									<Label className="text-sm font-medium">Rating</Label>
									<RFlex className="items-center gap-2">
										<div className="flex">{renderStarRating()}</div>
										<span className="text-sm text-muted-foreground ml-2">{testimonial.rating}/5 stars</span>
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
										checked={testimonial.allowPublicDisplay}
										onCheckedChange={(checked) => setTestimonial({ ...testimonial, allowPublicDisplay: checked })}
									/>
								</div>

								<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
									<div className="space-y-1">
										<Label className="text-sm font-medium">Contact for Follow-up</Label>
										<p className="text-xs text-muted-foreground">Client agrees to be contacted for case studies</p>
									</div>
									<Switch
										checked={testimonial.contactForFollowup}
										onCheckedChange={(checked) => setTestimonial({ ...testimonial, contactForFollowup: checked })}
									/>
								</div>
							</div>
						}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<RCard
						title="Settings"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
								<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
									<div className="space-y-1">
										<Label className="text-sm font-medium">Featured Testimonial</Label>
										<p className="text-xs text-muted-foreground">Highlight on homepage</p>
									</div>
									<Switch
										checked={testimonial.featured}
										onCheckedChange={(checked) => setTestimonial({ ...testimonial, featured: checked })}
									/>
								</div>
							</div>
						}
					/>

					<RCard
						title="Profile Photo"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-4">
								<RFlex className="flex-col items-center gap-4">
									<div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
										<i className={`${myIcons.user} h-8 w-8 text-muted-foreground`} />
									</div>
									<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
										<i className={`${myIcons.upload} h-4 w-4`} />
										Upload Photo
									</button>
								</RFlex>
							</div>
						}
					/>

					<RCard
						title={
							<RFlex className="items-center gap-2">
								<i className={`${myIcons.eye} h-5 w-5`} />
								Preview
							</RFlex>
						}
						contentComponent={
							<div className="border rounded-lg p-4 space-y-3">
								<RFlex className="items-center gap-3">
									<div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
										<i className={`${myIcons.user} h-5 w-5 text-muted-foreground`} />
									</div>
									<div>
										<h4 className="font-medium text-sm">{testimonial.name || "Client Name"}</h4>
										<p className="text-xs text-muted-foreground">
											{testimonial.role || "Role"} at {testimonial.company || "Company"}
										</p>
									</div>
								</RFlex>
								<p className="text-sm italic">"{testimonial.content || "Testimonial content will appear here..."}"</p>
								<div className="flex">
									{Array.from({ length: 5 }).map((_, i) => (
										<i key={i} className={`${myIcons.star} h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`} />
									))}
								</div>
							</div>
						}
					/>

					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("published")}
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
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
							onClick={() => window.location.href = `/dashboard/testimonials/${testimonial.id}?isEdit=false`}
							className="w-full"
							text="View Testimonial"
						/>
						<RButton
							variant="ghost"
							onClick={() => window.location.href = "/dashboard/testimonials"}
							className="w-full"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
