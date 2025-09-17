"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { 
	ArrowRight, 
	Plus, 
	Edit, 
	Eye, 
	Trash2, 
	Search, 
	Filter, 
	Download, 
	Upload, 
	RefreshCw, 
	ExternalLink, 
	MousePointer, 
	CheckCircle, 
	XCircle, 
	AlertTriangle,
	BarChart3,
	TrendingUp,
	Clock,
	Zap,
	FileText,
	Copy,
	TestTube,
	Settings,
	X
} from "lucide-react";

interface Redirect {
	id: string;
	source: string;
	destination: string;
	type: "301" | "302" | "307";
	hits: number;
	lastHit: string;
	status: "Active" | "Inactive";
	createdDate: string;
}

const redirects: Redirect[] = [
	{
		id: "1",
		source: "/old-services",
		destination: "/services",
		type: "301",
		hits: 245,
		lastHit: "2024-01-15",
		status: "Active",
		createdDate: "2024-01-01",
	},
	{
		id: "2",
		source: "/blog/old-post",
		destination: "/blog/new-post",
		type: "301",
		hits: 89,
		lastHit: "2024-01-14",
		status: "Active",
		createdDate: "2024-01-05",
	},
	{
		id: "3",
		source: "/temp-page",
		destination: "/services",
		type: "302",
		hits: 12,
		lastHit: "2024-01-10",
		status: "Inactive",
		createdDate: "2024-01-08",
	},
	{
		id: "4",
		source: "/legacy-about",
		destination: "/about",
		type: "301",
		hits: 156,
		lastHit: "2024-01-16",
		status: "Active",
		createdDate: "2024-01-03",
	},
	{
		id: "5",
		source: "/old-contact",
		destination: "/contact",
		type: "301",
		hits: 78,
		lastHit: "2024-01-12",
		status: "Active",
		createdDate: "2024-01-07",
	},
	{
		id: "6",
		source: "/maintenance",
		destination: "/services",
		type: "302",
		hits: 5,
		lastHit: "2024-01-09",
		status: "Inactive",
		createdDate: "2024-01-11",
	},
];

const getStatusColor = (status: string) => {
	return status === "Active" ? "bg-green-500" : "bg-gray-500";
};

const getTypeColor = (type: string) => {
	switch (type) {
		case "301":
			return "bg-blue-500";
		case "302":
			return "bg-yellow-500";
		case "307":
			return "bg-purple-500";
		default:
			return "bg-gray-500";
	}
};

const getTypeIcon = (type: string) => {
	switch (type) {
		case "301":
			return ArrowRight;
		case "302":
			return Clock;
		case "307":
			return RefreshCw;
		default:
			return ArrowRight;
	}
};

