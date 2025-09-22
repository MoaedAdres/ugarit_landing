"use client";

import CategoryCard from "./CategoryCard";
import { CategoryData } from "./types";
import { categoriesRepository } from "@/api/services/dashboard/categories";
import { useMutateData } from "@/hooks/use-mutate-data";
import { useToast } from "@/hooks/use-toast";

interface CategoriesGridProps {
	categories: CategoryData[];
	onCategoriesChange: (categories: CategoryData[] | ((prev: CategoryData[]) => CategoryData[])) => void;
}

export default function CategoriesGrid({ categories, onCategoriesChange }: CategoriesGridProps) {
	const { toast } = useToast();

	const { mutate: deleteCategory } = useMutateData({
		mutationFn: (categoryId: number) => categoriesRepository.deleteCategory(categoryId),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Category deleted successfully",
			});
		},
		onErrorFn: () => {
			toast({
				title: "Error",
				description: "Failed to delete category",
				variant: "destructive",
			});
		},
	});

	const handleDeleteCategory = (categoryId: string) => {
		deleteCategory(parseInt(categoryId));
		// Remove from local state immediately for better UX
		onCategoriesChange((prev) => prev.filter((cat) => cat.id !== categoryId));
	};

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{categories.map((category) => (
				<CategoryCard key={category.id} {...category} onDelete={handleDeleteCategory} />
			))}
		</div>
	);
}
