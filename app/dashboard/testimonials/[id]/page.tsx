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
import { ArrowLeft, Save, Plus, X, Upload, Calendar, Edit, Eye, Clock, User, MessageSquare, Star, Quote, Heart, Award, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

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

// View Testimonial Component
function ViewTestimonialPage({ testimonial }: { testimonial: any }) {
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
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
								<Heart className="h-7 w-7 text-rose-600" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{testimonial.name}</h1>
								<div className="flex items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{testimonial.company}</Badge>
									<Badge variant={testimonial.status === "published" ? "default" : "secondary"} className="font-medium">
										{testimonial.status === "published" ? "Published" : "Draft"}
									</Badge>
									{testimonial.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											<Star className="h-3 w-3 mr-1" />
											Featured
										</Badge>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button asChild size="lg" className="shadow-lg">
					<Link href={`/dashboard/testimonials/${testimonial.id}?isEdit=true`}>
						<Edit className="h-4 w-4 mr-2" />
						Edit Testimonial
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Testimonial Overview */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardContent className="p-8">
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-semibold mb-3 text-foreground">Testimonial Overview</h2>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-xl">
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{testimonial.role}</div>
											<div className="text-sm font-medium text-muted-foreground">Position</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{testimonial.rating}/5</div>
											<div className="text-sm font-medium text-muted-foreground">Rating</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{testimonial.project}</div>
											<div className="text-sm font-medium text-muted-foreground">Project</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Testimonial Content */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-rose-500 rounded-full"></div>
								Client Testimonial
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="relative p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-xl">
								<div className="absolute top-4 left-4">
									<Quote className="h-8 w-8 text-rose-200 dark:text-rose-800" />
								</div>
								<p className="text-muted-foreground leading-relaxed text-lg italic ml-8">
									"{testimonial.content}"
								</p>
							</div>
							<div className="flex items-center justify-center mt-6">
								<div className="flex items-center gap-2">
									<div className="flex">{renderStars(testimonial.rating)}</div>
									<span className="text-lg font-medium text-muted-foreground ml-2">{testimonial.rating}/5 stars</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Contact Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
									<p className="text-foreground font-medium">{testimonial.email}</p>
								</div>
								<div className="space-y-2">
									<Label className="text-sm font-medium text-muted-foreground">Company</Label>
									<p className="text-foreground font-medium">{testimonial.company}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Testimonial Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Status</div>
										<div className="text-xs text-muted-foreground">Publication status</div>
									</div>
									<Badge variant={testimonial.status === "published" ? "default" : "secondary"} className="font-medium">
										{testimonial.status === "published" ? "Published" : "Draft"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Featured</div>
										<div className="text-xs text-muted-foreground">Homepage highlight</div>
									</div>
									<Badge variant={testimonial.featured ? "default" : "secondary"} className="font-medium">
										{testimonial.featured ? "Yes" : "No"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Public Display</div>
										<div className="text-xs text-muted-foreground">Show on website</div>
									</div>
									<Badge variant={testimonial.allowPublicDisplay ? "default" : "secondary"} className="font-medium">
										{testimonial.allowPublicDisplay ? "Yes" : "No"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Follow-up Contact</div>
										<div className="text-xs text-muted-foreground">Case study permission</div>
									</div>
									<Badge variant={testimonial.contactForFollowup ? "default" : "secondary"} className="font-medium">
										{testimonial.contactForFollowup ? "Yes" : "No"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Created Date</div>
										<div className="text-xs text-muted-foreground">When submitted</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">
										{new Date(testimonial.createdAt).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Last Updated</div>
										<div className="text-xs text-muted-foreground">Recent changes</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">{testimonial.updatedAt}</span>
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
								<Link href={`/dashboard/testimonials/${testimonial.id}?isEdit=true`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Testimonial
								</Link>
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<Eye className="h-4 w-4 mr-2" />
								Preview on Site
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<MessageSquare className="h-4 w-4 mr-2" />
								Contact Client
							</Button>
							<Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20" size="lg">
								<X className="h-4 w-4 mr-2" />
								Delete Testimonial
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

// Edit Testimonial Component
function EditTestimonialPage({ testimonial, setTestimonial }: { testimonial: any; setTestimonial: any }) {
	const projects = ["Web Development", "Mobile App", "E-commerce Platform", "Digital Marketing", "Consulting"];

	const renderStarRating = () => {
		return Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`h-6 w-6 cursor-pointer transition-colors ${
					i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-200"
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
								<h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
								<p className="text-muted-foreground">Update testimonial information and settings</p>
							</div>
						</div>
					</div>
				</div>
				<Button asChild variant="outline" size="lg">
					<Link href={`/dashboard/testimonials/${testimonial.id}?isEdit=false`}>
						<Eye className="h-4 w-4 mr-2" />
						View Testimonial
					</Link>
				</Button>
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
								<Select
									value={testimonial.project}
									onValueChange={(value) => setTestimonial({ ...testimonial, project: value })}
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
								<div className="flex items-center gap-2">
									<div className="flex">{renderStarRating()}</div>
									<span className="text-sm text-muted-foreground ml-2">{testimonial.rating}/5 stars</span>
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
									checked={testimonial.featured}
									onCheckedChange={(checked) => setTestimonial({ ...testimonial, featured: checked })}
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
										<h4 className="font-medium text-sm">{testimonial.name || "Client Name"}</h4>
										<p className="text-xs text-muted-foreground">
											{testimonial.role || "Role"} at {testimonial.company || "Company"}
										</p>
									</div>
								</div>
								<p className="text-sm italic">"{testimonial.content || "Testimonial content will appear here..."}"</p>
								<div className="flex">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("published")} className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Update & Publish
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
						</Button>
						<Button variant="outline" asChild className="w-full" size="lg">
							<Link href={`/dashboard/testimonials/${testimonial.id}?isEdit=false`}>View Testimonial</Link>
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

// Main Component
export default function TestimonialPage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const [testimonial, setTestimonial] = useState(mockTestimonial);
	
	const isEdit = searchParams.get('isEdit') === 'true';

	return isEdit ? (
		<EditTestimonialPage testimonial={testimonial} setTestimonial={setTestimonial} />
	) : (
		<ViewTestimonialPage testimonial={testimonial} />
	);
}
