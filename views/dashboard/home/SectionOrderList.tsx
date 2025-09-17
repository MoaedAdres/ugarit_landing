"use client";

import { Badge } from "@/components/ui/badge";
import { SectionData } from "./types";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface SectionOrderListProps {
	sections: SectionData[];
}

export default function SectionOrderList({ sections }: SectionOrderListProps) {
	return (
		<RCard
			title="Section Management"
			description="Current section order (top to bottom, left to right as they appear on your landing page)"
			contentComponent={
				<RFlex className="flex-col space-y-2">
					{sections.map((section, index) => (
						<RFlex key={section.id} className="items-center justify-between p-2 bg-muted rounded">
							<RFlex className="items-center gap-2">
								<span className="text-sm font-mono bg-background px-2 py-1 rounded">{index + 1}</span>
								<span className="text-sm">{section.title}</span>
							</RFlex>
							<Badge variant={section.isActive ? "default" : "secondary"} className="text-xs">
								{section.isActive ? "Active" : "Inactive"}
							</Badge>
						</RFlex>
					))}
				</RFlex>
			}
		/>
	);
}
