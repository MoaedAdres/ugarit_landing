"use client";

import RFlex from "@/RComponents/RFlex";

export default function CategoriesHeader() {
	return (
		<RFlex className="items-center justify-between">
			<RFlex className="flex-col">
				<h1 className="text-3xl font-bold tracking-tight">Categories Management</h1>
				<p className="text-muted-foreground">Manage your content categories and their translations.</p>
			</RFlex>
		</RFlex>
	);
}
