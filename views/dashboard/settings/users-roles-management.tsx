"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
	Users,
	Plus,
	Edit,
	Eye,
	Trash2,
	Search,
	Filter,
	Settings,
	UserCheck,
	UserX,
	Shield,
	Key,
	Mail,
	Phone,
	Calendar,
	MapPin,
	Globe,
	Lock,
	Unlock,
	CheckCircle,
	XCircle,
	AlertTriangle,
	BarChart3,
	TrendingUp,
	Download,
	Upload,
	RefreshCw,
	Save,
	X,
	UserPlus,
	UserMinus,
	ShieldCheck,
	ShieldAlert,
	Activity,
	Clock,
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
	User,
	Building,
} from "lucide-react";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "Active" | "Inactive" | "Pending";
	lastLogin: string;
	avatar?: string;
	phone?: string;
	department?: string;
	location?: string;
	joinDate?: string;
	permissions?: string[];
	activity?: {
		posts: number;
		comments: number;
		logins: number;
	};
	security?: {
		twoFactor: boolean;
		lastPasswordChange: string;
		loginAttempts: number;
	};
}

interface Role {
	id: string;
	name: string;
	description: string;
	permissions: string[];
	userCount: number;
}

const users: User[] = [
	{
		id: "1",
		name: "John Admin",
		email: "john@company.com",
		role: "Admin",
		status: "Active",
		lastLogin: "2024-01-15 10:30",
		phone: "+1 (555) 123-4567",
		department: "IT",
		location: "New York, NY",
		joinDate: "2023-01-15",
		permissions: ["create", "read", "update", "delete", "manage_users", "manage_settings"],
		activity: {
			posts: 45,
			comments: 128,
			logins: 156,
		},
		security: {
			twoFactor: true,
			lastPasswordChange: "2024-01-01",
			loginAttempts: 0,
		},
	},
	{
		id: "2",
		name: "Sarah Editor",
		email: "sarah@company.com",
		role: "Editor",
		status: "Active",
		lastLogin: "2024-01-15 09:15",
		phone: "+1 (555) 234-5678",
		department: "Content",
		location: "Los Angeles, CA",
		joinDate: "2023-03-20",
		permissions: ["create", "read", "update", "publish"],
		activity: {
			posts: 89,
			comments: 67,
			logins: 134,
		},
		security: {
			twoFactor: true,
			lastPasswordChange: "2023-12-15",
			loginAttempts: 0,
		},
	},
	{
		id: "3",
		name: "Mike Author",
		email: "mike@company.com",
		role: "Author",
		status: "Active",
		lastLogin: "2024-01-14 16:45",
		phone: "+1 (555) 345-6789",
		department: "Content",
		location: "Chicago, IL",
		joinDate: "2023-06-10",
		permissions: ["create", "read", "update_own"],
		activity: {
			posts: 23,
			comments: 45,
			logins: 89,
		},
		security: {
			twoFactor: false,
			lastPasswordChange: "2023-11-20",
			loginAttempts: 2,
		},
	},
	{
		id: "4",
		name: "Lisa Reviewer",
		email: "lisa@company.com",
		role: "Reviewer",
		status: "Inactive",
		lastLogin: "2024-01-10 14:20",
		phone: "+1 (555) 456-7890",
		department: "Quality",
		location: "Miami, FL",
		joinDate: "2023-08-05",
		permissions: ["read", "review", "approve"],
		activity: {
			posts: 12,
			comments: 89,
			logins: 67,
		},
		security: {
			twoFactor: false,
			lastPasswordChange: "2023-10-15",
			loginAttempts: 1,
		},
	},
	{
		id: "5",
		name: "David Marketing",
		email: "david@company.com",
		role: "Marketing",
		status: "Pending",
		lastLogin: "Never",
		phone: "+1 (555) 567-8901",
		department: "Marketing",
		location: "Seattle, WA",
		joinDate: "2024-01-16",
		permissions: ["read", "manage_seo", "manage_analytics"],
		activity: {
			posts: 0,
			comments: 0,
			logins: 0,
		},
		security: {
			twoFactor: false,
			lastPasswordChange: "Never",
			loginAttempts: 0,
		},
	},
];

