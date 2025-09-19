"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { myIcons } from "@/constants/icons";
import { ServiceForm } from "./service-form";
import { ServicePreview } from "./service-preview";

export default function AddService() {
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

	const handleSave = () => {
		console.log("Saving service:", serviceData);
		// Save logic would go here
	};

	return (
		<div className="space-y-6">
			<RFlex className="items-center gap-4">
				<RButton
					variant="ghost"
					size="sm"
					onClick={() => (window.location.href = "/dashboard/services")}
					icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
					text="Back to Services"
				/>
				<div>
					<h1 className="text-2xl font-bold">Add New Service</h1>
					<p className="text-muted-foreground">Create a new service offering</p>
				</div>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Form */}
				<div className="lg:col-span-2">
					<ServiceForm serviceData={serviceData} setServiceData={setServiceData} />
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<ServicePreview serviceData={serviceData} />

					<RFlex className="flex-col gap-3">
						<RButton onClick={handleSave} className="w-full" icon={<i className={`${myIcons.save} h-4 w-4`} />} text="Save Service" />
						<RButton
							variant="outline"
							onClick={() => (window.location.href = "/dashboard/services")}
							className="w-full bg-transparent"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
