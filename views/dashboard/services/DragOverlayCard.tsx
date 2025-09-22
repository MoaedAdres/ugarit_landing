"use client";

import { Badge } from "@/components/ui/badge";
import { ServiceData } from "./types";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import { getIconUrl } from "@/utils/helperFunctions";

interface DragOverlayCardProps {
	service: ServiceData;
}

export default function DragOverlayCard({ service }: DragOverlayCardProps) {
	return (
		<RCard
			cardClassName="relative flex flex-col h-full opacity-90 shadow-lg"
			contentClassName="flex flex-col h-full pb-3"
			contentComponent={
				<div className="flex flex-col h-full">
					<RFlex className="items-center justify-between mb-4">
						<RFlex className="items-center gap-3">
							<div className="flex items-center gap-2">
								<i className="fas fa-grip-vertical h-4 w-4 text-muted-foreground"></i>
								{service.icon.startsWith('http') || service.icon.startsWith('/') ? (
									<img src={getIconUrl(service.icon)} alt={`${service.title} icon`} className="h-5 w-5 object-contain" />
								) : (
									<i className={`${service.icon} h-5 w-5 text-muted-foreground`}></i>
								)}
							</div>
							<RFlex className="flex-col">
								<h3 className="text-lg font-semibold">{service.title}</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{service.excerpt}</p>
								<RFlex className="items-center gap-2 mt-1">
									<Badge variant="outline" className="text-xs">
										{service.category}
									</Badge>
									<Badge variant={service.status === "published" ? "default" : "secondary"} className="text-xs">
										{service.status}
									</Badge>
									<Badge variant="outline" className="text-xs">
										Order: {service.order}
									</Badge>
								</RFlex>
							</RFlex>
						</RFlex>
					</RFlex>
					<div className="flex-1 flex flex-col justify-end">
						<RFlex className="flex-col space-y-3">
							<div className="flex flex-wrap gap-1">
								{service.translations.map((translation) => (
									<Badge key={translation.id} variant="secondary" className="text-xs">
										{translation.locale.toUpperCase()}
									</Badge>
								))}
							</div>
							{service.lastUpdated && <p className="text-xs text-muted-foreground text-center">Last updated: {service.lastUpdated}</p>}
						</RFlex>
					</div>
				</div>
			}
		/>
	);
}
