"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
	Plus, 
	Edit, 
	Trash2, 
	Eye, 
	Search, 
	Filter, 
	Building2, 
	Award, 
	Handshake, 
	Shield, 
	Star, 
	ArrowRight, 
	Globe, 
	Users, 
	TrendingUp, 
	BarChart3,
	ExternalLink,
	Calendar,
	MapPin,
	MoreHorizontal,
	CheckCircle,
	Clock,
	DollarSign
} from "lucide-react";
import Link from "next/link";
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

export default function PartnersPage() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="space-y-6">
			{/* Simple Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Partners</h1>
					<p className="text-muted-foreground">Manage your strategic partnerships</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/partners/add">
						<Plus className="h-4 w-4 mr-2" />
						Add Partner
					</Link>
				</Button>
			</div>

			{/* Simple Search and Stats */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search partners..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-64 pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
					</div>
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<span>{partners.length} Total</span>
						<span>•</span>
						<span>{partners.filter((p) => p.status === "active").length} Active</span>
						<span>•</span>
						<span>{partners.filter((p) => p.featured).length} Featured</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
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
				</div>
			</div>

			{/* Partners List */}
			<div className="space-y-3">
				{partners.map((partner: any) => (
					<Card key={partner.id} className="hover:shadow-md transition-shadow">
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								{/* Left: Partner Info */}
								<div className="flex items-center gap-4 flex-1">
									<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
										<Building2 className="h-6 w-6 text-muted-foreground" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-semibold text-lg truncate">{partner.name}</h3>
											{partner.featured && (
												<Star className="h-4 w-4 text-yellow-500 fill-current" />
											)}
										</div>
										<div className="flex items-center gap-4 text-sm text-muted-foreground">
											<span>{partner.type}</span>
											<span>•</span>
											<span>{partner.category}</span>
											<span>•</span>
											<span className="flex items-center gap-1">
												<DollarSign className="h-3 w-3" />
												{partner.revenue}
											</span>
										</div>
									</div>
								</div>

								{/* Center: Status & Metrics */}
								<div className="flex items-center gap-6">
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
								</div>

								{/* Right: Actions */}
								<div className="flex items-center gap-2">
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/partners/${partner.id}?isEdit=false`}>
											<Eye className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/partners/${partner.id}?isEdit=true`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Simple Summary */}
			<div className="mt-8 pt-6 border-t">
				<div className="flex items-center justify-between text-sm text-muted-foreground">
					<div className="flex items-center gap-6">
						<span>Total Revenue: <span className="font-medium text-foreground">${partners.reduce((sum, p) => sum + parseFloat(p.revenue.replace('$', '').replace('M', '')), 0).toFixed(1)}M</span></span>
						<span>Total Projects: <span className="font-medium text-foreground">{partners.reduce((sum, p) => sum + p.projects, 0)}</span></span>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							<Globe className="h-4 w-4 mr-2" />
							View Certifications
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
