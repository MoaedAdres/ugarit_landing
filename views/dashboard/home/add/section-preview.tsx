"use client";

import { SectionFormData } from "@/api/services/dashboard/home/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

interface SectionPreviewProps {
	data: SectionFormData;
}

export const SectionPreview = ({ data }: SectionPreviewProps) => {
	return (
		<div className="space-y-4">
			{/* Status Badge */}
			<div className="flex items-center gap-2">
				{data.is_hidden ? (
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
			</div>

			{/* Language Preview Tabs */}
			<Tabs defaultValue="en" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="en">English</TabsTrigger>
					<TabsTrigger value="ar">Arabic</TabsTrigger>
					<TabsTrigger value="fr">French</TabsTrigger>
				</TabsList>

				<TabsContent value="en" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">{data.en.title || "No title set"}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground whitespace-pre-wrap">
								{data.en.description || "No description set"}
							</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="ar" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg" dir="rtl">
								{data.ar.title || "لم يتم تعيين عنوان"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground whitespace-pre-wrap" dir="rtl">
								{data.ar.description || "لم يتم تعيين وصف"}
							</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="fr" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">{data.fr.title || "Aucun titre défini"}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground whitespace-pre-wrap">
								{data.fr.description || "Aucune description définie"}
							</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};
