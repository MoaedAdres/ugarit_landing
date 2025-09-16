"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Star, Upload, User, MessageSquare, Heart, Quote, Award, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AddTestimonialPage() {
	const [testimonialData, setTestimonialData] = useState({
		name: "",
		role: "",
		company: "",
		email: "",
		content: "",
		rating: 5,
		avatar: "",
		project: "",
		status: "draft",
		featured: false,
		allowPublicDisplay: true,
		contactForFollowup: false,
	});

	const projects = ["Web Development", "Mobile App", "E-commerce Platform", "Digital Marketing", "Consulting"];

	const handleSave = (status = "draft") => {
		const dataToSave = { ...testimonialData, status };
		console.log("Saving testimonial:", dataToSave);
		// Save logic would go here
	};

	const renderStarRating = () => {
		return Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`h-6 w-6 cursor-pointer transition-colors ${
					i < testimonialData.rating ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-200"
				}`}
				onClick={() => setTestimonialData({ ...testimonialData, rating: i + 1 })}
			/>
		));
	};

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<Link href="/dashboard/testimonials">
						<Button variant="ghost" size="sm" className="mt-1">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Testimonials
						</Button>
					</Link>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-rose-500/10 to-pink-500/5 rounded-2xl border border-rose-500/20">
								<MessageSquare className="h-7 w-7 text-rose-600" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Add New Testimonial</h1>
								<p className="text-muted-foreground">Collect and manage customer feedback</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Client Information Card */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-primary rounded-full"></div>
								Client Information
							</CardTitle>
							<CardDescription>Details about the person providing the testimonial</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
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
								<Select
									value={testimonialData.project}
									onValueChange={(value) => setTestimonialData({ ...testimonialData, project: value })}
								>
									<SelectTrigger className="h-11">
										<SelectValue placeholder="Select project" />
									</SelectTrigger>
									<SelectContent>
										{projects.map((project: string) => (
											<SelectItem key={project} value={project}>
												{project}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					{/* Testimonial Content Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-rose-500 rounded-full"></div>
								Testimonial Content
							</CardTitle>
							<CardDescription>The actual testimonial and rating</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
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
								<div className="flex items-center gap-2">
									<div className="flex">{renderStarRating()}</div>
									<span className="text-sm text-muted-foreground ml-2">{testimonialData.rating}/5 stars</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Privacy & Permissions Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Privacy & Permissions
							</CardTitle>
							<CardDescription>How this testimonial can be used</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
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
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Featured Testimonial</Label>
									<p className="text-xs text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={testimonialData.featured}
									onCheckedChange={(checked) => setTestimonialData({ ...testimonialData, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Profile Photo</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-col items-center gap-4">
								<div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
									<User className="h-8 w-8 text-muted-foreground" />
								</div>
								<Button variant="outline" size="lg" className="w-full">
									<Upload className="h-4 w-4 mr-2" />
									Upload Photo
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Preview</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="border rounded-lg p-4 space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
										<User className="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<h4 className="font-medium text-sm">{testimonialData.name || "Client Name"}</h4>
										<p className="text-xs text-muted-foreground">
											{testimonialData.role || "Role"} at {testimonialData.company || "Company"}
										</p>
									</div>
								</div>
								<p className="text-sm italic">"{testimonialData.content || "Testimonial content will appear here..."}"</p>
								<div className="flex">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star key={i} className={`h-4 w-4 ${i < testimonialData.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("published")} className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Publish Testimonial
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
						</Button>
						<Button variant="ghost" asChild className="w-full" size="lg">
							<Link href="/dashboard/testimonials">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
