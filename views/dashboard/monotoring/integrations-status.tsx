"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
	Plug, 
	Plus, 
	Edit, 
	Eye, 
	Trash2, 
	Search, 
	Filter, 
	Settings, 
	Download, 
	Upload, 
	RefreshCw, 
	Save, 
	X, 
	AlertTriangle, 
	CheckCircle, 
	XCircle, 
	Clock, 
	User, 
	Activity, 
	FileText, 
	Copy, 
	Star,
	Zap,
	Target,
	BookOpen,
	MessageSquare,
	Bell,
	Crown,
	UserCog,
	Database,
	Server,
	Network,
	HardDrive,
	History,
	TrendingUp,
	BarChart3,
	Calendar as CalendarIcon,
	MapPin,
	Globe,
	Lock,
	Unlock,
	Key,
	Mail,
	Phone,
	Building,
	Users,
	ShieldCheck,
	ShieldAlert,
	AlertCircle,
	Info,
	ExternalLink,
	ChevronDown,
	ChevronRight,
	Play,
	Pause,
	RotateCcw,
	Archive,
	Trash,
	Flag,
	FlagOff,
	RefreshCw as Sync,
	Wifi,
	WifiOff,
	Cloud,
	CloudOff,
	Heart,
	HeartOff,
	Monitor,
	Smartphone,
	Tablet,
	Laptop,
	Shield,
	ShieldX,
	CheckSquare,
	Square,
	Minus,
	MoreHorizontal,
	MoreVertical,
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ChevronUp,
	ChevronLeft,
	ChevronRight as ChevronRightIcon,
	ChevronDown as ChevronDownIcon,
	Cog,
	Wrench,
	Link,
	Link2,
	Unlink,
	Unlink2,
	Power,
	PowerOff,
	Battery,
	BatteryLow,
	BatteryMedium,
	BatteryFull,
	BatteryCharging,
	BatteryWarning,
	Briefcase,
	CreditCard,
	Share2
} from "lucide-react";

