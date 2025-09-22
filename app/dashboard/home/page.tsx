"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HomeHeader, SectionsGrid, SectionOrderList, type SectionData } from "@/views/dashboard/home";
import { Section } from "@/api/services/dashboard/home/interfaces";
import RFlex from "@/RComponents/RFlex";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutateData } from "@/hooks/use-mutate-data";
import { homeRepository } from "@/api/services/dashboard/home";
import RButton from "@/RComponents/RButton";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
	const router = useRouter();
	const [sections, setSections] = useState<SectionData[]>([]);
	const { toast } = useToast();

	const { data, isLoading, error } = useFetchData({
		queryKey: ["sections"],
		queryFn: () => homeRepository.getsections(),
	});

	const { mutate: toggleSectionVisibility, isPending: isToggling } = useMutateData({
		mutationFn: ({ sectionId, isHidden }: { sectionId: number; isHidden: boolean }) =>
			homeRepository.toggleSectionVisibility(sectionId, isHidden),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Section visibility updated successfully",
			});
		},
		onErrorFn: (error) => {
			toast({
				title: "Error",
				description: "Failed to update section visibility",
				variant: "destructive",
			});
		},
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
		const section = sections.find((s) => s.id === sectionId);
		if (!section) return;

		const newIsActive = !section.isActive;
		const isHidden = !newIsActive; // isActive = true means is_hidden = false

		// Optimistically update the UI
		setSections((items) => items.map((item) => (item.id === sectionId ? { ...item, isActive: newIsActive } : item)));

		// Call the API
		toggleSectionVisibility({ sectionId: parseInt(sectionId), isHidden });
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
			<SectionsGrid sections={sections} onSectionsChange={setSections} onToggleSection={handleToggleSection} isToggling={isToggling} />
			<SectionOrderList sections={sections} />
		</RFlex>
	);
}
