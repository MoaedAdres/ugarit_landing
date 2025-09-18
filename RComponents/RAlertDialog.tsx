import React, { ReactNode } from "react";
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
import { Button } from "@/components/ui/button";
export type RAlertDialogProps = {
	component?: ReactNode;
	title?: string;
	description?: string;
	cancelText?: string;
	cancelClassName?: string;
	cancelAction?: () => void;
	confirmText?: string;
	confirmClassName?: string;
	confirmAction: () => void;
	loading?: boolean;
	disabled?: boolean;
	headerItemsPosition?: string;
	disableTrigger?: boolean;
	contentClassName?: string;
	footerItemsPosition?: string;
	titleClasses?: string;
};
const RAlertDialog: React.FC<RAlertDialogProps> = ({
	component,
	title,
	description,
	cancelText,
	cancelClassName,
	confirmText,
	confirmClassName,
	confirmAction = () => {},
	headerItemsPosition = "items-center",
	disableTrigger = false,
	contentClassName,
	footerItemsPosition = "items-end",
	titleClasses = "font-bold text-[16px]",
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger disabled={disableTrigger}>{component ? component : <Button>Open_Alert_Dialog</Button>}</AlertDialogTrigger>
			<AlertDialogContent className={contentClassName}>
				<AlertDialogHeader className={headerItemsPosition}>
					<AlertDialogTitle className={titleClasses}>{title ? title : "Are_you_sure_you_want_to_delete"}</AlertDialogTitle>
					<AlertDialogDescription>{description ? description : "This_action_cannot_be_undone"}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className={footerItemsPosition}>
					<AlertDialogCancel className={cancelClassName}>{cancelText ? cancelText : "cancel"}</AlertDialogCancel>
					<AlertDialogAction onClick={() => confirmAction()} className={confirmClassName}>
						{confirmText ? confirmText : "yes"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default RAlertDialog;
