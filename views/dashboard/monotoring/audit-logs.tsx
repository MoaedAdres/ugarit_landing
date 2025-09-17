"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Shield,
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
	LogIn,
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface AuditLog {
	id: string;
	action: string;
	resource: string;
	user: {
		name: string;
		email: string;
		avatar?: string;
		role?: string;
		department?: string;
	};
	timestamp: string;
	details: string;
	ipAddress: string;
	userAgent: string;
	status: "Success" | "Failed" | "Warning";
	severity?: "Low" | "Medium" | "High" | "Critical";
	category?: "Authentication" | "Content" | "User Management" | "System" | "Security";
	location?: string;
	sessionId?: string;
	requestId?: string;
	changes?: {
		field: string;
		oldValue: string;
		newValue: string;
	}[];
	metadata?: {
		browser?: string;
		os?: string;
		device?: string;
		referrer?: string;
	};
}

const auditLogs: AuditLog[] = [
	{
		id: "1",
		action: "UPDATE",
		resource: "Blog Post",
		user: {
			name: "Sarah Editor",
			email: "sarah@company.com",
			role: "Editor",
			department: "Content",
		},
		timestamp: "2024-01-15T10:30:00Z",
		details: "Updated blog post 'Getting Started with Next.js 14'",
		ipAddress: "192.168.1.100",
		userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
		status: "Success",
		severity: "Low",
		category: "Content",
		location: "New York, NY",
		sessionId: "sess_abc123",
		requestId: "req_xyz789",
		changes: [
			{ field: "title", oldValue: "Getting Started with Next.js", newValue: "Getting Started with Next.js 14" },
			{ field: "content", oldValue: "Old content...", newValue: "Updated content with new features..." },
		],
		metadata: {
			browser: "Chrome 120.0",
			os: "Windows 10",
			device: "Desktop",
			referrer: "https://admin.company.com/posts",
		},
	},
	{
		id: "2",
		action: "CREATE",
		resource: "User Account",
		user: {
			name: "John Admin",
			email: "john@company.com",
			role: "Admin",
			department: "IT",
		},
		timestamp: "2024-01-15T09:15:00Z",
		details: "Created new user account for mike@company.com",
		ipAddress: "192.168.1.101",
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
		status: "Success",
		severity: "Medium",
		category: "User Management",
		location: "San Francisco, CA",
		sessionId: "sess_def456",
		requestId: "req_abc123",
		changes: [
			{ field: "email", oldValue: "", newValue: "mike@company.com" },
			{ field: "role", oldValue: "", newValue: "Author" },
		],
		metadata: {
			browser: "Safari 17.0",
			os: "macOS 14.0",
			device: "Desktop",
			referrer: "https://admin.company.com/users",
		},
	},
	{
		id: "3",
		action: "DELETE",
		resource: "Media File",
		user: {
			name: "Lisa Reviewer",
			email: "lisa@company.com",
			role: "Reviewer",
			department: "Quality",
		},
		timestamp: "2024-01-15T08:45:00Z",
		details: "Deleted media file 'old-banner.jpg'",
		ipAddress: "192.168.1.102",
		userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
		status: "Success",
		severity: "Low",
		category: "Content",
		location: "Miami, FL",
		sessionId: "sess_ghi789",
		requestId: "req_def456",
		changes: [{ field: "file", oldValue: "old-banner.jpg", newValue: "" }],
		metadata: {
			browser: "Chrome 120.0",
			os: "Windows 11",
			device: "Desktop",
			referrer: "https://admin.company.com/media",
		},
	},
	{
		id: "4",
		action: "LOGIN",
		resource: "Authentication",
		user: {
			name: "Mike Author",
			email: "mike@company.com",
			role: "Author",
			department: "Content",
		},
		timestamp: "2024-01-15T08:00:00Z",
		details: "Failed login attempt - incorrect password",
		ipAddress: "192.168.1.103",
		userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
		status: "Failed",
		severity: "High",
		category: "Authentication",
		location: "Chicago, IL",
		sessionId: "sess_jkl012",
		requestId: "req_ghi789",
		metadata: {
			browser: "Safari Mobile 17.0",
			os: "iOS 17.0",
			device: "Mobile",
			referrer: "https://company.com/login",
		},
	},
	{
		id: "5",
		action: "PUBLISH",
		resource: "Blog Post",
		user: {
			name: "Sarah Editor",
			email: "sarah@company.com",
			role: "Editor",
			department: "Content",
		},
		timestamp: "2024-01-14T16:20:00Z",
		details: "Published blog post 'Best Practices for React Components'",
		ipAddress: "192.168.1.100",
		userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
		status: "Success",
		severity: "Low",
		category: "Content",
		location: "New York, NY",
		sessionId: "sess_mno345",
		requestId: "req_jkl012",
		changes: [{ field: "status", oldValue: "Draft", newValue: "Published" }],
		metadata: {
			browser: "Chrome 120.0",
			os: "Windows 10",
			device: "Desktop",
			referrer: "https://admin.company.com/posts",
		},
	},
	{
		id: "6",
		action: "SECURITY_ALERT",
		resource: "System Security",
		user: {
			name: "System",
			email: "system@company.com",
			role: "System",
			department: "Security",
		},
		timestamp: "2024-01-15T11:45:00Z",
		details: "Multiple failed login attempts detected from suspicious IP",
		ipAddress: "203.0.113.42",
		userAgent: "Mozilla/5.0 (compatible; Bot/1.0)",
		status: "Warning",
		severity: "Critical",
		category: "Security",
		location: "Unknown",
		sessionId: "sess_pqr678",
		requestId: "req_mno345",
		metadata: {
			browser: "Unknown",
			os: "Unknown",
			device: "Bot",
			referrer: "Direct",
		},
	},
	{
		id: "7",
		action: "PERMISSION_CHANGE",
		resource: "User Role",
		user: {
			name: "John Admin",
			email: "john@company.com",
			role: "Admin",
			department: "IT",
		},
		timestamp: "2024-01-15T07:30:00Z",
		details: "Changed user permissions for lisa@company.com",
		ipAddress: "192.168.1.101",
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
		status: "Success",
		severity: "High",
		category: "User Management",
		location: "San Francisco, CA",
		sessionId: "sess_stu901",
		requestId: "req_pqr678",
		changes: [{ field: "permissions", oldValue: "read,write", newValue: "read,write,delete" }],
		metadata: {
			browser: "Safari 17.0",
			os: "macOS 14.0",
			device: "Desktop",
			referrer: "https://admin.company.com/users",
		},
	},
];

