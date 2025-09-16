import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="grid gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Hero Section</CardTitle>
					<CardDescription>Main banner and call-to-action</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Button asChild>
							<Link href="/dashboard/home/edit-hero">Edit Hero Content</Link>
						</Button>
						<p className="text-sm text-muted-foreground">Last updated: 2 hours ago</p>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Highlights</CardTitle>
					<CardDescription>Service cards and key features</CardDescription>
				</CardHeader>
				<CardContent>
					<Button asChild>
						<Link href="/dashboard/home/manage-highlights">Manage Highlights</Link>
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>KPI Stats</CardTitle>
					<CardDescription>Key performance indicators display</CardDescription>
				</CardHeader>
				<CardContent>
					<Button>Update Statistics</Button>
				</CardContent>
			</Card>
		</div>
	);
}
