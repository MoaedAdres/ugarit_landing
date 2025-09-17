"use client";

import {
	DashboardHeader,
	DashboardStatistics,
	DashboardCharts,
	RecentActivity,
	QuickActions,
	SystemStatus,
} from "@/views/dashboard/main-page";



export default function DashboardPage() {
	return (
		<div className="space-y-8">
			<DashboardHeader />
			<DashboardStatistics />
			<DashboardCharts />
			
			{/* Main Content Area */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<RecentActivity />
				<QuickActions />
			</div>
			
			<SystemStatus />
		</div>
	);
}
