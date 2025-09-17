"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

interface HeroData {
	title: string;
	subtitle: string;
	description: string;
}

interface HeroContentTabProps {
	heroData: HeroData;
	mode: "view" | "edit";
	onInputChange: (field: string, value: string) => void;
}

export default function HeroContentTab({ heroData, mode, onInputChange }: HeroContentTabProps) {
	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			headerClassName="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
			title={
				<RFlex className="items-center gap-2">
					<i className="fas fa-file-alt text-blue-600"></i>
					Content Settings
				</RFlex>
			}
			description="Main hero text and messaging"
			contentClassName="space-y-6 p-6"
			contentComponent={
				<>
					<RFlex className="flex-col space-y-2">
						<Label htmlFor="title" className="text-sm font-semibold">
							Hero Title
						</Label>
						<Input
							id="title"
							value={heroData.title}
							onChange={(e) => onInputChange("title", e.target.value)}
							placeholder="Enter hero title"
							disabled={mode === "view"}
							className="h-12 text-lg"
						/>
					</RFlex>

					<RFlex className="flex-col space-y-2">
						<Label htmlFor="subtitle" className="text-sm font-semibold">
							Subtitle
						</Label>
						<Input
							id="subtitle"
							value={heroData.subtitle}
							onChange={(e) => onInputChange("subtitle", e.target.value)}
							placeholder="Enter hero subtitle"
							disabled={mode === "view"}
							className="h-10"
						/>
					</RFlex>

					<RFlex className="flex-col space-y-2">
						<Label htmlFor="description" className="text-sm font-semibold">
							Description
						</Label>
						<Textarea
							id="description"
							value={heroData.description}
							onChange={(e) => onInputChange("description", e.target.value)}
							placeholder="Enter hero description"
							rows={4}
							disabled={mode === "view"}
							className="resize-none"
						/>
					</RFlex>
				</>
			}
		/>
	);
}
