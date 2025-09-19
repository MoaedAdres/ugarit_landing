"use client";

import { useState } from "react";
import { useMutateData } from "@/hooks/use-mutate-data";
import { updateSectionAction } from "@/api/services/dashboard/home/actions";
import { Section, SectionFormData } from "@/api/services/dashboard/home/interfaces";
import { SectionForm } from "../add/section-form";
import { SectionPreview } from "../add/section-preview";
import RDialog from "@/RComponents/RDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X } from "lucide-react";

interface EditSectionDialogProps {
	section: Section;
	formData: SectionFormData;
	isOpen: boolean;
	onClose: () => void;
}

export const EditSectionDialog = ({ section, formData, isOpen, onClose }: EditSectionDialogProps) => {
	const [editData, setEditData] = useState<SectionFormData>(formData);
	const [activeTab, setActiveTab] = useState("form");

	const { mutate: updateSection, isPending } = useMutateData({
		mutationFn: updateSectionAction,
		invalidateKeys: [{ queryKey: ["sections"] }, { queryKey: ["section", section.id] }],
		displaySuccess: true,
		onSuccessFn: () => {
			onClose();
		},
	});

	const handleSubmit = () => {
		updateSection({ sectionId: section.id, data: editData });
	};

	const handleFormChange = (data: SectionFormData) => {
		setEditData(data);
	};

	const dialogBody = (
		<div className="space-y-6">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="form">Form</TabsTrigger>
					<TabsTrigger value="preview">Preview</TabsTrigger>
				</TabsList>

				<TabsContent value="form" className="space-y-4">
					<SectionForm data={editData} onChange={handleFormChange} />
				</TabsContent>

				<TabsContent value="preview" className="space-y-4">
					<SectionPreview data={editData} />
				</TabsContent>
			</Tabs>
		</div>
	);

	const dialogFooter = (
		<div className="flex justify-end gap-4">
			<Button variant="outline" onClick={onClose} disabled={isPending}>
				<X className="h-4 w-4 mr-2" />
				Cancel
			</Button>
			<Button onClick={handleSubmit} disabled={isPending} className="flex items-center gap-2">
				<Save className="h-4 w-4" />
				{isPending ? "Updating..." : "Update Section"}
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
