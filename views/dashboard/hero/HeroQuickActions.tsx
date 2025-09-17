"use client";

import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";

export default function HeroQuickActions() {
	return (
		<RCard
			title={
				<RFlex className="items-center gap-2">
					<i className="fas fa-bolt text-yellow-600"></i>
					Quick Actions
				</RFlex>
			}
			contentClassName="space-y-2 p-6"
			contentComponent={
				<RFlex className="flex-col space-y-2">
					<RButton
						variant="outline"
						className="w-full justify-start"
						icon="fas fa-eye"
						text="Preview Section"
					/>
					<RButton
						variant="outline"
						className="w-full justify-start"
						icon="fas fa-copy"
						text="Duplicate Section"
					/>
					<RButton
						variant="outline"
						className="w-full justify-start"
						icon="fas fa-cog"
						text="Advanced Settings"
					/>
				</RFlex>
			}
		/>
	);
}
