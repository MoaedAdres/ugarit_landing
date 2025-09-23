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
import { useRouter } from "next/navigation";

interface SortableSectionCardProps extends SectionData {
	onToggle: (sectionId: string) => void;
	isToggling?: boolean;
}

export default function SortableSectionCard({
	id,
	title,
	description,
	icon,
	href,
	isActive,
	lastUpdated,
	onToggle,
	isToggling = false,
}: SortableSectionCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	const router = useRouter();
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	// Don't render the card content when dragging to improve performance
	if (isDragging) {
		return (
			<RCard ref={setNodeRef} style={style} cardClassName="opacity-30 border-dashed border-2" contentComponent={<div className="h-48" />} />
		);
	}

	return (
		<RCard
			ref={setNodeRef}
			style={style}
			cardClassName="relative flex flex-col h-full"
			contentClassName="flex flex-col h-full"
			contentComponent={
				<div className="flex flex-col h-full">
					<RFlex className="items-center justify-between mb-4">
						<RFlex className="items-center gap-3">
							<div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none">
								<i className="fas fa-grip-vertical h-4 w-4 text-muted-foreground"></i>
							</div>
							<RFlex className="flex-col">
								<h3 className="text-lg font-semibold">{title}</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{description}</p>
							</RFlex>
						</RFlex>
						<RFlex className="items-center gap-2">
							<Badge className="min-w-[60px]" variant={isActive ? "default" : "secondary"}>
								{isActive ? "Active" : "Inactive"}
							</Badge>
							<RButton
								variant="ghost"
								size="sm"
								onClick={() => onToggle(id)}
								className="h-8 w-8 p-0"
								icon={isToggling ? "fas fa-spinner fa-spin" : isActive ? "fas fa-eye" : "fas fa-eye-slash"}
								disabled={isToggling}
							/>
							<RButton
								variant="ghost"
								size="sm"
								onClick={() => router.push(`/dashboard/home/${id}?isEdit=true`)}
								className="h-8 w-8 p-0"
								icon={"fas fa-edit"}
							/>
						</RFlex>
					</RFlex>
					<div className="flex-1 flex flex-col justify-end">
						<RFlex className="flex-col space-y-3">
							{href ? (
								<Button asChild className="w-full">
									<Link href={href}>View Section</Link>
								</Button>
							) : (
								<RButton className="w-full" disabled text="Coming Soon" />
							)}
							{lastUpdated && <p className="text-xs text-muted-foreground text-center">Last updated: {lastUpdated}</p>}
						</RFlex>
					</div>
				</div>
			}
		/>
	);
}
