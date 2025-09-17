"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

export default function SystemStatus() {
	return (
		<RCard
			cardClassName="border-0 shadow-xl"
			title={
				<RFlex className="items-center gap-2 text-2xl">
					<i className="fas fa-server text-slate-600 text-xl"></i>
					System Status
				</RFlex>
			}
			description="Monitor your system health and performance"
			contentComponent={
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<RFlex className="items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
						<div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
							<i className="fas fa-check-circle text-white text-lg"></i>
						</div>
						<div>
							<p className="font-semibold text-green-800 dark:text-green-200">Website</p>
							<p className="text-sm text-green-600 dark:text-green-400">Operational</p>
						</div>
					</RFlex>

					<RFlex className="items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
						<div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
							<i className="fas fa-database text-white text-lg"></i>
						</div>
						<div>
							<p className="font-semibold text-green-800 dark:text-green-200">Database</p>
							<p className="text-sm text-green-600 dark:text-green-400">Healthy</p>
						</div>
					</RFlex>

					<RFlex className="items-center gap-4 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
						<div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
							<i className="fas fa-exclamation-triangle text-white text-lg"></i>
						</div>
						<div>
							<p className="font-semibold text-yellow-800 dark:text-yellow-200">Storage</p>
							<p className="text-sm text-yellow-600 dark:text-yellow-400">85% Used</p>
						</div>
					</RFlex>

					<RFlex className="items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
						<div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
							<i className="fas fa-shield-alt text-white text-lg"></i>
						</div>
						<div>
							<p className="font-semibold text-green-800 dark:text-green-200">Security</p>
							<p className="text-sm text-green-600 dark:text-green-400">Protected</p>
						</div>
					</RFlex>
				</div>
			}
		/>
	);
}
