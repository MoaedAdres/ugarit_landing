"use client";

import { useState, useEffect } from "react";
import { SectionFormData } from "@/api/services/dashboard/home/interfaces";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import RTabs from "@/RComponents/RTabs";
import RCard from "@/RComponents/RCard";

interface SectionFormProps {
	data: SectionFormData;
	onChange: (data: SectionFormData) => void;
}

export const SectionForm = ({ data, onChange }: SectionFormProps) => {
	const [formData, setFormData] = useState<SectionFormData>(data);
	const [activeTab, setActiveTab] = useState("en");

	useEffect(() => {
		setFormData(data);
	}, [data]);

	const updateTranslation = (locale: keyof Omit<SectionFormData, "is_hidden">, field: "title" | "description", value: string) => {
		const newData = {
			...formData,
			[locale]: {
				...formData[locale],
				[field]: value,
			},
		};
		setFormData(newData);
		onChange(newData);
	};

	const updateVisibility = (is_hidden: boolean) => {
		const newData = { ...formData, is_hidden };
		setFormData(newData);
		onChange(newData);
	};

	const tabs = [
		{
			value: "en",
			title: "English",
			content: (
				<RCard
					title="English Content"
					contentComponent={
						<div className="space-y-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="en-title">Title</Label>
								<Input
									id="en-title"
									value={formData.en.title}
									onChange={(e) => updateTranslation("en", "title", e.target.value)}
									placeholder="Enter section title in English"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="en-description">Description</Label>
								<Textarea
									id="en-description"
									value={formData.en.description}
									onChange={(e) => updateTranslation("en", "description", e.target.value)}
									placeholder="Enter section description in English"
									rows={4}
								/>
							</div>
						</div>
					}
				/>
			),
		},
		{
			value: "ar",
			title: "Arabic",
			content: (
				<RCard
					title="Arabic Content"
					contentComponent={
						<div className="space-y-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="ar-title">Title</Label>
								<Input
									id="ar-title"
									value={formData.ar.title}
									onChange={(e) => updateTranslation("ar", "title", e.target.value)}
									placeholder="أدخل عنوان القسم باللغة العربية"
									dir="rtl"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="ar-description">Description</Label>
								<Textarea
									id="ar-description"
									value={formData.ar.description}
									onChange={(e) => updateTranslation("ar", "description", e.target.value)}
									placeholder="أدخل وصف القسم باللغة العربية"
									rows={4}
									dir="rtl"
								/>
							</div>
						</div>
					}
				/>
			),
		},
		{
			value: "fr",
			title: "French",
			content: (
				<RCard
					title="French Content"
					contentComponent={
						<div className="space-y-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="fr-title">Title</Label>
								<Input
									id="fr-title"
									value={formData.fr.title}
									onChange={(e) => updateTranslation("fr", "title", e.target.value)}
									placeholder="Entrez le titre de la section en français"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="fr-description">Description</Label>
								<Textarea
									id="fr-description"
									value={formData.fr.description}
									onChange={(e) => updateTranslation("fr", "description", e.target.value)}
									placeholder="Entrez la description de la section en français"
									rows={4}
								/>
							</div>
						</div>
					}
				/>
			),
		},
	];

	return (
		<div className="space-y-6">
			{/* Visibility Toggle */}
			<div className="flex items-center space-x-2">
				<Switch id="is_hidden" checked={!formData.is_hidden} onCheckedChange={(checked) => updateVisibility(!checked)} />
				<Label htmlFor="is_hidden">Section is visible</Label>
			</div>

			{/* Language Tabs */}
			<RTabs
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				innerContent={true}
				fullWidth={true}
				listClassName="grid w-full grid-cols-3"
			/>
		</div>
	);
};
