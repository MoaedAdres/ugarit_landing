"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
	id: string;
	title: string;
	message: string;
	type: "info" | "warning" | "error" | "success";
	timestamp: string;
	read: boolean;
	source: string;
}

interface NotificationSetting {
	id: string;
	category: string;
	name: string;
	description: string;
	email: boolean;
	push: boolean;
	sms: boolean;
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
	},
	{
		id: "2",
		title: "New Contact Form Submission",
		message: "You have received a new contact form submission from john.doe@email.com",
		type: "info",
		timestamp: "2024-01-15T09:45:00Z",
		read: false,
		source: "Contact Forms",
	},
	{
		id: "3",
		title: "Blog Post Published",
		message: "Sarah Editor has published a new blog post 'Best Practices for React Components'",
		type: "success",
		timestamp: "2024-01-15T08:20:00Z",
		read: true,
		source: "Content Management",
	},
	{
		id: "4",
		title: "Storage Usage Warning",
		message: "Your media storage is 85% full. Consider upgrading your plan or cleaning up unused files.",
		type: "warning",
		timestamp: "2024-01-14T16:15:00Z",
		read: true,
		source: "System",
	},
	{
		id: "5",
		title: "Failed Login Attempts",
		message: "Multiple failed login attempts detected from IP 192.168.1.103",
		type: "warning",
		timestamp: "2024-01-14T14:30:00Z",
		read: true,
		source: "Security",
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
	},
	{
		id: "2",
		category: "Content",
		name: "Content Needs Review",
		description: "Notify when content is submitted for review",
		email: true,
		push: false,
		sms: false,
	},
	{
		id: "3",
		category: "Security",
		name: "Failed Login Attempts",
		description: "Notify about suspicious login activity",
		email: true,
		push: true,
		sms: true,
	},
	{
		id: "4",
		category: "Security",
		name: "New User Registration",
		description: "Notify when new users are added",
		email: true,
		push: false,
		sms: false,
	},
	{
		id: "5",
		category: "System",
		name: "Integration Errors",
		description: "Notify about third-party integration issues",
		email: true,
		push: true,
		sms: false,
	},
	{
		id: "6",
		category: "System",
		name: "Storage Warnings",
		description: "Notify about storage usage limits",
		email: true,
		push: false,
		sms: false,
	},
];

const getNotificationTypeColor = (type: string) => {
	switch (type) {
		case "error":
			return "bg-red-100 text-red-800";
		case "warning":
			return "bg-yellow-100 text-yellow-800";
		case "success":
			return "bg-green-100 text-green-800";
		case "info":
			return "bg-blue-100 text-blue-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const getNotificationIcon = (type: string) => {
	switch (type) {
		case "error":
			return "fas fa-exclamation-circle text-red-600";
		case "warning":
			return "fas fa-exclamation-triangle text-yellow-600";
		case "success":
			return "fas fa-check-circle text-green-600";
		case "info":
			return "fas fa-info-circle text-blue-600";
		default:
			return "fas fa-bell text-gray-600";
	}
};

export function NotificationsManagement() {
	const [settings, setSettings] = useState(notificationSettings);
	const unreadCount = notifications.filter((n) => !n.read).length;

	const updateSetting = (id: string, field: "email" | "push" | "sms", value: boolean) => {
		setSettings((prev) => prev.map((setting) => (setting.id === id ? { ...setting, [field]: value } : setting)));
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Notifications</h2>
					<p className="text-muted-foreground">Manage system notifications and alerts</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<i className="fas fa-check-double mr-2 h-4 w-4" />
						Mark All Read
					</Button>
					<Button variant="outline">
						<i className="fas fa-trash mr-2 h-4 w-4" />
						Clear All
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
						<i className="fas fa-bell h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{notifications.length}</div>
						<p className="text-xs text-muted-foreground">All time</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Unread</CardTitle>
						<i className="fas fa-envelope h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
						<p className="text-xs text-muted-foreground">Require attention</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Errors</CardTitle>
						<i className="fas fa-exclamation-circle h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">{notifications.filter((n) => n.type === "error").length}</div>
						<p className="text-xs text-muted-foreground">Critical issues</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Warnings</CardTitle>
						<i className="fas fa-exclamation-triangle h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-yellow-600">{notifications.filter((n) => n.type === "warning").length}</div>
						<p className="text-xs text-muted-foreground">Need review</p>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="notifications" className="space-y-4">
				<TabsList>
					<TabsTrigger value="notifications">Recent Notifications</TabsTrigger>
					<TabsTrigger value="settings">Notification Settings</TabsTrigger>
				</TabsList>

				<TabsContent value="notifications" className="space-y-4">
					<div className="space-y-4">
						{notifications.map((notification) => (
							<Card key={notification.id} className={`${!notification.read ? "border-l-4 border-l-primary" : ""}`}>
								<CardContent className="p-4">
									<div className="flex items-start gap-4">
										<div className="mt-1">
											<i className={`${getNotificationIcon(notification.type)} text-lg`} />
										</div>
										<div className="flex-1 space-y-2">
											<div className="flex justify-between items-start">
												<div>
													<h4 className="font-medium">{notification.title}</h4>
													<p className="text-sm text-muted-foreground">{notification.message}</p>
												</div>
												<div className="flex items-center gap-2">
													<Badge className={getNotificationTypeColor(notification.type)}>{notification.type}</Badge>
													{!notification.read && <Badge variant="secondary">New</Badge>}
												</div>
											</div>
											<div className="flex justify-between items-center text-xs text-muted-foreground">
												<span>From: {notification.source}</span>
												<span>{new Date(notification.timestamp).toLocaleString()}</span>
											</div>
										</div>
										<div className="flex gap-1">
											<Button size="sm" variant="outline">
												<i className="fas fa-check h-4 w-4" />
											</Button>
											<Button size="sm" variant="outline">
												<i className="fas fa-trash h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="settings" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Notification Preferences</CardTitle>
							<CardDescription>Configure how you want to receive notifications</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{["Content", "Security", "System"].map((category) => (
									<div key={category} className="space-y-4">
										<h4 className="font-medium text-lg">{category}</h4>
										<div className="space-y-4">
											{settings
												.filter((setting) => setting.category === category)
												.map((setting) => (
													<div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
														<div className="space-y-1">
															<Label className="font-medium">{setting.name}</Label>
															<p className="text-sm text-muted-foreground">{setting.description}</p>
														</div>
														<div className="flex items-center gap-6">
															<div className="flex items-center gap-2">
																<Switch
																	checked={setting.email}
																	onCheckedChange={(checked) => updateSetting(setting.id, "email", checked)}
																/>
																<Label className="text-sm">Email</Label>
															</div>
															<div className="flex items-center gap-2">
																<Switch checked={setting.push} onCheckedChange={(checked) => updateSetting(setting.id, "push", checked)} />
																<Label className="text-sm">Push</Label>
															</div>
															<div className="flex items-center gap-2">
																<Switch checked={setting.sms} onCheckedChange={(checked) => updateSetting(setting.id, "sms", checked)} />
																<Label className="text-sm">SMS</Label>
															</div>
														</div>
													</div>
												))}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
