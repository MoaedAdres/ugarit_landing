"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
	Map,
	Download,
	RefreshCw,
	Search,
	Filter,
	Edit,
	Eye,
	Settings,
	Globe,
	Clock,
	FileText,
	Zap,
	CheckCircle,
	XCircle,
	AlertTriangle,
	BarChart3,
	TrendingUp,
	ExternalLink,
	Copy,
	Upload,
	Plus,
	X,
	Play,
	Pause,
	RotateCcw,
	Calendar,
} from "lucide-react";

const sitemapPages = [
	{
		id: 1,
		url: "/",
		priority: "1.0",
		changeFreq: "weekly",
		lastMod: "2024-01-15",
		included: true,
		title: "Homepage",
		description: "Main landing page",
		images: 5,
		visits: 1250,
	},
	{
		id: 2,
		url: "/about",
		priority: "0.8",
		changeFreq: "monthly",
		lastMod: "2024-01-10",
		included: true,
		title: "About Us",
		description: "Company information and team",
		images: 3,
		visits: 890,
	},
	{
		id: 3,
		url: "/services",
		priority: "0.9",
		changeFreq: "weekly",
		lastMod: "2024-01-12",
		included: true,
		title: "Services",
		description: "Our service offerings",
		images: 8,
		visits: 2100,
	},
	{
		id: 4,
		url: "/blog",
		priority: "0.8",
		changeFreq: "daily",
		lastMod: "2024-01-15",
		included: true,
		title: "Blog",
		description: "Latest news and articles",
		images: 12,
		visits: 3400,
	},
	{
		id: 5,
		url: "/contact",
		priority: "0.7",
		changeFreq: "monthly",
		lastMod: "2024-01-08",
		included: true,
		title: "Contact",
		description: "Get in touch with us",
		images: 2,
		visits: 650,
	},
	{
		id: 6,
		url: "/careers",
		priority: "0.6",
		changeFreq: "weekly",
		lastMod: "2024-01-14",
		included: false,
		title: "Careers",
		description: "Job opportunities",
		images: 4,
		visits: 320,
	},
	{
		id: 7,
		url: "/portfolio",
		priority: "0.8",
		changeFreq: "monthly",
		lastMod: "2024-01-11",
		included: true,
		title: "Portfolio",
		description: "Our work showcase",
		images: 15,
		visits: 1800,
	},
];

const getFrequencyColor = (freq: string) => {
	switch (freq) {
		case "daily":
			return "bg-green-500";
		case "weekly":
			return "bg-blue-500";
		case "monthly":
			return "bg-yellow-500";
		default:
			return "bg-gray-500";
	}
};

const getFrequencyIcon = (freq: string) => {
	switch (freq) {
		case "daily":
			return Zap;
		case "weekly":
			return Clock;
		case "monthly":
			return Calendar;
		default:
			return Clock;
	}
};

