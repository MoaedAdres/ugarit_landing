"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoriesHeader, CategoriesGrid, type CategoryData } from "@/views/dashboard/categories";
import { Category } from "@/api/services/dashboard/categories/interfaces";
import RFlex from "@/RComponents/RFlex";
import { useFetchData } from "@/hooks/use-fetch-data";
import { categoriesRepository } from "@/api/services/dashboard/categories";
import RButton from "@/RComponents/RButton";
import { getIconUrl } from "@/utils/helperFunctions";

export default function CategoriesPage() {
	const router = useRouter();
	const [categories, setCategories] = useState<CategoryData[]>([]);

	const { data, isLoading, error } = useFetchData({
		queryKey: ["categories"],
		queryFn: () => categoriesRepository.getCategories(),
	});
    console.log("data", data);
	// Convert API data to local format
	useEffect(() => {
		if (data?.data) {
			const apiCategories: CategoryData[] = data.data.map((category: Category) => ({
				id: category.id.toString(),
				name: category.name,
				summary: category.summary,
				slug: category.slug,
				icon: category.media && category.media.length > 0 ? getIconUrl(category.media[0].original_url) : "fas fa-folder", // Use uploaded icon or default
				href: `/dashboard/categories/${category.id}`,
				lastUpdated: new Date(category.updated_at).toLocaleDateString(),
				translations: category.translations,
				media: category.media,
			}));
			setCategories(apiCategories);
		}
	}, [data]);

	const handleAddCategory = () => {
		router.push("/dashboard/categories/add");
	};

	return (
		<RFlex className="flex-col space-y-6">
			<div className="flex items-center justify-between">
				<CategoriesHeader />
				<RFlex className="gap-2">
					<RButton onClick={handleAddCategory} icon="fas fa-plus" text="Add Category" />
				</RFlex>
			</div>
			<CategoriesGrid categories={categories} onCategoriesChange={setCategories} />
		</RFlex>
	);
}
