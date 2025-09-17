import React, { ReactNode } from "react";
import { SelectContent, SelectItem, SelectValue, SelectTrigger, Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import RFlex from "./RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { myIcons } from "@/constants/icons";

export type SelectOption = {
	value: string;
	label: string;
	disabled?: boolean;
	className?: string;
};

export type RNewSelectProps = {
	options?: SelectOption[];
	handleChange: (value: string) => void;
	value: string | undefined;
	triggerClassName?: string;
	contentClassName?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	error?: boolean;
	beforeOptionsComponent?: ReactNode;
	afterOptionsComponent?: ReactNode;
	loading?: boolean;
	withTranslation?: boolean;
	onClickCreate?: () => void;
	createWhenEmpty?: boolean;
	createText?: string;
	numOfChars?: number;
};
const RSelect: React.FC<RNewSelectProps> = ({
	triggerClassName = "",
	handleChange,
	placeholder = "select",
	options,
	value,
	disabled = false,
	required = false,
	name,
	error = false,
	contentClassName,
	beforeOptionsComponent,
	afterOptionsComponent,
	loading,
	withTranslation,
	onClickCreate,
	createWhenEmpty,
	createText,
	numOfChars,
}) => {
	console.log("value", value);

	return (
		<Select required={required} name={name} value={value} onValueChange={handleChange}>
			<SelectTrigger className={cn("relative min-h-8", triggerClassName, `${error ? "input__error" : ""}`)} disabled={loading || disabled}>
				<SelectValue className="text-themeBoldGrey" placeholder={placeholder} />
				{loading && <i className={`absolute right-5 top-[40%] ${myIcons.spinner}`} />}
			</SelectTrigger>
			<SelectContent className={cn("max-h-[200px] ", contentClassName)}>
				<>
					{beforeOptionsComponent && beforeOptionsComponent}
					{createWhenEmpty ? (
						options && options?.length > 0 ? (
							options?.map((option) => (
								<SelectItem
									key={option.value} // Ensure a unique key for each option
									disabled={option.disabled}
									className={cn("cursor-pointer", option.className)}
									value={option.value}
								>
									{withTranslation ? (
										<RParagraphTruncated typographyStyles="!text-sm" numOfChars={numOfChars} paragraph={option.label} />
									) : (
										<RParagraphTruncated typographyStyles="!text-sm" numOfChars={numOfChars} paragraph={option.label} />
									)}
								</SelectItem>
							))
						) : (
							<RFlex onClick={onClickCreate} className="p-1 group items-center justify-center cursor-pointer hover:bg-primary rounded-md">
								<span className="group-hover:text-foreground">{createText}</span>
								<i className={cn(myIcons.plus, "text-sm mt-1 group-hover:text-foreground")} />
							</RFlex>
						)
					) : (
						options?.map((option) => (
							<SelectItem
								key={option.value} // Ensure a unique key for each option
								disabled={option.disabled}
								className={cn("cursor-pointer", option.className)}
								value={option.value}
							>
								{withTranslation ? option.label : option.label}
							</SelectItem>
						))
					)}
					{afterOptionsComponent && afterOptionsComponent}
				</>
			</SelectContent>
		</Select>
	);
};

export default RSelect;
