"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionData } from "./types";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface DragOverlayCardProps {
	section: SectionData;
}

export default function DragOverlayCard({ section }: DragOverlayCardProps) {
	return (
		<RCard
			cardClassName="relative flex flex-col justify-between shadow-lg rotate-3 scale-105"
			contentClassName="pb-3"
			contentComponent={
				<>
					<RFlex className="items-center justify-between">
						<RFlex className="items-center gap-3">
							<i className="fas fa-grip-vertical h-4 w-4 text-muted-foreground"></i>
							<i className={`${section.icon} h-5 w-5 text-muted-foreground`}></i>
							<RFlex className="flex-col">
								<h3 className="text-lg font-semibold">{section.title}</h3>
								<p className="text-sm text-muted-foreground">{section.description}</p>
							</RFlex>
						</RFlex>
						<Badge variant={section.isActive ? "default" : "secondary"}>{section.isActive ? "Active" : "Inactive"}</Badge>
					</RFlex>
					<RFlex className="flex-col space-y-3 mt-4">
						<Button className="w-full">Manage Section</Button>
						<p className="text-xs text-muted-foreground text-center">Last updated: {section.lastUpdated}</p>
					</RFlex>
				</>
			}
		/>
	);
}
