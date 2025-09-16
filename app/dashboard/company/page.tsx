"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Save, Plus, Trash2, MapPin, Phone, Mail, Users, Building } from "lucide-react";

// Mock company data
const companyInfo = {
	name: "TechSolutions Inc.",
	tagline: "Innovative Technology Solutions",
	description:
		"We are a leading technology company specializing in web development, mobile applications, and digital transformation services.",
	mission: "To empower businesses through innovative technology solutions that drive growth and efficiency.",
	vision: "To be the most trusted technology partner for businesses worldwide.",
	values: ["Innovation", "Quality", "Integrity", "Customer Focus"],
	founded: "2015",
	employees: "50-100",
	headquarters: "San Francisco, CA",
};

const teamMembers = [
	{
		id: 1,
		name: "John Smith",
		role: "CEO & Founder",
		bio: "Experienced technology leader with 15+ years in software development",
		image: "/team1.jpg",
		linkedin: "https://linkedin.com/in/johnsmith",
		email: "john@techsolutions.com",
	},
	{
		id: 2,
		name: "Sarah Johnson",
		role: "CTO",
		bio: "Full-stack developer and technology strategist",
		image: "/team2.jpg",
		linkedin: "https://linkedin.com/in/sarahjohnson",
		email: "sarah@techsolutions.com",
	},
	{
		id: 3,
		name: "Mike Chen",
		role: "Lead Designer",
		bio: "Creative designer with expertise in UX/UI and brand design",
		image: "/team3.jpg",
		linkedin: "https://linkedin.com/in/mikechen",
		email: "mike@techsolutions.com",
	},
];

const offices = [
	{
		id: 1,
		name: "San Francisco HQ",
		address: "123 Tech Street, San Francisco, CA 94105",
		phone: "+1 (555) 123-4567",
		email: "sf@techsolutions.com",
		isHeadquarters: true,
	},
	{
		id: 2,
		name: "New York Office",
		address: "456 Business Ave, New York, NY 10001",
		phone: "+1 (555) 987-6543",
		email: "ny@techsolutions.com",
		isHeadquarters: false,
	},
];

