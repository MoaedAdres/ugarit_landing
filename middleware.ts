import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware({
	locales: ["en", "ar"],
	defaultLocale: "en",
	localePrefix: "never", // Don't add locale prefix to URLs
});
export default withAuth(
	function middleware(req) {
		const { pathname } = req.nextUrl;
		const token = req.nextauth.token;

		const intlResponse = intlMiddleware(req);
		if (intlResponse) {
			return intlResponse;
		}

		// Role-based routing
		const roleRoutes: Record<string, string[]> = {
			admin: ["/admin"],
			dashboard: ["/employee", "/dashboard"],
		};

		const userRole = token?.role as string;
		const allowedPaths = roleRoutes[userRole] || [];

		// Check if user has access to the requested path
		const hasAccess = allowedPaths.some((path) => pathname.startsWith(path));

		if (!hasAccess) {
			return NextResponse.redirect(new URL("/unauthorized", req.url));
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	},
);

export const config = {
	matcher: [
		// "/dashboard",
	],
};
