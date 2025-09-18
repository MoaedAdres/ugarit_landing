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

interface ServiceFormProps {
	serviceData: any;
	setServiceData: (data: any) => void;
}

export function ServiceForm({ serviceData, setServiceData }: ServiceFormProps) {
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

	const addRequirement = () => {
		if (newRequirement.trim()) {
			setServiceData({
				...serviceData,
				requirements: [...serviceData.requirements, newRequirement.trim()],
			});
			setNewRequirement("");
		}
	};

	const removeRequirement = (index: number) => {
		setServiceData({
			...serviceData,
			requirements: serviceData.requirements.filter((_: any, i: number) => i !== index),
		});
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

	const removeDeliverable = (index: number) => {
		setServiceData({
			...serviceData,
			deliverables: serviceData.deliverables.filter((_: any, i: number) => i !== index),
		});
	};

	return (
		<div className="space-y-6">
			{/* Basic Information */}
			<RCard
				title="Basic Information"
				description="Core service details"
				contentComponent={
					<div className="space-y-4">
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
								<RSelect
									value={serviceData.category}
									handleChange={(value) => setServiceData({ ...serviceData, category: value })}
									options={categoryOptions}
									placeholder="Select category"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Short Description</Label>
							<Textarea
								id="description"
								value={serviceData.description}
								onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
								placeholder="Brief description for service cards"
								rows={2}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="fullDescription">Full Description</Label>
							<Textarea
								id="fullDescription"
								value={serviceData.fullDescription}
								onChange={(e) => setServiceData({ ...serviceData, fullDescription: e.target.value })}
								placeholder="Detailed service description"
								rows={4}
							/>
						</div>
					</div>
				}
			/>

			{/* Pricing & Timeline */}
			<RCard
				title="Pricing & Timeline"
				description="Service pricing and duration"
				contentComponent={
					<div className="space-y-4">
						<div className="grid grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="priceMin">Min Price ($)</Label>
								<Input
									id="priceMin"
									type="number"
									value={serviceData.priceMin}
									onChange={(e) => setServiceData({ ...serviceData, priceMin: e.target.value })}
									placeholder="1000"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="priceMax">Max Price ($)</Label>
								<Input
									id="priceMax"
									type="number"
									value={serviceData.priceMax}
									onChange={(e) => setServiceData({ ...serviceData, priceMax: e.target.value })}
									placeholder="5000"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="duration">Duration</Label>
								<Input
									id="duration"
									value={serviceData.duration}
									onChange={(e) => setServiceData({ ...serviceData, duration: e.target.value })}
									placeholder="4-8 weeks"
								/>
							</div>
						</div>
					</div>
				}
			/>

			{/* Service Features */}
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

			{/* Requirements & Deliverables */}
			<RCard
				title="Requirements & Deliverables"
				description="What's needed and what's delivered"
				contentComponent={
					<div className="space-y-6">
						{/* Requirements */}
						<div className="space-y-2">
							<Label>Requirements</Label>
							<RFlex className="gap-2">
								<Input
									value={newRequirement}
									onChange={(e) => setNewRequirement(e.target.value)}
									placeholder="Add a requirement"
									onKeyPress={(e) => e.key === "Enter" && addRequirement()}
								/>
								<RButton onClick={addRequirement} size="sm" icon={<i className={`${myIcons.plus} h-4 w-4`} />} />
							</RFlex>
							<div className="space-y-1">
								{serviceData.requirements.map((req: string, index: number) => (
									<RFlex key={index} className="items-center justify-between p-2 bg-muted rounded">
										<span className="text-sm">{req}</span>
										<i className={`${myIcons.xmark} h-4 w-4 cursor-pointer`} onClick={() => removeRequirement(index)} />
									</RFlex>
								))}
							</div>
						</div>

						{/* Deliverables */}
						<div className="space-y-2">
							<Label>Deliverables</Label>
							<RFlex className="gap-2">
								<Input
									value={newDeliverable}
									onChange={(e) => setNewDeliverable(e.target.value)}
									placeholder="Add a deliverable"
									onKeyPress={(e) => e.key === "Enter" && addDeliverable()}
								/>
								<RButton onClick={addDeliverable} size="sm" icon={<i className={`${myIcons.plus} h-4 w-4`} />} />
							</RFlex>
							<div className="space-y-1">
								{serviceData.deliverables.map((deliverable: string, index: number) => (
									<RFlex key={index} className="items-center justify-between p-2 bg-muted rounded">
										<span className="text-sm">{deliverable}</span>
										<i className={`${myIcons.xmark} h-4 w-4 cursor-pointer`} onClick={() => removeDeliverable(index)} />
									</RFlex>
								))}
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
}