interface Integration {
	id: string;
	name: string;
	type: "CRM" | "ATS" | "Email" | "Analytics" | "Payment" | "Storage" | "Social" | "Marketing" | "Communication";
	status: "Connected" | "Disconnected" | "Error" | "Syncing" | "Pending" | "Warning";
	lastSync: string;
	syncProgress?: number;
	description: string;
	icon: string;
	version?: string;
	apiVersion?: string;
	healthScore?: number;
	uptime?: number;
	responseTime?: number;
	errorRate?: number;
	lastError?: string;
	configuration?: {
		apiKey?: string;
		webhook?: string;
		rateLimit?: number;
		timeout?: number;
	};
	metrics?: {
		label: string;
		value: string;
		trend?: "up" | "down" | "stable";
	}[];
	features?: string[];
	documentation?: string;
	support?: {
		email?: string;
		phone?: string;
		chat?: string;
	};
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
		version: "v3.0.1",
		apiVersion: "v3",
		healthScore: 98,
		uptime: 99.9,
		responseTime: 245,
		errorRate: 0.1,
		configuration: {
			apiKey: "hubspot_***",
			webhook: "https://api.company.com/webhooks/hubspot",
			rateLimit: 100,
			timeout: 30,
		},
		metrics: [
			{ label: "Contacts Synced", value: "1,234", trend: "up" },
			{ label: "Last Sync", value: "2 min ago", trend: "stable" },
			{ label: "API Calls", value: "45.2K", trend: "up" },
			{ label: "Success Rate", value: "99.8%", trend: "stable" },
		],
		features: ["Contact Sync", "Deal Tracking", "Email Integration", "Analytics"],
		documentation: "https://developers.hubspot.com/docs/api/crm/contacts",
		support: {
			email: "support@hubspot.com",
			chat: "https://hubspot.com/support",
		},
	},
	{
		id: "2",
		name: "BambooHR",
		type: "ATS",
		status: "Connected",
		lastSync: "2024-01-15T09:15:00Z",
		description: "Applicant tracking system integration",
		icon: "fas fa-briefcase",
		version: "v2.1.0",
		apiVersion: "v1",
		healthScore: 95,
		uptime: 99.5,
		responseTime: 180,
		errorRate: 0.3,
		configuration: {
			apiKey: "bamboo_***",
			webhook: "https://api.company.com/webhooks/bamboo",
			rateLimit: 50,
			timeout: 25,
		},
		metrics: [
			{ label: "Applications", value: "45", trend: "up" },
			{ label: "Open Positions", value: "8", trend: "stable" },
			{ label: "Candidates", value: "234", trend: "up" },
			{ label: "Interviews", value: "12", trend: "down" },
		],
		features: ["Job Posting", "Application Tracking", "Interview Scheduling", "Reporting"],
		documentation: "https://documentation.bamboohr.com/docs/api",
		support: {
			email: "support@bamboohr.com",
			phone: "+1-800-BAMBOO",
		},
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
		version: "v4.2.1",
		apiVersion: "v3",
		healthScore: 92,
		uptime: 99.8,
		responseTime: 320,
		errorRate: 0.2,
		configuration: {
			apiKey: "mailchimp_***",
			webhook: "https://api.company.com/webhooks/mailchimp",
			rateLimit: 200,
			timeout: 45,
		},
		metrics: [
			{ label: "Subscribers", value: "2,456", trend: "up" },
			{ label: "Campaigns", value: "12", trend: "stable" },
			{ label: "Open Rate", value: "24.5%", trend: "up" },
			{ label: "Click Rate", value: "3.2%", trend: "down" },
		],
		features: ["Email Campaigns", "Automation", "Segmentation", "Analytics"],
		documentation: "https://mailchimp.com/developer/",
		support: {
			email: "support@mailchimp.com",
			chat: "https://mailchimp.com/support",
		},
	},
	{
		id: "4",
		name: "Google Analytics",
		type: "Analytics",
		status: "Connected",
		lastSync: "2024-01-15T10:28:00Z",
		description: "Web analytics and reporting",
		icon: "fas fa-chart-line",
		version: "v4.0.0",
		apiVersion: "v4",
		healthScore: 99,
		uptime: 99.9,
		responseTime: 150,
		errorRate: 0.05,
		configuration: {
			apiKey: "ga_***",
			webhook: "https://api.company.com/webhooks/ga",
			rateLimit: 1000,
			timeout: 20,
		},
		metrics: [
			{ label: "Page Views", value: "15.2K", trend: "up" },
			{ label: "Sessions", value: "3.4K", trend: "up" },
			{ label: "Bounce Rate", value: "42.1%", trend: "down" },
			{ label: "Avg. Session", value: "2m 34s", trend: "up" },
		],
		features: ["Real-time Analytics", "Custom Reports", "Goal Tracking", "E-commerce"],
		documentation: "https://developers.google.com/analytics",
		support: {
			email: "support@google.com",
			chat: "https://support.google.com/analytics",
		},
	},
	{
		id: "5",
		name: "Stripe",
		type: "Payment",
		status: "Error",
		lastSync: "2024-01-14T15:30:00Z",
		description: "Payment processing integration",
		icon: "fas fa-credit-card",
		version: "v3.1.2",
		apiVersion: "v1",
		healthScore: 45,
		uptime: 95.2,
		responseTime: 850,
		errorRate: 2.1,
		lastError: "API key expired - please update credentials",
		configuration: {
			apiKey: "stripe_***",
			webhook: "https://api.company.com/webhooks/stripe",
			rateLimit: 100,
			timeout: 30,
		},
		metrics: [
			{ label: "Transactions", value: "156", trend: "down" },
			{ label: "Revenue", value: "$12.4K", trend: "down" },
			{ label: "Success Rate", value: "94.2%", trend: "down" },
			{ label: "Failed Payments", value: "9", trend: "up" },
		],
		features: ["Payment Processing", "Subscription Management", "Fraud Detection", "Reporting"],
		documentation: "https://stripe.com/docs/api",
		support: {
			email: "support@stripe.com",
			chat: "https://support.stripe.com",
		},
	},
	{
		id: "6",
		name: "AWS S3",
		type: "Storage",
		status: "Connected",
		lastSync: "2024-01-15T10:32:00Z",
		description: "Cloud storage for media files",
		icon: "fas fa-cloud",
		version: "v2.0.0",
		apiVersion: "v4",
		healthScore: 97,
		uptime: 99.95,
		responseTime: 120,
		errorRate: 0.08,
		configuration: {
			apiKey: "aws_***",
			webhook: "https://api.company.com/webhooks/s3",
			rateLimit: 500,
			timeout: 60,
		},
		metrics: [
			{ label: "Files Stored", value: "2.1K", trend: "up" },
			{ label: "Storage Used", value: "4.2 GB", trend: "up" },
			{ label: "Downloads", value: "1.2K", trend: "up" },
			{ label: "Uploads", value: "89", trend: "stable" },
		],
		features: ["File Storage", "CDN", "Backup", "Versioning"],
		documentation: "https://docs.aws.amazon.com/s3/",
		support: {
			email: "support@amazon.com",
			chat: "https://aws.amazon.com/support",
		},
	},
	{
		id: "7",
		name: "Slack",
		type: "Communication",
		status: "Warning",
		lastSync: "2024-01-15T08:45:00Z",
		description: "Team communication and collaboration",
		icon: "fas fa-comments",
		version: "v1.5.0",
		apiVersion: "v1",
		healthScore: 78,
		uptime: 98.5,
		responseTime: 280,
		errorRate: 0.8,
		lastError: "Rate limit exceeded - retrying in 5 minutes",
		configuration: {
			apiKey: "slack_***",
			webhook: "https://api.company.com/webhooks/slack",
			rateLimit: 20,
			timeout: 30,
		},
		metrics: [
			{ label: "Messages Sent", value: "1,234", trend: "up" },
			{ label: "Active Users", value: "45", trend: "stable" },
			{ label: "Channels", value: "12", trend: "stable" },
			{ label: "Integrations", value: "8", trend: "up" },
		],
		features: ["Messaging", "File Sharing", "Video Calls", "Bot Integration"],
		documentation: "https://api.slack.com/",
		support: {
			email: "support@slack.com",
			chat: "https://slack.com/support",
		},
	},
	{
		id: "8",
		name: "Zapier",
		type: "Marketing",
		status: "Connected",
		lastSync: "2024-01-15T10:35:00Z",
		description: "Workflow automation platform",
		icon: "fas fa-bolt",
		version: "v2.3.1",
		apiVersion: "v2",
		healthScore: 96,
		uptime: 99.7,
		responseTime: 200,
		errorRate: 0.15,
		configuration: {
			apiKey: "zapier_***",
			webhook: "https://api.company.com/webhooks/zapier",
			rateLimit: 100,
			timeout: 30,
		},
		metrics: [
			{ label: "Zaps Active", value: "23", trend: "up" },
			{ label: "Tasks Run", value: "1,456", trend: "up" },
			{ label: "Success Rate", value: "98.5%", trend: "stable" },
			{ label: "Failed Tasks", value: "22", trend: "down" },
		],
		features: ["Workflow Automation", "Multi-step Zaps", "Conditional Logic", "Scheduling"],
		documentation: "https://zapier.com/developer/",
		support: {
			email: "support@zapier.com",
			chat: "https://zapier.com/support",
		},
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Connected":
			return "bg-green-500";
		case "Syncing":
			return "bg-blue-500";
		case "Error":
			return "bg-red-500";
		case "Disconnected":
			return "bg-gray-500";
		case "Pending":
			return "bg-yellow-500";
		case "Warning":
			return "bg-orange-500";
		default:
			return "bg-gray-500";
	}
};

