"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HomeHeader, SectionsGrid, SectionOrderList, type SectionData, defaultSections } from "@/views/dashboard/home";
import { Section } from "@/api/services/dashboard/home/interfaces";
import RFlex from "@/RComponents/RFlex";
import { useFetchData } from "@/hooks/use-fetch-data";
import { homeRepository } from "@/api/services/dashboard/home";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RButton from "@/RComponents/RButton";

export default function HomePage() {
	const router = useRouter();
	const [sections, setSections] = useState<SectionData[]>(defaultSections);

	const { data, isLoading, error } = useFetchData({
		queryKey: ["sections"],
		queryFn: () => homeRepository.getsections(),
	});

	// Convert API data to local format
	useEffect(() => {
		if (data?.data) {
			const apiSections: SectionData[] = data.data.map((section: Section) => ({
				id: section.id.toString(),
				title: section.title,
				description: section.description,
				icon: "fas fa-file-alt", // Default icon
				href: `/dashboard/home/${section.id}`,
				isActive: section.is_hidden === 0,
				lastUpdated: new Date(section.updated_at).toLocaleDateString(),
			}));
			setSections(apiSections);
		}
	}, [data]);

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

	const handleAddSection = () => {
		router.push("/dashboard/home/add");
	};

	return (
		<RFlex className="flex-col space-y-6">
			<div className="flex items-center justify-between">
				<HomeHeader />
				<RFlex className="gap-2">
					<RButton variant="outline" onClick={handleSaveOrder} icon="fas fa-save" text="Save Order" />
					<RButton onClick={handleAddSection} icon="fas fa-plus" text="Add Section" />
				</RFlex>
			</div>
			<SectionsGrid sections={sections} onSectionsChange={setSections} onToggleSection={handleToggleSection} />
			<SectionOrderList sections={sections} />
		</RFlex>
	);
}
