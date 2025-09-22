"use client";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import SortableServiceCard from "./SortableServiceCard";
import DragOverlayCard from "./DragOverlayCard";
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
	const [activeId, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

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

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);

		if (over && active.id !== over.id) {
			onServicesChange((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const handleDeleteService = (serviceId: string) => {
		deleteService(parseInt(serviceId));
		// Remove from local state immediately for better UX
		onServicesChange((prev) => prev.filter((service) => service.id !== serviceId));
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<SortableContext items={services.map((s) => s.id)} strategy={rectSortingStrategy}>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service) => (
						<SortableServiceCard key={service.id} {...service} onDelete={handleDeleteService} />
					))}
				</div>
			</SortableContext>
			<DragOverlay>{activeId ? <DragOverlayCard service={services.find((s) => s.id === activeId)!} /> : null}</DragOverlay>
		</DndContext>
	);
}
