"use client";

import { useSearchParams } from "next/navigation";
import { ViewTestimonial, EditTestimonial } from "@/views/dashboard/testimonials";

export default function TestimonialPage() {
	const searchParams = useSearchParams();
	const isEdit = searchParams.get("isEdit") === "true";

	return isEdit ? <EditTestimonial /> : <ViewTestimonial />;
}
