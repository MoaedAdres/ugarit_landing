"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { CaseStudyData } from "./types";
import { getIconUrl } from "@/utils/helperFunctions";

interface DragOverlayCardProps {
    caseStudy: CaseStudyData;
}

export default function DragOverlayCard({ caseStudy }: DragOverlayCardProps) {
    return (
        <RCard
            cardClassName="relative flex flex-col h-full shadow-2xl border-2 border-primary/50 bg-background/95 backdrop-blur-sm"
            contentClassName="flex flex-col h-full pb-3"
            contentComponent={
                <div className="flex flex-col h-full">
                    <RFlex className="items-center justify-between mb-4">
                        <RFlex className="items-center gap-1">
                            <div className="cursor-grabbing p-0">
                                <i className="fas fa-grip-vertical h-4 w-4 text-muted-foreground"></i>
                            </div>
                            <RFlex className="items-center gap-3">
                                {caseStudy.logo ? (
                                    <img src={getIconUrl(caseStudy.logo)} alt={`${caseStudy.client_name} logo`} className="h-10 w-10 object-contain" />
                                ) : (
                                    <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                                        <i className="fas fa-building h-5 w-5 text-muted-foreground"></i>
                                    </div>
                                )}
                                <RFlex className="flex-col">
                                    <h3 className="text-lg font-semibold">{caseStudy.client_name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{caseStudy.problem}</p>
                                    <RFlex className="items-center gap-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                            {caseStudy.sector}
                                        </Badge>
                                        <Badge variant={caseStudy.status === "published" ? "default" : "secondary"} className="text-xs">
                                            {caseStudy.status}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            Order: {caseStudy.order}
                                        </Badge>
                                    </RFlex>
                                </RFlex>
                            </RFlex>
                        </RFlex>
                    </RFlex>
                    
                    {/* Results KPIs */}
                    {caseStudy.results_kpis && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                            <RFlex className="items-center gap-2 mb-2">
                                <i className="fas fa-chart-line h-4 w-4 text-green-600"></i>
                                <span className="text-sm font-medium text-green-800 dark:text-green-200">Key Results</span>
                            </RFlex>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(caseStudy.results_kpis).map(([key, value]) => (
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
                    {caseStudy.testimonial && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <RFlex className="items-center gap-2 mb-1">
                                <i className="fas fa-quote-left h-3 w-3 text-blue-600"></i>
                                <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Testimonial</span>
                            </RFlex>
                            <p className="text-xs text-blue-700 dark:text-blue-300 line-clamp-2">
                                "{caseStudy.testimonial.quote}"
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                - {caseStudy.testimonial.name}, {caseStudy.testimonial.role}
                            </p>
                        </div>
                    )}

                    <div className="flex-1 flex flex-col justify-end">
                        <RFlex className="flex-col space-y-3">
                            <div className="flex flex-wrap gap-1">
                                {caseStudy.translations.map((translation) => (
                                    <Badge key={translation.id} variant="secondary" className="text-xs">
                                        {translation.locale.toUpperCase()}
                                    </Badge>
                                ))}
                            </div>
                        </RFlex>
                    </div>
                </div>
            }
        />
    );
}
