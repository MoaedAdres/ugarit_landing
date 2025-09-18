"use client";

import { useSearchParams } from "next/navigation";
import { ViewCaseStudy, EditCaseStudy } from "@/views/dashboard/case-studies";

export default function CaseStudyPage() {
	const searchParams = useSearchParams();
	const isEdit = searchParams.get("isEdit") === "true";

	return isEdit ? <EditCaseStudy /> : <ViewCaseStudy />;
}
