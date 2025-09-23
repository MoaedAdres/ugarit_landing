"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryData } from "./types";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RAlertDialog from "@/RComponents/RAlertDialog";
import { useRouter } from "next/navigation";
import { getIconUrl } from "@/utils/helperFunctions";

interface CategoryCardProps extends CategoryData {
	onDelete?: (categoryId: string) => void;
}

export default function CategoryCard({ id, name, summary, slug, icon, href, lastUpdated, translations, media, onDelete }: CategoryCardProps) {
	const router = useRouter();

	const handleEdit = () => {
		router.push(`/dashboard/categories/${id}?isEdit=true`);
	};

	const handleDelete = () => {
		if (onDelete) {
			onDelete(id);
		}
	};

	return (
		<RCard
			cardClassName="relative flex flex-col h-full"
			contentClassName="flex flex-col h-full pb-3"
			contentComponent={
				<div className="flex flex-col h-full">
					<RFlex className="items-center justify-between mb-4">
						<RFlex className="items-center gap-3">
							{icon.startsWith('http') || icon.startsWith('/') ? (
								<img src={getIconUrl(icon)} alt={`${name} icon`} className="h-10 w-10 object-contain" />
							) : (
								<i className={`${icon} h-8 w-8 text-muted-foreground`}></i>
							)}
							<RFlex className="flex-col">
								<h3 className="text-lg font-semibold">{name}</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{summary}</p>
								<Badge variant="outline" className="mt-1 w-fit">
									{slug}
								</Badge>
							</RFlex>
						</RFlex>
						<RFlex className="items-center gap-2">
							<RButton variant="ghost" size="sm" onClick={handleEdit} className="h-8 w-8 p-0" icon="fas fa-edit" />
							<RAlertDialog
								component={<RButton variant="ghost" size="sm" className="h-8 w-8 p-0" icon="fas fa-trash" />}
								title="Delete Category"
								description={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
								confirmText="Delete"
								confirmAction={handleDelete}
								confirmClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							/>
						</RFlex>
					</RFlex>
					<div className="flex-1 flex flex-col justify-end">
						<RFlex className="flex-col space-y-3">
							<Button asChild className="w-full">
								<Link href={href || `/dashboard/categories/${id}`}>View Details</Link>
							</Button>
							<div className="flex flex-wrap gap-1">
								{translations.map((translation) => (
									<Badge key={translation.id} variant="secondary" className="text-xs">
										{translation.locale.toUpperCase()}
									</Badge>
								))}
							</div>
							{lastUpdated && <p className="text-xs text-muted-foreground text-center">Last updated: {lastUpdated}</p>}
						</RFlex>
					</div>
				</div>
			}
		/>
	);
}
