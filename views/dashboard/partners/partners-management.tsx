"use client";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import RTooltip from "@/RComponents/RTooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { myIcons } from "@/constants/icons";
import { useState } from "react";

// Mock partners data
const partners = [
	{
		id: 1,
		name: "Microsoft",
		type: "Technology Partner",
		category: "Cloud Services",
		logo: "/logos/microsoft.png",
		website: "https://microsoft.com",
		status: "active",
		featured: true,
		partnershipDate: "2023-01-15",
		description: "Leading cloud infrastructure and productivity solutions provider",
		benefits: ["Azure Credits", "Technical Support", "Co-marketing"],
		location: "Redmond, WA",
		contact: "partner@microsoft.com",
		renewalDate: "2024-12-31",
		revenue: "$2.5M",
		projects: 15,
	},
	{
		id: 2,
		name: "AWS",
		type: "Cloud Partner",
		category: "Infrastructure",
		logo: "/logos/aws.png",
		website: "https://aws.amazon.com",
		status: "active",
		featured: true,
		partnershipDate: "2022-08-20",
		description: "World's most comprehensive cloud platform",
		benefits: ["AWS Credits", "Training", "Certification"],
		location: "Seattle, WA",
		contact: "partners@aws.com",
		renewalDate: "2024-08-20",
		revenue: "$1.8M",
		projects: 12,
	},
	{
		id: 3,
		name: "Google Cloud",
		type: "Technology Partner",
		category: "AI & Analytics",
		logo: "/logos/google-cloud.png",
		website: "https://cloud.google.com",
		status: "active",
		featured: false,
		partnershipDate: "2023-03-10",
		description: "Advanced AI and machine learning capabilities",
		benefits: ["GCP Credits", "AI Tools", "Data Analytics"],
		location: "Mountain View, CA",
		contact: "partnerships@google.com",
		renewalDate: "2025-03-10",
		revenue: "$950K",
		projects: 8,
	},
	{
		id: 4,
		name: "Salesforce",
		type: "CRM Partner",
		category: "Business Solutions",
		logo: "/logos/salesforce.png",
		website: "https://salesforce.com",
		status: "active",
		featured: false,
		partnershipDate: "2022-11-05",
		description: "Customer relationship management platform",
		benefits: ["Salesforce Credits", "Training", "Support"],
		location: "San Francisco, CA",
		contact: "partner@salesforce.com",
		renewalDate: "2024-11-05",
		revenue: "$1.2M",
		projects: 10,
	},
	{
		id: 5,
		name: "Adobe",
		type: "Creative Partner",
		category: "Design & Marketing",
		logo: "/logos/adobe.png",
		website: "https://adobe.com",
		status: "pending",
		featured: false,
		partnershipDate: "2024-01-20",
		description: "Creative and marketing software solutions",
		benefits: ["Adobe Credits", "Creative Tools", "Training"],
		location: "San Jose, CA",
		contact: "partners@adobe.com",
		renewalDate: "2025-01-20",
		revenue: "$0",
		projects: 0,
	},
	{
		id: 6,
		name: "HubSpot",
		type: "Marketing Partner",
		category: "Inbound Marketing",
		logo: "/logos/hubspot.png",
		website: "https://hubspot.com",
		status: "active",
		featured: false,
		partnershipDate: "2023-06-15",
		description: "Inbound marketing and sales platform",
		benefits: ["HubSpot Credits", "Marketing Tools", "Training"],
		location: "Cambridge, MA",
		contact: "partners@hubspot.com",
		renewalDate: "2024-06-15",
		revenue: "$650K",
		projects: 6,
	},
];

