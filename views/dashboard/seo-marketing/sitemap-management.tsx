"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sitemapPages = [
	{
		id: 1,
		url: "/",
		priority: "1.0",
		changeFreq: "weekly",
		lastMod: "2024-01-15",
		included: true,
	},
	{
		id: 2,
		url: "/about",
		priority: "0.8",
		changeFreq: "monthly",
		lastMod: "2024-01-10",
		included: true,
	},
	{
		id: 3,
		url: "/services",
		priority: "0.9",
		changeFreq: "weekly",
		lastMod: "2024-01-12",
		included: true,
	},
	{
		id: 4,
		url: "/blog",
		priority: "0.8",
		changeFreq: "daily",
		lastMod: "2024-01-15",
		included: true,
	},
	{
		id: 5,
		url: "/contact",
		priority: "0.7",
		changeFreq: "monthly",
		lastMod: "2024-01-08",
		included: true,
	},
];

const getFrequencyColor = (freq: string) => {
	switch (freq) {
		case "daily":
			return "bg-green-100 text-green-800";
		case "weekly":
			return "bg-blue-100 text-blue-800";
		case "monthly":
			return "bg-yellow-100 text-yellow-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function SitemapManagement() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Sitemap Management</h2>
					<p className="text-muted-foreground">Configure and manage your XML sitemap</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<i className="fas fa-download mr-2 h-4 w-4" />
						Download Sitemap
					</Button>
					<Button>
						<i className="fas fa-sync mr-2 h-4 w-4" />
						Generate Sitemap
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total URLs</CardTitle>
						<i className="fas fa-sitemap h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{sitemapPages.length}</div>
						<p className="text-xs text-muted-foreground">In sitemap</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Last Generated</CardTitle>
						<i className="fas fa-clock h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">Today</div>
						<p className="text-xs text-muted-foreground">2 hours ago</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">File Size</CardTitle>
						<i className="fas fa-file h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">2.4 KB</div>
						<p className="text-xs text-muted-foreground">Compressed</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Sitemap Configuration</CardTitle>
					<CardDescription>Configure automatic sitemap generation settings</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Auto-generate Sitemap</Label>
							<p className="text-sm text-muted-foreground">Automatically update sitemap when content changes</p>
						</div>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Include Images</Label>
							<p className="text-sm text-muted-foreground">Include image URLs in sitemap</p>
						</div>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Submit to Search Engines</Label>
							<p className="text-sm text-muted-foreground">Automatically notify search engines of updates</p>
						</div>
						<Switch defaultChecked />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Sitemap URLs</CardTitle>
					<CardDescription>Manage which pages are included in your sitemap</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>URL</TableHead>
								<TableHead>Priority</TableHead>
								<TableHead>Change Frequency</TableHead>
								<TableHead>Last Modified</TableHead>
								<TableHead>Included</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sitemapPages.map((page) => (
								<TableRow key={page.id}>
									<TableCell className="font-mono text-sm">{page.url}</TableCell>
									<TableCell>{page.priority}</TableCell>
									<TableCell>
										<Badge className={getFrequencyColor(page.changeFreq)}>{page.changeFreq}</Badge>
									</TableCell>
									<TableCell>{page.lastMod}</TableCell>
									<TableCell>
										<Switch defaultChecked={page.included} />
									</TableCell>
									<TableCell>
										<Button size="sm" variant="outline">
											<i className="fas fa-edit h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Search Engine Submission</CardTitle>
					<CardDescription>Submit your sitemap to search engines</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 border rounded-lg">
								<div className="flex items-center gap-3">
									<i className="fab fa-google text-2xl text-blue-600" />
									<div>
										<p className="font-medium">Google Search Console</p>
										<p className="text-sm text-muted-foreground">Last submitted: 2 hours ago</p>
									</div>
								</div>
								<Badge className="bg-green-100 text-green-800">Submitted</Badge>
							</div>
							<div className="flex items-center justify-between p-4 border rounded-lg">
								<div className="flex items-center gap-3">
									<i className="fab fa-microsoft text-2xl text-blue-500" />
									<div>
										<p className="font-medium">Bing Webmaster Tools</p>
										<p className="text-sm text-muted-foreground">Last submitted: 1 day ago</p>
									</div>
								</div>
								<Badge className="bg-green-100 text-green-800">Submitted</Badge>
							</div>
						</div>
						<div className="space-y-4">
							<Button className="w-full">
								<i className="fas fa-paper-plane mr-2 h-4 w-4" />
								Submit to All Search Engines
							</Button>
							<div className="text-sm text-muted-foreground space-y-1">
								<p>Sitemap URL: https://yoursite.com/sitemap.xml</p>
								<p>Last generated: 2 hours ago</p>
								<p>Next auto-generation: When content changes</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
