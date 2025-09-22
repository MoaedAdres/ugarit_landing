"use client";

import { CategoryDetails } from "@/views/dashboard/categories/view";
import { useParams } from "next/navigation";

export default function CategoryPage() {
	const params = useParams();
	const categoryId = parseInt(params.id as string);

	return (
		<div className="container mx-auto py-6">
			<div className="max-w-4xl mx-auto">
				<CategoryDetails categoryId={categoryId} />
			</div>
		</div>
	);
}
