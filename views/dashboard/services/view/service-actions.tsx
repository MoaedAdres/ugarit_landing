"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Service } from "@/api/services/dashboard/services/interfaces";
import { servicesRepository } from "@/api/services/dashboard/services";
import { useMutateData } from "@/hooks/use-mutate-data";
import { useToast } from "@/hooks/use-toast";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RAlertDialog from "@/RComponents/RAlertDialog";

interface ServiceActionsProps {
	service: Service;
	onEdit: () => void;
	onDelete: () => void;
}

export const ServiceActions = ({ service, onEdit, onDelete }: ServiceActionsProps) => {
	const router = useRouter();
	const { toast } = useToast();

	const { mutate: deleteService, isPending } = useMutateData({
		mutationFn: () => servicesRepository.deleteService(service.id),
		onSuccessFn: () => {
			toast({
				title: "Success",
				description: "Service deleted successfully",
			});
			onDelete();
		},
		onErrorFn: () => {
			toast({
				title: "Error",
				description: "Failed to delete service",
				variant: "destructive",
			});
		},
	});

	const handleDelete = () => {
		deleteService(undefined);
	};

	return (
		<RFlex className="gap-2">
			<RButton
				variant="outline"
				onClick={onEdit}
				icon="fas fa-edit"
				text="Edit"
			/>
			<RAlertDialog
				component={
					<button
						className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
					>
						<i className="fas fa-trash w-4 h-4 mr-2" />
						Delete
					</button>
				}
				title="Are you sure?"
				description={`This action cannot be undone. This will permanently delete the service "${service.title}".`}
				confirmText={isPending ? "Deleting..." : "Delete"}
				confirmAction={handleDelete}
				loading={isPending}
				confirmClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
			/>
		</RFlex>
	);
};