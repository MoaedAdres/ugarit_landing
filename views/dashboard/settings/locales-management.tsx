"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
	Globe, 
	Plus, 
	Edit, 
	Eye, 
	Trash2, 
	Search, 
	Filter, 
	Settings, 
	Languages, 
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
	Flag, 
	AlignRight, 
	AlignLeft, 
	Percent, 
	Users, 
	Clock, 
	FileText, 
	Copy, 
	Star,
	Zap,
	Target,
	Activity,
	BookOpen,
	MessageSquare,
	Calendar
} from "lucide-react";

interface Locale {
	id: string;
	code: string;
	name: string;
	nativeName: string;
	flag: string;
	isDefault: boolean;
	isActive: boolean;
	rtl: boolean;
	completeness: number;
	translations?: number;
	missingTranslations?: number;
	lastUpdated?: string;
	translators?: string[];
	priority?: "high" | "medium" | "low";
}

const locales: Locale[] = [
	{
		id: "1",
		code: "en",
		name: "English",
		nativeName: "English",
		flag: "🇺🇸",
		isDefault: true,
		isActive: true,
		rtl: false,
		completeness: 100,
		translations: 1250,
		missingTranslations: 0,
		lastUpdated: "2024-01-16",
		translators: ["John Doe", "Jane Smith"],
		priority: "high",
	},
	{
		id: "2",
		code: "ar",
		name: "Arabic",
		nativeName: "العربية",
		flag: "🇸🇦",
		isDefault: false,
		isActive: true,
		rtl: true,
		completeness: 85,
		translations: 1062,
		missingTranslations: 188,
		lastUpdated: "2024-01-15",
		translators: ["Ahmed Al-Rashid", "Fatima Hassan"],
		priority: "high",
	},
	{
		id: "3",
		code: "fr",
		name: "French",
		flag: "🇫🇷",
		nativeName: "Français",
		isDefault: false,
		isActive: true,
		rtl: false,
		completeness: 92,
		translations: 1150,
		missingTranslations: 100,
		lastUpdated: "2024-01-14",
		translators: ["Pierre Dubois", "Marie Leclerc"],
		priority: "medium",
	},
	{
		id: "4",
		code: "es",
		name: "Spanish",
		nativeName: "Español",
		flag: "🇪🇸",
		isDefault: false,
		isActive: false,
		rtl: false,
		completeness: 0,
		translations: 0,
		missingTranslations: 1250,
		lastUpdated: "Never",
		translators: [],
		priority: "low",
	},
	{
		id: "5",
		code: "de",
		name: "German",
		nativeName: "Deutsch",
		flag: "🇩🇪",
		isDefault: false,
		isActive: true,
		rtl: false,
		completeness: 78,
		translations: 975,
		missingTranslations: 275,
		lastUpdated: "2024-01-13",
		translators: ["Klaus Mueller"],
		priority: "medium",
	},
	{
		id: "6",
		code: "zh",
		name: "Chinese",
		nativeName: "中文",
		flag: "🇨🇳",
		isDefault: false,
		isActive: true,
		rtl: false,
		completeness: 65,
		translations: 812,
		missingTranslations: 438,
		lastUpdated: "2024-01-12",
		translators: ["Li Wei", "Chen Xia"],
		priority: "high",
	},
];

const getCompletenessColor = (completeness: number) => {
	if (completeness >= 90) return "bg-green-500";
	if (completeness >= 70) return "bg-yellow-500";
	return "bg-red-500";
};

const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "high":
			return "bg-red-500";
		case "medium":
			return "bg-yellow-500";
		case "low":
			return "bg-green-500";
		default:
			return "bg-gray-500";
	}
};

const getPriorityIcon = (priority: string) => {
	switch (priority) {
		case "high":
			return AlertTriangle;
		case "medium":
			return Clock;
		case "low":
			return CheckCircle;
		default:
			return Target;
	}
};

