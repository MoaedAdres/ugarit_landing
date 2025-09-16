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
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Optimized":
			return "bg-green-100 text-green-800";
		case "Needs Review":
			return "bg-yellow-100 text-yellow-800";
		case "Poor":
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function SEOSettings() {
	const [globalSettings, setGlobalSettings] = useState({
		siteTitle: "TechCorp - Professional Web Development",
		siteDescription: "Leading web development company offering custom solutions for businesses worldwide.",
		defaultKeywords: "web development, custom software, business solutions",
		googleAnalytics: "GA-XXXXXXXXX",
		googleSearchConsole: true,
		xmlSitemap: true,
		robotsTxt: true,
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">SEO Settings</h2>
					<p className="text-muted-foreground">Manage search engine optimization settings</p>
				</div>
				<Button>
					<i className="fas fa-save mr-2 h-4 w-4" />
					Save All Changes
				</Button>
			</div>

			<Tabs defaultValue="global" className="space-y-4">
				<TabsList>
					<TabsTrigger value="global">Global Settings</TabsTrigger>
					<TabsTrigger value="pages">Page SEO</TabsTrigger>
					<TabsTrigger value="social">Social Media</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
				</TabsList>

				<TabsContent value="global" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Global SEO Settings</CardTitle>
							<CardDescription>Default settings applied across your website</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="site-title">Site Title</Label>
									<Input
										id="site-title"
										value={globalSettings.siteTitle}
										onChange={(e) =>
											setGlobalSettings({
												...globalSettings,
												siteTitle: e.target.value,
											})
										}
									/>
									<p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
								</div>
								<div className="space-y-2">
									<Label htmlFor="default-keywords">Default Keywords</Label>
									<Input
										id="default-keywords"
										value={globalSettings.defaultKeywords}
										onChange={(e) =>
											setGlobalSettings({
												...globalSettings,
												defaultKeywords: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="site-description">Site Description</Label>
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
								/>
								<p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Technical SEO</CardTitle>
							<CardDescription>Configure technical SEO features</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>XML Sitemap</Label>
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
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Robots.txt</Label>
									<p className="text-sm text-muted-foreground">Generate robots.txt file</p>
								</div>
								<Switch
									checked={globalSettings.robotsTxt}
									onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, robotsTxt: checked })}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Google Search Console</Label>
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

				<TabsContent value="pages" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Page SEO Management</CardTitle>
							<CardDescription>Manage SEO settings for individual pages</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Page</TableHead>
										<TableHead>Title</TableHead>
										<TableHead>Meta Description</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Last Updated</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{seoPages.map((page) => (
										<TableRow key={page.id}>
											<TableCell>
												<div>
													<p className="font-medium">{page.page}</p>
													<p className="text-sm text-muted-foreground">{page.url}</p>
												</div>
											</TableCell>
											<TableCell className="max-w-xs">
												<p className="truncate" title={page.title}>
													{page.title}
												</p>
											</TableCell>
											<TableCell className="max-w-xs">
												<p className="truncate" title={page.metaDescription}>
													{page.metaDescription}
												</p>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(page.status)}>{page.status}</Badge>
											</TableCell>
											<TableCell>{page.lastUpdated}</TableCell>
											<TableCell>
												<Button size="sm" variant="outline">
													<i className="fas fa-edit mr-2 h-4 w-4" />
													Edit
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="social" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Open Graph Settings</CardTitle>
							<CardDescription>Configure how your content appears on social media</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="og-title">Default OG Title</Label>
									<Input id="og-title" placeholder="Your Site Title" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="og-type">OG Type</Label>
									<Input id="og-type" value="website" readOnly />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="og-description">Default OG Description</Label>
								<Textarea id="og-description" placeholder="Description for social media sharing" rows={3} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="og-image">Default OG Image</Label>
								<div className="flex gap-2">
									<Input id="og-image" placeholder="https://example.com/og-image.jpg" />
									<Button variant="outline">
										<i className="fas fa-upload mr-2 h-4 w-4" />
										Upload
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Twitter Card Settings</CardTitle>
							<CardDescription>Configure Twitter card appearance</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="twitter-card">Card Type</Label>
									<Input id="twitter-card" value="summary_large_image" readOnly />
								</div>
								<div className="space-y-2">
									<Label htmlFor="twitter-site">Twitter Site</Label>
									<Input id="twitter-site" placeholder="@yoursite" />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="analytics" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Analytics Integration</CardTitle>
							<CardDescription>Connect analytics and tracking tools</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="google-analytics">Google Analytics ID</Label>
								<Input
									id="google-analytics"
									value={globalSettings.googleAnalytics}
									onChange={(e) =>
										setGlobalSettings({
											...globalSettings,
											googleAnalytics: e.target.value,
										})
									}
									placeholder="GA-XXXXXXXXX"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="google-tag-manager">Google Tag Manager ID</Label>
								<Input id="google-tag-manager" placeholder="GTM-XXXXXXX" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
								<Input id="facebook-pixel" placeholder="123456789012345" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>SEO Performance</CardTitle>
							<CardDescription>Overview of your SEO metrics</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4 md:grid-cols-3">
								<div className="text-center p-4 border rounded-lg">
									<div className="text-2xl font-bold text-primary">85</div>
									<p className="text-sm text-muted-foreground">SEO Score</p>
								</div>
								<div className="text-center p-4 border rounded-lg">
									<div className="text-2xl font-bold text-secondary">1,234</div>
									<p className="text-sm text-muted-foreground">Indexed Pages</p>
								</div>
								<div className="text-center p-4 border rounded-lg">
									<div className="text-2xl font-bold text-green-600">+15%</div>
									<p className="text-sm text-muted-foreground">Organic Traffic</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
