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
	},
];

const getCompletenessColor = (completeness: number) => {
	if (completeness >= 90) return "bg-green-100 text-green-800";
	if (completeness >= 70) return "bg-yellow-100 text-yellow-800";
	return "bg-red-100 text-red-800";
};

export function LocalesManagement() {
	const [newLocale, setNewLocale] = useState({
		code: "",
		name: "",
		nativeName: "",
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Locales Management</h2>
					<p className="text-muted-foreground">Manage languages and internationalization settings</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<i className="fas fa-plus mr-2 h-4 w-4" />
							Add Language
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Language</DialogTitle>
							<DialogDescription>Add a new language to your website</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="locale-code">Language Code</Label>
								<Input
									id="locale-code"
									placeholder="en, fr, ar, etc."
									value={newLocale.code}
									onChange={(e) => setNewLocale({ ...newLocale, code: e.target.value })}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="locale-name">Language Name</Label>
								<Input
									id="locale-name"
									placeholder="English, French, Arabic, etc."
									value={newLocale.name}
									onChange={(e) => setNewLocale({ ...newLocale, name: e.target.value })}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="locale-native">Native Name</Label>
								<Input
									id="locale-native"
									placeholder="English, Français, العربية, etc."
									value={newLocale.nativeName}
									onChange={(e) => setNewLocale({ ...newLocale, nativeName: e.target.value })}
								/>
							</div>
							<div className="flex justify-end gap-2">
								<Button variant="outline">Cancel</Button>
								<Button>Add Language</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Languages</CardTitle>
						<i className="fas fa-globe h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{locales.length}</div>
						<p className="text-xs text-muted-foreground">Configured</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Languages</CardTitle>
						<i className="fas fa-check-circle h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{locales.filter((l) => l.isActive).length}</div>
						<p className="text-xs text-muted-foreground">Currently active</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">RTL Languages</CardTitle>
						<i className="fas fa-align-right h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{locales.filter((l) => l.rtl).length}</div>
						<p className="text-xs text-muted-foreground">Right-to-left</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Avg. Completeness</CardTitle>
						<i className="fas fa-percentage h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{Math.round(locales.reduce((sum, l) => sum + l.completeness, 0) / locales.length)}%</div>
						<p className="text-xs text-muted-foreground">Translation progress</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Language Settings</CardTitle>
					<CardDescription>Configure internationalization options</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Auto-detect Language</Label>
							<p className="text-sm text-muted-foreground">Automatically detect user's preferred language</p>
						</div>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Show Language Switcher</Label>
							<p className="text-sm text-muted-foreground">Display language selector in header</p>
						</div>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>RTL Support</Label>
							<p className="text-sm text-muted-foreground">Enable right-to-left layout support</p>
						</div>
						<Switch defaultChecked />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Configured Languages</CardTitle>
					<CardDescription>Manage your website languages</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Language</TableHead>
								<TableHead>Code</TableHead>
								<TableHead>Native Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Completeness</TableHead>
								<TableHead>RTL</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{locales.map((locale) => (
								<TableRow key={locale.id}>
									<TableCell>
										<div className="flex items-center gap-2">
											<span className="text-lg">{locale.flag}</span>
											<div>
												<p className="font-medium">{locale.name}</p>
												{locale.isDefault && <Badge variant="secondary">Default</Badge>}
											</div>
										</div>
									</TableCell>
									<TableCell className="font-mono">{locale.code}</TableCell>
									<TableCell>{locale.nativeName}</TableCell>
									<TableCell>
										<Badge variant={locale.isActive ? "default" : "secondary"}>{locale.isActive ? "Active" : "Inactive"}</Badge>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<div className="w-16 bg-muted rounded-full h-2">
												<div className="bg-primary h-2 rounded-full" style={{ width: `${locale.completeness}%` }} />
											</div>
											<Badge className={getCompletenessColor(locale.completeness)}>{locale.completeness}%</Badge>
										</div>
									</TableCell>
									<TableCell>
										{locale.rtl ? <i className="fas fa-check text-green-600" /> : <i className="fas fa-times text-red-600" />}
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button size="sm" variant="outline">
												<i className="fas fa-edit h-4 w-4" />
											</Button>
											<Button size="sm" variant="outline">
												<i className="fas fa-language h-4 w-4" />
											</Button>
											{!locale.isDefault && (
												<Button size="sm" variant="outline">
													<i className="fas fa-trash h-4 w-4" />
												</Button>
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
