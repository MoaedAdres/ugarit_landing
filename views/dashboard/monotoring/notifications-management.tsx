"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
	Bell, 
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
	Share2,
	Calendar,
	MapPin,
	Globe,
	Lock,
	Unlock,
	Key,
	Database,
	Server,
	Network,
	HardDrive,
	History,
	TrendingUp,
	BarChart3,
	Bell as BellIcon,
	BellOff,
	BellRing,
	Volume2,
	VolumeX,
	Mic,
	MicOff,
	Video,
	VideoOff,
	Camera,
	CameraOff,
	Image,
	ImageIcon,
	File,
	FileText as FileTextIcon,
	Folder,
	FolderOpen,
	Download as DownloadIcon,
	Upload as UploadIcon,
	Send,
	Reply,
	Forward,
	Share,
	Bookmark,
	BookmarkCheck,
	Tag,
	Tags,
	Hash,
	AtSign,
	Percent,
	DollarSign,
	Euro,
	Bitcoin,
	CreditCard as CreditCardIcon,
	Wallet,
	PiggyBank,
	TrendingDown,
	Minus as MinusIcon,
	Plus as PlusIcon,
	Equal,
	Divide,
	Calculator,
	Percent as PercentIcon,
	Infinity,
	Pi,
	Sigma
} from "lucide-react";

interface Notification {
	id: string;
	title: string;
	message: string;
	type: "info" | "warning" | "error" | "success" | "security" | "system" | "content" | "integration";
	timestamp: string;
	read: boolean;
	source: string;
	priority: "low" | "medium" | "high" | "critical";
	actionRequired: boolean;
	metadata?: {
		userId?: string;
		integrationId?: string;
		contentId?: string;
		ipAddress?: string;
		userAgent?: string;
		location?: string;
	};
	actions?: {
		label: string;
		action: string;
		variant: "default" | "destructive" | "outline" | "secondary";
	}[];
	expiresAt?: string;
	archived: boolean;
}

interface NotificationSetting {
	id: string;
	category: string;
	name: string;
	description: string;
	email: boolean;
	push: boolean;
	sms: boolean;
	webhook: boolean;
	enabled: boolean;
	quietHours: {
		enabled: boolean;
		start: string;
		end: string;
		timezone: string;
	};
	channels: {
		email: boolean;
		push: boolean;
		sms: boolean;
		webhook: boolean;
		inApp: boolean;
	};
}

