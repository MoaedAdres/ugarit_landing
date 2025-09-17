"use client";

import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";

interface HeroData {
	title: string;
	subtitle: string;
	description: string;
	primaryButtonText: string;
	secondaryButtonText: string;
	backgroundImage: string;
	textAlignment: string;
}

interface HeroLivePreviewProps {
	heroData: HeroData;
}

export default function HeroLivePreview({ heroData }: HeroLivePreviewProps) {
	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			headerClassName="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20"
			title={
				<RFlex className="items-center gap-2">
					<i className="fas fa-eye text-cyan-600"></i>
					Live Preview
				</RFlex>
			}
			description="See how your hero section will look"
			contentClassName="p-6"
			contentComponent={
				<div
					className="relative rounded-xl overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 min-h-[300px] flex items-center"
					style={{
						backgroundImage: heroData.backgroundImage ? `url(${heroData.backgroundImage})` : undefined,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="absolute inset-0 bg-black/40"></div>
					<div
						className={`relative z-10 max-w-full ${
							heroData.textAlignment === "center"
								? "mx-auto text-center"
								: heroData.textAlignment === "right"
									? "ml-auto text-right"
									: ""
						}`}
					>
						<h1 className="text-2xl font-bold mb-2">{heroData.title}</h1>
						<h2 className="text-lg mb-2 opacity-90">{heroData.subtitle}</h2>
						<p className="text-sm mb-4 opacity-80 line-clamp-3">{heroData.description}</p>
						<RFlex className="gap-2 flex-wrap">
							<RButton size="sm" className="bg-white text-black hover:bg-gray-100" text={heroData.primaryButtonText} />
							<RButton size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black bg-transparent" text={heroData.secondaryButtonText} />
						</RFlex>
					</div>
				</div>
			}
		/>
	);
}
