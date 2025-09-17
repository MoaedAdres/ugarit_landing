"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionData } from "./types";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";

interface SortableSectionCardProps extends SectionData {
	onToggle: (sectionId: string) => void;
}

export default function SortableSectionCard({ 
	id, 
	title, 
	description, 
	icon, 
	href, 
	isActive, 
	lastUpdated, 
	onToggle 
}: SortableSectionCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	// Don't render the card content when dragging to improve performance
	if (isDragging) {
		return (
			<RCard
				ref={setNodeRef}
				style={style}
				cardClassName="opacity-30 border-dashed border-2"
				contentComponent={<div className="h-48" />}
			/>
		);
	}

	return (
		<RCard
			ref={setNodeRef}
			style={style}
			cardClassName="relative flex flex-col justify-between"
			contentClassName="pb-3"
			contentComponent={
				<>
					<RFlex className="items-center justify-between">
						<RFlex className="items-center gap-3">
							<div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none">
								<i className="fas fa-grip-vertical h-4 w-4 text-muted-foreground"></i>
							</div>
							<i className={`${icon} h-5 w-5 text-muted-foreground`}></i>
							<RFlex className="flex-col">
								<h3 className="text-lg font-semibold">{title}</h3>
								<p className="text-sm text-muted-foreground">{description}</p>
							</RFlex>
						</RFlex>
						<RFlex className="items-center gap-2">
							<Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Inactive"}</Badge>
							<RButton 
								variant="ghost" 
								size="sm" 
								onClick={() => onToggle(id)} 
								className="h-8 w-8 p-0"
								icon={isActive ? "fas fa-eye-slash" : "fas fa-eye"}
							/>
						</RFlex>
					</RFlex>
					<RFlex className="flex-col space-y-3 mt-4">
						{href ? (
							<Button asChild className="w-full">
								<Link href={href}>Manage Section</Link>
							</Button>
						) : (
							<RButton className="w-full" disabled text="Coming Soon" />
						)}
						{lastUpdated && <p className="text-xs text-muted-foreground text-center">Last updated: {lastUpdated}</p>}
					</RFlex>
				</>
			}
		/>
	);
}