// Redirect Edit Modal Component
function RedirectEditModal({ 
	redirect, 
	onSave, 
	onClose 
}: { 
	redirect: Redirect; 
	onSave: (data: any) => void; 
	onClose: () => void; 
}) {
	const [formData, setFormData] = useState({
		source: redirect.source,
		destination: redirect.destination,
		type: redirect.type,
		status: redirect.status,
	});

	const handleSave = () => {
		onSave({ ...redirect, ...formData });
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Edit Redirect</h3>
					<p className="text-muted-foreground">Update redirect settings and configuration</p>
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
							<ArrowRight className="h-5 w-5 text-blue-600" />
							Redirect Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="source-url" className="text-sm font-medium">Source URL</Label>
							<Input 
								id="source-url" 
								value={formData.source}
								onChange={(e) => setFormData({ ...formData, source: e.target.value })}
								className="h-11"
								placeholder="/old-page"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="destination-url" className="text-sm font-medium">Destination URL</Label>
							<Input 
								id="destination-url" 
								value={formData.destination}
								onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
								className="h-11"
								placeholder="/new-page"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="redirect-type" className="text-sm font-medium">Redirect Type</Label>
							<Select
								value={formData.type}
								onValueChange={(value: "301" | "302" | "307") => setFormData({ ...formData, type: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="301">301 - Permanent Redirect</SelectItem>
									<SelectItem value="302">302 - Temporary Redirect</SelectItem>
									<SelectItem value="307">307 - Temporary (Preserve Method)</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Status</Label>
								<p className="text-sm text-muted-foreground">Enable or disable this redirect</p>
							</div>
							<Switch
								checked={formData.status === "Active"}
								onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "Active" : "Inactive" })}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<TestTube className="h-5 w-5 text-green-600" />
							Test Redirect
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label className="text-sm font-medium">Test URL</Label>
							<div className="flex gap-2">
								<Input 
									value={`https://yoursite.com${formData.source}`}
									readOnly
									className="h-11"
								/>
								<Button variant="outline" size="lg">
									<TestTube className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<div className="space-y-3">
							<Label className="text-sm font-medium">Expected Destination</Label>
							<Input 
								value={`https://yoursite.com${formData.destination}`}
								readOnly
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label className="text-sm font-medium">Redirect Chain Preview</Label>
							<div className="border rounded-lg p-4 bg-muted/50">
								<div className="flex items-center gap-2 text-sm">
									<span className="font-mono text-blue-600">{formData.source}</span>
									<ArrowRight className="h-4 w-4 text-muted-foreground" />
									<span className="font-mono text-green-600">{formData.destination}</span>
									<Badge className={`${getTypeColor(formData.type)} text-white`}>
										{formData.type}
									</Badge>
								</div>
							</div>
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

// Redirect View Modal Component
function RedirectViewModal({ 
	redirect, 
	onClose 
}: { 
	redirect: Redirect; 
	onClose: () => void; 
}) {
	const TypeIcon = getTypeIcon(redirect.type);
	
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Redirect Details</h3>
					<p className="text-muted-foreground">View detailed information about this redirect</p>
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
							<ArrowRight className="h-5 w-5 text-blue-600" />
							Redirect Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">Source URL</Label>
							<p className="text-sm text-muted-foreground mt-1 font-mono">{redirect.source}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Destination URL</Label>
							<p className="text-sm text-muted-foreground mt-1 font-mono">{redirect.destination}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Redirect Type</Label>
							<div className="flex items-center gap-2 mt-1">
								<TypeIcon className="h-4 w-4" />
								<Badge className={`${getTypeColor(redirect.type)} text-white`}>
									{redirect.type}
								</Badge>
							</div>
						</div>
						<div>
							<Label className="text-sm font-medium">Status</Label>
							<div className="flex items-center gap-2 mt-1">
								{redirect.status === "Active" ? (
									<CheckCircle className="h-4 w-4 text-green-600" />
								) : (
									<XCircle className="h-4 w-4 text-gray-600" />
								)}
								<Badge className={`${getStatusColor(redirect.status)} text-white`}>
									{redirect.status}
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
							<Label className="text-sm font-medium">Total Hits</Label>
							<p className="text-2xl font-bold text-green-600">{redirect.hits}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Last Hit</Label>
							<p className="text-sm text-muted-foreground mt-1">{redirect.lastHit}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Created Date</Label>
							<p className="text-sm text-muted-foreground mt-1">{redirect.createdDate}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Hit Rate</Label>
							<p className="text-sm text-muted-foreground mt-1">
								{Math.round((redirect.hits / 30) * 100)}% daily average
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<TestTube className="h-5 w-5 text-orange-600" />
							Test Redirect
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="border rounded-lg p-4 bg-muted/50">
								<div className="flex items-center gap-2 text-sm mb-2">
									<span className="font-mono text-blue-600">https://yoursite.com{redirect.source}</span>
									<ArrowRight className="h-4 w-4 text-muted-foreground" />
									<span className="font-mono text-green-600">https://yoursite.com{redirect.destination}</span>
								</div>
								<div className="flex items-center gap-2">
									<Badge className={`${getTypeColor(redirect.type)} text-white`}>
										{redirect.type}
									</Badge>
									<Badge className={`${getStatusColor(redirect.status)} text-white`}>
										{redirect.status}
									</Badge>
								</div>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="lg">
									<TestTube className="h-4 w-4 mr-2" />
									Test Redirect
								</Button>
								<Button variant="outline" size="lg">
									<Copy className="h-4 w-4 mr-2" />
									Copy URL
								</Button>
								<Button variant="outline" size="lg">
									<ExternalLink className="h-4 w-4 mr-2" />
									Open in New Tab
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export function RedirectsManagement() {
	const [redirectsData, setRedirectsData] = useState(redirects);
	const [newRedirect, setNewRedirect] = useState({
		source: "",
		destination: "",
		type: "301" as "301" | "302" | "307",
	});
	const [editingRedirect, setEditingRedirect] = useState<Redirect | null>(null);
	const [viewingRedirect, setViewingRedirect] = useState<Redirect | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [isAddingRedirect, setIsAddingRedirect] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const filteredRedirects = redirectsData.filter((redirect) => {
		const matchesSearch = redirect.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 redirect.destination.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || redirect.status === statusFilter;
		const matchesType = typeFilter === "all" || redirect.type === typeFilter;
		return matchesSearch && matchesStatus && matchesType;
	});

	const handleAddRedirect = () => {
		if (newRedirect.source && newRedirect.destination) {
			const redirect: Redirect = {
				id: (redirectsData.length + 1).toString(),
				...newRedirect,
				hits: 0,
				lastHit: "Never",
				status: "Active",
				createdDate: new Date().toISOString().split('T')[0],
			};
			setRedirectsData(prev => [...prev, redirect]);
			setNewRedirect({ source: "", destination: "", type: "301" });
			setIsAddingRedirect(false);
		}
	};

	const handleSaveRedirect = (updatedRedirect: Redirect) => {
		setRedirectsData(prev => prev.map(redirect => redirect.id === updatedRedirect.id ? updatedRedirect : redirect));
	};

	const handleDeleteRedirect = (id: string) => {
		setRedirectsData(prev => prev.filter(redirect => redirect.id !== id));
	};

	const handleBulkDelete = (ids: string[]) => {
		setRedirectsData(prev => prev.filter(redirect => !ids.includes(redirect.id)));
	};

	const handleExport = () => {
		const csvContent = "data:text/csv;charset=utf-8," + 
			"Source URL,Destination URL,Type,Status,Hits,Last Hit,Created Date\n" +
			redirectsData.map(r => `${r.source},${r.destination},${r.type},${r.status},${r.hits},${r.lastHit},${r.createdDate}`).join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "redirects.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target?.result as string;
			const lines = text.split('\n').slice(1); // Skip header
			const newRedirects: Redirect[] = lines
				.filter(line => line.trim())
				.map((line, index) => {
					const [source, destination, type, status, hits, lastHit, createdDate] = line.split(',');
					return {
						id: (redirectsData.length + index + 1).toString(),
						source: source || '',
						destination: destination || '',
						type: (type as "301" | "302" | "307") || "301",
						hits: parseInt(hits) || 0,
						lastHit: lastHit || "Never",
						status: (status as "Active" | "Inactive") || "Active",
						createdDate: createdDate || new Date().toISOString().split('T')[0],
					};
				});
			setRedirectsData(prev => [...prev, ...newRedirects]);
		};
		reader.readAsText(file);
	};

	const getStats = () => {
		const total = redirectsData.length;
		const active = redirectsData.filter(r => r.status === "Active").length;
		const totalHits = redirectsData.reduce((sum, r) => sum + r.hits, 0);
		const type301 = redirectsData.filter(r => r.type === "301").length;
		
		return { total, active, totalHits, type301 };
	};

	const stats = getStats();

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-2xl border border-violet-500/20">
							<ArrowRight className="h-6 w-6 text-violet-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Redirects Management</h1>
							<p className="text-muted-foreground">Manage URL redirects and track their performance</p>
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					<Button variant="outline" onClick={handleExport} size="lg">
						<Download className="h-4 w-4 mr-2" />
						Export CSV
					</Button>
					<Button onClick={() => setIsAddingRedirect(true)} size="lg">
						<Plus className="h-4 w-4 mr-2" />
						Add Redirect
					</Button>
				</div>
			</div>

			{/* Enhanced Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
								<ArrowRight className="h-6 w-6 text-violet-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Redirects</p>
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
								<p className="text-sm text-muted-foreground">Active</p>
								<p className="text-2xl font-bold">{stats.active}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<MousePointer className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Hits</p>
								<p className="text-2xl font-bold">{stats.totalHits}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center">
								<Zap className="h-6 w-6 text-yellow-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">301 Redirects</p>
								<p className="text-2xl font-bold">{stats.type301}</p>
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
									placeholder="Search redirects..."
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
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
							</select>
							<select
								value={typeFilter}
								onChange={(e) => setTypeFilter(e.target.value)}
								className="h-11 px-3 py-2 border border-input bg-background rounded-md text-sm"
							>
								<option value="all">All Types</option>
								<option value="301">301 - Permanent</option>
								<option value="302">302 - Temporary</option>
								<option value="307">307 - Temporary (Preserve Method)</option>
							</select>
						</div>
						<div className="flex gap-3">
							<Button variant="outline" onClick={() => fileInputRef.current?.click()} size="lg">
								<Upload className="h-4 w-4 mr-2" />
								Import CSV
							</Button>
							<Button variant="outline" size="lg">
								<RefreshCw className="h-4 w-4 mr-2" />
								Refresh
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Redirects Display */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<ArrowRight className="h-5 w-5 text-violet-600" />
						Redirect Rules
					</CardTitle>
					<CardDescription>Manage your URL redirect rules and track their performance</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredRedirects.map((redirect) => {
							const TypeIcon = getTypeIcon(redirect.type);
							return (
								<div key={redirect.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
									<div className="flex items-start justify-between">
										<div className="flex-1 space-y-3">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
													<TypeIcon className="h-5 w-5 text-violet-600" />
												</div>
												<div>
													<h3 className="font-semibold text-lg">Redirect Rule</h3>
													<p className="text-sm text-muted-foreground">Created {redirect.createdDate}</p>
												</div>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<p className="text-sm font-medium text-muted-foreground mb-1">Source URL</p>
													<p className="text-sm font-mono text-blue-600">{redirect.source}</p>
												</div>
												<div>
													<p className="text-sm font-medium text-muted-foreground mb-1">Destination URL</p>
													<p className="text-sm font-mono text-green-600">{redirect.destination}</p>
												</div>
											</div>
											<div className="flex items-center gap-4">
												<div className="flex items-center gap-2">
													<Badge className={`${getTypeColor(redirect.type)} text-white`}>
														{redirect.type}
													</Badge>
													{redirect.status === "Active" ? (
														<CheckCircle className="h-4 w-4 text-green-600" />
													) : (
														<XCircle className="h-4 w-4 text-gray-600" />
													)}
													<Badge className={`${getStatusColor(redirect.status)} text-white`}>
														{redirect.status}
													</Badge>
												</div>
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													<span>{redirect.hits} hits</span>
													<span>Last: {redirect.lastHit}</span>
												</div>
											</div>
										</div>
										<div className="flex gap-2 ml-4">
											<Button 
												variant="outline" 
												size="lg"
												onClick={() => setViewingRedirect(redirect)}
											>
												<Eye className="h-4 w-4 mr-2" />
												View
											</Button>
											<Button 
												variant="outline" 
												size="lg"
												onClick={() => setEditingRedirect(redirect)}
											>
												<Edit className="h-4 w-4 mr-2" />
												Edit
											</Button>
											<Button 
												variant="outline" 
												size="lg"
												onClick={() => handleDeleteRedirect(redirect.id)}
												className="text-red-600 hover:text-red-700"
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

			{/* Enhanced Bulk Import */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<FileText className="h-5 w-5 text-blue-600" />
						Bulk Import
					</CardTitle>
					<CardDescription>Import multiple redirects from a CSV file</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="border-2 border-dashed border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-xl p-8 text-center">
							<div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl mx-auto mb-4 flex items-center justify-center">
								<FileText className="h-8 w-8 text-violet-600" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Drop your CSV file here or click to browse</h3>
							<p className="text-muted-foreground mb-4">Import multiple redirects at once</p>
							<Button 
								size="lg"
								onClick={() => fileInputRef.current?.click()}
							>
								<Upload className="h-4 w-4 mr-2" />
								Choose File
							</Button>
							<input
								ref={fileInputRef}
								type="file"
								accept=".csv"
								onChange={handleImport}
								className="hidden"
							/>
						</div>
						<div className="text-sm text-muted-foreground space-y-2">
							<p><strong>CSV format:</strong> source_url, destination_url, redirect_type, status, hits, last_hit, created_date</p>
							<p><strong>Example:</strong> /old-page, /new-page, 301, Active, 0, Never, 2024-01-15</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Add Redirect Modal */}
			<Dialog open={isAddingRedirect} onOpenChange={setIsAddingRedirect}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle className="text-xl">Add New Redirect</DialogTitle>
						<DialogDescription>Create a new URL redirect rule</DialogDescription>
					</DialogHeader>
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="source-url" className="text-sm font-medium">Source URL</Label>
							<Input
								id="source-url"
								placeholder="/old-page"
								value={newRedirect.source}
								onChange={(e) => setNewRedirect({ ...newRedirect, source: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="destination-url" className="text-sm font-medium">Destination URL</Label>
							<Input
								id="destination-url"
								placeholder="/new-page"
								value={newRedirect.destination}
								onChange={(e) => setNewRedirect({ ...newRedirect, destination: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="redirect-type" className="text-sm font-medium">Redirect Type</Label>
							<Select
								value={newRedirect.type}
								onValueChange={(value: "301" | "302" | "307") => setNewRedirect({ ...newRedirect, type: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="301">301 - Permanent Redirect</SelectItem>
									<SelectItem value="302">302 - Temporary Redirect</SelectItem>
									<SelectItem value="307">307 - Temporary (Preserve Method)</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex gap-3">
							<Button onClick={handleAddRedirect} size="lg" className="flex-1">
								<Plus className="h-4 w-4 mr-2" />
								Create Redirect
							</Button>
							<Button variant="outline" onClick={() => setIsAddingRedirect(false)} size="lg">
								Cancel
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Redirect Edit Modal */}
			<Dialog open={!!editingRedirect} onOpenChange={() => setEditingRedirect(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Edit Redirect</DialogTitle>
						</DialogHeader>
						{editingRedirect && (
							<RedirectEditModal
								redirect={editingRedirect}
								onSave={handleSaveRedirect}
								onClose={() => setEditingRedirect(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Redirect View Modal */}
			<Dialog open={!!viewingRedirect} onOpenChange={() => setViewingRedirect(null)}>
				<DialogContent className="!max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">Redirect Details</DialogTitle>
						<DialogDescription>View detailed information about this redirect</DialogDescription>
					</DialogHeader>
					{viewingRedirect && (
						<RedirectViewModal
							redirect={viewingRedirect}
							onClose={() => setViewingRedirect(null)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
