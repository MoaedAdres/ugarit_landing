"use client";

import { SectionFormData } from "@/api/services/dashboard/home/interfaces";
import RCard from "@/RComponents/RCard";
import RTabs from "@/RComponents/RTabs";
import RFlex from "@/RComponents/RFlex";
import { useState } from "react";

interface SectionPreviewProps {
	data: SectionFormData;
}

export const SectionPreview = ({ data }: SectionPreviewProps) => {
	const [activeTab, setActiveTab] = useState("en");
	const tabs = [
		{
			value: "en",
			title: "English",
		},
		{
			value: "ar",
			title: "Arabic",
		},
		{
			value: "fr",
			title: "French",
		},
	];

	const renderTabContent = (locale: string) => {
		const localeData = data[locale as keyof Pick<SectionFormData, "en" | "ar" | "fr">];
		const isArabic = locale === "ar";

		return (
			<RCard
				title={localeData.title || (isArabic ? "لم يتم تعيين عنوان" : locale === "fr" ? "Aucun titre défini" : "No title set")}
				contentComponent={
					<p className="text-muted-foreground whitespace-pre-wrap" dir={isArabic ? "rtl" : undefined}>
						{localeData.description ||
							(isArabic ? "لم يتم تعيين وصف" : locale === "fr" ? "Aucune description définie" : "No description set")}
					</p>
				}
				dir={isArabic ? "rtl" : "ltr"}
			/>
		);
	};

	return (
		<RFlex className="flex-col space-y-4">
			{/* Status and Order Badges */}
			<RFlex className="items-center gap-2">
				{data.is_hidden ? (
					<span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md">
						<i className="fas fa-eye-slash h-3 w-3"></i>
						Hidden
					</span>
				) : (
					<span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md">
						<i className="fas fa-eye h-3 w-3"></i>
						Visible
					</span>
				)}
				<span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-outline text-foreground border rounded-md">
					<i className="fas fa-hashtag h-3 w-3"></i>
					Order: {data.order}
				</span>
			</RFlex>

			{/* Language Preview Tabs */}
			<RTabs
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				innerContent={true}
				fullWidth={true}
				listClassName="grid w-full grid-cols-3"
			/>
			<RFlex className="flex-col space-y-4">
				{activeTab === "en" && renderTabContent("en")}
				{activeTab === "ar" && renderTabContent("ar")}
				{activeTab === "fr" && renderTabContent("fr")}
			</RFlex>
		</RFlex>
	);
};
