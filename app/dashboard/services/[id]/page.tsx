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
import { ArrowLeft, Save, Plus, X, Edit, Eye, Cloud, Settings, Shield, Code, Database, Smartphone } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

// Icon mapping for services
const iconMap = {
	Cloud,
	Settings,
	Shield,
	Code,
	Database,
	Smartphone,
};

// Mock service data with enhanced structure
const mockService = {
	id: 1,
	title: "Cloud Solutions",
	category: "Infrastructure",
	description:
		"Migrate and optimize your infrastructure with AWS, Azure, and Google Cloud platforms for maximum scalability and cost-efficiency.",
	fullDescription:
		"We provide comprehensive cloud migration and optimization services to help your business leverage the power of cloud computing. Our team specializes in AWS, Azure, and Google Cloud platforms, ensuring maximum scalability, cost-efficiency, and security for your infrastructure.",
	priceMin: "3000",
	priceMax: "20000",
	duration: "6-16 weeks",
	features: ["Cloud Migration", "Infrastructure Optimization", "Multi-cloud Strategy", "Security Implementation", "Cost Optimization"],
	requirements: ["Current Infrastructure Assessment", "Business Requirements", "Security Compliance Needs", "Budget Planning"],
	deliverables: ["Migration Plan", "Optimized Infrastructure", "Documentation", "Training Sessions", "Ongoing Support"],
	isActive: true,
	featured: true,
	icon: "Cloud",
	updatedAt: "1 day ago",
};

