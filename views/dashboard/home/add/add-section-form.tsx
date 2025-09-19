"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutateData } from "@/hooks/use-mutate-data";
import { SectionFormData } from "@/api/services/dashboard/home/interfaces";
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
};

export const AddSectionForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<SectionFormData>(defaultFormData);
	const [activeTab, setActiveTab] = useState("form");

	const { mutate, isPending } = useMutateData({
		mutationFn: () => homeRepository.addSection(formData),
		invalidateKeys: [{ queryKey: ["sections"] }],
		displaySuccess: true,
		onSuccessFn: () => {
			router.push("/dashboard/home");
		},
	});

	const handleSubmit = () => {
		mutate(formData);
	};

	const handleFormChange = (data: SectionFormData) => {
		setFormData(data);
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
			{activeTab === "form" && (
				<RCard
					title="Section Details"
					contentComponent={<SectionForm data={formData} onChange={handleFormChange} />}
				/>
			)}
			{activeTab === "preview" && (
				<RCard
					title="Preview"
					contentComponent={<SectionPreview data={formData} />}
				/>
			)}

			<div className="flex justify-end gap-4">
				<Button variant="outline" onClick={() => router.back()}>
					Cancel
				</Button>
				<Button onClick={handleSubmit} disabled={isPending} className="flex items-center gap-2">
					<Save className="h-4 w-4" />
					{isPending ? "Creating..." : "Create Section"}
				</Button>
			</div>
		</div>
	);
};