const notifications: Notification[] = [
	{
		id: "1",
		title: "Stripe Integration Error",
		message: "Payment processing integration has encountered an error. Please check your API keys.",
		type: "error",
		timestamp: "2024-01-15T10:30:00Z",
		read: false,
		source: "Integrations",
		priority: "high",
		actionRequired: true,
		metadata: {
			integrationId: "stripe_001",
			ipAddress: "192.168.1.100",
		},
		actions: [
			{ label: "Fix Integration", action: "fix", variant: "default" },
			{ label: "View Details", action: "view", variant: "outline" },
		],
		archived: false,
	},
	{
		id: "2",
		title: "New Contact Form Submission",
		message: "You have received a new contact form submission from john.doe@email.com",
		type: "info",
		timestamp: "2024-01-15T09:45:00Z",
		read: false,
		source: "Contact Forms",
		priority: "medium",
		actionRequired: true,
		metadata: {
			userId: "user_123",
			location: "New York, NY",
		},
		actions: [
			{ label: "View Contact", action: "view", variant: "default" },
			{ label: "Reply", action: "reply", variant: "outline" },
		],
		archived: false,
	},
	{
		id: "3",
		title: "Blog Post Published",
		message: "Sarah Editor has published a new blog post 'Best Practices for React Components'",
		type: "success",
		timestamp: "2024-01-15T08:20:00Z",
		read: true,
		source: "Content Management",
		priority: "low",
		actionRequired: false,
		metadata: {
			contentId: "blog_456",
			userId: "sarah_editor",
		},
		actions: [
			{ label: "View Post", action: "view", variant: "outline" },
		],
		archived: false,
	},
	{
		id: "4",
		title: "Storage Usage Warning",
		message: "Your media storage is 85% full. Consider upgrading your plan or cleaning up unused files.",
		type: "warning",
		timestamp: "2024-01-14T16:15:00Z",
		read: true,
		source: "System",
		priority: "medium",
		actionRequired: true,
		actions: [
			{ label: "Upgrade Plan", action: "upgrade", variant: "default" },
			{ label: "Clean Storage", action: "clean", variant: "outline" },
		],
		archived: false,
	},
	{
		id: "5",
		title: "Failed Login Attempts",
		message: "Multiple failed login attempts detected from IP 192.168.1.103",
		type: "security",
		timestamp: "2024-01-14T14:30:00Z",
		read: true,
		source: "Security",
		priority: "critical",
		actionRequired: true,
		metadata: {
			ipAddress: "192.168.1.103",
			location: "Unknown",
		},
		actions: [
			{ label: "Block IP", action: "block", variant: "destructive" },
			{ label: "View Details", action: "view", variant: "outline" },
		],
		archived: false,
	},
	{
		id: "6",
		title: "New User Registration",
		message: "A new user has registered: alex.smith@company.com",
		type: "info",
		timestamp: "2024-01-14T12:00:00Z",
		read: false,
		source: "User Management",
		priority: "low",
		actionRequired: false,
		metadata: {
			userId: "alex_smith",
			location: "San Francisco, CA",
		},
		actions: [
			{ label: "View Profile", action: "view", variant: "outline" },
		],
		archived: false,
	},
	{
		id: "7",
		title: "Database Backup Completed",
		message: "Daily database backup has been completed successfully",
		type: "success",
		timestamp: "2024-01-14T06:00:00Z",
		read: true,
		source: "System",
		priority: "low",
		actionRequired: false,
		archived: false,
	},
	{
		id: "8",
		title: "API Rate Limit Exceeded",
		message: "API rate limit exceeded for Google Analytics integration",
		type: "warning",
		timestamp: "2024-01-13T18:45:00Z",
		read: true,
		source: "Integrations",
		priority: "medium",
		actionRequired: true,
		metadata: {
			integrationId: "ga_001",
		},
		actions: [
			{ label: "Adjust Limits", action: "adjust", variant: "default" },
		],
		archived: false,
	},
];

const notificationSettings: NotificationSetting[] = [
	{
		id: "1",
		category: "Content",
		name: "New Content Published",
		description: "Notify when content is published",
		email: true,
		push: true,
		sms: false,
		webhook: false,
		enabled: true,
		quietHours: {
			enabled: true,
			start: "22:00",
			end: "08:00",
			timezone: "UTC",
		},
		channels: {
			email: true,
			push: true,
			sms: false,
			webhook: false,
			inApp: true,
		},
	},
	{
		id: "2",
		category: "Content",
		name: "Content Needs Review",
		description: "Notify when content is submitted for review",
		email: true,
		push: false,
		sms: false,
		webhook: false,
		enabled: true,
		quietHours: {
			enabled: false,
			start: "22:00",
			end: "08:00",
			timezone: "UTC",
		},
		channels: {
			email: true,
			push: false,
			sms: false,
			webhook: false,
			inApp: true,
		},
	},
	{
		id: "3",
		category: "Security",
		name: "Failed Login Attempts",
		description: "Notify about suspicious login activity",
		email: true,
		push: true,
		sms: true,
		webhook: true,
		enabled: true,
		quietHours: {
			enabled: false,
			start: "22:00",
			end: "08:00",
			timezone: "UTC",
		},
		channels: {
			email: true,
			push: true,
			sms: true,
			webhook: true,
			inApp: true,
		},
	},
	{
		id: "4",
		category: "Security",
		name: "New User Registration",
		description: "Notify when new users are added",
		email: true,
		push: false,
		sms: false,
		webhook: false,
		enabled: true,
		quietHours: {
			enabled: true,
			start: "22:00",
			end: "08:00",
			timezone: "UTC",
		},
		channels: {
			email: true,
			push: false,
			sms: false,
			webhook: false,
			inApp: true,
		},
	},
	{
		id: "5",
		category: "System",
		name: "Integration Errors",
		description: "Notify about third-party integration issues",
		email: true,
		push: true,
		sms: false,
		webhook: true,
		enabled: true,
		quietHours: {
			enabled: false,
			start: "22:00",
			end: "08:00",
			timezone: "UTC",
		},
		channels: {
			email: true,
			push: true,
			sms: false,
			webhook: true,
			inApp: true,
		},
	},
	{
		id: "6",
		category: "System",
		name: "Storage Warnings",
		description: "Notify about storage usage limits",
		email: true,
		push: false,
		sms: false,
		webhook: false,
		enabled: true,
		quietHours: {
			enabled: true,
			start: "22:00",
			end: "08:00",
			timezone: "UTC",
		},
		channels: {
			email: true,
			push: false,
			sms: false,
			webhook: false,
			inApp: true,
		},
	},
];

