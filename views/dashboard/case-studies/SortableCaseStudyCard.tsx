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

    return (
        <RCard
            cardClassName="relative flex flex-col h-full"
            contentClassName="flex flex-col h-full pb-3"
            contentComponent={
                <div className="flex flex-col h-full" ref={setNodeRef} style={style}>
                    <RFlex className="items-center justify-between mb-4">
                        <RFlex className="items-center gap-1">
                            <div
                                {...listeners}
                                {...attributes}
                                className="cursor-grab active:cursor-grabbing p-0 hover:bg-muted rounded"
                                title="Drag to reorder"
                            >
                                <i className="fas fa-grip-vertical h-4 w-4 text-muted-foreground"></i>
                            </div>
                            <RFlex className="items-center gap-3">
                                {logo ? (
                                    <img src={getIconUrl(logo)} alt={`${client_name} logo`} className="h-10 w-10 object-contain" />
                                ) : (
                                    <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                                        <i className="fas fa-building h-5 w-5 text-muted-foreground"></i>
                                    </div>
                                )}
                                <RFlex className="flex-col">
                                    <h3 className="text-lg font-semibold">{client_name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{problem}</p>
                                    <RFlex className="items-center gap-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                            {sector}
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
                        </RFlex>
                        <RFlex className="items-center gap-2">
                            <RButton variant="ghost" size="sm" onClick={handleEdit} className="h-8 w-8 p-0" icon="fas fa-edit" />
                            <RAlertDialog
                                component={<RButton variant="ghost" size="sm" className="h-8 w-8 p-0" icon="fas fa-trash" />}
                                title="Delete Case Study"
                                description={`Are you sure you want to delete "${client_name}"? This action cannot be undone.`}
                                confirmText="Delete"
                                confirmAction={handleDelete}
                                confirmClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            />
                        </RFlex>
                    </RFlex>
                    
                    {/* Results KPIs */}
                    {results_kpis && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                            <RFlex className="items-center gap-2 mb-2">
                                <i className="fas fa-chart-line h-4 w-4 text-green-600"></i>
                                <span className="text-sm font-medium text-green-800 dark:text-green-200">Key Results</span>
                            </RFlex>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(results_kpis).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-xs">
                                        <span className="text-green-700 dark:text-green-300 capitalize">
                                            {key.replace(/_/g, ' ')}:
                                        </span>
                                        <span className="font-medium text-green-800 dark:text-green-200">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Testimonial Preview */}
                    {testimonial && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <RFlex className="items-center gap-2 mb-1">
                                <i className="fas fa-quote-left h-3 w-3 text-blue-600"></i>
                                <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Testimonial</span>
                            </RFlex>
                            <p className="text-xs text-blue-700 dark:text-blue-300 line-clamp-2">
                                "{testimonial.quote}"
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                - {testimonial.name}, {testimonial.role}
                            </p>
                        </div>
                    )}

                    <div className="flex-1 flex flex-col justify-end">
                        <RFlex className="flex-col space-y-3">
                            <Button asChild className="w-full">
                                <Link href={href || `/dashboard/case-studies/${id}`}>View Details</Link>
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
