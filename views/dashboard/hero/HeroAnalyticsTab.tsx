"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface HeroData {
	views: number;
	clicks: number;
}

interface HeroAnalyticsTabProps {
	heroData: HeroData;
}

export default function HeroAnalyticsTab({ heroData }: HeroAnalyticsTabProps) {
	const clickRate = heroData.views > 0 ? ((heroData.clicks / heroData.views) * 100).toFixed(1) : 0;

	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			headerClassName="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
			title={
				<RFlex className="items-center gap-2">
					<i className="fas fa-chart-line text-orange-600"></i>
					Section Analytics
				</RFlex>
			}
			description="Performance metrics for this hero section"
			contentClassName="p-6"
			contentComponent={
				<RFlex className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<RFlex className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl flex-col">
						<div className="text-3xl font-bold text-blue-600">{heroData.views}</div>
						<div className="text-sm text-muted-foreground">Total Views</div>
					</RFlex>
					<RFlex className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl flex-col">
						<div className="text-3xl font-bold text-green-600">{heroData.clicks}</div>
						<div className="text-sm text-muted-foreground">Total Clicks</div>
					</RFlex>
					<RFlex className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl flex-col">
						<div className="text-3xl font-bold text-purple-600">{clickRate}%</div>
						<div className="text-sm text-muted-foreground">Click Rate</div>
					</RFlex>
				</RFlex>
			}
		/>
	);
}
