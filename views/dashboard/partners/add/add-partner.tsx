"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { myIcons } from "@/constants/icons";
import { PartnerForm } from "./partner-form";
import { PartnerPreview } from "./partner-preview";

export default function AddPartner() {
	const [partnerData, setPartnerData] = useState({
		name: "",
		type: "",
		category: "",
		website: "",
		description: "",
		contact: "",
		phone: "",
		location: "",
		revenue: "",
		projects: 0,
		teamSize: 0,
		contractValue: "",
		partnershipDate: "",
		renewalDate: "",
		status: "pending",
		featured: false,
		allowPublicDisplay: true,
		contactForFollowup: false,
	});

	const handleSave = (status = "pending") => {
		const dataToSave = { ...partnerData, status };
		console.log("Saving partner:", dataToSave);
		// Save logic would go here
	};

	return (
		<div className="space-y-6">
			<RFlex className="items-center gap-4">
				<RButton
					variant="ghost"
					size="sm"
					onClick={() => window.location.href = "/dashboard/partners"}
					icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
					text="Back to Partners"
				/>
				<div>
					<h1 className="text-2xl font-bold">Add New Partner</h1>
					<p className="text-muted-foreground">Create and manage strategic partnerships</p>
				</div>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<PartnerForm partnerData={partnerData} setPartnerData={setPartnerData} />
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<PartnerPreview partnerData={partnerData} />
					
					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("active")}
							className="w-full"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Create Partner"
						/>
						<RButton
							onClick={() => handleSave("pending")}
							variant="outline"
							className="w-full"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Save as Draft"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = "/dashboard/partners"}
							className="w-full bg-transparent"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
