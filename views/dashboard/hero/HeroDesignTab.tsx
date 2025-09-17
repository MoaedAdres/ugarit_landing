"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RSelect from "@/RComponents/RSelect";
import RFlex from "@/RComponents/RFlex";

interface HeroData {
	backgroundImage: string;
	textAlignment: string;
	isActive: boolean;
}

interface HeroDesignTabProps {
	heroData: HeroData;
	mode: "view" | "edit";
	onInputChange: (field: string, value: string | boolean) => void;
}

export default function HeroDesignTab({ heroData, mode, onInputChange }: HeroDesignTabProps) {
	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			headerClassName="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20"
			title={
				<RFlex className="items-center gap-2">
					<i className="fas fa-palette text-purple-600"></i>
					Design Settings
				</RFlex>
			}
			description="Visual appearance options"
			contentClassName="space-y-6 p-6"
			contentComponent={
				<>
					<RFlex className="flex-col space-y-2">
						<Label className="text-sm font-semibold">Background Image</Label>
						<RFlex className="gap-2">
							<Input
								value={heroData.backgroundImage}
								onChange={(e) => onInputChange("backgroundImage", e.target.value)}
								placeholder="Image URL or path"
								disabled={mode === "view"}
							/>
							<RButton variant="outline" size="sm" disabled={mode === "view"} icon="fas fa-upload" />
						</RFlex>
					</RFlex>

					<RFlex className="flex-col space-y-2">
						<Label htmlFor="alignment" className="text-sm font-semibold">
							Text Alignment
						</Label>
						<RSelect
							value={heroData.textAlignment}
							handleChange={(value) => onInputChange("textAlignment", value)}
							disabled={mode === "view"}
							placeholder="Select alignment"
							options={[
								{ value: "left", label: "Left" },
								{ value: "center", label: "Center" },
								{ value: "right", label: "Right" },
							]}
						/>
					</RFlex>

					<RFlex className="items-center justify-between p-4 bg-muted rounded-lg">
						<RFlex className="flex-col space-y-0.5">
							<Label className="text-sm font-semibold">Active Status</Label>
							<p className="text-sm text-muted-foreground">Show this hero section</p>
						</RFlex>
						<Switch
							checked={heroData.isActive}
							onCheckedChange={(checked) => onInputChange("isActive", checked)}
							disabled={mode === "view"}
						/>
					</RFlex>
				</>
			}
		/>
	);
}
