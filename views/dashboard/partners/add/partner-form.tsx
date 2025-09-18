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

interface PartnerFormProps {
	partnerData: any;
	setPartnerData: (data: any) => void;
}

export function PartnerForm({ partnerData, setPartnerData }: PartnerFormProps) {
	const partnerTypes = ["Technology Partner", "Cloud Partner", "CRM Partner", "Creative Partner", "Marketing Partner", "Consulting Partner"];
	const categories = ["Cloud Services", "Infrastructure", "AI & Analytics", "Business Solutions", "Design & Marketing", "Inbound Marketing", "Security", "Data Analytics"];

	return (
		<div className="space-y-8">
			{/* Basic Information Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-primary rounded-full"></div>
						Basic Information
					</RFlex>
				}
				cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
				contentComponent={
					<div className="space-y-6">
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
								<RSelect
									value={partnerData.type}
									handleChange={(value: string) => setPartnerData({ ...partnerData, type: value })}
									placeholder="Select type"
									options={partnerTypes.map(type => ({ value: type, label: type }))}
									triggerClassName="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="category" className="text-sm font-medium">Category</Label>
								<RSelect
									value={partnerData.category}
									handleChange={(value: string) => setPartnerData({ ...partnerData, category: value })}
									placeholder="Select category"
									options={categories.map(category => ({ value: category, label: category }))}
									triggerClassName="h-11"
								/>
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
					</div>
				}
			/>

			{/* Contact Information Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
						Contact Information
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
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
					</div>
				}
			/>

			{/* Partnership Details Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Partnership Details
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
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
					</div>
				}
			/>

			{/* Partnership Settings Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
						Partnership Settings
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
					</div>
				}
			/>
		</div>
	);
}
