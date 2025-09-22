"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServiceData } from "./types";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RAlertDialog from "@/RComponents/RAlertDialog";
import { useRouter } from "next/navigation";

interface SortableServiceCardProps extends ServiceData {
	onDelete?: (serviceId: string) => void;
}

export default function SortableServiceCard({
	id,
	title,
	excerpt,
	category,
	status,
	order,
	icon,
	href,
	lastUpdated,
	translations,
	onDelete,
}: SortableServiceCardProps) {
	const router = useRouter();
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const handleEdit = () => {
		router.push(`/dashboard/services/${id}?isEdit=true`);
	};

	const handleDelete = () => {
		if (onDelete) {
			onDelete(id);
		}
	};

	return (
		<RCard
			cardClassName="relative flex flex-col h-full"
			contentClassName="flex flex-col h-full pb-3"
			contentComponent={
				<div className="flex flex-col h-full" ref={setNodeRef} style={style} {...attributes}>
					<RFlex className="items-center justify-between mb-4">
						<RFlex className="items-center gap-3">
							<div className="flex items-center gap-2">
								<div
									{...listeners}
									className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
									title="Drag to reorder"
								>
									<i className="fas fa-grip-vertical h-4 w-4 text-muted-foreground"></i>
								</div>
								<i className={`${icon} h-5 w-5 text-muted-foreground`}></i>
							</div>
							<RFlex className="flex-col">
								<h3 className="text-lg font-semibold">{title}</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{excerpt}</p>
								<RFlex className="items-center gap-2 mt-1">
									<Badge variant="outline" className="text-xs">
										{category}
									</Badge>
									<Badge variant={status === "published" ? "default" : "secondary"} className="text-xs">
										{status}
									</Badge>
									<Badge variant="outline" className="text-xs">
										Order: {order}
									</Badge>
								</RFlex>
							</RFlex>
						</RFlex>
						<RFlex className="items-center gap-2">
							<RButton variant="ghost" size="sm" onClick={handleEdit} className="h-8 w-8 p-0" icon="fas fa-edit" />
							<RAlertDialog
								component={<RButton variant="ghost" size="sm" className="h-8 w-8 p-0" icon="fas fa-trash" />}
								title="Delete Service"
								description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
								confirmText="Delete"
								confirmAction={handleDelete}
								confirmClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							/>
						</RFlex>
					</RFlex>
					<div className="flex-1 flex flex-col justify-end">
						<RFlex className="flex-col space-y-3">
							<Button asChild className="w-full">
								<Link href={href || `/dashboard/services/${id}`}>View Details</Link>
							</Button>
							<div className="flex flex-wrap gap-1">
								{translations.map((translation) => (
									<Badge key={translation.id} variant="secondary" className="text-xs">
										{translation.locale.toUpperCase()}
									</Badge>
								))}
							</div>
							{lastUpdated && <p className="text-xs text-muted-foreground text-center">Last updated: {lastUpdated}</p>}
						</RFlex>
					</div>
				</div>
			}
		/>
	);
}
