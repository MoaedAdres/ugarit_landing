"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
	},
];

const recentApplicants = [
	{
		id: 1,
		name: "Sarah Johnson",
		email: "sarah.j@email.com",
		position: "Senior Frontend Developer",
		appliedDate: "2024-01-15",
		status: "Under Review",
	},
	{
		id: 2,
		name: "Michael Chen",
		email: "m.chen@email.com",
		position: "UX Designer",
		appliedDate: "2024-01-14",
		status: "Interview Scheduled",
	},
	{
		id: 3,
		name: "Emily Davis",
		email: "emily.davis@email.com",
		position: "Marketing Manager",
		appliedDate: "2024-01-13",
		status: "New",
	},
];

export function CareersManagement() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Careers Management</h2>
					<p className="text-muted-foreground">Manage job postings and applications</p>
				</div>
				<Button>
					<i className="fas fa-plus mr-2 h-4 w-4" />
					New Job Posting
				</Button>
			</div>

			<Tabs defaultValue="jobs" className="space-y-4">
				<TabsList>
					<TabsTrigger value="jobs">Job Postings</TabsTrigger>
					<TabsTrigger value="applicants">Applicants</TabsTrigger>
				</TabsList>

				<TabsContent value="jobs" className="space-y-4">
					<div className="grid gap-4">
						{jobPostings.map((job) => (
							<Card key={job.id}>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle>{job.title}</CardTitle>
											<CardDescription>
												{job.department} • {job.location} • {job.type}
											</CardDescription>
										</div>
										<Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex justify-between items-center">
										<div className="flex gap-4 text-sm text-muted-foreground">
											<span>
												<i className="fas fa-users mr-1" />
												{job.applications} applications
											</span>
											<span>
												<i className="fas fa-calendar mr-1" />
												Posted {job.postedDate}
											</span>
										</div>
										<div className="flex gap-2">
											<Button size="sm" variant="outline">
												<i className="fas fa-edit mr-2 h-4 w-4" />
												Edit
											</Button>
											<Button size="sm" variant="outline">
												<i className="fas fa-users mr-2 h-4 w-4" />
												View Applications
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="applicants" className="space-y-4">
					<div className="grid gap-4">
						{recentApplicants.map((applicant) => (
							<Card key={applicant.id}>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="text-lg">{applicant.name}</CardTitle>
											<CardDescription>
												{applicant.email} • Applied for {applicant.position}
											</CardDescription>
										</div>
										<Badge variant="outline">{applicant.status}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Applied on {applicant.appliedDate}</span>
										<div className="flex gap-2">
											<Button size="sm" variant="outline">
												<i className="fas fa-file-alt mr-2 h-4 w-4" />
												View Resume
											</Button>
											<Button size="sm" variant="outline">
												<i className="fas fa-envelope mr-2 h-4 w-4" />
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
		</div>
	);
}
