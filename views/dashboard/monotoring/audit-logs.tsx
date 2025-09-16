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

interface AuditLog {
	id: string;
	action: string;
	resource: string;
	user: {
		name: string;
		email: string;
		avatar?: string;
	};
	timestamp: string;
	details: string;
	ipAddress: string;
	userAgent: string;
	status: "Success" | "Failed" | "Warning";
}

const auditLogs: AuditLog[] = [
	{
		id: "1",
		action: "UPDATE",
		resource: "Blog Post",
		user: {
			name: "Sarah Editor",
			email: "sarah@company.com",
		},
		timestamp: "2024-01-15T10:30:00Z",
		details: "Updated blog post 'Getting Started with Next.js 14'",
		ipAddress: "192.168.1.100",
		userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
		status: "Success",
	},
	{
		id: "2",
		action: "CREATE",
		resource: "User Account",
		user: {
			name: "John Admin",
			email: "john@company.com",
		},
		timestamp: "2024-01-15T09:15:00Z",
		details: "Created new user account for mike@company.com",
		ipAddress: "192.168.1.101",
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
		status: "Success",
	},
	{
		id: "3",
		action: "DELETE",
		resource: "Media File",
		user: {
			name: "Lisa Reviewer",
			email: "lisa@company.com",
		},
		timestamp: "2024-01-15T08:45:00Z",
		details: "Deleted media file 'old-banner.jpg'",
		ipAddress: "192.168.1.102",
		userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
		status: "Success",
	},
	{
		id: "4",
		action: "LOGIN",
		resource: "Authentication",
		user: {
			name: "Mike Author",
			email: "mike@company.com",
		},
		timestamp: "2024-01-15T08:00:00Z",
		details: "Failed login attempt - incorrect password",
		ipAddress: "192.168.1.103",
		userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
		status: "Failed",
	},
	{
		id: "5",
		action: "PUBLISH",
		resource: "Blog Post",
		user: {
			name: "Sarah Editor",
			email: "sarah@company.com",
		},
		timestamp: "2024-01-14T16:20:00Z",
		details: "Published blog post 'Best Practices for React Components'",
		ipAddress: "192.168.1.100",
		userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
		status: "Success",
	},
];

const getActionColor = (action: string) => {
	switch (action) {
		case "CREATE":
			return "bg-green-100 text-green-800";
		case "UPDATE":
			return "bg-blue-100 text-blue-800";
		case "DELETE":
			return "bg-red-100 text-red-800";
		case "PUBLISH":
			return "bg-purple-100 text-purple-800";
		case "LOGIN":
			return "bg-yellow-100 text-yellow-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "Success":
			return "bg-green-100 text-green-800";
		case "Failed":
			return "bg-red-100 text-red-800";
		case "Warning":
			return "bg-yellow-100 text-yellow-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function AuditLogs() {
	const [filterAction, setFilterAction] = useState<string>("all");
	const [filterUser, setFilterUser] = useState<string>("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [dateRange, setDateRange] = useState<Date | undefined>(new Date());

	const filteredLogs = auditLogs.filter((log) => {
		const matchesAction = filterAction === "all" || log.action === filterAction;
		const matchesUser = filterUser === "all" || log.user.email === filterUser;
		const matchesSearch =
			log.details.toLowerCase().includes(searchTerm.toLowerCase()) || log.resource.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesAction && matchesUser && matchesSearch;
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Audit Logs</h2>
					<p className="text-muted-foreground">Track all system activities and changes</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<i className="fas fa-download mr-2 h-4 w-4" />
						Export Logs
					</Button>
					<Button variant="outline">
						<i className="fas fa-filter mr-2 h-4 w-4" />
						Advanced Filter
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Activities</CardTitle>
						<i className="fas fa-history h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{auditLogs.length}</div>
						<p className="text-xs text-muted-foreground">Last 24 hours</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Failed Actions</CardTitle>
						<i className="fas fa-exclamation-triangle h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{auditLogs.filter((log) => log.status === "Failed").length}</div>
						<p className="text-xs text-muted-foreground">Requires attention</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<i className="fas fa-users h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{new Set(auditLogs.map((log) => log.user.email)).size}</div>
						<p className="text-xs text-muted-foreground">Today</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Content Changes</CardTitle>
						<i className="fas fa-edit h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{auditLogs.filter((log) => ["CREATE", "UPDATE", "DELETE", "PUBLISH"].includes(log.action)).length}
						</div>
						<p className="text-xs text-muted-foreground">Content activities</p>
					</CardContent>
				</Card>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
				<Input placeholder="Search activities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
				<Select value={filterAction} onValueChange={setFilterAction}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="All Actions" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Actions</SelectItem>
						<SelectItem value="CREATE">Create</SelectItem>
						<SelectItem value="UPDATE">Update</SelectItem>
						<SelectItem value="DELETE">Delete</SelectItem>
						<SelectItem value="PUBLISH">Publish</SelectItem>
						<SelectItem value="LOGIN">Login</SelectItem>
					</SelectContent>
				</Select>
				<Select value={filterUser} onValueChange={setFilterUser}>
					<SelectTrigger className="w-48">
						<SelectValue placeholder="All Users" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Users</SelectItem>
						{Array.from(new Set(auditLogs.map((log) => log.user.email))).map((email) => (
							<SelectItem key={email} value={email}>
								{email}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="w-48 bg-transparent">
							<i className="fas fa-calendar mr-2 h-4 w-4" />
							{/* {dateRange ? format(dateRange, "PPP") : "Pick a date"} */}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
					</PopoverContent>
				</Popover>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Activity Log</CardTitle>
					<CardDescription>Detailed system activity history</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Action</TableHead>
								<TableHead>Resource</TableHead>
								<TableHead>Details</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Timestamp</TableHead>
								<TableHead>IP Address</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredLogs.map((log) => (
								<TableRow key={log.id}>
									<TableCell>
										<div className="flex items-center gap-2">
											<Avatar className="h-6 w-6">
												<AvatarImage src={log.user.avatar || "/placeholder.svg"} />
												<AvatarFallback>
													{log.user.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium">{log.user.name}</p>
												<p className="text-xs text-muted-foreground">{log.user.email}</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge className={getActionColor(log.action)}>{log.action}</Badge>
									</TableCell>
									<TableCell>{log.resource}</TableCell>
									<TableCell className="max-w-xs">
										<p className="truncate" title={log.details}>
											{log.details}
										</p>
									</TableCell>
									<TableCell>
										<Badge className={getStatusColor(log.status)}>{log.status}</Badge>
									</TableCell>
									<TableCell className="text-sm text-muted-foreground">
										{/* {format(new Date(log.timestamp), "MMM dd, HH:mm")} */}
									</TableCell>
									<TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
