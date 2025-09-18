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

interface EditPartnerProps {
	partner: any;
	setPartner: (partner: any) => void;
}

export default function EditPartner({ partner, setPartner }: EditPartnerProps) {
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
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => window.location.href = "/dashboard/partners"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Partners"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-2xl border border-violet-500/20">
								<i className={`${myIcons.handshake} h-7 w-7 text-violet-600`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">Edit Partner</h1>
								<p className="text-muted-foreground">Update partnership information and settings</p>
							</div>
						</RFlex>
					</div>
				</RFlex>
				<RButton
					variant="outline"
					size="lg"
					onClick={() => window.location.href = `/dashboard/partners/${partner.id}?isEdit=false`}
					icon={<i className={`${myIcons.eye} h-4 w-4`} />}
					text="View Partner"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
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
										<RSelect
											value={partner.type}
											handleChange={(value: string) => setPartner({ ...partner, type: value })}
											placeholder="Select type"
											options={partnerTypes.map(type => ({ value: type, label: type }))}
											triggerClassName="h-11"
										/>
									</div>
									<div className="space-y-3">
										<Label htmlFor="category" className="text-sm font-medium">Category</Label>
										<RSelect
											value={partner.category}
											handleChange={(value: string) => setPartner({ ...partner, category: value })}
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
										value={partner.description}
										onChange={(e) => setPartner({ ...partner, description: e.target.value })}
										placeholder="Describe the partnership..."
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
											onChange={(e) => setPartner({ ...partner, projects: parseInt(e.target.value) || 0 })}
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
											onChange={(e) => setPartner({ ...partner, teamSize: parseInt(e.target.value) || 0 })}
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

								<div className="space-y-3">
									<Label htmlFor="contractValue" className="text-sm font-medium">Contract Value</Label>
									<Input
										id="contractValue"
										value={partner.contractValue}
										onChange={(e) => setPartner({ ...partner, contractValue: e.target.value })}
										placeholder="$5.2M"
										className="h-11"
									/>
								</div>
							</div>
						}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<RCard
						title="Settings"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
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
							</div>
						}
					/>

					<RCard
						title="Partner Logo"
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-4">
								<RFlex className="flex-col items-center gap-4">
									<div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
										<i className={`${myIcons.building} h-8 w-8 text-muted-foreground`} />
									</div>
									<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
										<i className={`${myIcons.upload} h-4 w-4`} />
										Upload Logo
									</button>
								</RFlex>
							</div>
						}
					/>

					<RCard
						title={
							<RFlex className="items-center gap-2">
								<i className={`${myIcons.eye} h-5 w-5`} />
								Preview
							</RFlex>
						}
						contentComponent={
							<div className="border rounded-lg p-4 space-y-3">
								<RFlex className="items-center gap-3">
									<div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
										<i className={`${myIcons.building} h-5 w-5 text-muted-foreground`} />
									</div>
									<div>
										<h4 className="font-medium text-sm">{partner.name || "Partner Name"}</h4>
										<p className="text-xs text-muted-foreground">
											{partner.type || "Partner Type"}
										</p>
									</div>
								</RFlex>
								<p className="text-sm text-muted-foreground line-clamp-2">
									{partner.description || "Partner description will appear here..."}
								</p>
								<RFlex className="items-center justify-between">
									<span className="text-xs text-muted-foreground">{partner.category || "Category"}</span>
									<span className="text-xs font-medium text-violet-600">{partner.revenue || "$0"}</span>
								</RFlex>
							</div>
						}
					/>

					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("active")}
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Update Partner"
						/>
						<RButton
							onClick={() => handleSave("pending")}
							variant="outline"
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Save as Draft"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = `/dashboard/partners/${partner.id}?isEdit=false`}
							className="w-full"
							text="View Partner"
						/>
						<RButton
							variant="ghost"
							onClick={() => window.location.href = "/dashboard/partners"}
							className="w-full"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
