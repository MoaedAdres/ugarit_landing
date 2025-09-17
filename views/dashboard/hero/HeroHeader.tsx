"use client";

import Link from "next/link";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";

interface HeroHeaderProps {
	mode: "view" | "edit";
	hasChanges: boolean;
	onDuplicate: () => void;
	onEdit: () => void;
	onDelete: () => void;
	onCancel: () => void;
	onSave: () => void;
}

export default function HeroHeader({
	mode,
	hasChanges,
	onDuplicate,
	onEdit,
	onDelete,
	onCancel,
	onSave,
}: HeroHeaderProps) {
	return (
		<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white">
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%233B82F6%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
			<RFlex className="relative items-start justify-between">
				<RFlex className="items-center gap-4">
					<Link href="/dashboard/home">
						<RButton
							variant="ghost"
							size="sm"
							className="bg-white/10 border-white/20 text-white hover:bg-white/20"
							icon="fas fa-arrow-left"
							text="Back to Home"
						/>
					</Link>
					<RFlex className="flex-col">
						<h1 className="text-4xl font-bold tracking-tight">
							{mode === "view" ? "Hero Section" : "Edit Hero Section"}
						</h1>
						<p className="text-white/80 text-lg">
							{mode === "view" 
								? "View and manage your homepage hero content" 
								: "Customize your homepage hero content and design"
							}
						</p>
					</RFlex>
				</RFlex>
				<RFlex className="gap-3">
					{mode === "view" ? (
						<>
							<RButton
								variant="outline"
								onClick={onDuplicate}
								className="bg-white/10 border-white/20 text-white hover:bg-white/20"
								icon="fas fa-copy"
								text="Duplicate"
							/>
							<RButton
								variant="outline"
								onClick={onEdit}
								className="bg-white/10 border-white/20 text-white hover:bg-white/20"
								icon="fas fa-edit"
								text="Edit"
							/>
							<RButton
								variant="destructive"
								onClick={onDelete}
								className="bg-red-500/20 border-red-500/30 text-red-200 hover:bg-red-500/30"
								icon="fas fa-trash"
								text="Delete"
							/>
						</>
					) : (
						<>
							<RButton
								variant="outline"
								onClick={onCancel}
								className="bg-white/10 border-white/20 text-white hover:bg-white/20"
								text="Cancel"
							/>
							<RButton
								onClick={onSave}
								disabled={!hasChanges}
								className="bg-white text-slate-900 hover:bg-white/90"
								icon="fas fa-save"
								text="Save Changes"
							/>
						</>
					)}
				</RFlex>
			</RFlex>
		</div>
	);
}
