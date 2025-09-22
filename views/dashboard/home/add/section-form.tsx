"use client";

import { useState, useEffect } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SectionFormData } from "@/api/services/dashboard/home/interfaces";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import RTabs from "@/RComponents/RTabs";
import RCard from "@/RComponents/RCard";
import { cn } from "@/lib/utils";

interface SectionFormProps {
	data: SectionFormData;
	onChange: (data: SectionFormData) => void;
	register: UseFormRegister<SectionFormData>;
	errors: FieldErrors<SectionFormData>;
}

export const SectionForm = ({ data, onChange, register, errors }: SectionFormProps) => {
	const [formData, setFormData] = useState<SectionFormData>(data);
	const [activeTab, setActiveTab] = useState("en");

	useEffect(() => {
		setFormData(data);
	}, [data]);

	const updateVisibility = (is_hidden: boolean) => {
		const newData = { ...formData, is_hidden };
		setFormData(newData);
		onChange(newData);
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
		<div className="space-y-6">
			{/* Order Field */}
			<div className="flex flex-col gap-2">
				<Label htmlFor="order">Order</Label>
				<Input
					id="order"
					type="number"
					min="1"
					{...register("order", { valueAsNumber: true })}
					placeholder="Enter section order (1, 2, 3...)"
					className={cn(errors.order ? "border-red-500" : "", "w-1/12")}
				/>
				{errors.order && <p className="text-sm text-red-500">{errors.order.message}</p>}
			</div>

			{/* Visibility Toggle */}
			<div className="flex items-center space-x-2">
				<Switch
					id="is_hidden"
					{...register("is_hidden")}
					checked={!formData.is_hidden}
					onCheckedChange={(checked) => updateVisibility(!checked)}
				/>
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
			{activeTab === "en" && (
				<RCard
					title="English Content"
					contentComponent={
						<div className="space-y-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="en-title">Title</Label>
								<Input
									id="en-title"
									{...register("en.title")}
									placeholder="Enter section title in English"
									className={errors.en?.title ? "border-red-500" : ""}
								/>
								{errors.en?.title && <p className="text-sm text-red-500">{errors.en.title.message}</p>}
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="en-description">Description</Label>
								<Textarea
									id="en-description"
									{...register("en.description")}
									placeholder="Enter section description in English"
									rows={4}
									className={errors.en?.description ? "border-red-500" : ""}
								/>
								{errors.en?.description && <p className="text-sm text-red-500">{errors.en.description.message}</p>}
							</div>
						</div>
					}
				/>
			)}
			{activeTab === "ar" && (
				<RCard
					title="Arabic Content"
					dir="rtl"
					contentComponent={
						<div className="space-y-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="ar-title">Title</Label>
								<Input
									id="ar-title"
									{...register("ar.title")}
									placeholder="أدخل عنوان القسم باللغة العربية"
									dir="rtl"
									className={errors.ar?.title ? "border-red-500" : ""}
								/>
								{errors.ar?.title && <p className="text-sm text-red-500">{errors.ar.title.message}</p>}
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="ar-description">Description</Label>
								<Textarea
									id="ar-description"
									{...register("ar.description")}
									placeholder="أدخل وصف القسم باللغة العربية"
									rows={4}
									dir="rtl"
									className={errors.ar?.description ? "border-red-500" : ""}
								/>
								{errors.ar?.description && <p className="text-sm text-red-500">{errors.ar.description.message}</p>}
							</div>
						</div>
					}
				/>
			)}
			{activeTab === "fr" && (
				<RCard
					title="French Content"
					contentComponent={
						<div className="space-y-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="fr-title">Title</Label>
								<Input
									id="fr-title"
									{...register("fr.title")}
									placeholder="Entrez le titre de la section en français"
									className={errors.fr?.title ? "border-red-500" : ""}
								/>
								{errors.fr?.title && <p className="text-sm text-red-500">{errors.fr.title.message}</p>}
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="fr-description">Description</Label>
								<Textarea
									id="fr-description"
									{...register("fr.description")}
									placeholder="Entrez la description de la section en français"
									rows={4}
									className={errors.fr?.description ? "border-red-500" : ""}
								/>
								{errors.fr?.description && <p className="text-sm text-red-500">{errors.fr.description.message}</p>}
							</div>
						</div>
					}
				/>
			)}
		</div>
	);
};
