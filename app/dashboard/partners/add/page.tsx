"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Upload, Building2, Handshake, Globe, Mail, Phone, MapPin, Award, BarChart3, Users, TrendingUp, DollarSign, Target } from "lucide-react";
import Link from "next/link";

export default function AddPartnerPage() {
	const [partnerData, setPartnerData] = useState({
		name: "",
		type: "",
		category: "",
		website: "",
		description: "",
		contact: "",
		phone: "",
		location: "",
		revenue: "",
		projects: 0,
		teamSize: 0,
		contractValue: "",
		partnershipDate: "",
		renewalDate: "",
		status: "pending",
		featured: false,
		allowPublicDisplay: true,
		contactForFollowup: false,
	});

	const partnerTypes = ["Technology Partner", "Cloud Partner", "CRM Partner", "Creative Partner", "Marketing Partner", "Consulting Partner"];
	const categories = ["Cloud Services", "Infrastructure", "AI & Analytics", "Business Solutions", "Design & Marketing", "Inbound Marketing", "Security", "Data Analytics"];

	const handleSave = (status = "pending") => {
		const dataToSave = { ...partnerData, status };
		console.log("Saving partner:", dataToSave);
		// Save logic would go here
	};

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<Link href="/dashboard/partners">
						<Button variant="ghost" size="sm" className="mt-1">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Partners
						</Button>
					</Link>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-2xl border border-violet-500/20">
								<Handshake className="h-7 w-7 text-violet-600" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Add New Partner</h1>
								<p className="text-muted-foreground">Create and manage strategic partnerships</p>
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
							<CardDescription>Core partner details and contact information</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<Label htmlFor="name" className="text-sm font-medium">Partner Name</Label>
									<Input
										id="name"
										value={partnerData.name}
										onChange={(e) => setPartnerData({ ...partnerData, name: e.target.value })}
										placeholder="Microsoft"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="website" className="text-sm font-medium">Website</Label>
									<Input
										id="website"
										value={partnerData.website}
										onChange={(e) => setPartnerData({ ...partnerData, website: e.target.value })}
										placeholder="https://microsoft.com"
										className="h-11"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<Label htmlFor="type" className="text-sm font-medium">Partner Type</Label>
									<Select
										value={partnerData.type}
										onValueChange={(value) => setPartnerData({ ...partnerData, type: value })}
									>
										<SelectTrigger className="h-11">
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											{partnerTypes.map((type: string) => (
												<SelectItem key={type} value={type}>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-3">
									<Label htmlFor="category" className="text-sm font-medium">Category</Label>
									<Select
										value={partnerData.category}
										onValueChange={(value) => setPartnerData({ ...partnerData, category: value })}
									>
										<SelectTrigger className="h-11">
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category: string) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-3">
								<Label htmlFor="description" className="text-sm font-medium">Description</Label>
								<Textarea
									id="description"
									value={partnerData.description}
									onChange={(e) => setPartnerData({ ...partnerData, description: e.target.value })}
									placeholder="Describe the partnership and what value it brings..."
									rows={4}
									className="resize-none"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Contact Information Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Contact Information
							</CardTitle>
							<CardDescription>Partner contact details and location</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<Label htmlFor="contact" className="text-sm font-medium">Contact Email</Label>
									<Input
										id="contact"
										type="email"
										value={partnerData.contact}
										onChange={(e) => setPartnerData({ ...partnerData, contact: e.target.value })}
										placeholder="partner@microsoft.com"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
									<Input
										id="phone"
										value={partnerData.phone}
										onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
										placeholder="+1 (425) 882-8080"
										className="h-11"
									/>
								</div>
							</div>

							<div className="space-y-3">
								<Label htmlFor="location" className="text-sm font-medium">Location</Label>
								<Input
									id="location"
									value={partnerData.location}
									onChange={(e) => setPartnerData({ ...partnerData, location: e.target.value })}
									placeholder="Redmond, WA"
									className="h-11"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Partnership Details Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Partnership Details
							</CardTitle>
							<CardDescription>Financial and project information</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-3">
									<Label htmlFor="revenue" className="text-sm font-medium">Revenue</Label>
									<Input
										id="revenue"
										value={partnerData.revenue}
										onChange={(e) => setPartnerData({ ...partnerData, revenue: e.target.value })}
										placeholder="$2.5M"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="projects" className="text-sm font-medium">Projects</Label>
									<Input
										id="projects"
										type="number"
										value={partnerData.projects}
										onChange={(e) => setPartnerData({ ...partnerData, projects: parseInt(e.target.value) || 0 })}
										placeholder="15"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="teamSize" className="text-sm font-medium">Team Size</Label>
									<Input
										id="teamSize"
										type="number"
										value={partnerData.teamSize}
										onChange={(e) => setPartnerData({ ...partnerData, teamSize: parseInt(e.target.value) || 0 })}
										placeholder="250"
										className="h-11"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<Label htmlFor="partnershipDate" className="text-sm font-medium">Partnership Date</Label>
									<Input
										id="partnershipDate"
										type="date"
										value={partnerData.partnershipDate}
										onChange={(e) => setPartnerData({ ...partnerData, partnershipDate: e.target.value })}
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="renewalDate" className="text-sm font-medium">Renewal Date</Label>
									<Input
										id="renewalDate"
										type="date"
										value={partnerData.renewalDate}
										onChange={(e) => setPartnerData({ ...partnerData, renewalDate: e.target.value })}
										className="h-11"
									/>
								</div>
							</div>

							<div className="space-y-3">
								<Label htmlFor="contractValue" className="text-sm font-medium">Contract Value</Label>
								<Input
									id="contractValue"
									value={partnerData.contractValue}
									onChange={(e) => setPartnerData({ ...partnerData, contractValue: e.target.value })}
									placeholder="$5.2M"
									className="h-11"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Partnership Settings Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								Partnership Settings
							</CardTitle>
							<CardDescription>How this partnership can be used and displayed</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Allow Public Display</Label>
									<p className="text-xs text-muted-foreground">Show on website and marketing materials</p>
								</div>
								<Switch
									checked={partnerData.allowPublicDisplay}
									onCheckedChange={(checked) => setPartnerData({ ...partnerData, allowPublicDisplay: checked })}
								/>
							</div>

							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Contact for Follow-up</Label>
									<p className="text-xs text-muted-foreground">Partner agrees to be contacted for case studies</p>
								</div>
								<Switch
									checked={partnerData.contactForFollowup}
									onCheckedChange={(checked) => setPartnerData({ ...partnerData, contactForFollowup: checked })}
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
									<Label className="text-sm font-medium">Featured Partner</Label>
									<p className="text-xs text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={partnerData.featured}
									onCheckedChange={(checked) => setPartnerData({ ...partnerData, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Partner Logo</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-col items-center gap-4">
								<div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
									<Building2 className="h-8 w-8 text-muted-foreground" />
								</div>
								<Button variant="outline" size="lg" className="w-full">
									<Upload className="h-4 w-4 mr-2" />
									Upload Logo
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
									<div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
										<Building2 className="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<h4 className="font-medium text-sm">{partnerData.name || "Partner Name"}</h4>
										<p className="text-xs text-muted-foreground">
											{partnerData.type || "Partner Type"}
										</p>
									</div>
								</div>
								<p className="text-sm text-muted-foreground line-clamp-2">
									{partnerData.description || "Partner description will appear here..."}
								</p>
								<div className="flex items-center justify-between">
									<span className="text-xs text-muted-foreground">{partnerData.category || "Category"}</span>
									<span className="text-xs font-medium text-violet-600">{partnerData.revenue || "$0"}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("active")} className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Create Partner
						</Button>
						<Button onClick={() => handleSave("pending")} variant="outline" className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Save as Draft
						</Button>
						<Button variant="ghost" asChild className="w-full" size="lg">
							<Link href="/dashboard/partners">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
