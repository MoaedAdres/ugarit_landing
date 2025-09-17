"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
	BarChart3, 
	TrendingUp, 
	TrendingDown,
	Users, 
	FileText, 
	Image, 
	Globe, 
	Eye, 
	MousePointer,
	Clock,
	Calendar,
	Activity,
	Zap,
	Target,
	Award,
	Star,
	Heart,
	MessageSquare,
	Share2,
	Download,
	Upload,
	Settings,
	Bell,
	AlertTriangle,
	CheckCircle,
	XCircle,
	Info,
	Plus,
	Edit,
	Trash2,
	Search,
	Filter,
	RefreshCw,
	ArrowUp,
	ArrowDown,
	Minus,
	MoreHorizontal,
	ExternalLink,
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
	Heart as HeartIcon,
	HeartOff,
	Monitor,
	Smartphone,
	Tablet,
	Laptop,
	Shield,
	ShieldX,
	CheckSquare,
	Square,
	MoreVertical,
	ArrowLeft,
	ArrowRight,
	ChevronUp,
	ChevronLeft,
	ChevronDown,
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
	Share2 as ShareIcon,
	Calendar as CalendarIcon,
	MapPin,
	Globe as GlobeIcon,
	Lock,
	Unlock,
	Key,
	Database,
	Server,
	Network,
	HardDrive,
	History,
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
	Image as ImageIcon,
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
	Minus as MinusIcon,
	Plus as PlusIcon,
	Equal,
	Divide,
	Calculator,
	Percent as PercentIcon,
	Infinity,
	Pi,
	Sigma,
	User
} from "lucide-react";

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

interface RecentActivity {
	id: string;
	type: "content" | "user" | "system" | "security";
	title: string;
	description: string;
	timestamp: string;
	user: string;
	status: "success" | "warning" | "error" | "info";
}

interface QuickAction {
	id: string;
	title: string;
	description: string;
	icon: any;
	href: string;
	color: string;
}

const dashboardStats: DashboardStats = {
	totalPages: 24,
	blogPosts: 156,
	mediaFiles: 1234,
	activeUsers: 8,
	totalViews: 45678,
	conversionRate: 3.2,
	avgSessionTime: "2m 34s",
	bounceRate: 42.1
};

const recentActivities: RecentActivity[] = [
	{
		id: "1",
		type: "content",
		title: "Homepage hero updated",
		description: "Updated hero section with new messaging and call-to-action",
		timestamp: "2 hours ago",
		user: "Admin User",
		status: "success"
	},
	{
		id: "2",
		type: "content",
		title: "New blog post published",
		description: "Published 'Best Practices for React Components' by Sarah Editor",
		timestamp: "5 hours ago",
		user: "Content Editor",
		status: "success"
	},
	{
		id: "3",
		type: "user",
		title: "New user registration",
		description: "Alex Smith registered and completed profile setup",
		timestamp: "1 day ago",
		user: "System",
		status: "info"
	},
	{
		id: "4",
		type: "system",
		title: "Database backup completed",
		description: "Daily backup completed successfully with 99.9% data integrity",
		timestamp: "1 day ago",
		user: "System",
		status: "success"
	},
	{
		id: "5",
		type: "security",
		title: "Failed login attempts detected",
		description: "Multiple failed attempts from IP 192.168.1.103",
		timestamp: "2 days ago",
		user: "Security System",
		status: "warning"
	},
	{
		id: "6",
		type: "content",
		title: "Service page content reviewed",
		description: "All service descriptions updated and approved",
		timestamp: "3 days ago",
		user: "Content Reviewer",
		status: "success"
	}
];

