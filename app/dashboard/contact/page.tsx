import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reply, Archive, Trash2, Download, Search, Filter, Mail, Phone, Calendar, User } from "lucide-react";

// Mock contact submissions data
const contactSubmissions = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@email.com",
		company: "TechCorp Inc.",
		phone: "+1 (555) 123-4567",
		subject: "Web Development Inquiry",
		message:
			"I'm interested in your web development services. Could we schedule a call to discuss our project requirements? We're looking to build a modern e-commerce platform.",
		status: "new",
		priority: "high",
		source: "website",
		submittedAt: "2024-01-20T10:30:00Z",
		tags: ["web-dev", "e-commerce"],
	},
	{
		id: 2,
		name: "Sarah Johnson",
		email: "sarah@growthco.com",
		company: "GrowthCo",
		phone: "+1 (555) 987-6543",
		subject: "Mobile App Development",
		message: "We need a mobile app for our fitness business. Looking for both iOS and Android development with backend integration.",
		status: "replied",
		priority: "medium",
		source: "referral",
		submittedAt: "2024-01-19T14:15:00Z",
		tags: ["mobile-app", "fitness"],
	},
	{
		id: 3,
		name: "Mike Chen",
		email: "mike@startupxyz.com",
		company: "StartupXYZ",
		phone: "+1 (555) 456-7890",
		subject: "Digital Marketing Services",
		message: "Looking for comprehensive digital marketing services including SEO, social media management, and content creation.",
		status: "archived",
		priority: "low",
		source: "social-media",
		submittedAt: "2024-01-18T09:45:00Z",
		tags: ["marketing", "seo"],
	},
	{
		id: 4,
		name: "Emily Davis",
		email: "emily@innovatelab.com",
		company: "InnovateLab",
		phone: "+1 (555) 321-0987",
		subject: "Consulting Services",
		message: "We're looking for technology consulting to help us modernize our legacy systems and improve our development processes.",
		status: "in-progress",
		priority: "high",
		source: "website",
		submittedAt: "2024-01-17T16:20:00Z",
		tags: ["consulting", "legacy-systems"],
	},
	{
		id: 5,
		name: "David Wilson",
		email: "david@retailplus.com",
		company: "RetailPlus",
		phone: "+1 (555) 654-3210",
		subject: "E-commerce Platform",
		message: "Need help building a custom e-commerce platform with inventory management and payment processing integration.",
		status: "new",
		priority: "medium",
		source: "google-ads",
		submittedAt: "2024-01-16T11:10:00Z",
		tags: ["e-commerce", "inventory"],
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "new":
			return "bg-blue-500";
		case "replied":
			return "bg-green-500";
		case "in-progress":
			return "bg-yellow-500";
		case "archived":
			return "bg-gray-500";
		default:
			return "bg-gray-500";
	}
};

const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "high":
			return "text-red-600";
		case "medium":
			return "text-yellow-600";
		case "low":
			return "text-green-600";
		default:
			return "text-gray-600";
	}
};

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInHours = Math.floor(((now as any) - (date as any)) / (1000 * 60 * 60));

	if (diffInHours < 1) return "Just now";
	if (diffInHours < 24) return `${diffInHours} hours ago`;
	if (diffInHours < 48) return "Yesterday";
	return date.toLocaleDateString();
};

export default function ContactPage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Contact Submissions</h3>
					<p className="text-sm text-muted-foreground">
						{contactSubmissions.length} total submissions • {contactSubmissions.filter((c: any) => c.status === "new").length} new •{" "}
						{contactSubmissions.filter((c: any) => c.priority === "high").length} high priority
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
					<Button variant="outline" size="sm">
						<Filter className="h-4 w-4 mr-2" />
						Filter
					</Button>
				</div>
			</div>

			{/* Search and Filter Bar */}
			<Card>
				<CardContent className="p-4">
					<div className="flex gap-4">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search submissions..." className="pl-10" />
						</div>
						<Select defaultValue="all">
							<SelectTrigger className="w-32">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="new">New</SelectItem>
								<SelectItem value="replied">Replied</SelectItem>
								<SelectItem value="in-progress">In Progress</SelectItem>
								<SelectItem value="archived">Archived</SelectItem>
							</SelectContent>
						</Select>
						<Select defaultValue="all">
							<SelectTrigger className="w-32">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Priority</SelectItem>
								<SelectItem value="high">High</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="low">Low</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Contact Submissions List */}
			<div className="space-y-4">
				{contactSubmissions.map((submission: any) => (
					<Card key={submission.id}>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
										<User className="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<div className="flex items-center gap-2 mb-1">
											<CardTitle className="text-base">{submission.name}</CardTitle>
											<Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
											<Badge variant="outline" className={getPriorityColor(submission.priority)}>
												{submission.priority} priority
											</Badge>
										</div>
										<CardDescription className="flex items-center gap-4">
											<span className="flex items-center gap-1">
												<Mail className="h-3 w-3" />
												{submission.email}
											</span>
											{submission.phone && (
												<span className="flex items-center gap-1">
													<Phone className="h-3 w-3" />
													{submission.phone}
												</span>
											)}
											<span>{submission.company}</span>
										</CardDescription>
									</div>
								</div>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Calendar className="h-4 w-4" />
									<span>{formatDate(submission.submittedAt)}</span>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<h4 className="font-medium mb-2">{submission.subject}</h4>
									<p className="text-sm text-muted-foreground line-clamp-3">{submission.message}</p>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="flex flex-wrap gap-1">
											{submission.tags.map((tag: string) => (
												<Badge key={tag} variant="outline" className="text-xs">
													{tag}
												</Badge>
											))}
										</div>
										<Badge variant="outline" className="text-xs">
											{submission.source}
										</Badge>
									</div>

									<div className="flex gap-2">
										<Button size="sm" variant="outline">
											<Reply className="h-4 w-4 mr-2" />
											Reply
										</Button>
										<Button size="sm" variant="outline">
											<Archive className="h-4 w-4 mr-2" />
											Archive
										</Button>
										<Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">45</div>
						<p className="text-sm text-muted-foreground">This Month</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">12</div>
						<p className="text-sm text-muted-foreground">New</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">85%</div>
						<p className="text-sm text-muted-foreground">Response Rate</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">2.4h</div>
						<p className="text-sm text-muted-foreground">Avg Response Time</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
