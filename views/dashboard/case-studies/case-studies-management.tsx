"use client";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { myIcons } from "@/constants/icons";
import { useState } from "react";
import { caseStudiesRepository } from "@/api/services/dashboard/case-studies";
import { CaseStudy } from "@/api/services/dashboard/case-studies/interfaces";
import { CaseStudyData } from "./types";
import CaseStudiesGrid from "./CaseStudiesGrid";
import { useRouter } from "next/navigation";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutateData } from "@/hooks/use-mutate-data";

export default function CaseStudiesManagement() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([]);
	const router = useRouter();

	// Transform API data to component data
	const transformCaseStudyData = (apiData: CaseStudy): CaseStudyData => {
		const englishTranslation = apiData.translations.find(t => t.locale === 'en') || apiData.translations[0];
		const testimonial = apiData.testimonial;
		
		return {
			id: apiData.id.toString(),
			client_name: apiData.client_name,
			sector: englishTranslation?.sector || apiData.sector,
			problem: englishTranslation?.problem || apiData.problem,
			solution: englishTranslation?.solution || apiData.solution,
			status: apiData.status,
			order: apiData.order,
			logo: apiData.logo?.[0]?.url,
			images: apiData.images?.map(img => img.url),
			results_kpis: englishTranslation?.results_kpis || apiData.results_kpis,
			testimonial: testimonial ? {
				name: testimonial.name,
				role: testimonial.role,
				company: testimonial.company,
				quote: testimonial.quote
			} : undefined,
			translations: apiData.translations,
			lastUpdated: new Date(apiData.updated_at).toLocaleDateString(),
			href: `/dashboard/case-studies/${apiData.id}`
		};
	};

	// Fetch case studies using hook
	const { data: caseStudiesData, isLoading: loading, refetch } = useFetchData({
		queryKey: ["case-studies"],
		queryFn: caseStudiesRepository.getCaseStudies,
		onSuccessFn: (data) => {
			const transformedData = data.data.map(transformCaseStudyData);
			setCaseStudies(transformedData);
		}
	});

	// Reorder mutation
	const reorderMutation = useMutateData({
		mutationFn: caseStudiesRepository.reorderCaseStudies,
		onSuccessFn: () => {
			// Success handled by optimistic update
		},
		onErrorFn: () => {
			// Revert on error
			refetch();
		}
	});

	// Delete mutation
	const deleteMutation = useMutateData({
		mutationFn: caseStudiesRepository.deleteCaseStudy,
		onSuccessFn: () => {
			refetch();
		},
		displaySuccess: true
	});

	// Handle reordering
	const handleCaseStudiesChange = (newCaseStudies: CaseStudyData[] | ((prev: CaseStudyData[]) => CaseStudyData[])) => {
		const updatedCaseStudies = typeof newCaseStudies === 'function' ? newCaseStudies(caseStudies) : newCaseStudies;
		setCaseStudies(updatedCaseStudies);
		
		// Send reorder request to API
		const orderedIds = updatedCaseStudies.map(cs => parseInt(cs.id));
		reorderMutation.mutate(orderedIds);
	};

	// Handle delete
	const handleDeleteCaseStudy = (caseStudyId: string) => {
		deleteMutation.mutate(parseInt(caseStudyId));
	};

	return (
		<div className="space-y-8">
			{/* Hero Header Section */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative z-10">
					<RFlex className="items-start justify-between mb-6">
						<div className="space-y-4">
							<RFlex className="items-center gap-3">
								<div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl">
									<i className={`${myIcons.target} h-6 w-6`} />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Case Studies</h1>
									<p className="text-indigo-100">Showcase your success stories</p>
								</div>
							</RFlex>
							<RFlex className="items-center gap-6 text-sm">
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									<span>{caseStudies.filter((cs) => cs.status === "published").length} Published</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
									<span>{caseStudies.filter((cs) => cs.testimonial).length} With Testimonials</span>
								</RFlex>
								<RFlex className="items-center gap-2">
									<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
									<span>{caseStudies.length} Total</span>
								</RFlex>
							</RFlex>
						</div>
						<RButton
							size="lg"
							className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
							onClick={() => router.push("/dashboard/case-studies/add")}
							icon={<i className={`${myIcons.plus} h-4 w-4`} />}
							text="Create Case Study"
						/>
					</RFlex>
				</div>
				{/* Decorative elements */}
				<div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
			</div>

			{/* Search and Filter Section */}
			<RFlex className="flex-col lg:flex-row gap-4">
				{/* Search Bar */}
				<div className="flex-1">
					<div className="relative">
						<i className={`${myIcons.search} absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
						<Input
							type="text"
							placeholder="Search case studies..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
					</div>
				</div>

				{/* Filter Pills */}
				<RFlex className="items-center gap-2">
					<i className={`${myIcons.filter} h-4 w-4 text-muted-foreground`} />
					<RFlex className="gap-2">
						{["all", "published", "drafts", "featured"].map((filter) => (
							<button
								key={filter}
								onClick={() => setSelectedFilter(filter)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
									selectedFilter === filter
										? "bg-primary text-primary-foreground shadow-md"
										: "bg-muted text-muted-foreground hover:bg-muted/80"
								}`}
							>
								{filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						))}
					</RFlex>
				</RFlex>
			</RFlex>

			{/* Case Studies Grid */}
			{loading ? (
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<i className="fas fa-spinner fa-spin h-8 w-8 text-muted-foreground mb-4"></i>
						<p className="text-muted-foreground">Loading case studies...</p>
								</div>
							</div>
			) : (
				<CaseStudiesGrid
					caseStudies={caseStudies}
					onCaseStudiesChange={handleCaseStudiesChange}
					onDeleteCaseStudy={handleDeleteCaseStudy}
				/>
			)}

			{/* Performance Analytics Section */}
			<div className="space-y-6">
				<RFlex className="items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
						<i className={`${myIcons.chart} h-5 w-5 text-white`} />
					</div>
					<div>
						<h2 className="text-xl font-bold">Performance Analytics</h2>
						<p className="text-sm text-muted-foreground">Track your case study success</p>
					</div>
				</RFlex>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Total Studies */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{caseStudies.length}</div>
										<p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Studies</p>
										<p className="text-xs text-blue-600/70 dark:text-blue-400/70">All case studies</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
										<i className={`${myIcons.target} h-6 w-6 text-blue-600 dark:text-blue-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Published */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-green-600 dark:text-green-400">
											{caseStudies.filter((cs) => cs.status === "published").length}
										</div>
										<p className="text-sm font-medium text-green-800 dark:text-green-200">Published</p>
										<p className="text-xs text-green-600/70 dark:text-green-400/70">Live on website</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl">
										<i className={`${myIcons.calendar} h-6 w-6 text-green-600 dark:text-green-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Featured */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
											{caseStudies.filter((cs) => cs.testimonial).length}
										</div>
										<p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">With Testimonials</p>
										<p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Client testimonials</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
										<i className={`${myIcons.star} h-6 w-6 text-yellow-600 dark:text-yellow-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>

					{/* Total Views */}
					<RCard
						cardClassName="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
						contentComponent={
							<div className="p-6">
								<RFlex className="items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
											{caseStudies.filter((cs) => cs.status === "published").length}
										</div>
										<p className="text-sm font-medium text-purple-800 dark:text-purple-200">Published</p>
										<p className="text-xs text-purple-600/70 dark:text-purple-400/70">Live case studies</p>
									</div>
									<div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
										<i className={`${myIcons.trendingUp} h-6 w-6 text-purple-600 dark:text-purple-400`} />
									</div>
								</RFlex>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
}
