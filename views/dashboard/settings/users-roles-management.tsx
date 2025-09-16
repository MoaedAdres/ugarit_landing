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

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "Active" | "Inactive" | "Pending";
	lastLogin: string;
	avatar?: string;
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
	},
	{
		id: "2",
		name: "Sarah Editor",
		email: "sarah@company.com",
		role: "Editor",
		status: "Active",
		lastLogin: "2024-01-15 09:15",
	},
	{
		id: "3",
		name: "Mike Author",
		email: "mike@company.com",
		role: "Author",
		status: "Active",
		lastLogin: "2024-01-14 16:45",
	},
	{
		id: "4",
		name: "Lisa Reviewer",
		email: "lisa@company.com",
		role: "Reviewer",
		status: "Inactive",
		lastLogin: "2024-01-10 14:20",
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
			return "bg-green-100 text-green-800";
		case "Inactive":
			return "bg-gray-100 text-gray-800";
		case "Pending":
			return "bg-yellow-100 text-yellow-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const getRoleColor = (role: string) => {
	switch (role) {
		case "Admin":
			return "bg-red-100 text-red-800";
		case "Editor":
			return "bg-blue-100 text-blue-800";
		case "Author":
			return "bg-green-100 text-green-800";
		case "Reviewer":
			return "bg-purple-100 text-purple-800";
		case "Marketing":
			return "bg-orange-100 text-orange-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function UsersRolesManagement() {
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		role: "",
	});

	const [newRole, setNewRole] = useState({
		name: "",
		description: "",
		permissions: [] as string[],
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Users & Roles Management</h2>
					<p className="text-muted-foreground">Manage user accounts and role permissions</p>
				</div>
				<div className="flex gap-2">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">
								<i className="fas fa-user-shield mr-2 h-4 w-4" />
								Add Role
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-2xl">
							<DialogHeader>
								<DialogTitle>Create New Role</DialogTitle>
								<DialogDescription>Define a new user role with specific permissions</DialogDescription>
							</DialogHeader>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="role-name">Role Name</Label>
										<Input
											id="role-name"
											placeholder="Role name"
											value={newRole.name}
											onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="role-description">Description</Label>
										<Input
											id="role-description"
											placeholder="Role description"
											value={newRole.description}
											onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label>Permissions</Label>
									<div className="grid gap-2 md:grid-cols-2">
										{allPermissions.map((permission) => (
											<div key={permission.id} className="flex items-center space-x-2">
												<Checkbox
													id={permission.id}
													checked={newRole.permissions.includes(permission.id)}
													onCheckedChange={(checked) => {
														if (checked) {
															setNewRole({
																...newRole,
																permissions: [...newRole.permissions, permission.id],
															});
														} else {
															setNewRole({
																...newRole,
																permissions: newRole.permissions.filter((p) => p !== permission.id),
															});
														}
													}}
												/>
												<div>
													<Label htmlFor={permission.id} className="text-sm font-medium">
														{permission.label}
													</Label>
													<p className="text-xs text-muted-foreground">{permission.description}</p>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="flex justify-end gap-2">
									<Button variant="outline">Cancel</Button>
									<Button>Create Role</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<i className="fas fa-user-plus mr-2 h-4 w-4" />
								Add User
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New User</DialogTitle>
								<DialogDescription>Create a new user account</DialogDescription>
							</DialogHeader>
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="user-name">Full Name</Label>
									<Input
										id="user-name"
										placeholder="John Doe"
										value={newUser.name}
										onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="user-email">Email</Label>
									<Input
										id="user-email"
										type="email"
										placeholder="john@company.com"
										value={newUser.email}
										onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="user-role">Role</Label>
									<Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
										<SelectTrigger>
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
								<div className="flex justify-end gap-2">
									<Button variant="outline">Cancel</Button>
									<Button>Add User</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<i className="fas fa-users h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{users.length}</div>
						<p className="text-xs text-muted-foreground">Registered users</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<i className="fas fa-user-check h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{users.filter((u) => u.status === "Active").length}</div>
						<p className="text-xs text-muted-foreground">Currently active</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Roles</CardTitle>
						<i className="fas fa-user-shield h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{roles.length}</div>
						<p className="text-xs text-muted-foreground">Defined roles</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
						<i className="fas fa-envelope h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">2</div>
						<p className="text-xs text-muted-foreground">Awaiting response</p>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="users" className="space-y-4">
				<TabsList>
					<TabsTrigger value="users">Users</TabsTrigger>
					<TabsTrigger value="roles">Roles</TabsTrigger>
					<TabsTrigger value="permissions">Permissions</TabsTrigger>
				</TabsList>

				<TabsContent value="users" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>User Management</CardTitle>
							<CardDescription>Manage user accounts and their roles</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>User</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Last Login</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((user) => (
										<TableRow key={user.id}>
											<TableCell>
												<div className="flex items-center gap-3">
													<Avatar className="h-8 w-8">
														<AvatarImage src={user.avatar || "/placeholder.svg"} />
														<AvatarFallback>
															{user.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<span className="font-medium">{user.name}</span>
												</div>
											</TableCell>
											<TableCell>{user.email}</TableCell>
											<TableCell>
												<Badge className={getRoleColor(user.role)}>{user.role}</Badge>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(user.status)}>{user.status}</Badge>
											</TableCell>
											<TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
											<TableCell>
												<div className="flex gap-1">
													<Button size="sm" variant="outline">
														<i className="fas fa-edit h-4 w-4" />
													</Button>
													<Button size="sm" variant="outline">
														<i className="fas fa-key h-4 w-4" />
													</Button>
													<Button size="sm" variant="outline">
														<i className="fas fa-trash h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="roles" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{roles.map((role) => (
							<Card key={role.id}>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="text-lg">{role.name}</CardTitle>
											<CardDescription>{role.description}</CardDescription>
										</div>
										<Badge variant="outline">{role.userCount} users</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div>
											<p className="text-sm font-medium mb-2">Permissions:</p>
											<div className="flex flex-wrap gap-1">
												{role.permissions.slice(0, 3).map((permission) => (
													<Badge key={permission} variant="outline" className="text-xs">
														{allPermissions.find((p) => p.id === permission)?.label}
													</Badge>
												))}
												{role.permissions.length > 3 && (
													<Badge variant="outline" className="text-xs">
														+{role.permissions.length - 3} more
													</Badge>
												)}
											</div>
										</div>
										<div className="flex gap-2">
											<Button size="sm" variant="outline">
												<i className="fas fa-edit mr-2 h-4 w-4" />
												Edit
											</Button>
											<Button size="sm" variant="outline">
												<i className="fas fa-users mr-2 h-4 w-4" />
												Users
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="permissions" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Permission Matrix</CardTitle>
							<CardDescription>Overview of role permissions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b">
											<th className="text-left p-2">Permission</th>
											{roles.map((role) => (
												<th key={role.id} className="text-center p-2 min-w-20">
													<Badge className={getRoleColor(role.name)}>{role.name}</Badge>
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{allPermissions.map((permission) => (
											<tr key={permission.id} className="border-b">
												<td className="p-2">
													<div>
														<p className="font-medium">{permission.label}</p>
														<p className="text-xs text-muted-foreground">{permission.description}</p>
													</div>
												</td>
												{roles.map((role) => (
													<td key={role.id} className="text-center p-2">
														{role.permissions.includes(permission.id) ? (
															<i className="fas fa-check text-green-600" />
														) : (
															<i className="fas fa-times text-red-600" />
														)}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
