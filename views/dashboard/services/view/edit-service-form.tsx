"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateServiceSchema } from "@/api/services/dashboard/services/schemas";
import { servicesRepository } from "@/api/services/dashboard/services";
import { categoriesRepository } from "@/api/services/dashboard/categories";
import { Service, ServiceFormData } from "@/api/services/dashboard/services/interfaces";
import { useMutateData } from "@/hooks/use-mutate-data";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RCard from "@/RComponents/RCard";
import RTabs from "@/RComponents/RTabs";

interface EditServiceFormProps {
	service: Service;
	onCancel: () => void;
	onSuccess: () => void;
}

export const EditServiceForm = ({ service, onCancel, onSuccess }: EditServiceFormProps) => {
	const { toast } = useToast();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [activeTab, setActiveTab] = useState("en");

	// Fetch categories for the select dropdown
	const { data: categoriesData } = useFetchData({
		queryKey: ["categories"],
		queryFn: () => categoriesRepository.getCategories(),
	});

	// Get translations by locale
	const getTranslationByLocale = (locale: string) => {
		return service.translations?.find(t => t.locale === locale) || {
			title: "",
			excerpt: "",
			body_blocks: [""],
			features: [""],
			benefits: [""],
			process_steps: [""],
			faqs: [""],
		};
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm<ServiceFormData>({
		resolver: zodResolver(updateServiceSchema),
		defaultValues: {
			category_id: service.category_id,
			status: service.status,
			order: service.order,
			en: getTranslationByLocale("en"),
			ar: getTranslationByLocale("ar"),
			fr: getTranslationByLocale("fr"),
		},
	});

	// English field arrays
	const { fields: enBodyBlocks, append: appendEnBodyBlock, remove: removeEnBodyBlock } = useFieldArray({
		control,
		name: "en.body_blocks",
	});

	const { fields: enFeatures, append: appendEnFeature, remove: removeEnFeature } = useFieldArray({
		control,
		name: "en.features",
	});

	const { fields: enBenefits, append: appendEnBenefit, remove: removeEnBenefit } = useFieldArray({
		control,
		name: "en.benefits",
	});

	const { fields: enProcessSteps, append: appendEnProcessStep, remove: removeEnProcessStep } = useFieldArray({
		control,
		name: "en.process_steps",
	});

	const { fields: enFaqs, append: appendEnFaq, remove: removeEnFaq } = useFieldArray({
		control,
		name: "en.faqs",
	});

	// Arabic field arrays
	const { fields: arBodyBlocks, append: appendArBodyBlock, remove: removeArBodyBlock } = useFieldArray({
		control,
		name: "ar.body_blocks",
	});

	const { fields: arFeatures, append: appendArFeature, remove: removeArFeature } = useFieldArray({
		control,
		name: "ar.features",
	});

	const { fields: arBenefits, append: appendArBenefit, remove: removeArBenefit } = useFieldArray({
		control,
		name: "ar.benefits",
	});

	const { fields: arProcessSteps, append: appendArProcessStep, remove: removeArProcessStep } = useFieldArray({
		control,
		name: "ar.process_steps",
	});

	const { fields: arFaqs, append: appendArFaq, remove: removeArFaq } = useFieldArray({
		control,
		name: "ar.faqs",
	});

	// French field arrays
	const { fields: frBodyBlocks, append: appendFrBodyBlock, remove: removeFrBodyBlock } = useFieldArray({
		control,
		name: "fr.body_blocks",
	});

	const { fields: frFeatures, append: appendFrFeature, remove: removeFrFeature } = useFieldArray({
		control,
		name: "fr.features",
	});

	const { fields: frBenefits, append: appendFrBenefit, remove: removeFrBenefit } = useFieldArray({
		control,
		name: "fr.benefits",
	});

	const { fields: frProcessSteps, append: appendFrProcessStep, remove: removeFrProcessStep } = useFieldArray({
		control,
		name: "fr.process_steps",
	});

	const { fields: frFaqs, append: appendFrFaq, remove: removeFrFaq } = useFieldArray({
		control,
		name: "fr.faqs",
	});

	const { mutate: updateService, isPending } = useMutateData({
		mutationFn: (data: ServiceFormData) => servicesRepository.updateService(service.id, data),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Service updated successfully",
			});
			onSuccess();
		},
		onErrorFn: () => {
			toast({
				title: "Error",
				description: "Failed to update service",
				variant: "destructive",
			});
		},
	});

	const onSubmit = async (data: ServiceFormData) => {
		const formData = new FormData();
		formData.append("category_id", data.category_id.toString());
		formData.append("status", data.status);
		formData.append("order", data.order.toString());
		
		// English
		formData.append("en[title]", data.en.title);
		formData.append("en[excerpt]", data.en.excerpt);
		data.en.body_blocks.forEach((block, index) => {
			formData.append(`en[body_blocks][${index}]`, block);
		});
		data.en.features.forEach((feature, index) => {
			formData.append(`en[features][${index}]`, feature);
		});
		data.en.benefits.forEach((benefit, index) => {
			formData.append(`en[benefits][${index}]`, benefit);
		});
		data.en.process_steps.forEach((step, index) => {
			formData.append(`en[process_steps][${index}]`, step);
		});
		data.en.faqs.forEach((faq, index) => {
			formData.append(`en[faqs][${index}]`, faq);
		});

		// Arabic
		formData.append("ar[title]", data.ar.title);
		formData.append("ar[excerpt]", data.ar.excerpt);
		data.ar.body_blocks.forEach((block, index) => {
			formData.append(`ar[body_blocks][${index}]`, block);
		});
		data.ar.features.forEach((feature, index) => {
			formData.append(`ar[features][${index}]`, feature);
		});
		data.ar.benefits.forEach((benefit, index) => {
			formData.append(`ar[benefits][${index}]`, benefit);
		});
		data.ar.process_steps.forEach((step, index) => {
			formData.append(`ar[process_steps][${index}]`, step);
		});
		data.ar.faqs.forEach((faq, index) => {
			formData.append(`ar[faqs][${index}]`, faq);
		});

		// French
		formData.append("fr[title]", data.fr.title);
		formData.append("fr[excerpt]", data.fr.excerpt);
		data.fr.body_blocks.forEach((block, index) => {
			formData.append(`fr[body_blocks][${index}]`, block);
		});
		data.fr.features.forEach((feature, index) => {
			formData.append(`fr[features][${index}]`, feature);
		});
		data.fr.benefits.forEach((benefit, index) => {
			formData.append(`fr[benefits][${index}]`, benefit);
		});
		data.fr.process_steps.forEach((step, index) => {
			formData.append(`fr[process_steps][${index}]`, step);
		});
		data.fr.faqs.forEach((faq, index) => {
			formData.append(`fr[faqs][${index}]`, faq);
		});
		
		if (selectedFile) {
			formData.append("icon", selectedFile);
		}

		updateService(formData as any);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const renderTranslationForm = (locale: string, localeData: any) => {
		// Get the correct field arrays and functions based on locale
		const getFieldArrays = () => {
			switch (locale) {
				case "en":
					return {
						bodyBlocks: enBodyBlocks,
						features: enFeatures,
						benefits: enBenefits,
						processSteps: enProcessSteps,
						faqs: enFaqs,
						appendBodyBlock: appendEnBodyBlock,
						removeBodyBlock: removeEnBodyBlock,
						appendFeature: appendEnFeature,
						removeFeature: removeEnFeature,
						appendBenefit: appendEnBenefit,
						removeBenefit: removeEnBenefit,
						appendProcessStep: appendEnProcessStep,
						removeProcessStep: removeEnProcessStep,
						appendFaq: appendEnFaq,
						removeFaq: removeEnFaq,
					};
				case "ar":
					return {
						bodyBlocks: arBodyBlocks,
						features: arFeatures,
						benefits: arBenefits,
						processSteps: arProcessSteps,
						faqs: arFaqs,
						appendBodyBlock: appendArBodyBlock,
						removeBodyBlock: removeArBodyBlock,
						appendFeature: appendArFeature,
						removeFeature: removeArFeature,
						appendBenefit: appendArBenefit,
						removeBenefit: removeArBenefit,
						appendProcessStep: appendArProcessStep,
						removeProcessStep: removeArProcessStep,
						appendFaq: appendArFaq,
						removeFaq: removeArFaq,
					};
				case "fr":
					return {
						bodyBlocks: frBodyBlocks,
						features: frFeatures,
						benefits: frBenefits,
						processSteps: frProcessSteps,
						faqs: frFaqs,
						appendBodyBlock: appendFrBodyBlock,
						removeBodyBlock: removeFrBodyBlock,
						appendFeature: appendFrFeature,
						removeFeature: removeFrFeature,
						appendBenefit: appendFrBenefit,
						removeBenefit: removeFrBenefit,
						appendProcessStep: appendFrProcessStep,
						removeProcessStep: removeFrProcessStep,
						appendFaq: appendFrFaq,
						removeFaq: removeFrFaq,
					};
				default:
					return {
						bodyBlocks: enBodyBlocks,
						features: enFeatures,
						benefits: enBenefits,
						processSteps: enProcessSteps,
						faqs: enFaqs,
						appendBodyBlock: appendEnBodyBlock,
						removeBodyBlock: removeEnBodyBlock,
						appendFeature: appendEnFeature,
						removeFeature: removeEnFeature,
						appendBenefit: appendEnBenefit,
						removeBenefit: removeEnBenefit,
						appendProcessStep: appendEnProcessStep,
						removeProcessStep: removeEnProcessStep,
						appendFaq: appendEnFaq,
						removeFaq: removeEnFaq,
					};
			}
		};

		const {
			bodyBlocks,
			features,
			benefits,
			processSteps,
			faqs,
			appendBodyBlock,
			removeBodyBlock,
			appendFeature,
			removeFeature,
			appendBenefit,
			removeBenefit,
			appendProcessStep,
			removeProcessStep,
			appendFaq,
			removeFaq,
		} = getFieldArrays();

		return (
			<RFlex className="flex-col space-y-6">
				<div className="space-y-2">
					<Label htmlFor={`${locale}-title`}>Title ({locale.toUpperCase()})</Label>
					<Input
						id={`${locale}-title`}
						{...register(`${locale}.title` as any)}
						placeholder={`Service title in ${locale === "en" ? "English" : locale === "ar" ? "Arabic" : "French"}`}
					/>
					{errors[locale as keyof typeof errors]?.title && (
						<p className="text-sm text-destructive">{errors[locale as keyof typeof errors]?.title?.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor={`${locale}-excerpt`}>Excerpt ({locale.toUpperCase()})</Label>
					<Textarea
						id={`${locale}-excerpt`}
						{...register(`${locale}.excerpt` as any)}
						placeholder={`Service excerpt in ${locale === "en" ? "English" : locale === "ar" ? "Arabic" : "French"}`}
						rows={3}
					/>
					{errors[locale as keyof typeof errors]?.excerpt && (
						<p className="text-sm text-destructive">{errors[locale as keyof typeof errors]?.excerpt?.message}</p>
					)}
				</div>

				{/* Body Blocks */}
				<div className="space-y-2">
					<Label>Body Blocks ({locale.toUpperCase()})</Label>
					{bodyBlocks.map((field, index) => (
						<div key={field.id} className="flex gap-2">
							<Textarea
								{...register(`${locale}.body_blocks.${index}` as any)}
								placeholder={`Body block ${index + 1}`}
								rows={2}
							/>
							<RButton
								type="button"
								variant="destructive"
								size="sm"
								onClick={() => removeBodyBlock(index)}
								icon="fas fa-trash"
							/>
						</div>
					))}
					<RButton
						type="button"
						variant="outline"
						size="sm"
						onClick={() => appendBodyBlock("")}
						icon="fas fa-plus"
						text="Add Body Block"
					/>
				</div>

				{/* Features */}
				<div className="space-y-2">
					<Label>Features ({locale.toUpperCase()})</Label>
					{features.map((field, index) => (
						<div key={field.id} className="flex gap-2">
							<Input
								{...register(`${locale}.features.${index}` as any)}
								placeholder={`Feature ${index + 1}`}
							/>
							<RButton
								type="button"
								variant="destructive"
								size="sm"
								onClick={() => removeFeature(index)}
								icon="fas fa-trash"
							/>
						</div>
					))}
					<RButton
						type="button"
						variant="outline"
						size="sm"
						onClick={() => appendFeature("")}
						icon="fas fa-plus"
						text="Add Feature"
					/>
				</div>

				{/* Benefits */}
				<div className="space-y-2">
					<Label>Benefits ({locale.toUpperCase()})</Label>
					{benefits.map((field, index) => (
						<div key={field.id} className="flex gap-2">
							<Input
								{...register(`${locale}.benefits.${index}` as any)}
								placeholder={`Benefit ${index + 1}`}
							/>
							<RButton
								type="button"
								variant="destructive"
								size="sm"
								onClick={() => removeBenefit(index)}
								icon="fas fa-trash"
							/>
						</div>
					))}
					<RButton
						type="button"
						variant="outline"
						size="sm"
						onClick={() => appendBenefit("")}
						icon="fas fa-plus"
						text="Add Benefit"
					/>
				</div>

				{/* Process Steps */}
				<div className="space-y-2">
					<Label>Process Steps ({locale.toUpperCase()})</Label>
					{processSteps.map((field, index) => (
						<div key={field.id} className="flex gap-2">
							<Input
								{...register(`${locale}.process_steps.${index}` as any)}
								placeholder={`Process step ${index + 1}`}
							/>
							<RButton
								type="button"
								variant="destructive"
								size="sm"
								onClick={() => removeProcessStep(index)}
								icon="fas fa-trash"
							/>
						</div>
					))}
					<RButton
						type="button"
						variant="outline"
						size="sm"
						onClick={() => appendProcessStep("")}
						icon="fas fa-plus"
						text="Add Process Step"
					/>
				</div>

				{/* FAQs */}
				<div className="space-y-2">
					<Label>FAQs ({locale.toUpperCase()})</Label>
					{faqs.map((field, index) => (
						<div key={field.id} className="flex gap-2">
							<Textarea
								{...register(`${locale}.faqs.${index}` as any)}
								placeholder={`FAQ ${index + 1}`}
								rows={2}
							/>
							<RButton
								type="button"
								variant="destructive"
								size="sm"
								onClick={() => removeFaq(index)}
								icon="fas fa-trash"
							/>
						</div>
					))}
					<RButton
						type="button"
						variant="outline"
						size="sm"
						onClick={() => appendFaq("")}
						icon="fas fa-plus"
						text="Add FAQ"
					/>
				</div>
			</RFlex>
		);
	};

	const tabs = [
		{
			value: "en",
			title: "English",
			content: renderTranslationForm("en", watch("en")),
		},
		{
			value: "ar",
			title: "Arabic",
			content: renderTranslationForm("ar", watch("ar")),
		},
		{
			value: "fr",
			title: "French",
			content: renderTranslationForm("fr", watch("fr")),
		},
	];

	return (
		<RFlex className="flex-col space-y-6">
			<RFlex className="items-center gap-4">
				<RButton
					variant="ghost"
					onClick={onCancel}
					icon="fas fa-arrow-left"
					text="Back"
				/>
				<h1 className="text-3xl font-bold">Edit Service</h1>
			</RFlex>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<RCard
					title="Service Information"
					contentComponent={
						<RFlex className="flex-col space-y-4">
							<div className="space-y-2">
								<Label htmlFor="category_id">Category</Label>
								<Select onValueChange={(value) => setValue("category_id", parseInt(value))} defaultValue={service.category_id.toString()}>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent>
										{categoriesData?.data?.map((category: any) => (
											<SelectItem key={category.id} value={category.id.toString()}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errors.category_id && <p className="text-sm text-destructive">{errors.category_id.message}</p>}
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="status">Status</Label>
									<Select onValueChange={(value) => setValue("status", value)} defaultValue={service.status}>
										<SelectTrigger>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="published">Published</SelectItem>
											<SelectItem value="draft">Draft</SelectItem>
										</SelectContent>
									</Select>
									{errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
								</div>

								<div className="space-y-2">
									<Label htmlFor="order">Order</Label>
									<Input
										id="order"
										type="number"
										{...register("order", { valueAsNumber: true })}
										placeholder="Order number"
									/>
									{errors.order && <p className="text-sm text-destructive">{errors.order.message}</p>}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="icon">Icon (Optional - leave empty to keep current)</Label>
								<Input
									id="icon"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
								/>
							</div>
						</RFlex>
					}
				/>

				<RCard
					title="Translations"
					contentComponent={
						<RTabs
							defaultValue="en"
							tabs={tabs}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							innerContent={true}
							variant="default"
						/>
					}
				/>

				<RFlex className="justify-end gap-4">
					<RButton
						type="button"
						variant="outline"
						onClick={onCancel}
						text="Cancel"
					/>
					<RButton
						type="submit"
						loading={isPending}
						text={isPending ? "Updating..." : "Update Service"}
					/>
				</RFlex>
			</form>
		</RFlex>
	);
};