const getNotificationTypeColor = (type: string) => {
	switch (type) {
		case "error":
			return "bg-red-500";
		case "warning":
			return "bg-yellow-500";
		case "success":
			return "bg-green-500";
		case "info":
			return "bg-blue-500";
		case "security":
			return "bg-purple-500";
		case "system":
			return "bg-gray-500";
		case "content":
			return "bg-indigo-500";
		case "integration":
			return "bg-cyan-500";
		default:
			return "bg-gray-500";
	}
};

const getNotificationIcon = (type: string) => {
	switch (type) {
		case "error":
			return XCircle;
		case "warning":
			return AlertTriangle;
		case "success":
			return CheckCircle;
		case "info":
			return Info;
		case "security":
			return ShieldAlert;
		case "system":
			return Settings;
		case "content":
			return FileText;
		case "integration":
			return Link;
		default:
			return Bell;
	}
};

const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "critical":
			return "text-red-600 bg-red-50 dark:bg-red-900/20";
		case "high":
			return "text-orange-600 bg-orange-50 dark:bg-orange-900/20";
		case "medium":
			return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
		case "low":
			return "text-green-600 bg-green-50 dark:bg-green-900/20";
		default:
			return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
	}
};

const getPriorityIcon = (priority: string) => {
	switch (priority) {
		case "critical":
			return AlertTriangle;
		case "high":
			return ArrowUp;
		case "medium":
			return Minus;
		case "low":
			return ArrowDown;
		default:
			return Minus;
	}
};