// View Service Component
function ViewServicePage({ serviceData }: { serviceData: any }) {
	const Icon = iconMap[serviceData.icon as keyof typeof iconMap] || Settings;

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<Link href="/dashboard/services">
						<Button variant="ghost" size="sm" className="mt-1">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Services
						</Button>
					</Link>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
								<Icon className="h-7 w-7 text-primary" />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{serviceData.title}</h1>
								<div className="flex items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{serviceData.category}</Badge>
									<Badge variant={serviceData.isActive ? "default" : "secondary"} className="font-medium">
										{serviceData.isActive ? "Active" : "Inactive"}
									</Badge>
									{serviceData.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											⭐ Featured
										</Badge>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button asChild size="lg" className="shadow-lg">
					<Link href={`/dashboard/services/${serviceData.id}?isEdit=true`}>
						<Edit className="h-4 w-4 mr-2" />
						Edit Service
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Overview Card */}
					<Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
						<CardContent className="p-8">
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-semibold mb-3 text-foreground">Service Overview</h2>
									<p className="text-muted-foreground leading-relaxed text-base">{serviceData.description}</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/30 rounded-xl">
									<div className="text-center">
										<div className="text-3xl font-bold text-primary mb-1">
											${serviceData.priceMin} - ${serviceData.priceMax}
										</div>
										<div className="text-sm font-medium text-muted-foreground">Price Range</div>
									</div>
									<div className="text-center">
										<div className="text-3xl font-bold text-primary mb-1">{serviceData.duration}</div>
										<div className="text-sm font-medium text-muted-foreground">Project Duration</div>
									</div>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-3 text-foreground">Detailed Description</h3>
									<p className="text-muted-foreground leading-relaxed">{serviceData.fullDescription}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Features Card */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl">Key Features</CardTitle>
							<CardDescription>What this service includes</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{serviceData.features.map((feature: string, index: number) => (
									<div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
										<div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
											<div className="w-2 h-2 bg-primary rounded-full"></div>
										</div>
										<span className="font-medium text-foreground">{feature}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Requirements & Deliverables Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="border-0 shadow-lg">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg flex items-center gap-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									Requirements
								</CardTitle>
								<CardDescription>What we need from you</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{serviceData.requirements.map((requirement: string, index: number) => (
										<div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
											<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
											<span className="text-sm text-foreground leading-relaxed">{requirement}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg flex items-center gap-2">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									Deliverables
								</CardTitle>
								<CardDescription>What you'll receive</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{serviceData.deliverables.map((deliverable: string, index: number) => (
										<div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
											<div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
											<span className="text-sm text-foreground leading-relaxed">{deliverable}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Service Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Active Status</div>
										<div className="text-xs text-muted-foreground">Service availability</div>
									</div>
									<Badge variant={serviceData.isActive ? "default" : "secondary"} className="font-medium">
										{serviceData.isActive ? "Active" : "Inactive"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Featured</div>
										<div className="text-xs text-muted-foreground">Homepage highlight</div>
									</div>
									<Badge variant={serviceData.featured ? "default" : "secondary"} className="font-medium">
										{serviceData.featured ? "Yes" : "No"}
									</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
									<div>
										<div className="font-medium text-sm">Last Updated</div>
										<div className="text-xs text-muted-foreground">Recent changes</div>
									</div>
									<span className="text-sm text-muted-foreground font-medium">{serviceData.updatedAt}</span>
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
								<Link href={`/dashboard/services/${serviceData.id}?isEdit=true`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Service
								</Link>
							</Button>
							<Button variant="outline" className="w-full" size="lg">
								<Eye className="h-4 w-4 mr-2" />
								Preview on Site
							</Button>
							<Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20" size="lg">
								<X className="h-4 w-4 mr-2" />
								Delete Service
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

// Edit Service Component
function EditServicePage({ serviceData, setServiceData }: { serviceData: any; setServiceData: any }) {
	const [newFeature, setNewFeature] = useState("");
	const [newRequirement, setNewRequirement] = useState("");
	const [newDeliverable, setNewDeliverable] = useState("");
	const categories = ["Development", "Design", "Marketing", "Consulting", "Support", "Infrastructure", "Security", "Analytics"];

	const addFeature = () => {
		if (newFeature.trim()) {
			setServiceData({
				...serviceData,
				features: [...serviceData.features, newFeature.trim()],
			});
			setNewFeature("");
		}
	};

	const removeFeature = (index: number) => {
		setServiceData({
			...serviceData,
			features: serviceData.features.filter((_: any, i: number) => i !== index),
		});
	};

	const handleSave = () => {
		console.log("Updating service:", serviceData);
		// Update logic would go here
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/services">
						<Button variant="ghost" size="sm">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Services
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold">Edit Service</h1>
						<p className="text-muted-foreground">Update service information</p>
					</div>
				</div>
				<Button asChild variant="outline">
					<Link href={`/dashboard/services/${serviceData.id}?isEdit=false`}>
						<Eye className="h-4 w-4 mr-2" />
						View Service
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Form */}
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
							<CardDescription>Core service details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="title">Service Title</Label>
									<Input id="title" value={serviceData.title} onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })} />
								</div>
								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Select value={serviceData.category} onValueChange={(value) => setServiceData({ ...serviceData, category: value })}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{categories.map((cat: string) => (
												<SelectItem key={cat} value={cat}>
													{cat}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="priceMin">Min Price ($)</Label>
									<Input
										id="priceMin"
										type="number"
										value={serviceData.priceMin}
										onChange={(e) => setServiceData({ ...serviceData, priceMin: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="priceMax">Max Price ($)</Label>
									<Input
										id="priceMax"
										type="number"
										value={serviceData.priceMax}
										onChange={(e) => setServiceData({ ...serviceData, priceMax: e.target.value })}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="duration">Duration</Label>
								<Input
									id="duration"
									value={serviceData.duration}
									onChange={(e) => setServiceData({ ...serviceData, duration: e.target.value })}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Short Description</Label>
								<Textarea
									id="description"
									value={serviceData.description}
									onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
									rows={2}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="fullDescription">Full Description</Label>
								<Textarea
									id="fullDescription"
									value={serviceData.fullDescription}
									onChange={(e) => setServiceData({ ...serviceData, fullDescription: e.target.value })}
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Service Features</CardTitle>
							<CardDescription>Key features and benefits</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex gap-2">
								<Input
									value={newFeature}
									onChange={(e) => setNewFeature(e.target.value)}
									placeholder="Add a feature"
									onKeyPress={(e) => e.key === "Enter" && addFeature()}
								/>
								<Button onClick={addFeature} size="sm">
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex flex-wrap gap-2">
								{serviceData.features.map((feature: string, index: number) => (
									<Badge key={index} variant="secondary" className="flex items-center gap-1">
										{feature}
										<X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(index)} />
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Active Status</Label>
									<p className="text-sm text-muted-foreground">Make service available</p>
								</div>
								<Switch
									checked={serviceData.isActive}
									onCheckedChange={(checked) => setServiceData({ ...serviceData, isActive: checked })}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Featured Service</Label>
									<p className="text-sm text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={serviceData.featured}
									onCheckedChange={(checked) => setServiceData({ ...serviceData, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={handleSave} className="w-full">
							<Save className="h-4 w-4 mr-2" />
							Update Service
						</Button>
						<Button variant="outline" asChild className="w-full">
							<Link href={`/dashboard/services/${serviceData.id}?isEdit=false`}>View Service</Link>
						</Button>
						<Button variant="outline" asChild className="w-full bg-transparent">
							<Link href="/dashboard/services">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Main Component
export default function ServicePage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const [serviceData, setServiceData] = useState(mockService);

	const isEdit = searchParams.get("isEdit") === "true";

	return isEdit ? (
		<EditServicePage serviceData={serviceData} setServiceData={setServiceData} />
	) : (
		<ViewServicePage serviceData={serviceData} />
	);
}
