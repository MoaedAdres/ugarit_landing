"use client";

import { useState } from "react";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import RTooltip from "@/RComponents/RTooltip";
import RSelect from "@/RComponents/RSelect";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { myIcons } from "@/constants/icons";

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
			<RFlex className="items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Reply to {submission.name}</h3>
					<p className="text-muted-foreground">{submission.email}</p>
				</div>
				<RButton variant="outline" onClick={onClose} text="Close" />
			</RFlex>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<RCard
					title="Original Message"
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<div className="space-y-4">
							<div>
								<Label className="text-sm font-medium">Subject</Label>
								<p className="text-muted-foreground">{submission.subject}</p>
							</div>
							<div>
								<Label className="text-sm font-medium">Message</Label>
								<RParagraphTruncated
									paragraph={submission.message}
									numOfChars={200}
									typographyStyles="text-muted-foreground leading-relaxed"
								/>
							</div>
							<RFlex className="flex-wrap gap-2">
								{submission.tags.map((tag: string) => (
									<Badge key={tag} variant="secondary" className="text-xs">
										{tag}
									</Badge>
								))}
							</RFlex>
						</div>
					}
				/>

				<RCard
					title="Contact Information"
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<div className="space-y-4">
							<RFlex className="items-center gap-3">
								<i className={`${myIcons.envelope} h-5 w-5 text-blue-600`} />
								<span>{submission.email}</span>
							</RFlex>
							<RFlex className="items-center gap-3">
								<i className={`${myIcons.phone} h-5 w-5 text-green-600`} />
								<span>{submission.phone}</span>
							</RFlex>
							<RFlex className="items-center gap-3">
								<i className={`${myIcons.building} h-5 w-5 text-purple-600`} />
								<span>{submission.company}</span>
							</RFlex>
						</div>
					}
				/>
			</div>

			<RCard
				title="Compose Reply"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
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
						<RFlex className="gap-3 pt-4">
							<RButton
								onClick={handleSendReply}
								size="lg"
								icon={<i className={`${myIcons.send} h-4 w-4`} />}
								text="Send Reply"
							/>
							<RButton
								variant="outline"
								onClick={onClose}
								size="lg"
								text="Cancel"
							/>
						</RFlex>
					</div>
				}
			/>
		</div>
	);
}

