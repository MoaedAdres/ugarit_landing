import React from "react";
import RTooltip from "@/RComponents/RTooltip" ;
import { truncatePargraph } from "@/utils/helperFunctions";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
interface IRParagraphTruncated {
	paragraph: string;
	numOfChars?: number;
	triggerComponent?: React.ReactNode;
	tooltipSide?: "top" | "bottom" | "left" | "right";
	typographyStyles?: string;
	contentClasses?: string;
}
function RParagraphTruncated({
	contentClasses = "w-96",
	typographyStyles,
	tooltipSide = "top",
	numOfChars = 15,
	paragraph,
	triggerComponent,
}: IRParagraphTruncated) {
	return paragraph?.length > numOfChars ? (
		<RTooltip
			triggerComponent={
				triggerComponent ?? (
					<Typography weight={"normal"} className={cn("text-base", typographyStyles)}>
						{truncatePargraph(paragraph, numOfChars)}
					</Typography>
				)
			}
			contentClassName={cn("mx-auto whitespace-pre-wrap break-words", contentClasses)}
			side={tooltipSide}
			tooltipText={
				<Typography weight={"normal"} className={cn("text-xs")}>
					{paragraph}
				</Typography>
			}
		/>
	) : (
		<Typography weight={"normal"} className={cn("text-base", typographyStyles)}>
			{paragraph}
		</Typography>
	);
}

export default RParagraphTruncated;
