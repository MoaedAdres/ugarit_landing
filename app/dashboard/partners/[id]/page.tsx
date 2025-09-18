"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ViewPartner, EditPartner } from "@/views/dashboard/partners";

// Mock partner data (to be replaced with actual data fetching)
const mockPartner = {
	id: 1,
	name: "Microsoft",
	type: "Technology Partner",
	category: "Cloud Services",
	logo: "/logos/microsoft.png",
	website: "https://microsoft.com",
	status: "active",
	featured: true,
	partnershipDate: "2023-01-15",
	description: "Leading cloud infrastructure and productivity solutions provider with comprehensive enterprise solutions.",
	benefits: ["Azure Credits", "Technical Support", "Co-marketing", "Training Programs"],
	location: "Redmond, WA",
	contact: "partner@microsoft.com",
	phone: "+1 (425) 882-8080",
	renewalDate: "2024-12-31",
	revenue: "$2.5M",
	projects: 15,
	teamSize: 250,
	contractValue: "$5.2M",
	lastContact: "2024-01-10",
	nextMeeting: "2024-02-15",
	keyContacts: [
		{ name: "Sarah Johnson", role: "Partnership Manager", email: "sarah.j@microsoft.com" },
		{ name: "Mike Chen", role: "Technical Lead", email: "mike.c@microsoft.com" }
	],
	agreements: [
		{ name: "Master Service Agreement", status: "Active", expiry: "2024-12-31" },
		{ name: "NDA", status: "Active", expiry: "2025-01-15" }
	],
	updatedAt: "2 days ago",
};

export default function PartnerPage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const [partner, setPartner] = useState(mockPartner);

	const isEdit = searchParams.get('isEdit') === 'true';

	return isEdit ? (
		<EditPartner partner={partner} setPartner={setPartner} />
	) : (
		<ViewPartner partner={partner} />
	);
}
