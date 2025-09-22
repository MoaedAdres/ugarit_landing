"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutateData } from "@/hooks/use-mutate-data";
import { SectionFormData } from "@/api/services/dashboard/home/interfaces";
import { addSectionSchema } from "@/api/services/dashboard/home/schemas";
import { SectionForm } from "./section-form";
import { SectionPreview } from "./section-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import RTabs from "@/RComponents/RTabs";
import RCard from "@/RComponents/RCard";
import { homeRepository } from "@/api/services/dashboard/home";
const defaultFormData: SectionFormData = {
	en: { title: "", description: "" },
	ar: { title: "", description: "" },
	fr: { title: "", description: "" },
	is_hidden: false,
	order: 1,
};

export const AddSectionForm = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("form");

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<SectionFormData>({
		resolver: zodResolver(addSectionSchema),
		defaultValues: defaultFormData,
	});

	const formData = watch();

	const { mutate, isPending } = useMutateData({
		mutationFn: (data: SectionFormData) => homeRepository.addSection(data),
		invalidateKeys: [{ queryKey: ["sections"] }],
		displaySuccess: true,
		onSuccessFn: () => {
			router.push("/dashboard/home");
		},
	});

	const onSubmit = (data: SectionFormData) => {
		mutate(data);
	};

	const handleFormChange = (data: SectionFormData) => {
		// Update form values when child component changes
		Object.keys(data).forEach((key) => {
			setValue(key as keyof SectionFormData, data[key as keyof SectionFormData]);
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back
				</Button>
				<div>
					<h2 className="text-2xl font-semibold">Add New Section</h2>
					<p className="text-sm text-muted-foreground">Create a new section with multilingual support</p>
				</div>
			</div>
			<RTabs
				tabs={[
					{ title: "Form", value: "form" },
					{ title: "Preview", value: "preview" },
				]}
				activeTab={activeTab}
				triggerClassName="w-full"
				listClassName="w-full"
				setActiveTab={setActiveTab}
			/>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{activeTab === "form" && (
					<RCard
						title="Section Details"
						contentComponent={
							<SectionForm 
								data={formData} 
								onChange={handleFormChange}
								register={register}
								errors={errors}
							/>
						}
					/>
				)}
				{activeTab === "preview" && (
					<RCard
						title="Preview"
						contentComponent={<SectionPreview data={formData} />}
					/>
				)}

				<div className="flex justify-end gap-4">
					<Button variant="outline" onClick={() => router.back()} type="button">
						Cancel
					</Button>
					<Button 
						type="submit" 
						disabled={isPending || isSubmitting} 
						className="flex items-center gap-2"
					>
						<Save className="h-4 w-4" />
						{isPending || isSubmitting ? "Creating..." : "Create Section"}
					</Button>
				</div>
			</form>
		</div>
	);
};
