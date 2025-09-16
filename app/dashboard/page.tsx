import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Pages</CardTitle>
					<i className="fas fa-file-alt h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">24</div>
					<p className="text-xs text-muted-foreground">+2 from last month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
					<i className="fas fa-blog h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">156</div>
					<p className="text-xs text-muted-foreground">+12 from last month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Media Files</CardTitle>
					<i className="fas fa-images h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">1,234</div>
					<p className="text-xs text-muted-foreground">+89 from last month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Users</CardTitle>
					<i className="fas fa-users h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">8</div>
					<p className="text-xs text-muted-foreground">+1 from last month</p>
				</CardContent>
			</Card>

			<Card className="md:col-span-2 lg:col-span-4">
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>Latest content updates and changes</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 bg-primary rounded-full" />
							<div className="flex-1">
								<p className="text-sm font-medium">Homepage hero updated</p>
								<p className="text-xs text-muted-foreground">2 hours ago by Admin User</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 bg-secondary rounded-full" />
							<div className="flex-1">
								<p className="text-sm font-medium">New blog post published</p>
								<p className="text-xs text-muted-foreground">5 hours ago by Content Editor</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 bg-muted-foreground rounded-full" />
							<div className="flex-1">
								<p className="text-sm font-medium">Service page content reviewed</p>
								<p className="text-xs text-muted-foreground">1 day ago by Reviewer</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
