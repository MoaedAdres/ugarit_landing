"use client";

import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface PartnerActionsProps {
	partnerData: any;
}

export function PartnerActions({ partnerData }: PartnerActionsProps) {
	return (
		<div className="space-y-6">
			{/* Partnership Status */}
			<RCard
				title="Partnership Status"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Status</div>
									<div className="text-xs text-muted-foreground">Partnership status</div>
								</div>
								<Badge variant={partnerData.status === "active" ? "default" : "secondary"} className="font-medium">
									{partnerData.status === "active" ? "Active" : "Pending"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Featured</div>
									<div className="text-xs text-muted-foreground">Priority partner</div>
								</div>
								<Badge variant={partnerData.featured ? "default" : "secondary"} className="font-medium">
									{partnerData.featured ? "Yes" : "No"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Partnership Date</div>
									<div className="text-xs text-muted-foreground">When started</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">
									{new Date(partnerData.partnershipDate).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Renewal Date</div>
									<div className="text-xs text-muted-foreground">Contract expiry</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">
									{new Date(partnerData.renewalDate).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Last Contact</div>
									<div className="text-xs text-muted-foreground">Recent interaction</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">
									{new Date(partnerData.lastContact).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Next Meeting</div>
									<div className="text-xs text-muted-foreground">Upcoming meeting</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">
									{new Date(partnerData.nextMeeting).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				}
			/>

			{/* Contact Information */}
			<RCard
				title="Contact Information"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						<div className="space-y-3">
							<RFlex className="items-center gap-3">
								<i className={`${myIcons.globe} h-4 w-4 text-muted-foreground`} />
								<a href={partnerData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
									{partnerData.website}
								</a>
							</RFlex>
							<RFlex className="items-center gap-3">
								<i className={`${myIcons.envelope} h-4 w-4 text-muted-foreground`} />
								<span className="text-sm text-muted-foreground">{partnerData.contact}</span>
							</RFlex>
							<RFlex className="items-center gap-3">
								<i className={`${myIcons.phone} h-4 w-4 text-muted-foreground`} />
								<span className="text-sm text-muted-foreground">{partnerData.phone}</span>
							</RFlex>
							<RFlex className="items-center gap-3">
								<i className={`${myIcons.mapPin} h-4 w-4 text-muted-foreground`} />
								<span className="text-sm text-muted-foreground">{partnerData.location}</span>
							</RFlex>
						</div>
					</div>
				}
			/>

			{/* Quick Actions */}
			<RCard
				title="Quick Actions"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<RFlex className="flex-col gap-3">
						<RButton
							className="w-full"
							size="lg"
							onClick={() => window.location.href = `/dashboard/partners/${partnerData.id}?isEdit=true`}
							icon={<i className={`${myIcons.edit} h-4 w-4`} />}
							text="Edit Partner"
						/>
						<RButton
							variant="outline"
							className="w-full"
							size="lg"
							onClick={() => window.open(partnerData.website, '_blank')}
							icon={<i className={`${myIcons.externalLink} h-4 w-4`} />}
							text="Visit Website"
						/>
						<RButton
							variant="outline"
							className="w-full"
							size="lg"
							onClick={() => window.open(`mailto:${partnerData.contact}`, '_blank')}
							icon={<i className={`${myIcons.envelope} h-4 w-4`} />}
							text="Send Email"
						/>
						<RButton
							variant="outline"
							className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
							size="lg"
							icon={<i className={`${myIcons.xmark} h-4 w-4`} />}
							text="Remove Partner"
						/>
					</RFlex>
				}
			/>
		</div>
	);
}