const getActionColor = (action: string) => {
	switch (action) {
		case "CREATE":
			return "bg-green-500";
		case "UPDATE":
			return "bg-blue-500";
		case "DELETE":
			return "bg-red-500";
		case "PUBLISH":
			return "bg-purple-500";
		case "LOGIN":
			return "bg-yellow-500";
		case "SECURITY_ALERT":
			return "bg-red-600";
		case "PERMISSION_CHANGE":
			return "bg-orange-500";
		default:
			return "bg-gray-500";
	}
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "Success":
			return "bg-green-500";
		case "Failed":
			return "bg-red-500";
		case "Warning":
			return "bg-yellow-500";
		default:
			return "bg-gray-500";
	}
};

const getSeverityColor = (severity: string) => {
	switch (severity) {
		case "Low":
			return "bg-green-500";
		case "Medium":
			return "bg-yellow-500";
		case "High":
			return "bg-orange-500";
		case "Critical":
			return "bg-red-600";
		default:
			return "bg-gray-500";
	}
};

const getCategoryColor = (category: string) => {
	switch (category) {
		case "Authentication":
			return "bg-blue-500";
		case "Content":
			return "bg-green-500";
		case "User Management":
			return "bg-purple-500";
		case "System":
			return "bg-gray-500";
		case "Security":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

const getActionIcon = (action: string) => {
	switch (action) {
		case "CREATE":
			return Plus;
		case "UPDATE":
			return Edit;
		case "DELETE":
			return Trash2;
		case "PUBLISH":
			return Upload;
		case "LOGIN":
			return LogIn;
		case "SECURITY_ALERT":
			return ShieldAlert;
		case "PERMISSION_CHANGE":
			return Key;
		default:
			return Activity;
	}
};

// Audit Log View Modal Component
function AuditLogViewModal({ log, onClose }: { log: AuditLog; onClose: () => void }) {
	const ActionIcon = getActionIcon(log.action);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Audit Log Details</h3>
					<p className="text-muted-foreground">View detailed information about this activity</p>
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
							<Activity className="h-5 w-5 text-blue-600" />
							Activity Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<ActionIcon className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">{log.action}</h3>
								<p className="text-muted-foreground">{log.resource}</p>
							</div>
						</div>
						<div className="space-y-3">
							<div>
								<Label className="text-sm font-medium">Details</Label>
								<p className="text-sm text-muted-foreground mt-1">{log.details}</p>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium">Status</Label>
									<div className="mt-1">
										<Badge className={`${getStatusColor(log.status)} text-white`}>{log.status}</Badge>
									</div>
								</div>
								<div>
									<Label className="text-sm font-medium">Severity</Label>
									<div className="mt-1">
										<Badge className={`${getSeverityColor(log.severity || "Low")} text-white`}>{log.severity || "Low"}</Badge>
									</div>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium">Category</Label>
								<div className="mt-1">
									<Badge className={`${getCategoryColor(log.category || "System")} text-white`}>{log.category || "System"}</Badge>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<User className="h-5 w-5 text-green-600" />
							User Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							<Avatar className="h-12 w-12">
								<AvatarImage src={log.user.avatar || "/placeholder.svg"} />
								<AvatarFallback className="text-lg">
									{log.user.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold text-lg">{log.user.name}</h3>
								<p className="text-muted-foreground">{log.user.email}</p>
								{log.user.role && (
									<Badge variant="outline" className="mt-1">
										{log.user.role}
									</Badge>
								)}
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label className="text-sm font-medium">Department</Label>
								<p className="text-sm text-muted-foreground mt-1">{log.user.department || "Not specified"}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Location</Label>
								<p className="text-sm text-muted-foreground mt-1">{log.location || "Unknown"}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Globe className="h-5 w-5 text-purple-600" />
							Technical Details
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<div>
								<Label className="text-sm font-medium">IP Address</Label>
								<p className="text-sm text-muted-foreground mt-1 font-mono">{log.ipAddress}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Session ID</Label>
								<p className="text-sm text-muted-foreground mt-1 font-mono">{log.sessionId || "N/A"}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Request ID</Label>
								<p className="text-sm text-muted-foreground mt-1 font-mono">{log.requestId || "N/A"}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Timestamp</Label>
								<p className="text-sm text-muted-foreground mt-1">{new Date(log.timestamp).toLocaleString()}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="h-5 w-5 text-orange-600" />
							Device Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{log.metadata && (
							<div className="space-y-3">
								<div>
									<Label className="text-sm font-medium">Browser</Label>
									<p className="text-sm text-muted-foreground mt-1">{log.metadata.browser || "Unknown"}</p>
								</div>
								<div>
									<Label className="text-sm font-medium">Operating System</Label>
									<p className="text-sm text-muted-foreground mt-1">{log.metadata.os || "Unknown"}</p>
								</div>
								<div>
									<Label className="text-sm font-medium">Device</Label>
									<p className="text-sm text-muted-foreground mt-1">{log.metadata.device || "Unknown"}</p>
								</div>
								<div>
									<Label className="text-sm font-medium">Referrer</Label>
									<p className="text-sm text-muted-foreground mt-1">{log.metadata.referrer || "Direct"}</p>
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				{log.changes && log.changes.length > 0 && (
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2">
								<FileText className="h-5 w-5 text-indigo-600" />
								Changes Made
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{log.changes.map((change, index) => (
									<div key={index} className="p-4 border rounded-lg">
										<div className="flex items-center justify-between mb-2">
											<h4 className="font-semibold">{change.field}</h4>
											<Badge variant="outline">Field Change</Badge>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<Label className="text-sm font-medium text-red-600">Old Value</Label>
												<p className="text-sm text-muted-foreground mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded">
													{change.oldValue || "Empty"}
												</p>
											</div>
											<div>
												<Label className="text-sm font-medium text-green-600">New Value</Label>
												<p className="text-sm text-muted-foreground mt-1 p-2 bg-green-50 dark:bg-green-900/20 rounded">
													{change.newValue || "Empty"}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}

export function AuditLogs() {
	const [logsData, setLogsData] = useState(auditLogs);
	const [viewingLog, setViewingLog] = useState<AuditLog | null>(null);
	const [filterAction, setFilterAction] = useState<string>("all");
	const [filterUser, setFilterUser] = useState<string>("all");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [filterSeverity, setFilterSeverity] = useState<string>("all");
	const [filterCategory, setFilterCategory] = useState<string>("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
	const [isRealTime, setIsRealTime] = useState(false);

	const filteredLogs = logsData.filter((log) => {
		const matchesAction = filterAction === "all" || log.action === filterAction;
		const matchesUser = filterUser === "all" || log.user.email === filterUser;
		const matchesStatus = filterStatus === "all" || log.status === filterStatus;
		const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity;
		const matchesCategory = filterCategory === "all" || log.category === filterCategory;
		const matchesSearch =
			log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.user.name.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesAction && matchesUser && matchesStatus && matchesSeverity && matchesCategory && matchesSearch;
	});

	const getStats = () => {
		const total = logsData.length;
		const success = logsData.filter((log) => log.status === "Success").length;
		const failed = logsData.filter((log) => log.status === "Failed").length;
		const warnings = logsData.filter((log) => log.status === "Warning").length;
		const critical = logsData.filter((log) => log.severity === "Critical").length;
		const uniqueUsers = new Set(logsData.map((log) => log.user.email)).size;

		return { total, success, failed, warnings, critical, uniqueUsers };
	};

	const stats = getStats();

	return (
		<div className="space-y-8">
			{/* Enhanced Header with Different Design */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-8 text-white">
				<div className="absolute inset-0"></div>
				<div className="relative flex items-start justify-between">
					<div className="space-y-3">
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
								<Shield className="h-8 w-8 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold tracking-tight">Audit Logs</h1>
								<p className="text-white/80 text-lg">Track all system activities and security events</p>
							</div>
						</div>
					</div>
					<div className="flex gap-3">
						<Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
							<Download className="h-4 w-4 mr-2" />
							Export Logs
						</Button>
						<Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" onClick={() => setIsRealTime(!isRealTime)}>
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
								<History className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Activities</p>
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
								<p className="text-sm text-muted-foreground">Success</p>
								<p className="text-3xl font-bold text-green-600">{stats.success}</p>
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
								<p className="text-sm text-muted-foreground">Failed</p>
								<p className="text-3xl font-bold text-red-600">{stats.failed}</p>
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
				<Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
								<ShieldAlert className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Critical</p>
								<p className="text-3xl font-bold text-red-600">{stats.critical}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
								<Users className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Active Users</p>
								<p className="text-3xl font-bold text-purple-600">{stats.uniqueUsers}</p>
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
									placeholder="Search activities..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-12 text-base"
								/>
							</div>
							<Select value={filterAction} onValueChange={setFilterAction}>
								<SelectTrigger className="w-[140px] h-12">
									<SelectValue placeholder="Action" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Actions</SelectItem>
									<SelectItem value="CREATE">Create</SelectItem>
									<SelectItem value="UPDATE">Update</SelectItem>
									<SelectItem value="DELETE">Delete</SelectItem>
									<SelectItem value="PUBLISH">Publish</SelectItem>
									<SelectItem value="LOGIN">Login</SelectItem>
									<SelectItem value="SECURITY_ALERT">Security Alert</SelectItem>
									<SelectItem value="PERMISSION_CHANGE">Permission Change</SelectItem>
								</SelectContent>
							</Select>
							<Select value={filterStatus} onValueChange={setFilterStatus}>
								<SelectTrigger className="w-[120px] h-12">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="Success">Success</SelectItem>
									<SelectItem value="Failed">Failed</SelectItem>
									<SelectItem value="Warning">Warning</SelectItem>
								</SelectContent>
							</Select>
							<Select value={filterSeverity} onValueChange={setFilterSeverity}>
								<SelectTrigger className="w-[120px] h-12">
									<SelectValue placeholder="Severity" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Severity</SelectItem>
									<SelectItem value="Low">Low</SelectItem>
									<SelectItem value="Medium">Medium</SelectItem>
									<SelectItem value="High">High</SelectItem>
									<SelectItem value="Critical">Critical</SelectItem>
								</SelectContent>
							</Select>
							<Select value={filterCategory} onValueChange={setFilterCategory}>
								<SelectTrigger className="w-[140px] h-12">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									<SelectItem value="Authentication">Authentication</SelectItem>
									<SelectItem value="Content">Content</SelectItem>
									<SelectItem value="User Management">User Management</SelectItem>
									<SelectItem value="System">System</SelectItem>
									<SelectItem value="Security">Security</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex gap-3">
							<Button variant="outline" size="lg">
								<RefreshCw className="h-4 w-4 mr-2" />
								Refresh
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Audit Logs Display with Different Layout */}
			<Card className="border-0 shadow-xl">
				<CardHeader>
					<CardTitle className="text-2xl flex items-center gap-2">
						<Shield className="h-6 w-6 text-slate-600" />
						Activity Log
					</CardTitle>
					<CardDescription>Detailed system activity history and security events</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredLogs.map((log) => {
							const ActionIcon = getActionIcon(log.action);

							return (
								<div
									key={log.id}
									className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-all duration-300"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-6">
											<div className="relative">
												<div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
													<ActionIcon className="h-6 w-6 text-slate-600" />
												</div>
												{log.severity === "Critical" && (
													<div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
														<AlertCircle className="w-2 h-2 text-white" />
													</div>
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2">
													<h3 className="font-semibold text-lg">{log.action}</h3>
													<Badge className={`${getActionColor(log.action)} text-white`}>{log.action}</Badge>
													<Badge className={`${getStatusColor(log.status)} text-white`}>{log.status}</Badge>
													<Badge className={`${getSeverityColor(log.severity || "Low")} text-white`}>{log.severity || "Low"}</Badge>
													{log.category && <Badge className={`${getCategoryColor(log.category)} text-white`}>{log.category}</Badge>}
												</div>
												<p className="text-slate-600 dark:text-slate-400 mb-2">{log.details}</p>
												<div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
													<div className="flex items-center gap-1">
														<User className="h-4 w-4" />
														{log.user.name} ({log.user.email})
													</div>
													<div className="flex items-center gap-1">
														<FileText className="h-4 w-4" />
														{log.resource}
													</div>
													<div className="flex items-center gap-1">
														<Clock className="h-4 w-4" />
														{new Date(log.timestamp).toLocaleString()}
													</div>
													<div className="flex items-center gap-1">
														<Globe className="h-4 w-4" />
														{log.ipAddress}
													</div>
												</div>
												{log.changes && log.changes.length > 0 && (
													<div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
														<p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
															Changes: {log.changes.length} field(s) modified
														</p>
														<div className="flex flex-wrap gap-2">
															{log.changes.slice(0, 3).map((change, index) => (
																<Badge key={index} variant="outline" className="text-xs">
																	{change.field}
																</Badge>
															))}
															{log.changes.length > 3 && (
																<Badge variant="outline" className="text-xs">
																	+{log.changes.length - 3} more
																</Badge>
															)}
														</div>
													</div>
												)}
											</div>
										</div>
										<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<Button variant="outline" size="lg" onClick={() => setViewingLog(log)}>
												<Eye className="h-4 w-4 mr-2" />
												View Details
											</Button>
											<Button variant="outline" size="lg" onClick={() => navigator.clipboard.writeText(JSON.stringify(log, null, 2))}>
												<Copy className="h-4 w-4 mr-2" />
												Copy
											</Button>
											{log.severity === "Critical" && (
												<Button variant="outline" size="lg" className="text-red-600 hover:text-red-700 hover:bg-red-50">
													<Flag className="h-4 w-4 mr-2" />
													Flag
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

			{/* Audit Log View Modal */}
			<Dialog open={!!viewingLog} onOpenChange={() => setViewingLog(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">Audit Log Details</DialogTitle>
						<DialogDescription>View detailed information about this activity</DialogDescription>
					</DialogHeader>
					{viewingLog && <AuditLogViewModal log={viewingLog} onClose={() => setViewingLog(null)} />}
				</DialogContent>
			</Dialog>
		</div>
	);
}