const quickActions: QuickAction[] = [
	{
		id: "1",
		title: "Create Blog Post",
		description: "Write and publish new content",
		icon: FileText,
		href: "/dashboard/blog/add",
		color: "bg-blue-500"
	},
	{
		id: "2",
		title: "Upload Media",
		description: "Add images and files",
		icon: Upload,
		href: "/dashboard/media",
		color: "bg-green-500"
	},
	{
		id: "3",
		title: "Manage Users",
		description: "View and edit user accounts",
		icon: Users,
		href: "/dashboard/users",
		color: "bg-purple-500"
	},
	{
		id: "4",
		title: "View Analytics",
		description: "Check site performance",
		icon: BarChart3,
		href: "/dashboard/analytics",
		color: "bg-orange-500"
	},
	{
		id: "5",
		title: "Settings",
		description: "Configure system settings",
		icon: Settings,
		href: "/dashboard/settings",
		color: "bg-gray-500"
	},
	{
		id: "6",
		title: "Notifications",
		description: "View system alerts",
		icon: Bell,
		href: "/dashboard/notifications",
		color: "bg-red-500"
	}
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
			return CheckCircle;
		case "warning":
			return AlertTriangle;
		case "error":
			return XCircle;
		case "info":
			return Info;
		default:
			return Info;
	}
};

const getTypeIcon = (type: string) => {
	switch (type) {
		case "content":
			return FileText;
		case "user":
			return Users;
		case "system":
			return Settings;
		case "security":
			return Shield;
		default:
			return Activity;
	}
};

