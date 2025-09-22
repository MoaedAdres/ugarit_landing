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

	const { data, isLoading, error } = useFetchData({
		queryKey: ["service", serviceId],
		queryFn: () => servicesRepository.getService(serviceId),
	});

	const service: Service | undefined = data?.data;

	if (isLoading) {
		return (
			<RFlex className="flex-col space-y-6">
				<Skeleton className="h-8 w-64" />
				<RCard
					title={<Skeleton className="h-6 w-32" />}
					contentComponent={<Skeleton className="h-32 w-full" />}
				/>
			</RFlex>
		);
	}

	if (error || !service) {
		return (
			<RFlex className="flex-col space-y-6">
				<RButton
					variant="ghost"
					onClick={() => router.back()}
					icon="fas fa-arrow-left"
					text="Back"
				/>
				<RCard
					contentComponent={
						<p className="text-destructive">Service not found or error loading service.</p>
					}
				/>
			</RFlex>
		);
	}

	if (isEditing) {
		return (
			<EditServiceForm
				service={service}
				onCancel={() => setIsEditing(false)}
				onSuccess={() => {
					setIsEditing(false);
					// Optionally refresh the data
				}}
			/>
		);
	}

	return (
		<RFlex className="flex-col space-y-6">
			<RFlex className="items-center justify-between">
				<RFlex className="items-center gap-4">
					<RButton
						variant="ghost"
						onClick={() => router.back()}
						icon="fas fa-arrow-left"
						text="Back"
					/>
					<RFlex className="flex-col">
						<h1 className="text-3xl font-bold">{service.title}</h1>
						<p className="text-muted-foreground">Service Details</p>
					</RFlex>
				</RFlex>
				<ServiceActions
					service={service}
					onEdit={() => setIsEditing(true)}
					onDelete={() => router.push("/dashboard/services")}
				/>
			</RFlex>

			<div className="grid gap-6 md:grid-cols-2">
				<RCard
					title={
						<RFlex className="items-center gap-2">
							<Hash className="h-5 w-5" />
							Basic Information
						</RFlex>
					}
					contentComponent={
						<RFlex className="flex-col space-y-4">
							<div>
								<label className="text-sm font-medium text-muted-foreground">Title</label>
								<p className="text-lg font-semibold">{service.title}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">Excerpt</label>
								<p className="text-sm">{service.excerpt}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">Category</label>
								<Badge variant="outline" className="mt-1">
									{service.category.name}
								</Badge>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">Status</label>
								<Badge variant={service.status === "published" ? "default" : "secondary"} className="mt-1">
									{service.status}
								</Badge>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">Order</label>
								<p className="text-sm">{service.order}</p>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm text-muted-foreground">
									Created: {new Date(service.created_at).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm text-muted-foreground">
									Updated: {new Date(service.updated_at).toLocaleDateString()}
								</span>
							</div>
						</RFlex>
					}
				/>

				<RCard
					title={
						<RFlex className="items-center gap-2">
							<Globe className="h-5 w-5" />
							Translations
						</RFlex>
					}
					contentComponent={
						<RTabs
							defaultValue={service.translations?.[0]?.locale || "en"}
							tabs={service.translations?.map((translation) => ({
								value: translation.locale,
								title: translation.locale.toUpperCase(),
								content: (
									<RFlex className="flex-col space-y-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">Title</label>
											<p className="text-lg font-semibold">{translation.title}</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Excerpt</label>
											<p className="text-sm">{translation.excerpt}</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Body Blocks</label>
											<ul className="text-sm list-disc list-inside">
												{translation.body_blocks.map((block, index) => (
													<li key={index}>{block}</li>
												))}
											</ul>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Features</label>
											<ul className="text-sm list-disc list-inside">
												{translation.features.map((feature, index) => (
													<li key={index}>{feature}</li>
												))}
											</ul>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Benefits</label>
											<ul className="text-sm list-disc list-inside">
												{translation.benefits.map((benefit, index) => (
													<li key={index}>{benefit}</li>
												))}
											</ul>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Process Steps</label>
											<ul className="text-sm list-disc list-inside">
												{translation.process_steps.map((step, index) => (
													<li key={index}>{step}</li>
												))}
											</ul>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">FAQs</label>
											<ul className="text-sm list-disc list-inside">
												{translation.faqs.map((faq, index) => (
													<li key={index}>{faq}</li>
												))}
											</ul>
										</div>
									</RFlex>
								),
							})) || []}
							activeTab={service.translations?.[0]?.locale || "en"}
							setActiveTab={() => {}}
							innerContent={true}
						/>
					}
				/>
			</div>
		</RFlex>
	);
};