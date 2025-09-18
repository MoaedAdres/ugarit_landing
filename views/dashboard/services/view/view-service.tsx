"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import { ServiceDetails } from "./service-details";
import { ServiceActions } from "./service-actions";

// Icon mapping for services
const iconMap = {
	Cloud: "fa-solid fa-cloud",
	Settings: "fa-solid fa-gear",
	Shield: "fa-solid fa-shield-halved",
	Code: "fa-solid fa-code",
	Database: "fa-solid fa-database",
	Smartphone: "fa-solid fa-mobile-screen",
};

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

export default function ViewService() {
	const [serviceData] = useState(mockService);
	const iconClass = iconMap[serviceData.icon as keyof typeof iconMap] || "fa-solid fa-gear";

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => window.location.href = "/dashboard/services"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Services"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
								<i className={`${iconClass} h-7 w-7 text-primary`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{serviceData.title}</h1>
								<RFlex className="items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{serviceData.category}</Badge>
									<Badge variant={serviceData.isActive ? "default" : "secondary"} className="font-medium">
										{serviceData.isActive ? "Active" : "Inactive"}
									</Badge>
									{serviceData.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											⭐ Featured
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
					onClick={() => window.location.href = `/dashboard/services/${serviceData.id}?isEdit=true`}
					icon={<i className={`${myIcons.edit} h-4 w-4`} />}
					text="Edit Service"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<ServiceDetails serviceData={serviceData} />
				</div>

				{/* Sidebar */}
				<div>
					<ServiceActions serviceData={serviceData} />
				</div>
			</div>
		</div>
	);
}
