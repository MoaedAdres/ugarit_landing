"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/use-fetch-data";
import { homeRepository } from "@/api/services/dashboard/home";
import { Section, SectionFormData } from "@/api/services/dashboard/home/interfaces";
import { SectionActions } from "./section-actions";
import { EditSectionForm } from "./edit-section-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Eye, EyeOff, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SectionDetailsProps {
	sectionId: number;
}

export const SectionDetails = ({ sectionId }: SectionDetailsProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isEditMode = searchParams.get('isEdit') === 'true';

	const { data, isLoading, error } = useFetchData({
		queryKey: ["section", sectionId],
		queryFn: () => homeRepository.getSection(sectionId),
	});

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 w-20" />
					<div>
						<Skeleton className="h-8 w-64" />
						<Skeleton className="h-4 w-96 mt-2" />
					</div>
				</div>
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4 mt-2" />
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error || !data?.data) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
					Section Not Found
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mb-4">
					The section you're looking for doesn't exist or has been removed.
				</p>
				<Button onClick={() => router.push("/dashboard/home")}>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to Sections
				</Button>
			</div>
		);
	}

	const section: Section = data.data;

	const convertToFormData = (section: Section): SectionFormData => {
		const translations = section.translations.reduce((acc, translation) => {
			acc[translation.locale as keyof Omit<SectionFormData, "is_hidden">] = {
				title: translation.title,
				description: translation.description,
			};
			return acc;
		}, {} as Omit<SectionFormData, "is_hidden">);

		return {
			...translations,
			is_hidden: section.is_hidden === 1,
		};
	};

	const handleExitEditMode = () => {
		router.push(`/dashboard/home/${sectionId}`);
	};

	if (isEditMode) {
		return (
			<EditSectionForm
				section={section}
				formData={convertToFormData(section)}
				onExitEdit={handleExitEditMode}
			/>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.back()}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</Button>
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							{section.title}
						</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-1">
							Section ID: {section.id}
						</p>
					</div>
				</div>
				<SectionActions
					section={section}
					onEdit={() => router.push(`/dashboard/home/${sectionId}?isEdit=true`)}
				/>
			</div>

			{/* Status and Metadata */}
			<div className="flex items-center gap-4">
				{section.is_hidden === 1 ? (
					<Badge variant="secondary" className="flex items-center gap-1">
						<EyeOff className="h-3 w-3" />
						Hidden
					</Badge>
				) : (
					<Badge variant="default" className="flex items-center gap-1">
						<Eye className="h-3 w-3" />
						Visible
					</Badge>
				)}
				<Badge variant="outline" className="flex items-center gap-1">
					<Calendar className="h-3 w-3" />
					Created: {new Date(section.created_at).toLocaleDateString()}
				</Badge>
				<Badge variant="outline" className="flex items-center gap-1">
					<Globe className="h-3 w-3" />
					{section.translations.length} languages
				</Badge>
			</div>

			{/* Content Tabs */}
			<Tabs defaultValue="en" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="en">English</TabsTrigger>
					<TabsTrigger value="ar">Arabic</TabsTrigger>
					<TabsTrigger value="fr">French</TabsTrigger>
				</TabsList>

				{section.translations.map((translation) => (
					<TabsContent key={translation.locale} value={translation.locale} className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-xl">{translation.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground whitespace-pre-wrap">
									{translation.description}
								</p>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};
