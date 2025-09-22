"use client";

import ServiceCard from "./ServiceCard";
import { ServiceData } from "./types";
import { servicesRepository } from "@/api/services/dashboard/services";
import { useMutateData } from "@/hooks/use-mutate-data";
import { useToast } from "@/hooks/use-toast";

interface ServicesGridProps {
	services: ServiceData[];
	onServicesChange: (services: ServiceData[] | ((prev: ServiceData[]) => ServiceData[])) => void;
}

export default function ServicesGrid({ services, onServicesChange }: ServicesGridProps) {
	const { toast } = useToast();

	const { mutate: deleteService } = useMutateData({
		mutationFn: (serviceId: number) => servicesRepository.deleteService(serviceId),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Service deleted successfully",
			});
		},
		onErrorFn: () => {
			toast({
				title: "Error",
				description: "Failed to delete service",
				variant: "destructive",
			});
		},
	});

	const handleDeleteService = (serviceId: string) => {
		deleteService(parseInt(serviceId));
		// Remove from local state immediately for better UX
		onServicesChange((prev) => prev.filter((service) => service.id !== serviceId));
	};

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{services.map((service) => (
				<ServiceCard key={service.id} {...service} onDelete={handleDeleteService} />
			))}
		</div>
	);
}