const getTypeColor = (type: string) => {
	switch (type) {
		case "CRM":
			return "bg-purple-500";
		case "ATS":
			return "bg-blue-500";
		case "Email":
			return "bg-green-500";
		case "Analytics":
			return "bg-orange-500";
		case "Payment":
			return "bg-yellow-500";
		case "Storage":
			return "bg-cyan-500";
		case "Social":
			return "bg-pink-500";
		case "Marketing":
			return "bg-indigo-500";
		case "Communication":
			return "bg-teal-500";
		default:
			return "bg-gray-500";
	}
};

const getTypeIcon = (type: string) => {
	switch (type) {
		case "CRM":
			return Users;
		case "ATS":
			return Briefcase;
		case "Email":
			return Mail;
		case "Analytics":
			return BarChart3;
		case "Payment":
			return CreditCard;
		case "Storage":
			return Cloud;
		case "Social":
			return Share2;
		case "Marketing":
			return Target;
		case "Communication":
			return MessageSquare;
		default:
			return Plug;
	}
};

const getHealthColor = (score: number) => {
	if (score >= 90) return "text-green-600";
	if (score >= 70) return "text-yellow-600";
	if (score >= 50) return "text-orange-600";
	return "text-red-600";
};

const getTrendIcon = (trend: string) => {
	switch (trend) {
		case "up":
			return ArrowUp;
		case "down":
			return ArrowDown;
		default:
			return Minus;
	}
};

