// import type { NextAuthOptions } from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import apiFetcher from '@/api/api.instance'
// import { Methods } from '@/constants/methods'
// import { IAuth } from '@/api/services/auth/interfaces'

// export const options: NextAuthOptions = {
//  providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//         mode: {},
//       },
//       async authorize(credentials) {
//         try {
//           const response = await apiFetcher<IAuth>(`/auth/login`, {
//             method: Methods.POST,
//             body: JSON.stringify({ email: "ian69@example.org", password: "password" }),
//           });

//           console.log(response);
//           const { data, message, access_token, expires_in } = response;
//           // Handle API response errors
//           if (!data && !access_token) {
//             console.error("API Error:", message);
//             return null;
//           }

//           // Return user data for session
//           return {
//             id: data?.id,
//             first_name: data?.first_name,
//             last_name: data?.last_name,
//             email: data?.email,
//             role: data?.role,
//             accessToken: access_token as string,
//           };
//         } catch (error) {
//           console.error(
//             "Authorization error:",
//             error,
//             error instanceof Error,
//           );
//           // Enhanced error handling
//           if (error instanceof Error) {
//             console.error("NextAuth Error:", error.name, error.message);
//           } else if (error instanceof Error) {
//             console.error("Authorization error:", error.message);
//           } else {
//             console.error("Unknown authorization error:", error);
//           }
//           return null;
//         }
//       },
//     }),
//   ],
//     callbacks: {
//         // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
//         async jwt({ token, user }) {
//             if (user) token.role = user.role
//             return token
//         },
//         // If you want to use the role in client components
//         async session({ session, token }) {
//             if (session?.user) session.user.role = token.role
//             return session
//         },
//     }
// }

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import apiFetcher from "@/api/api.instance";
import { Methods } from "@/constants/methods";
import { authFetcher } from "@/api/auth.instance";
import { IAuth, IRefreshToken } from "@/api/services/auth/interfaces";

export interface User {
	id: string;
	email: string;
	name: string;
	role: "admin" | "owner";
	accessToken: string;
	refreshToken: string;
	tokenExpires: number;
}

export interface AuthResponse {
	user: {
		id: string;
		email: string;
		name: string;
		role: "admin" | "owner";
	};
	access_token: string;
	refresh_token: string;
	expires_in: number;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		console.log("[v0] Attempting to refresh access token");
		//           const response = await apiFetcher<IAuth>(`/auth/login`, {
		//             method: Methods.POST,
		//             body: JSON.stringify({
		//                 credentials
		//             //   email: "ian69@example.org",
		//             //   password: "password",
		//             }),
		//           });

		//           console.log(response);
		//           const { data, message, access_token, expires_in } = response;
		//           // Handle API response errors
		//           if (!data && !access_token) {
		//             console.error("API Error:", message);
		//             return null;
		//           }

		//           // Return user data for session
		//           return {
		//             id: data?.id,
		//             first_name: data?.first_name,
		//             last_name: data?.last_name,
		//             email: data?.email,
		//             role: data?.role,
		//             accessToken: access_token as string,
		//           };
		//         } catch (error) {
		//           console.error("Authorization error:", error, error instanceof Error);
		//           // Enhanced error handling
		//           if (error instanceof Error) {
		//             console.error("NextAuth Error:", error.name, error.message);
		//           } else if (error instanceof Error) {
		//             console.error("Authorization error:", error.message);
		//           } else {
		//             console.error("Unknown authorization error:", error);
		//           }
		//           return null;
		//         }
		const response = await authFetcher<IRefreshToken>(`/auth/refresh`);

		console.log("[v0] Token refresh successful");

		return {
			...token,
			accessToken: response?.access_token,
			refreshToken: response.refresh_token ?? token.refreshToken,
			tokenExpires: Date.now() + (response.expires_in ?? 5) * 1000,
			error: undefined,
		};
	} catch (error) {
		console.error("[v0] Error refreshing access token:", error);
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}
				try {
					const response = await apiFetcher<IAuth>(`/auth/login`, {
						method: Methods.POST,
						body: JSON.stringify({
							credentials,
							//   email: "ian69@example.org",
							//   password: "password",
						}),
					});
					const { data, message, access_token } = response;
					// Handle API response errors
					if (!data && !access_token) {
						console.error("API Error:", message);
						return null;
					}

					return {
						id: data.user.id,
						email: data.user.email,
						name: data.user.name,
						role: data.user.role,
						accessToken: data.access_token,
						refreshToken: data.refresh_token,
						tokenExpires: Date.now() + data.expires_in * 1000,
					};
				} catch (error) {
					console.error("Authorization error:", error, error instanceof Error);
					// Enhanced error handling
					if (error instanceof Error) {
						console.error("NextAuth Error:", error.name, error.message);
					} else {
						console.error("Unknown authorization error:", error);
					}
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger }) {
			if (user) {
				console.log("[v0] Initial sign in, setting up tokens");
				return {
					...token,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
					tokenExpires: user.tokenExpires,
					role: user.role,
				};
			}

			if (trigger === "update") {
				console.log("[v0] Session update triggered");
				return token;
			}

			const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
			const tokenExpiresWithBuffer = (token.tokenExpires as number) - bufferTime;

			if (Date.now() < tokenExpiresWithBuffer) {
				return token;
			}

			console.log("[v0] Token expired or expiring soon, refreshing...");
			return refreshAccessToken(token);
		},
		async session({ session, token }) {
			if (token.error) {
				console.log("[v0] Session has error:", token.error);
				return {
					...session,
					error: token.error,
				};
			}

			return {
				...session,
				user: {
					...session.user,
					id: token.sub,
					role: token.role,
				},
				accessToken: token.accessToken,
				tokenExpires: token.tokenExpires,
				error: token.error,
			};
		},
	},
	pages: {
		signIn: "/dashboard/signin",
		// newUser: "/dashboard/signup",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	events: {
		async signIn({ user, account, profile, isNewUser }) {
			console.log("[v0] User signed in:", user.email);
		},
		async signOut({ session, token }) {
			console.log("[v0] User signed out");
		},
		async session({ session, token }) {
			if (token.error) {
				console.log("[v0] Session check failed with error:", token.error);
			}
		},
	},
};
