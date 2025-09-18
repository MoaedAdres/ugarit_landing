"use client";

import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface ServiceActionsProps {
	serviceData: any;
}

export function ServiceActions({ serviceData }: ServiceActionsProps) {
	return (
		<div className="space-y-6">
			{/* Service Status Card */}
			<RCard
				title="Service Status"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-4">
							<RFlex className="items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Active Status</div>
									<div className="text-xs text-muted-foreground">Service availability</div>
								</div>
								<Badge variant={serviceData.isActive ? "default" : "secondary"} className="font-medium">
									{serviceData.isActive ? "Active" : "Inactive"}
								</Badge>
							</RFlex>
							<RFlex className="items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Featured</div>
									<div className="text-xs text-muted-foreground">Homepage highlight</div>
								</div>
								<Badge variant={serviceData.featured ? "default" : "secondary"} className="font-medium">
									{serviceData.featured ? "Yes" : "No"}
								</Badge>
							</RFlex>
							<RFlex className="items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Last Updated</div>
									<div className="text-xs text-muted-foreground">Recent changes</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">{serviceData.updatedAt}</span>
							</RFlex>
						</div>
					</div>
				}
			/>

			{/* Quick Actions Card */}
			<RCard
				title="Quick Actions"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<RFlex className="flex-col gap-3">
						<RButton
							className="w-full"
							size="lg"
							onClick={() => window.location.href = `/dashboard/services/${serviceData.id}?isEdit=true`}
							icon={<i className={`${myIcons.edit} h-4 w-4`} />}
							text="Edit Service"
						/>
						<RButton
							variant="outline"
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.eye} h-4 w-4`} />}
							text="Preview on Site"
						/>
						<RButton
							variant="outline"
							className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
							size="lg"
							icon={<i className={`${myIcons.xmark} h-4 w-4`} />}
							text="Delete Service"
						/>
					</RFlex>
				}
			/>
		</div>
	);
}
