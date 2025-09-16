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
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";
import Link from "next/link";

export default function AddServicePage() {
	const [serviceData, setServiceData] = useState({
		title: "",
		category: "",
		description: "",
		fullDescription: "",
		priceMin: "",
		priceMax: "",
		duration: "",
		features: [] as string[],
		requirements: [] as string[],
		deliverables: [] as string[],
		isActive: true,
		featured: false,
	});

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

	const addRequirement = () => {
		if (newRequirement.trim()) {
			setServiceData({
				...serviceData,
				requirements: [...serviceData.requirements, newRequirement.trim()],
			});
			setNewRequirement("");
		}
	};

	const addDeliverable = () => {
		if (newDeliverable.trim()) {
			setServiceData({
				...serviceData,
				deliverables: [...serviceData.deliverables, newDeliverable.trim()],
			});
			setNewDeliverable("");
		}
	};

	const handleSave = () => {
		console.log("Saving service:", serviceData);
		// Save logic would go here
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
					<h1 className="text-2xl font-bold">Add New Service</h1>
					<p className="text-muted-foreground">Create a new service offering</p>
				</div>
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
									<Input
										id="title"
										value={serviceData.title}
										onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
										placeholder="e.g., Web Development"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Select value={serviceData.category} onValueChange={(value) => setServiceData({ ...serviceData, category: value })}>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((cat) => (
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
									placeholder="Brief description for service cards"
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
									placeholder="Detailed service description"
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Pricing & Timeline</CardTitle>
							<CardDescription>Service pricing and duration</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="priceMin">Min Price ($)</Label>
									<Input
										id="priceMin"
										type="number"
										value={serviceData.priceMin}
										onChange={(e) =>
											setServiceData({
												...serviceData,
												priceMin: e.target.value,
											})
										}
										placeholder="1000"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="priceMax">Max Price ($)</Label>
									<Input
										id="priceMax"
										type="number"
										value={serviceData.priceMax}
										onChange={(e) =>
											setServiceData({
												...serviceData,
												priceMax: e.target.value,
											})
										}
										placeholder="5000"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="duration">Duration</Label>
									<Input
										id="duration"
										value={serviceData.duration}
										onChange={(e) =>
											setServiceData({
												...serviceData,
												duration: e.target.value,
											})
										}
										placeholder="4-8 weeks"
									/>
								</div>
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
								{serviceData.features.map((feature, index) => (
									<Badge key={index} variant="secondary" className="flex items-center gap-1">
										{feature}
										<X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(index)} />
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Requirements & Deliverables</CardTitle>
							<CardDescription>What's needed and what's delivered</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<Label>Requirements</Label>
								<div className="flex gap-2">
									<Input
										value={newRequirement}
										onChange={(e) => setNewRequirement(e.target.value)}
										placeholder="Add a requirement"
										onKeyPress={(e) => e.key === "Enter" && addRequirement()}
									/>
									<Button onClick={addRequirement} size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="space-y-1">
									{serviceData.requirements.map((req, index) => (
										<div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
											<span className="text-sm">{req}</span>
											<X
												className="h-4 w-4 cursor-pointer"
												onClick={() => {
													setServiceData({
														...serviceData,
														requirements: serviceData.requirements.filter((_, i) => i !== index),
													});
												}}
											/>
										</div>
									))}
								</div>
							</div>

							<div className="space-y-2">
								<Label>Deliverables</Label>
								<div className="flex gap-2">
									<Input
										value={newDeliverable}
										onChange={(e) => setNewDeliverable(e.target.value)}
										placeholder="Add a deliverable"
										onKeyPress={(e) => e.key === "Enter" && addDeliverable()}
									/>
									<Button onClick={addDeliverable} size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="space-y-1">
									{serviceData.deliverables.map((deliverable, index) => (
										<div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
											<span className="text-sm">{deliverable}</span>
											<X
												className="h-4 w-4 cursor-pointer"
												onClick={() => {
													setServiceData({
														...serviceData,
														deliverables: serviceData.deliverables.filter((_, i) => i !== index),
													});
												}}
											/>
										</div>
									))}
								</div>
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

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Eye className="h-5 w-5" />
								Preview
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="border rounded-lg p-4 space-y-3">
								<div className="flex items-center gap-2">
									<h3 className="font-semibold">{serviceData.title || "Service Title"}</h3>
									{serviceData.category && <Badge variant="outline">{serviceData.category}</Badge>}
								</div>
								<p className="text-sm text-muted-foreground">{serviceData.description || "Service description will appear here"}</p>
								<div className="text-sm">
									<span className="font-medium">
										${serviceData.priceMin || "0"} - ${serviceData.priceMax || "0"}
									</span>
									{serviceData.duration && <span className="text-muted-foreground ml-2">• {serviceData.duration}</span>}
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={handleSave} className="w-full">
							<Save className="h-4 w-4 mr-2" />
							Save Service
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
