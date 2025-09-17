"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface DashboardStats {
	totalPages: number;
	blogPosts: number;
	mediaFiles: number;
	activeUsers: number;
	totalViews: number;
	conversionRate: number;
	avgSessionTime: string;
	bounceRate: number;
}

const dashboardStats: DashboardStats = {
	totalPages: 24,
	blogPosts: 156,
	mediaFiles: 1234,
	activeUsers: 8,
	totalViews: 45678,
	conversionRate: 3.2,
	avgSessionTime: "2m 34s",
	bounceRate: 42.1,
};

export default function DashboardStatistics() {
	return (
		<>
			{/* Enhanced Analytics Cards with Different Layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<RCard
					cardClassName="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
					contentClassName="p-6"
					contentComponent={
						<RFlex className="items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
								<i className="fas fa-file-alt text-white text-lg"></i>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Pages</p>
								<p className="text-3xl font-bold text-blue-600">{dashboardStats.totalPages}</p>
								<RFlex className="items-center gap-1 text-xs text-green-600">
									<i className="fas fa-arrow-up text-xs"></i>
									+2 from last month
								</RFlex>
							</div>
						</RFlex>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
					contentClassName="p-6"
					contentComponent={
						<RFlex className="items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
								<i className="fas fa-blog text-white text-lg"></i>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Blog Posts</p>
								<p className="text-3xl font-bold text-green-600">{dashboardStats.blogPosts}</p>
								<RFlex className="items-center gap-1 text-xs text-green-600">
									<i className="fas fa-arrow-up text-xs"></i>
									+12 from last month
								</RFlex>
							</div>
						</RFlex>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20"
					contentClassName="p-6"
					contentComponent={
						<RFlex className="items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
								<i className="fas fa-images text-white text-lg"></i>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Media Files</p>
								<p className="text-3xl font-bold text-purple-600">{dashboardStats.mediaFiles.toLocaleString()}</p>
								<RFlex className="items-center gap-1 text-xs text-green-600">
									<i className="fas fa-arrow-up text-xs"></i>
									+89 from last month
								</RFlex>
							</div>
						</RFlex>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
					contentClassName="p-6"
					contentComponent={
						<RFlex className="items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
								<i className="fas fa-users text-white text-lg"></i>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Active Users</p>
								<p className="text-3xl font-bold text-orange-600">{dashboardStats.activeUsers}</p>
								<RFlex className="items-center gap-1 text-xs text-green-600">
									<i className="fas fa-arrow-up text-xs"></i>
									+1 from last month
								</RFlex>
							</div>
						</RFlex>
					}
				/>
			</div>

			{/* Performance Metrics Row */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<RCard
					cardClassName="border-0 shadow-xl"
					contentClassName="p-6"
					contentComponent={
						<>
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Total Views</p>
									<p className="text-2xl font-bold">{dashboardStats.totalViews.toLocaleString()}</p>
								</div>
								<i className="fas fa-eye text-blue-600 text-2xl"></i>
							</RFlex>
							<div className="mt-4">
								<div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
									<div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: "75%" }}></div>
								</div>
								<p className="text-xs text-muted-foreground mt-2">+15% from last week</p>
							</div>
						</>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-xl"
					contentClassName="p-6"
					contentComponent={
						<>
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Conversion Rate</p>
									<p className="text-2xl font-bold">{dashboardStats.conversionRate}%</p>
								</div>
								<i className="fas fa-bullseye text-green-600 text-2xl"></i>
							</RFlex>
							<div className="mt-4">
								<div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
									<div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: `${dashboardStats.conversionRate * 10}%` }}></div>
								</div>
								<p className="text-xs text-muted-foreground mt-2">+0.3% from last week</p>
							</div>
						</>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-xl"
					contentClassName="p-6"
					contentComponent={
						<>
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Avg. Session</p>
									<p className="text-2xl font-bold">{dashboardStats.avgSessionTime}</p>
								</div>
								<i className="fas fa-clock text-purple-600 text-2xl"></i>
							</RFlex>
							<div className="mt-4">
								<div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
									<div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: "65%" }}></div>
								</div>
								<p className="text-xs text-muted-foreground mt-2">+12s from last week</p>
							</div>
						</>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-xl"
					contentClassName="p-6"
					contentComponent={
						<>
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Bounce Rate</p>
									<p className="text-2xl font-bold">{dashboardStats.bounceRate}%</p>
								</div>
								<i className="fas fa-arrow-down text-red-600 text-2xl"></i>
							</RFlex>
							<div className="mt-4">
								<div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
									<div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: `${dashboardStats.bounceRate}%` }}></div>
								</div>
								<p className="text-xs text-muted-foreground mt-2">-2.1% from last week</p>
							</div>
						</>
					}
				/>
			</div>
		</>
	);
}
