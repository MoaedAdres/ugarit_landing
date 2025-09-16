"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
	Plus,
	Edit,
	Eye,
	Users,
	Calendar,
	MapPin,
	Briefcase,
	Mail,
	FileText,
	Phone,
	Building,
	Clock,
	TrendingUp,
	UserCheck,
	MessageSquare,
	Download,
	Search,
	Filter,
	MoreHorizontal,
} from "lucide-react";

const jobPostings = [
	{
		id: 1,
		title: "Senior Frontend Developer",
		department: "Engineering",
		location: "Remote",
		type: "Full-time",
		applications: 24,
		status: "Active",
		postedDate: "2024-01-10",
		description: "We are looking for a Senior Frontend Developer to join our engineering team...",
		requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
		salary: "$120,000 - $150,000",
		experience: "Senior",
	},
	{
		id: 2,
		title: "UX Designer",
		department: "Design",
		location: "New York",
		type: "Full-time",
		applications: 18,
		status: "Active",
		postedDate: "2024-01-08",
		description: "Join our design team to create amazing user experiences...",
		requirements: ["3+ years UX design", "Figma expertise", "User research"],
		salary: "$90,000 - $110,000",
		experience: "Mid-level",
	},
	{
		id: 3,
		title: "Marketing Manager",
		department: "Marketing",
		location: "San Francisco",
		type: "Full-time",
		applications: 31,
		status: "Paused",
		postedDate: "2024-01-05",
		description: "Lead our marketing initiatives and drive growth...",
		requirements: ["5+ years marketing", "Digital marketing", "Team management"],
		salary: "$100,000 - $130,000",
		experience: "Senior",
	},
];

const recentApplicants = [
	{
		id: 1,
		name: "Sarah Johnson",
		email: "sarah.j@email.com",
		phone: "+1 (555) 123-4567",
		position: "Senior Frontend Developer",
		appliedDate: "2024-01-15",
		status: "Under Review",
		resumeUrl: "/resumes/sarah-johnson.pdf",
		experience: "6 years",
		skills: ["React", "TypeScript", "Node.js"],
		notes: "Strong portfolio, good cultural fit",
	},
	{
		id: 2,
		name: "Michael Chen",
		email: "m.chen@email.com",
		phone: "+1 (555) 987-6543",
		position: "UX Designer",
		appliedDate: "2024-01-14",
		status: "Interview Scheduled",
		resumeUrl: "/resumes/michael-chen.pdf",
		experience: "4 years",
		skills: ["Figma", "User Research", "Prototyping"],
		notes: "Interview scheduled for next week",
	},
	{
		id: 3,
		name: "Emily Davis",
		email: "emily.davis@email.com",
		phone: "+1 (555) 456-7890",
		position: "Marketing Manager",
		appliedDate: "2024-01-13",
		status: "New",
		resumeUrl: "/resumes/emily-davis.pdf",
		experience: "7 years",
		skills: ["Digital Marketing", "Analytics", "Content Strategy"],
		notes: "Recent application, needs review",
	},
];