const roles: Role[] = [
	{
		id: "1",
		name: "Admin",
		description: "Full access to all features and settings",
		permissions: ["create", "read", "update", "delete", "manage_users", "manage_settings"],
		userCount: 1,
	},
	{
		id: "2",
		name: "Editor",
		description: "Can create, edit, and publish content",
		permissions: ["create", "read", "update", "publish"],
		userCount: 1,
	},
	{
		id: "3",
		name: "Author",
		description: "Can create and edit own content",
		permissions: ["create", "read", "update_own"],
		userCount: 1,
	},
	{
		id: "4",
		name: "Reviewer",
		description: "Can review and approve content",
		permissions: ["read", "review", "approve"],
		userCount: 1,
	},
	{
		id: "5",
		name: "Marketing",
		description: "Access to marketing and SEO tools",
		permissions: ["read", "manage_seo", "manage_analytics"],
		userCount: 0,
	},
];

const allPermissions = [
	{ id: "create", label: "Create Content", description: "Create new content" },
	{ id: "read", label: "Read Content", description: "View all content" },
	{ id: "update", label: "Update Content", description: "Edit any content" },
	{
		id: "update_own",
		label: "Update Own Content",
		description: "Edit own content only",
	},
	{ id: "delete", label: "Delete Content", description: "Delete content" },
	{
		id: "publish",
		label: "Publish Content",
		description: "Publish and unpublish content",
	},
	{
		id: "review",
		label: "Review Content",
		description: "Review content for approval",
	},
	{
		id: "approve",
		label: "Approve Content",
		description: "Approve content for publication",
	},
	{
		id: "manage_users",
		label: "Manage Users",
		description: "Add, edit, and remove users",
	},
	{
		id: "manage_settings",
		label: "Manage Settings",
		description: "Access system settings",
	},
	{
		id: "manage_seo",
		label: "Manage SEO",
		description: "Access SEO and marketing tools",
	},
	{
		id: "manage_analytics",
		label: "Manage Analytics",
		description: "View analytics and reports",
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Active":
			return "bg-green-500";
		case "Inactive":
			return "bg-gray-500";
		case "Pending":
			return "bg-yellow-500";
		default:
			return "bg-gray-500";
	}
};

const getRoleColor = (role: string) => {
	switch (role) {
		case "Admin":
			return "bg-red-500";
		case "Editor":
			return "bg-blue-500";
		case "Author":
			return "bg-green-500";
		case "Reviewer":
			return "bg-purple-500";
		case "Marketing":
			return "bg-orange-500";
		default:
			return "bg-gray-500";
	}
};

const getRoleIcon = (role: string) => {
	switch (role) {
		case "Admin":
			return Crown;
		case "Editor":
			return Edit;
		case "Author":
			return FileText;
		case "Reviewer":
			return CheckCircle;
		case "Marketing":
			return Target;
		default:
			return User;
	}
};

