"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/use-fetch-data";
import { categoriesRepository } from "@/api/services/dashboard/categories";
import { Category, CategoryFormData } from "@/api/services/dashboard/categories/interfaces";
import { CategoryActions } from "./category-actions";
import { EditCategoryForm } from "./edit-category-form";
import { Badge } from "@/components/ui/badge";
import RCard from "@/RComponents/RCard";
import RTabs from "@/RComponents/RTabs";
import { ArrowLeft, Calendar, Globe, Hash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";

interface CategoryDetailsProps {
	categoryId: number;
}

export const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isEdit = searchParams.get("isEdit") === "true";
	const [isEditing, setIsEditing] = useState(isEdit);

	const { data, isLoading, error } = useFetchData({
		queryKey: ["category", categoryId],
		queryFn: () => categoriesRepository.getCategory(categoryId),
	});

	const category: Category | undefined = data?.data;

	if (isLoading) {
		return (
			<RFlex className="flex-col space-y-6">
				<Skeleton className="h-8 w-64" />
				<RCard
					title={<Skeleton className="h-6 w-32" />}
					contentComponent={<Skeleton className="h-32 w-full" />}
				/>
			</RFlex>
		);
	}

	if (error || !category) {
		return (
			<RFlex className="flex-col space-y-6">
				<RButton
					variant="ghost"
					onClick={() => router.back()}
					icon="fas fa-arrow-left"
					text="Back"
				/>
				<RCard
					contentComponent={
						<p className="text-destructive">Category not found or error loading category.</p>
					}
				/>
			</RFlex>
		);
	}

	if (isEditing) {
		return (
			<EditCategoryForm
				category={category}
				onCancel={() => setIsEditing(false)}
				onSuccess={() => {
					setIsEditing(false);
					// Optionally refresh the data
				}}
			/>
		);
	}

	return (
		<RFlex className="flex-col space-y-6">
			<RFlex className="items-center justify-between">
				<RFlex className="items-center gap-4">
					<RButton
						variant="ghost"
						onClick={() => router.back()}
						icon="fas fa-arrow-left"
						text="Back"
					/>
					<RFlex className="flex-col">
						<h1 className="text-3xl font-bold">{category.name}</h1>
						<p className="text-muted-foreground">Category Details</p>
					</RFlex>
				</RFlex>
				<CategoryActions
					category={category}
					onEdit={() => setIsEditing(true)}
					onDelete={() => router.push("/dashboard/categories")}
				/>
			</RFlex>

			<div className="grid gap-6 md:grid-cols-2">
				<RCard
					title={
						<RFlex className="items-center gap-2">
							<Hash className="h-5 w-5" />
							Basic Information
						</RFlex>
					}
					contentComponent={
						<RFlex className="flex-col space-y-4">
							<div>
								<label className="text-sm font-medium text-muted-foreground">Name</label>
								<p className="text-lg font-semibold">{category.name}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">Slug</label>
								<Badge variant="outline" className="mt-1">
									{category.slug}
								</Badge>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">Summary</label>
								<p className="text-sm">{category.summary}</p>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm text-muted-foreground">
									Created: {new Date(category.created_at).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm text-muted-foreground">
									Updated: {new Date(category.updated_at).toLocaleDateString()}
								</span>
							</div>
						</RFlex>
					}
				/>

				<RCard
					title={
						<RFlex className="items-center gap-2">
							<Globe className="h-5 w-5" />
							Translations
						</RFlex>
					}
					contentComponent={
						<RTabs
							defaultValue={category.translations?.[0]?.locale || "en"}
							tabs={category.translations?.map((translation) => ({
								value: translation.locale,
								title: translation.locale.toUpperCase(),
								content: (
									<RFlex className="flex-col space-y-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">Name</label>
											<p className="text-lg font-semibold">{translation.name}</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Summary</label>
											<p className="text-sm">{translation.summary}</p>
										</div>
									</RFlex>
								),
							})) || []}
							activeTab={category.translations?.[0]?.locale || "en"}
							setActiveTab={() => {}}
							innerContent={true}
						/>
					}
				/>
			</div>
		</RFlex>
	);
};
