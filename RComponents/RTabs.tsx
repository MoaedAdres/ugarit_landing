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
}: RTabsProps) => {
	return (
		<Tabs defaultValue={defaultValue} className={className} value={activeTab}>
			<TabsList className={cn(listClassName)}>
				{tabs.map((tab) => (
					<TabsTrigger
						onClick={() => {
							setActiveTab(tab.value);
							setActiveTabCallback && setActiveTabCallback(tab);
						}}
						value={tab.value}
						disabled={tab.disabled}
						className={cn(triggerClassName)}
					>
						{tab.title}
					</TabsTrigger>
				))}
			</TabsList>
			{innerContent &&
				tabs.map((tab) => (
					<TabsContent value={tab.value} className={cn(contentClassName)}>
						{tab.content}
					</TabsContent>
				))}
		</Tabs>
	);
};

export default RTabs;
