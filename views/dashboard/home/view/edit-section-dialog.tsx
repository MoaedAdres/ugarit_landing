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
import RDialog from "@/RComponents/RDialog";
import { Button } from "@/components/ui/button";
import RTabs from "@/RComponents/RTabs";
import RCard from "@/RComponents/RCard";
import { Save, X } from "lucide-react";

interface EditSectionDialogProps {
	section: Section;
	formData: SectionFormData;
	isOpen: boolean;
	onClose: () => void;
}

export const EditSectionDialog = ({ section, formData, isOpen, onClose }: EditSectionDialogProps) => {
	const [activeTab, setActiveTab] = useState("form");

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

	const { mutate: updateSection, isPending } = useMutateData({
		mutationFn: updateSectionAction,
		invalidateKeys: [{ queryKey: ["sections"] }, { queryKey: ["section", section.id] }],
		displaySuccess: true,
		onSuccessFn: () => {
			onClose();
		},
	});

	const onSubmit = (data: SectionFormData) => {
		updateSection({ sectionId: section.id, data });
	};

	const handleFormChange = (data: SectionFormData) => {
		// Update form values when child component changes
		Object.keys(data).forEach((key) => {
			setValue(key as keyof SectionFormData, data[key as keyof SectionFormData]);
		});
	};

	const dialogBody = (
		<form id="edit-section-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
					contentComponent={
						<SectionForm 
							data={editData} 
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
					contentComponent={<SectionPreview data={editData} />}
				/>
			)}
		</form>
	);

	const dialogFooter = (
		<div className="flex justify-end gap-4">
			<Button variant="outline" onClick={onClose} disabled={isPending || isSubmitting} type="button">
				<X className="h-4 w-4 mr-2" />
				Cancel
			</Button>
			<Button 
				type="submit" 
				form="edit-section-form"
				disabled={isPending || isSubmitting} 
				className="flex items-center gap-2"
			>
				<Save className="h-4 w-4" />
				{isPending || isSubmitting ? "Updating..." : "Update Section"}
			</Button>
		</div>
	);

	return (
		<RDialog
			triggerComponent={null}
			dialogHeader={{
				title: `Edit Section: ${section.title}`,
				description: "Update the section details and translations",
			}}
			dialogBody={dialogBody}
			dialogFooter={dialogFooter}
			contentClassName="max-w-4xl max-h-[80vh] overflow-y-auto"
		/>
	);
};
