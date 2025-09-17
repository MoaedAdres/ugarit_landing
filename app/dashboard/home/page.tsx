"use client";

import { useState } from "react";
import {
	HomeHeader,
	SectionsGrid,
	SectionOrderList,
	type SectionData,
	defaultSections,
} from "@/views/dashboard/home";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";


export default function HomePage() {
	const [sections, setSections] = useState<SectionData[]>(defaultSections);

	const handleToggleSection = (sectionId: string) => {
		setSections((items) => items.map((item) => (item.id === sectionId ? { ...item, isActive: !item.isActive } : item)));
		// In real implementation, this would update the section status via API
		console.log(`Toggling section: ${sectionId}`);
	};

	const handleSaveOrder = () => {
		// In real implementation, this would save the new order to your API
		console.log(
			"New section order:",
			sections.map((s) => ({ id: s.id, title: s.title }))
		);
		// You could show a toast notification here
	};

	return (
		<RFlex className="flex-col space-y-6">
			<HomeHeader onSaveOrder={handleSaveOrder} />
			<SectionsGrid sections={sections} onSectionsChange={setSections} onToggleSection={handleToggleSection} />
			<SectionOrderList sections={sections} />
		</RFlex>
	);
}