// Notification View Modal Component
function NotificationViewModal({ 
	notification, 
	onClose 
}: { 
	notification: Notification; 
	onClose: () => void; 
}) {
	const TypeIcon = getNotificationIcon(notification.type);
	const PriorityIcon = getPriorityIcon(notification.priority);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Notification Details</h3>
					<p className="text-muted-foreground">View detailed information about this notification</p>
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
							Notification Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<TypeIcon className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">{notification.title}</h3>
								<p className="text-muted-foreground">{notification.message}</p>
							</div>
						</div>
						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium">Type</Label>
									<div className="mt-1">
										<Badge className={`${getNotificationTypeColor(notification.type)} text-white`}>
											{notification.type}
										</Badge>
									</div>
								</div>
								<div>
									<Label className="text-sm font-medium">Priority</Label>
									<div className="mt-1">
										<Badge className={`${getPriorityColor(notification.priority)}`}>
											<PriorityIcon className="h-3 w-3 mr-1" />
											{notification.priority}
										</Badge>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium">Source</Label>
									<p className="text-sm text-muted-foreground mt-1">{notification.source}</p>
								</div>
								<div>
									<Label className="text-sm font-medium">Status</Label>
									<p className="text-sm text-muted-foreground mt-1">
										{notification.read ? "Read" : "Unread"}
									</p>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium">Timestamp</Label>
								<p className="text-sm text-muted-foreground mt-1">
									{new Date(notification.timestamp).toLocaleString()}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Activity className="h-5 w-5 text-green-600" />
							Metadata & Actions
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{notification.metadata && (
							<div className="space-y-3">
								<Label className="text-sm font-medium">Metadata</Label>
								{notification.metadata.userId && (
									<div className="flex items-center gap-2 text-sm">
										<User className="h-4 w-4 text-muted-foreground" />
										<span>User ID: {notification.metadata.userId}</span>
									</div>
								)}
								{notification.metadata.integrationId && (
									<div className="flex items-center gap-2 text-sm">
										<Link className="h-4 w-4 text-muted-foreground" />
										<span>Integration: {notification.metadata.integrationId}</span>
									</div>
								)}
								{notification.metadata.contentId && (
									<div className="flex items-center gap-2 text-sm">
										<FileText className="h-4 w-4 text-muted-foreground" />
										<span>Content ID: {notification.metadata.contentId}</span>
									</div>
								)}
								{notification.metadata.ipAddress && (
									<div className="flex items-center gap-2 text-sm">
										<Globe className="h-4 w-4 text-muted-foreground" />
										<span>IP: {notification.metadata.ipAddress}</span>
									</div>
								)}
								{notification.metadata.location && (
									<div className="flex items-center gap-2 text-sm">
										<MapPin className="h-4 w-4 text-muted-foreground" />
										<span>Location: {notification.metadata.location}</span>
									</div>
								)}
							</div>
						)}
						
						{notification.actions && notification.actions.length > 0 && (
							<div className="space-y-3">
								<Label className="text-sm font-medium">Available Actions</Label>
								<div className="flex flex-wrap gap-2">
									{notification.actions.map((action, index) => (
										<Button key={index} variant={action.variant} size="sm">
											{action.label}
										</Button>
									))}
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export function NotificationsManagement() {
	const [notificationsData, setNotificationsData] = useState(notifications);
	const [settings, setSettings] = useState(notificationSettings);
	const [viewingNotification, setViewingNotification] = useState<Notification | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
	const [isRealTime, setIsRealTime] = useState(false);

	const unreadCount = notificationsData.filter((n) => !n.read).length;

	const filteredNotifications = notificationsData.filter((notification) => {
		const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 notification.source.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = typeFilter === "all" || notification.type === typeFilter;
		const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter;
		const matchesStatus = statusFilter === "all" || 
			(statusFilter === "read" && notification.read) ||
			(statusFilter === "unread" && !notification.read) ||
			(statusFilter === "archived" && notification.archived);
		return matchesSearch && matchesType && matchesPriority && matchesStatus;
	});

	const getStats = () => {
		const total = notificationsData.length;
		const unread = notificationsData.filter(n => !n.read).length;
		const errors = notificationsData.filter(n => n.type === "error").length;
		const warnings = notificationsData.filter(n => n.type === "warning").length;
		const critical = notificationsData.filter(n => n.priority === "critical").length;
		const actionRequired = notificationsData.filter(n => n.actionRequired).length;
		
		return { total, unread, errors, warnings, critical, actionRequired };
	};

	const stats = getStats();

	const updateSetting = (id: string, field: "email" | "push" | "sms" | "webhook", value: boolean) => {
		setSettings((prev) => prev.map((setting) => (setting.id === id ? { ...setting, [field]: value } : setting)));
	};

	const markAsRead = (id: string) => {
		setNotificationsData(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
	};

	const markAsUnread = (id: string) => {
		setNotificationsData(prev => prev.map(n => n.id === id ? { ...n, read: false } : n));
	};

	const archiveNotification = (id: string) => {
		setNotificationsData(prev => prev.map(n => n.id === id ? { ...n, archived: true } : n));
	};

	const deleteNotification = (id: string) => {
		setNotificationsData(prev => prev.filter(n => n.id !== id));
	};

	const markAllAsRead = () => {
		setNotificationsData(prev => prev.map(n => ({ ...n, read: true })));
	};

	const clearAll = () => {
		setNotificationsData([]);
	};

	const toggleSelection = (id: string) => {
		setSelectedNotifications(prev => 
			prev.includes(id) 
				? prev.filter(n => n !== id)
				: [...prev, id]
		);
	};

	const selectAll = () => {
		setSelectedNotifications(filteredNotifications.map(n => n.id));
	};

	const deselectAll = () => {
		setSelectedNotifications([]);
	};

	return (
		<div className="space-y-8">
			{/* Enhanced Header with Different Design */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 p-8 text-white">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23F43F5E%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
				<div className="relative flex items-start justify-between">
					<div className="space-y-3">
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
								<Bell className="h-8 w-8 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold tracking-tight">Notification Center</h1>
								<p className="text-white/80 text-lg">Stay informed with real-time alerts and system notifications</p>
							</div>
						</div>
					</div>
					<div className="flex gap-3">
						<Button 
							variant="outline" 
							size="lg"
							className="bg-white/10 border-white/20 text-white hover:bg-white/20"
							onClick={markAllAsRead}
						>
							<CheckCircle className="h-4 w-4 mr-2" />
							Mark All Read
						</Button>
						<Button 
							size="lg"
							className="bg-white text-slate-900 hover:bg-white/90"
							onClick={() => setIsRealTime(!isRealTime)}
						>
							{isRealTime ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
							{isRealTime ? "Pause" : "Live"} Updates
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
								<Bell className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Notifications</p>
								<p className="text-3xl font-bold text-blue-600">{stats.total}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
								<BellRing className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Unread</p>
								<p className="text-3xl font-bold text-orange-600">{stats.unread}</p>
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
								<p className="text-3xl font-bold text-red-600">{stats.errors}</p>
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
								<p className="text-3xl font-bold text-yellow-600">{stats.warnings}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
								<AlertTriangle className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Critical</p>
								<p className="text-3xl font-bold text-purple-600">{stats.critical}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
								<Zap className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Action Required</p>
								<p className="text-3xl font-bold text-green-600">{stats.actionRequired}</p>
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
									placeholder="Search notifications..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-12 text-base"
								/>
										</div>
							<Select value={typeFilter} onValueChange={setTypeFilter}>
								<SelectTrigger className="w-[140px] h-12">
									<SelectValue placeholder="Type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Types</SelectItem>
									<SelectItem value="error">Error</SelectItem>
									<SelectItem value="warning">Warning</SelectItem>
									<SelectItem value="success">Success</SelectItem>
									<SelectItem value="info">Info</SelectItem>
									<SelectItem value="security">Security</SelectItem>
									<SelectItem value="system">System</SelectItem>
									<SelectItem value="content">Content</SelectItem>
									<SelectItem value="integration">Integration</SelectItem>
								</SelectContent>
							</Select>
							<Select value={priorityFilter} onValueChange={setPriorityFilter}>
								<SelectTrigger className="w-[140px] h-12">
									<SelectValue placeholder="Priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Priorities</SelectItem>
									<SelectItem value="critical">Critical</SelectItem>
									<SelectItem value="high">High</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="low">Low</SelectItem>
								</SelectContent>
							</Select>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[140px] h-12">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="unread">Unread</SelectItem>
									<SelectItem value="read">Read</SelectItem>
									<SelectItem value="archived">Archived</SelectItem>
								</SelectContent>
							</Select>
												</div>
						<div className="flex gap-3">
							<Button variant="outline" size="lg">
								<Plus className="h-4 w-4 mr-2" />
								Create Notification
											</Button>
							<Button variant="outline" size="lg">
								<RefreshCw className="h-4 w-4 mr-2" />
								Refresh
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>

			{/* Enhanced Notifications Display with Different Layout */}
			<Card className="border-0 shadow-xl">
						<CardHeader>
					<CardTitle className="text-2xl flex items-center gap-2">
						<Bell className="h-6 w-6 text-slate-600" />
						Notification Feed
					</CardTitle>
					<CardDescription>Monitor and manage all your system notifications and alerts</CardDescription>
						</CardHeader>
						<CardContent>
										<div className="space-y-4">
						{filteredNotifications.map((notification) => {
							const TypeIcon = getNotificationIcon(notification.type);
							const PriorityIcon = getPriorityIcon(notification.priority);
							
							return (
								<div key={notification.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-all duration-300">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-6">
											<div className="relative">
												<div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
													<TypeIcon className="h-6 w-6 text-slate-600" />
												</div>
												{!notification.read && (
													<div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
														<BellRing className="w-2 h-2 text-white" />
													</div>
												)}
												{notification.priority === "critical" && (
													<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
														<AlertTriangle className="w-2 h-2 text-white" />
													</div>
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2">
													<h3 className="font-semibold text-lg">{notification.title}</h3>
													<Badge className={`${getNotificationTypeColor(notification.type)} text-white`}>
														{notification.type}
													</Badge>
													<Badge className={`${getPriorityColor(notification.priority)}`}>
														<PriorityIcon className="h-3 w-3 mr-1" />
														{notification.priority}
													</Badge>
													{notification.actionRequired && (
														<Badge variant="outline" className="text-orange-600 border-orange-600">
															<Zap className="h-3 w-3 mr-1" />
															Action Required
														</Badge>
													)}
												</div>
												<p className="text-slate-600 dark:text-slate-400 mb-2">{notification.message}</p>
												<div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
													<div className="flex items-center gap-1">
														<Clock className="h-4 w-4" />
														{new Date(notification.timestamp).toLocaleString()}
													</div>
													<div className="flex items-center gap-1">
														<Building className="h-4 w-4" />
														{notification.source}
													</div>
													{notification.metadata?.location && (
														<div className="flex items-center gap-1">
															<MapPin className="h-4 w-4" />
															{notification.metadata.location}
														</div>
													)}
															</div>
												{notification.actions && (
													<div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
														<p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
															Quick Actions
														</p>
														<div className="flex gap-2">
															{notification.actions.slice(0, 3).map((action, index) => (
																<Button key={index} variant={action.variant} size="sm">
																	{action.label}
																</Button>
															))}
														</div>
													</div>
												)}
											</div>
										</div>
										<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<Button 
												variant="outline" 
												size="lg"
												onClick={() => setViewingNotification(notification)}
											>
												<Eye className="h-4 w-4 mr-2" />
												View Details
											</Button>
											<Button 
												variant="outline" 
												size="lg"
												onClick={() => notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)}
											>
												{notification.read ? <BellRing className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
												{notification.read ? "Mark Unread" : "Mark Read"}
											</Button>
											<Button 
												variant="outline" 
												size="lg"
												onClick={() => archiveNotification(notification.id)}
											>
												<Archive className="h-4 w-4 mr-2" />
												Archive
											</Button>
											<Button 
												variant="outline" 
												size="lg"
												className="text-red-600 hover:text-red-700 hover:bg-red-50"
												onClick={() => deleteNotification(notification.id)}
											>
												<Trash2 className="h-4 w-4 mr-2" />
												Delete
											</Button>
										</div>
									</div>
								</div>
							);
						})}
							</div>
						</CardContent>
					</Card>

			{/* Notification View Modal */}
			<Dialog open={!!viewingNotification} onOpenChange={() => setViewingNotification(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">Notification Details</DialogTitle>
						<DialogDescription>View detailed information about this notification</DialogDescription>
					</DialogHeader>
					{viewingNotification && (
						<NotificationViewModal
							notification={viewingNotification}
							onClose={() => setViewingNotification(null)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
