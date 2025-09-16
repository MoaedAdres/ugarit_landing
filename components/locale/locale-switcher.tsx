"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

const locales = [
	{ code: "en", name: "English", nativeName: "English" },
	{ code: "ar", name: "Arabic", nativeName: "العربية" },
];

export function LocaleSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const handleLocaleChange = (newLocale: string) => {
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
		router.refresh();
	};

	const currentLocale = locales.find((l) => l.code === locale);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<Globe className="h-4 w-4 mr-2" />
					{currentLocale?.nativeName}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{locales.map((loc) => (
					<DropdownMenuItem key={loc.code} onClick={() => handleLocaleChange(loc.code)} className={locale === loc.code ? "bg-accent" : ""}>
						<div className="flex flex-col">
							<span>{loc.nativeName}</span>
							<span className="text-xs text-muted-foreground">{loc.name}</span>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
