"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CaseStudyData } from "./types";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RAlertDialog from "@/RComponents/RAlertDialog";
import { useRouter } from "next/navigation";
import { getIconUrl } from "@/utils/helperFunctions";

interface SortableCaseStudyCardProps extends CaseStudyData {
	onDelete?: (caseStudyId: string) => void;
}

export default function SortableCaseStudyCard({
	id,
	client_name,
	sector,
	problem,
	solution,
	status,
	order,
	logo,
	images,
	results_kpis,
	testimonial,
	translations,
	lastUpdated,
	href,
	onDelete,
}: SortableCaseStudyCardProps) {
	const router = useRouter();
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const handleEdit = () => {
		router.push(`/dashboard/case-studies/${id}?isEdit=true`);
	};

	const handleDelete = () => {
		if (onDelete) {
			onDelete(id);
		}
	};

	const coverImage = images && images.length > 0 ? images[0] : undefined;
	const statusStyles =
		status === "published"
			? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-800"
			: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-800";

	return (
		<RCard
			cardClassName="relative flex flex-col h-full overflow-hidden group border-0 shadow-sm hover:shadow-lg transition"
			contentClassName="flex flex-col h-full p-0"
			contentComponent={
				<div ref={setNodeRef} style={style} className="flex flex-col h-full">
					{/* Cover */}
					<div className="relative h-28 w-full overflow-hidden">
						<div
							className={`absolute inset-0 ${
								!coverImage ? "bg-gradient-to-br from-primary/10 to-muted/40 dark:from-primary/10 dark:to-muted/10" : ""
							}`}
						></div>
					{coverImage && (
						<img
							src={getIconUrl(coverImage)}
							alt={`${client_name} cover`}
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 z-0 pointer-events-none"
						/>
					)}
						{/* Drag handle */}
						<div className="absolute top-2 left-2">
							<button
								{...listeners}
								{...attributes}
								className="cursor-grab active:cursor-grabbing rounded-md bg-background/80 backdrop-blur px-2 py-1 text-xs border"
								title="Drag to reorder"
							>
								<i className="fas fa-grip-vertical text-muted-foreground"></i>
							</button>
						</div>
						{/* Status */}
						<div className="absolute top-2 right-2">
							<span className={`px-2 py-1 text-[10px] rounded-md border ${statusStyles}`}>{status}</span>
						</div>
					</div>

					{/* Header */}
					<div className="px-4 -mt-6 relative z-10">
						<div className="flex items-start gap-3">
							<div className="h-12 w-12 rounded-lg ring-2 ring-background overflow-hidden bg-muted flex items-center justify-center">
								{logo ? (
									<img src={getIconUrl(logo)} alt={`${client_name} logo`} className="h-12 w-12 object-contain" />
								) : (
									<i className="fas fa-building h-5 w-5 text-muted-foreground"></i>
								)}
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="text-base font-semibold truncate">{client_name}</h3>
								<div className="flex items-center gap-2 mt-1">
									<Badge variant="outline" className="text-[10px] px-2 py-0.5">
										{sector}
									</Badge>
									<Badge variant="outline" className="text-[10px] px-2 py-0.5">
										Order #{order}
									</Badge>
								</div>
							</div>
							<div className="flex items-center gap-1">
								<RButton variant="ghost" size="sm" onClick={handleEdit} className="h-8 w-8 p-0" icon="fas fa-edit" />
								<RAlertDialog
									component={<RButton variant="ghost" size="sm" className="h-8 w-8 p-0" icon="fas fa-trash" />}
									title="Delete Case Study"
									description={`Are you sure you want to delete "${client_name}"? This action cannot be undone.`}
									confirmText="Delete"
									confirmAction={handleDelete}
									confirmClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								/>
							</div>
						</div>
					</div>

					{/* Body */}
					<div className="px-4 pt-3 pb-4 flex flex-col gap-3">
						<p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{problem}</p>

						{/* KPIs condensed chips */}
						{results_kpis && Object.keys(results_kpis).length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{Object.entries(results_kpis)
									.slice(0, 4)
									.map(([key, value]) => (
										<span
											key={key}
											className="text-[10px] px-2 py-1 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
										>
											{key.replace(/_/g, " ")}: <span className="font-semibold">{value}</span>
										</span>
									))}
								{Object.entries(results_kpis).length > 4 && (
									<span className="text-[10px] px-2 py-1 rounded-md bg-muted border">+{Object.entries(results_kpis).length - 4} more</span>
								)}
							</div>
						)}

						{/* Testimonial (compact) */}
						{testimonial && (
							<div className="rounded-md border bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 p-2">
								<p className="text-[11px] text-blue-700 dark:text-blue-300 line-clamp-2">"{testimonial.quote}"</p>
								<p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1">
									- {testimonial.name}, {testimonial.role}
								</p>
							</div>
						)}

						{/* Footer */}
						<div className="mt-auto flex items-end justify-between">
							<div className="flex flex-wrap gap-1">
								{translations.map((translation) => (
									<Badge key={translation.id} variant="secondary" className="text-[10px]">
										{translation.locale.toUpperCase()}
									</Badge>
								))}
							</div>
							<Button asChild size="sm" className="h-8">
								<Link href={href || `/dashboard/case-studies/${id}`}>View</Link>
							</Button>
						</div>
						{lastUpdated && <p className="text-[10px] text-muted-foreground mt-2">Last updated: {lastUpdated}</p>}
					</div>
				</div>
			}
		/>
	);
}
