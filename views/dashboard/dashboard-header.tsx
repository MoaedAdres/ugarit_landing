"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getPageInfo = (pathname: string) => {
	const pageMap: Record<string, { title: string; subtitle: string }> = {
		"/": {
			title: "Dashboard Overview",
			subtitle: "Welcome to your CMS Admin Dashboard",
		},
		"/home": {
			title: "Home Page Management",
			subtitle: "Manage your website's homepage content",
		},
		"/services": {
			title: "Services Management",
			subtitle: "Manage service categories and details",
		},
		"/products": {
			title: "Products Management",
			subtitle: "Manage your product catalog",
		},
		"/blog": {
			title: "Blog Management",
			subtitle: "Manage your blog posts and articles",
		},
		"/case-studies": {
			title: "Case Studies",
			subtitle: "Showcase your successful projects",
		},
		"/careers": {
			title: "Careers Management",
			subtitle: "Manage job postings and applications",
		},
		"/testimonials": {
			title: "Testimonials Management",
			subtitle: "Manage customer testimonials and reviews",
		},
		"/partners": {
			title: "Partners & Certifications",
			subtitle: "Manage partner logos and certifications",
		},
		"/company": {
			title: "Company Profile",
			subtitle: "Manage company information and about page",
		},
		"/contact": {
			title: "Contact Management",
			subtitle: "Manage contact form submissions and inquiries",
		},
		"/media": {
			title: "Media Library",
			subtitle: "Manage images, videos, and documents",
		},
		"/seo-settings": {
			title: "SEO Settings",
			subtitle: "Manage search engine optimization settings",
		},
		"/redirects": {
			title: "Redirects Management",
			subtitle: "Manage URL redirects and track their performance",
		},
		"/sitemap": {
			title: "Sitemap Management",
			subtitle: "Configure and manage your XML sitemap",
		},
		"/navigation": {
			title: "Navigation Management",
			subtitle: "Manage your website's navigation menus",
		},
		"/locales": {
			title: "Locales Management",
			subtitle: "Manage languages and internationalization settings",
		},
		"/users": {
			title: "Users & Roles Management",
			subtitle: "Manage user accounts and role permissions",
		},
		"/audit-logs": {
			title: "Audit Logs",
			subtitle: "Track all system activities and changes",
		},
		"/integrations": {
			title: "Integrations Status",
			subtitle: "Monitor third-party service connections",
		},
		"/notifications": {
			title: "Notifications",
			subtitle: "Manage system notifications and alerts",
		},
	};

	return pageMap[pathname] || { title: "Dashboard", subtitle: "CMS Admin Dashboard" };
};

export function DashboardHeader() {
	const pathname = usePathname();
	const { title, subtitle } = getPageInfo(pathname);

	return (
		<div className="flex items-center justify-between flex-1">
			<div>
				<h1 className="text-xl font-semibold text-foreground">{title}</h1>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>

			<div className="flex items-center gap-4">
				{/* Global Search */}
				<div className="relative">
					<i className="fas fa-search absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input placeholder="Search content..." className="w-64 pl-10" />
				</div>

				{/* Notifications */}
				<Button variant="ghost" size="icon" className="relative">
					<i className="fas fa-bell h-5 w-5" />
					<span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive text-xs" />
				</Button>

				{/* User Menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative h-8 w-8 rounded-full">
							<Avatar className="h-8 w-8">
								<AvatarImage src="/user-avatar.jpg" alt="User" />
								<AvatarFallback>AD</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">Admin User</p>
								<p className="text-xs leading-none text-muted-foreground">admin@company.com</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<i className="fas fa-user mr-2 h-4 w-4" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<i className="fas fa-cog mr-2 h-4 w-4" />
							Settings
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<i className="fas fa-sign-out-alt mr-2 h-4 w-4" />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
