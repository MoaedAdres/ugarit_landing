"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ServicesHeader, ServicesGrid, type ServiceData } from "@/views/dashboard/services";
import { Service } from "@/api/services/dashboard/services/interfaces";
import RFlex from "@/RComponents/RFlex";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutateData } from "@/hooks/use-mutate-data";
import { servicesRepository } from "@/api/services/dashboard/services";
import RButton from "@/RComponents/RButton";
import { useToast } from "@/hooks/use-toast";
import { getIconUrl } from "@/utils/helperFunctions";

export default function ServicesPage() {
	const router = useRouter();
	const [services, setServices] = useState<ServiceData[]>([]);
	const { toast } = useToast();

	const { data, isLoading, error } = useFetchData({
		queryKey: ["services"],
		queryFn: () => servicesRepository.getServices(),
		onSuccessFn: (data) => {
			const apiServices: ServiceData[] = data.data.map((service: Service) => ({
				id: service.id.toString(),
				title: service.title,
				excerpt: service.excerpt,
				category: service.category.name,
				status: service.status,
				order: service.order,
				icon: service.media && service.media.length > 0 ? getIconUrl(service.media[0].original_url) : "fas fa-cogs", // Use uploaded icon or default
				href: `/dashboard/services/${service.id}`,
				lastUpdated: new Date(service.updated_at).toLocaleDateString(),
				translations: service.translations,
				media: service.media,
			}));
			setServices(apiServices.sort((a, b) => a.order - b.order));
		},
	});

	const { mutate: reorderServices, isPending: isReordering } = useMutateData({
		mutationFn: (orderedIds: number[]) => servicesRepository.reorderServices(orderedIds),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Service order saved successfully",
			});
		},
		onErrorFn: (error) => {
			toast({
				title: "Error",
				description: "Failed to save service order",
				variant: "destructive",
			});
		},
	});

	const handleSaveOrder = () => {
		const orderedIds = services.map((service) => parseInt(service.id));
		reorderServices(orderedIds);
	};

	const handleAddService = () => {
		router.push("/dashboard/services/add");
	};

	return (
		<RFlex className="flex-col space-y-6">
			<div className="flex items-center justify-between">
				<ServicesHeader />
				<RFlex className="gap-2">
					<RButton
						variant="outline"
						onClick={handleSaveOrder}
						icon={isReordering ? "fas fa-spinner fa-spin" : "fas fa-save"}
						text="Save Order"
						disabled={isReordering}
					/>
					<RButton onClick={handleAddService} icon="fas fa-plus" text="Add Service" />
				</RFlex>
			</div>
			<ServicesGrid services={services} onServicesChange={setServices} />
		</RFlex>
	);
}