// Integration View Modal Component
function IntegrationViewModal({ 
	integration, 
	onClose 
}: { 
	integration: Integration; 
	onClose: () => void; 
}) {
	const TypeIcon = getTypeIcon(integration.type);
	
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Integration Details</h3>
					<p className="text-muted-foreground">View detailed information about this integration</p>
				</div>
				<Button variant="outline" onClick={onClose}>
					<X className="h-4 w-4 mr-2" />
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<TypeIcon className="h-5 w-5 text-blue-600" />
							Integration Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<TypeIcon className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">{integration.name}</h3>
								<p className="text-muted-foreground">{integration.description}</p>
							</div>
						</div>
						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium">Status</Label>
									<div className="mt-1">
										<Badge className={`${getStatusColor(integration.status)} text-white`}>
											{integration.status}
										</Badge>
									</div>
								</div>
								<div>
									<Label className="text-sm font-medium">Type</Label>
									<div className="mt-1">
										<Badge className={`${getTypeColor(integration.type)} text-white`}>
											{integration.type}
										</Badge>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium">Version</Label>
									<p className="text-sm text-muted-foreground mt-1">{integration.version || "N/A"}</p>
								</div>
								<div>
									<Label className="text-sm font-medium">API Version</Label>
									<p className="text-sm text-muted-foreground mt-1">{integration.apiVersion || "N/A"}</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Activity className="h-5 w-5 text-green-600" />
							Performance Metrics
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="text-center p-3 border rounded-lg">
								<p className="text-2xl font-bold text-green-600">{integration.healthScore || 0}%</p>
								<p className="text-xs text-muted-foreground">Health Score</p>
							</div>
							<div className="text-center p-3 border rounded-lg">
								<p className="text-2xl font-bold text-blue-600">{integration.uptime || 0}%</p>
								<p className="text-xs text-muted-foreground">Uptime</p>
							</div>
							<div className="text-center p-3 border rounded-lg">
								<p className="text-2xl font-bold text-purple-600">{integration.responseTime || 0}ms</p>
								<p className="text-xs text-muted-foreground">Response Time</p>
							</div>
							<div className="text-center p-3 border rounded-lg">
								<p className="text-2xl font-bold text-red-600">{integration.errorRate || 0}%</p>
								<p className="text-xs text-muted-foreground">Error Rate</p>
							</div>
						</div>
						{integration.lastError && (
							<div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
								<Label className="text-sm font-medium text-red-600">Last Error</Label>
								<p className="text-sm text-red-700 dark:text-red-300 mt-1">{integration.lastError}</p>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="h-5 w-5 text-purple-600" />
							Configuration
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{integration.configuration && (
							<div className="space-y-3">
								<div>
									<Label className="text-sm font-medium">API Key</Label>
									<p className="text-sm text-muted-foreground mt-1 font-mono">{integration.configuration.apiKey || "Not configured"}</p>
								</div>
								<div>
									<Label className="text-sm font-medium">Webhook URL</Label>
									<p className="text-sm text-muted-foreground mt-1 font-mono">{integration.configuration.webhook || "Not configured"}</p>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label className="text-sm font-medium">Rate Limit</Label>
										<p className="text-sm text-muted-foreground mt-1">{integration.configuration.rateLimit || "N/A"} requests/min</p>
									</div>
									<div>
										<Label className="text-sm font-medium">Timeout</Label>
										<p className="text-sm text-muted-foreground mt-1">{integration.configuration.timeout || "N/A"} seconds</p>
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<BarChart3 className="h-5 w-5 text-orange-600" />
							Metrics & Trends
						</CardTitle>
					</CardHeader>
					<CardContent>
						{integration.metrics && (
							<div className="space-y-3">
								{integration.metrics.map((metric, index) => {
									const TrendIcon = getTrendIcon(metric.trend || "stable");
									return (
										<div key={index} className="flex items-center justify-between p-3 border rounded-lg">
											<div>
												<p className="font-semibold">{metric.value}</p>
												<p className="text-sm text-muted-foreground">{metric.label}</p>
											</div>
											<TrendIcon className={`h-4 w-4 ${
												metric.trend === "up" ? "text-green-600" : 
												metric.trend === "down" ? "text-red-600" : 
												"text-gray-600"
											}`} />
										</div>
									);
								})}
							</div>
						)}
					</CardContent>
				</Card>

				{integration.features && integration.features.length > 0 && (
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2">
								<Star className="h-5 w-5 text-yellow-600" />
								Features & Support
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label className="text-sm font-medium">Available Features</Label>
									<div className="flex flex-wrap gap-2 mt-2">
										{integration.features.map((feature, index) => (
											<Badge key={index} variant="outline" className="px-3 py-1">
												{feature}
											</Badge>
										))}
									</div>
								</div>
								<div>
									<Label className="text-sm font-medium">Support</Label>
									<div className="space-y-2 mt-2">
										{integration.support?.email && (
											<div className="flex items-center gap-2 text-sm">
												<Mail className="h-4 w-4 text-muted-foreground" />
												{integration.support.email}
											</div>
										)}
										{integration.support?.phone && (
											<div className="flex items-center gap-2 text-sm">
												<Phone className="h-4 w-4 text-muted-foreground" />
												{integration.support.phone}
											</div>
										)}
										{integration.support?.chat && (
											<div className="flex items-center gap-2 text-sm">
												<MessageSquare className="h-4 w-4 text-muted-foreground" />
												<a href={integration.support.chat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
													Live Chat
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}

export function IntegrationsStatus() {
	const [integrationsData, setIntegrationsData] = useState(integrations);
	const [viewingIntegration, setViewingIntegration] = useState<Integration | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [isRealTime, setIsRealTime] = useState(false);

	const filteredIntegrations = integrationsData.filter((integration) => {
		const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 integration.type.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || integration.status === statusFilter;
		const matchesType = typeFilter === "all" || integration.type === typeFilter;
		return matchesSearch && matchesStatus && matchesType;
	});

	const getStats = () => {
		const total = integrationsData.length;
		const connected = integrationsData.filter(i => i.status === "Connected").length;
		const error = integrationsData.filter(i => i.status === "Error").length;
		const warning = integrationsData.filter(i => i.status === "Warning").length;
		const syncing = integrationsData.filter(i => i.status === "Syncing").length;
		const avgHealth = Math.round(integrationsData.reduce((sum, i) => sum + (i.healthScore || 0), 0) / integrationsData.length);
		
		return { total, connected, error, warning, syncing, avgHealth };
	};

	const stats = getStats();

	return (
		<div className="space-y-8">
			{/* Enhanced Header with Different Design */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-8 text-white">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300D4AA%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
				<div className="relative flex items-start justify-between">
					<div className="space-y-3">
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
								<Plug className="h-8 w-8 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold tracking-tight">Integrations Hub</h1>
								<p className="text-white/80 text-lg">Monitor and manage third-party service connections</p>
							</div>
						</div>
					</div>
					<div className="flex gap-3">
						<Button 
							variant="outline" 
							size="lg"
							className="bg-white/10 border-white/20 text-white hover:bg-white/20"
						>
							<Sync className="h-4 w-4 mr-2" />
							Sync All
						</Button>
						<Button 
							size="lg"
							className="bg-white text-slate-900 hover:bg-white/90"
							onClick={() => setIsRealTime(!isRealTime)}
						>
							{isRealTime ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
							{isRealTime ? "Pause" : "Live"} Monitoring
						</Button>
					</div>
				</div>
			</div>

			{/* Enhanced Analytics Cards with Different Layout */}
			<div className="grid grid-cols-1 md:grid-cols-6 gap-6">
				<Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
								<Plug className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Integrations</p>
								<p className="text-3xl font-bold text-blue-600">{stats.total}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
								<CheckCircle className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Connected</p>
								<p className="text-3xl font-bold text-green-600">{stats.connected}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
								<XCircle className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Errors</p>
								<p className="text-3xl font-bold text-red-600">{stats.error}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
								<AlertTriangle className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Warnings</p>
								<p className="text-3xl font-bold text-yellow-600">{stats.warning}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
								<Sync className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Syncing</p>
								<p className="text-3xl font-bold text-blue-600">{stats.syncing}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
								<Heart className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Health Score</p>
								<p className="text-3xl font-bold text-purple-600">{stats.avgHealth}%</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Search and Filter */}
			<Card className="border-0 shadow-xl">
				<CardContent className="p-6">
					<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 flex-1">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search integrations..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-12 text-base"
								/>
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[140px] h-12">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="Connected">Connected</SelectItem>
									<SelectItem value="Syncing">Syncing</SelectItem>
									<SelectItem value="Error">Error</SelectItem>
									<SelectItem value="Warning">Warning</SelectItem>
									<SelectItem value="Disconnected">Disconnected</SelectItem>
								</SelectContent>
							</Select>
							<Select value={typeFilter} onValueChange={setTypeFilter}>
								<SelectTrigger className="w-[140px] h-12">
									<SelectValue placeholder="Type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Types</SelectItem>
									<SelectItem value="CRM">CRM</SelectItem>
									<SelectItem value="ATS">ATS</SelectItem>
									<SelectItem value="Email">Email</SelectItem>
									<SelectItem value="Analytics">Analytics</SelectItem>
									<SelectItem value="Payment">Payment</SelectItem>
									<SelectItem value="Storage">Storage</SelectItem>
									<SelectItem value="Social">Social</SelectItem>
									<SelectItem value="Marketing">Marketing</SelectItem>
									<SelectItem value="Communication">Communication</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex gap-3">
							<Button variant="outline" size="lg">
								<Plus className="h-4 w-4 mr-2" />
								Add Integration
							</Button>
							<Button variant="outline" size="lg">
								<RefreshCw className="h-4 w-4 mr-2" />
								Refresh
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Integrations Display with Different Layout */}
			<Card className="border-0 shadow-xl">
				<CardHeader>
					<CardTitle className="text-2xl flex items-center gap-2">
						<Plug className="h-6 w-6 text-slate-600" />
						Integration Directory
					</CardTitle>
					<CardDescription>Monitor and manage all your third-party service connections</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredIntegrations.map((integration) => {
							const TypeIcon = getTypeIcon(integration.type);
							
							return (
								<div key={integration.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-all duration-300">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-6">
											<div className="relative">
												<div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
													<TypeIcon className="h-6 w-6 text-slate-600" />
												</div>
												{integration.status === "Error" && (
													<div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
														<XCircle className="w-2 h-2 text-white" />
													</div>
												)}
												{integration.status === "Warning" && (
													<div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
														<AlertTriangle className="w-2 h-2 text-white" />
													</div>
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2">
													<h3 className="font-semibold text-lg">{integration.name}</h3>
													<Badge className={`${getStatusColor(integration.status)} text-white`}>
														{integration.status}
													</Badge>
													<Badge className={`${getTypeColor(integration.type)} text-white`}>
														{integration.type}
													</Badge>
													{integration.healthScore && (
														<Badge variant="outline" className={`${getHealthColor(integration.healthScore)}`}>
															{integration.healthScore}% Health
														</Badge>
													)}
												</div>
												<p className="text-slate-600 dark:text-slate-400 mb-2">{integration.description}</p>
												<div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
													<div className="flex items-center gap-1">
														<Clock className="h-4 w-4" />
														Last sync: {new Date(integration.lastSync).toLocaleString()}
													</div>
													{integration.version && (
														<div className="flex items-center gap-1">
															<Settings className="h-4 w-4" />
															{integration.version}
														</div>
													)}
													{integration.responseTime && (
														<div className="flex items-center gap-1">
															<Zap className="h-4 w-4" />
															{integration.responseTime}ms
														</div>
													)}
												</div>
												{integration.status === "Syncing" && integration.syncProgress && (
													<div className="mt-3">
														<div className="flex justify-between text-sm mb-2">
															<span>Syncing...</span>
															<span>{integration.syncProgress}%</span>
														</div>
														<Progress value={integration.syncProgress} className="h-2" />
													</div>
												)}
												{integration.metrics && (
													<div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
														<p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
															Key Metrics
														</p>
														<div className="grid grid-cols-2 gap-4">
															{integration.metrics.slice(0, 4).map((metric, index) => {
																const TrendIcon = getTrendIcon(metric.trend || "stable");
																return (
																	<div key={index} className="flex items-center justify-between">
																		<div>
																			<p className="text-sm font-semibold">{metric.value}</p>
																			<p className="text-xs text-slate-500">{metric.label}</p>
																		</div>
																		<TrendIcon className={`h-3 w-3 ${
																			metric.trend === "up" ? "text-green-600" : 
																			metric.trend === "down" ? "text-red-600" : 
																			"text-gray-600"
																		}`} />
																	</div>
																);
															})}
														</div>
													</div>
												)}
											</div>
										</div>
										<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<Button 
												variant="outline" 
												size="lg"
												onClick={() => setViewingIntegration(integration)}
											>
												<Eye className="h-4 w-4 mr-2" />
												View Details
											</Button>
											<Button 
												variant="outline" 
												size="lg"
											>
												<Sync className="h-4 w-4 mr-2" />
												Sync
											</Button>
											<Button 
												variant="outline" 
												size="lg"
											>
												<Settings className="h-4 w-4 mr-2" />
												Configure
											</Button>
											{integration.status === "Error" && (
												<Button 
													variant="outline" 
													size="lg"
													className="text-red-600 hover:text-red-700 hover:bg-red-50"
												>
													<AlertTriangle className="h-4 w-4 mr-2" />
													Fix
												</Button>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* Integration View Modal */}
			<Dialog open={!!viewingIntegration} onOpenChange={() => setViewingIntegration(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">Integration Details</DialogTitle>
						<DialogDescription>View detailed information about this integration</DialogDescription>
					</DialogHeader>
					{viewingIntegration && (
						<IntegrationViewModal
							integration={viewingIntegration}
							onClose={() => setViewingIntegration(null)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
