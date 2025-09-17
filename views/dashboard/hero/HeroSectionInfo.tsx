"use client";

import { Badge } from "@/components/ui/badge";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface HeroData {
	isActive: boolean;
	textAlignment: string;
	lastUpdated: string;
	createdAt: string;
}

interface HeroSectionInfoProps {
	heroData: HeroData;
}

export default function HeroSectionInfo({ heroData }: HeroSectionInfoProps) {
	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			headerClassName="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20"
			title={
				<RFlex className="items-center gap-2">
					<i className="fas fa-info-circle text-slate-600"></i>
					Section Info
				</RFlex>
			}
			contentClassName="space-y-4 p-6"
			contentComponent={
				<>
					<RFlex className="items-center justify-between">
						<span className="text-sm text-muted-foreground">Status</span>
						<Badge variant={heroData.isActive ? "default" : "secondary"}>
							{heroData.isActive ? "Active" : "Inactive"}
						</Badge>
					</RFlex>
					<RFlex className="items-center justify-between">
						<span className="text-sm text-muted-foreground">Alignment</span>
						<Badge variant="outline" className="capitalize">{heroData.textAlignment}</Badge>
					</RFlex>
					<RFlex className="items-center justify-between">
						<span className="text-sm text-muted-foreground">Last Updated</span>
						<span className="text-sm font-medium">{heroData.lastUpdated}</span>
					</RFlex>
					<RFlex className="items-center justify-between">
						<span className="text-sm text-muted-foreground">Created</span>
						<span className="text-sm font-medium">{heroData.createdAt}</span>
					</RFlex>
				</>
			}
		/>
	);
}
