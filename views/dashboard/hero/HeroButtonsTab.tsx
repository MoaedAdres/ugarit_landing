"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface HeroData {
	primaryButtonText: string;
	primaryButtonLink: string;
	secondaryButtonText: string;
	secondaryButtonLink: string;
}

interface HeroButtonsTabProps {
	heroData: HeroData;
	mode: "view" | "edit";
	onInputChange: (field: string, value: string) => void;
}

export default function HeroButtonsTab({ heroData, mode, onInputChange }: HeroButtonsTabProps) {
	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			headerClassName="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
			title={
				<RFlex className="items-center gap-2">
					<i className="fas fa-mouse-pointer text-green-600"></i>
					Call-to-Action Buttons
				</RFlex>
			}
			description="Configure action buttons"
			contentClassName="space-y-6 p-6"
			contentComponent={
				<RFlex className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<RFlex className="flex-col space-y-4">
						<h4 className="font-semibold text-green-700 dark:text-green-300">Primary Button</h4>
						<RFlex className="flex-col space-y-3">
							<RFlex className="flex-col space-y-2">
								<Label htmlFor="primaryBtn" className="text-sm font-medium">
									Button Text
								</Label>
								<Input
									id="primaryBtn"
									value={heroData.primaryButtonText}
									onChange={(e) => onInputChange("primaryButtonText", e.target.value)}
									disabled={mode === "view"}
								/>
							</RFlex>
							<RFlex className="flex-col space-y-2">
								<Label htmlFor="primaryLink" className="text-sm font-medium">
									Button Link
								</Label>
								<Input
									id="primaryLink"
									value={heroData.primaryButtonLink}
									onChange={(e) => onInputChange("primaryButtonLink", e.target.value)}
									disabled={mode === "view"}
								/>
							</RFlex>
						</RFlex>
					</RFlex>

					<RFlex className="flex-col space-y-4">
						<h4 className="font-semibold text-green-700 dark:text-green-300">Secondary Button</h4>
						<RFlex className="flex-col space-y-3">
							<RFlex className="flex-col space-y-2">
								<Label htmlFor="secondaryBtn" className="text-sm font-medium">
									Button Text
								</Label>
								<Input
									id="secondaryBtn"
									value={heroData.secondaryButtonText}
									onChange={(e) => onInputChange("secondaryButtonText", e.target.value)}
									disabled={mode === "view"}
								/>
							</RFlex>
							<RFlex className="flex-col space-y-2">
								<Label htmlFor="secondaryLink" className="text-sm font-medium">
									Button Link
								</Label>
								<Input
									id="secondaryLink"
									value={heroData.secondaryButtonLink}
									onChange={(e) => onInputChange("secondaryButtonLink", e.target.value)}
									disabled={mode === "view"}
								/>
							</RFlex>
						</RFlex>
					</RFlex>
				</RFlex>
			}
		/>
	);
}
