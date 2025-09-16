"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MenuItem {
	id: string;
	label: string;
	url: string;
	type: "page" | "external" | "dropdown";
	children?: MenuItem[];
	order: number;
	isVisible: boolean;
}

const headerMenu: MenuItem[] = [
	{
		id: "1",
		label: "Home",
		url: "/",
		type: "page",
		order: 1,
		isVisible: true,
	},
	{
		id: "2",
		label: "About",
		url: "/about",
		type: "page",
		order: 2,
		isVisible: true,
	},
	{
		id: "3",
		label: "Services",
		url: "/services",
		type: "dropdown",
		order: 3,
		isVisible: true,
		children: [
			{
				id: "3-1",
				label: "Web Development",
				url: "/services/web-development",
				type: "page",
				order: 1,
				isVisible: true,
			},
			{
				id: "3-2",
				label: "Mobile Apps",
				url: "/services/mobile-apps",
				type: "page",
				order: 2,
				isVisible: true,
			},
			{
				id: "3-3",
				label: "Consulting",
				url: "/services/consulting",
				type: "page",
				order: 3,
				isVisible: true,
			},
		],
	},
	{
		id: "4",
		label: "Blog",
		url: "/blog",
		type: "page",
		order: 4,
		isVisible: true,
	},
	{
		id: "5",
		label: "Contact",
		url: "/contact",
		type: "page",
		order: 5,
		isVisible: true,
	},
];

const footerMenu: MenuItem[] = [
	{
		id: "f1",
		label: "Privacy Policy",
		url: "/privacy",
		type: "page",
		order: 1,
		isVisible: true,
	},
	{
		id: "f2",
		label: "Terms of Service",
		url: "/terms",
		type: "page",
		order: 2,
		isVisible: true,
	},
	{
		id: "f3",
		label: "Sitemap",
		url: "/sitemap",
		type: "page",
		order: 3,
		isVisible: true,
	},
];

export function NavigationManagement() {
	const [newMenuItem, setNewMenuItem] = useState({
		label: "",
		url: "",
		type: "page" as "page" | "external" | "dropdown",
	});

	const renderMenuItem = (item: MenuItem, level = 0) => (
		<div key={item.id} className={`${level > 0 ? "ml-6 border-l pl-4" : ""}`}>
			<div className="flex items-center justify-between p-3 border rounded-lg mb-2">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<i className="fas fa-grip-vertical text-muted-foreground cursor-move" />
						<div>
							<p className="font-medium">{item.label}</p>
							<p className="text-sm text-muted-foreground">{item.url}</p>
						</div>
					</div>
					<div className="flex gap-2">
						<Badge variant={item.type === "dropdown" ? "secondary" : "outline"}>{item.type}</Badge>
						{!item.isVisible && <Badge variant="destructive">Hidden</Badge>}
					</div>
				</div>
				<div className="flex gap-1">
					<Button size="sm" variant="outline">
						<i className="fas fa-edit h-4 w-4" />
					</Button>
					<Button size="sm" variant="outline">
						<i className="fas fa-eye-slash h-4 w-4" />
					</Button>
					<Button size="sm" variant="outline">
						<i className="fas fa-trash h-4 w-4" />
					</Button>
				</div>
			</div>
			{item.children?.map((child) => renderMenuItem(child, level + 1))}
		</div>
	);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Navigation Management</h2>
					<p className="text-muted-foreground">Manage your website's navigation menus</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<i className="fas fa-plus mr-2 h-4 w-4" />
							Add Menu Item
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Menu Item</DialogTitle>
							<DialogDescription>Create a new navigation menu item</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="menu-label">Label</Label>
								<Input
									id="menu-label"
									placeholder="Menu item label"
									value={newMenuItem.label}
									onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="menu-url">URL</Label>
								<Input
									id="menu-url"
									placeholder="/page-url"
									value={newMenuItem.url}
									onChange={(e) => setNewMenuItem({ ...newMenuItem, url: e.target.value })}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="menu-type">Type</Label>
								<Select
									value={newMenuItem.type}
									onValueChange={(value: "page" | "external" | "dropdown") => setNewMenuItem({ ...newMenuItem, type: value })}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="page">Internal Page</SelectItem>
										<SelectItem value="external">External Link</SelectItem>
										<SelectItem value="dropdown">Dropdown Menu</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex justify-end gap-2">
								<Button variant="outline">Cancel</Button>
								<Button>Add Item</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<Tabs defaultValue="header" className="space-y-4">
				<TabsList>
					<TabsTrigger value="header">Header Menu</TabsTrigger>
					<TabsTrigger value="footer">Footer Menu</TabsTrigger>
					<TabsTrigger value="mobile">Mobile Menu</TabsTrigger>
				</TabsList>

				<TabsContent value="header" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Header Navigation</CardTitle>
							<CardDescription>Manage your main navigation menu</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">{headerMenu.map((item) => renderMenuItem(item))}</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="footer" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Footer Navigation</CardTitle>
							<CardDescription>Manage your footer menu links</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">{footerMenu.map((item) => renderMenuItem(item))}</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="mobile" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Mobile Navigation</CardTitle>
							<CardDescription>Configure mobile-specific navigation settings</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 border rounded-lg">
									<div>
										<p className="font-medium">Hamburger Menu</p>
										<p className="text-sm text-muted-foreground">Show hamburger menu on mobile devices</p>
									</div>
									<Button variant="outline">Configure</Button>
								</div>
								<div className="flex items-center justify-between p-4 border rounded-lg">
									<div>
										<p className="font-medium">Mobile Menu Style</p>
										<p className="text-sm text-muted-foreground">Slide-out sidebar menu</p>
									</div>
									<Button variant="outline">Change Style</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
