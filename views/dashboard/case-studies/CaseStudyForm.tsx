"use client";

import { useState } from "react";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RSelect from "@/RComponents/RSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

export interface CaseStudyFormData {
    client_name: string;
    testimonial_id: number;
    status: "draft" | "published";
    order: number;
    en: {
        sector: string;
        problem: string;
        solution: string;
        body_blocks: string[];
        results_kpis: Record<string, string>;
    };
    ar: {
        sector: string;
        problem: string;
        solution: string;
        body_blocks: string[];
        results_kpis: Record<string, string>;
    };
    fr: {
        sector: string;
        problem: string;
        solution: string;
        body_blocks: string[];
        results_kpis: Record<string, string>;
    };
    logo?: File;
    gallery?: File[];
}

interface CaseStudyFormProps {
    formData: CaseStudyFormData;
    setFormData: (data: CaseStudyFormData) => void;
    onSubmit: (formData: FormData) => void;
    isLoading?: boolean;
    isEdit?: boolean;
}

export function CaseStudyForm({ formData, setFormData, onSubmit, isLoading = false, isEdit = false }: CaseStudyFormProps) {
    const [activeTab, setActiveTab] = useState<'en' | 'ar' | 'fr'>('en');
    const [newBodyBlock, setNewBodyBlock] = useState("");
    const [newKpiKey, setNewKpiKey] = useState("");
    const [newKpiValue, setNewKpiValue] = useState("");

    const addBodyBlock = (locale: 'en' | 'ar' | 'fr') => {
        if (newBodyBlock.trim()) {
            setFormData({
                ...formData,
                [locale]: {
                    ...formData[locale],
                    body_blocks: [...formData[locale].body_blocks, newBodyBlock.trim()]
                }
            });
            setNewBodyBlock("");
        }
    };

    const removeBodyBlock = (locale: 'en' | 'ar' | 'fr', index: number) => {
        setFormData({
            ...formData,
            [locale]: {
                ...formData[locale],
                body_blocks: formData[locale].body_blocks.filter((_, i) => i !== index)
            }
        });
    };

    const addKpi = (locale: 'en' | 'ar' | 'fr') => {
        if (newKpiKey.trim() && newKpiValue.trim()) {
            setFormData({
                ...formData,
                [locale]: {
                    ...formData[locale],
                    results_kpis: {
                        ...formData[locale].results_kpis,
                        [newKpiKey.trim()]: newKpiValue.trim()
                    }
                }
            });
            setNewKpiKey("");
            setNewKpiValue("");
        }
    };

    const removeKpi = (locale: 'en' | 'ar' | 'fr', key: string) => {
        const newKpis = { ...formData[locale].results_kpis };
        delete newKpis[key as keyof typeof newKpis];
        setFormData({
            ...formData,
            [locale]: {
                ...formData[locale],
                results_kpis: newKpis
            }
        });
    };

    const handleFileChange = (field: 'logo' | 'gallery', files: FileList | null) => {
        if (files) {
            if (field === 'logo') {
                setFormData({ ...formData, logo: files[0] });
            } else {
                setFormData({ ...formData, gallery: Array.from(files) });
            }
        }
    };

    // Convert form data to FormData object for API submission
    const convertToFormData = (data: CaseStudyFormData): FormData => {
        const apiFormData = new FormData();
        
        if (isEdit) {
            apiFormData.append('_method', 'PUT');
        }
        
        // Add basic fields
        apiFormData.append('client_name', data.client_name);
        apiFormData.append('testimonial_id', data.testimonial_id.toString());
        apiFormData.append('status', data.status);
        apiFormData.append('order', data.order.toString());
        
        // Add language-specific data
        ['en', 'ar', 'fr'].forEach(locale => {
            const localeData = data[locale as keyof typeof data] as any;
            Object.keys(localeData).forEach(key => {
                if (key === 'body_blocks') {
                    localeData.body_blocks.forEach((block: string, index: number) => {
                        apiFormData.append(`${locale}[${key}][${index}]`, block);
                    });
                } else if (key === 'results_kpis') {
                    Object.keys(localeData.results_kpis).forEach(kpiKey => {
                        apiFormData.append(`${locale}[${key}][${kpiKey}]`, localeData.results_kpis[kpiKey]);
                    });
                } else {
                    apiFormData.append(`${locale}[${key}]`, localeData[key]);
                }
            });
        });
        
        // Add files
        if (data.logo) {
            apiFormData.append('logo', data.logo);
        }
        
        if (data.gallery && data.gallery.length > 0) {
            data.gallery.forEach((file, index) => {
                apiFormData.append(`gallery[${index}]`, file);
            });
        }
        
        return apiFormData;
    };

    const handleSubmit = () => {
        const apiFormData = convertToFormData(formData);
        onSubmit(apiFormData);
    };

    const tabs = [
        { key: 'en', label: 'English', flag: '🇺🇸' },
        { key: 'ar', label: 'Arabic', flag: '🇸🇦' },
        { key: 'fr', label: 'French', flag: '🇫🇷' }
    ] as const;

    return (
        <div className="space-y-8">
            {/* Basic Information Card */}
            <RCard
                title={
                    <RFlex className="items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                            <i className="fas fa-info h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Basic Information</h3>
                            <p className="text-sm text-muted-foreground">Core case study details</p>
                        </div>
                    </RFlex>
                }
                cardClassName="border-0 shadow-lg bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/20"
                contentComponent={
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="client_name" className="text-sm font-medium">Client Name</Label>
                                <Input
                                    id="client_name"
                                    value={formData.client_name}
                                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                    placeholder="Global Learning Institute"
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="testimonial_id" className="text-sm font-medium">Testimonial ID</Label>
                                <Input
                                    id="testimonial_id"
                                    type="number"
                                    value={formData.testimonial_id}
                                    onChange={(e) => setFormData({ ...formData, testimonial_id: parseInt(e.target.value) || 0 })}
                                    placeholder="1"
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                                <RSelect
                                    value={formData.status}
                                    handleChange={(value: string) => setFormData({ ...formData, status: value as "draft" | "published" })}
                                    placeholder="Select status"
                                    options={[
                                        { value: "draft", label: "Draft" },
                                        { value: "published", label: "Published" }
                                    ]}
                                    triggerClassName="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="order" className="text-sm font-medium">Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    placeholder="1"
                                    className="h-11"
                                />
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Language Tabs */}
            <RCard
                title={
                    <RFlex className="items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                            <i className="fas fa-globe h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Content (Multi-language)</h3>
                            <p className="text-sm text-muted-foreground">Add content in multiple languages</p>
                        </div>
                    </RFlex>
                }
                cardClassName="border-0 shadow-lg bg-gradient-to-br from-background via-background to-green-50/30 dark:to-green-950/20"
                contentComponent={
                    <div className="space-y-6">
                        {/* Tab Navigation */}
                        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeTab === tab.key
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <span>{tab.flag}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor={`${activeTab}_sector`} className="text-sm font-medium">Sector</Label>
                                <Input
                                    id={`${activeTab}_sector`}
                                    value={formData[activeTab].sector}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [activeTab]: { ...formData[activeTab], sector: e.target.value }
                                    })}
                                    placeholder={activeTab === 'ar' ? "التعليم" : activeTab === 'fr' ? "Éducation" : "Education"}
                                    className={`h-11 ${activeTab === 'ar' ? 'text-right' : ''}`}
                                    dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor={`${activeTab}_problem`} className="text-sm font-medium">Problem</Label>
                                <Textarea
                                    id={`${activeTab}_problem`}
                                    value={formData[activeTab].problem}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [activeTab]: { ...formData[activeTab], problem: e.target.value }
                                    })}
                                    placeholder={activeTab === 'ar' ? "صف التحديات الرئيسية التي واجهها العميل" : activeTab === 'fr' ? "Décrivez les principaux défis rencontrés par le client" : "Describe the main challenges faced by the client"}
                                    rows={4}
                                    className={`resize-none ${activeTab === 'ar' ? 'text-right' : ''}`}
                                    dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor={`${activeTab}_solution`} className="text-sm font-medium">Solution</Label>
                                <Textarea
                                    id={`${activeTab}_solution`}
                                    value={formData[activeTab].solution}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [activeTab]: { ...formData[activeTab], solution: e.target.value }
                                    })}
                                    placeholder={activeTab === 'ar' ? "اشرح الحل الذي قدمته" : activeTab === 'fr' ? "Expliquez la solution que vous avez fournie" : "Explain the solution you provided"}
                                    rows={4}
                                    className={`resize-none ${activeTab === 'ar' ? 'text-right' : ''}`}
                                    dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            {/* Body Blocks */}
                            <div className="space-y-4">
                                <Label className="text-sm font-medium">Body Blocks</Label>
                                <RFlex className="gap-3">
                                    <Input
                                        value={newBodyBlock}
                                        onChange={(e) => setNewBodyBlock(e.target.value)}
                                        placeholder={activeTab === 'ar' ? "أضف قسم محتوى" : activeTab === 'fr' ? "Ajouter un bloc de contenu" : "Add a body block"}
                                        onKeyPress={(e: any) => e.key === "Enter" && addBodyBlock(activeTab)}
                                        className={`h-11 ${activeTab === 'ar' ? 'text-right' : ''}`}
                                        dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                    <RButton 
                                        onClick={() => addBodyBlock(activeTab)} 
                                        size="lg" 
                                        className="px-6" 
                                        icon={<i className={`${myIcons.plus} h-4 w-4`} />} 
                                        text="Add" 
                                    />
                                </RFlex>
                                <div className="space-y-2">
                                    {formData[activeTab].body_blocks.map((block, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                            <span className="flex-1 text-sm">{block}</span>
                                            <RButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeBodyBlock(activeTab, index)}
                                                className="h-8 w-8 p-0"
                                                icon={<i className={`${myIcons.xmark} h-4 w-4`} />}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Results KPIs */}
                            <div className="space-y-4">
                                <Label className="text-sm font-medium">Results KPIs</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input
                                        value={newKpiKey}
                                        onChange={(e) => setNewKpiKey(e.target.value)}
                                        placeholder={activeTab === 'ar' ? "مفتاح المؤشر" : activeTab === 'fr' ? "Clé KPI" : "KPI Key (e.g., student_engagement)"}
                                        className="h-11"
                                    />
                                    <Input
                                        value={newKpiValue}
                                        onChange={(e) => setNewKpiValue(e.target.value)}
                                        placeholder={activeTab === 'ar' ? "قيمة المؤشر" : activeTab === 'fr' ? "Valeur KPI" : "KPI Value (e.g., 85%)"}
                                        className={`h-11 ${activeTab === 'ar' ? 'text-right' : ''}`}
                                        dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                </div>
                                <RButton 
                                    onClick={() => addKpi(activeTab)} 
                                    size="lg" 
                                    className="px-6" 
                                    icon={<i className={`${myIcons.plus} h-4 w-4`} />} 
                                    text={activeTab === 'ar' ? "إضافة مؤشر" : activeTab === 'fr' ? "Ajouter KPI" : "Add KPI"} 
                                />
                                <div className="space-y-2">
                                    {Object.entries(formData[activeTab].results_kpis).map(([key, value]) => (
                                        <div key={key} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                            <span className="flex-1 text-sm">
                                                <span className="font-medium">{key.replace(/_/g, ' ')}:</span> {value}
                                            </span>
                                            <RButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeKpi(activeTab, key)}
                                                className="h-8 w-8 p-0"
                                                icon={<i className={`${myIcons.xmark} h-4 w-4`} />}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Media Upload Card */}
            <RCard
                title={
                    <RFlex className="items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                            <i className="fas fa-images h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Media Files</h3>
                            <p className="text-sm text-muted-foreground">Upload logo and gallery images</p>
                        </div>
                    </RFlex>
                }
                cardClassName="border-0 shadow-lg bg-gradient-to-br from-background via-background to-purple-50/30 dark:to-purple-950/20"
                contentComponent={
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="logo" className="text-sm font-medium">Logo</Label>
                            <Input
                                id="logo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange('logo', e.target.files)}
                                className="h-11"
                            />
                            {formData.logo && (
                                <p className="text-sm text-muted-foreground">Selected: {formData.logo.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gallery" className="text-sm font-medium">Gallery Images</Label>
                            <Input
                                id="gallery"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleFileChange('gallery', e.target.files)}
                                className="h-11"
                            />
                            {formData.gallery && formData.gallery.length > 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Selected: {formData.gallery.length} file(s)
                                </p>
                            )}
                        </div>
                    </div>
                }
            />

            {/* Submit Button */}
            <div className="flex justify-end">
                <RButton
                    onClick={handleSubmit}
                    disabled={isLoading}
                    size="lg"
                    className="px-8"
                    icon={isLoading ? <i className="fas fa-spinner fa-spin h-4 w-4" /> : <i className={`${myIcons.check} h-4 w-4`} />}
                    text={isLoading ? "Saving..." : isEdit ? "Update Case Study" : "Create Case Study"}
                />
            </div>
        </div>
    );
}
