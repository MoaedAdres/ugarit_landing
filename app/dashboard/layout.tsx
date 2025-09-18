"use client";
import type React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
// import { authOptions } from "@/lib/auth";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/views/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/views/dashboard/dashboard-header";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	//   const session = await getServerSession(authOptions);
	const session = true;

	if (!session) {
		redirect("/dashboard/signin");
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SidebarProvider>
				<div className="flex h-screen w-full">
					<DashboardSidebar />

					<SidebarInset>
						<div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
							<SidebarTrigger className="-ml-1" />
							<div className="flex-1">
								<DashboardHeader />
							</div>
						</div>

						<main className="flex-1 overflow-y-auto p-6">
							<Suspense fallback={null}>{children}</Suspense>
						</main>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</QueryClientProvider>
		// <Analytics />
	);
}
