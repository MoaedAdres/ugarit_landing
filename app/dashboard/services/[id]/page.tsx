"use client";

import { useSearchParams } from "next/navigation";
import { ViewService, EditService } from "@/views/dashboard/services";

export default function ServicePage() {
	const searchParams = useSearchParams();
	const isEdit = searchParams.get("isEdit") === "true";

	return isEdit ? <EditService /> : <ViewService />;
}
