"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
];

const getStatusColor = (status: string) => {
	return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
};

const getTypeColor = (type: string) => {
	switch (type) {
		case "301":
			return "bg-blue-100 text-blue-800";
		case "302":
			return "bg-yellow-100 text-yellow-800";
		case "307":
			return "bg-purple-100 text-purple-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function RedirectsManagement() {
	const [newRedirect, setNewRedirect] = useState({
		source: "",
		destination: "",
		type: "301" as "301" | "302" | "307",
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Redirects Management</h2>
					<p className="text-muted-foreground">Manage URL redirects and track their performance</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<i className="fas fa-plus mr-2 h-4 w-4" />
							Add Redirect
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Redirect</DialogTitle>
							<DialogDescription>Create a new URL redirect rule</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="source-url">Source URL</Label>
								<Input
									id="source-url"
									placeholder="/old-page"
									value={newRedirect.source}
									onChange={(e) => setNewRedirect({ ...newRedirect, source: e.target.value })}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="destination-url">Destination URL</Label>
								<Input
									id="destination-url"
									placeholder="/new-page"
									value={newRedirect.destination}
									onChange={(e) =>
										setNewRedirect({
											...newRedirect,
											destination: e.target.value,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="redirect-type">Redirect Type</Label>
								<Select
									value={newRedirect.type}
									onValueChange={(value: "301" | "302" | "307") => setNewRedirect({ ...newRedirect, type: value })}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="301">301 - Permanent</SelectItem>
										<SelectItem value="302">302 - Temporary</SelectItem>
										<SelectItem value="307">307 - Temporary (Preserve Method)</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex justify-end gap-2">
								<Button variant="outline">Cancel</Button>
								<Button>Create Redirect</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Redirects</CardTitle>
						<i className="fas fa-external-link-alt h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{redirects.length}</div>
						<p className="text-xs text-muted-foreground">+2 from last month</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Redirects</CardTitle>
						<i className="fas fa-check-circle h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{redirects.filter((r) => r.status === "Active").length}</div>
						<p className="text-xs text-muted-foreground">Currently active</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Hits</CardTitle>
						<i className="fas fa-mouse-pointer h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{redirects.reduce((sum, r) => sum + r.hits, 0)}</div>
						<p className="text-xs text-muted-foreground">All time</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">301 Redirects</CardTitle>
						<i className="fas fa-arrow-right h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{redirects.filter((r) => r.type === "301").length}</div>
						<p className="text-xs text-muted-foreground">Permanent redirects</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Redirect Rules</CardTitle>
					<CardDescription>Manage your URL redirect rules</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Source URL</TableHead>
								<TableHead>Destination URL</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Hits</TableHead>
								<TableHead>Last Hit</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{redirects.map((redirect) => (
								<TableRow key={redirect.id}>
									<TableCell className="font-mono text-sm">{redirect.source}</TableCell>
									<TableCell className="font-mono text-sm">{redirect.destination}</TableCell>
									<TableCell>
										<Badge className={getTypeColor(redirect.type)}>{redirect.type}</Badge>
									</TableCell>
									<TableCell>{redirect.hits}</TableCell>
									<TableCell>{redirect.lastHit}</TableCell>
									<TableCell>
										<Badge className={getStatusColor(redirect.status)}>{redirect.status}</Badge>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button size="sm" variant="outline">
												<i className="fas fa-edit h-4 w-4" />
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

			<Card>
				<CardHeader>
					<CardTitle>Bulk Import</CardTitle>
					<CardDescription>Import multiple redirects from a CSV file</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
							<i className="fas fa-file-csv text-2xl text-muted-foreground mb-2" />
							<p className="text-sm text-muted-foreground mb-2">Drop your CSV file here or click to browse</p>
							<Button variant="outline">
								<i className="fas fa-upload mr-2 h-4 w-4" />
								Choose File
							</Button>
						</div>
						<div className="text-xs text-muted-foreground">
							<p>CSV format: source_url, destination_url, redirect_type</p>
							<p>Example: /old-page, /new-page, 301</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
