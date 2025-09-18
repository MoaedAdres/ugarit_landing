"use client";

import RButton from "@/RComponents/RButton";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface PartnerDetailsProps {
	partnerData: any;
}

export function PartnerDetails({ partnerData }: PartnerDetailsProps) {
	return (
		<div className="space-y-8">
			{/* Partner Overview */}
			<RCard
				cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
				contentComponent={
					<div className="p-8">
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-semibold mb-3 text-foreground">Partnership Overview</h2>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-muted/30 rounded-xl">
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{partnerData.revenue}</div>
										<div className="text-sm font-medium text-muted-foreground">Revenue</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{partnerData.projects}</div>
										<div className="text-sm font-medium text-muted-foreground">Projects</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{partnerData.teamSize}</div>
										<div className="text-sm font-medium text-muted-foreground">Team Size</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{partnerData.contractValue}</div>
										<div className="text-sm font-medium text-muted-foreground">Contract Value</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			{/* Partner Description */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-violet-500 rounded-full"></div>
						About {partnerData.name}
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<RParagraphTruncated
						paragraph={partnerData.description}
						numOfChars={500}
						typographyStyles="text-muted-foreground leading-relaxed text-lg"
					/>
				}
			/>

			{/* Partnership Benefits */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Partnership Benefits
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{partnerData.benefits.map((benefit: string, index: number) => (
							<div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
								<div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg">
									<i className={`${myIcons.award} h-4 w-4 text-green-600 dark:text-green-400`} />
								</div>
								<span className="font-medium text-green-800 dark:text-green-200">{benefit}</span>
							</div>
						))}
					</div>
				}
			/>

			{/* Key Contacts */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
						Key Contacts
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						{partnerData.keyContacts.map((contact: any, index: number) => (
							<div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
								<RFlex className="items-center gap-3">
									<div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
										<i className={`${myIcons.users} h-5 w-5 text-violet-600 dark:text-violet-400`} />
									</div>
									<div>
										<div className="font-medium">{contact.name}</div>
										<div className="text-sm text-muted-foreground">{contact.role}</div>
									</div>
								</RFlex>
								<RButton
									variant="ghost"
									size="sm"
									onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
									icon={<i className={`${myIcons.envelope} h-4 w-4`} />}
								/>
							</div>
						))}
					</div>
				}
			/>
		</div>
	);
}
