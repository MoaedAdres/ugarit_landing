"use client";

import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";

interface HomeHeaderProps {
	onSaveOrder: () => void;
}

export default function HomeHeader({ onSaveOrder }: HomeHeaderProps) {
	return (
		<RFlex className="items-center justify-between">
			<RFlex className="flex-col">
				<h1 className="text-3xl font-bold tracking-tight">Home Page Management</h1>
				<p className="text-muted-foreground">Manage all sections of your landing page. Drag sections to reorder them.</p>
			</RFlex>
			<RFlex className="gap-2">
				<RButton variant="outline" onClick={onSaveOrder} icon="fas fa-save" text="Save Order" />
				<RButton icon="fas fa-eye" text="Preview Landing Page" />
			</RFlex>
		</RFlex>
	);
}
