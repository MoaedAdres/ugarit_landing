import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { ReactNode } from "react";

export type RCardProps = {
	title?: string | ReactNode;
	description?: string;
	contentComponent: ReactNode;
	contentClassName?: string;
	headerClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	cardClassName?: string;
	footerClassName?: string;
	footerComponent?: ReactNode;
	style?: React.CSSProperties;
	ref?: React.Ref<HTMLDivElement>;
};

const RCard = ({
	title,
	description,
	contentComponent,
	footerComponent,
	cardClassName,
	headerClassName,
	titleClassName,
	descriptionClassName,
	contentClassName,
	footerClassName,
	style,
	ref,
}: RCardProps) => {
	console.log("rendering: RCard rerendered");
	return (
		<Card id="card" className={cardClassName} style={style} ref={ref}>
			{title ||
				(description && (
					<CardHeader id="card header" className={headerClassName}>
						{title && <CardTitle className={titleClassName}>{title}</CardTitle>}
						{description && <CardDescription className={descriptionClassName}>{description}</CardDescription>}
					</CardHeader>
				))}
			<CardContent id="card content" className={contentClassName}>
				{contentComponent}
			</CardContent>
			{footerComponent && (
				<CardFooter id="card footer" className={footerClassName}>
					{footerComponent}
				</CardFooter>
			)}
		</Card>
	);
};

export default React.memo(RCard);
