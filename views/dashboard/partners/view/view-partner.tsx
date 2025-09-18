"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import { PartnerDetails } from "./partner-details";
import { PartnerActions } from "./partner-actions";

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

interface ViewPartnerProps {
	partner: any;
}

export default function ViewPartner({ partner }: ViewPartnerProps) {
	const [partnerData] = useState(partner);

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
								<i className={`${myIcons.building} h-7 w-7 text-violet-600`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{partnerData.name}</h1>
								<RFlex className="items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{partnerData.type}</Badge>
									<Badge variant={partnerData.status === "active" ? "default" : "secondary"} className="font-medium">
										{partnerData.status === "active" ? "Active" : "Pending"}
									</Badge>
									{partnerData.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											<i className={`${myIcons.star} h-3 w-3 mr-1`} />
											Featured
										</Badge>
									)}
								</RFlex>
							</div>
						</RFlex>
					</div>
				</RFlex>
				<RButton
					size="lg"
					className="shadow-lg"
					onClick={() => window.location.href = `/dashboard/partners/${partnerData.id}?isEdit=true`}
					icon={<i className={`${myIcons.edit} h-4 w-4`} />}
					text="Edit Partner"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<PartnerDetails partnerData={partnerData} />
				</div>

				{/* Sidebar */}
				<div>
					<PartnerActions partnerData={partnerData} />
				</div>
			</div>
		</div>
	);
}
