"use client";

import RFlex from "@/RComponents/RFlex";

export default function ServicesHeader() {
	return (
		<RFlex className="items-center justify-between">
			<RFlex className="flex-col">
				<h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
				<p className="text-muted-foreground">Manage your services and their translations.</p>
			</RFlex>
		</RFlex>
	);
}
