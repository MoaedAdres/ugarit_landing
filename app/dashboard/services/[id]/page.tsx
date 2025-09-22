"use client";

import { ServiceDetails } from "@/views/dashboard/services/view";
import { useParams } from "next/navigation";

export default function ServicePage() {
	const params = useParams();
	const serviceId = parseInt(params.id as string);

	return (
		<div className="container mx-auto py-6">
			<div className="max-w-6xl mx-auto">
				<ServiceDetails serviceId={serviceId} />
			</div>
		</div>
	);
}