// Job Posting Form Component
function JobPostingForm({ job, onSave, onCancel }: { job?: any; onSave: (data: any) => void; onCancel: () => void }) {
	const [formData, setFormData] = useState({
		title: job?.title || "",
		department: job?.department || "",
		location: job?.location || "",
		type: job?.type || "Full-time",
		experience: job?.experience || "Mid-level",
		salary: job?.salary || "",
		description: job?.description || "",
		requirements: job?.requirements || [""],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};

	const addRequirement = () => {
		setFormData({ ...formData, requirements: [...formData.requirements, ""] });
	};

	const removeRequirement = (index: number) => {
		setFormData({
			...formData,
			requirements: formData.requirements.filter((_: any, i: number) => i !== index),
		});
	};

	const updateRequirement = (index: number, value: string) => {
		const newRequirements = [...formData.requirements];
		newRequirements[index] = value;
		setFormData({ ...formData, requirements: newRequirements });
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<Label htmlFor="title" className="text-sm font-medium">
						Job Title
					</Label>
					<Input
						id="title"
						value={formData.title}
						onChange={(e) => setFormData({ ...formData, title: e.target.value })}
						className="h-11"
						required
					/>
				</div>
				<div className="space-y-3">
					<Label htmlFor="department" className="text-sm font-medium">
						Department
					</Label>
					<Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
						<SelectTrigger className="h-11">
							<SelectValue placeholder="Select department" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Engineering">Engineering</SelectItem>
							<SelectItem value="Design">Design</SelectItem>
							<SelectItem value="Marketing">Marketing</SelectItem>
							<SelectItem value="Sales">Sales</SelectItem>
							<SelectItem value="Operations">Operations</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="space-y-3">
					<Label htmlFor="location" className="text-sm font-medium">
						Location
					</Label>
					<Input
						id="location"
						value={formData.location}
						onChange={(e) => setFormData({ ...formData, location: e.target.value })}
						className="h-11"
						required
					/>
				</div>
				<div className="space-y-3">
					<Label htmlFor="type" className="text-sm font-medium">
						Job Type
					</Label>
					<Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
						<SelectTrigger className="h-11">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Full-time">Full-time</SelectItem>
							<SelectItem value="Part-time">Part-time</SelectItem>
							<SelectItem value="Contract">Contract</SelectItem>
							<SelectItem value="Internship">Internship</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-3">
					<Label htmlFor="experience" className="text-sm font-medium">
						Experience Level
					</Label>
					<Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
						<SelectTrigger className="h-11">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Entry-level">Entry-level</SelectItem>
							<SelectItem value="Mid-level">Mid-level</SelectItem>
							<SelectItem value="Senior">Senior</SelectItem>
							<SelectItem value="Lead">Lead</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="space-y-3">
				<Label htmlFor="salary" className="text-sm font-medium">
					Salary Range
				</Label>
				<Input
					id="salary"
					value={formData.salary}
					onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
					className="h-11"
					placeholder="e.g., $80,000 - $120,000"
				/>
			</div>
			<div className="space-y-3">
				<Label htmlFor="description" className="text-sm font-medium">
					Job Description
				</Label>
				<Textarea
					id="description"
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
					rows={4}
					className="resize-none"
					required
				/>
			</div>
			<div className="space-y-3">
				<Label className="text-sm font-medium">Requirements</Label>
				<div className="space-y-3">
					{formData.requirements.map((requirement: any, index: number) => (
						<div key={index} className="flex items-center gap-3">
							<Input
								value={requirement}
								onChange={(e) => updateRequirement(index, e.target.value)}
								placeholder="Enter requirement"
								className="flex-1 h-11"
								required
							/>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => removeRequirement(index)}
								className="text-red-600 hover:text-red-700 hover:bg-red-50"
							>
								Remove
							</Button>
						</div>
					))}
				</div>
				<Button type="button" variant="outline" onClick={addRequirement} className="w-full">
					<Plus className="h-4 w-4 mr-2" />
					Add Requirement
				</Button>
			</div>
			<div className="flex gap-3 pt-4">
				<Button type="submit" size="lg">
					<Edit className="h-4 w-4 mr-2" />
					{job ? "Update Job" : "Create Job"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel} size="lg">
					Cancel
				</Button>
			</div>
		</form>
	);
}

