"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";

// Animated Chart Components
function AnimatedBarChart({ data, labels, color = "from-blue-500 to-blue-400" }: { data: number[]; labels: string[]; color?: string }) {
	const [animatedData, setAnimatedData] = useState(data.map(() => 0));
	const [showTrendLine, setShowTrendLine] = useState(false);
	const { ref: chartRef, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView) {
			// Animate each bar with a slight delay
			data.forEach((value, index) => {
				setTimeout(() => {
					setAnimatedData((prev) => {
						const newData = [...prev];
						newData[index] = value;
						return newData;
					});
				}, index * 100); // 100ms delay between each bar
			});

			// Show trend line after bars are animated
			setTimeout(() => {
				setShowTrendLine(true);
			}, data.length * 100 + 500);
		}
	}, [inView, data]);

	// Calculate the maximum value for percentage calculation
	const maxValue = Math.max(...data);

	// Format numbers for display
	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + "K";
		}
		return num.toString();
	};

	// Generate trend line with smooth curves
	const generateSmoothTrendLinePath = () => {
		const width = 100; // SVG width percentage
		const height = 100; // SVG height percentage
		const points = animatedData.map((value, index) => {
			const x = (index / (data.length - 1)) * width;
			const y = height - (value / maxValue) * height;
			return { x, y };
		});

		if (points.length < 2) return "";

		let path = `M ${points[0].x},${points[0].y}`;

		for (let i = 1; i < points.length; i++) {
			const prev = points[i - 1];
			const curr = points[i];
			const next = points[i + 1];

			if (next) {
				// Create smooth curve using quadratic Bézier curves
				const cp1x = prev.x + (curr.x - prev.x) / 3;
				const cp1y = prev.y;
				const cp2x = curr.x - (next.x - curr.x) / 3;
				const cp2y = curr.y;
				path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
			} else {
				path += ` L ${curr.x},${curr.y}`;
			}
		}

		return path;
	};

	return (
		<div ref={chartRef} className="relative">
			{/* Trend Line SVG */}
			<div className="absolute inset-0 pointer-events-none">
				<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
					{/* Trend Line */}
					<path
						d={generateSmoothTrendLinePath()}
						stroke="url(#trendGradient)"
						strokeWidth="0.8"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={`transition-all duration-1000 ease-out ${showTrendLine ? "opacity-100" : "opacity-0"}`}
						style={{
							strokeDasharray: showTrendLine ? "none" : "1000",
							strokeDashoffset: showTrendLine ? "0" : "1000",
						}}
					/>

					{/* Gradients */}
					<defs>
						<linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
							<stop offset="50%" stopColor="#1d4ed8" stopOpacity="1" />
							<stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
						</linearGradient>
					</defs>
				</svg>
			</div>

			{/* Bar Chart */}
			<div className="flex items-end justify-between h-48 gap-2 relative z-10">
				{animatedData.map((value, index) => {
					const percentage = (value / maxValue) * 100;
					return (
						<div key={index} className="flex flex-col items-center gap-2 flex-1">
							<div
								className={`w-full bg-gradient-to-t ${color} rounded-t-lg transition-all duration-700 ease-out hover:from-blue-600 hover:to-blue-500`}
								style={{ height: `${percentage}%` }}
							></div>
							<span className="text-xs text-muted-foreground font-medium">{labels[index]}</span>
							<span className="text-xs text-blue-600 font-semibold">{formatNumber(value)}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function AnimatedProgressBar({
	percentage,
	color = "from-green-500 to-emerald-500",
	delay = 0,
}: {
	percentage: number;
	color?: string;
	delay?: number;
}) {
	const [animatedPercentage, setAnimatedPercentage] = useState(0);
	const { ref: barRef, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView) {
			setTimeout(() => {
				setAnimatedPercentage(percentage);
			}, delay);
		}
	}, [inView, percentage, delay]);

	return (
		<div ref={barRef} className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
			<div
				className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-1000 ease-out`}
				style={{ width: `${animatedPercentage}%` }}
			></div>
		</div>
	);
}

function AnimatedFunnelBar({
	percentage,
	color = "from-orange-500 to-red-500",
	delay = 0,
}: {
	percentage: number;
	color?: string;
	delay?: number;
}) {
	const [animatedPercentage, setAnimatedPercentage] = useState(0);
	const { ref: barRef, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView) {
			setTimeout(() => {
				setAnimatedPercentage(percentage);
			}, delay);
		}
	}, [inView, percentage, delay]);

	return (
		<div ref={barRef} className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
			<div
				className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all duration-1000 ease-out`}
				style={{ width: `${animatedPercentage}%` }}
			></div>
		</div>
	);
}

export default function DashboardCharts() {
	return (
		<>
			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Traffic Overview Chart */}
				<RCard
					cardClassName="border-0 shadow-xl"
					title={
						<RFlex className="items-center gap-2 text-2xl">
							<i className="fas fa-chart-line text-slate-600 text-xl"></i>
							Traffic Overview
						</RFlex>
					}
					description="Website traffic trends over the last 7 days"
					contentComponent={
						<div className="space-y-4">
							{/* Animated Bar Chart with Realistic Traffic Data */}
							<AnimatedBarChart
								data={[12450, 15680, 18920, 17230, 20150, 23480, 19870]}
								labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
								color="from-blue-500 to-blue-400"
							/>
							<div className="space-y-3 pt-4 border-t">
								<RFlex className="justify-between items-center">
									<RFlex className="items-center gap-2">
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										<span className="text-sm text-muted-foreground">Page Views</span>
									</RFlex>
									<div className="text-sm text-green-600 font-semibold">+12.5% from last week</div>
								</RFlex>

								{/* Traffic Insights */}
								<div className="grid grid-cols-2 gap-4 text-xs">
									<div className="space-y-1">
										<RFlex className="justify-between">
											<span className="text-muted-foreground">Peak Day:</span>
											<span className="font-semibold text-green-600">Saturday</span>
										</RFlex>
										<RFlex className="justify-between">
											<span className="text-muted-foreground">Lowest Day:</span>
											<span className="font-semibold text-orange-600">Monday</span>
										</RFlex>
									</div>
									<div className="space-y-1">
										<RFlex className="justify-between">
											<span className="text-muted-foreground">Total Views:</span>
											<span className="font-semibold">127.6K</span>
										</RFlex>
										<RFlex className="justify-between">
											<span className="text-muted-foreground">Avg. Daily:</span>
											<span className="font-semibold">18.2K</span>
										</RFlex>
									</div>
								</div>
							</div>
						</div>
					}
				/>

				{/* Content Performance Chart */}
				<RCard
					cardClassName="border-0 shadow-xl"
					title={
						<RFlex className="items-center gap-2 text-2xl">
							<i className="fas fa-chart-bar text-slate-600 text-xl"></i>
							Content Performance
						</RFlex>
					}
					description="Top performing content by engagement"
					contentComponent={
						<div className="space-y-4">
							{[
								{ title: "Homepage", views: 45600, engagement: 85 },
								{ title: "About Us", views: 28900, engagement: 78 },
								{ title: "Services", views: 23400, engagement: 72 },
								{ title: "Blog: AI Trends 2024", views: 18900, engagement: 68 },
								{ title: "Contact", views: 15200, engagement: 65 },
							].map((item, index) => (
								<div key={index} className="space-y-2">
									<RFlex className="justify-between items-center">
										<span className="text-sm font-medium">{item.title}</span>
										<span className="text-sm text-muted-foreground">{item.views.toLocaleString()} views</span>
									</RFlex>
									<AnimatedProgressBar percentage={item.engagement} color="from-green-500 to-emerald-500" delay={index * 200} />
									<RFlex className="justify-between items-center text-xs text-muted-foreground">
										<span>Engagement Rate</span>
										<span className="text-green-600 font-semibold">{item.engagement}%</span>
									</RFlex>
								</div>
							))}
						</div>
					}
				/>
			</div>

			{/* Additional Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* User Activity Chart */}
				<RCard
					cardClassName="border-0 shadow-xl"
					title={
						<RFlex className="items-center gap-2 text-xl">
							<i className="fas fa-users text-slate-600 text-lg"></i>
							User Activity
						</RFlex>
					}
					description="Active users by hour"
					contentComponent={
						<div className="space-y-3">
							{[
								{ hour: "00:00", users: 45 },
								{ hour: "06:00", users: 89 },
								{ hour: "12:00", users: 234 },
								{ hour: "18:00", users: 189 },
								{ hour: "24:00", users: 67 },
							].map((item, index) => (
								<RFlex key={index} className="items-center gap-3">
									<span className="text-xs text-muted-foreground w-12">{item.hour}</span>
									<AnimatedProgressBar percentage={(item.users / 250) * 100} color="from-purple-500 to-pink-500" delay={index * 150} />
									<span className="text-xs font-semibold text-purple-600 w-8">{item.users}</span>
								</RFlex>
							))}
						</div>
					}
				/>

				{/* Device Analytics */}
				<RCard
					cardClassName="border-0 shadow-xl"
					title={
						<RFlex className="items-center gap-2 text-xl">
							<i className="fas fa-desktop text-slate-600 text-lg"></i>
							Device Analytics
						</RFlex>
					}
					description="Traffic by device type"
					contentComponent={
						<div className="space-y-4">
							{[
								{ device: "Desktop", percentage: 45, color: "bg-blue-500", gradient: "from-blue-500 to-blue-600" },
								{ device: "Mobile", percentage: 38, color: "bg-green-500", gradient: "from-green-500 to-green-600" },
								{ device: "Tablet", percentage: 17, color: "bg-purple-500", gradient: "from-purple-500 to-purple-600" },
							].map((item, index) => (
								<div key={index} className="space-y-2">
									<RFlex className="justify-between items-center">
										<RFlex className="items-center gap-2">
											<div className={`w-3 h-3 ${item.color} rounded-full`}></div>
											<span className="text-sm font-medium">{item.device}</span>
										</RFlex>
										<span className="text-sm font-semibold">{item.percentage}%</span>
									</RFlex>
									<AnimatedProgressBar percentage={item.percentage} color={item.gradient} delay={index * 200} />
								</div>
							))}
						</div>
					}
				/>

				{/* Conversion Funnel */}
				<RCard
					cardClassName="border-0 shadow-xl"
					title={
						<RFlex className="items-center gap-2 text-xl">
							<i className="fas fa-funnel-dollar text-slate-600 text-lg"></i>
							Conversion Funnel
						</RFlex>
					}
					description="User journey analysis"
					contentComponent={
						<div className="space-y-3">
							{[
								{ step: "Visitors", count: 127600, percentage: 100 },
								{ step: "Page Views", count: 95600, percentage: 75 },
								{ step: "Engagement", count: 40800, percentage: 32 },
								{ step: "Leads", count: 5740, percentage: 4.5 },
								{ step: "Conversions", count: 1136, percentage: 0.89 },
							].map((item, index) => (
								<div key={index} className="relative">
									<RFlex className="justify-between items-center mb-1">
										<span className="text-sm font-medium">{item.step}</span>
										<span className="text-sm font-semibold text-orange-600">{item.count.toLocaleString()}</span>
									</RFlex>
									<AnimatedFunnelBar percentage={item.percentage} color="from-orange-500 to-red-500" delay={index * 300} />
									<span className="text-xs text-muted-foreground">{item.percentage}%</span>
								</div>
							))}
						</div>
					}
				/>
			</div>
		</>
	);
}
