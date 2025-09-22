"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ServicesHeader, ServicesGrid, type ServiceData } from "@/views/dashboard/services";
import { Service } from "@/api/services/dashboard/services/interfaces";
import RFlex from "@/RComponents/RFlex";
import { useFetchData } from "@/hooks/use-fetch-data";
import { servicesRepository } from "@/api/services/dashboard/services";
import RButton from "@/RComponents/RButton";

export default function ServicesPage() {
	const router = useRouter();
	const [services, setServices] = useState<ServiceData[]>([]);

	const { data, isLoading, error } = useFetchData({
		queryKey: ["services"],
		queryFn: () => servicesRepository.getServices(),
	});

	// Convert API data to local format
	useEffect(() => {
		if (data?.data) {
			const apiServices: ServiceData[] = data.data.map((service: Service) => ({
				id: service.id.toString(),
				title: service.title,
				excerpt: service.excerpt,
				category: service.category.name,
				status: service.status,
				order: service.order,
				icon: "fas fa-cogs", // Default icon
				href: `/dashboard/services/${service.id}`,
				lastUpdated: new Date(service.updated_at).toLocaleDateString(),
				translations: service.translations,
				media: service.media,
			}));
			setServices(apiServices);
		}
	}, [data]);

	const handleAddService = () => {
		router.push("/dashboard/services/add");
	};

	return (
		<RFlex className="flex-col space-y-6">
			<div className="flex items-center justify-between">
				<ServicesHeader />
				<RFlex className="gap-2">
					<RButton onClick={handleAddService} icon="fas fa-plus" text="Add Service" />
				</RFlex>
			</div>
			<ServicesGrid services={services} onServicesChange={setServices} />
		</RFlex>
	);
}