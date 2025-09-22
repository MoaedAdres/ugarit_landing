"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/use-fetch-data";
import { servicesRepository } from "@/api/services/dashboard/services";
import { Service, ServiceFormData } from "@/api/services/dashboard/services/interfaces";
import { ServiceActions } from "./service-actions";
import { EditServiceForm } from "./edit-service-form";
import { Badge } from "@/components/ui/badge";
import RCard from "@/RComponents/RCard";
import RTabs from "@/RComponents/RTabs";
import { Calendar, Globe, Hash, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";

interface ServiceDetailsProps {
	serviceId: number;
}

export const ServiceDetails = ({ serviceId }: ServiceDetailsProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isEdit = searchParams.get("isEdit") === "true";
	const [isEditing, setIsEditing] = useState(isEdit);
	const [activeTab, setActiveTab] = useState("en");

	const { data, isLoading, error } = useFetchData({
		queryKey: ["service", serviceId],
		queryFn: () => servicesRepository.getService(serviceId),
	});

	const service: Service | undefined = data?.data;

	if (isLoading) {
		return (
			<RFlex className="flex-col space-y-6">
				<Skeleton className="h-8 w-64" />
				<RCard title={<Skeleton className="h-6 w-32" />} contentComponent={<Skeleton className="h-32 w-full" />} />
			</RFlex>
		);
	}

	if (error || !service) {
		return (
			<RFlex className="flex-col space-y-6">
				<RButton variant="ghost" onClick={() => router.push("/dashboard/services")} icon="fas fa-arrow-left" text="Back" />
				<RCard contentComponent={<p className="text-destructive">Service not found or error loading service.</p>} />
			</RFlex>
		);
	}

	if (isEditing) {
		return (
			<EditServiceForm
				service={service}
				onSuccess={() => {
					setIsEditing(false);
					// Optionally refresh the data
				}}
			/>
		);
	}

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

	const getTranslationByLocale = (locale: string) => {
		return service.translations?.find((t) => t.locale === locale);
	};

	const renderTranslationContent = (locale: string) => {
		const translation = getTranslationByLocale(locale);
		if (!translation) return null;

		return (
			<RFlex className="flex-col space-y-6">
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">Title ({locale.toUpperCase()})</label>
					<div className="p-3 bg-muted rounded-md">
						<p className="text-lg font-semibold" dir={locale === "ar" ? "rtl" : "ltr"}>
							{translation.title}
						</p>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">Excerpt ({locale.toUpperCase()})</label>
					<div className="p-3 bg-muted rounded-md">
						<p className="text-sm" dir={locale === "ar" ? "rtl" : "ltr"}>
							{translation.excerpt}
						</p>
					</div>
				</div>

				{/* Body Blocks */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">Body Blocks ({locale.toUpperCase()})</label>
					<div className="space-y-2">
						{translation.body_blocks.map((block, index) => (
							<div key={index} className="p-3 bg-muted rounded-md">
								<p className="text-sm" dir={locale === "ar" ? "rtl" : "ltr"}>
									{block}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Features */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">Features ({locale.toUpperCase()})</label>
					<div className="space-y-2">
						{translation.features.map((feature, index) => (
							<div key={index} className="p-3 bg-muted rounded-md">
								<p className="text-sm" dir={locale === "ar" ? "rtl" : "ltr"}>
									{feature}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Benefits */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">Benefits ({locale.toUpperCase()})</label>
					<div className="space-y-2">
						{translation.benefits.map((benefit, index) => (
							<div key={index} className="p-3 bg-muted rounded-md">
								<p className="text-sm" dir={locale === "ar" ? "rtl" : "ltr"}>
									{benefit}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Process Steps */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">Process Steps ({locale.toUpperCase()})</label>
					<div className="space-y-2">
						{translation.process_steps.map((step, index) => (
							<div key={index} className="p-3 bg-muted rounded-md">
								<p className="text-sm" dir={locale === "ar" ? "rtl" : "ltr"}>
									{step}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* FAQs */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">FAQs ({locale.toUpperCase()})</label>
					<div className="space-y-2">
						{translation.faqs.map((faq, index) => (
							<div key={index} className="p-3 bg-muted rounded-md">
								<p className="text-sm" dir={locale === "ar" ? "rtl" : "ltr"}>
									{faq}
								</p>
							</div>
						))}
					</div>
				</div>
			</RFlex>
		);
	};

	return (
		<RFlex className="flex-col space-y-6">
			<RFlex className="items-center justify-between">
				<RFlex className="items-center gap-4">
					<RButton variant="ghost" onClick={() => router.back()} icon="fas fa-arrow-left" text="Back" />
					<RFlex className="flex-col">
						<h1 className="text-3xl font-bold">Service Details</h1>
						<p className="text-muted-foreground">View and manage service information</p>
					</RFlex>
				</RFlex>
				<ServiceActions service={service} onEdit={() => setIsEditing(true)} onDelete={() => router.push("/dashboard/services")} />
			</RFlex>

			<form className="space-y-6">
				<RCard
					title="Service Information"
					contentComponent={
						<RFlex className="flex-col space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">Category</label>
								<div className="p-3 bg-muted rounded-md">
									<Badge variant="outline">{service.category.name}</Badge>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground">Status</label>
									<div className="p-3 bg-muted rounded-md">
										<Badge variant={service.status === "published" ? "default" : "secondary"}>{service.status}</Badge>
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground">Order</label>
									<div className="p-3 bg-muted rounded-md">
										<p className="text-sm">{service.order}</p>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">Icon</label>
								<div className="p-3 bg-muted rounded-md">
									{service.media && service.media.length > 0 ? (
										<div className="flex items-center gap-2">
											<img src={service.media[0].original_url} alt="Service icon" className="w-8 h-8 object-contain" />
											<span className="text-sm text-muted-foreground">{service.media[0].name}</span>
										</div>
									) : (
										<p className="text-sm text-muted-foreground">No icon uploaded</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground">Created</label>
									<div className="p-3 bg-muted rounded-md">
										<p className="text-sm">{new Date(service.created_at).toLocaleDateString()}</p>
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground">Updated</label>
									<div className="p-3 bg-muted rounded-md">
										<p className="text-sm">{new Date(service.updated_at).toLocaleDateString()}</p>
									</div>
								</div>
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
								{activeTab === "en" && renderTranslationContent("en")}
								{activeTab === "ar" && renderTranslationContent("ar")}
								{activeTab === "fr" && renderTranslationContent("fr")}
							</RFlex>
						</>
					}
				/>
			</form>
		</RFlex>
	);
};
