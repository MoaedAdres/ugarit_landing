"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCategorySchema } from "@/api/services/dashboard/categories/schemas";
import { categoriesRepository } from "@/api/services/dashboard/categories";
import { Category, CategoryFormData } from "@/api/services/dashboard/categories/interfaces";
import { useMutateData } from "@/hooks/use-mutate-data";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RCard from "@/RComponents/RCard";
import RTabs from "@/RComponents/RTabs";
import { useRouter } from "next/navigation";

interface EditCategoryFormProps {
	category: Category;
	onSuccess: () => void;
}

export const EditCategoryForm = ({ category, onSuccess }: EditCategoryFormProps) => {
	const { toast } = useToast();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [activeTab, setActiveTab] = useState("en");
	const router = useRouter();
	// Get translations by locale
	const getTranslationByLocale = (locale: string) => {
		return category.translations?.find((t) => t.locale === locale) || { name: "", summary: "" };
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CategoryFormData>({
		resolver: zodResolver(updateCategorySchema),
		defaultValues: {
			slug: category.slug,
			en: getTranslationByLocale("en"),
			ar: getTranslationByLocale("ar"),
			fr: getTranslationByLocale("fr"),
		},
	});

	const { mutate: updateCategory, isPending } = useMutateData({
		mutationFn: (data: CategoryFormData) => categoriesRepository.updateCategory(category.id, data),
		invalidateKeys: [{ queryKey: ["categories"] }, { queryKey: ["category", category.id] }],
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Category updated successfully",
			});
			onSuccess();
		},
		onErrorFn: () => {
			toast({
				title: "Error",
				description: "Failed to update category",
				variant: "destructive",
			});
		},
	});

	const onSubmit = async (data: CategoryFormData) => {
		const formData = new FormData();
		formData.append("_method", "PUT");
		formData.append("slug", data.slug);
		formData.append("en[name]", data.en.name);
		formData.append("en[summary]", data.en.summary);
		formData.append("ar[name]", data.ar.name);
		formData.append("ar[summary]", data.ar.summary);
		formData.append("fr[name]", data.fr.name);
		formData.append("fr[summary]", data.fr.summary);

		if (selectedFile) {
			formData.append("icon", selectedFile);
		}

		updateCategory(formData as any);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

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

	return (
		<RFlex className="flex-col space-y-6">
			<RFlex className="items-center gap-4">
				<RButton variant="ghost" onClick={() => router.push("/dashboard/categories")} icon="fas fa-arrow-left" text="Back" />
				<h1 className="text-3xl font-bold">Edit Category</h1>
			</RFlex>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<RCard
					title="Category Information"
					contentComponent={
						<RFlex className="flex-col space-y-4">
							<div className="space-y-2">
								<Label htmlFor="slug">Name</Label>
								<Input id="slug" {...register("slug")} placeholder="e.g., tech-innovation" />
								{errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
							</div>

							<div className="space-y-2">
								<Label htmlFor="icon">Icon (Optional - leave empty to keep current)</Label>
								<Input id="icon" type="file" accept="image/*" onChange={handleFileChange} />
							</div>
						</RFlex>
					}
				/>

				<RCard
					title="Translations"
					dir={activeTab === "ar" ? "rtl" : "ltr"}
					contentComponent={
						<>
							<RTabs
								tabs={tabs}
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
											<Label htmlFor="en-name">Name (English)</Label>
											<Input id="en-name" {...register("en.name")} placeholder="Category name in English" />
											{errors.en?.name && <p className="text-sm text-destructive">{errors.en.name.message}</p>}
										</div>
										<div className="space-y-2">
											<Label htmlFor="en-summary">Summary (English)</Label>
											<Textarea id="en-summary" {...register("en.summary")} placeholder="Category summary in English" rows={3} />
											{errors.en?.summary && <p className="text-sm text-destructive">{errors.en.summary.message}</p>}
										</div>
									</RFlex>
								)}

								{activeTab === "ar" && (
									<RFlex className="flex-col space-y-4">
										<div className="space-y-2">
											<Label htmlFor="ar-name">Name (Arabic)</Label>
											<Input dir="rtl" id="ar-name" {...register("ar.name")} placeholder="اسم الفئة بالعربية" />
											{errors.ar?.name && <p className="text-sm text-destructive">{errors.ar.name.message}</p>}
										</div>
										<div className="space-y-2">
											<Label htmlFor="ar-summary">Summary (Arabic)</Label>
											<Textarea dir="rtl" id="ar-summary" {...register("ar.summary")} placeholder="ملخص الفئة بالعربية" rows={3} />
											{errors.ar?.summary && <p className="text-sm text-destructive">{errors.ar.summary.message}</p>}
										</div>
									</RFlex>
								)}

								{activeTab === "fr" && (
									<RFlex className="flex-col space-y-4">
										<div className="space-y-2">
											<Label htmlFor="fr-name">Name (French)</Label>
											<Input id="fr-name" {...register("fr.name")} placeholder="Nom de la catégorie en français" />
											{errors.fr?.name && <p className="text-sm text-destructive">{errors.fr.name.message}</p>}
										</div>
										<div className="space-y-2">
											<Label htmlFor="fr-summary">Summary (French)</Label>
											<Textarea id="fr-summary" {...register("fr.summary")} placeholder="Résumé de la catégorie en français" rows={3} />
											{errors.fr?.summary && <p className="text-sm text-destructive">{errors.fr.summary.message}</p>}
										</div>
									</RFlex>
								)}
							</RFlex>
						</>
					}
				/>

				<RFlex className="justify-end gap-4">
					<RButton type="button" variant="outline" onClick={() => router.push("/dashboard/categories")} text="Cancel" />
					<RButton type="submit" disabled={isPending} loading={isPending} text={isPending ? "Updating..." : "Update Category"} />
				</RFlex>
			</form>
		</RFlex>
	);
};
