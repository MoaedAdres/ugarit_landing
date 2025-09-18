"use client";

import { useState } from "react";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import RTooltip from "@/RComponents/RTooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { myIcons } from "@/constants/icons";

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
			<RFlex className="gap-3 pt-4">
				<RButton
					type="submit"
					size="lg"
					icon={<i className={`${myIcons.save} h-4 w-4`} />}
					text={member ? "Update Member" : "Add Member"}
				/>
				<RButton
					type="button"
					variant="outline"
					onClick={onCancel}
					size="lg"
					text="Cancel"
				/>
			</RFlex>
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
			<RFlex className="gap-3 pt-4">
				<RButton
					type="submit"
					size="lg"
					icon={<i className={`${myIcons.save} h-4 w-4`} />}
					text={location ? "Update Location" : "Add Location"}
				/>
				<RButton
					type="button"
					variant="outline"
					onClick={onCancel}
					size="lg"
					text="Cancel"
				/>
			</RFlex>
		</form>
	);
}

export default function CompanyManagement() {
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

	return (
		<div className="space-y-8">
			{/* Header */}
			<RFlex className="items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Company Management</h1>
					<p className="text-muted-foreground">Manage your company information, team, and locations</p>
				</div>
			</RFlex>

			{/* Main Content */}
			<Tabs defaultValue="company" className="space-y-8">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="company" className="flex items-center gap-2">
						<i className={`${myIcons.building} h-4 w-4`} />
						Company Info
					</TabsTrigger>
					<TabsTrigger value="team" className="flex items-center gap-2">
						<i className={`${myIcons.users} h-4 w-4`} />
						Team Members
					</TabsTrigger>
					<TabsTrigger value="locations" className="flex items-center gap-2">
						<i className={`${myIcons.mapPin} h-4 w-4`} />
						Locations
					</TabsTrigger>
				</TabsList>

				<TabsContent value="company" className="space-y-8">
					{/* Company Overview */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-primary rounded-full"></div>
								Company Overview
							</RFlex>
						}
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
						contentComponent={
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-3">
										<Label htmlFor="name" className="text-sm font-medium">Company Name</Label>
										<Input
											id="name"
											value={companyData.name}
											onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
											className="h-11"
										/>
									</div>
									<div className="space-y-3">
										<Label htmlFor="tagline" className="text-sm font-medium">Tagline</Label>
										<Input
											id="tagline"
											value={companyData.tagline}
											onChange={(e) => setCompanyData({ ...companyData, tagline: e.target.value })}
											className="h-11"
										/>
									</div>
								</div>
								<div className="space-y-3">
									<Label htmlFor="description" className="text-sm font-medium">Description</Label>
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
										<Label htmlFor="founded" className="text-sm font-medium">Founded</Label>
										<Input
											id="founded"
											value={companyData.founded}
											onChange={(e) => setCompanyData({ ...companyData, founded: e.target.value })}
											className="h-11"
										/>
									</div>
									<div className="space-y-3">
										<Label htmlFor="employees" className="text-sm font-medium">Employees</Label>
										<Input
											id="employees"
											value={companyData.employees}
											onChange={(e) => setCompanyData({ ...companyData, employees: e.target.value })}
											className="h-11"
										/>
									</div>
									<div className="space-y-3">
										<Label htmlFor="headquarters" className="text-sm font-medium">Headquarters</Label>
										<Input
											id="headquarters"
											value={companyData.headquarters}
											onChange={(e) => setCompanyData({ ...companyData, headquarters: e.target.value })}
											className="h-11"
										/>
									</div>
								</div>
							</div>
						}
					/>

					{/* Mission & Vision */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Mission & Vision
							</RFlex>
						}
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-6">
								<div className="space-y-3">
									<Label htmlFor="mission" className="text-sm font-medium">Mission</Label>
									<Textarea
										id="mission"
										value={companyData.mission}
										onChange={(e) => setCompanyData({ ...companyData, mission: e.target.value })}
										rows={3}
										className="resize-none"
									/>
								</div>
								<div className="space-y-3">
									<Label htmlFor="vision" className="text-sm font-medium">Vision</Label>
									<Textarea
										id="vision"
										value={companyData.vision}
										onChange={(e) => setCompanyData({ ...companyData, vision: e.target.value })}
										rows={3}
										className="resize-none"
									/>
								</div>
							</div>
						}
					/>

					{/* Company Values */}
					<RCard
						title={
							<RFlex className="items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Company Values
							</RFlex>
						}
						cardClassName="border-0 shadow-lg"
						contentComponent={
							<div className="space-y-4">
								<RFlex className="flex-wrap gap-3">
									{companyData.values.map((value: string, index: number) => (
										<Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
											{value}
											<i className={`${myIcons.xmark} h-3 w-3 cursor-pointer hover:text-red-500 transition-colors`} onClick={() => {
												setCompanyData({
													...companyData,
													values: companyData.values.filter((_, i) => i !== index)
												});
											}} />
										</Badge>
									))}
								</RFlex>
								<RFlex className="gap-3">
									<Input
										placeholder="Add new value"
										onKeyPress={(e: any) => {
											if (e.key === "Enter" && e.target.value.trim()) {
												setCompanyData({
													...companyData,
													values: [...companyData.values, e.target.value.trim()]
												});
												e.target.value = "";
											}
										}}
										className="h-11"
									/>
									<RButton
										size="lg"
										className="px-6"
										icon={<i className={`${myIcons.plus} h-4 w-4`} />}
										text="Add"
										onClick={() => {
											const input = document.querySelector('input[placeholder="Add new value"]') as HTMLInputElement;
											if (input && input.value.trim()) {
												setCompanyData({
													...companyData,
													values: [...companyData.values, input.value.trim()]
												});
												input.value = "";
											}
										}}
									/>
								</RFlex>
							</div>
						}
					/>
				</TabsContent>

				<TabsContent value="team" className="space-y-8">
					<RFlex className="justify-between items-center">
						<div>
							<h4 className="text-xl font-semibold">Team Members</h4>
							<p className="text-sm text-muted-foreground">{teamMembersData.length} members</p>
						</div>
						<Dialog open={showAddTeamMember} onOpenChange={setShowAddTeamMember}>
							<DialogTrigger asChild>
								<RButton
									size="lg"
									icon={<i className={`${myIcons.plus} h-4 w-4`} />}
									text="Add Member"
								/>
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
					</RFlex>

					<div className="grid gap-6">
						{teamMembersData.map((member: any) => (
							<RCard
								key={member.id}
								cardClassName="border-0 shadow-lg hover:shadow-xl transition-shadow"
								contentComponent={
									<div className="p-6">
										<RFlex className="items-start justify-between">
											<RFlex className="gap-6">
												<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
													<i className={`${myIcons.user} h-8 w-8 text-blue-600 dark:text-blue-400`} />
												</div>
												<div className="space-y-3">
													<div>
														<h3 className="font-semibold text-lg">{member.name}</h3>
														<p className="text-sm text-muted-foreground">{member.role}</p>
													</div>
													<RParagraphTruncated
														paragraph={member.bio}
														numOfChars={100}
														typographyStyles="text-sm text-muted-foreground"
													/>
													<RFlex className="gap-4 text-sm">
														<RFlex className="items-center gap-2 text-muted-foreground">
															<i className={`${myIcons.envelope} h-4 w-4`} />
															<span>{member.email}</span>
														</RFlex>
														{member.linkedin && (
															<RFlex className="items-center gap-2 text-muted-foreground">
																<i className={`${myIcons.linkedin} h-4 w-4`} />
																<a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
																	LinkedIn
																</a>
															</RFlex>
														)}
													</RFlex>
												</div>
											</RFlex>
											<RFlex className="items-center gap-2">
												<Dialog open={editingTeamMember?.id === member.id} onOpenChange={(open) => !open && setEditingTeamMember(null)}>
													<DialogTrigger asChild>
														<RTooltip
															triggerComponent={
																<RButton
																	variant="outline"
																	size="sm"
																	onClick={() => setEditingTeamMember(member)}
																	icon={<i className={`${myIcons.edit} h-4 w-4`} />}
																/>
															}
															tooltipText="Edit Member"
														/>
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
												<RTooltip
													triggerComponent={
														<RButton
															variant="outline"
															size="sm"
															className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
															onClick={() => handleDeleteTeamMember(member.id)}
															icon={<i className={`${myIcons.delete} h-4 w-4`} />}
														/>
													}
													tooltipText="Delete Member"
												/>
											</RFlex>
										</RFlex>
									</div>
								}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="locations" className="space-y-8">
					<RFlex className="justify-between items-center">
						<div>
							<h4 className="text-xl font-semibold">Office Locations</h4>
							<p className="text-sm text-muted-foreground">{officesData.length} locations</p>
						</div>
						<Dialog open={showAddLocation} onOpenChange={setShowAddLocation}>
							<DialogTrigger asChild>
								<RButton
									size="lg"
									icon={<i className={`${myIcons.plus} h-4 w-4`} />}
									text="Add Location"
								/>
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
					</RFlex>

					<div className="grid gap-6">
						{officesData.map((office: any) => (
							<RCard
								key={office.id}
								cardClassName="border-0 shadow-lg hover:shadow-xl transition-shadow"
								contentComponent={
									<div className="p-6">
										<RFlex className="items-start justify-between">
											<RFlex className="gap-6">
												<div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
													<i className={`${myIcons.building} h-8 w-8 text-purple-600 dark:text-purple-400`} />
												</div>
												<div className="space-y-3">
													<RFlex className="items-center gap-3">
														<h3 className="font-semibold text-lg">{office.name}</h3>
														{office.isHeadquarters && (
															<Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
																<i className={`${myIcons.star} h-3 w-3 mr-1`} />
																Headquarters
															</Badge>
														)}
													</RFlex>
													<div className="space-y-2 text-sm">
														<RFlex className="items-center gap-3 text-muted-foreground">
															<i className={`${myIcons.mapPin} h-4 w-4 text-purple-600`} />
															<span>{office.address}</span>
														</RFlex>
														<RFlex className="items-center gap-3 text-muted-foreground">
															<i className={`${myIcons.phone} h-4 w-4 text-green-600`} />
															<span>{office.phone}</span>
														</RFlex>
														<RFlex className="items-center gap-3 text-muted-foreground">
															<i className={`${myIcons.envelope} h-4 w-4 text-blue-600`} />
															<span>{office.email}</span>
														</RFlex>
													</div>
												</div>
											</RFlex>
											<RFlex className="items-center gap-2">
												<Dialog open={editingLocation?.id === office.id} onOpenChange={(open) => !open && setEditingLocation(null)}>
													<DialogTrigger asChild>
														<RTooltip
															triggerComponent={
																<RButton
																	variant="outline"
																	size="sm"
																	onClick={() => setEditingLocation(office)}
																	icon={<i className={`${myIcons.edit} h-4 w-4`} />}
																/>
															}
															tooltipText="Edit Location"
														/>
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
												<RTooltip
													triggerComponent={
														<RButton
															variant="outline"
															size="sm"
															className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
															onClick={() => handleDeleteLocation(office.id)}
															icon={<i className={`${myIcons.delete} h-4 w-4`} />}
														/>
													}
													tooltipText="Delete Location"
												/>
											</RFlex>
										</RFlex>
									</div>
								}
							/>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