// User Edit Modal Component
function UserEditModal({ user, onSave, onClose }: { user: User; onSave: (data: any) => void; onClose: () => void }) {
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		role: user.role,
		phone: user.phone || "",
		department: user.department || "",
		location: user.location || "",
		status: user.status,
	});

	const handleSave = () => {
		onSave({ ...user, ...formData });
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Edit User</h3>
					<p className="text-muted-foreground">Update user information and settings</p>
				</div>
				<Button variant="outline" onClick={onClose}>
					<X className="h-4 w-4 mr-2" />
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<User className="h-5 w-5 text-blue-600" />
							Personal Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="name" className="text-sm font-medium">
								Full Name
							</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="h-11"
								placeholder="John Doe"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="email" className="text-sm font-medium">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								className="h-11"
								placeholder="john@company.com"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="phone" className="text-sm font-medium">
								Phone
							</Label>
							<Input
								id="phone"
								value={formData.phone}
								onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
								className="h-11"
								placeholder="+1 (555) 123-4567"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="location" className="text-sm font-medium">
								Location
							</Label>
							<Input
								id="location"
								value={formData.location}
								onChange={(e) => setFormData({ ...formData, location: e.target.value })}
								className="h-11"
								placeholder="New York, NY"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="h-5 w-5 text-green-600" />
							Account Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="role" className="text-sm font-medium">
								Role
							</Label>
							<Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{roles.map((role) => (
										<SelectItem key={role.id} value={role.name}>
											{role.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-3">
							<Label htmlFor="department" className="text-sm font-medium">
								Department
							</Label>
							<Input
								id="department"
								value={formData.department}
								onChange={(e) => setFormData({ ...formData, department: e.target.value })}
								className="h-11"
								placeholder="IT, Content, Marketing, etc."
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="status" className="text-sm font-medium">
								Status
							</Label>
							<Select
								value={formData.status}
								onValueChange={(value: "Active" | "Inactive" | "Pending") => setFormData({ ...formData, status: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Active">Active</SelectItem>
									<SelectItem value="Inactive">Inactive</SelectItem>
									<SelectItem value="Pending">Pending</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="p-4 border rounded-lg bg-muted/50">
							<h4 className="font-semibold mb-2">Preview</h4>
							<div className="flex items-center gap-3 text-sm">
								<Avatar className="h-8 w-8">
									<AvatarFallback>
										{formData.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">{formData.name}</p>
									<p className="text-muted-foreground">{formData.email}</p>
								</div>
								<Badge className={`${getRoleColor(formData.role)} text-white`}>{formData.role}</Badge>
								<Badge className={`${getStatusColor(formData.status)} text-white`}>{formData.status}</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex gap-3">
				<Button onClick={handleSave} size="lg" className="flex-1">
					<Save className="h-4 w-4 mr-2" />
					Save Changes
				</Button>
				<Button variant="outline" onClick={onClose} size="lg">
					Cancel
				</Button>
			</div>
		</div>
	);
}

// User View Modal Component
function UserViewModal({ user, onClose }: { user: User; onClose: () => void }) {
	const RoleIcon = getRoleIcon(user.role);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">User Details</h3>
					<p className="text-muted-foreground">View detailed information about this user</p>
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
							<User className="h-5 w-5 text-blue-600" />
							Personal Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							<Avatar className="h-16 w-16">
								<AvatarImage src={user.avatar || "/placeholder.svg"} />
								<AvatarFallback className="text-lg">
									{user.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold text-lg">{user.name}</h3>
								<p className="text-muted-foreground">{user.email}</p>
								<div className="flex items-center gap-2 mt-2">
									<Badge className={`${getRoleColor(user.role)} text-white`}>
										<RoleIcon className="h-3 w-3 mr-1" />
										{user.role}
									</Badge>
									<Badge className={`${getStatusColor(user.status)} text-white`}>{user.status}</Badge>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4 pt-4 border-t">
							<div>
								<Label className="text-sm font-medium">Phone</Label>
								<p className="text-sm text-muted-foreground mt-1">{user.phone || "Not provided"}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Department</Label>
								<p className="text-sm text-muted-foreground mt-1">{user.department || "Not assigned"}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Location</Label>
								<p className="text-sm text-muted-foreground mt-1">{user.location || "Not provided"}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Join Date</Label>
								<p className="text-sm text-muted-foreground mt-1">{user.joinDate || "Unknown"}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<BarChart3 className="h-5 w-5 text-green-600" />
							Activity & Security
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{user.activity && (
							<div>
								<Label className="text-sm font-medium">Activity</Label>
								<div className="grid grid-cols-3 gap-4 mt-2">
									<div className="text-center p-3 border rounded-lg">
										<p className="text-2xl font-bold text-blue-600">{user.activity.posts}</p>
										<p className="text-xs text-muted-foreground">Posts</p>
									</div>
									<div className="text-center p-3 border rounded-lg">
										<p className="text-2xl font-bold text-green-600">{user.activity.comments}</p>
										<p className="text-xs text-muted-foreground">Comments</p>
									</div>
									<div className="text-center p-3 border rounded-lg">
										<p className="text-2xl font-bold text-purple-600">{user.activity.logins}</p>
										<p className="text-xs text-muted-foreground">Logins</p>
									</div>
								</div>
							</div>
						)}
						{user.security && (
							<div>
								<Label className="text-sm font-medium">Security</Label>
								<div className="space-y-2 mt-2">
									<div className="flex items-center justify-between">
										<span className="text-sm">Two-Factor Auth</span>
										{user.security.twoFactor ? (
											<CheckCircle className="h-4 w-4 text-green-600" />
										) : (
											<XCircle className="h-4 w-4 text-red-600" />
										)}
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm">Last Password Change</span>
										<span className="text-sm text-muted-foreground">{user.security.lastPasswordChange}</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm">Failed Login Attempts</span>
										<span className="text-sm text-muted-foreground">{user.security.loginAttempts}</span>
									</div>
								</div>
							</div>
						)}
						<div>
							<Label className="text-sm font-medium">Last Login</Label>
							<p className="text-sm text-muted-foreground mt-1">{user.lastLogin}</p>
						</div>
					</CardContent>
				</Card>

				{user.permissions && user.permissions.length > 0 && (
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2">
								<Shield className="h-5 w-5 text-purple-600" />
								Permissions
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{user.permissions.map((permission) => (
									<Badge key={permission} variant="outline" className="px-3 py-1">
										<Shield className="h-3 w-3 mr-1" />
										{allPermissions.find((p) => p.id === permission)?.label || permission}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}

export function UsersRolesManagement() {
	const [usersData, setUsersData] = useState(users);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [viewingUser, setViewingUser] = useState<User | null>(null);
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		role: "",
		phone: "",
		department: "",
		location: "",
	});
	const [newRole, setNewRole] = useState({
		name: "",
		description: "",
		permissions: [] as string[],
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [roleFilter, setRoleFilter] = useState("all");
	const [isAddingUser, setIsAddingUser] = useState(false);
	const [isAddingRole, setIsAddingRole] = useState(false);

	const filteredUsers = usersData.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.department?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || user.status === statusFilter;
		const matchesRole = roleFilter === "all" || user.role === roleFilter;
		return matchesSearch && matchesStatus && matchesRole;
	});

	const handleSaveUser = (updatedUser: User) => {
		setUsersData((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
	};

	const handleAddUser = () => {
		if (newUser.name && newUser.email && newUser.role) {
			const user: User = {
				id: (usersData.length + 1).toString(),
				...newUser,
				status: "Pending",
				lastLogin: "Never",
				joinDate: new Date().toISOString().split("T")[0],
				permissions: roles.find((r) => r.name === newUser.role)?.permissions || [],
				activity: {
					posts: 0,
					comments: 0,
					logins: 0,
				},
				security: {
					twoFactor: false,
					lastPasswordChange: "Never",
					loginAttempts: 0,
				},
			};
			setUsersData((prev) => [...prev, user]);
			setNewUser({ name: "", email: "", role: "", phone: "", department: "", location: "" });
			setIsAddingUser(false);
		}
	};

	const handleDeleteUser = (id: string) => {
		setUsersData((prev) => prev.filter((user) => user.id !== id));
	};

	const handleToggleStatus = (id: string) => {
		setUsersData((prev) =>
			prev.map((user) =>
				user.id === id
					? {
							...user,
							status: user.status === "Active" ? "Inactive" : "Active",
					  }
					: user
			)
		);
	};

	const getStats = () => {
		const total = usersData.length;
		const active = usersData.filter((user) => user.status === "Active").length;
		const pending = usersData.filter((user) => user.status === "Pending").length;
		const admins = usersData.filter((user) => user.role === "Admin").length;
		const twoFactor = usersData.filter((user) => user.security?.twoFactor).length;

		return { total, active, pending, admins, twoFactor };
	};

	const stats = getStats();

	return (
		<div className="space-y-8">
			{/* Enhanced Header with Different Design */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
				<div className="absolute inset-0"></div>
				<div className="relative flex items-start justify-between">
					<div className="space-y-3">
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
								<Users className="h-8 w-8 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold tracking-tight">User Management</h1>
								<p className="text-white/80 text-lg">Manage user accounts, roles, and permissions</p>
							</div>
						</div>
					</div>
					<div className="flex gap-3">
						<Button
							variant="outline"
							size="lg"
							className="bg-white/10 border-white/20 text-white hover:bg-white/20"
							onClick={() => setIsAddingRole(true)}
						>
							<Shield className="h-4 w-4 mr-2" />
							Add Role
						</Button>
						<Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" onClick={() => setIsAddingUser(true)}>
							<UserPlus className="h-4 w-4 mr-2" />
							Add User
						</Button>
					</div>
				</div>
			</div>

			{/* Enhanced Analytics Cards with Different Layout */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
				<Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
								<Users className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Users</p>
								<p className="text-3xl font-bold text-blue-600">{stats.total}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
								<UserCheck className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Active</p>
								<p className="text-3xl font-bold text-green-600">{stats.active}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
								<Clock className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Pending</p>
								<p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
								<Crown className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Admins</p>
								<p className="text-3xl font-bold text-red-600">{stats.admins}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
								<ShieldCheck className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">2FA Enabled</p>
								<p className="text-3xl font-bold text-purple-600">{stats.twoFactor}</p>
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
									placeholder="Search users..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-12 text-base"
								/>
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[180px] h-12">
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="Active">Active</SelectItem>
									<SelectItem value="Inactive">Inactive</SelectItem>
									<SelectItem value="Pending">Pending</SelectItem>
								</SelectContent>
							</Select>
							<Select value={roleFilter} onValueChange={setRoleFilter}>
								<SelectTrigger className="w-[180px] h-12">
									<SelectValue placeholder="Filter by role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Roles</SelectItem>
									{roles.map((role) => (
										<SelectItem key={role.id} value={role.name}>
											{role.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex gap-3">
							<Button variant="outline" size="lg">
								<Download className="h-4 w-4 mr-2" />
								Export
							</Button>
							<Button variant="outline" size="lg">
								<RefreshCw className="h-4 w-4 mr-2" />
								Refresh
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Users Display with Different Layout */}
			<Card className="border-0 shadow-xl">
				<CardHeader>
					<CardTitle className="text-2xl flex items-center gap-2">
						<Users className="h-6 w-6 text-slate-600" />
						User Directory
					</CardTitle>
					<CardDescription>Manage user accounts and their roles</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredUsers.map((user) => {
							const RoleIcon = getRoleIcon(user.role);

							return (
								<div
									key={user.id}
									className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-all duration-300"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-6">
											<div className="relative">
												<Avatar className="h-16 w-16 ring-4 ring-white dark:ring-slate-800 shadow-lg">
													<AvatarImage src={user.avatar || "/placeholder.svg"} />
													<AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
														{user.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												{user.status === "Active" && (
													<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
														<div className="w-2 h-2 bg-white rounded-full"></div>
													</div>
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2">
													<h3 className="font-semibold text-xl">{user.name}</h3>
													<Badge className={`${getRoleColor(user.role)} text-white`}>
														<RoleIcon className="h-3 w-3 mr-1" />
														{user.role}
													</Badge>
													<Badge className={`${getStatusColor(user.status)} text-white`}>{user.status}</Badge>
												</div>
												<p className="text-slate-600 dark:text-slate-400 mb-2">{user.email}</p>
												<div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
													{user.department && (
														<div className="flex items-center gap-1">
															<Building className="h-4 w-4" />
															{user.department}
														</div>
													)}
													{user.location && (
														<div className="flex items-center gap-1">
															<MapPin className="h-4 w-4" />
															{user.location}
														</div>
													)}
													<div className="flex items-center gap-1">
														<Calendar className="h-4 w-4" />
														Last login: {user.lastLogin}
													</div>
												</div>
												{user.activity && (
													<div className="flex items-center gap-6 mt-3">
														<div className="flex items-center gap-1 text-sm">
															<FileText className="h-4 w-4 text-blue-500" />
															<span className="font-medium">{user.activity.posts}</span>
															<span className="text-slate-500">posts</span>
														</div>
														<div className="flex items-center gap-1 text-sm">
															<MessageSquare className="h-4 w-4 text-green-500" />
															<span className="font-medium">{user.activity.comments}</span>
															<span className="text-slate-500">comments</span>
														</div>
														<div className="flex items-center gap-1 text-sm">
															<Activity className="h-4 w-4 text-purple-500" />
															<span className="font-medium">{user.activity.logins}</span>
															<span className="text-slate-500">logins</span>
														</div>
													</div>
												)}
											</div>
										</div>
										<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<Button variant="outline" size="lg" onClick={() => setViewingUser(user)}>
												<Eye className="h-4 w-4 mr-2" />
												View
											</Button>
											<Button variant="outline" size="lg" onClick={() => setEditingUser(user)}>
												<Edit className="h-4 w-4 mr-2" />
												Edit
											</Button>
											<Button variant="outline" size="lg" onClick={() => handleToggleStatus(user.id)}>
												{user.status === "Active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
											</Button>
											<Button
												variant="outline"
												size="lg"
												onClick={() => handleDeleteUser(user.id)}
												className="text-red-600 hover:text-red-700 hover:bg-red-50"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* Add User Modal */}
			<Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle className="text-xl">Add New User</DialogTitle>
						<DialogDescription>Create a new user account</DialogDescription>
					</DialogHeader>
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<Label htmlFor="user-name" className="text-sm font-medium">
									Full Name
								</Label>
								<Input
									id="user-name"
									placeholder="John Doe"
									value={newUser.name}
									onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
									className="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="user-email" className="text-sm font-medium">
									Email
								</Label>
								<Input
									id="user-email"
									type="email"
									placeholder="john@company.com"
									value={newUser.email}
									onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
									className="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="user-phone" className="text-sm font-medium">
									Phone
								</Label>
								<Input
									id="user-phone"
									placeholder="+1 (555) 123-4567"
									value={newUser.phone}
									onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
									className="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="user-role" className="text-sm font-medium">
									Role
								</Label>
								<Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
									<SelectTrigger className="h-11">
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										{roles.map((role) => (
											<SelectItem key={role.id} value={role.name}>
												{role.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-3">
								<Label htmlFor="user-department" className="text-sm font-medium">
									Department
								</Label>
								<Input
									id="user-department"
									placeholder="IT, Content, Marketing, etc."
									value={newUser.department}
									onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
									className="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="user-location" className="text-sm font-medium">
									Location
								</Label>
								<Input
									id="user-location"
									placeholder="New York, NY"
									value={newUser.location}
									onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
									className="h-11"
								/>
							</div>
						</div>
						<div className="flex gap-3">
							<Button onClick={handleAddUser} size="lg" className="flex-1">
								<UserPlus className="h-4 w-4 mr-2" />
								Add User
							</Button>
							<Button variant="outline" onClick={() => setIsAddingUser(false)} size="lg">
								Cancel
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* User Edit Modal */}
			<Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Edit User</DialogTitle>
						</DialogHeader>
						{editingUser && <UserEditModal user={editingUser} onSave={handleSaveUser} onClose={() => setEditingUser(null)} />}
					</div>
				</DialogContent>
			</Dialog>

			{/* User View Modal */}
			<Dialog open={!!viewingUser} onOpenChange={() => setViewingUser(null)}>
				<DialogContent className="!max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">User Details</DialogTitle>
						<DialogDescription>View detailed information about this user</DialogDescription>
					</DialogHeader>
					{viewingUser && <UserViewModal user={viewingUser} onClose={() => setViewingUser(null)} />}
				</DialogContent>
			</Dialog>
		</div>
	);
}