// Applicant Details Component
function ApplicantDetails({ applicant, onClose }: { applicant: any; onClose: () => void }) {
	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-6">
					<div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
						<UserCheck className="h-10 w-10 text-blue-600 dark:text-blue-400" />
					</div>
					<div>
						<h3 className="text-2xl font-semibold">{applicant.name}</h3>
						<p className="text-lg text-muted-foreground">{applicant.position}</p>
						<Badge variant="outline" className="mt-2">
							{applicant.status}
						</Badge>
					</div>
				</div>
				<Button variant="outline" onClick={onClose} size="lg">
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-xl">Contact Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center gap-4">
							<Mail className="h-6 w-6 text-blue-600" />
							<div>
								<p className="font-medium">Email</p>
								<p className="text-muted-foreground">{applicant.email}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Phone className="h-6 w-6 text-green-600" />
							<div>
								<p className="font-medium">Phone</p>
								<p className="text-muted-foreground">{applicant.phone}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Calendar className="h-6 w-6 text-purple-600" />
							<div>
								<p className="font-medium">Applied Date</p>
								<p className="text-muted-foreground">{applicant.appliedDate}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-xl">Experience & Skills</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<Label className="text-base font-medium">Experience</Label>
							<p className="text-lg text-muted-foreground mt-2">{applicant.experience}</p>
						</div>
						<div>
							<Label className="text-base font-medium">Skills</Label>
							<div className="flex flex-wrap gap-2 mt-3">
								{applicant.skills.map((skill: string, index: number) => (
									<Badge key={index} variant="secondary" className="text-sm">
										{skill}
									</Badge>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Notes</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-lg text-muted-foreground leading-relaxed">{applicant.notes}</p>
				</CardContent>
			</Card>

			<div className="flex gap-4">
				<Button className="flex-1 h-12" onClick={() => window.open(applicant.resumeUrl, "_blank")} size="lg">
					<FileText className="h-5 w-5 mr-2" />
					View Resume
				</Button>
				<Button variant="outline" className="flex-1 h-12" onClick={() => {}} size="lg">
					<MessageSquare className="h-5 w-5 mr-2" />
					Contact Candidate
				</Button>
				<Button
					variant="outline"
					className="flex-1 h-12"
					onClick={() => {
						const link = document.createElement("a");
						link.href = applicant.resumeUrl;
						link.download = `${applicant.name}-resume.pdf`;
						link.click();
					}}
					size="lg"
				>
					<Download className="h-5 w-5 mr-2" />
					Download Resume
				</Button>
			</div>
		</div>
	);
}

// Job Applications Component
function JobApplications({ job, applicants, onClose }: { job: any; applicants: any[]; onClose: () => void }) {
	const jobApplicants = applicants.filter((applicant) => applicant.position === job.title);

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-3xl font-semibold">Applications for {job.title}</h3>
					<p className="text-lg text-muted-foreground mt-2">{jobApplicants.length} applications received</p>
				</div>
				<Button variant="outline" onClick={onClose} size="lg">
					Close
				</Button>
			</div>

			{jobApplicants.length === 0 ? (
				<Card className="border-0 shadow-lg">
					<CardContent className="p-12 text-center">
						<Users className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
						<h4 className="text-2xl font-semibold mb-3">No Applications Yet</h4>
						<p className="text-lg text-muted-foreground">This job posting hasn't received any applications yet.</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6">
					{jobApplicants.map((applicant) => (
						<Card key={applicant.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
							<CardContent className="p-8">
								<div className="flex items-start justify-between">
									<div className="flex gap-6">
										<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
											<UserCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
										</div>
										<div className="space-y-4">
											<div className="flex items-center gap-4">
												<h4 className="font-semibold text-xl">{applicant.name}</h4>
												<Badge variant="outline" className="text-sm">
													{applicant.status}
												</Badge>
											</div>
											<div className="flex flex-wrap gap-6 text-base text-muted-foreground">
												<div className="flex items-center gap-3">
													<Mail className="h-5 w-5" />
													<span>{applicant.email}</span>
												</div>
												<div className="flex items-center gap-3">
													<Phone className="h-5 w-5" />
													<span>{applicant.phone}</span>
												</div>
												<div className="flex items-center gap-3">
													<Calendar className="h-5 w-5" />
													<span>Applied {applicant.appliedDate}</span>
												</div>
											</div>
											<div className="flex flex-wrap gap-2">
												{applicant.skills.map((skill: string, index: number) => (
													<Badge key={index} variant="secondary" className="text-sm">
														{skill}
													</Badge>
												))}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Button variant="outline" size="lg" onClick={() => window.open(applicant.resumeUrl, "_blank")}>
											<FileText className="h-4 w-4 mr-2" />
											Resume
										</Button>
										<Button variant="outline" size="lg" onClick={() => {}}>
											<MessageSquare className="h-4 w-4 mr-2" />
											Contact
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}

// Contact Modal Component
function ContactModal({ applicant, onClose }: { applicant: any; onClose: () => void }) {
	const [message, setMessage] = useState("");
	const [subject, setSubject] = useState("");
	const [contactMethod, setContactMethod] = useState("email");

	const handleSendMessage = () => {
		// Here you would implement the actual sending logic
		console.log("Sending message:", { applicant, subject, message, contactMethod });
		alert(`Message sent to ${applicant.name} via ${contactMethod}!`);
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Contact {applicant.name}</h3>
					<p className="text-muted-foreground">Send a message to this candidate</p>
				</div>
				<Button variant="outline" onClick={onClose}>
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Candidate Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-3">
							<Mail className="h-5 w-5 text-blue-600" />
							<span>{applicant.email}</span>
						</div>
						<div className="flex items-center gap-3">
							<Phone className="h-5 w-5 text-green-600" />
							<span>{applicant.phone}</span>
						</div>
						<div className="flex items-center gap-3">
							<Briefcase className="h-5 w-5 text-purple-600" />
							<span>{applicant.position}</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Contact Method</CardTitle>
					</CardHeader>
					<CardContent>
						<Select value={contactMethod} onValueChange={setContactMethod}>
							<SelectTrigger className="h-11">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="email">Email</SelectItem>
								<SelectItem value="phone">Phone Call</SelectItem>
								<SelectItem value="sms">SMS</SelectItem>
							</SelectContent>
						</Select>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Message</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-3">
						<Label htmlFor="subject" className="text-sm font-medium">
							Subject
						</Label>
						<Input
							id="subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							placeholder="Enter message subject"
							className="h-11"
						/>
					</div>
					<div className="space-y-3">
						<Label htmlFor="message" className="text-sm font-medium">
							Message
						</Label>
						<Textarea
							id="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							rows={6}
							className="resize-none"
							placeholder="Enter your message here..."
						/>
					</div>
				</CardContent>
			</Card>

			<div className="flex gap-3">
				<Button onClick={handleSendMessage} size="lg" className="flex-1">
					<MessageSquare className="h-4 w-4 mr-2" />
					Send Message
				</Button>
				<Button variant="outline" onClick={onClose} size="lg">
					Cancel
				</Button>
			</div>
		</div>
	);
}

export function CareersManagement() {
	const [jobsData, setJobsData] = useState(jobPostings);
	const [applicantsData, setApplicantsData] = useState(recentApplicants);
	const [showAddJob, setShowAddJob] = useState(false);
	const [editingJob, setEditingJob] = useState<any>(null);
	const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [selectedJobApplications, setSelectedJobApplications] = useState<any>(null);
	const [showContactModal, setShowContactModal] = useState<any>(null);

	const handleSaveJob = (jobData: any) => {
		if (editingJob) {
			setJobsData((prev) => prev.map((job) => (job.id === editingJob.id ? { ...job, ...jobData, id: editingJob.id } : job)));
			setEditingJob(null);
		} else {
			const newJob = {
				...jobData,
				id: Math.max(...jobsData.map((j) => j.id)) + 1,
				applications: 0,
				status: "Active",
				postedDate: new Date().toISOString().split("T")[0],
			};
			setJobsData((prev) => [...prev, newJob]);
			setShowAddJob(false);
		}
	};

	const filteredJobs = jobsData.filter((job) => {
		const matchesSearch =
			job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.department.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter = selectedFilter === "all" || job.status.toLowerCase() === selectedFilter;
		return matchesSearch && matchesFilter;
	});

	const filteredApplicants = applicantsData.filter((applicant) => {
		return (
			applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			applicant.position.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-emerald-500/20">
							<Briefcase className="h-6 w-6 text-emerald-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Careers Management</h1>
							<p className="text-muted-foreground">Manage job postings, applications, and recruitment</p>
						</div>
					</div>
				</div>
			</div>

			{/* Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<Briefcase className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Active Jobs</p>
								<p className="text-2xl font-bold">{jobsData.filter((j) => j.status === "Active").length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center">
								<Users className="h-6 w-6 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Applications</p>
								<p className="text-2xl font-bold">{applicantsData.length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
								<TrendingUp className="h-6 w-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Avg. Applications</p>
								<p className="text-2xl font-bold">
									{Math.round(jobsData.reduce((acc, job) => acc + job.applications, 0) / jobsData.length)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center">
								<Clock className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Pending Review</p>
								<p className="text-2xl font-bold">
									{applicantsData.filter((a) => a.status === "New" || a.status === "Under Review").length}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="jobs" className="space-y-8">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="jobs" className="flex items-center gap-2">
						<Briefcase className="h-4 w-4" />
						Job Postings
					</TabsTrigger>
					<TabsTrigger value="applicants" className="flex items-center gap-2">
						<Users className="h-4 w-4" />
						Applicants
					</TabsTrigger>
				</TabsList>

				<TabsContent value="jobs" className="space-y-8">
					{/* Search and Filter */}
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 flex-1">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search jobs..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 h-11"
								/>
							</div>
							<Select value={selectedFilter} onValueChange={setSelectedFilter}>
								<SelectTrigger className="w-full sm:w-40 h-11">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="paused">Paused</SelectItem>
									<SelectItem value="closed">Closed</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Dialog open={showAddJob} onOpenChange={setShowAddJob}>
							<DialogTrigger asChild>
								<Button size="lg">
									<Plus className="h-4 w-4 mr-2" />
									New Job Posting
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
								<DialogHeader>
									<DialogTitle>Create New Job Posting</DialogTitle>
								</DialogHeader>
								<JobPostingForm onSave={handleSaveJob} onCancel={() => setShowAddJob(false)} />
							</DialogContent>
						</Dialog>
					</div>

					{/* Jobs Grid */}
					<div className="grid gap-6">
						{filteredJobs.map((job) => (
							<Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
								<CardContent className="p-6">
									<div className="flex items-start justify-between">
										<div className="flex gap-6">
											<div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center">
												<Briefcase className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
											</div>
											<div className="space-y-3">
												<div className="flex items-center gap-3">
													<h3 className="font-semibold text-xl">{job.title}</h3>
													<Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
												</div>
												<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
													<div className="flex items-center gap-2">
														<Building className="h-4 w-4" />
														<span>{job.department}</span>
													</div>
													<div className="flex items-center gap-2">
														<MapPin className="h-4 w-4" />
														<span>{job.location}</span>
													</div>
													<div className="flex items-center gap-2">
														<Clock className="h-4 w-4" />
														<span>{job.type}</span>
													</div>
													<div className="flex items-center gap-2">
														<Users className="h-4 w-4" />
														<span>{job.applications} applications</span>
													</div>
												</div>
												<p className="text-muted-foreground line-clamp-2">{job.description}</p>
												<div className="flex flex-wrap gap-2">
													{job.requirements.slice(0, 3).map((req: string, index: number) => (
														<Badge key={index} variant="outline" className="text-xs">
															{req}
														</Badge>
													))}
													{job.requirements.length > 3 && (
														<Badge variant="outline" className="text-xs">
															+{job.requirements.length - 3} more
														</Badge>
													)}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Dialog open={editingJob?.id === job.id} onOpenChange={(open) => !open && setEditingJob(null)}>
												<DialogTrigger asChild>
													<Button variant="outline" size="sm" onClick={() => setEditingJob(job)}>
														<Edit className="h-4 w-4 mr-2" />
														Edit
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
													<DialogHeader>
														<DialogTitle>Edit Job Posting</DialogTitle>
													</DialogHeader>
													<JobPostingForm job={editingJob} onSave={handleSaveJob} onCancel={() => setEditingJob(null)} />
												</DialogContent>
											</Dialog>
											<Button variant="outline" size="sm" onClick={() => setSelectedJobApplications(job)}>
												<Eye className="h-4 w-4 mr-2" />
												View Applications
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="applicants" className="space-y-8">
					{/* Search */}
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search applicants..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 h-11"
							/>
						</div>
					</div>

					{/* Applicants Grid */}
					<div className="grid gap-6">
						{filteredApplicants.map((applicant) => (
							<Card key={applicant.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
								<CardContent className="p-6">
									<div className="flex items-start justify-between">
										<div className="flex gap-6">
											<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
												<UserCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
											</div>
											<div className="space-y-3">
												<div className="flex items-center gap-3">
													<h3 className="font-semibold text-xl">{applicant.name}</h3>
													<Badge variant="outline">{applicant.status}</Badge>
												</div>
												<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
													<div className="flex items-center gap-2">
														<Mail className="h-4 w-4" />
														<span>{applicant.email}</span>
													</div>
													<div className="flex items-center gap-2">
														<Phone className="h-4 w-4" />
														<span>{applicant.phone}</span>
													</div>
													<div className="flex items-center gap-2">
														<Calendar className="h-4 w-4" />
														<span>Applied {applicant.appliedDate}</span>
													</div>
													<div className="flex items-center gap-2">
														<Clock className="h-4 w-4" />
														<span>{applicant.experience}</span>
													</div>
												</div>
												<p className="text-muted-foreground">{applicant.position}</p>
												<div className="flex flex-wrap gap-2">
													{applicant.skills.map((skill: string, index: number) => (
														<Badge key={index} variant="secondary" className="text-xs">
															{skill}
														</Badge>
													))}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Button variant="outline" size="sm" onClick={() => setSelectedApplicant(applicant)}>
												<Eye className="h-4 w-4 mr-2" />
												View Details
											</Button>
											<Button variant="outline" size="sm" onClick={() => window.open(applicant.resumeUrl, "_blank")}>
												<FileText className="h-4 w-4 mr-2" />
												Resume
											</Button>
											<Button variant="outline" size="sm" onClick={() => setShowContactModal(applicant)}>
												<MessageSquare className="h-4 w-4 mr-2" />
												Contact
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>

			{/* Applicant Details Dialog */}
			<Dialog open={!!selectedApplicant} onOpenChange={() => setSelectedApplicant(null)}>
				<DialogContent className="!max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Applicant Details</DialogTitle>
						</DialogHeader>
						{selectedApplicant && <ApplicantDetails applicant={selectedApplicant} onClose={() => setSelectedApplicant(null)} />}
					</div>
				</DialogContent>
			</Dialog>

			{/* Job Applications Dialog */}
			<Dialog open={!!selectedJobApplications} onOpenChange={() => setSelectedJobApplications(null)}>
				<DialogContent className="!max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Job Applications</DialogTitle>
						</DialogHeader>
						{selectedJobApplications && (
							<JobApplications job={selectedJobApplications} applicants={applicantsData} onClose={() => setSelectedJobApplications(null)} />
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Contact Modal Dialog */}
			<Dialog open={!!showContactModal} onOpenChange={() => setShowContactModal(null)}>
				<DialogContent className="!max-w-4xl max-h-[95vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Contact Candidate</DialogTitle>
					</DialogHeader>
					{showContactModal && <ContactModal applicant={showContactModal} onClose={() => setShowContactModal(null)} />}
				</DialogContent>
			</Dialog>
		</div>
	);
}
