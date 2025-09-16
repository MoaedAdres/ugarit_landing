"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
	Upload, 
	Download, 
	Trash2, 
	Edit, 
	Eye, 
	Copy, 
	Search, 
	Filter, 
	Grid3X3, 
	List, 
	FolderPlus, 
	Image, 
	Video, 
	FileText, 
	Music, 
	File, 
	HardDrive,
	X,
	Plus,
	MoreHorizontal,
	Share2,
	Star,
	Calendar,
	Tag
} from "lucide-react";

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
			return Image;
		case "video":
			return Video;
		case "document":
			return FileText;
		case "audio":
			return Music;
		default:
			return File;
	}
};

const getFileTypeColor = (type: string) => {
	switch (type) {
		case "image":
			return "bg-blue-500";
		case "video":
			return "bg-purple-500";
		case "document":
			return "bg-red-500";
		case "audio":
			return "bg-green-500";
		default:
			return "bg-gray-500";
	}
};

// Media Preview Modal Component
function MediaPreviewModal({ 
	file, 
	onClose 
}: { 
	file: MediaFile; 
	onClose: () => void; 
}) {
	const IconComponent = getFileIcon(file.type);
	
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl flex items-center justify-center">
						<IconComponent className="h-8 w-8 text-orange-600 dark:text-orange-400" />
					</div>
					<div>
						<h3 className="text-2xl font-semibold">{file.name}</h3>
						<p className="text-lg text-muted-foreground">{file.type} • {file.size}</p>
						<div className="flex items-center gap-2 mt-2">
							<Badge className={getFileTypeColor(file.type)}>{file.type}</Badge>
							{file.dimensions && <Badge variant="outline">{file.dimensions}</Badge>}
						</div>
					</div>
				</div>
				<Button variant="outline" onClick={onClose} size="lg">
					<X className="h-4 w-4 mr-2" />
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-xl">Preview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="aspect-video bg-muted rounded-lg overflow-hidden">
							{file.type === "image" ? (
								<img 
									src={file.url} 
									alt={file.altText || file.name} 
									className="w-full h-full object-cover"
								/>
							) : file.type === "video" ? (
								<video 
									src={file.url} 
									controls 
									className="w-full h-full"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<IconComponent className="h-16 w-16 text-muted-foreground" />
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-xl">File Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center gap-4">
							<Calendar className="h-5 w-5 text-blue-600" />
							<div>
								<p className="font-medium">Upload Date</p>
								<p className="text-muted-foreground">{file.uploadDate}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<HardDrive className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium">File Size</p>
								<p className="text-muted-foreground">{file.size}</p>
							</div>
						</div>
						{file.dimensions && (
							<div className="flex items-center gap-4">
								<Image className="h-5 w-5 text-purple-600" />
								<div>
									<p className="font-medium">Dimensions</p>
									<p className="text-muted-foreground">{file.dimensions}</p>
								</div>
							</div>
						)}
						{file.altText && (
							<div>
								<Label className="text-sm font-medium">Alt Text</Label>
								<p className="text-muted-foreground mt-1">{file.altText}</p>
							</div>
						)}
						{file.caption && (
							<div>
								<Label className="text-sm font-medium">Caption</Label>
								<p className="text-muted-foreground mt-1">{file.caption}</p>
							</div>
						)}
						<div>
							<Label className="text-sm font-medium">Tags</Label>
							<div className="flex flex-wrap gap-2 mt-2">
								{file.tags.map((tag: string) => (
									<Badge key={tag} variant="secondary" className="text-xs">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex gap-4">
				<Button size="lg" className="flex-1">
					<Download className="h-5 w-5 mr-2" />
					Download
				</Button>
				<Button variant="outline" size="lg" className="flex-1">
					<Copy className="h-5 w-5 mr-2" />
					Copy Link
				</Button>
				<Button variant="outline" size="lg" className="flex-1">
					<Share2 className="h-5 w-5 mr-2" />
					Share
				</Button>
			</div>
		</div>
	);
}

// Edit Media Modal Component
function EditMediaModal({ 
	file, 
	onSave, 
	onClose 
}: { 
	file: MediaFile; 
	onSave: (data: any) => void; 
	onClose: () => void; 
}) {
	const [formData, setFormData] = useState({
		name: file.name,
		altText: file.altText || "",
		caption: file.caption || "",
		tags: file.tags.join(", "),
	});

	const handleSave = () => {
		const updatedFile = {
			...file,
			...formData,
			tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
		};
		onSave(updatedFile);
		onClose();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold">Edit Media File</h3>
					<p className="text-muted-foreground">Update file metadata and properties</p>
				</div>
				<Button variant="outline" onClick={onClose}>
					<X className="h-4 w-4 mr-2" />
					Close
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">File Preview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="aspect-square bg-muted rounded-lg overflow-hidden">
							<img 
								src={file.url} 
								alt={file.altText || file.name} 
								className="w-full h-full object-cover"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Edit Properties</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="filename" className="text-sm font-medium">File Name</Label>
							<Input 
								id="filename" 
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="h-11"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="alt-text" className="text-sm font-medium">Alt Text</Label>
							<Input 
								id="alt-text" 
								value={formData.altText}
								onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
								className="h-11"
								placeholder="Describe the image for accessibility"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="caption" className="text-sm font-medium">Caption</Label>
							<Textarea 
								id="caption" 
								value={formData.caption}
								onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
								rows={3}
								className="resize-none"
								placeholder="Add a caption for this media"
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
							<Input 
								id="tags" 
								value={formData.tags}
								onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
								className="h-11"
								placeholder="Separate tags with commas"
							/>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex gap-3">
				<Button onClick={handleSave} size="lg" className="flex-1">
					Save Changes
				</Button>
				<Button variant="outline" onClick={onClose} size="lg">
					Cancel
				</Button>
			</div>
		</div>
	);
}

export function MediaLibrary() {
	const [mediaData, setMediaData] = useState(mediaFiles);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<string>("all");
	const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
	const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const filteredFiles = mediaData.filter((file) => {
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

	const handleDeleteFile = (fileId: string) => {
		setMediaData(prev => prev.filter(file => file.id !== fileId));
		setSelectedFiles(prev => prev.filter(id => id !== fileId));
	};

	const handleBulkDelete = () => {
		setMediaData(prev => prev.filter(file => !selectedFiles.includes(file.id)));
		setSelectedFiles([]);
	};

	const handleBulkDownload = () => {
		// Here you would implement bulk download logic
		alert(`Downloading ${selectedFiles.length} files...`);
	};

	const handleEditFile = (updatedFile: MediaFile) => {
		setMediaData(prev => prev.map(file => file.id === updatedFile.id ? updatedFile : file));
	};

	const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		setIsUploading(true);
		// Simulate upload process
		setTimeout(() => {
			const newFiles: MediaFile[] = Array.from(files).map((file, index) => ({
				id: (mediaData.length + index + 1).toString(),
				name: file.name,
				type: file.type.startsWith('image/') ? 'image' : 
					  file.type.startsWith('video/') ? 'video' : 
					  file.type.startsWith('audio/') ? 'audio' : 'document',
				size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
				uploadDate: new Date().toISOString().split('T')[0],
				dimensions: file.type.startsWith('image/') ? '1920x1080' : undefined,
				tags: [],
				url: URL.createObjectURL(file),
			}));
			
			setMediaData(prev => [...prev, ...newFiles]);
			setIsUploading(false);
		}, 2000);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			handleUpload({ target: { files } } as any);
		}
	};

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-2xl border border-orange-500/20">
							<Image className="h-6 w-6 text-orange-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
							<p className="text-muted-foreground">Manage your images, videos, and documents</p>
						</div>
					</div>
				</div>
			</div>

			{/* Enhanced Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
								<Image className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Files</p>
								<p className="text-2xl font-bold">{mediaData.length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
								<Video className="h-6 w-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Images</p>
								<p className="text-2xl font-bold">{mediaData.filter(f => f.type === "image").length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center">
								<FileText className="h-6 w-6 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Documents</p>
								<p className="text-2xl font-bold">{mediaData.filter(f => f.type === "document").length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center">
								<HardDrive className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Storage Used</p>
								<p className="text-2xl font-bold">2.4 GB</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Search and Filter */}
			<Card className="border-0 shadow-lg">
				<CardContent className="p-6">
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 flex-1">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search files..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-11"
								/>
							</div>
							<Select value={filterType} onValueChange={setFilterType}>
								<SelectTrigger className="w-full sm:w-40 h-11">
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
						<div className="flex gap-3">
							{selectedFiles.length > 0 && (
								<div className="flex gap-2 items-center">
									<span className="text-sm text-muted-foreground">{selectedFiles.length} selected</span>
									<Button variant="outline" onClick={handleBulkDownload} size="lg">
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
									<Button variant="outline" onClick={handleBulkDelete} size="lg" className="text-red-600 hover:text-red-700">
										<Trash2 className="h-4 w-4 mr-2" />
										Delete
									</Button>
								</div>
							)}
							<div className="flex border rounded-md">
								<Button 
									variant={viewMode === "grid" ? "default" : "ghost"} 
									size="sm" 
									onClick={() => setViewMode("grid")}
								>
									<Grid3X3 className="h-4 w-4" />
								</Button>
								<Button 
									variant={viewMode === "list" ? "default" : "ghost"} 
									size="sm" 
									onClick={() => setViewMode("list")}
								>
									<List className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced File Grid/List */}
			{viewMode === "grid" ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
					{filteredFiles.map((file) => {
						const IconComponent = getFileIcon(file.type);
						return (
							<Card key={file.id} className="group cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg">
								<CardContent className="p-4">
									<div className="relative">
										<div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
											{file.type === "image" ? (
												<img 
													src={file.url} 
													alt={file.altText || file.name} 
													className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center">
													<IconComponent className="h-12 w-12 text-muted-foreground" />
												</div>
											)}
										</div>
										<Checkbox
											checked={selectedFiles.includes(file.id)}
											onCheckedChange={() => handleSelectFile(file.id)}
											className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm"
										/>
										<Badge className={`absolute top-3 right-3 ${getFileTypeColor(file.type)} text-white`}>
											{file.type}
										</Badge>
									</div>

									<div className="space-y-2">
										<p className="text-sm font-medium truncate" title={file.name}>
											{file.name}
										</p>
										<div className="flex justify-between items-center text-xs text-muted-foreground">
											<span>{file.size}</span>
											{file.dimensions && <span>{file.dimensions}</span>}
										</div>
										<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
											<Button 
												size="sm" 
												variant="outline"
												onClick={() => setPreviewFile(file)}
											>
												<Eye className="h-3 w-3" />
											</Button>
											<Button 
												size="sm" 
												variant="outline"
												onClick={() => setEditingFile(file)}
											>
												<Edit className="h-3 w-3" />
											</Button>
											<Button 
												size="sm" 
												variant="outline"
												onClick={() => handleDeleteFile(file.id)}
												className="text-red-600 hover:text-red-700"
											>
												<Trash2 className="h-3 w-3" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			) : (
				<Card className="border-0 shadow-lg">
					<CardHeader>
						<div className="flex justify-between items-center">
							<CardTitle className="text-xl">Files</CardTitle>
							<Checkbox 
								checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0} 
								onCheckedChange={handleSelectAll} 
							/>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{filteredFiles.map((file) => {
								const IconComponent = getFileIcon(file.type);
								return (
									<div key={file.id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors">
										<Checkbox 
											checked={selectedFiles.includes(file.id)} 
											onCheckedChange={() => handleSelectFile(file.id)} 
										/>
										<div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl flex items-center justify-center">
											<IconComponent className="h-6 w-6 text-orange-600" />
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
										<div className="flex gap-2">
											<Button 
												size="sm" 
												variant="outline"
												onClick={() => setPreviewFile(file)}
											>
												<Eye className="h-4 w-4" />
											</Button>
											<Button 
												size="sm" 
												variant="outline"
												onClick={() => setEditingFile(file)}
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button 
												size="sm" 
												variant="outline"
												onClick={() => handleDeleteFile(file.id)}
												className="text-red-600 hover:text-red-700"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Enhanced Upload Area */}
			<Card 
				className="border-dashed border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<CardContent className="p-12 text-center">
					<div className="space-y-6">
						<div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl mx-auto flex items-center justify-center">
							<Upload className="h-10 w-10 text-orange-600" />
						</div>
						<div>
							<h3 className="text-xl font-semibold mb-2">Drop files here to upload</h3>
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
						<Button 
							size="lg"
							onClick={() => fileInputRef.current?.click()}
							disabled={isUploading}
						>
							{isUploading ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Uploading...
								</>
							) : (
								<>
									<Upload className="h-4 w-4 mr-2" />
									Choose Files
								</>
							)}
						</Button>
						<input
							ref={fileInputRef}
							type="file"
							multiple
							onChange={handleUpload}
							className="hidden"
							accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Media Preview Modal */}
			<Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
				<DialogContent className="!max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Media Preview</DialogTitle>
						</DialogHeader>
						{previewFile && (
							<MediaPreviewModal
								file={previewFile}
								onClose={() => setPreviewFile(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Edit Media Modal */}
			<Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
				<DialogContent className="!max-w-5xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
					<div className="p-6">
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl">Edit Media File</DialogTitle>
						</DialogHeader>
						{editingFile && (
							<EditMediaModal
								file={editingFile}
								onSave={handleEditFile}
								onClose={() => setEditingFile(null)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
