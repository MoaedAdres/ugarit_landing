import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabElement = {
	value: string;
	title: string;
	name?: string;
	disabled?: boolean;
	content?: ReactNode;
	icon?: any;
	svg?: any;
	iconImg?: any;
};

export type RTabsProps = {
	defaultValue?: string;
	tabs: TabElement[];
	className?: string;
	setActiveTab: React.Dispatch<React.SetStateAction<any>>;
	setActiveTab2?: React.Dispatch<React.SetStateAction<any>>;
	setActiveTab3?: React.Dispatch<React.SetStateAction<any>>;
	activeTab: string;
	innerContent?: boolean;
	listClassName?: string;
	triggerClassName?: string;
	contentClassName?: string;
	setActiveTabCallback?: (tab: TabElement) => void;
	multi?: string[];
	unSelectOption?: boolean;
	variant?: "default" | "pills" | "underline" | "cards" | "minimal";
	size?: "sm" | "md" | "lg";
	orientation?: "horizontal" | "vertical";
	fullWidth?: boolean;
	showIcons?: boolean;
};

const RTabs = ({
	defaultValue = "",
	tabs = [],
	className = "",
	activeTab,
	setActiveTab,
	innerContent = false,
	setActiveTabCallback,
	contentClassName,
	listClassName,
	triggerClassName,
	variant = "default",
	size = "md",
	orientation = "horizontal",
	fullWidth = false,
	showIcons = true,
}: RTabsProps) => {
	// Variant-based styling
	const getVariantStyles = () => {
		switch (variant) {
			case "pills":
				return {
					list: "bg-gray-100 dark:bg-gray-800 p-1 rounded-full",
					trigger: "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 hover:shadow-sm data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-md",
				};
			case "underline":
				return {
					list: "bg-transparent border-b border-gray-200 dark:border-gray-700 p-0 rounded-none",
					trigger: "border-b-2 border-transparent px-4 py-3 text-sm font-medium transition-all duration-200 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:bg-transparent",
				};
			case "cards":
				return {
					list: "bg-transparent p-0 gap-2",
					trigger: "border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-sm data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-950/30 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md",
				};
			case "minimal":
				return {
					list: "bg-transparent p-0",
					trigger: "px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 rounded-md data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300",
				};
			default:
				return {
					list: "bg-gray-100 dark:bg-gray-800 p-1 rounded-lg",
					trigger: "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm",
				};
		}
	};

	// Size-based styling
	const getSizeStyles = () => {
		switch (size) {
			case "sm":
				return {
					list: "h-8",
					trigger: "px-2 py-1 text-xs",
				};
			case "lg":
				return {
					list: "h-12",
					trigger: "px-6 py-3 text-base",
				};
			default:
				return {
					list: "h-10",
					trigger: "px-4 py-2 text-sm",
				};
		}
	};

	const variantStyles = getVariantStyles();
	const sizeStyles = getSizeStyles();

	return (
		<Tabs 
			defaultValue={defaultValue} 
			className={cn(
				"w-full",
				orientation === "vertical" && "flex flex-row gap-4",
				className
			)} 
			value={activeTab}
			orientation={orientation}
		>
			<TabsList 
				className={cn(
					"w-full" + (fullWidth ? "" : " w-fit"),
					variantStyles.list,
					sizeStyles.list,
					orientation === "vertical" && "flex-col h-auto w-fit",
					listClassName
				)}
			>
				{tabs.map((tab, index) => (
					<TabsTrigger
						key={tab.value}
						onClick={() => {
							setActiveTab(tab.value);
							setActiveTabCallback && setActiveTabCallback(tab);
						}}
						value={tab.value}
						disabled={tab.disabled}
						className={cn(
							variantStyles.trigger,
							sizeStyles.trigger,
							fullWidth && "flex-1",
							orientation === "vertical" && "w-full justify-start",
							tab.disabled && "opacity-50 cursor-not-allowed",
							"cursor-pointer",
							triggerClassName
						)}
					>
						<div className="flex items-center gap-2">
							{showIcons && (tab.icon || tab.svg || tab.iconImg) && (
								<span className="flex-shrink-0">
									{tab.icon || tab.svg || tab.iconImg}
								</span>
							)}
							<span className="truncate">{tab.title}</span>
						</div>
					</TabsTrigger>
				))}
			</TabsList>
			{innerContent &&
				tabs.map((tab) => (
					<TabsContent 
						key={tab.value}
						value={tab.value} 
						className={cn(
							"mt-4 focus-visible:outline-none",
							orientation === "vertical" && "mt-0 ml-4",
							contentClassName
						)}
					>
						{tab.content}
					</TabsContent>
				))}
		</Tabs>
	);
};

export default RTabs;
