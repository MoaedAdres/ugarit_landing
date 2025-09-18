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

export default function EditService() {
	const [serviceData, setServiceData] = useState(mockService);
	const [newFeature, setNewFeature] = useState("");
	const [newRequirement, setNewRequirement] = useState("");
	const [newDeliverable, setNewDeliverable] = useState("");
	const categories = ["Development", "Design", "Marketing", "Consulting", "Support", "Infrastructure", "Security", "Analytics"];
	
	const categoryOptions = categories.map(cat => ({
		value: cat,
		label: cat
	}));

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
			<RFlex className="items-center justify-between">
				<RFlex className="items-center gap-4">
					<RButton
						variant="ghost"
						size="sm"
						onClick={() => window.location.href = "/dashboard/services"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Services"
					/>
					<div>
						<h1 className="text-2xl font-bold">Edit Service</h1>
						<p className="text-muted-foreground">Update service information</p>
					</div>
				</RFlex>
				<RButton
					variant="outline"
					onClick={() => window.location.href = `/dashboard/services/${serviceData.id}?isEdit=false`}
					icon={<i className={`${myIcons.eye} h-4 w-4`} />}
					text="View Service"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Form */}
				<div className="lg:col-span-2 space-y-6">
					<RCard
						title="Basic Information"
						description="Core service details"
						contentComponent={
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="title">Service Title</Label>
										<Input id="title" value={serviceData.title} onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="category">Category</Label>
										<RSelect
											value={serviceData.category}
											handleChange={(value) => setServiceData({ ...serviceData, category: value })}
											options={categoryOptions}
										/>
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
							</div>
						}
					/>

					<RCard
						title="Service Features"
						description="Key features and benefits"
						contentComponent={
							<div className="space-y-4">
								<RFlex className="gap-2">
									<Input
										value={newFeature}
										onChange={(e) => setNewFeature(e.target.value)}
										placeholder="Add a feature"
										onKeyPress={(e) => e.key === "Enter" && addFeature()}
									/>
									<RButton onClick={addFeature} size="sm" icon={<i className={`${myIcons.plus} h-4 w-4`} />} />
								</RFlex>
								<RFlex className="flex-wrap gap-2">
									{serviceData.features.map((feature: string, index: number) => (
										<Badge key={index} variant="secondary" className="flex items-center gap-1">
											{feature}
											<i className={`${myIcons.xmark} h-3 w-3 cursor-pointer`} onClick={() => removeFeature(index)} />
										</Badge>
									))}
								</RFlex>
							</div>
						}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<RCard
						title="Settings"
						contentComponent={
							<div className="space-y-4">
								<RFlex className="items-center justify-between">
									<div className="space-y-0.5">
										<Label>Active Status</Label>
										<p className="text-sm text-muted-foreground">Make service available</p>
									</div>
									<Switch
										checked={serviceData.isActive}
										onCheckedChange={(checked) => setServiceData({ ...serviceData, isActive: checked })}
									/>
								</RFlex>

								<RFlex className="items-center justify-between">
									<div className="space-y-0.5">
										<Label>Featured Service</Label>
										<p className="text-sm text-muted-foreground">Highlight on homepage</p>
									</div>
									<Switch
										checked={serviceData.featured}
										onCheckedChange={(checked) => setServiceData({ ...serviceData, featured: checked })}
									/>
								</RFlex>
							</div>
						}
					/>

					<RFlex className="flex-col gap-3">
						<RButton
							onClick={handleSave}
							className="w-full"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Update Service"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = `/dashboard/services/${serviceData.id}?isEdit=false`}
							className="w-full"
							text="View Service"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = "/dashboard/services"}
							className="w-full bg-transparent"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
