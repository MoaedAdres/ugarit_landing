"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Integration {
	id: string;
	name: string;
	type: "CRM" | "ATS" | "Email" | "Analytics" | "Payment" | "Storage";
	status: "Connected" | "Disconnected" | "Error" | "Syncing";
	lastSync: string;
	syncProgress?: number;
	description: string;
	icon: string;
	metrics?: {
		label: string;
		value: string;
	}[];
}

const integrations: Integration[] = [
	{
		id: "1",
		name: "HubSpot CRM",
		type: "CRM",
		status: "Connected",
		lastSync: "2024-01-15T10:30:00Z",
		description: "Customer relationship management integration",
		icon: "fas fa-users",
		metrics: [
			{ label: "Contacts Synced", value: "1,234" },
			{ label: "Last Sync", value: "2 min ago" },
		],
	},
	{
		id: "2",
		name: "BambooHR",
		type: "ATS",
		status: "Connected",
		lastSync: "2024-01-15T09:15:00Z",
		description: "Applicant tracking system integration",
		icon: "fas fa-briefcase",
		metrics: [
			{ label: "Applications", value: "45" },
			{ label: "Open Positions", value: "8" },
		],
	},
	{
		id: "3",
		name: "Mailchimp",
		type: "Email",
		status: "Syncing",
		lastSync: "2024-01-15T10:25:00Z",
		syncProgress: 65,
		description: "Email marketing platform integration",
		icon: "fas fa-envelope",
		metrics: [
			{ label: "Subscribers", value: "2,456" },
			{ label: "Campaigns", value: "12" },
		],
	},
	{
		id: "4",
		name: "Google Analytics",
		type: "Analytics",
		status: "Connected",
		lastSync: "2024-01-15T10:28:00Z",
		description: "Web analytics and reporting",
		icon: "fas fa-chart-line",
		metrics: [
			{ label: "Page Views", value: "15.2K" },
			{ label: "Sessions", value: "3.4K" },
		],
	},
	{
		id: "5",
		name: "Stripe",
		type: "Payment",
		status: "Error",
		lastSync: "2024-01-14T15:30:00Z",
		description: "Payment processing integration",
		icon: "fas fa-credit-card",
		metrics: [
			{ label: "Transactions", value: "156" },
			{ label: "Revenue", value: "$12.4K" },
		],
	},
	{
		id: "6",
		name: "AWS S3",
		type: "Storage",
		status: "Connected",
		lastSync: "2024-01-15T10:32:00Z",
		description: "Cloud storage for media files",
		icon: "fas fa-cloud",
		metrics: [
			{ label: "Files Stored", value: "2.1K" },
			{ label: "Storage Used", value: "4.2 GB" },
		],
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Connected":
			return "bg-green-100 text-green-800";
		case "Syncing":
			return "bg-blue-100 text-blue-800";
		case "Error":
			return "bg-red-100 text-red-800";
		case "Disconnected":
			return "bg-gray-100 text-gray-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const getTypeColor = (type: string) => {
	switch (type) {
		case "CRM":
			return "bg-purple-100 text-purple-800";
		case "ATS":
			return "bg-blue-100 text-blue-800";
		case "Email":
			return "bg-green-100 text-green-800";
		case "Analytics":
			return "bg-orange-100 text-orange-800";
		case "Payment":
			return "bg-yellow-100 text-yellow-800";
		case "Storage":
			return "bg-cyan-100 text-cyan-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function IntegrationsStatus() {
	const connectedCount = integrations.filter((i) => i.status === "Connected").length;
	const errorCount = integrations.filter((i) => i.status === "Error").length;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Integrations Status</h2>
					<p className="text-muted-foreground">Monitor third-party service connections</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<i className="fas fa-sync mr-2 h-4 w-4" />
						Sync All
					</Button>
					<Button>
						<i className="fas fa-plus mr-2 h-4 w-4" />
						Add Integration
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
						<i className="fas fa-plug h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{integrations.length}</div>
						<p className="text-xs text-muted-foreground">Active services</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Connected</CardTitle>
						<i className="fas fa-check-circle h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">{connectedCount}</div>
						<p className="text-xs text-muted-foreground">Working properly</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Errors</CardTitle>
						<i className="fas fa-exclamation-triangle h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">{errorCount}</div>
						<p className="text-xs text-muted-foreground">Need attention</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Health Score</CardTitle>
						<i className="fas fa-heartbeat h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{Math.round((connectedCount / integrations.length) * 100)}%</div>
						<p className="text-xs text-muted-foreground">Overall health</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{integrations.map((integration) => (
					<Card key={integration.id}>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
										<i className={`${integration.icon} text-lg text-muted-foreground`} />
									</div>
									<div>
										<CardTitle className="text-lg">{integration.name}</CardTitle>
										<CardDescription>{integration.description}</CardDescription>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
									<Badge className={getTypeColor(integration.type)} variant="outline">
										{integration.type}
									</Badge>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{integration.status === "Syncing" && integration.syncProgress && (
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Syncing...</span>
											<span>{integration.syncProgress}%</span>
										</div>
										<Progress value={integration.syncProgress} />
									</div>
								)}

								{integration.metrics && (
									<div className="grid grid-cols-2 gap-4">
										{integration.metrics.map((metric, index) => (
											<div key={index} className="text-center">
												<p className="text-lg font-semibold">{metric.value}</p>
												<p className="text-xs text-muted-foreground">{metric.label}</p>
											</div>
										))}
									</div>
								)}

								<div className="flex justify-between items-center text-sm text-muted-foreground">
									<span>Last sync: {new Date(integration.lastSync).toLocaleString()}</span>
								</div>

								<div className="flex gap-2">
									<Button size="sm" variant="outline">
										<i className="fas fa-sync mr-2 h-4 w-4" />
										Sync
									</Button>
									<Button size="sm" variant="outline">
										<i className="fas fa-cog mr-2 h-4 w-4" />
										Configure
									</Button>
									{integration.status === "Error" && (
										<Button size="sm" variant="outline">
											<i className="fas fa-exclamation-triangle mr-2 h-4 w-4" />
											Fix
										</Button>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
