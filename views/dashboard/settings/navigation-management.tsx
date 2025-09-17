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
import { Switch } from "@/components/ui/switch";
import { 
	Navigation, 
	Plus, 
	Edit, 
	Eye, 
	Trash2, 
	Search, 
	Filter, 
	Settings, 
	Globe, 
	ExternalLink, 
	ChevronDown, 
	ChevronRight, 
	GripVertical, 
	EyeOff, 
	BarChart3, 
	TrendingUp, 
	Smartphone, 
	Monitor, 
	Tablet, 
	Copy, 
	Save, 
	X, 
	Menu, 
	Home, 
	Link, 
	Folder,
	CheckCircle,
	XCircle,
	AlertTriangle,
	RefreshCw,
	Download,
	Upload
} from "lucide-react";

interface MenuItem {
	id: string;
	label: string;
	url: string;
	type: "page" | "external" | "dropdown";
	children?: MenuItem[];
	order: number;
	isVisible: boolean;
	icon?: string;
	description?: string;
	target?: "_blank" | "_self";
	clicks?: number;
	lastClick?: string;
}

const headerMenu: MenuItem[] = [
	{
		id: "1",
		label: "Home",
		url: "/",
		type: "page",
		order: 1,
		isVisible: true,
		icon: "Home",
		description: "Main landing page",
		clicks: 1250,
		lastClick: "2024-01-15",
	},
	{
		id: "2",
		label: "About",
		url: "/about",
		type: "page",
		order: 2,
		isVisible: true,
		icon: "Users",
		description: "Company information",
		clicks: 890,
		lastClick: "2024-01-14",
	},
	{
		id: "3",
		label: "Services",
		url: "/services",
		type: "dropdown",
		order: 3,
		isVisible: true,
		icon: "Folder",
		description: "Our service offerings",
		clicks: 2100,
		lastClick: "2024-01-16",
		children: [
			{
				id: "3-1",
				label: "Web Development",
				url: "/services/web-development",
				type: "page",
				order: 1,
				isVisible: true,
				icon: "Monitor",
				description: "Custom web applications",
				clicks: 650,
				lastClick: "2024-01-15",
			},
			{
				id: "3-2",
				label: "Mobile Apps",
				url: "/services/mobile-apps",
				type: "page",
				order: 2,
				isVisible: true,
				icon: "Smartphone",
				description: "iOS and Android apps",
				clicks: 420,
				lastClick: "2024-01-14",
			},
			{
				id: "3-3",
				label: "Consulting",
				url: "/services/consulting",
				type: "page",
				order: 3,
				isVisible: true,
				icon: "BarChart3",
				description: "Technical consulting",
				clicks: 280,
				lastClick: "2024-01-13",
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
		icon: "FileText",
		description: "Latest articles and news",
		clicks: 3400,
		lastClick: "2024-01-16",
	},
	{
		id: "5",
		label: "Contact",
		url: "/contact",
		type: "page",
		order: 5,
		isVisible: true,
		icon: "Mail",
		description: "Get in touch with us",
		clicks: 650,
		lastClick: "2024-01-15",
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
		icon: "Shield",
		description: "Privacy policy and data protection",
		clicks: 120,
		lastClick: "2024-01-10",
	},
	{
		id: "f2",
		label: "Terms of Service",
		url: "/terms",
		type: "page",
		order: 2,
		isVisible: true,
		icon: "FileText",
		description: "Terms and conditions",
		clicks: 85,
		lastClick: "2024-01-09",
	},
	{
		id: "f3",
		label: "Sitemap",
		url: "/sitemap",
		type: "page",
		order: 3,
		isVisible: true,
		icon: "Map",
		description: "Site structure and navigation",
		clicks: 45,
		lastClick: "2024-01-08",
	},
];

const getTypeColor = (type: string) => {
	switch (type) {
		case "page":
			return "bg-blue-500";
		case "external":
			return "bg-green-500";
		case "dropdown":
			return "bg-purple-500";
		default:
			return "bg-gray-500";
	}
};

const getTypeIcon = (type: string) => {
	switch (type) {
		case "page":
			return Globe;
		case "external":
			return ExternalLink;
		case "dropdown":
			return ChevronDown;
		default:
			return Link;
	}
};

// Menu Item Edit Modal Component
function MenuItemEditModal({ 
	item, 
	onSave, 
	onClose 
}: { 
	item: MenuItem; 
	onSave: (data: any) => void; 
	onClose: () => void; 
}) {
	const [formData, setFormData] = useState({
		label: item.label,
		url: item.url,
		type: item.type,
		description: item.description || "",
		target: item.target || "_self",
		isVisible: item.isVisible,
	});

	const handleSave = () => {
		onSave({ ...item, ...formData });
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Edit Menu Item</h3>
					<p className="text-muted-foreground">Update menu item settings and configuration</p>
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
							<Link className="h-5 w-5 text-blue-600" />
							Menu Item Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="label" className="text-sm font-medium">Label</Label>
							<Input 
								id="label" 
								value={formData.label}
								onChange={(e) => setFormData({ ...formData, label: e.target.value })}
								className="h-11"
								placeholder="Menu item label"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="url" className="text-sm font-medium">URL</Label>
							<Input 
								id="url" 
								value={formData.url}
								onChange={(e) => setFormData({ ...formData, url: e.target.value })}
								className="h-11"
								placeholder="/page-url"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="type" className="text-sm font-medium">Type</Label>
							<Select
								value={formData.type}
								onValueChange={(value: "page" | "external" | "dropdown") => setFormData({ ...formData, type: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="page">Internal Page</SelectItem>
									<SelectItem value="external">External Link</SelectItem>
									<SelectItem value="dropdown">Dropdown Menu</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-3">
							<Label htmlFor="description" className="text-sm font-medium">Description</Label>
							<Input 
								id="description" 
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								className="h-11"
								placeholder="Menu item description"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="h-5 w-5 text-green-600" />
							Advanced Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="target" className="text-sm font-medium">Link Target</Label>
							<Select
								value={formData.target}
								onValueChange={(value: "_blank" | "_self") => setFormData({ ...formData, target: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="_self">Same Window</SelectItem>
									<SelectItem value="_blank">New Window</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Visibility</Label>
								<p className="text-sm text-muted-foreground">Show or hide this menu item</p>
							</div>
							<Switch
								checked={formData.isVisible}
								onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
							/>
						</div>
						<div className="p-4 border rounded-lg bg-muted/50">
							<h4 className="font-semibold mb-2">Preview</h4>
							<div className="flex items-center gap-2 text-sm">
								<span className="font-medium">{formData.label}</span>
								<Badge className={`${getTypeColor(formData.type)} text-white`}>
									{formData.type}
								</Badge>
								{!formData.isVisible && (
									<Badge className="bg-gray-500 text-white">Hidden</Badge>
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">{formData.url}</p>
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

// Menu Item View Modal Component
function MenuItemViewModal({ 
	item, 
	onClose 
}: { 
	item: MenuItem; 
	onClose: () => void; 
}) {
	const TypeIcon = getTypeIcon(item.type);
	
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Menu Item Details</h3>
					<p className="text-muted-foreground">View detailed information about this menu item</p>
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
							<Link className="h-5 w-5 text-blue-600" />
							Menu Item Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">Label</Label>
							<p className="text-sm text-muted-foreground mt-1">{item.label}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">URL</Label>
							<p className="text-sm text-muted-foreground mt-1 font-mono">{item.url}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Type</Label>
							<div className="flex items-center gap-2 mt-1">
								<TypeIcon className="h-4 w-4" />
								<Badge className={`${getTypeColor(item.type)} text-white`}>
									{item.type}
								</Badge>
							</div>
						</div>
						<div>
							<Label className="text-sm font-medium">Description</Label>
							<p className="text-sm text-muted-foreground mt-1">{item.description || "No description"}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Status</Label>
							<div className="flex items-center gap-2 mt-1">
								{item.isVisible ? (
									<CheckCircle className="h-4 w-4 text-green-600" />
								) : (
									<XCircle className="h-4 w-4 text-gray-600" />
								)}
								<Badge className={item.isVisible ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
									{item.isVisible ? "Visible" : "Hidden"}
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<BarChart3 className="h-5 w-5 text-green-600" />
							Analytics
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">Total Clicks</Label>
							<p className="text-2xl font-bold text-blue-600">{item.clicks || 0}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Last Click</Label>
							<p className="text-sm text-muted-foreground mt-1">{item.lastClick || "Never"}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Order</Label>
							<p className="text-sm text-muted-foreground mt-1">{item.order}</p>
						</div>
						{item.children && (
							<div>
								<Label className="text-sm font-medium">Sub-items</Label>
								<p className="text-sm text-muted-foreground mt-1">{item.children.length} items</p>
							</div>
						)}
					</CardContent>
				</Card>

				{item.children && item.children.length > 0 && (
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2">
								<ChevronDown className="h-5 w-5 text-purple-600" />
								Sub-menu Items
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								{item.children.map((child) => (
									<div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex items-center gap-3">
											<div>
												<p className="font-medium">{child.label}</p>
												<p className="text-sm text-muted-foreground">{child.url}</p>
											</div>
											<Badge className={`${getTypeColor(child.type)} text-white`}>
												{child.type}
											</Badge>
										</div>
										<div className="text-sm text-muted-foreground">
											{child.clicks || 0} clicks
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

export function NavigationManagement() {
	const [headerMenuData, setHeaderMenuData] = useState(headerMenu);
	const [footerMenuData, setFooterMenuData] = useState(footerMenu);
	const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
	const [viewingItem, setViewingItem] = useState<MenuItem | null>(null);
	const [newMenuItem, setNewMenuItem] = useState({
		label: "",
		url: "",
		type: "page" as "page" | "external" | "dropdown",
		description: "",
		target: "_self" as "_blank" | "_self",
	});
	const [activeTab, setActiveTab] = useState("header");
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddingItem, setIsAddingItem] = useState(false);

	const currentMenu = activeTab === "header" ? headerMenuData : footerMenuData;
	const setCurrentMenu = activeTab === "header" ? setHeaderMenuData : setFooterMenuData;

	const filteredMenu = currentMenu.filter((item) => {
		const matchesSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 item.url.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesSearch;
	});

	const handleSaveItem = (updatedItem: MenuItem) => {
		setCurrentMenu(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
	};

	const handleAddItem = () => {
		if (newMenuItem.label && newMenuItem.url) {
			const item: MenuItem = {
				id: (currentMenu.length + 1).toString(),
				...newMenuItem,
				order: currentMenu.length + 1,
				isVisible: true,
				clicks: 0,
				lastClick: "Never",
			};
			setCurrentMenu(prev => [...prev, item]);
			setNewMenuItem({ label: "", url: "", type: "page", description: "", target: "_self" });
			setIsAddingItem(false);
		}
	};

	const handleDeleteItem = (id: string) => {
		setCurrentMenu(prev => prev.filter(item => item.id !== id));
	};

	const handleToggleVisibility = (id: string) => {
		setCurrentMenu(prev => prev.map(item => 
			item.id === id ? { ...item, isVisible: !item.isVisible } : item
		));
	};

	const getStats = () => {
		const total = currentMenu.length;
		const visible = currentMenu.filter(item => item.isVisible).length;
		const totalClicks = currentMenu.reduce((sum, item) => sum + (item.clicks || 0), 0);
		const dropdowns = currentMenu.filter(item => item.type === "dropdown").length;
		
		return { total, visible, totalClicks, dropdowns };
	};

	const stats = getStats();

	const renderMenuItem = (item: MenuItem, level = 0) => {
		const TypeIcon = getTypeIcon(item.type);
		
		return (
			<div key={item.id} className={`${level > 0 ? "ml-6 border-l-2 border-muted pl-4" : ""}`}>
				<div className="flex items-center justify-between p-4 border rounded-xl mb-3 hover:shadow-md transition-shadow">
					<div className="flex items-center gap-4">
						<div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
							<TypeIcon className="h-5 w-5 text-indigo-600" />
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-3">
								<h3 className="font-semibold text-lg">{item.label}</h3>
								<Badge className={`${getTypeColor(item.type)} text-white`}>
									{item.type}
								</Badge>
								{!item.isVisible && (
									<Badge className="bg-gray-500 text-white">Hidden</Badge>
								)}
							</div>
							<p className="text-sm text-muted-foreground">{item.url}</p>
							{item.description && (
								<p className="text-xs text-muted-foreground mt-1">{item.description}</p>
							)}
							<div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
								<span>{item.clicks || 0} clicks</span>
								<span>Order: {item.order}</span>
								{item.children && (
									<span>{item.children.length} sub-items</span>
								)}
							</div>
						</div>
					</div>
					<div className="flex gap-2">
						<Button 
							variant="outline" 
							size="lg"
							onClick={() => setViewingItem(item)}
						>
							<Eye className="h-4 w-4 mr-2" />
							View
						</Button>
						<Button 
							variant="outline" 
							size="lg"
							onClick={() => setEditingItem(item)}
						>
							<Edit className="h-4 w-4 mr-2" />
							Edit
						</Button>
						<Button 
							variant="outline" 
							size="lg"
							onClick={() => handleToggleVisibility(item.id)}
						>
							{item.isVisible ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</Button>
						<Button 
							variant="outline" 
							size="lg"
							onClick={() => handleDeleteItem(item.id)}
							className="text-red-600 hover:text-red-700"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</div>
				{item.children?.map((child) => renderMenuItem(child, level + 1))}
			</div>
		);
	};

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-2xl border border-indigo-500/20">
							<Navigation className="h-6 w-6 text-indigo-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Navigation Management</h1>
							<p className="text-muted-foreground">Manage your website's navigation menus</p>
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					<Button variant="outline" size="lg">
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
					<Button onClick={() => setIsAddingItem(true)} size="lg">
						<Plus className="h-4 w-4 mr-2" />
						Add Menu Item
					</Button>
				</div>
			</div>

			{/* Enhanced Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
								<Navigation className="h-6 w-6 text-indigo-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Items</p>
								<p className="text-2xl font-bold">{stats.total}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center">
								<Eye className="h-6 w-6 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Visible</p>
								<p className="text-2xl font-bold">{stats.visible}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<TrendingUp className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Clicks</p>
								<p className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
								<ChevronDown className="h-6 w-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Dropdowns</p>
								<p className="text-2xl font-bold">{stats.dropdowns}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Search and Filter */}
			<Card className="border-0 shadow-lg">
				<CardContent className="p-6">
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 flex-1">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search menu items..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-11"
								/>
							</div>
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

			{/* Enhanced Tabs */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="header" className="flex items-center gap-2">
						<Monitor className="h-4 w-4" />
						Header Menu
					</TabsTrigger>
					<TabsTrigger value="footer" className="flex items-center gap-2">
						<Globe className="h-4 w-4" />
						Footer Menu
					</TabsTrigger>
					<TabsTrigger value="mobile" className="flex items-center gap-2">
						<Smartphone className="h-4 w-4" />
						Mobile Menu
					</TabsTrigger>
				</TabsList>

				<TabsContent value="header" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Monitor className="h-5 w-5 text-indigo-600" />
								Header Navigation
							</CardTitle>
							<CardDescription>Manage your main navigation menu</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">{filteredMenu.map((item) => renderMenuItem(item))}</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="footer" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Globe className="h-5 w-5 text-indigo-600" />
								Footer Navigation
							</CardTitle>
							<CardDescription>Manage your footer menu links</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">{filteredMenu.map((item) => renderMenuItem(item))}</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="mobile" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Smartphone className="h-5 w-5 text-indigo-600" />
								Mobile Navigation
							</CardTitle>
							<CardDescription>Configure mobile-specific navigation settings</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
												<Menu className="h-6 w-6 text-blue-600" />
											</div>
											<div>
												<p className="font-semibold text-lg">Hamburger Menu</p>
												<p className="text-sm text-muted-foreground">Show hamburger menu on mobile devices</p>
											</div>
										</div>
										<Switch defaultChecked />
									</div>
									<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center">
												<Settings className="h-6 w-6 text-green-600" />
											</div>
											<div>
												<p className="font-semibold text-lg">Menu Style</p>
												<p className="text-sm text-muted-foreground">Slide-out sidebar menu</p>
											</div>
										</div>
										<Button variant="outline" size="lg">
											<Settings className="h-4 w-4 mr-2" />
											Configure
										</Button>
									</div>
								</div>
								<div className="p-6 border rounded-xl bg-muted/50">
									<h4 className="font-semibold mb-4">Mobile Menu Preview</h4>
									<div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
										<div className="flex items-center justify-between mb-4">
											<div className="w-8 h-8 bg-gray-200 rounded"></div>
											<div className="w-6 h-6 bg-gray-200 rounded"></div>
										</div>
										<div className="space-y-2">
											<div className="h-4 bg-gray-200 rounded w-3/4"></div>
											<div className="h-4 bg-gray-200 rounded w-1/2"></div>
											<div className="h-4 bg-gray-200 rounded w-2/3"></div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Add Menu Item Modal */}
			<Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle className="text-xl">Add Menu Item</DialogTitle>
						<DialogDescription>Create a new navigation menu item</DialogDescription>
					</DialogHeader>
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="menu-label" className="text-sm font-medium">Label</Label>
							<Input
								id="menu-label"
								placeholder="Menu item label"
								value={newMenuItem.label}
								onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="menu-url" className="text-sm font-medium">URL</Label>
							<Input
								id="menu-url"
								placeholder="/page-url"
								value={newMenuItem.url}
								onChange={(e) => setNewMenuItem({ ...newMenuItem, url: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="menu-type" className="text-sm font-medium">Type</Label>
							<Select
								value={newMenuItem.type}
								onValueChange={(value: "page" | "external" | "dropdown") => setNewMenuItem({ ...newMenuItem, type: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="page">Internal Page</SelectItem>
									<SelectItem value="external">External Link</SelectItem>
									<SelectItem value="dropdown">Dropdown Menu</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-3">
							<Label htmlFor="menu-description" className="text-sm font-medium">Description</Label>
							<Input
								id="menu-description"
								placeholder="Menu item description"
								value={newMenuItem.description}
								onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="flex gap-3">
							<Button onClick={handleAddItem} size="lg" className="flex-1">
								<Plus className="h-4 w-4 mr-2" />
								Add Item
							</Button>
							<Button variant="outline" onClick={() => setIsAddingItem(false)} size="lg">
								Cancel
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Menu Item Edit Modal */}
			<Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Edit Menu Item</DialogTitle>
						</DialogHeader>
						{editingItem && (
							<MenuItemEditModal
								item={editingItem}
								onSave={handleSaveItem}
								onClose={() => setEditingItem(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Menu Item View Modal */}
			<Dialog open={!!viewingItem} onOpenChange={() => setViewingItem(null)}>
				<DialogContent className="!max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">Menu Item Details</DialogTitle>
						<DialogDescription>View detailed information about this menu item</DialogDescription>
					</DialogHeader>
					{viewingItem && (
						<MenuItemViewModal
							item={viewingItem}
							onClose={() => setViewingItem(null)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