// Locale Edit Modal Component
function LocaleEditModal({ 
	locale, 
	onSave, 
	onClose 
}: { 
	locale: Locale; 
	onSave: (data: any) => void; 
	onClose: () => void; 
}) {
	const [formData, setFormData] = useState({
		name: locale.name,
		nativeName: locale.nativeName,
		code: locale.code,
		flag: locale.flag,
		rtl: locale.rtl,
		isActive: locale.isActive,
		priority: locale.priority || "medium",
	});

	const handleSave = () => {
		onSave({ ...locale, ...formData });
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Edit Locale</h3>
					<p className="text-muted-foreground">Update locale settings and configuration</p>
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
							Locale Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="name" className="text-sm font-medium">Language Name</Label>
							<Input 
								id="name" 
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="h-11"
								placeholder="English, French, Arabic, etc."
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="nativeName" className="text-sm font-medium">Native Name</Label>
							<Input 
								id="nativeName" 
								value={formData.nativeName}
								onChange={(e) => setFormData({ ...formData, nativeName: e.target.value })}
								className="h-11"
								placeholder="English, Français, العربية, etc."
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="code" className="text-sm font-medium">Language Code</Label>
							<Input 
								id="code" 
								value={formData.code}
								onChange={(e) => setFormData({ ...formData, code: e.target.value })}
								className="h-11"
								placeholder="en, fr, ar, etc."
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="flag" className="text-sm font-medium">Flag Emoji</Label>
							<Input 
								id="flag" 
								value={formData.flag}
								onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
								className="h-11"
								placeholder="🇺🇸, 🇫🇷, 🇸🇦, etc."
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="h-5 w-5 text-green-600" />
							Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
							<Select
								value={formData.priority}
								onValueChange={(value: "high" | "medium" | "low") => setFormData({ ...formData, priority: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="high">High Priority</SelectItem>
									<SelectItem value="medium">Medium Priority</SelectItem>
									<SelectItem value="low">Low Priority</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">RTL Support</Label>
								<p className="text-sm text-muted-foreground">Right-to-left text direction</p>
							</div>
							<Switch
								checked={formData.rtl}
								onCheckedChange={(checked) => setFormData({ ...formData, rtl: checked })}
							/>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Active</Label>
								<p className="text-sm text-muted-foreground">Enable this locale</p>
							</div>
							<Switch
								checked={formData.isActive}
								onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
							/>
						</div>
						<div className="p-4 border rounded-lg bg-muted/50">
							<h4 className="font-semibold mb-2">Preview</h4>
							<div className="flex items-center gap-3 text-sm">
								<span className="text-lg">{formData.flag}</span>
								<div>
									<p className="font-medium">{formData.name}</p>
									<p className="text-muted-foreground">{formData.nativeName}</p>
								</div>
								<Badge className={`${getPriorityColor(formData.priority)} text-white`}>
									{formData.priority}
								</Badge>
								{formData.rtl && (
									<Badge className="bg-purple-500 text-white">RTL</Badge>
								)}
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

// Locale View Modal Component
function LocaleViewModal({ 
	locale, 
	onClose 
}: { 
	locale: Locale; 
	onClose: () => void; 
}) {
	const PriorityIcon = getPriorityIcon(locale.priority || "medium");
	
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Locale Details</h3>
					<p className="text-muted-foreground">View detailed information about this locale</p>
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
							Locale Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">Language</Label>
							<div className="flex items-center gap-3 mt-1">
								<span className="text-2xl">{locale.flag}</span>
								<div>
									<p className="font-semibold">{locale.name}</p>
									<p className="text-sm text-muted-foreground">{locale.nativeName}</p>
								</div>
							</div>
						</div>
						<div>
							<Label className="text-sm font-medium">Language Code</Label>
							<p className="text-sm text-muted-foreground mt-1 font-mono">{locale.code}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Text Direction</Label>
							<div className="flex items-center gap-2 mt-1">
								{locale.rtl ? (
									<AlignRight className="h-4 w-4 text-purple-600" />
								) : (
									<AlignLeft className="h-4 w-4 text-blue-600" />
								)}
								<Badge className={locale.rtl ? "bg-purple-500 text-white" : "bg-blue-500 text-white"}>
									{locale.rtl ? "RTL" : "LTR"}
								</Badge>
							</div>
						</div>
						<div>
							<Label className="text-sm font-medium">Status</Label>
							<div className="flex items-center gap-2 mt-1">
								{locale.isActive ? (
									<CheckCircle className="h-4 w-4 text-green-600" />
								) : (
									<XCircle className="h-4 w-4 text-gray-600" />
								)}
								<Badge className={locale.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
									{locale.isActive ? "Active" : "Inactive"}
								</Badge>
								{locale.isDefault && (
									<Badge className="bg-yellow-500 text-white">Default</Badge>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<BarChart3 className="h-5 w-5 text-green-600" />
							Translation Statistics
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">Completeness</Label>
							<div className="flex items-center gap-3 mt-1">
								<div className="w-24 bg-muted rounded-full h-2">
									<div 
										className={`h-2 rounded-full ${getCompletenessColor(locale.completeness)}`} 
										style={{ width: `${locale.completeness}%` }} 
									/>
								</div>
								<Badge className={`${getCompletenessColor(locale.completeness)} text-white`}>
									{locale.completeness}%
								</Badge>
							</div>
						</div>
						<div>
							<Label className="text-sm font-medium">Total Translations</Label>
							<p className="text-2xl font-bold text-blue-600">{locale.translations || 0}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Missing Translations</Label>
							<p className="text-2xl font-bold text-red-600">{locale.missingTranslations || 0}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Last Updated</Label>
							<p className="text-sm text-muted-foreground mt-1">{locale.lastUpdated || "Never"}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Priority</Label>
							<div className="flex items-center gap-2 mt-1">
								<PriorityIcon className="h-4 w-4" />
								<Badge className={`${getPriorityColor(locale.priority || "medium")} text-white`}>
									{locale.priority || "medium"}
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				{locale.translators && locale.translators.length > 0 && (
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2">
								<Users className="h-5 w-5 text-purple-600" />
								Translators
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{locale.translators.map((translator, index) => (
									<Badge key={index} variant="outline" className="px-3 py-1">
										<Users className="h-3 w-3 mr-1" />
										{translator}
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

export function LocalesManagement() {
	const [localesData, setLocalesData] = useState(locales);
	const [editingLocale, setEditingLocale] = useState<Locale | null>(null);
	const [viewingLocale, setViewingLocale] = useState<Locale | null>(null);
	const [newLocale, setNewLocale] = useState({
		code: "",
		name: "",
		nativeName: "",
		flag: "",
		rtl: false,
		priority: "medium" as "high" | "medium" | "low",
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [isAddingLocale, setIsAddingLocale] = useState(false);

	const filteredLocales = localesData.filter((locale) => {
		const matchesSearch = locale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 locale.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 locale.nativeName.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || 
							 (statusFilter === "active" && locale.isActive) ||
							 (statusFilter === "inactive" && !locale.isActive);
		return matchesSearch && matchesStatus;
	});

	const handleSaveLocale = (updatedLocale: Locale) => {
		setLocalesData(prev => prev.map(locale => locale.id === updatedLocale.id ? updatedLocale : locale));
	};

	const handleAddLocale = () => {
		if (newLocale.name && newLocale.code && newLocale.nativeName) {
			const locale: Locale = {
				id: (localesData.length + 1).toString(),
				...newLocale,
				isDefault: false,
				isActive: true,
				completeness: 0,
				translations: 0,
				missingTranslations: 1250,
				lastUpdated: "Never",
				translators: [],
			};
			setLocalesData(prev => [...prev, locale]);
			setNewLocale({ code: "", name: "", nativeName: "", flag: "", rtl: false, priority: "medium" });
			setIsAddingLocale(false);
		}
	};

	const handleDeleteLocale = (id: string) => {
		setLocalesData(prev => prev.filter(locale => locale.id !== id));
	};

	const handleToggleActive = (id: string) => {
		setLocalesData(prev => prev.map(locale => 
			locale.id === id ? { ...locale, isActive: !locale.isActive } : locale
		));
	};

	const getStats = () => {
		const total = localesData.length;
		const active = localesData.filter(locale => locale.isActive).length;
		const rtl = localesData.filter(locale => locale.rtl).length;
		const avgCompleteness = Math.round(localesData.reduce((sum, locale) => sum + locale.completeness, 0) / localesData.length);
		const totalTranslations = localesData.reduce((sum, locale) => sum + (locale.translations || 0), 0);
		
		return { total, active, rtl, avgCompleteness, totalTranslations };
	};

	const stats = getStats();

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-2xl border border-blue-500/20">
							<Languages className="h-6 w-6 text-blue-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Locales Management</h1>
							<p className="text-muted-foreground">Manage languages and internationalization settings</p>
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					<Button variant="outline" size="lg">
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
					<Button onClick={() => setIsAddingLocale(true)} size="lg">
						<Plus className="h-4 w-4 mr-2" />
						Add Language
					</Button>
				</div>
			</div>

			{/* Enhanced Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center">
								<Globe className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Languages</p>
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
							<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
								<AlignRight className="h-6 w-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">RTL</p>
								<p className="text-2xl font-bold">{stats.rtl}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center">
								<Percent className="h-6 w-6 text-yellow-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Avg. Complete</p>
								<p className="text-2xl font-bold">{stats.avgCompleteness}%</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
								<FileText className="h-6 w-6 text-indigo-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Translations</p>
								<p className="text-2xl font-bold">{stats.totalTranslations.toLocaleString()}</p>
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
									placeholder="Search languages..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-11"
								/>
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[180px] h-11">
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Languages</SelectItem>
									<SelectItem value="active">Active Only</SelectItem>
									<SelectItem value="inactive">Inactive Only</SelectItem>
								</SelectContent>
							</Select>
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
			<Tabs defaultValue="languages" className="space-y-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="languages" className="flex items-center gap-2">
						<Languages className="h-4 w-4" />
						Languages
					</TabsTrigger>
					<TabsTrigger value="settings" className="flex items-center gap-2">
						<Settings className="h-4 w-4" />
						Settings
					</TabsTrigger>
					<TabsTrigger value="translations" className="flex items-center gap-2">
						<FileText className="h-4 w-4" />
						Translations
					</TabsTrigger>
				</TabsList>

				<TabsContent value="languages" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Languages className="h-5 w-5 text-blue-600" />
								Configured Languages
							</CardTitle>
							<CardDescription>Manage your website languages</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{filteredLocales.map((locale) => {
									const PriorityIcon = getPriorityIcon(locale.priority || "medium");
									
									return (
										<div key={locale.id} className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
											<div className="flex items-center gap-6">
												<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center">
													<span className="text-2xl">{locale.flag}</span>
												</div>
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-2">
														<h3 className="font-semibold text-lg">{locale.name}</h3>
														<Badge className={`${getPriorityColor(locale.priority || "medium")} text-white`}>
															<PriorityIcon className="h-3 w-3 mr-1" />
															{locale.priority || "medium"}
														</Badge>
														{locale.isDefault && (
															<Badge className="bg-yellow-500 text-white">
																<Star className="h-3 w-3 mr-1" />
																Default
															</Badge>
														)}
														{locale.rtl && (
															<Badge className="bg-purple-500 text-white">
																<AlignRight className="h-3 w-3 mr-1" />
																RTL
															</Badge>
														)}
													</div>
													<p className="text-sm text-muted-foreground mb-2">{locale.nativeName} ({locale.code})</p>
													<div className="flex items-center gap-6 text-sm text-muted-foreground">
														<span>{locale.translations || 0} translations</span>
														<span>{locale.missingTranslations || 0} missing</span>
														<span>Last updated: {locale.lastUpdated || "Never"}</span>
													</div>
													<div className="flex items-center gap-3 mt-3">
														<div className="w-32 bg-muted rounded-full h-2">
															<div 
																className={`h-2 rounded-full ${getCompletenessColor(locale.completeness)}`} 
																style={{ width: `${locale.completeness}%` }} 
															/>
														</div>
														<Badge className={`${getCompletenessColor(locale.completeness)} text-white`}>
															{locale.completeness}%
														</Badge>
													</div>
												</div>
											</div>
											<div className="flex gap-2">
												<Button 
													variant="outline" 
													size="lg"
													onClick={() => setViewingLocale(locale)}
												>
													<Eye className="h-4 w-4 mr-2" />
													View
												</Button>
												<Button 
													variant="outline" 
													size="lg"
													onClick={() => setEditingLocale(locale)}
												>
													<Edit className="h-4 w-4 mr-2" />
													Edit
												</Button>
												<Button 
													variant="outline" 
													size="lg"
													onClick={() => handleToggleActive(locale.id)}
												>
													{locale.isActive ? (
														<CheckCircle className="h-4 w-4" />
													) : (
														<XCircle className="h-4 w-4" />
													)}
												</Button>
												{!locale.isDefault && (
													<Button 
														variant="outline" 
														size="lg"
														onClick={() => handleDeleteLocale(locale.id)}
														className="text-red-600 hover:text-red-700"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="settings" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Settings className="h-5 w-5 text-green-600" />
								Internationalization Settings
							</CardTitle>
							<CardDescription>Configure global i18n options</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
											<Globe className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<p className="font-semibold text-lg">Auto-detect Language</p>
											<p className="text-sm text-muted-foreground">Automatically detect user's preferred language</p>
										</div>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center">
											<Languages className="h-6 w-6 text-green-600" />
										</div>
										<div>
											<p className="font-semibold text-lg">Language Switcher</p>
											<p className="text-sm text-muted-foreground">Display language selector in header</p>
										</div>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
											<AlignRight className="h-6 w-6 text-purple-600" />
										</div>
										<div>
											<p className="font-semibold text-lg">RTL Support</p>
											<p className="text-sm text-muted-foreground">Enable right-to-left layout support</p>
										</div>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center">
											<Zap className="h-6 w-6 text-yellow-600" />
										</div>
										<div>
											<p className="font-semibold text-lg">Auto-translate</p>
											<p className="text-sm text-muted-foreground">Enable automatic translation for missing content</p>
										</div>
									</div>
									<Switch />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="translations" className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<FileText className="h-5 w-5 text-indigo-600" />
								Translation Management
							</CardTitle>
							<CardDescription>Manage translation files and progress</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{localesData.filter(locale => locale.isActive).map((locale) => (
									<div key={locale.id} className="p-6 border rounded-xl hover:shadow-md transition-shadow">
										<div className="flex items-center justify-between mb-4">
											<div className="flex items-center gap-3">
												<span className="text-2xl">{locale.flag}</span>
												<div>
													<h3 className="font-semibold text-lg">{locale.name}</h3>
													<p className="text-sm text-muted-foreground">{locale.nativeName}</p>
												</div>
											</div>
											<div className="flex gap-2">
												<Button variant="outline" size="lg">
													<Download className="h-4 w-4 mr-2" />
													Export
												</Button>
												<Button variant="outline" size="lg">
													<Upload className="h-4 w-4 mr-2" />
													Import
												</Button>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="text-center p-4 border rounded-lg">
												<p className="text-2xl font-bold text-blue-600">{locale.translations || 0}</p>
												<p className="text-sm text-muted-foreground">Completed</p>
											</div>
											<div className="text-center p-4 border rounded-lg">
												<p className="text-2xl font-bold text-red-600">{locale.missingTranslations || 0}</p>
												<p className="text-sm text-muted-foreground">Missing</p>
											</div>
											<div className="text-center p-4 border rounded-lg">
												<p className="text-2xl font-bold text-green-600">{locale.completeness}%</p>
												<p className="text-sm text-muted-foreground">Complete</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Add Locale Modal */}
			<Dialog open={isAddingLocale} onOpenChange={setIsAddingLocale}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle className="text-xl">Add New Language</DialogTitle>
						<DialogDescription>Add a new language to your website</DialogDescription>
					</DialogHeader>
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="locale-code" className="text-sm font-medium">Language Code</Label>
							<Input
								id="locale-code"
								placeholder="en, fr, ar, etc."
								value={newLocale.code}
								onChange={(e) => setNewLocale({ ...newLocale, code: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="locale-name" className="text-sm font-medium">Language Name</Label>
							<Input
								id="locale-name"
								placeholder="English, French, Arabic, etc."
								value={newLocale.name}
								onChange={(e) => setNewLocale({ ...newLocale, name: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="locale-native" className="text-sm font-medium">Native Name</Label>
							<Input
								id="locale-native"
								placeholder="English, Français, العربية, etc."
								value={newLocale.nativeName}
								onChange={(e) => setNewLocale({ ...newLocale, nativeName: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="locale-flag" className="text-sm font-medium">Flag Emoji</Label>
							<Input
								id="locale-flag"
								placeholder="🇺🇸, 🇫🇷, 🇸🇦, etc."
								value={newLocale.flag}
								onChange={(e) => setNewLocale({ ...newLocale, flag: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="locale-priority" className="text-sm font-medium">Priority</Label>
							<Select
								value={newLocale.priority}
								onValueChange={(value: "high" | "medium" | "low") => setNewLocale({ ...newLocale, priority: value })}
							>
								<SelectTrigger className="h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="high">High Priority</SelectItem>
									<SelectItem value="medium">Medium Priority</SelectItem>
									<SelectItem value="low">Low Priority</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">RTL Support</Label>
								<p className="text-sm text-muted-foreground">Right-to-left text direction</p>
							</div>
							<Switch
								checked={newLocale.rtl}
								onCheckedChange={(checked) => setNewLocale({ ...newLocale, rtl: checked })}
							/>
						</div>
						<div className="flex gap-3">
							<Button onClick={handleAddLocale} size="lg" className="flex-1">
								<Plus className="h-4 w-4 mr-2" />
								Add Language
							</Button>
							<Button variant="outline" onClick={() => setIsAddingLocale(false)} size="lg">
								Cancel
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Locale Edit Modal */}
			<Dialog open={!!editingLocale} onOpenChange={() => setEditingLocale(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Edit Locale</DialogTitle>
						</DialogHeader>
						{editingLocale && (
							<LocaleEditModal
								locale={editingLocale}
								onSave={handleSaveLocale}
								onClose={() => setEditingLocale(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Locale View Modal */}
			<Dialog open={!!viewingLocale} onOpenChange={() => setViewingLocale(null)}>
				<DialogContent className="!max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">Locale Details</DialogTitle>
						<DialogDescription>View detailed information about this locale</DialogDescription>
					</DialogHeader>
					{viewingLocale && (
						<LocaleViewModal
							locale={viewingLocale}
							onClose={() => setViewingLocale(null)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