export default function ContactManagement() {
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

	const getStatusColor = (status: string) => {
		switch (status) {
			case "new": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
			case "replied": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
			case "in-progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
			case "archived": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
			default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
			case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
			case "low": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
			default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
		}
	};

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<RFlex className="items-start justify-between">
				<div className="space-y-2">
					<RFlex className="items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-2xl border border-cyan-500/20">
							<i className={`${myIcons.messageSquare} h-6 w-6 text-cyan-600`} />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Contact Management</h1>
							<p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
						</div>
					</RFlex>
				</div>
				<RButton
					onClick={handleExport}
					variant="outline"
					size="lg"
					icon={<i className={`${myIcons.download} h-4 w-4`} />}
					text="Export"
				/>
			</RFlex>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<RCard
					cardClassName="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10"
					contentComponent={
						<div className="p-6">
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Submissions</p>
									<p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{submissionsData.length}</p>
								</div>
								<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
									<i className={`${myIcons.messageSquare} h-6 w-6 text-blue-600 dark:text-blue-400`} />
								</div>
							</RFlex>
						</div>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10"
					contentComponent={
						<div className="p-6">
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm font-medium text-green-600 dark:text-green-400">New Messages</p>
									<p className="text-2xl font-bold text-green-900 dark:text-green-100">
										{submissionsData.filter(s => s.status === "new").length}
									</p>
								</div>
								<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
									<i className={`${myIcons.clock} h-6 w-6 text-green-600 dark:text-green-400`} />
								</div>
							</RFlex>
						</div>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10"
					contentComponent={
						<div className="p-6">
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">In Progress</p>
									<p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
										{submissionsData.filter(s => s.status === "in-progress").length}
									</p>
								</div>
								<div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
									<i className={`${myIcons.trendingUp} h-6 w-6 text-yellow-600 dark:text-yellow-400`} />
								</div>
							</RFlex>
						</div>
					}
				/>

				<RCard
					cardClassName="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10"
					contentComponent={
						<div className="p-6">
							<RFlex className="items-center justify-between">
								<div>
									<p className="text-sm font-medium text-purple-600 dark:text-purple-400">Replied</p>
									<p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
										{submissionsData.filter(s => s.status === "replied").length}
									</p>
								</div>
								<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
									<i className={`${myIcons.checkCircle} h-6 w-6 text-purple-600 dark:text-purple-400`} />
								</div>
							</RFlex>
						</div>
					}
				/>
			</div>

			{/* Filters and Search */}
			<RCard
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="p-6">
						<RFlex className="items-center justify-between gap-4">
							<RFlex className="items-center gap-4 flex-1">
								<div className="relative flex-1 max-w-md">
									<i className={`${myIcons.search} absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
									<Input
										type="text"
										placeholder="Search submissions..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="pl-10 h-11"
									/>
								</div>
								<RSelect
									value={statusFilter}
									handleChange={(value: string) => setStatusFilter(value)}
									placeholder="All Status"
									options={[
										{ value: "all", label: "All Status" },
										{ value: "new", label: "New" },
										{ value: "replied", label: "Replied" },
										{ value: "in-progress", label: "In Progress" },
										{ value: "archived", label: "Archived" }
									]}
									triggerClassName="h-11 min-w-[140px]"
								/>
								<RSelect
									value={priorityFilter}
									handleChange={(value: string) => setPriorityFilter(value)}
									placeholder="All Priority"
									options={[
										{ value: "all", label: "All Priority" },
										{ value: "high", label: "High" },
										{ value: "medium", label: "Medium" },
										{ value: "low", label: "Low" }
									]}
									triggerClassName="h-11 min-w-[140px]"
								/>
							</RFlex>
							<RFlex className="items-center gap-2 text-sm text-muted-foreground">
								<span>{filteredSubmissions.length} of {submissionsData.length} submissions</span>
							</RFlex>
						</RFlex>
					</div>
				}
			/>

			{/* Submissions List */}
			<div className="space-y-4">
				{filteredSubmissions.map((submission) => (
					<RCard
						key={submission.id}
						cardClassName="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-start justify-between">
									<RFlex className="gap-6 flex-1">
										<div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center">
											<i className={`${myIcons.user} h-6 w-6 text-cyan-600 dark:text-cyan-400`} />
										</div>
										<div className="space-y-3 flex-1">
											<RFlex className="items-start justify-between">
												<div>
													<h3 className="font-semibold text-lg">{submission.name}</h3>
													<p className="text-sm text-muted-foreground">{submission.company}</p>
												</div>
												<RFlex className="items-center gap-2">
													<Badge className={`text-xs font-medium ${getStatusColor(submission.status)}`}>
														{submission.status.replace("-", " ")}
													</Badge>
													<Badge className={`text-xs font-medium ${getPriorityColor(submission.priority)}`}>
														{submission.priority}
													</Badge>
												</RFlex>
											</RFlex>
											<div>
												<h4 className="font-medium text-base mb-2">{submission.subject}</h4>
												<RParagraphTruncated
													paragraph={submission.message}
													numOfChars={150}
													typographyStyles="text-muted-foreground leading-relaxed"
												/>
											</div>
											<RFlex className="items-center gap-6 text-sm text-muted-foreground">
												<RFlex className="items-center gap-2">
													<i className={`${myIcons.envelope} h-4 w-4`} />
													<span>{submission.email}</span>
												</RFlex>
												<RFlex className="items-center gap-2">
													<i className={`${myIcons.phone} h-4 w-4`} />
													<span>{submission.phone}</span>
												</RFlex>
												<RFlex className="items-center gap-2">
													<i className={`${myIcons.calendar} h-4 w-4`} />
													<span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
												</RFlex>
											</RFlex>
											<RFlex className="flex-wrap gap-2">
												{submission.tags.map((tag: string) => (
													<Badge key={tag} variant="secondary" className="text-xs">
														{tag}
													</Badge>
												))}
											</RFlex>
										</div>
									</RFlex>
									<RFlex className="items-center gap-2">
										<RTooltip
											triggerComponent={
												<RButton
													variant="outline"
													size="sm"
													onClick={() => setShowReplyModal(submission)}
													icon={<i className={`${myIcons.reply} h-4 w-4`} />}
												/>
											}
											tooltipText="Reply"
										/>
										<RTooltip
											triggerComponent={
												<RButton
													variant="outline"
													size="sm"
													onClick={() => setSelectedSubmission(submission)}
													icon={<i className={`${myIcons.eye} h-4 w-4`} />}
												/>
											}
											tooltipText="View Details"
										/>
										<RTooltip
											triggerComponent={
												<RButton
													variant="outline"
													size="sm"
													onClick={() => handleArchive(submission.id)}
													icon={<i className={`${myIcons.archive} h-4 w-4`} />}
												/>
											}
											tooltipText="Archive"
										/>
										<RTooltip
											triggerComponent={
												<RButton
													variant="outline"
													size="sm"
													className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
													onClick={() => handleDelete(submission.id)}
													icon={<i className={`${myIcons.delete} h-4 w-4`} />}
												/>
											}
											tooltipText="Delete"
										/>
									</RFlex>
								</RFlex>
							</div>
						}
					/>
				))}
			</div>

			{/* Reply Modal */}
			<Dialog open={!!showReplyModal} onOpenChange={() => setShowReplyModal(null)}>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Reply to Contact</DialogTitle>
					</DialogHeader>
					{showReplyModal && <ReplyModal submission={showReplyModal} onClose={() => setShowReplyModal(null)} />}
				</DialogContent>
			</Dialog>

			{/* View Details Modal */}
			<Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Contact Details</DialogTitle>
					</DialogHeader>
					{selectedSubmission && (
						<div className="space-y-6">
							<RCard
								title="Contact Information"
								cardClassName="border-0 shadow-lg"
								contentComponent={
									<div className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<Label className="text-sm font-medium">Name</Label>
												<p className="text-muted-foreground">{selectedSubmission.name}</p>
											</div>
											<div>
												<Label className="text-sm font-medium">Company</Label>
												<p className="text-muted-foreground">{selectedSubmission.company}</p>
											</div>
											<div>
												<Label className="text-sm font-medium">Email</Label>
												<p className="text-muted-foreground">{selectedSubmission.email}</p>
											</div>
											<div>
												<Label className="text-sm font-medium">Phone</Label>
												<p className="text-muted-foreground">{selectedSubmission.phone}</p>
											</div>
										</div>
									</div>
								}
							/>
							<RCard
								title="Message Details"
								cardClassName="border-0 shadow-lg"
								contentComponent={
									<div className="space-y-4">
										<div>
											<Label className="text-sm font-medium">Subject</Label>
											<p className="text-muted-foreground">{selectedSubmission.subject}</p>
										</div>
										<div>
											<Label className="text-sm font-medium">Message</Label>
											<p className="text-muted-foreground leading-relaxed">{selectedSubmission.message}</p>
										</div>
										<div className="flex flex-wrap gap-2">
											{selectedSubmission.tags.map((tag: string) => (
												<Badge key={tag} variant="secondary" className="text-xs">
													{tag}
												</Badge>
											))}
										</div>
									</div>
								}
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
