"use client";

import { useSearchParams } from "next/navigation";
import { ViewBlogPost, EditBlogPost } from "@/views/dashboard/blog";

export default function BlogPostPage() {
	const searchParams = useSearchParams();
	const isEdit = searchParams.get("isEdit") === "true";

	return isEdit ? <EditBlogPost /> : <ViewBlogPost />;
}