export default function CompanyPage() {
	const [editingSection, setEditingSection] = useState<any>(null);
	const [companyData, setCompanyData] = useState(companyInfo);

	const handleSave = (section: string) => {
		console.log(`Saving ${section}:`, companyData);
		setEditingSection(null);
		// Save logic would go here
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Company Information</h3>
					<p className="text-sm text-muted-foreground">Manage your company profile and team</p>
				</div>
			</div>

			<Tabs defaultValue="about" className="space-y-6">
				<TabsList>
					<TabsTrigger value="about">About</TabsTrigger>
					<TabsTrigger value="team">Team</TabsTrigger>
					<TabsTrigger value="locations">Locations</TabsTrigger>
				</TabsList>

				<TabsContent value="about" className="space-y-6">
					{/* Company Overview */}
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div>
									<CardTitle>Company Overview</CardTitle>
									<CardDescription>Basic company information and branding</CardDescription>
								</div>
								<Button variant="ghost" size="sm" onClick={() => setEditingSection(editingSection === "overview" ? null : "overview")}>
									<Edit className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{editingSection === "overview" ? (
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="name">Company Name</Label>
											<Input
												id="name"
												value={companyData.name}
												onChange={(e) =>
													setCompanyData({
														...companyData,
														name: e.target.value,
													})
												}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="tagline">Tagline</Label>
											<Input
												id="tagline"
												value={companyData.tagline}
												onChange={(e) =>
													setCompanyData({
														...companyData,
														tagline: e.target.value,
													})
												}
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											value={companyData.description}
											onChange={(e) =>
												setCompanyData({
													...companyData,
													description: e.target.value,
												})
											}
											rows={3}
										/>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<div className="space-y-2">
											<Label htmlFor="founded">Founded</Label>
											<Input
												id="founded"
												value={companyData.founded}
												onChange={(e) =>
													setCompanyData({
														...companyData,
														founded: e.target.value,
													})
												}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="employees">Employees</Label>
											<Input
												id="employees"
												value={companyData.employees}
												onChange={(e) =>
													setCompanyData({
														...companyData,
														employees: e.target.value,
													})
												}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="headquarters">Headquarters</Label>
											<Input
												id="headquarters"
												value={companyData.headquarters}
												onChange={(e) =>
													setCompanyData({
														...companyData,
														headquarters: e.target.value,
													})
												}
											/>
										</div>
									</div>
									<div className="flex gap-2">
										<Button onClick={() => handleSave("overview")}>
											<Save className="h-4 w-4 mr-2" />
											Save Changes
										</Button>
										<Button variant="outline" onClick={() => setEditingSection(null)}>
											Cancel
										</Button>
									</div>
								</div>
							) : (
								<div className="space-y-4">
									<div>
										<h3 className="text-xl font-semibold">{companyData.name}</h3>
										<p className="text-muted-foreground">{companyData.tagline}</p>
									</div>
									<p>{companyData.description}</p>
									<div className="grid grid-cols-3 gap-4 text-sm">
										<div>
											<span className="font-medium">Founded:</span>
											<p className="text-muted-foreground">{companyData.founded}</p>
										</div>
										<div>
											<span className="font-medium">Employees:</span>
											<p className="text-muted-foreground">{companyData.employees}</p>
										</div>
										<div>
											<span className="font-medium">Headquarters:</span>
											<p className="text-muted-foreground">{companyData.headquarters}</p>
										</div>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Mission & Vision */}
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div>
									<CardTitle>Mission & Vision</CardTitle>
									<CardDescription>Company purpose and future goals</CardDescription>
								</div>
								<Button variant="ghost" size="sm" onClick={() => setEditingSection(editingSection === "mission" ? null : "mission")}>
									<Edit className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{editingSection === "mission" ? (
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="mission">Mission Statement</Label>
										<Textarea
											id="mission"
											value={companyData.mission}
											onChange={(e) =>
												setCompanyData({
													...companyData,
													mission: e.target.value,
												})
											}
											rows={3}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="vision">Vision Statement</Label>
										<Textarea
											id="vision"
											value={companyData.vision}
											onChange={(e) =>
												setCompanyData({
													...companyData,
													vision: e.target.value,
												})
											}
											rows={3}
										/>
									</div>
									<div className="flex gap-2">
										<Button onClick={() => handleSave("mission")}>
											<Save className="h-4 w-4 mr-2" />
											Save Changes
										</Button>
										<Button variant="outline" onClick={() => setEditingSection(null)}>
											Cancel
										</Button>
									</div>
								</div>
							) : (
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">Mission</h4>
										<p className="text-muted-foreground">{companyData.mission}</p>
									</div>
									<div>
										<h4 className="font-semibold mb-2">Vision</h4>
										<p className="text-muted-foreground">{companyData.vision}</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Company Values */}
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div>
									<CardTitle>Company Values</CardTitle>
									<CardDescription>Core principles that guide your business</CardDescription>
								</div>
								<Button variant="ghost" size="sm">
									<Edit className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{companyData.values.map((value: string) => (
									<Badge key={value} variant="outline" className="px-3 py-1">
										{value}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="team" className="space-y-6">
					<div className="flex justify-between items-center">
						<div>
							<h4 className="text-lg font-medium">Team Members</h4>
							<p className="text-sm text-muted-foreground">{teamMembers.length} team members</p>
						</div>
						<Button>
							<Plus className="h-4 w-4 mr-2" />
							Add Team Member
						</Button>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{teamMembers.map((member: any) => (
							<Card key={member.id}>
								<CardContent className="p-6">
									<div className="flex flex-col items-center text-center space-y-4">
										<div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
											<Users className="h-8 w-8 text-muted-foreground" />
										</div>
										<div>
											<h3 className="font-semibold">{member.name}</h3>
											<p className="text-sm text-muted-foreground">{member.role}</p>
										</div>
										<p className="text-sm text-center">{member.bio}</p>
										<div className="flex items-center gap-2 w-full">
											<Button variant="ghost" size="sm" className="flex-1">
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="locations" className="space-y-6">
					<div className="flex justify-between items-center">
						<div>
							<h4 className="text-lg font-medium">Office Locations</h4>
							<p className="text-sm text-muted-foreground">{offices.length} locations</p>
						</div>
						<Button>
							<Plus className="h-4 w-4 mr-2" />
							Add Location
						</Button>
					</div>

					<div className="grid gap-4">
						{offices.map((office: any) => (
							<Card key={office.id}>
								<CardContent className="p-6">
									<div className="flex items-start justify-between">
										<div className="flex gap-4">
											<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
												<Building className="h-6 w-6 text-muted-foreground" />
											</div>
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<h3 className="font-semibold">{office.name}</h3>
													{office.isHeadquarters && <Badge className="bg-cyan-500">Headquarters</Badge>}
												</div>
												<div className="space-y-1 text-sm text-muted-foreground">
													<div className="flex items-center gap-2">
														<MapPin className="h-4 w-4" />
														<span>{office.address}</span>
													</div>
													<div className="flex items-center gap-2">
														<Phone className="h-4 w-4" />
														<span>{office.phone}</span>
													</div>
													<div className="flex items-center gap-2">
														<Mail className="h-4 w-4" />
														<span>{office.email}</span>
													</div>
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
