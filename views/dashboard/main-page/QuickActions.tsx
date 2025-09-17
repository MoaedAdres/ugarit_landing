"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface QuickAction {
	id: string;
	title: string;
	description: string;
	icon: string;
	href: string;
	color: string;
}

const quickActions: QuickAction[] = [
	{
		id: "1",
		title: "Create Blog Post",
		description: "Write and publish new content",
		icon: "fas fa-blog",
		href: "/dashboard/blog/add",
		color: "bg-blue-500",
	},
	{
		id: "2",
		title: "Upload Media",
		description: "Add images and files",
		icon: "fas fa-upload",
		href: "/dashboard/media",
		color: "bg-green-500",
	},
	{
		id: "3",
		title: "Manage Users",
		description: "View and edit user accounts",
		icon: "fas fa-users",
		href: "/dashboard/users",
		color: "bg-purple-500",
	},
	{
		id: "4",
		title: "View Analytics",
		description: "Check site performance",
		icon: "fas fa-chart-bar",
		href: "/dashboard/analytics",
		color: "bg-orange-500",
	},
	{
		id: "5",
		title: "Settings",
		description: "Configure system settings",
		icon: "fas fa-cog",
		href: "/dashboard/settings",
		color: "bg-gray-500",
	},
	{
		id: "6",
		title: "Notifications",
		description: "View system alerts",
		icon: "fas fa-bell",
		href: "/dashboard/notifications",
		color: "bg-red-500",
	},
];

export default function QuickActions() {
	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			title={
				<RFlex className="items-center gap-2 text-2xl">
					<i className="fas fa-bolt text-slate-600 text-xl"></i>
					Quick Actions
				</RFlex>
			}
			description="Common tasks and shortcuts"
			contentComponent={
				<div className="space-y-3">
					{quickActions.map((action) => {
						return (
							<a key={action.id} href={action.href} className="block">
								<div className="w-full justify-start h-auto p-4 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors">
									<RFlex className="items-center">
										<div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
											<i className={`${action.icon} text-white text-sm`}></i>
										</div>
										<div className="text-left">
											<p className="font-semibold">{action.title}</p>
											<p className="text-xs text-muted-foreground">{action.description}</p>
										</div>
									</RFlex>
								</div>
							</a>
						);
					})}
				</div>
			}
		/>
	);
}
