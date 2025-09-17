import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { ReactNode } from "react";

export type RTooltipProps = {
	triggerComponent?: ReactNode;
	tooltipText?: string | React.ReactNode;
	triggerClassName?: string;
	contentClassName?: string;
	delayDuration?: number;
	side?: "top" | "bottom" | "left" | "right";
};

const RTooltip: React.FC<RTooltipProps> = ({
	triggerComponent = <span>Trigger Text</span>,
	tooltipText = "hoverText",
	triggerClassName = "w-fit",
	contentClassName = "bg-popover text-secondary-foreground",
	delayDuration = 100,
	side = "top",
}) => {
	return (
		<TooltipProvider delayDuration={delayDuration}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={triggerClassName}>{triggerComponent}</div>
				</TooltipTrigger>
				<TooltipContent side={side} className={contentClassName}>
					{typeof tooltipText === "string" ? tooltipText : tooltipText}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default RTooltip;
