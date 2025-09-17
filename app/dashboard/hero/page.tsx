"use client";

import { useState } from "react";
import {
	HeroHeader,
	HeroContentTab,
	HeroButtonsTab,
	HeroDesignTab,
	HeroAnalyticsTab,
	HeroSectionInfo,
	HeroLivePreview,
	HeroQuickActions,
} from "@/views/dashboard/hero";
import RFlex from "@/RComponents/RFlex";
import RTabs from "@/RComponents/RTabs";
const tabs = [
	{
		value: "content",
		title: "Content",
	},
	{
		value: "buttons",
		title: "Buttons",
	},
	{
		value: "design",
		title: "Design",
	},
	{
		value: "analytics",
		title: "Analytics",
	},
];
export default function HeroPage() {
	const [mode, setMode] = useState<"view" | "edit">("view");
	const [hasChanges, setHasChanges] = useState(false);
	const [activeTab, setActiveTab] = useState("content");
	const [heroData, setHeroData] = useState({
		id: "hero-001",
		title: "Transform Your Business with Our Solutions",
		subtitle: "Innovative technology solutions that drive growth and efficiency",
		description:
			"We help businesses leverage cutting-edge technology to streamline operations, enhance customer experiences, and achieve sustainable growth in today's digital landscape.",
		primaryButtonText: "Get Started",
		primaryButtonLink: "/contact",
		secondaryButtonText: "Learn More",
		secondaryButtonLink: "/services",
		backgroundImage: "/hero-bg.jpg",
		overlayOpacity: 0.6,
		textAlignment: "left",
		isActive: true,
		lastUpdated: "2 hours ago",
		createdAt: "1 week ago",
		views: 1250,
		clicks: 89,
	});

	const handleInputChange = (field: string, value: string | boolean) => {
		setHeroData((prev) => ({ ...prev, [field]: value }));
		setHasChanges(true);
	};

	const handleSave = () => {
		console.log("Saving hero data:", heroData);
		setHasChanges(false);
		// You could show a success toast here
	};

	const handleCancel = () => {
		setMode("view");
		setHasChanges(false);
		// Reset to original data if needed
	};

	const handleDelete = () => {
		console.log("Deleting hero section:", heroData.id);
		// You could show a confirmation dialog first
	};

	const handleDuplicate = () => {
		console.log("Duplicating hero section:", heroData.id);
		// You could show a success toast and redirect to edit mode
	};

	return (
		<RFlex className="flex-col space-y-6">
			<HeroHeader
				mode={mode}
				hasChanges={hasChanges}
				onDuplicate={handleDuplicate}
				onEdit={() => setMode("edit")}
				onDelete={handleDelete}
				onCancel={handleCancel}
				onSave={handleSave}
			/>

			<RFlex className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<RFlex className="lg:col-span-2 flex-col">
					<RTabs
						defaultValue={tabs[0].value}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						className="space-y-4"
						listClassName="grid w-full grid-cols-4"
						innerContent={true}
						contentClassName="space-y-4"
						tabs={tabs}
					/>
					{activeTab === "content" && <HeroContentTab heroData={heroData} mode={mode} onInputChange={handleInputChange} />}
					{activeTab === "buttons" && <HeroButtonsTab heroData={heroData} mode={mode} onInputChange={handleInputChange} />}
					{activeTab === "design" && <HeroDesignTab heroData={heroData} mode={mode} onInputChange={handleInputChange} />}
					{activeTab === "analytics" && <HeroAnalyticsTab heroData={heroData} />}
				</RFlex>

				{/* Sidebar */}
				<RFlex className="lg:col-span-1 flex-col space-y-6">
					<HeroSectionInfo heroData={heroData} />
					<HeroLivePreview heroData={heroData} />
					<HeroQuickActions />
				</RFlex>
			</RFlex>
		</RFlex>
	);
}