// Sitemap Page Edit Modal Component
function SitemapPageEditModal({ page, onSave, onClose }: { page: any; onSave: (data: any) => void; onClose: () => void }) {
	const [formData, setFormData] = useState({
		url: page.url,
		title: page.title,
		description: page.description,
		priority: page.priority,
		changeFreq: page.changeFreq,
		included: page.included,
	});

	const handleSave = () => {
		onSave({ ...page, ...formData });
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Edit Sitemap Page</h3>
					<p className="text-muted-foreground">Update page settings for sitemap inclusion</p>
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
							<Globe className="h-5 w-5 text-blue-600" />
							Page Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="url" className="text-sm font-medium">
								URL
							</Label>
							<Input
								id="url"
								value={formData.url}
								onChange={(e) => setFormData({ ...formData, url: e.target.value })}
								className="h-11"
								placeholder="/page-url"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="title" className="text-sm font-medium">
								Page Title
							</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								className="h-11"
								placeholder="Page title"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="description" className="text-sm font-medium">
								Description
							</Label>
							<Input
								id="description"
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								className="h-11"
								placeholder="Page description"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="h-5 w-5 text-green-600" />
							Sitemap Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="priority" className="text-sm font-medium">
								Priority
							</Label>
							<Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1.0">1.0 - Highest</SelectItem>
									<SelectItem value="0.9">0.9 - Very High</SelectItem>
									<SelectItem value="0.8">0.8 - High</SelectItem>
									<SelectItem value="0.7">0.7 - Medium-High</SelectItem>
									<SelectItem value="0.6">0.6 - Medium</SelectItem>
									<SelectItem value="0.5">0.5 - Low</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-3">
							<Label htmlFor="change-freq" className="text-sm font-medium">
								Change Frequency
							</Label>
							<Select value={formData.changeFreq} onValueChange={(value) => setFormData({ ...formData, changeFreq: value })}>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="daily">Daily</SelectItem>
									<SelectItem value="weekly">Weekly</SelectItem>
									<SelectItem value="monthly">Monthly</SelectItem>
									<SelectItem value="yearly">Yearly</SelectItem>
									<SelectItem value="never">Never</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Include in Sitemap</Label>
								<p className="text-sm text-muted-foreground">Include this page in the sitemap</p>
							</div>
							<Switch checked={formData.included} onCheckedChange={(checked) => setFormData({ ...formData, included: checked })} />
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex gap-3">
				<Button onClick={handleSave} size="lg" className="flex-1">
					<Settings className="h-4 w-4 mr-2" />
					Save Changes
				</Button>
				<Button variant="outline" onClick={onClose} size="lg">
					Cancel
				</Button>
			</div>
		</div>
	);
}

