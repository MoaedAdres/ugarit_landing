"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, Home, Settings, BarChart3, ImageIcon, Search, Edit } from "lucide-react";

interface SidebarItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	href?: string;
	children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
	{
		id: "content",
		label: "Content Management",
		icon: Edit,
		children: [
			{ id: "home", label: "Home Page", icon: Home, href: "/dashboard/home" },
			{
				id: "services",
				label: "Services",
				icon: Settings,
				href: "/dashboard/services",
			},
			{
				id: "products",
				label: "Products",
				icon: Settings,
				href: "/dashboard/products",
			},
			{
				id: "case-studies",
				label: "Case Studies",
				icon: Settings,
				href: "/dashboard/case-studies",
			},
			{ id: "blog", label: "Blog", icon: Edit, href: "/dashboard/blog" },
			{
				id: "testimonials",
				label: "Testimonials",
				icon: Settings,
				href: "/dashboard/testimonials",
			},
			{
				id: "partners",
				label: "Partners",
				icon: Settings,
				href: "/dashboard/partners",
			},
			{
				id: "company",
				label: "Company Profile",
				icon: Settings,
				href: "/dashboard/company",
			},
			{
				id: "careers",
				label: "Careers",
				icon: Settings,
				href: "/dashboard/careers",
			},
			{
				id: "contact",
				label: "Contact",
				icon: Settings,
				href: "/dashboard/contact",
			},
		],
	},
	{
		id: "media",
		label: "Media Library",
		icon: ImageIcon,
		href: "/dashboard/media",
	},
	{
		id: "seo",
		label: "SEO & Marketing",
		icon: Search,
		children: [
			{
				id: "seo-settings",
				label: "SEO Settings",
				icon: Search,
				href: "/dashboard/seo-settings",
			},
			{
				id: "redirects",
				label: "Redirects",
				icon: Settings,
				href: "/dashboard/redirects",
			},
			{
				id: "sitemap",
				label: "Sitemap",
				icon: Settings,
				href: "/dashboard/sitemap",
			},
		],
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings,
		children: [
			{
				id: "navigation",
				label: "Navigation",
				icon: Settings,
				href: "/dashboard/navigation",
			},
			{
				id: "locales",
				label: "Locales",
				icon: Settings,
				href: "/dashboard/locales",
			},
			{
				id: "users",
				label: "Users & Roles",
				icon: Settings,
				href: "/dashboard/users",
			},
		],
	},
	{
		id: "monitoring",
		label: "Monitoring",
		icon: BarChart3,
		children: [
			{
				id: "audit-logs",
				label: "Audit Logs",
				icon: BarChart3,
				href: "/dashboard/audit-logs",
			},
			{
				id: "integrations",
				label: "Integrations",
				icon: Settings,
				href: "/dashboard/integrations",
			},
			{
				id: "notifications",
				label: "Notifications",
				icon: Settings,
				href: "/dashboard/notifications",
			},
		],
	},
];

export function DashboardSidebar() {
	const [openItems, setOpenItems] = useState<string[]>(["content"]);
	const pathname = usePathname();

	const toggleOpen = (itemId: string) => {
		setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
	};

	const renderMenuItem = (item: SidebarItem) => {
		const hasChildren = item.children && item.children.length > 0;
		const isOpen = openItems.includes(item.id);
		const isActive = item.href === pathname;

		if (hasChildren) {
			return (
				<Collapsible key={item.id} open={isOpen} onOpenChange={() => toggleOpen(item.id)}>
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton tooltip={item.label}>
								<item.icon className="h-4 w-4" />
								<span>{item.label}</span>
								<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{item.children?.map((child) => (
									<SidebarMenuSubItem key={child.id}>
										<SidebarMenuSubButton asChild isActive={pathname === child.href}>
											<Link href={child.href || "#"}>
												<child.icon className="h-4 w-4" />
												<span>{child.label}</span>
											</Link>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</SidebarMenuItem>
				</Collapsible>
			);
		}

		return (
			<SidebarMenuItem key={item.id}>
				<SidebarMenuButton tooltip={item.label} isActive={isActive} asChild>
					<Link href={item.href || "#"}>
						<item.icon className="h-4 w-4" />
						<span>{item.label}</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	};

	return (
		<Sidebar variant="inset">
			<SidebarHeader>
				<div className="flex h-12 items-center px-4">
					<Link href="/dashboard" className="text-lg font-semibold hover:text-primary transition-colors">
						CMS Admin
					</Link>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>{sidebarItems.map(renderMenuItem)}</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
