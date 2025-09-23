"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutateData } from "@/hooks/use-mutate-data";
import { updateSectionAction } from "@/api/services/dashboard/home/actions";
import { Section, SectionFormData } from "@/api/services/dashboard/home/interfaces";
import { updateSectionSchema } from "@/api/services/dashboard/home/schemas";
import { SectionForm } from "../add/section-form";
import { SectionPreview } from "../add/section-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, X } from "lucide-react";
import RTabs from "@/RComponents/RTabs";
import RCard from "@/RComponents/RCard";
import { useRouter } from "next/navigation";
import { homeRepository } from "@/api/services/dashboard/home";

interface EditSectionFormProps {
	section: Section;
	formData: SectionFormData;
	onExitEdit: () => void;
}

export const EditSectionForm = ({ section, formData, onExitEdit }: EditSectionFormProps) => {
	const [activeTab, setActiveTab] = useState("form");
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<SectionFormData>({
		resolver: zodResolver(updateSectionSchema),
		defaultValues: formData,
	});

	const editData = watch();

	const { mutate: updateSectionMutation, isPending } = useMutateData({
		mutationFn: (data: SectionFormData) => homeRepository.updateSection(section.id, data),
		invalidateKeys: [{ queryKey: ["sections"] }, { queryKey: ["section", section.id] }],
		onSuccessFn: () => {
			onExitEdit();
		},
	});

	const onSubmit = (data: SectionFormData) => {
		updateSectionMutation({ ...data, order: section.order.toString() });
	};

	const handleFormChange = (data: SectionFormData) => {
		// Update form values when child component changes
		Object.keys(data).forEach((key) => {
			setValue(key as keyof SectionFormData, data[key as keyof SectionFormData]);
		});
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="outline" size="sm" onClick={() => router.push("/dashboard/home")} className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back
				</Button>
				<div>
					<h2 className="text-2xl font-semibold">Edit Section: {section.title}</h2>
					<p className="text-sm text-muted-foreground">Update the section details and translations</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
				{activeTab === "form" && (
					<RCard
						title="Section Details"
						contentComponent={<SectionForm data={editData} onChange={handleFormChange} register={register} errors={errors} />}
					/>
				)}
				{activeTab === "preview" && <RCard title="Preview" contentComponent={<SectionPreview data={editData} />} />}

				<div className="flex justify-end gap-4">
					<Button variant="outline" onClick={onExitEdit} type="button" disabled={isPending || isSubmitting}>
						<X className="h-4 w-4 mr-2" />
						Cancel
					</Button>
					<Button type="submit" disabled={isPending || isSubmitting} className="flex items-center gap-2">
						<Save className="h-4 w-4" />
						{isPending || isSubmitting ? "Updating..." : "Update Section"}
					</Button>
				</div>
			</form>
		</div>
	);
};