export default function PartnersManagement() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="space-y-6">
			{/* Simple Header */}
			<RFlex className="items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Partners</h1>
					<p className="text-muted-foreground">Manage your strategic partnerships</p>
				</div>
				<RButton
					onClick={() => window.location.href = "/dashboard/partners/add"}
					icon={<i className={`${myIcons.plus} h-4 w-4`} />}
					text="Add Partner"
				/>
			</RFlex>

			{/* Simple Search and Stats */}
			<RFlex className="items-center justify-between">
				<RFlex className="items-center gap-4">
					<div className="relative">
						<i className={`${myIcons.search} absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
						<Input
							type="text"
							placeholder="Search partners..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-64 pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
					</div>
					<RFlex className="items-center gap-4 text-sm text-muted-foreground">
						<span>{partners.length} Total</span>
						<span>•</span>
						<span>{partners.filter((p) => p.status === "active").length} Active</span>
						<span>•</span>
						<span>{partners.filter((p) => p.featured).length} Featured</span>
					</RFlex>
				</RFlex>
				<RFlex className="items-center gap-2">
					{["all", "active", "pending", "featured"].map((filter) => (
						<button
							key={filter}
							onClick={() => setSelectedFilter(filter)}
							className={`px-3 py-1 rounded-md text-sm transition-all ${
								selectedFilter === filter
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground hover:bg-muted/80"
							}`}
						>
							{filter.charAt(0).toUpperCase() + filter.slice(1)}
						</button>
					))}
				</RFlex>
			</RFlex>

			{/* Partners List */}
			<div className="space-y-3">
				{partners.map((partner: any) => (
					<RCard
						key={partner.id}
						cardClassName="hover:shadow-md transition-shadow"
						contentComponent={
							<div className="p-4">
								<RFlex className="items-center justify-between">
									{/* Left: Partner Info */}
									<RFlex className="items-center gap-4 flex-1">
										<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
											<i className={`${myIcons.building} h-6 w-6 text-muted-foreground`} />
										</div>
										<div className="flex-1 min-w-0">
											<RFlex className="items-center gap-2 mb-1">
												<h3 className="font-semibold text-lg truncate">{partner.name}</h3>
												{partner.featured && (
													<i className={`${myIcons.star} h-4 w-4 text-yellow-500`} />
												)}
											</RFlex>
											<RFlex className="items-center gap-4 text-sm text-muted-foreground">
												<span>{partner.type}</span>
												<span>•</span>
												<span>{partner.category}</span>
												<span>•</span>
												<RFlex className="items-center gap-1">
													<i className={`${myIcons.dollar} h-3 w-3`} />
													{partner.revenue}
												</RFlex>
											</RFlex>
										</div>
									</RFlex>

									{/* Center: Status & Metrics */}
									<RFlex className="items-center gap-6">
										<div className="text-center">
											<div className="text-sm font-medium">{partner.projects}</div>
											<div className="text-xs text-muted-foreground">Projects</div>
										</div>
										<div className="text-center">
											<div className="text-sm font-medium">{partner.status === "active" ? "Active" : "Pending"}</div>
											<div className="text-xs text-muted-foreground">Status</div>
										</div>
										<div className="text-center">
											<div className="text-sm font-medium">{new Date(partner.partnershipDate).toLocaleDateString()}</div>
											<div className="text-xs text-muted-foreground">Since</div>
										</div>
									</RFlex>

									{/* Right: Actions */}
									<RFlex className="items-center gap-2">
										<RTooltip
											triggerComponent={
												<RButton
													variant="ghost"
													size="sm"
													icon={<i className={`${myIcons.eye} h-4 w-4`} />}
													onClick={() => window.location.href = `/dashboard/partners/${partner.id}?isEdit=false`}
												/>
											}
											tooltipText="View Partner"
										/>
										<RTooltip
											triggerComponent={
												<RButton
													variant="ghost"
													size="sm"
													icon={<i className={`${myIcons.edit} h-4 w-4`} />}
													onClick={() => window.location.href = `/dashboard/partners/${partner.id}?isEdit=true`}
												/>
											}
											tooltipText="Edit Partner"
										/>
										<RTooltip
											triggerComponent={
												<RButton
													variant="ghost"
													size="sm"
													icon={<i className={`${myIcons.ellipsis} h-4 w-4`} />}
												/>
											}
											tooltipText="More Options"
										/>
									</RFlex>
								</RFlex>
							</div>
						}
					/>
				))}
			</div>

			{/* Simple Summary */}
			<div className="mt-8 pt-6 border-t">
				<RFlex className="items-center justify-between text-sm text-muted-foreground">
					<RFlex className="items-center gap-6">
						<span>Total Revenue: <span className="font-medium text-foreground">${partners.reduce((sum, p) => sum + parseFloat(p.revenue.replace('$', '').replace('M', '')), 0).toFixed(1)}M</span></span>
						<span>Total Projects: <span className="font-medium text-foreground">{partners.reduce((sum, p) => sum + p.projects, 0)}</span></span>
					</RFlex>
					<RFlex className="items-center gap-2">
						<RButton
							variant="outline"
							size="sm"
							icon={<i className={`${myIcons.globe} h-4 w-4`} />}
							text="View Certifications"
						/>
					</RFlex>
				</RFlex>
			</div>
		</div>
	);
}
