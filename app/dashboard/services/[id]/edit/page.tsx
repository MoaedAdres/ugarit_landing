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
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock service data
const mockService = {
	id: 1,
	title: "Web Development",
	category: "Development",
	description: "Custom web applications and websites",
	fullDescription:
		"We create modern, responsive web applications using the latest technologies. Our team specializes in React, Next.js, and Node.js development.",
	priceMin: "2500",
	priceMax: "15000",
	duration: "4-12 weeks",
	features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First"],
	requirements: ["Project Brief", "Content & Assets", "Domain Access"],
	deliverables: ["Source Code", "Documentation", "Training Session"],
	isActive: true,
	featured: false,
};

export default function EditServicePage() {
	const params = useParams();
	const [serviceData, setServiceData] = useState(mockService);
	const [newFeature, setNewFeature] = useState("");
	const [newRequirement, setNewRequirement] = useState("");
	const [newDeliverable, setNewDeliverable] = useState("");

	const categories = ["Development", "Design", "Marketing", "Consulting", "Support"];

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
			features: serviceData.features.filter((_, i) => i !== index),
		});
	};

	const handleSave = () => {
		console.log("Updating service:", serviceData);
		// Update logic would go here
	};

	return (
		<div className="space-y-6">
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

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Form - Similar to Add Service but with existing data */}
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

							<div className="space-y-2">
								<Label htmlFor="description">Short Description</Label>
								<Textarea
									id="description"
									value={serviceData.description}
									onChange={(e) =>
										setServiceData({
											...serviceData,
											description: e.target.value,
										})
									}
									rows={2}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="fullDescription">Full Description</Label>
								<Textarea
									id="fullDescription"
									value={serviceData.fullDescription}
									onChange={(e) =>
										setServiceData({
											...serviceData,
											fullDescription: e.target.value,
										})
									}
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Features section similar to add page */}
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
						<Button variant="outline" asChild className="w-full bg-transparent">
							<Link href="/dashboard/services">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
