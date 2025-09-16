"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface MediaFile {
	id: string;
	name: string;
	type: "image" | "video" | "document" | "audio";
	size: string;
	uploadDate: string;
	dimensions?: string;
	altText?: string;
	caption?: string;
	tags: string[];
	url: string;
}

const mediaFiles: MediaFile[] = [
	{
		id: "1",
		name: "hero-banner.jpg",
		type: "image",
		size: "2.4 MB",
		uploadDate: "2024-01-15",
		dimensions: "1920x1080",
		altText: "Modern office building",
		caption: "Our headquarters in downtown",
		tags: ["hero", "office", "building"],
		url: "/modern-office-building.png",
	},
	{
		id: "2",
		name: "product-demo.mp4",
		type: "video",
		size: "15.2 MB",
		uploadDate: "2024-01-14",
		dimensions: "1280x720",
		caption: "Product demonstration video",
		tags: ["demo", "product", "video"],
		url: "/video-player-interface.jpg",
	},
	{
		id: "3",
		name: "company-brochure.pdf",
		type: "document",
		size: "1.8 MB",
		uploadDate: "2024-01-13",
		caption: "Company overview brochure",
		tags: ["brochure", "company", "marketing"],
		url: "/pdf-document-icon.jpg",
	},
	{
		id: "4",
		name: "team-photo.jpg",
		type: "image",
		size: "3.1 MB",
		uploadDate: "2024-01-12",
		dimensions: "2048x1365",
		altText: "Team members in conference room",
		caption: "Our amazing team",
		tags: ["team", "people", "office"],
		url: "/team-meeting-in-conference-room.jpg",
	},
	{
		id: "5",
		name: "podcast-episode-1.mp3",
		type: "audio",
		size: "45.6 MB",
		uploadDate: "2024-01-11",
		caption: "First episode of our tech podcast",
		tags: ["podcast", "audio", "tech"],
		url: "/audio-waveform-visualization.png",
	},
	{
		id: "6",
		name: "service-icon-1.svg",
		type: "image",
		size: "12 KB",
		uploadDate: "2024-01-10",
		dimensions: "64x64",
		altText: "Web development service icon",
		tags: ["icon", "service", "web"],
		url: "/web-development-icon.jpg",
	},
];

const getFileIcon = (type: string) => {
	switch (type) {
		case "image":
			return "fas fa-image";
		case "video":
			return "fas fa-video";
		case "document":
			return "fas fa-file-pdf";
		case "audio":
			return "fas fa-music";
		default:
			return "fas fa-file";
	}
};

