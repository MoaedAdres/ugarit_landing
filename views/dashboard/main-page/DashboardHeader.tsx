"use client";

import RFlex from "@/RComponents/RFlex";
import RButton from "@/RComponents/RButton";

export default function DashboardHeader() {
	return (
		<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white">
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%233B82F6%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
			<div className="relative flex items-start justify-between">
				<div className="space-y-3">
					<RFlex className="items-center gap-4">
						<div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
							<i className="fas fa-chart-bar text-white text-2xl"></i>
						</div>
						<div>
							<h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
							<p className="text-white/80 text-lg">Welcome back! Here's what's happening with your site</p>
						</div>
					</RFlex>
				</div>
				<RFlex className="gap-3">
					<RButton
						variant="outline"
						size="lg"
						className="bg-white/10 border-white/20 text-white hover:bg-white/20"
						icon="fas fa-sync-alt"
						text="Refresh Data"
					/>
					<RButton size="lg" className="bg-white text-slate-900 hover:bg-white/90" icon="fas fa-plus" text="Quick Add" />
				</RFlex>
			</div>
		</div>
	);
}
