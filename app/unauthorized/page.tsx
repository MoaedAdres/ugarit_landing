import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader className="text-center">
					<ShieldX className="h-12 w-12 text-destructive mx-auto mb-4" />
					<CardTitle className="text-2xl">Access Denied</CardTitle>
					<CardDescription>You don't have permission to access this page.</CardDescription>
				</CardHeader>
				<CardContent className="text-center space-y-4">
					<p className="text-sm text-muted-foreground">Please contact your administrator if you believe this is an error.</p>
					<div className="flex gap-2 justify-center">
						<Button asChild variant="outline">
							<Link href="/dashboard">Go to Dashboard</Link>
						</Button>
						<Button asChild>
							<Link href="/dashboard/signin">Sign In</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
