"use client";

import { SectionDetails } from "@/views/dashboard/home/view";
import { useParams } from "next/navigation";

export default function SectionPage() {
	const params = useParams();
	const sectionId = parseInt(params.id as string);

	return (
		<div className="container mx-auto py-6">
			<div className="max-w-4xl mx-auto">
				<SectionDetails sectionId={sectionId} />
			</div>
		</div>
	);
}
