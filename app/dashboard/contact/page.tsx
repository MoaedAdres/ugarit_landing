"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
	Reply, 
	Archive, 
	Trash2, 
	Download, 
	Search, 
	Filter, 
	Mail, 
	Phone, 
	Calendar, 
	User,
	MessageSquare,
	Clock,
	TrendingUp,
	Eye,
	Send,
	Building,
	Tag,
	MoreHorizontal,
	Star,
	AlertCircle,
	CheckCircle,
	XCircle,
	FileText
} from "lucide-react";

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

// Reply Modal Component
function ReplyModal({ 
	submission, 
	onClose 
}: { 
	submission: any; 
	onClose: () => void; 
}) {
	const [replyData, setReplyData] = useState({
		subject: `Re: ${submission.subject}`,
		message: "",
		priority: "normal",
	});

	const handleSendReply = () => {
		// Here you would implement the actual reply sending logic
		console.log("Sending reply:", { submission, replyData });
		alert(`Reply sent to ${submission.name}!`);
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Reply to {submission.name}</h3>
					<p className="text-muted-foreground">{submission.email}</p>
				</div>
				<Button variant="outline" onClick={onClose}>
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Original Message</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium">Subject</Label>
							<p className="text-muted-foreground">{submission.subject}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">Message</Label>
							<p className="text-muted-foreground leading-relaxed">{submission.message}</p>
						</div>
						<div className="flex flex-wrap gap-2">
							{submission.tags.map((tag: string) => (
								<Badge key={tag} variant="secondary" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Contact Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-3">
							<Mail className="h-5 w-5 text-blue-600" />
							<span>{submission.email}</span>
						</div>
						<div className="flex items-center gap-3">
							<Phone className="h-5 w-5 text-green-600" />
							<span>{submission.phone}</span>
						</div>
						<div className="flex items-center gap-3">
							<Building className="h-5 w-5 text-purple-600" />
							<span>{submission.company}</span>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Compose Reply</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-3">
						<Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
						<Input
							id="subject"
							value={replyData.subject}
							onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
							className="h-11"
						/>
					</div>
					<div className="space-y-3">
						<Label htmlFor="message" className="text-sm font-medium">Message</Label>
						<Textarea
							id="message"
							value={replyData.message}
							onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
							rows={6}
							className="resize-none"
							placeholder="Type your reply here..."
						/>
					</div>
					<div className="space-y-3">
						<Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
						<Select value={replyData.priority} onValueChange={(value) => setReplyData({ ...replyData, priority: value })}>
							<SelectTrigger className="h-11">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="low">Low</SelectItem>
								<SelectItem value="normal">Normal</SelectItem>
								<SelectItem value="high">High</SelectItem>
								<SelectItem value="urgent">Urgent</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			<div className="flex gap-3">
				<Button onClick={handleSendReply} size="lg" className="flex-1">
					<Send className="h-4 w-4 mr-2" />
					Send Reply
				</Button>
				<Button variant="outline" onClick={onClose} size="lg">
					Cancel
				</Button>
			</div>
		</div>
	);
}

// Contact Details Modal Component
function ContactDetailsModal({ 
	submission, 
	onClose 
}: { 
	submission: any; 
	onClose: () => void; 
}) {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
						<User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
					</div>
					<div>
						<h3 className="text-2xl font-semibold">{submission.name}</h3>
						<p className="text-lg text-muted-foreground">{submission.company}</p>
						<div className="flex items-center gap-2 mt-2">
							<Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
							<Badge variant="outline" className={getPriorityColor(submission.priority)}>
								{submission.priority} priority
							</Badge>
						</div>
					</div>
				</div>
				<Button variant="outline" onClick={onClose} size="lg">
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-xl">Message Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<Label className="text-base font-medium">Subject</Label>
							<p className="text-lg text-muted-foreground mt-2">{submission.subject}</p>
						</div>
						<div>
							<Label className="text-base font-medium">Message</Label>
							<p className="text-muted-foreground leading-relaxed mt-2">{submission.message}</p>
						</div>
						<div>
							<Label className="text-base font-medium">Tags</Label>
							<div className="flex flex-wrap gap-2 mt-2">
								{submission.tags.map((tag: string) => (
									<Badge key={tag} variant="secondary" className="text-sm">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-xl">Contact Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center gap-4">
							<Mail className="h-6 w-6 text-blue-600" />
							<div>
								<p className="font-medium">Email</p>
								<p className="text-muted-foreground">{submission.email}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Phone className="h-6 w-6 text-green-600" />
							<div>
								<p className="font-medium">Phone</p>
								<p className="text-muted-foreground">{submission.phone}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Building className="h-6 w-6 text-purple-600" />
							<div>
								<p className="font-medium">Company</p>
								<p className="text-muted-foreground">{submission.company}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Calendar className="h-6 w-6 text-orange-600" />
							<div>
								<p className="font-medium">Submitted</p>
								<p className="text-muted-foreground">{formatDate(submission.submittedAt)}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Tag className="h-6 w-6 text-cyan-600" />
							<div>
								<p className="font-medium">Source</p>
								<p className="text-muted-foreground capitalize">{submission.source}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex gap-4">
				<Button size="lg" className="flex-1">
					<Reply className="h-5 w-5 mr-2" />
					Reply
				</Button>
				<Button variant="outline" size="lg" className="flex-1">
					<Archive className="h-5 w-5 mr-2" />
					Archive
				</Button>
				<Button variant="outline" size="lg" className="flex-1">
					<FileText className="h-5 w-5 mr-2" />
					Export
				</Button>
			</div>
		</div>
	);
}

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
	const [submissionsData, setSubmissionsData] = useState(contactSubmissions);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");
	const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
	const [showReplyModal, setShowReplyModal] = useState<any>(null);

	const filteredSubmissions = submissionsData.filter((submission) => {
		const matchesSearch = 
			submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			submission.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
			submission.company.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
		const matchesPriority = priorityFilter === "all" || submission.priority === priorityFilter;
		
		return matchesSearch && matchesStatus && matchesPriority;
	});

	const handleArchive = (id: number) => {
		setSubmissionsData(prev => 
			prev.map(submission => 
				submission.id === id 
					? { ...submission, status: "archived" }
					: submission
			)
		);
	};

	const handleDelete = (id: number) => {
		setSubmissionsData(prev => prev.filter(submission => submission.id !== id));
	};

	const handleExport = () => {
		// Here you would implement the actual export logic
		alert("Exporting contact submissions...");
	};

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-2xl border border-cyan-500/20">
							<MessageSquare className="h-6 w-6 text-cyan-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Contact Management</h1>
							<p className="text-muted-foreground">Manage customer inquiries and communications</p>
						</div>
					</div>
				</div>
			</div>

			{/* Enhanced Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<MessageSquare className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Submissions</p>
								<p className="text-2xl font-bold">{submissionsData.length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center">
								<CheckCircle className="h-6 w-6 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">New Messages</p>
								<p className="text-2xl font-bold">{submissionsData.filter(s => s.status === "new").length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center">
								<AlertCircle className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">High Priority</p>
								<p className="text-2xl font-bold">{submissionsData.filter(s => s.priority === "high").length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
								<Clock className="h-6 w-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Avg Response</p>
								<p className="text-2xl font-bold">2.4h</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Search and Filter */}
			<Card className="border-0 shadow-lg">
				<CardContent className="p-6">
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 flex-1">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search submissions..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 h-11"
								/>
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-full sm:w-40 h-11">
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
							<Select value={priorityFilter} onValueChange={setPriorityFilter}>
								<SelectTrigger className="w-full sm:w-40 h-11">
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
						<div className="flex gap-3">
							<Button variant="outline" onClick={handleExport} size="lg">
								<Download className="h-4 w-4 mr-2" />
								Export
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Contact Submissions List */}
			<div className="grid gap-6">
				{filteredSubmissions.map((submission) => (
					<Card key={submission.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
						<CardContent className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex gap-6">
									<div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center">
										<User className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
									</div>
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<h3 className="font-semibold text-xl">{submission.name}</h3>
											<Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
											<Badge variant="outline" className={getPriorityColor(submission.priority)}>
												{submission.priority} priority
											</Badge>
										</div>
										<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<Mail className="h-4 w-4" />
												<span>{submission.email}</span>
											</div>
											<div className="flex items-center gap-2">
												<Phone className="h-4 w-4" />
												<span>{submission.phone}</span>
											</div>
											<div className="flex items-center gap-2">
												<Building className="h-4 w-4" />
												<span>{submission.company}</span>
											</div>
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4" />
												<span>{formatDate(submission.submittedAt)}</span>
											</div>
										</div>
										<div>
											<h4 className="font-medium text-lg mb-2">{submission.subject}</h4>
											<p className="text-muted-foreground line-clamp-2">{submission.message}</p>
										</div>
										<div className="flex flex-wrap gap-2">
											{submission.tags.map((tag: string) => (
												<Badge key={tag} variant="outline" className="text-xs">
													{tag}
												</Badge>
											))}
											<Badge variant="secondary" className="text-xs">
												{submission.source}
											</Badge>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button 
										variant="outline" 
										size="sm"
										onClick={() => setSelectedSubmission(submission)}
									>
										<Eye className="h-4 w-4 mr-2" />
										View
									</Button>
									<Button 
										variant="outline" 
										size="sm"
										onClick={() => setShowReplyModal(submission)}
									>
										<Reply className="h-4 w-4 mr-2" />
										Reply
									</Button>
									<Button 
										variant="outline" 
										size="sm"
										onClick={() => handleArchive(submission.id)}
									>
										<Archive className="h-4 w-4 mr-2" />
										Archive
									</Button>
									<Button 
										variant="outline" 
										size="sm"
										onClick={() => handleDelete(submission.id)}
										className="text-red-600 hover:text-red-700 hover:bg-red-50"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Contact Details Modal */}
			<Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Contact Details</DialogTitle>
						</DialogHeader>
						{selectedSubmission && (
							<ContactDetailsModal
								submission={selectedSubmission}
								onClose={() => setSelectedSubmission(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Reply Modal */}
			<Dialog open={!!showReplyModal} onOpenChange={() => setShowReplyModal(null)}>
				<DialogContent className="!max-w-5xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Reply to Contact</DialogTitle>
						</DialogHeader>
						{showReplyModal && (
							<ReplyModal
								submission={showReplyModal}
								onClose={() => setShowReplyModal(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