// Sitemap Page View Modal Component
function SitemapPageViewModal({ page, onClose }: { page: any; onClose: () => void }) {
	const FrequencyIcon = getFrequencyIcon(page.changeFreq);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Sitemap Page Details</h3>
					<p className="text-muted-foreground">View detailed information about this page</p>
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
							<Globe className="h-5 w-5 text-blue-600" />
							Page Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">URL</Label>
							<p className="text-sm text-muted-foreground mt-1 font-mono">{page.url}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Title</Label>
							<p className="text-sm text-muted-foreground mt-1">{page.title}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Description</Label>
							<p className="text-sm text-muted-foreground mt-1">{page.description}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Last Modified</Label>
							<p className="text-sm text-muted-foreground mt-1">{page.lastMod}</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<BarChart3 className="h-5 w-5 text-green-600" />
							Sitemap Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">Priority</Label>
							<p className="text-2xl font-bold text-blue-600">{page.priority}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Change Frequency</Label>
							<div className="flex items-center gap-2 mt-1">
								<FrequencyIcon className="h-4 w-4" />
								<Badge className={`${getFrequencyColor(page.changeFreq)} text-white`}>{page.changeFreq}</Badge>
							</div>
						</div>
						<div>
							<Label className="text-sm font-medium">Status</Label>
							<div className="flex items-center gap-2 mt-1">
								{page.included ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-600" />}
								<Badge className={page.included ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
									{page.included ? "Included" : "Excluded"}
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<TrendingUp className="h-5 w-5 text-purple-600" />
							Analytics
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">{page.visits}</div>
								<p className="text-sm text-muted-foreground">Total Visits</p>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-green-600">{page.images}</div>
								<p className="text-sm text-muted-foreground">Images</p>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-purple-600">{Math.round(page.visits / 30)}</div>
								<p className="text-sm text-muted-foreground">Daily Average</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export function SitemapManagement() {
	const [pagesData, setPagesData] = useState(sitemapPages);
	const [editingPage, setEditingPage] = useState<any>(null);
	const [viewingPage, setViewingPage] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [frequencyFilter, setFrequencyFilter] = useState("all");
	const [isGenerating, setIsGenerating] = useState(false);
	const [lastGenerated, setLastGenerated] = useState("2 hours ago");

	const filteredPages = pagesData.filter((page) => {
		const matchesSearch =
			page.url.toLowerCase().includes(searchTerm.toLowerCase()) || page.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || (statusFilter === "included" && page.included) || (statusFilter === "excluded" && !page.included);
		const matchesFrequency = frequencyFilter === "all" || page.changeFreq === frequencyFilter;
		return matchesSearch && matchesStatus && matchesFrequency;
	});

	const handleSavePage = (updatedPage: any) => {
		setPagesData((prev) => prev.map((page) => (page.id === updatedPage.id ? updatedPage : page)));
	};

	const handleGenerateSitemap = async () => {
		setIsGenerating(true);
		// Simulate sitemap generation
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setLastGenerated("Just now");
		setIsGenerating(false);
	};

	const handleDownloadSitemap = () => {
		const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${filteredPages
	.filter((p) => p.included)
	.map(
		(page) => `  <url>
    <loc>https://yoursite.com${page.url}</loc>
    <lastmod>${page.lastMod}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join("\n")}
</urlset>`;

		const blob = new Blob([sitemapContent], { type: "application/xml" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "sitemap.xml";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const getStats = () => {
		const total = pagesData.length;
		const included = pagesData.filter((p) => p.included).length;
		const totalVisits = pagesData.reduce((sum, p) => sum + p.visits, 0);
		const totalImages = pagesData.reduce((sum, p) => sum + p.images, 0);

		return { total, included, totalVisits, totalImages };
	};

	const stats = getStats();

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-2xl border border-orange-500/20">
							<Map className="h-6 w-6 text-orange-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Sitemap Management</h1>
							<p className="text-muted-foreground">Configure and manage your XML sitemap</p>
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					<Button variant="outline" onClick={handleDownloadSitemap} size="lg">
						<Download className="h-4 w-4 mr-2" />
						Download Sitemap
					</Button>
					<Button onClick={handleGenerateSitemap} size="lg" disabled={isGenerating}>
						{isGenerating ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
						{isGenerating ? "Generating..." : "Generate Sitemap"}
					</Button>
				</div>
			</div>

			{/* Enhanced Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl flex items-center justify-center">
								<Map className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total URLs</p>
								<p className="text-2xl font-bold">{stats.total}</p>
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
								<p className="text-sm text-muted-foreground">Included</p>
								<p className="text-2xl font-bold">{stats.included}</p>
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
								<p className="text-sm text-muted-foreground">Total Visits</p>
								<p className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
								<FileText className="h-6 w-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Images</p>
								<p className="text-2xl font-bold">{stats.totalImages}</p>
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
								<option value="included">Included</option>
								<option value="excluded">Excluded</option>
							</select>
							<select
								value={frequencyFilter}
								onChange={(e) => setFrequencyFilter(e.target.value)}
								className="h-11 px-3 py-2 border border-input bg-background rounded-md text-sm"
							>
								<option value="all">All Frequencies</option>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
								<option value="yearly">Yearly</option>
							</select>
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

			{/* Enhanced Sitemap Configuration */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<Settings className="h-5 w-5 text-orange-600" />
						Sitemap Configuration
					</CardTitle>
					<CardDescription>Configure automatic sitemap generation settings</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Auto-generate Sitemap</Label>
								<p className="text-sm text-muted-foreground">Automatically update sitemap when content changes</p>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Include Images</Label>
								<p className="text-sm text-muted-foreground">Include image URLs in sitemap</p>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Submit to Search Engines</Label>
								<p className="text-sm text-muted-foreground">Automatically notify search engines of updates</p>
							</div>
							<Switch defaultChecked />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Sitemap Pages Display */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<Map className="h-5 w-5 text-orange-600" />
						Sitemap Pages
					</CardTitle>
					<CardDescription>Manage which pages are included in your sitemap</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredPages.map((page) => {
							const FrequencyIcon = getFrequencyIcon(page.changeFreq);
							return (
								<div key={page.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
									<div className="flex items-start justify-between">
										<div className="flex-1 space-y-3">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg flex items-center justify-center">
													<Globe className="h-5 w-5 text-orange-600" />
												</div>
												<div>
													<h3 className="font-semibold text-lg">{page.title}</h3>
													<p className="text-sm text-muted-foreground">{page.description}</p>
												</div>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<p className="text-sm font-medium text-muted-foreground mb-1">URL</p>
													<p className="text-sm font-mono text-blue-600">{page.url}</p>
												</div>
												<div>
													<p className="text-sm font-medium text-muted-foreground mb-1">Last Modified</p>
													<p className="text-sm text-muted-foreground">{page.lastMod}</p>
												</div>
											</div>
											<div className="flex items-center gap-4">
												<div className="flex items-center gap-2">
													<Badge className="bg-blue-500 text-white">Priority: {page.priority}</Badge>
													<FrequencyIcon className="h-4 w-4" />
													<Badge className={`${getFrequencyColor(page.changeFreq)} text-white`}>{page.changeFreq}</Badge>
													{page.included ? (
														<CheckCircle className="h-4 w-4 text-green-600" />
													) : (
														<XCircle className="h-4 w-4 text-gray-600" />
													)}
													<Badge className={page.included ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
														{page.included ? "Included" : "Excluded"}
													</Badge>
												</div>
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													<span>{page.visits} visits</span>
													<span>{page.images} images</span>
												</div>
											</div>
										</div>
										<div className="flex gap-2 ml-4">
											<Button variant="outline" size="lg" onClick={() => setViewingPage(page)}>
												<Eye className="h-4 w-4 mr-2" />
												View
											</Button>
											<Button variant="outline" size="lg" onClick={() => setEditingPage(page)}>
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

			{/* Enhanced Search Engine Submission */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<ExternalLink className="h-5 w-5 text-blue-600" />
						Search Engine Submission
					</CardTitle>
					<CardDescription>Submit your sitemap to search engines</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-4">
							<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
										<Globe className="h-6 w-6 text-blue-600" />
									</div>
									<div>
										<p className="font-semibold text-lg">Google Search Console</p>
										<p className="text-sm text-muted-foreground">Last submitted: {lastGenerated}</p>
									</div>
								</div>
								<Badge className="bg-green-500 text-white">Submitted</Badge>
							</div>
							<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
										<Globe className="h-6 w-6 text-purple-600" />
									</div>
									<div>
										<p className="font-semibold text-lg">Bing Webmaster Tools</p>
										<p className="text-sm text-muted-foreground">Last submitted: 1 day ago</p>
									</div>
								</div>
								<Badge className="bg-green-500 text-white">Submitted</Badge>
							</div>
						</div>
						<div className="space-y-6">
							<Button className="w-full" size="lg">
								<ExternalLink className="h-4 w-4 mr-2" />
								Submit to All Search Engines
							</Button>
							<div className="p-6 border rounded-xl bg-muted/50">
								<h4 className="font-semibold mb-3">Sitemap Information</h4>
								<div className="space-y-2 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Globe className="h-4 w-4" />
										<span>Sitemap URL: https://yoursite.com/sitemap.xml</span>
									</div>
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4" />
										<span>Last generated: {lastGenerated}</span>
									</div>
									<div className="flex items-center gap-2">
										<RefreshCw className="h-4 w-4" />
										<span>Next auto-generation: When content changes</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Sitemap Page Edit Modal */}
			<Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Edit Sitemap Page</DialogTitle>
						</DialogHeader>
						{editingPage && <SitemapPageEditModal page={editingPage} onSave={handleSavePage} onClose={() => setEditingPage(null)} />}
					</div>
				</DialogContent>
			</Dialog>

			{/* Sitemap Page View Modal */}
			<Dialog open={!!viewingPage} onOpenChange={() => setViewingPage(null)}>
				<DialogContent className="!max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">Sitemap Page Details</DialogTitle>
						<DialogDescription>View detailed information about this page</DialogDescription>
					</DialogHeader>
					{viewingPage && <SitemapPageViewModal page={viewingPage} onClose={() => setViewingPage(null)} />}
				</DialogContent>
			</Dialog>
		</div>
	);
}
