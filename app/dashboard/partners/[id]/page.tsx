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
import { 
	ArrowLeft, 
	Save, 
	Plus, 
	X, 
	Upload, 
	Calendar, 
	Edit, 
	Eye, 
	Clock, 
	Building2, 
	Handshake, 
	Shield, 
	Star, 
	Globe, 
	Award, 
	BarChart3,
	ExternalLink,
	MapPin,
	Mail,
	Phone,
	Users,
	TrendingUp,
	DollarSign,
	Target
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

// Mock partner data
const mockPartner = {
	id: 1,
	name: "Microsoft",
	type: "Technology Partner",
	category: "Cloud Services",
	logo: "/logos/microsoft.png",
	website: "https://microsoft.com",
	status: "active",
	featured: true,
	partnershipDate: "2023-01-15",
	description: "Leading cloud infrastructure and productivity solutions provider with comprehensive enterprise solutions.",
	benefits: ["Azure Credits", "Technical Support", "Co-marketing", "Training Programs"],
	location: "Redmond, WA",
	contact: "partner@microsoft.com",
	phone: "+1 (425) 882-8080",
	renewalDate: "2024-12-31",
	revenue: "$2.5M",
	projects: 15,
	teamSize: 250,
	contractValue: "$5.2M",
	lastContact: "2024-01-10",
	nextMeeting: "2024-02-15",
	keyContacts: [
		{ name: "Sarah Johnson", role: "Partnership Manager", email: "sarah.j@microsoft.com" },
		{ name: "Mike Chen", role: "Technical Lead", email: "mike.c@microsoft.com" }
	],
	agreements: [
		{ name: "Master Service Agreement", status: "Active", expiry: "2024-12-31" },
		{ name: "NDA", status: "Active", expiry: "2025-01-15" }
	],
	updatedAt: "2 days ago",
};

// View Partner Component
function ViewPartnerPage({ partner }: { partner: any }) {
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
								<Building2 className="h-7 w-7 text-violet-600" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{partner.name}</h1>
								<div className="flex items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{partner.type}</Badge>
									<Badge variant={partner.status === "active" ? "default" : "secondary"} className="font-medium">
										{partner.status === "active" ? "Active" : "Pending"}
									</Badge>
									{partner.featured && (
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
					<Link href={`/dashboard/partners/${partner.id}?isEdit=true`}>
						<Edit className="h-4 w-4 mr-2" />
						Edit Partner
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Partner Overview */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardContent className="p-8">
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-semibold mb-3 text-foreground">Partnership Overview</h2>
									<div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-muted/30 rounded-xl">
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{partner.revenue}</div>
											<div className="text-sm font-medium text-muted-foreground">Revenue</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{partner.projects}</div>
											<div className="text-sm font-medium text-muted-foreground">Projects</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{partner.teamSize}</div>
											<div className="text-sm font-medium text-muted-foreground">Team Size</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary mb-1">{partner.contractValue}</div>
											<div className="text-sm font-medium text-muted-foreground">Contract Value</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Partner Description */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-violet-500 rounded-full"></div>
								About {partner.name}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground leading-relaxed text-lg">
								{partner.description}
							</p>
						</CardContent>
					</Card>

					{/* Partnership Benefits */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Partnership Benefits
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{partner.benefits.map((benefit: string, index: number) => (
									<div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
										<div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg">
											<Award className="h-4 w-4 text-green-600 dark:text-green-400" />
										</div>
										<span className="font-medium text-green-800 dark:text-green-200">{benefit}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Key Contacts */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Key Contacts
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{partner.keyContacts.map((contact: any, index: number) => (
									<div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
												<Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
											</div>
											<div>
												<div className="font-medium">{contact.name}</div>
												<div className="text-sm text-muted-foreground">{contact.role}</div>
											</div>
										</div>
										<Button variant="ghost" size="sm" asChild>
											<Link href={`mailto:${contact.email}`}>
												<Mail className="h-4 w-4" />
											</Link>
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Partnership Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Status</div>
										<div className="text-xs text-muted-foreground">Partnership status</div>
									</div>
									<Badge variant={partner.status === "active" ? "default" : "secondary"} className="font-medium">
										{partner.status === "active" ? "Active" : "Pending"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Featured</div>
										<div className="text-xs text-muted-foreground">Priority partner</div>
									</div>
									<Badge variant={partner.featured ? "default" : "secondary"} className="font-medium">
										{partner.featured ? "Yes" : "No"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Partnership Date</div>
										<div className="text-xs text-muted-foreground">When started</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">
										{new Date(partner.partnershipDate).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Renewal Date</div>
										<div className="text-xs text-muted-foreground">Contract expiry</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">
										{new Date(partner.renewalDate).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Last Contact</div>
										<div className="text-xs text-muted-foreground">Recent interaction</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">
										{new Date(partner.lastContact).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Next Meeting</div>
										<div className="text-xs text-muted-foreground">Upcoming meeting</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">
										{new Date(partner.nextMeeting).toLocaleDateString()}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Globe className="h-4 w-4 text-muted-foreground" />
									<Link href={partner.website} target="_blank" className="text-sm text-primary hover:underline">
										{partner.website}
									</Link>
								</div>
								<div className="flex items-center gap-3">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">{partner.contact}</span>
								</div>
								<div className="flex items-center gap-3">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">{partner.phone}</span>
								</div>
								<div className="flex items-center gap-3">
									<MapPin className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">{partner.location}</span>
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
								<Link href={`/dashboard/partners/${partner.id}?isEdit=true`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Partner
								</Link>
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<ExternalLink className="h-4 w-4 mr-2" />
								Visit Website
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<Mail className="h-4 w-4 mr-2" />
								Send Email
							</Button>
							<Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20" size="lg">
								<X className="h-4 w-4 mr-2" />
								Remove Partner
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

// Edit Partner Component
function EditPartnerPage({ partner, setPartner }: { partner: any; setPartner: any }) {
	const partnerTypes = ["Technology Partner", "Cloud Partner", "CRM Partner", "Creative Partner", "Marketing Partner", "Consulting Partner"];
	const categories = ["Cloud Services", "Infrastructure", "AI & Analytics", "Business Solutions", "Design & Marketing", "Inbound Marketing", "Security", "Data Analytics"];

	const handleSave = (status = "draft") => {
		const dataToSave = { ...partner, status };
		console.log("Updating partner:", dataToSave);
		// Update logic would go here
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
								<h1 className="text-3xl font-bold tracking-tight">Edit Partner</h1>
								<p className="text-muted-foreground">Update partnership information and settings</p>
							</div>
						</div>
					</div>
				</div>
				<Button asChild variant="outline" size="lg">
					<Link href={`/dashboard/partners/${partner.id}?isEdit=false`}>
						<Eye className="h-4 w-4 mr-2" />
						View Partner
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
							<CardDescription>Core partner details and contact information</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<Label htmlFor="name" className="text-sm font-medium">Partner Name</Label>
									<Input
										id="name"
										value={partner.name}
										onChange={(e) => setPartner({ ...partner, name: e.target.value })}
										placeholder="Microsoft"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="website" className="text-sm font-medium">Website</Label>
									<Input
										id="website"
										value={partner.website}
										onChange={(e) => setPartner({ ...partner, website: e.target.value })}
										placeholder="https://microsoft.com"
										className="h-11"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<Label htmlFor="type" className="text-sm font-medium">Partner Type</Label>
									<Select
										value={partner.type}
										onValueChange={(value) => setPartner({ ...partner, type: value })}
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
										value={partner.category}
										onValueChange={(value) => setPartner({ ...partner, category: value })}
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
									value={partner.description}
									onChange={(e) => setPartner({ ...partner, description: e.target.value })}
									placeholder="Describe the partnership..."
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
										value={partner.contact}
										onChange={(e) => setPartner({ ...partner, contact: e.target.value })}
										placeholder="partner@microsoft.com"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
									<Input
										id="phone"
										value={partner.phone}
										onChange={(e) => setPartner({ ...partner, phone: e.target.value })}
										placeholder="+1 (425) 882-8080"
										className="h-11"
									/>
								</div>
							</div>

							<div className="space-y-3">
								<Label htmlFor="location" className="text-sm font-medium">Location</Label>
								<Input
									id="location"
									value={partner.location}
									onChange={(e) => setPartner({ ...partner, location: e.target.value })}
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
										value={partner.revenue}
										onChange={(e) => setPartner({ ...partner, revenue: e.target.value })}
										placeholder="$2.5M"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="projects" className="text-sm font-medium">Projects</Label>
									<Input
										id="projects"
										type="number"
										value={partner.projects}
										onChange={(e) => setPartner({ ...partner, projects: parseInt(e.target.value) })}
										placeholder="15"
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="teamSize" className="text-sm font-medium">Team Size</Label>
									<Input
										id="teamSize"
										type="number"
										value={partner.teamSize}
										onChange={(e) => setPartner({ ...partner, teamSize: parseInt(e.target.value) })}
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
										value={partner.partnershipDate}
										onChange={(e) => setPartner({ ...partner, partnershipDate: e.target.value })}
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="renewalDate" className="text-sm font-medium">Renewal Date</Label>
									<Input
										id="renewalDate"
										type="date"
										value={partner.renewalDate}
										onChange={(e) => setPartner({ ...partner, renewalDate: e.target.value })}
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
							<CardTitle className="text-lg">Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Featured Partner</Label>
									<p className="text-xs text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={partner.featured}
									onCheckedChange={(checked) => setPartner({ ...partner, featured: checked })}
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

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("active")} className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Update Partner
						</Button>
						<Button onClick={() => handleSave("pending")} variant="outline" className="w-full" size="lg">
							<Save className="h-4 w-4 mr-2" />
							Save as Draft
						</Button>
						<Button variant="outline" asChild className="w-full" size="lg">
							<Link href={`/dashboard/partners/${partner.id}?isEdit=false`}>View Partner</Link>
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

// Main Component
export default function PartnerPage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const [partner, setPartner] = useState(mockPartner);
	
	const isEdit = searchParams.get('isEdit') === 'true';

	return isEdit ? (
		<EditPartnerPage partner={partner} setPartner={setPartner} />
	) : (
		<ViewPartnerPage partner={partner} />
	);
}
