"use client";
import type React from "react";
import { useSession, SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SessionHandler({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.error === "RefreshAccessTokenError") {
			console.log("[v0] Session refresh failed, redirecting to sign in");
			toast("Session Expired", {
				description: "Please sign in again to continue.",
			});
			router.push("/dashboard/signin");
		}
	}, [session, router]);

	return <>{children}</>;
}

interface SessionProviderProps {
	children: React.ReactNode;
}

export function AuthProvider({ children }: SessionProviderProps) {
	return (
		<NextAuthSessionProvider
			refetchInterval={2 * 60} // Refetch session every 2 minutes
			refetchOnWindowFocus={true}
			refetchWhenOffline={false}
		>
			<SessionHandler>{children}</SessionHandler>
		</NextAuthSessionProvider>
	);
}