// Animated Chart Components
function AnimatedBarChart({ data, labels, color = "from-blue-500 to-blue-400" }: { data: number[], labels: string[], color?: string }) {
	const [animatedData, setAnimatedData] = useState(data.map(() => 0));
	const [showTrendLine, setShowTrendLine] = useState(false);
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Animate each bar with a slight delay
						data.forEach((value, index) => {
							setTimeout(() => {
								setAnimatedData(prev => {
									const newData = [...prev];
									newData[index] = value;
									return newData;
								});
							}, index * 100); // 100ms delay between each bar
						});

						// Show trend line after bars are animated
						setTimeout(() => {
							setShowTrendLine(true);
						}, data.length * 100 + 500);
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (chartRef.current) {
			observer.observe(chartRef.current);
		}

		return () => observer.disconnect();
	}, [data]);

	// Calculate the maximum value for percentage calculation
	const maxValue = Math.max(...data);
	
	// Format numbers for display
	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	// Generate trend line path
	const generateTrendLinePath = () => {
		const width = 100; // SVG width percentage
		const height = 100; // SVG height percentage
		const points = animatedData.map((value, index) => {
			const x = (index / (data.length - 1)) * width;
			const y = height - (value / maxValue) * height;
			return `${x},${y}`;
		});
		return `M ${points.join(' L ')}`;
	};

	// Generate trend line with smooth curves
	const generateSmoothTrendLinePath = () => {
		const width = 100; // SVG width percentage
		const height = 100; // SVG height percentage
		const points = animatedData.map((value, index) => {
			const x = (index / (data.length - 1)) * width;
			const y = height - (value / maxValue) * height;
			return { x, y };
		});

		if (points.length < 2) return '';

		let path = `M ${points[0].x},${points[0].y}`;
		
		for (let i = 1; i < points.length; i++) {
			const prev = points[i - 1];
			const curr = points[i];
			const next = points[i + 1];
			
			if (next) {
				// Create smooth curve using quadratic Bézier curves
				const cp1x = prev.x + (curr.x - prev.x) / 3;
				const cp1y = prev.y;
				const cp2x = curr.x - (next.x - curr.x) / 3;
				const cp2y = curr.y;
				path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
			} else {
				path += ` L ${curr.x},${curr.y}`;
			}
		}
		
		return path;
	};

	return (
		<div ref={chartRef} className="relative">
			{/* Trend Line SVG */}
			<div className="absolute inset-0 pointer-events-none">
				<svg 
					width="100%" 
					height="100%" 
					viewBox="0 0 100 100" 
					preserveAspectRatio="none"
					className="absolute inset-0"
				>
					{/* Trend Line */}
					<path
						d={generateSmoothTrendLinePath()}
						stroke="url(#trendGradient)"
						strokeWidth="0.8"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={`transition-all duration-1000 ease-out ${
							showTrendLine ? 'opacity-100' : 'opacity-0'
						}`}
						style={{
							strokeDasharray: showTrendLine ? 'none' : '1000',
							strokeDashoffset: showTrendLine ? '0' : '1000',
						}}
					/>
					
					
					{/* Gradients */}
					<defs>
						<linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
							<stop offset="50%" stopColor="#1d4ed8" stopOpacity="1" />
							<stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
						</linearGradient>
					</defs>
				</svg>
			</div>

			{/* Bar Chart */}
			<div className="flex items-end justify-between h-48 gap-2 relative z-10">
				{animatedData.map((value, index) => {
					const percentage = (value / maxValue) * 100;
					return (
						<div key={index} className="flex flex-col items-center gap-2 flex-1">
							<div 
								className={`w-full bg-gradient-to-t ${color} rounded-t-lg transition-all duration-700 ease-out hover:from-blue-600 hover:to-blue-500`}
								style={{ height: `${percentage}%` }}
							></div>
							<span className="text-xs text-muted-foreground font-medium">{labels[index]}</span>
							<span className="text-xs text-blue-600 font-semibold">{formatNumber(value)}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function AnimatedProgressBar({ percentage, color = "from-green-500 to-emerald-500", delay = 0 }: { percentage: number, color?: string, delay?: number }) {
	const [animatedPercentage, setAnimatedPercentage] = useState(0);
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							setAnimatedPercentage(percentage);
						}, delay);
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (barRef.current) {
			observer.observe(barRef.current);
		}

		return () => observer.disconnect();
	}, [percentage, delay]);

	return (
		<div ref={barRef} className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
			<div 
				className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-1000 ease-out`}
				style={{ width: `${animatedPercentage}%` }}
			></div>
		</div>
	);
}

function AnimatedFunnelBar({ percentage, color = "from-orange-500 to-red-500", delay = 0 }: { percentage: number, color?: string, delay?: number }) {
	const [animatedPercentage, setAnimatedPercentage] = useState(0);
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							setAnimatedPercentage(percentage);
						}, delay);
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (barRef.current) {
			observer.observe(barRef.current);
		}

		return () => observer.disconnect();
	}, [percentage, delay]);

	return (
		<div ref={barRef} className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
			<div 
				className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all duration-1000 ease-out`}
				style={{ width: `${animatedPercentage}%` }}
			></div>
		</div>
	);
}

