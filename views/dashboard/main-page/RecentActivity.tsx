"use client";

import { Badge } from "@/components/ui/badge";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface RecentActivity {
	id: string;
	type: "content" | "user" | "system" | "security";
	title: string;
	description: string;
	timestamp: string;
	user: string;
	status: "success" | "warning" | "error" | "info";
}

const recentActivities: RecentActivity[] = [
	{
		id: "1",
		type: "content",
		title: "Homepage hero updated",
		description: "Updated hero section with new messaging and call-to-action",
		timestamp: "2 hours ago",
		user: "Admin User",
		status: "success",
	},
	{
		id: "2",
		type: "content",
		title: "New blog post published",
		description: "Published 'Best Practices for React Components' by Sarah Editor",
		timestamp: "5 hours ago",
		user: "Content Editor",
		status: "success",
	},
	{
		id: "3",
		type: "user",
		title: "New user registration",
		description: "Alex Smith registered and completed profile setup",
		timestamp: "1 day ago",
		user: "System",
		status: "info",
	},
	{
		id: "4",
		type: "system",
		title: "Database backup completed",
		description: "Daily backup completed successfully with 99.9% data integrity",
		timestamp: "1 day ago",
		user: "System",
		status: "success",
	},
	{
		id: "5",
		type: "security",
		title: "Failed login attempts detected",
		description: "Multiple failed attempts from IP 192.168.1.103",
		timestamp: "2 days ago",
		user: "Security System",
		status: "warning",
	},
	{
		id: "6",
		type: "content",
		title: "Service page content reviewed",
		description: "All service descriptions updated and approved",
		timestamp: "3 days ago",
		user: "Content Reviewer",
		status: "success",
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "success":
			return "bg-green-500";
		case "warning":
			return "bg-yellow-500";
		case "error":
			return "bg-red-500";
		case "info":
			return "bg-blue-500";
		default:
			return "bg-gray-500";
	}
};

const getStatusIcon = (status: string) => {
	switch (status) {
		case "success":
			return "fas fa-check-circle";
		case "warning":
			return "fas fa-exclamation-triangle";
		case "error":
			return "fas fa-times-circle";
		case "info":
			return "fas fa-info-circle";
		default:
			return "fas fa-info-circle";
	}
};

const getTypeIcon = (type: string) => {
	switch (type) {
		case "content":
			return "fas fa-file-alt";
		case "user":
			return "fas fa-user";
		case "system":
			return "fas fa-cog";
		case "security":
			return "fas fa-shield-alt";
		default:
			return "fas fa-activity";
	}
};

export default function RecentActivity() {
	return (
		<RCard
			cardClassName="lg:col-span-2 border-0 shadow-xl"
			title={
				<RFlex className="items-center gap-2 text-2xl">
					<i className="fas fa-history text-slate-600 text-xl"></i>
					Recent Activity
				</RFlex>
			}
			description="Latest updates and changes across your site"
			contentComponent={
				<div className="space-y-4">
					{recentActivities.map((activity) => {
						const statusIconClass = getStatusIcon(activity.status);
						const typeIconClass = getTypeIcon(activity.type);

						return (
							<div
								key={activity.id}
								className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
							>
								<div className="relative">
									<div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
										<i className={`${typeIconClass} text-slate-600 text-sm`}></i>
									</div>
									<div
										className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor(
											activity.status
										)} rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center`}
									>
										<i className={`${statusIconClass} text-white text-xs`}></i>
									</div>
								</div>
								<div className="flex-1">
									<RFlex className="items-center gap-2 mb-1">
										<h4 className="font-semibold">{activity.title}</h4>
										<Badge variant="outline" className="text-xs">
											{activity.type}
										</Badge>
									</RFlex>
									<p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
									<RFlex className="items-center gap-4 text-xs text-muted-foreground">
										<RFlex className="items-center gap-1">
											<i className="fas fa-clock text-xs"></i>
											{activity.timestamp}
										</RFlex>
										<RFlex className="items-center gap-1">
											<i className="fas fa-user text-xs"></i>
											{activity.user}
										</RFlex>
									</RFlex>
								</div>
							</div>
						);
					})}
				</div>
			}
		/>
	);
}
