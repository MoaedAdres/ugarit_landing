"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/use-fetch-data";
import { categoriesRepository } from "@/api/services/dashboard/categories";
import { Category, CategoryFormData } from "@/api/services/dashboard/categories/interfaces";
import { CategoryActions } from "./category-actions";
import { EditCategoryForm } from "./edit-category-form";
import RCard from "@/RComponents/RCard";
import RTabs from "@/RComponents/RTabs";
import { Calendar } from "lucide-react";
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
	const [activeTab, setActiveTab] = useState("en");

	const { data, isLoading, error } = useFetchData({
		queryKey: ["category", categoryId],
		queryFn: () => categoriesRepository.getCategory(categoryId),
	});

	const category: Category | undefined = data?.data;

	if (isLoading) {
		return (
			<RFlex className="flex-col space-y-6">
				<Skeleton className="h-8 w-64" />
				<RCard title={<Skeleton className="h-6 w-32" />} contentComponent={<Skeleton className="h-32 w-full" />} />
			</RFlex>
		);
	}

	if (error || !category) {
		return (
			<RFlex className="flex-col space-y-6">
				<RButton variant="ghost" onClick={() => router.push("/dashboard/categories")} icon="fas fa-arrow-left" text="Back" />
				<RCard contentComponent={<p className="text-destructive">Category not found or error loading category.</p>} />
			</RFlex>
		);
	}

	if (isEditing) {
		return (
			<EditCategoryForm
				category={category}
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
					<RButton variant="ghost" onClick={() => router.push("/dashboard/categories")} icon="fas fa-arrow-left" text="Back" />
					<h1 className="text-3xl font-bold">View Category</h1>
				</RFlex>
				<CategoryActions category={category} onEdit={() => setIsEditing(true)} onDelete={() => router.push("/dashboard/categories")} />
			</RFlex>

			<RCard
				title="Category Information"
				contentComponent={
					<RFlex className="flex-col space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">Name</label>
							<div className="p-3 bg-muted rounded-md">
								<span className="font-mono text-sm">{category.slug}</span>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">Icon</label>
							<div className="p-3 bg-muted rounded-md">
								{category.media?.[0] ? (
									<div className="flex items-center gap-2">
										<img src={category.media[0].original_url} alt="Category icon" className="w-8 h-8 object-contain" />
										<span className="text-sm text-muted-foreground">{category.media[0].name}</span>
									</div>
								) : (
									<span className="text-sm text-muted-foreground">No icon uploaded</span>
								)}
							</div>
						</div>

						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								<span>Created: {new Date(category.created_at).toLocaleDateString()}</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								<span>Updated: {new Date(category.updated_at).toLocaleDateString()}</span>
							</div>
						</div>
					</RFlex>
				}
			/>

			<RCard
				title="Translations"
				contentComponent={
					<>
						<RTabs
							tabs={[
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
							]}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							innerContent={true}
							fullWidth={true}
							listClassName="grid w-full grid-cols-3"
						/>
						<RFlex className="flex-col space-y-4">
							{activeTab === "en" && (
								<RFlex className="flex-col space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground">Name (English)</label>
										<div className="p-3 bg-muted rounded-md">
											<span className="text-lg font-semibold">
												{category.translations?.find((t) => t.locale === "en")?.name || "No name set"}
											</span>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground">Summary (English)</label>
										<div className="p-3 bg-muted rounded-md">
											<span className="text-sm">{category.translations?.find((t) => t.locale === "en")?.summary || "No summary set"}</span>
										</div>
									</div>
								</RFlex>
							)}

							{activeTab === "ar" && (
								<RFlex className="flex-col space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground">Name (Arabic)</label>
										<div className="p-3 bg-muted rounded-md" dir="rtl">
											<span className="text-lg font-semibold">
												{category.translations?.find((t) => t.locale === "ar")?.name || "لم يتم تعيين اسم"}
											</span>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground">Summary (Arabic)</label>
										<div className="p-3 bg-muted rounded-md" dir="rtl">
											<span className="text-sm">
												{category.translations?.find((t) => t.locale === "ar")?.summary || "لم يتم تعيين ملخص"}
											</span>
										</div>
									</div>
								</RFlex>
							)}

							{activeTab === "fr" && (
								<RFlex className="flex-col space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground">Name (French)</label>
										<div className="p-3 bg-muted rounded-md">
											<span className="text-lg font-semibold">
												{category.translations?.find((t) => t.locale === "fr")?.name || "Aucun nom défini"}
											</span>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground">Summary (French)</label>
										<div className="p-3 bg-muted rounded-md">
											<span className="text-sm">
												{category.translations?.find((t) => t.locale === "fr")?.summary || "Aucun résumé défini"}
											</span>
										</div>
									</div>
								</RFlex>
							)}
						</RFlex>
					</>
				}
			/>
		</RFlex>
	);
};
