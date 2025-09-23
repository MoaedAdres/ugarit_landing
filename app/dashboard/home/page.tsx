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
		onSuccessFn: (data) => {
			const apiSections: SectionData[] = data.data.map((section: Section) => ({
				id: section.id.toString(),
				title: section.title,
				description: section.description,
				icon: "fas fa-file-alt", // Default icon
				href: `/dashboard/home/${section.id}`,
				isActive: section.is_hidden === 0,
				lastUpdated: new Date(section.updated_at).toLocaleDateString(),
				order: section.order,
			}));
			setSections(apiSections.sort((a, b) => a.order - b.order));
		},
	});

	const { mutate: toggleSectionVisibility, isPending: isToggling } = useMutateData({
		mutationFn: ({ sectionId, isHidden }: { sectionId: number; isHidden: boolean }) =>
			homeRepository.toggleSectionVisibility(sectionId, { is_hidden: isHidden }),
		invalidateKeys: [{ queryKey: ["sections"] }],
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

	const { mutate: reorderSections, isPending: isReordering } = useMutateData({
		mutationFn: (orderedIds: number[]) => homeRepository.reorderSections(orderedIds),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Section order saved successfully",
			});
		},
		onErrorFn: (error) => {
			toast({
				title: "Error",
				description: "Failed to save section order",
				variant: "destructive",
			});
		},
	});

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
		const orderedIds = sections.map((section) => parseInt(section.id));
		reorderSections(orderedIds);
	};

	const handleAddSection = () => {
		router.push("/dashboard/home/add");
	};

	return (
		<RFlex className="flex-col space-y-6">
			<div className="flex items-center justify-between">
				<HomeHeader />
				<RFlex className="gap-2">
					<RButton
						variant="outline"
						onClick={handleSaveOrder}
						icon={isReordering ? "fas fa-spinner fa-spin" : "fas fa-save"}
						text="Save Order"
						disabled={isReordering}
					/>
					<RButton onClick={handleAddSection} icon="fas fa-plus" text="Add Section" />
				</RFlex>
			</div>
			<SectionsGrid sections={sections} onSectionsChange={setSections} onToggleSection={handleToggleSection} isToggling={isToggling} />
			<SectionOrderList sections={sections} />
		</RFlex>
	);
}
