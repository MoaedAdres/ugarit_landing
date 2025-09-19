"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutateData } from "@/hooks/use-mutate-data";
import { deleteSectionAction } from "@/api/services/dashboard/home/actions";
import { Section } from "@/api/services/dashboard/home/interfaces";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

interface SectionActionsProps {
	section: Section;
	onEdit: () => void;
}

export const SectionActions = ({ section, onEdit }: SectionActionsProps) => {
	const router = useRouter();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const { mutate: deleteSection, isPending: isDeleting } = useMutateData({
		mutationFn: deleteSectionAction,
		invalidateKeys: [{ queryKey: ["sections"] }, { queryKey: ["section", section.id] }],
		displaySuccess: true,
		onSuccessFn: () => {
			router.push("/dashboard/home");
		},
	});

	const handleDelete = () => {
		deleteSection({ sectionId: section.id });
		setIsDeleteDialogOpen(false);
	};

	return (
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" onClick={onEdit} className="flex items-center gap-2">
				<Edit className="h-4 w-4" />
				Edit
			</Button>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogTrigger asChild>
					<Button variant="destructive" size="sm" className="flex items-center gap-2">
						<Trash2 className="h-4 w-4" />
						Delete
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the section
							<strong> "{section.title}"</strong> and remove all its translations.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
