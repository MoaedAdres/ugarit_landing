"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
	Search, 
	Settings, 
	Globe, 
	Share2, 
	BarChart3, 
	Edit, 
	Eye, 
	Save, 
	Upload, 
	CheckCircle, 
	AlertTriangle, 
	XCircle,
	TrendingUp,
	Users,
	MousePointer,
	ExternalLink,
	Copy,
	RefreshCw,
	Zap,
	Target,
	FileText,
	Image,
	Link
} from "lucide-react";

const seoPages = [
	{
		id: 1,
		page: "Homepage",
		url: "/",
		title: "Professional Web Development Services | TechCorp",
		metaDescription: "Leading web development company offering custom solutions for businesses worldwide.",
		keywords: "web development, custom software, business solutions",
		status: "Optimized",
		lastUpdated: "2024-01-15",
		ogTitle: "TechCorp - Professional Web Development",
		ogDescription: "Leading web development company offering custom solutions for businesses worldwide.",
		ogImage: "/og-homepage.jpg",
		twitterCard: "summary_large_image",
		canonicalUrl: "https://techcorp.com/",
		robots: "index, follow",
		priority: 1.0,
		changeFrequency: "weekly",
	},
	{
		id: 2,
		page: "About Us",
		url: "/about",
		title: "About TechCorp - Expert Development Team",
		metaDescription: "Learn about our experienced team and company mission.",
		keywords: "about us, team, company history",
		status: "Needs Review",
		lastUpdated: "2024-01-10",
		ogTitle: "About TechCorp - Expert Development Team",
		ogDescription: "Learn about our experienced team and company mission.",
		ogImage: "/og-about.jpg",
		twitterCard: "summary_large_image",
		canonicalUrl: "https://techcorp.com/about",
		robots: "index, follow",
		priority: 0.8,
		changeFrequency: "monthly",
	},
	{
		id: 3,
		page: "Services",
		url: "/services",
		title: "Web Development Services - TechCorp",
		metaDescription: "Comprehensive web development services including frontend, backend, and mobile solutions.",
		keywords: "services, web development, mobile apps",
		status: "Optimized",
		lastUpdated: "2024-01-12",
		ogTitle: "Web Development Services - TechCorp",
		ogDescription: "Comprehensive web development services including frontend, backend, and mobile solutions.",
		ogImage: "/og-services.jpg",
		twitterCard: "summary_large_image",
		canonicalUrl: "https://techcorp.com/services",
		robots: "index, follow",
		priority: 0.9,
		changeFrequency: "weekly",
	},
	{
		id: 4,
		page: "Contact",
		url: "/contact",
		title: "Contact TechCorp - Get In Touch",
		metaDescription: "Get in touch with our team for your web development needs.",
		keywords: "contact, get in touch, support",
		status: "Poor",
		lastUpdated: "2024-01-08",
		ogTitle: "Contact TechCorp - Get In Touch",
		ogDescription: "Get in touch with our team for your web development needs.",
		ogImage: "/og-contact.jpg",
		twitterCard: "summary_large_image",
		canonicalUrl: "https://techcorp.com/contact",
		robots: "index, follow",
		priority: 0.7,
		changeFrequency: "monthly",
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Optimized":
			return "bg-green-500";
		case "Needs Review":
			return "bg-yellow-500";
		case "Poor":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

const getStatusIcon = (status: string) => {
	switch (status) {
		case "Optimized":
			return CheckCircle;
		case "Needs Review":
			return AlertTriangle;
		case "Poor":
			return XCircle;
		default:
			return AlertTriangle;
	}
};

// SEO Page Edit Modal Component
function SEOPageEditModal({ 
	page, 
	onSave, 
	onClose 
}: { 
	page: any; 
	onSave: (data: any) => void; 
	onClose: () => void; 
}) {
	const [formData, setFormData] = useState({
		title: page.title,
		metaDescription: page.metaDescription,
		keywords: page.keywords,
		ogTitle: page.ogTitle,
		ogDescription: page.ogDescription,
		ogImage: page.ogImage,
		twitterCard: page.twitterCard,
		canonicalUrl: page.canonicalUrl,
		robots: page.robots,
		priority: page.priority,
		changeFrequency: page.changeFrequency,
	});

	const handleSave = () => {
		onSave({ ...page, ...formData });
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Edit SEO Settings</h3>
					<p className="text-muted-foreground">Configure SEO settings for {page.page}</p>
				</div>
				<Button variant="outline" onClick={onClose}>
					<XCircle className="h-4 w-4 mr-2" />
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Search className="h-5 w-5 text-blue-600" />
							Basic SEO
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="title" className="text-sm font-medium">Page Title</Label>
							<Input 
								id="title" 
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								className="h-11"
								placeholder="Enter page title"
							/>
							<p className="text-xs text-muted-foreground">
								{formData.title.length}/60 characters (Recommended: 50-60)
							</p>
						</div>
						<div className="space-y-3">
							<Label htmlFor="meta-description" className="text-sm font-medium">Meta Description</Label>
							<Textarea 
								id="meta-description" 
								value={formData.metaDescription}
								onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
								rows={3}
								className="resize-none"
								placeholder="Enter meta description"
							/>
							<p className="text-xs text-muted-foreground">
								{formData.metaDescription.length}/160 characters (Recommended: 150-160)
							</p>
						</div>
						<div className="space-y-3">
							<Label htmlFor="keywords" className="text-sm font-medium">Keywords</Label>
							<Input 
								id="keywords" 
								value={formData.keywords}
								onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
								className="h-11"
								placeholder="Enter keywords separated by commas"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Share2 className="h-5 w-5 text-purple-600" />
							Social Media
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="og-title" className="text-sm font-medium">Open Graph Title</Label>
							<Input 
								id="og-title" 
								value={formData.ogTitle}
								onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
								className="h-11"
								placeholder="Enter OG title"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="og-description" className="text-sm font-medium">Open Graph Description</Label>
							<Textarea 
								id="og-description" 
								value={formData.ogDescription}
								onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
								rows={3}
								className="resize-none"
								placeholder="Enter OG description"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="og-image" className="text-sm font-medium">Open Graph Image</Label>
							<div className="flex gap-2">
								<Input 
									id="og-image" 
									value={formData.ogImage}
									onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
									className="h-11"
									placeholder="Enter image URL"
								/>
								<Button variant="outline" size="lg">
									<Upload className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="h-5 w-5 text-green-600" />
							Technical SEO
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="canonical-url" className="text-sm font-medium">Canonical URL</Label>
							<Input 
								id="canonical-url" 
								value={formData.canonicalUrl}
								onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
								className="h-11"
								placeholder="Enter canonical URL"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="robots" className="text-sm font-medium">Robots Meta</Label>
							<Input 
								id="robots" 
								value={formData.robots}
								onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
								className="h-11"
								placeholder="e.g., index, follow"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-3">
								<Label htmlFor="priority" className="text-sm font-medium">Sitemap Priority</Label>
								<Input 
									id="priority" 
									type="number"
									step="0.1"
									min="0"
									max="1"
									value={formData.priority}
									onChange={(e) => setFormData({ ...formData, priority: parseFloat(e.target.value) })}
									className="h-11"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="change-frequency" className="text-sm font-medium">Change Frequency</Label>
								<Input 
									id="change-frequency" 
									value={formData.changeFrequency}
									onChange={(e) => setFormData({ ...formData, changeFrequency: e.target.value })}
									className="h-11"
									placeholder="e.g., weekly"
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Eye className="h-5 w-5 text-orange-600" />
							Preview
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="border rounded-lg p-4 bg-muted/50">
								<h4 className="font-medium text-blue-600 hover:underline cursor-pointer">
									{formData.title}
								</h4>
								<p className="text-sm text-green-600">https://techcorp.com{page.url}</p>
								<p className="text-sm text-muted-foreground mt-1">
									{formData.metaDescription}
								</p>
							</div>
							<div className="border rounded-lg p-4 bg-muted/50">
								<div className="flex items-center gap-2 mb-2">
									<Share2 className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">Social Media Preview</span>
								</div>
								<div className="bg-white border rounded p-3">
									<div className="w-full h-32 bg-muted rounded mb-2"></div>
									<h5 className="font-medium text-sm">{formData.ogTitle}</h5>
									<p className="text-xs text-muted-foreground">{formData.ogDescription}</p>
									<p className="text-xs text-muted-foreground mt-1">techcorp.com</p>
								</div>
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

export function SEOSettings() {
	const [pagesData, setPagesData] = useState(seoPages);
	const [globalSettings, setGlobalSettings] = useState({
		siteTitle: "TechCorp - Professional Web Development",
		siteDescription: "Leading web development company offering custom solutions for businesses worldwide.",
		defaultKeywords: "web development, custom software, business solutions",
		googleAnalytics: "GA-XXXXXXXXX",
		googleTagManager: "GTM-XXXXXXX",
		facebookPixel: "123456789012345",
		googleSearchConsole: true,
		xmlSitemap: true,
		robotsTxt: true,
		ogTitle: "TechCorp - Professional Web Development",
		ogDescription: "Leading web development company offering custom solutions for businesses worldwide.",
		ogImage: "/og-default.jpg",
		twitterSite: "@techcorp",
		twitterCard: "summary_large_image",
	});
	const [editingPage, setEditingPage] = useState<any>(null);
	const [viewingPage, setViewingPage] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredPages = pagesData.filter((page) => {
		const matchesSearch = page.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 page.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || page.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const handleSavePage = (updatedPage: any) => {
		setPagesData(prev => prev.map(page => page.id === updatedPage.id ? updatedPage : page));
	};

	const handleSaveGlobal = () => {
		// Here you would save global settings
		alert("Global settings saved successfully!");
	};

	const getSEOStats = () => {
		const total = pagesData.length;
		const optimized = pagesData.filter(p => p.status === "Optimized").length;
		const needsReview = pagesData.filter(p => p.status === "Needs Review").length;
		const poor = pagesData.filter(p => p.status === "Poor").length;
		const avgScore = Math.round((optimized * 100 + needsReview * 60 + poor * 20) / total);
		
		return { total, optimized, needsReview, poor, avgScore };
	};

	const stats = getSEOStats();

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-emerald-500/20">
							<Search className="h-6 w-6 text-emerald-600" />
						</div>
				<div>
							<h1 className="text-3xl font-bold tracking-tight">SEO Settings</h1>
							<p className="text-muted-foreground">Manage search engine optimization and performance</p>
						</div>
					</div>
				</div>
				<Button onClick={handleSaveGlobal} size="lg">
					<Save className="h-4 w-4 mr-2" />
					Save All Changes
				</Button>
			</div>

			{/* Enhanced Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center">
								<Target className="h-6 w-6 text-emerald-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">SEO Score</p>
								<p className="text-2xl font-bold">{stats.avgScore}%</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center">
								<CheckCircle className="h-6 w-6 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Optimized</p>
								<p className="text-2xl font-bold">{stats.optimized}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center">
								<AlertTriangle className="h-6 w-6 text-yellow-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Needs Review</p>
								<p className="text-2xl font-bold">{stats.needsReview}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
								<XCircle className="h-6 w-6 text-red-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Poor</p>
								<p className="text-2xl font-bold">{stats.poor}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="global" className="space-y-6">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="global" className="flex items-center gap-2">
						<Globe className="h-4 w-4" />
						Global Settings
					</TabsTrigger>
					<TabsTrigger value="pages" className="flex items-center gap-2">
						<FileText className="h-4 w-4" />
						Page SEO
					</TabsTrigger>
					<TabsTrigger value="social" className="flex items-center gap-2">
						<Share2 className="h-4 w-4" />
						Social Media
					</TabsTrigger>
					<TabsTrigger value="analytics" className="flex items-center gap-2">
						<BarChart3 className="h-4 w-4" />
						Analytics
					</TabsTrigger>
				</TabsList>

				<TabsContent value="global" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Globe className="h-5 w-5 text-emerald-600" />
								Global SEO Settings
							</CardTitle>
							<CardDescription>Default settings applied across your website</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div className="space-y-3">
									<Label htmlFor="site-title" className="text-sm font-medium">Site Title</Label>
									<Input
										id="site-title"
										value={globalSettings.siteTitle}
										onChange={(e) =>
											setGlobalSettings({
												...globalSettings,
												siteTitle: e.target.value,
											})
										}
										className="h-11"
									/>
									<p className="text-xs text-muted-foreground">
										{globalSettings.siteTitle.length}/60 characters (Recommended: 50-60)
									</p>
								</div>
								<div className="space-y-3">
									<Label htmlFor="default-keywords" className="text-sm font-medium">Default Keywords</Label>
									<Input
										id="default-keywords"
										value={globalSettings.defaultKeywords}
										onChange={(e) =>
											setGlobalSettings({
												...globalSettings,
												defaultKeywords: e.target.value,
											})
										}
										className="h-11"
									/>
								</div>
							</div>
							<div className="space-y-3">
								<Label htmlFor="site-description" className="text-sm font-medium">Site Description</Label>
								<Textarea
									id="site-description"
									value={globalSettings.siteDescription}
									onChange={(e) =>
										setGlobalSettings({
											...globalSettings,
											siteDescription: e.target.value,
										})
									}
									rows={3}
									className="resize-none"
								/>
								<p className="text-xs text-muted-foreground">
									{globalSettings.siteDescription.length}/160 characters (Recommended: 150-160)
								</p>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Settings className="h-5 w-5 text-blue-600" />
								Technical SEO
							</CardTitle>
							<CardDescription>Configure technical SEO features</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between p-4 border rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">XML Sitemap</Label>
									<p className="text-sm text-muted-foreground">Automatically generate XML sitemap</p>
								</div>
								<Switch
									checked={globalSettings.xmlSitemap}
									onCheckedChange={(checked) =>
										setGlobalSettings({
											...globalSettings,
											xmlSitemap: checked,
										})
									}
								/>
							</div>
							<div className="flex items-center justify-between p-4 border rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Robots.txt</Label>
									<p className="text-sm text-muted-foreground">Generate robots.txt file</p>
								</div>
								<Switch
									checked={globalSettings.robotsTxt}
									onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, robotsTxt: checked })}
								/>
							</div>
							<div className="flex items-center justify-between p-4 border rounded-lg">
								<div className="space-y-1">
									<Label className="text-sm font-medium">Google Search Console</Label>
									<p className="text-sm text-muted-foreground">Enable Search Console integration</p>
								</div>
								<Switch
									checked={globalSettings.googleSearchConsole}
									onCheckedChange={(checked) =>
										setGlobalSettings({
											...globalSettings,
											googleSearchConsole: checked,
										})
									}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="pages" className="space-y-6">
					{/* Search and Filter */}
					<Card className="border-0 shadow-lg">
						<CardContent className="p-6">
							<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
								<div className="flex flex-col sm:flex-row gap-4 flex-1">
									<div className="relative flex-1 max-w-md">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											placeholder="Search pages..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="pl-10 h-11"
										/>
									</div>
									<select
										value={statusFilter}
										onChange={(e) => setStatusFilter(e.target.value)}
										className="h-11 px-3 py-2 border border-input bg-background rounded-md text-sm"
									>
										<option value="all">All Status</option>
										<option value="Optimized">Optimized</option>
										<option value="Needs Review">Needs Review</option>
										<option value="Poor">Poor</option>
									</select>
								</div>
								<Button size="lg">
									<RefreshCw className="h-4 w-4 mr-2" />
									Refresh
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<FileText className="h-5 w-5 text-emerald-600" />
								Page SEO Management
							</CardTitle>
							<CardDescription>Manage SEO settings for individual pages</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{filteredPages.map((page) => {
									const StatusIcon = getStatusIcon(page.status);
									return (
										<div key={page.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
											<div className="flex items-start justify-between">
												<div className="flex-1 space-y-3">
													<div className="flex items-center gap-3">
														<div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg flex items-center justify-center">
															<FileText className="h-5 w-5 text-emerald-600" />
														</div>
												<div>
															<h3 className="font-semibold text-lg">{page.page}</h3>
													<p className="text-sm text-muted-foreground">{page.url}</p>
														</div>
													</div>
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
														<div>
															<p className="text-sm font-medium text-muted-foreground mb-1">Title</p>
															<p className="text-sm truncate" title={page.title}>{page.title}</p>
														</div>
														<div>
															<p className="text-sm font-medium text-muted-foreground mb-1">Meta Description</p>
															<p className="text-sm truncate" title={page.metaDescription}>{page.metaDescription}</p>
														</div>
													</div>
													<div className="flex items-center gap-4">
														<div className="flex items-center gap-2">
															<StatusIcon className="h-4 w-4" />
															<Badge className={`${getStatusColor(page.status)} text-white`}>
																{page.status}
															</Badge>
														</div>
														<span className="text-sm text-muted-foreground">Updated {page.lastUpdated}</span>
													</div>
												</div>
												<div className="flex gap-2 ml-4">
													<Button 
														variant="outline" 
														size="lg"
														onClick={() => setViewingPage(page)}
													>
														<Eye className="h-4 w-4 mr-2" />
														View
													</Button>
													<Button 
														variant="outline" 
														size="lg"
														onClick={() => setEditingPage(page)}
													>
														<Edit className="h-4 w-4 mr-2" />
													Edit
												</Button>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="social" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Share2 className="h-5 w-5 text-purple-600" />
								Open Graph Settings
							</CardTitle>
							<CardDescription>Configure how your content appears on social media</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div className="space-y-3">
									<Label htmlFor="og-title" className="text-sm font-medium">Default OG Title</Label>
									<Input 
										id="og-title" 
										value={globalSettings.ogTitle}
										onChange={(e) => setGlobalSettings({ ...globalSettings, ogTitle: e.target.value })}
										className="h-11"
										placeholder="Your Site Title" 
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="og-type" className="text-sm font-medium">OG Type</Label>
									<Input id="og-type" value="website" readOnly className="h-11" />
								</div>
							</div>
							<div className="space-y-3">
								<Label htmlFor="og-description" className="text-sm font-medium">Default OG Description</Label>
								<Textarea 
									id="og-description" 
									value={globalSettings.ogDescription}
									onChange={(e) => setGlobalSettings({ ...globalSettings, ogDescription: e.target.value })}
									className="resize-none"
									placeholder="Description for social media sharing" 
									rows={3} 
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="og-image" className="text-sm font-medium">Default OG Image</Label>
								<div className="flex gap-2">
									<Input 
										id="og-image" 
										value={globalSettings.ogImage}
										onChange={(e) => setGlobalSettings({ ...globalSettings, ogImage: e.target.value })}
										className="h-11"
										placeholder="https://example.com/og-image.jpg" 
									/>
									<Button variant="outline" size="lg">
										<Upload className="h-4 w-4 mr-2" />
										Upload
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Share2 className="h-5 w-5 text-blue-600" />
								Twitter Card Settings
							</CardTitle>
							<CardDescription>Configure Twitter card appearance</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div className="space-y-3">
									<Label htmlFor="twitter-card" className="text-sm font-medium">Card Type</Label>
									<Input 
										id="twitter-card" 
										value={globalSettings.twitterCard}
										onChange={(e) => setGlobalSettings({ ...globalSettings, twitterCard: e.target.value })}
										className="h-11"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="twitter-site" className="text-sm font-medium">Twitter Site</Label>
									<Input 
										id="twitter-site" 
										value={globalSettings.twitterSite}
										onChange={(e) => setGlobalSettings({ ...globalSettings, twitterSite: e.target.value })}
										className="h-11"
										placeholder="@yoursite" 
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="analytics" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<BarChart3 className="h-5 w-5 text-blue-600" />
								Analytics Integration
							</CardTitle>
							<CardDescription>Connect analytics and tracking tools</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<Label htmlFor="google-analytics" className="text-sm font-medium">Google Analytics ID</Label>
								<Input
									id="google-analytics"
									value={globalSettings.googleAnalytics}
									onChange={(e) =>
										setGlobalSettings({
											...globalSettings,
											googleAnalytics: e.target.value,
										})
									}
									className="h-11"
									placeholder="GA-XXXXXXXXX"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="google-tag-manager" className="text-sm font-medium">Google Tag Manager ID</Label>
								<Input 
									id="google-tag-manager" 
									value={globalSettings.googleTagManager}
									onChange={(e) => setGlobalSettings({ ...globalSettings, googleTagManager: e.target.value })}
									className="h-11"
									placeholder="GTM-XXXXXXX" 
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor="facebook-pixel" className="text-sm font-medium">Facebook Pixel ID</Label>
								<Input 
									id="facebook-pixel" 
									value={globalSettings.facebookPixel}
									onChange={(e) => setGlobalSettings({ ...globalSettings, facebookPixel: e.target.value })}
									className="h-11"
									placeholder="123456789012345" 
								/>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<TrendingUp className="h-5 w-5 text-green-600" />
								SEO Performance
							</CardTitle>
							<CardDescription>Overview of your SEO metrics and performance</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6 md:grid-cols-4">
								<div className="text-center p-6 border rounded-xl">
									<div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
										<Target className="h-6 w-6 text-emerald-600" />
									</div>
									<div className="text-3xl font-bold text-emerald-600">{stats.avgScore}%</div>
									<p className="text-sm text-muted-foreground">SEO Score</p>
								</div>
								<div className="text-center p-6 border rounded-xl">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
										<FileText className="h-6 w-6 text-blue-600" />
									</div>
									<div className="text-3xl font-bold text-blue-600">{stats.total}</div>
									<p className="text-sm text-muted-foreground">Total Pages</p>
								</div>
								<div className="text-center p-6 border rounded-xl">
									<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
										<CheckCircle className="h-6 w-6 text-green-600" />
									</div>
									<div className="text-3xl font-bold text-green-600">{stats.optimized}</div>
									<p className="text-sm text-muted-foreground">Optimized</p>
								</div>
								<div className="text-center p-6 border rounded-xl">
									<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
										<TrendingUp className="h-6 w-6 text-purple-600" />
									</div>
									<div className="text-3xl font-bold text-purple-600">+15%</div>
									<p className="text-sm text-muted-foreground">Organic Traffic</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* SEO Page Edit Modal */}
			<Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
				<DialogContent className="!max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Edit SEO Settings</DialogTitle>
						</DialogHeader>
						{editingPage && (
							<SEOPageEditModal
								page={editingPage}
								onSave={handleSavePage}
								onClose={() => setEditingPage(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* SEO Page View Modal */}
			<Dialog open={!!viewingPage} onOpenChange={() => setViewingPage(null)}>
				<DialogContent className="!max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">SEO Page Details</DialogTitle>
						<DialogDescription>View detailed SEO information for {viewingPage?.page}</DialogDescription>
					</DialogHeader>
					{viewingPage && (
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="text-lg flex items-center gap-2">
											<Search className="h-5 w-5 text-blue-600" />
											Basic SEO
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<Label className="text-sm font-medium">Page Title</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.title}</p>
										</div>
										<div>
											<Label className="text-sm font-medium">Meta Description</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.metaDescription}</p>
										</div>
										<div>
											<Label className="text-sm font-medium">Keywords</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.keywords}</p>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-lg flex items-center gap-2">
											<Share2 className="h-5 w-5 text-purple-600" />
											Social Media
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<Label className="text-sm font-medium">Open Graph Title</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.ogTitle}</p>
										</div>
										<div>
											<Label className="text-sm font-medium">Open Graph Description</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.ogDescription}</p>
										</div>
										<div>
											<Label className="text-sm font-medium">Open Graph Image</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.ogImage}</p>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-lg flex items-center gap-2">
											<Settings className="h-5 w-5 text-green-600" />
											Technical SEO
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<Label className="text-sm font-medium">Canonical URL</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.canonicalUrl}</p>
										</div>
										<div>
											<Label className="text-sm font-medium">Robots Meta</Label>
											<p className="text-sm text-muted-foreground mt-1">{viewingPage.robots}</p>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<Label className="text-sm font-medium">Priority</Label>
												<p className="text-sm text-muted-foreground mt-1">{viewingPage.priority}</p>
											</div>
											<div>
												<Label className="text-sm font-medium">Change Frequency</Label>
												<p className="text-sm text-muted-foreground mt-1">{viewingPage.changeFrequency}</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-lg flex items-center gap-2">
											<Eye className="h-5 w-5 text-orange-600" />
											Preview
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="border rounded-lg p-4 bg-muted/50">
												<h4 className="font-medium text-blue-600 hover:underline cursor-pointer">
													{viewingPage.title}
												</h4>
												<p className="text-sm text-green-600">https://techcorp.com{viewingPage.url}</p>
												<p className="text-sm text-muted-foreground mt-1">
													{viewingPage.metaDescription}
												</p>
											</div>
											<div className="border rounded-lg p-4 bg-muted/50">
												<div className="flex items-center gap-2 mb-2">
													<Share2 className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm font-medium">Social Media Preview</span>
												</div>
												<div className="bg-white border rounded p-3">
													<div className="w-full h-32 bg-muted rounded mb-2"></div>
													<h5 className="font-medium text-sm">{viewingPage.ogTitle}</h5>
													<p className="text-xs text-muted-foreground">{viewingPage.ogDescription}</p>
													<p className="text-xs text-muted-foreground mt-1">techcorp.com</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							<div className="flex gap-3">
								<Button onClick={() => setEditingPage(viewingPage)} size="lg" className="flex-1">
									<Edit className="h-4 w-4 mr-2" />
									Edit Settings
								</Button>
								<Button variant="outline" onClick={() => setViewingPage(null)} size="lg">
									Close
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