export default function DashboardPage() {
	const [selectedTab, setSelectedTab] = useState("overview");

	return (
		<div className="space-y-8">
			{/* Enhanced Header with Different Design */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%233B82F6%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
				<div className="relative flex items-start justify-between">
					<div className="space-y-3">
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
								<BarChart3 className="h-8 w-8 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
								<p className="text-white/80 text-lg">Welcome back! Here's what's happening with your site</p>
							</div>
						</div>
					</div>
					<div className="flex gap-3">
						<Button 
							variant="outline" 
							size="lg"
							className="bg-white/10 border-white/20 text-white hover:bg-white/20"
						>
							<RefreshCw className="h-4 w-4 mr-2" />
							Refresh Data
						</Button>
						<Button 
							size="lg"
							className="bg-white text-slate-900 hover:bg-white/90"
						>
							<Plus className="h-4 w-4 mr-2" />
							Quick Add
						</Button>
					</div>
				</div>
			</div>

			{/* Enhanced Analytics Cards with Different Layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
								<FileText className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Pages</p>
								<p className="text-3xl font-bold text-blue-600">{dashboardStats.totalPages}</p>
								<p className="text-xs text-green-600 flex items-center gap-1">
									<TrendingUp className="h-3 w-3" />
									+2 from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
								<FileText className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Blog Posts</p>
								<p className="text-3xl font-bold text-green-600">{dashboardStats.blogPosts}</p>
								<p className="text-xs text-green-600 flex items-center gap-1">
									<TrendingUp className="h-3 w-3" />
									+12 from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
								<Image className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Media Files</p>
								<p className="text-3xl font-bold text-purple-600">{dashboardStats.mediaFiles.toLocaleString()}</p>
								<p className="text-xs text-green-600 flex items-center gap-1">
									<TrendingUp className="h-3 w-3" />
									+89 from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
								<Users className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Active Users</p>
								<p className="text-3xl font-bold text-orange-600">{dashboardStats.activeUsers}</p>
								<p className="text-xs text-green-600 flex items-center gap-1">
									<TrendingUp className="h-3 w-3" />
									+1 from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Performance Metrics Row */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="border-0 shadow-xl">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Total Views</p>
								<p className="text-2xl font-bold">{dashboardStats.totalViews.toLocaleString()}</p>
							</div>
							<Eye className="h-8 w-8 text-blue-600" />
						</div>
						<div className="mt-4">
							<Progress value={75} className="h-2" />
							<p className="text-xs text-muted-foreground mt-2">+15% from last week</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-xl">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Conversion Rate</p>
								<p className="text-2xl font-bold">{dashboardStats.conversionRate}%</p>
							</div>
							<Target className="h-8 w-8 text-green-600" />
						</div>
						<div className="mt-4">
							<Progress value={dashboardStats.conversionRate * 10} className="h-2" />
							<p className="text-xs text-muted-foreground mt-2">+0.3% from last week</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-xl">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Avg. Session</p>
								<p className="text-2xl font-bold">{dashboardStats.avgSessionTime}</p>
							</div>
							<Clock className="h-8 w-8 text-purple-600" />
						</div>
						<div className="mt-4">
							<Progress value={65} className="h-2" />
							<p className="text-xs text-muted-foreground mt-2">+12s from last week</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-xl">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Bounce Rate</p>
								<p className="text-2xl font-bold">{dashboardStats.bounceRate}%</p>
							</div>
							<TrendingDown className="h-8 w-8 text-red-600" />
						</div>
						<div className="mt-4">
							<Progress value={dashboardStats.bounceRate} className="h-2" />
							<p className="text-xs text-muted-foreground mt-2">-2.1% from last week</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Traffic Overview Chart */}
				<Card className="border-0 shadow-xl">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<TrendingUp className="h-6 w-6 text-slate-600" />
							Traffic Overview
						</CardTitle>
						<CardDescription>Website traffic trends over the last 7 days</CardDescription>
				</CardHeader>
				<CardContent>
						<div className="space-y-4">
							{/* Animated Bar Chart with Realistic Traffic Data */}
							<AnimatedBarChart 
								data={[12450, 15680, 18920, 17230, 20150, 23480, 19870]} 
								labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
								color="from-blue-500 to-blue-400"
							/>
							<div className="space-y-3 pt-4 border-t">
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										<span className="text-sm text-muted-foreground">Page Views</span>
									</div>
									<div className="text-sm text-green-600 font-semibold">
										+12.5% from last week
									</div>
								</div>
								
								{/* Traffic Insights */}
								<div className="grid grid-cols-2 gap-4 text-xs">
									<div className="space-y-1">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Peak Day:</span>
											<span className="font-semibold text-green-600">Saturday</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Lowest Day:</span>
											<span className="font-semibold text-orange-600">Monday</span>
										</div>
									</div>
									<div className="space-y-1">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Total Views:</span>
											<span className="font-semibold">127.6K</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Avg. Daily:</span>
											<span className="font-semibold">18.2K</span>
										</div>
									</div>
								</div>
							</div>
						</div>
				</CardContent>
			</Card>

				{/* Content Performance Chart */}
				<Card className="border-0 shadow-xl">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<BarChart3 className="h-6 w-6 text-slate-600" />
							Content Performance
						</CardTitle>
						<CardDescription>Top performing content by engagement</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ title: "Homepage", views: 45600, engagement: 85 },
								{ title: "About Us", views: 28900, engagement: 78 },
								{ title: "Services", views: 23400, engagement: 72 },
								{ title: "Blog: AI Trends 2024", views: 18900, engagement: 68 },
								{ title: "Contact", views: 15200, engagement: 65 }
							].map((item, index) => (
								<div key={index} className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium">{item.title}</span>
										<span className="text-sm text-muted-foreground">{item.views.toLocaleString()} views</span>
									</div>
									<AnimatedProgressBar 
										percentage={item.engagement} 
										color="from-green-500 to-emerald-500"
										delay={index * 200}
									/>
									<div className="flex justify-between items-center text-xs text-muted-foreground">
										<span>Engagement Rate</span>
										<span className="text-green-600 font-semibold">{item.engagement}%</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Additional Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* User Activity Chart */}
				<Card className="border-0 shadow-xl">
					<CardHeader>
						<CardTitle className="text-xl flex items-center gap-2">
							<Users className="h-5 w-5 text-slate-600" />
							User Activity
						</CardTitle>
						<CardDescription>Active users by hour</CardDescription>
				</CardHeader>
				<CardContent>
						<div className="space-y-3">
							{[
								{ hour: "00:00", users: 45 },
								{ hour: "06:00", users: 89 },
								{ hour: "12:00", users: 234 },
								{ hour: "18:00", users: 189 },
								{ hour: "24:00", users: 67 }
							].map((item, index) => (
								<div key={index} className="flex items-center gap-3">
									<span className="text-xs text-muted-foreground w-12">{item.hour}</span>
									<AnimatedProgressBar 
										percentage={(item.users / 250) * 100} 
										color="from-purple-500 to-pink-500"
										delay={index * 150}
									/>
									<span className="text-xs font-semibold text-purple-600 w-8">{item.users}</span>
								</div>
							))}
						</div>
				</CardContent>
			</Card>

				{/* Device Analytics */}
				<Card className="border-0 shadow-xl">
					<CardHeader>
						<CardTitle className="text-xl flex items-center gap-2">
							<Monitor className="h-5 w-5 text-slate-600" />
							Device Analytics
						</CardTitle>
						<CardDescription>Traffic by device type</CardDescription>
				</CardHeader>
				<CardContent>
						<div className="space-y-4">
							{[
								{ device: "Desktop", percentage: 45, color: "bg-blue-500", gradient: "from-blue-500 to-blue-600" },
								{ device: "Mobile", percentage: 38, color: "bg-green-500", gradient: "from-green-500 to-green-600" },
								{ device: "Tablet", percentage: 17, color: "bg-purple-500", gradient: "from-purple-500 to-purple-600" }
							].map((item, index) => (
								<div key={index} className="space-y-2">
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-2">
											<div className={`w-3 h-3 ${item.color} rounded-full`}></div>
											<span className="text-sm font-medium">{item.device}</span>
										</div>
										<span className="text-sm font-semibold">{item.percentage}%</span>
									</div>
									<AnimatedProgressBar 
										percentage={item.percentage} 
										color={item.gradient}
										delay={index * 200}
									/>
								</div>
							))}
						</div>
				</CardContent>
			</Card>

				{/* Conversion Funnel */}
				<Card className="border-0 shadow-xl">
					<CardHeader>
						<CardTitle className="text-xl flex items-center gap-2">
							<Target className="h-5 w-5 text-slate-600" />
							Conversion Funnel
						</CardTitle>
						<CardDescription>User journey analysis</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{[
								{ step: "Visitors", count: 127600, percentage: 100 },
								{ step: "Page Views", count: 95600, percentage: 75 },
								{ step: "Engagement", count: 40800, percentage: 32 },
								{ step: "Leads", count: 5740, percentage: 4.5 },
								{ step: "Conversions", count: 1136, percentage: 0.89 }
							].map((item, index) => (
								<div key={index} className="relative">
									<div className="flex justify-between items-center mb-1">
										<span className="text-sm font-medium">{item.step}</span>
										<span className="text-sm font-semibold text-orange-600">{item.count.toLocaleString()}</span>
									</div>
									<AnimatedFunnelBar 
										percentage={item.percentage} 
										color="from-orange-500 to-red-500"
										delay={index * 300}
									/>
									<span className="text-xs text-muted-foreground">{item.percentage}%</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Main Content Area */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Recent Activity */}
				<Card className="lg:col-span-2 border-0 shadow-xl">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Activity className="h-6 w-6 text-slate-600" />
							Recent Activity
						</CardTitle>
						<CardDescription>Latest updates and changes across your site</CardDescription>
				</CardHeader>
				<CardContent>
						<div className="space-y-4">
							{recentActivities.map((activity) => {
								const StatusIcon = getStatusIcon(activity.status);
								const TypeIcon = getTypeIcon(activity.type);
								
								return (
									<div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
										<div className="relative">
											<div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
												<TypeIcon className="h-5 w-5 text-slate-600" />
											</div>
											<div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor(activity.status)} rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center`}>
												<StatusIcon className="w-2 h-2 text-white" />
											</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-1">
												<h4 className="font-semibold">{activity.title}</h4>
												<Badge variant="outline" className="text-xs">
													{activity.type}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
											<div className="flex items-center gap-4 text-xs text-muted-foreground">
												<span className="flex items-center gap-1">
													<Clock className="h-3 w-3" />
													{activity.timestamp}
												</span>
												<span className="flex items-center gap-1">
													<User className="h-3 w-3" />
													{activity.user}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
				</CardContent>
			</Card>

				{/* Quick Actions */}
				<Card className="border-0 shadow-xl">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Zap className="h-6 w-6 text-slate-600" />
							Quick Actions
						</CardTitle>
						<CardDescription>Common tasks and shortcuts</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{quickActions.map((action) => {
								const IconComponent = action.icon;
								return (
									<Button
										key={action.id}
										variant="outline"
										className="w-full justify-start h-auto p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
										asChild
									>
										<a href={action.href}>
											<div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
												<IconComponent className="h-5 w-5 text-white" />
											</div>
											<div className="text-left">
												<p className="font-semibold">{action.title}</p>
												<p className="text-xs text-muted-foreground">{action.description}</p>
											</div>
										</a>
									</Button>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* System Status */}
			<Card className="border-0 shadow-xl">
				<CardHeader>
					<CardTitle className="text-2xl flex items-center gap-2">
						<Server className="h-6 w-6 text-slate-600" />
						System Status
					</CardTitle>
					<CardDescription>Monitor your system health and performance</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
							<div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
								<CheckCircle className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="font-semibold text-green-800 dark:text-green-200">Website</p>
								<p className="text-sm text-green-600 dark:text-green-400">Operational</p>
							</div>
						</div>

						<div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
							<div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
								<Database className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="font-semibold text-green-800 dark:text-green-200">Database</p>
								<p className="text-sm text-green-600 dark:text-green-400">Healthy</p>
							</div>
						</div>

						<div className="flex items-center gap-4 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
							<div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
								<AlertTriangle className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="font-semibold text-yellow-800 dark:text-yellow-200">Storage</p>
								<p className="text-sm text-yellow-600 dark:text-yellow-400">85% Used</p>
							</div>
						</div>

						<div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
							<div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
								<Shield className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="font-semibold text-green-800 dark:text-green-200">Security</p>
								<p className="text-sm text-green-600 dark:text-green-400">Protected</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
