"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/api/services/dashboard/categories/interfaces";
import { categoriesRepository } from "@/api/services/dashboard/categories";
import { useMutateData } from "@/hooks/use-mutate-data";
import { useToast } from "@/hooks/use-toast";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RAlertDialog from "@/RComponents/RAlertDialog";

interface CategoryActionsProps {
	category: Category;
	onEdit: () => void;
	onDelete: () => void;
}

export const CategoryActions = ({ category, onEdit, onDelete }: CategoryActionsProps) => {
	const router = useRouter();
	const { toast } = useToast();

	const { mutate: deleteCategory, isPending } = useMutateData({
		mutationFn: () => categoriesRepository.deleteCategory(category.id),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Category deleted successfully",
			});
			onDelete();
		},
		onErrorFn: () => {
			toast({
				title: "Error",
				description: "Failed to delete category",
				variant: "destructive",
			});
		},
	});

	const handleDelete = () => {
		deleteCategory(undefined);
	};

	return (
		<RFlex className="gap-2">
			<RButton
				variant="outline"
				onClick={onEdit}
				icon="fas fa-edit"
				text="Edit"
			/>
			<RAlertDialog
				component={
					<button
						className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
					>
						<i className="fas fa-trash w-4 h-4 mr-2" />
						Delete
					</button>
				}
				title="Are you sure?"
				description={`This action cannot be undone. This will permanently delete the category "${category.name}".`}
				confirmText={isPending ? "Deleting..." : "Delete"}
				confirmAction={handleDelete}
				loading={isPending}
				confirmClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
			/>
		</RFlex>
	);
};
