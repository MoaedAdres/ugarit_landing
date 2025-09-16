"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
	Edit,
	Save,
	Plus,
	Trash2,
	MapPin,
	Phone,
	Mail,
	Users,
	Building,
	Target,
	Eye,
	Award,
	Calendar,
	Globe,
	Briefcase,
	Heart,
	Lightbulb,
	Shield,
	Star,
} from "lucide-react";

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

// Team Member Form Component
function TeamMemberForm({ 
	member, 
	onSave, 
	onCancel 
}: { 
	member?: any; 
	onSave: (data: any) => void; 
	onCancel: () => void; 
}) {
	const [formData, setFormData] = useState({
		name: member?.name || "",
		role: member?.role || "",
		bio: member?.bio || "",
		email: member?.email || "",
		linkedin: member?.linkedin || "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
					<Input
						id="name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className="h-11"
						required
					/>
				</div>
				<div className="space-y-3">
					<Label htmlFor="role" className="text-sm font-medium">Role/Position</Label>
					<Input
						id="role"
						value={formData.role}
						onChange={(e) => setFormData({ ...formData, role: e.target.value })}
						className="h-11"
						required
					/>
				</div>
			</div>
			<div className="space-y-3">
				<Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
				<Textarea
					id="bio"
					value={formData.bio}
					onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
					rows={3}
					className="resize-none"
					required
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<Label htmlFor="email" className="text-sm font-medium">Email</Label>
					<Input
						id="email"
						type="email"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						className="h-11"
						required
					/>
				</div>
				<div className="space-y-3">
					<Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn URL</Label>
					<Input
						id="linkedin"
						type="url"
						value={formData.linkedin}
						onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
						className="h-11"
						placeholder="https://linkedin.com/in/username"
					/>
				</div>
			</div>
			<div className="flex gap-3 pt-4">
				<Button type="submit" size="lg">
					<Save className="h-4 w-4 mr-2" />
					{member ? "Update Member" : "Add Member"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel} size="lg">
					Cancel
				</Button>
			</div>
		</form>
	);
}

// Location Form Component
function LocationForm({ 
	location, 
	onSave, 
	onCancel 
}: { 
	location?: any; 
	onSave: (data: any) => void; 
	onCancel: () => void; 
}) {
	const [formData, setFormData] = useState({
		name: location?.name || "",
		address: location?.address || "",
		phone: location?.phone || "",
		email: location?.email || "",
		isHeadquarters: location?.isHeadquarters || false,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-3">
				<Label htmlFor="name" className="text-sm font-medium">Office Name</Label>
				<Input
					id="name"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					className="h-11"
					required
				/>
			</div>
			<div className="space-y-3">
				<Label htmlFor="address" className="text-sm font-medium">Address</Label>
				<Textarea
					id="address"
					value={formData.address}
					onChange={(e) => setFormData({ ...formData, address: e.target.value })}
					rows={3}
					className="resize-none"
					required
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
					<Input
						id="phone"
						value={formData.phone}
						onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
						className="h-11"
						required
					/>
				</div>
				<div className="space-y-3">
					<Label htmlFor="email" className="text-sm font-medium">Email</Label>
					<Input
						id="email"
						type="email"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						className="h-11"
						required
					/>
				</div>
			</div>
			<div className="flex items-center space-x-2">
				<input
					type="checkbox"
					id="isHeadquarters"
					checked={formData.isHeadquarters}
					onChange={(e) => setFormData({ ...formData, isHeadquarters: e.target.checked })}
					className="h-4 w-4 rounded border-gray-300"
				/>
				<Label htmlFor="isHeadquarters" className="text-sm font-medium">
					This is the headquarters
				</Label>
			</div>
			<div className="flex gap-3 pt-4">
				<Button type="submit" size="lg">
					<Save className="h-4 w-4 mr-2" />
					{location ? "Update Location" : "Add Location"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel} size="lg">
					Cancel
				</Button>
			</div>
		</form>
	);
}

// Company Values Form Component
function CompanyValuesForm({ 
	values, 
	onSave, 
	onCancel 
}: { 
	values: string[]; 
	onSave: (values: string[]) => void; 
	onCancel: () => void; 
}) {
	const [formValues, setFormValues] = useState(values);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formValues);
	};

	const addValue = () => {
		setFormValues([...formValues, ""]);
	};

	const removeValue = (index: number) => {
		setFormValues(formValues.filter((_, i) => i !== index));
	};

	const updateValue = (index: number, value: string) => {
		const newValues = [...formValues];
		newValues[index] = value;
		setFormValues(newValues);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				{formValues.map((value, index) => (
					<div key={index} className="flex items-center gap-3">
						<div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
							<Heart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
						</div>
						<Input
							value={value}
							onChange={(e) => updateValue(index, e.target.value)}
							placeholder="Enter company value"
							className="flex-1 h-11"
							required
						/>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => removeValue(index)}
							className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
			</div>
			<Button
				type="button"
				variant="outline"
				onClick={addValue}
				className="w-full"
			>
				<Plus className="h-4 w-4 mr-2" />
				Add Value
			</Button>
			<div className="flex gap-3 pt-4">
				<Button type="submit" size="lg">
					<Save className="h-4 w-4 mr-2" />
					Save Values
				</Button>
				<Button type="button" variant="outline" onClick={onCancel} size="lg">
					Cancel
				</Button>
			</div>
		</form>
	);
}

export default function CompanyPage() {
	const [editingSection, setEditingSection] = useState<any>(null);
	const [companyData, setCompanyData] = useState(companyInfo);
	const [teamMembersData, setTeamMembersData] = useState(teamMembers);
	const [officesData, setOfficesData] = useState(offices);
	const [showAddTeamMember, setShowAddTeamMember] = useState(false);
	const [showAddLocation, setShowAddLocation] = useState(false);
	const [editingTeamMember, setEditingTeamMember] = useState<any>(null);
	const [editingLocation, setEditingLocation] = useState<any>(null);
	const [editingValues, setEditingValues] = useState(false);

	const handleSave = (section: string) => {
		console.log(`Saving ${section}:`, companyData);
		setEditingSection(null);
		// Save logic would go here
	};

	const handleSaveTeamMember = (memberData: any) => {
		if (editingTeamMember) {
			// Edit existing member
			setTeamMembersData(prev => 
				prev.map(member => 
					member.id === editingTeamMember.id 
						? { ...member, ...memberData }
						: member
				)
			);
			setEditingTeamMember(null);
		} else {
			// Add new member
			const newMember = {
				...memberData,
				id: Math.max(...teamMembersData.map(m => m.id)) + 1,
			};
			setTeamMembersData(prev => [...prev, newMember]);
			setShowAddTeamMember(false);
		}
	};

	const handleSaveLocation = (locationData: any) => {
		if (editingLocation) {
			// Edit existing location
			setOfficesData(prev => 
				prev.map(location => 
					location.id === editingLocation.id 
						? { ...location, ...locationData }
						: location
				)
			);
			setEditingLocation(null);
		} else {
			// Add new location
			const newLocation = {
				...locationData,
				id: Math.max(...officesData.map(l => l.id)) + 1,
			};
			setOfficesData(prev => [...prev, newLocation]);
			setShowAddLocation(false);
		}
	};

	const handleDeleteTeamMember = (id: number) => {
		setTeamMembersData(prev => prev.filter(member => member.id !== id));
	};

	const handleDeleteLocation = (id: number) => {
		setOfficesData(prev => prev.filter(location => location.id !== id));
	};

	const handleSaveValues = (values: string[]) => {
		setCompanyData(prev => ({ ...prev, values }));
		setEditingValues(false);
	};

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-2xl border border-blue-500/20">
							<Building className="h-6 w-6 text-blue-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
							<p className="text-muted-foreground">Manage your company information, team, and locations</p>
						</div>
					</div>
				</div>
			</div>

			<Tabs defaultValue="about" className="space-y-8">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="about" className="flex items-center gap-2">
						<Building className="h-4 w-4" />
						About
					</TabsTrigger>
					<TabsTrigger value="team" className="flex items-center gap-2">
						<Users className="h-4 w-4" />
						Team
					</TabsTrigger>
					<TabsTrigger value="locations" className="flex items-center gap-2">
						<MapPin className="h-4 w-4" />
						Locations
					</TabsTrigger>
				</TabsList>

				<TabsContent value="about" className="space-y-8">
					{/* Company Overview */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<div className="flex justify-between items-center">
								<div>
									<CardTitle className="text-xl flex items-center gap-2">
										<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										Company Overview
									</CardTitle>
									<CardDescription>Basic company information and branding</CardDescription>
								</div>
								<Button variant="outline" size="sm" onClick={() => setEditingSection(editingSection === "overview" ? null : "overview")}>
									<Edit className="h-4 w-4 mr-2" />
									{editingSection === "overview" ? "Cancel" : "Edit"}
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-6">
							{editingSection === "overview" ? (
								<div className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-3">
											<Label htmlFor="name" className="text-sm font-medium">
												Company Name
											</Label>
											<Input
												id="name"
												value={companyData.name}
												onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
												className="h-11"
											/>
										</div>
										<div className="space-y-3">
											<Label htmlFor="tagline" className="text-sm font-medium">
												Tagline
											</Label>
											<Input
												id="tagline"
												value={companyData.tagline}
												onChange={(e) => setCompanyData({ ...companyData, tagline: e.target.value })}
												className="h-11"
											/>
										</div>
									</div>
									<div className="space-y-3">
										<Label htmlFor="description" className="text-sm font-medium">
											Description
										</Label>
										<Textarea
											id="description"
											value={companyData.description}
											onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
											rows={4}
											className="resize-none"
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
										<div className="space-y-3">
											<Label htmlFor="founded" className="text-sm font-medium">
												Founded
											</Label>
											<Input
												id="founded"
												value={companyData.founded}
												onChange={(e) => setCompanyData({ ...companyData, founded: e.target.value })}
												className="h-11"
											/>
										</div>
										<div className="space-y-3">
											<Label htmlFor="employees" className="text-sm font-medium">
												Employees
											</Label>
											<Input
												id="employees"
												value={companyData.employees}
												onChange={(e) => setCompanyData({ ...companyData, employees: e.target.value })}
												className="h-11"
											/>
										</div>
										<div className="space-y-3">
											<Label htmlFor="headquarters" className="text-sm font-medium">
												Headquarters
											</Label>
											<Input
												id="headquarters"
												value={companyData.headquarters}
												onChange={(e) => setCompanyData({ ...companyData, headquarters: e.target.value })}
												className="h-11"
											/>
										</div>
									</div>
									<div className="flex gap-3 pt-4">
										<Button onClick={() => handleSave("overview")} size="lg">
											<Save className="h-4 w-4 mr-2" />
											Save Changes
										</Button>
										<Button variant="outline" onClick={() => setEditingSection(null)} size="lg">
											Cancel
										</Button>
									</div>
								</div>
							) : (
								<div className="space-y-6">
									<div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
										<h3 className="text-2xl font-bold mb-2">{companyData.name}</h3>
										<p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{companyData.tagline}</p>
									</div>
									<div className="prose prose-sm max-w-none">
										<p className="text-muted-foreground leading-relaxed">{companyData.description}</p>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
										<div className="p-4 bg-muted/30 rounded-lg">
											<div className="flex items-center gap-3 mb-2">
												<Calendar className="h-5 w-5 text-blue-600" />
												<span className="font-medium">Founded</span>
											</div>
											<p className="text-muted-foreground">{companyData.founded}</p>
										</div>
										<div className="p-4 bg-muted/30 rounded-lg">
											<div className="flex items-center gap-3 mb-2">
												<Users className="h-5 w-5 text-green-600" />
												<span className="font-medium">Employees</span>
											</div>
											<p className="text-muted-foreground">{companyData.employees}</p>
										</div>
										<div className="p-4 bg-muted/30 rounded-lg">
											<div className="flex items-center gap-3 mb-2">
												<MapPin className="h-5 w-5 text-purple-600" />
												<span className="font-medium">Headquarters</span>
											</div>
											<p className="text-muted-foreground">{companyData.headquarters}</p>
										</div>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Mission & Vision */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<div className="flex justify-between items-center">
								<div>
									<CardTitle className="text-xl flex items-center gap-2">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										Mission & Vision
									</CardTitle>
									<CardDescription>Company purpose and future goals</CardDescription>
								</div>
								<Button variant="outline" size="sm" onClick={() => setEditingSection(editingSection === "mission" ? null : "mission")}>
									<Edit className="h-4 w-4 mr-2" />
									{editingSection === "mission" ? "Cancel" : "Edit"}
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-6">
							{editingSection === "mission" ? (
								<div className="space-y-6">
									<div className="space-y-3">
										<Label htmlFor="mission" className="text-sm font-medium">
											Mission Statement
										</Label>
										<Textarea
											id="mission"
											value={companyData.mission}
											onChange={(e) => setCompanyData({ ...companyData, mission: e.target.value })}
											rows={4}
											className="resize-none"
										/>
									</div>
									<div className="space-y-3">
										<Label htmlFor="vision" className="text-sm font-medium">
											Vision Statement
										</Label>
										<Textarea
											id="vision"
											value={companyData.vision}
											onChange={(e) => setCompanyData({ ...companyData, vision: e.target.value })}
											rows={4}
											className="resize-none"
										/>
									</div>
									<div className="flex gap-3 pt-4">
										<Button onClick={() => handleSave("mission")} size="lg">
											<Save className="h-4 w-4 mr-2" />
											Save Changes
										</Button>
										<Button variant="outline" onClick={() => setEditingSection(null)} size="lg">
											Cancel
										</Button>
									</div>
								</div>
							) : (
								<div className="space-y-6">
									<div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
										<div className="flex items-center gap-3 mb-3">
											<Target className="h-6 w-6 text-green-600" />
											<h4 className="text-lg font-semibold">Mission</h4>
										</div>
										<p className="text-muted-foreground leading-relaxed">{companyData.mission}</p>
									</div>
									<div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
										<div className="flex items-center gap-3 mb-3">
											<Eye className="h-6 w-6 text-purple-600" />
											<h4 className="text-lg font-semibold">Vision</h4>
										</div>
										<p className="text-muted-foreground leading-relaxed">{companyData.vision}</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Company Values */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-4">
							<div className="flex justify-between items-center">
								<div>
									<CardTitle className="text-xl flex items-center gap-2">
										<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
										Company Values
									</CardTitle>
									<CardDescription>Core principles that guide your business</CardDescription>
								</div>
								<Button 
									variant="outline" 
									size="sm"
									onClick={() => setEditingValues(!editingValues)}
								>
									<Edit className="h-4 w-4 mr-2" />
									{editingValues ? "Cancel" : "Edit"}
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							{editingValues ? (
								<CompanyValuesForm
									values={companyData.values}
									onSave={handleSaveValues}
									onCancel={() => setEditingValues(false)}
								/>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{companyData.values.map((value: string, index: number) => (
										<div
											key={value}
											className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg"
										>
											<div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
												<Heart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
											</div>
											<span className="font-medium text-orange-800 dark:text-orange-200">{value}</span>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="team" className="space-y-8">
					<div className="flex justify-between items-center">
						<div>
							<h4 className="text-xl font-semibold">Team Members</h4>
							<p className="text-sm text-muted-foreground">{teamMembersData.length} team members</p>
						</div>
						<Dialog open={showAddTeamMember} onOpenChange={setShowAddTeamMember}>
							<DialogTrigger asChild>
								<Button size="lg">
									<Plus className="h-4 w-4 mr-2" />
									Add Team Member
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-2xl">
								<DialogHeader>
									<DialogTitle>Add Team Member</DialogTitle>
								</DialogHeader>
								<TeamMemberForm
									onSave={handleSaveTeamMember}
									onCancel={() => setShowAddTeamMember(false)}
								/>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{teamMembersData.map((member: any) => (
							<Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
								<CardContent className="p-6 h-full flex flex-col">
									<div className="flex flex-col items-center text-center space-y-4 flex-1">
										<div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
											<Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
										</div>
										<div>
											<h3 className="font-semibold text-lg">{member.name}</h3>
											<p className="text-sm text-muted-foreground font-medium">{member.role}</p>
										</div>
										<p className="text-sm text-center text-muted-foreground leading-relaxed flex-1">{member.bio}</p>
									</div>
									<div className="flex items-center gap-2 w-full pt-4 mt-auto">
										<Dialog open={editingTeamMember?.id === member.id} onOpenChange={(open) => !open && setEditingTeamMember(null)}>
											<DialogTrigger asChild>
												<Button 
													variant="outline" 
													size="sm" 
													className="flex-1"
													onClick={() => setEditingTeamMember(member)}
												>
													<Edit className="h-4 w-4 mr-2" />
													Edit
												</Button>
											</DialogTrigger>
											<DialogContent className="max-w-2xl">
												<DialogHeader>
													<DialogTitle>Edit Team Member</DialogTitle>
												</DialogHeader>
												<TeamMemberForm
													member={editingTeamMember}
													onSave={handleSaveTeamMember}
													onCancel={() => setEditingTeamMember(null)}
												/>
											</DialogContent>
										</Dialog>
										<Button
											variant="outline"
											size="sm"
											className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
											onClick={() => handleDeleteTeamMember(member.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="locations" className="space-y-8">
					<div className="flex justify-between items-center">
						<div>
							<h4 className="text-xl font-semibold">Office Locations</h4>
							<p className="text-sm text-muted-foreground">{officesData.length} locations</p>
						</div>
						<Dialog open={showAddLocation} onOpenChange={setShowAddLocation}>
							<DialogTrigger asChild>
								<Button size="lg">
									<Plus className="h-4 w-4 mr-2" />
									Add Location
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-2xl">
								<DialogHeader>
									<DialogTitle>Add Location</DialogTitle>
								</DialogHeader>
								<LocationForm
									onSave={handleSaveLocation}
									onCancel={() => setShowAddLocation(false)}
								/>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid gap-6">
						{officesData.map((office: any) => (
							<Card key={office.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
								<CardContent className="p-6">
									<div className="flex items-start justify-between">
										<div className="flex gap-6">
											<div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
												<Building className="h-8 w-8 text-purple-600 dark:text-purple-400" />
											</div>
											<div className="space-y-3">
												<div className="flex items-center gap-3">
													<h3 className="font-semibold text-lg">{office.name}</h3>
													{office.isHeadquarters && (
														<Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
															<Star className="h-3 w-3 mr-1" />
															Headquarters
														</Badge>
													)}
												</div>
												<div className="space-y-2 text-sm">
													<div className="flex items-center gap-3 text-muted-foreground">
														<MapPin className="h-4 w-4 text-purple-600" />
														<span>{office.address}</span>
													</div>
													<div className="flex items-center gap-3 text-muted-foreground">
														<Phone className="h-4 w-4 text-green-600" />
														<span>{office.phone}</span>
													</div>
													<div className="flex items-center gap-3 text-muted-foreground">
														<Mail className="h-4 w-4 text-blue-600" />
														<span>{office.email}</span>
													</div>
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Dialog open={editingLocation?.id === office.id} onOpenChange={(open) => !open && setEditingLocation(null)}>
												<DialogTrigger asChild>
													<Button 
														variant="outline" 
														size="sm"
														onClick={() => setEditingLocation(office)}
													>
														<Edit className="h-4 w-4 mr-2" />
														Edit
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-2xl">
													<DialogHeader>
														<DialogTitle>Edit Location</DialogTitle>
													</DialogHeader>
													<LocationForm
														location={editingLocation}
														onSave={handleSaveLocation}
														onCancel={() => setEditingLocation(null)}
													/>
												</DialogContent>
											</Dialog>
											<Button
												variant="outline"
												size="sm"
												className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
												onClick={() => handleDeleteLocation(office.id)}
											>
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
