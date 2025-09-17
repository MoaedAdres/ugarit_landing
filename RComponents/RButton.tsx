import { Button } from "@/components/ui/button";
import RFlex from "@/RComponents/RFlex";
//@ts-ignore
import { useTranslations } from "next-intl";

export type RButtonProps = {
	className?: string;
	style?: any;
	textClassName?: string;
	disabled?: boolean;
	loading?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	hidden?: boolean;
	icon?: string | React.ReactNode;
	text?: string;
	type?: "button" | "submit" | "reset";
	key?: React.Key;
	id?: string;
	iconRight?: boolean;
	variant?: "default" | "ghost" | "link" | "destructive" | "outline" | "secondary";
	size?: "default" | "sm" | "lg" | "icon";
	iconClasses?: string;
	translationKey?: string;
};

import React, { MouseEventHandler } from "react";
const RButton: React.FC<RButtonProps> = ({
	className,
	style,
	disabled = false,
	loading = false,
	onClick,
	hidden = false,
	icon,
	text,
	type = "button",
	key,
	iconRight = false,
	variant = "default",
	textClassName,
	size = "default",
	iconClasses = "w-4 h-4",
	translationKey,
}) => {
	const t = useTranslations();
	const renderIcon = () => {
		if (!icon) return null;
		return typeof icon === "string" ? (
			<i className={`${icon} ${iconClasses}`} />
		) : (
			icon // إذا كان React component أو JSX
		);
	};

	return (
		<Button
			key={key || ""}
			className={className}
			style={style}
			onClick={onClick}
			type={type}
			variant={variant}
			disabled={disabled || loading}
			hidden={hidden}
			size={size}
		>
			{loading ? (
				<RFlex className="justify-center items-center gap-1">
					{text && <p>{translationKey ? t(translationKey) : text}</p>}
					<span>...</span>
				</RFlex>
			) : icon && !text ? (
				renderIcon()
			) : text && icon ? (
				<>
					{iconRight ? (
						<RFlex className="gap-[5px] items-center">
							{translationKey ? t(translationKey) : text}
							{renderIcon()}
						</RFlex>
					) : (
						<RFlex className="items-center gap-[5px]">
							{renderIcon()}
							{translationKey ? t(translationKey) : text}
						</RFlex>
					)}
				</>
			) : (
				<p className={textClassName}>{translationKey ? t(translationKey) : text}</p>
			)}
		</Button>
	);
};

export default React.memo(RButton);