const getFileTypeColor = (type: string) => {
	switch (type) {
		case "image":
			return "bg-blue-100 text-blue-800";
		case "video":
			return "bg-purple-100 text-purple-800";
		case "document":
			return "bg-red-100 text-red-800";
		case "audio":
			return "bg-green-100 text-green-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function MediaLibrary() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<string>("all");
	const [editingFile, setEditingFile] = useState<MediaFile | null>(null);

	const filteredFiles = mediaFiles.filter((file) => {
		const matchesSearch =
			file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		const matchesType = filterType === "all" || file.type === filterType;
		return matchesSearch && matchesType;
	});

	const handleSelectFile = (fileId: string) => {
		setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]));
	};

	const handleSelectAll = () => {
		setSelectedFiles(selectedFiles.length === filteredFiles.length ? [] : filteredFiles.map((file) => file.id));
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Media Library</h2>
					<p className="text-muted-foreground">Manage your images, videos, and documents</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<i className="fas fa-folder-plus mr-2 h-4 w-4" />
						New Folder
					</Button>
					<Button>
						<i className="fas fa-upload mr-2 h-4 w-4" />
						Upload Files
					</Button>
				</div>
			</div>

			{/* Filters and Search */}
			<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
				<div className="flex gap-4 items-center">
					<Input placeholder="Search files..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-64" />
					<Select value={filterType} onValueChange={setFilterType}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							<SelectItem value="image">Images</SelectItem>
							<SelectItem value="video">Videos</SelectItem>
							<SelectItem value="document">Documents</SelectItem>
							<SelectItem value="audio">Audio</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex gap-2 items-center">
					{selectedFiles.length > 0 && (
						<div className="flex gap-2 items-center">
							<span className="text-sm text-muted-foreground">{selectedFiles.length} selected</span>
							<Button size="sm" variant="outline">
								<i className="fas fa-download mr-2 h-4 w-4" />
								Download
							</Button>
							<Button size="sm" variant="outline">
								<i className="fas fa-trash mr-2 h-4 w-4" />
								Delete
							</Button>
						</div>
					)}
					<div className="flex border rounded-md">
						<Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
							<i className="fas fa-th h-4 w-4" />
						</Button>
						<Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
							<i className="fas fa-list h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Storage Usage */}
			<Card>
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<i className="fas fa-hdd h-5 w-5 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Storage Usage</p>
								<p className="text-xs text-muted-foreground">2.4 GB of 10 GB used</p>
							</div>
						</div>
						<div className="w-32 bg-muted rounded-full h-2">
							<div className="bg-primary h-2 rounded-full" style={{ width: "24%" }} />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* File Grid/List */}
			{viewMode === "grid" ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
					{filteredFiles.map((file) => (
						<Card key={file.id} className="group cursor-pointer hover:shadow-md transition-shadow">
							<CardContent className="p-3">
								<div className="relative">
									<div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
										<img src={file.url || "/placeholder.svg"} alt={file.altText || file.name} className="w-full h-full object-cover" />
									</div>
									<Checkbox
										checked={selectedFiles.includes(file.id)}
										onCheckedChange={() => handleSelectFile(file.id)}
										className="absolute top-2 left-2 bg-white"
									/>
									<Badge className={`absolute top-2 right-2 ${getFileTypeColor(file.type)}`}>
										<i className={`${getFileIcon(file.type)} mr-1 h-3 w-3`} />
										{file.type}
									</Badge>
								</div>

								<div className="space-y-1">
									<p className="text-sm font-medium truncate" title={file.name}>
										{file.name}
									</p>
									<div className="flex justify-between items-center text-xs text-muted-foreground">
										<span>{file.size}</span>
										{file.dimensions && <span>{file.dimensions}</span>}
									</div>
									<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
										<Dialog>
											<DialogTrigger asChild>
												<Button size="sm" variant="outline" onClick={() => setEditingFile(file)}>
													<i className="fas fa-edit h-3 w-3" />
												</Button>
											</DialogTrigger>
											<DialogContent className="max-w-md">
												<DialogHeader>
													<DialogTitle>Edit Media File</DialogTitle>
													<DialogDescription>Update file metadata and properties</DialogDescription>
												</DialogHeader>
												{editingFile && (
													<div className="space-y-4">
														<div>
															<Label htmlFor="filename">File Name</Label>
															<Input id="filename" defaultValue={editingFile.name} />
														</div>
														<div>
															<Label htmlFor="alt-text">Alt Text</Label>
															<Input id="alt-text" defaultValue={editingFile.altText} />
														</div>
														<div>
															<Label htmlFor="caption">Caption</Label>
															<Textarea id="caption" defaultValue={editingFile.caption} />
														</div>
														<div>
															<Label htmlFor="tags">Tags</Label>
															<Input id="tags" defaultValue={editingFile.tags.join(", ")} />
														</div>
														<div className="flex justify-end gap-2">
															<Button variant="outline">Cancel</Button>
															<Button>Save Changes</Button>
														</div>
													</div>
												)}
											</DialogContent>
										</Dialog>
										<Button size="sm" variant="outline">
											<i className="fas fa-link h-3 w-3" />
										</Button>
										<Button size="sm" variant="outline">
											<i className="fas fa-download h-3 w-3" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card>
					<CardHeader>
						<div className="flex justify-between items-center">
							<CardTitle>Files</CardTitle>
							<Checkbox checked={selectedFiles.length === filteredFiles.length} onCheckedChange={handleSelectAll} />
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{filteredFiles.map((file) => (
								<div key={file.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50">
									<Checkbox checked={selectedFiles.includes(file.id)} onCheckedChange={() => handleSelectFile(file.id)} />
									<div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
										<i className={`${getFileIcon(file.type)} text-lg text-muted-foreground`} />
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium truncate">{file.name}</p>
										<div className="flex gap-4 text-sm text-muted-foreground">
											<span>{file.size}</span>
											{file.dimensions && <span>{file.dimensions}</span>}
											<span>Uploaded {file.uploadDate}</span>
										</div>
									</div>
									<div className="flex gap-2">
										<Badge className={getFileTypeColor(file.type)}>{file.type}</Badge>
									</div>
									<div className="flex gap-1">
										<Button size="sm" variant="outline">
											<i className="fas fa-edit h-4 w-4" />
										</Button>
										<Button size="sm" variant="outline">
											<i className="fas fa-download h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Upload Area */}
			<Card className="border-dashed border-2 border-muted-foreground/25">
				<CardContent className="p-8 text-center">
					<div className="space-y-4">
						<div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
							<i className="fas fa-cloud-upload-alt text-2xl text-muted-foreground" />
						</div>
						<div>
							<h3 className="text-lg font-medium">Drop files here to upload</h3>
							<p className="text-muted-foreground">or click to browse your computer</p>
						</div>
						<div className="flex justify-center gap-2 text-sm text-muted-foreground">
							<span>Supports:</span>
							<Badge variant="outline">JPG</Badge>
							<Badge variant="outline">PNG</Badge>
							<Badge variant="outline">MP4</Badge>
							<Badge variant="outline">PDF</Badge>
							<Badge variant="outline">MP3</Badge>
						</div>
						<Button>
							<i className="fas fa-upload mr-2 h-4 w-4" />
							Choose Files
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
