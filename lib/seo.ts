import type { Metadata } from "next";

export interface SEOConfig {
	title: string;
	description: string;
	keywords?: string[];
	canonicalUrl?: string;
	ogImage?: string;
	ogType?: "website" | "article" | "product";
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	section?: string;
	tags?: string[];
}

export const DEFAULT_SEO = {
	siteName: "Ugarit Technologies",
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ugarit-tech.com",
	defaultTitle: "Ugarit Technologies - Enterprise IT Solutions & Cloud Services",
	defaultDescription:
		"Leading provider of enterprise IT solutions, cloud infrastructure, DevOps consulting, and digital transformation services. Build. Scale. Secure.",
	defaultKeywords: [
		"IT solutions",
		"cloud services",
		"DevOps consulting",
		"enterprise technology",
		"digital transformation",
		"cybersecurity",
		"cloud infrastructure",
		"software development",
		"IT consulting",
		"technology services",
	],
	defaultOgImage: "/og-image.jpg",
	twitterHandle: "@UgaritTech",
	linkedinUrl: "https://linkedin.com/company/ugarit-technologies",
	githubUrl: "https://github.com/ugarit-technologies",
};

export function generateMetadata(config: SEOConfig): Metadata {
	const {
		title,
		description,
		keywords = [],
		canonicalUrl,
		ogImage = DEFAULT_SEO.defaultOgImage,
		ogType = "website",
		publishedTime,
		modifiedTime,
		author,
		section,
		tags = [],
	} = config;

	const fullTitle = title.includes(DEFAULT_SEO.siteName) ? title : `${title} | ${DEFAULT_SEO.siteName}`;

	const url = canonicalUrl || DEFAULT_SEO.siteUrl;
	const imageUrl = ogImage.startsWith("http") ? ogImage : `${DEFAULT_SEO.siteUrl}${ogImage}`;

	const allKeywords = [...DEFAULT_SEO.defaultKeywords, ...keywords, ...tags];

	return {
		title: fullTitle,
		description,
		keywords: allKeywords.join(", "),
		authors: author ? [{ name: author }] : [{ name: DEFAULT_SEO.siteName }],
		creator: DEFAULT_SEO.siteName,
		publisher: DEFAULT_SEO.siteName,
		alternates: {
			canonical: url,
		},
		openGraph: {
			type: ogType,
			title: fullTitle,
			description,
			url,
			siteName: DEFAULT_SEO.siteName,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: "en_US",
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
			...(author && { authors: [author] }),
			...(section && { section }),
			...(tags.length > 0 && { tags }),
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
			creator: DEFAULT_SEO.twitterHandle,
			site: DEFAULT_SEO.twitterHandle,
			images: [imageUrl],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		verification: {
			google: process.env.GOOGLE_SITE_VERIFICATION,
			yandex: process.env.YANDEX_VERIFICATION,
			bing: process.env.BING_VERIFICATION,
		},
	};
}

export function generateJsonLd(type: "Organization" | "WebSite" | "Article" | "Service", data: any) {
	const baseUrl = DEFAULT_SEO.siteUrl;

	switch (type) {
		case "Organization":
			return {
				"@context": "https://schema.org",
				"@type": "Organization",
				name: DEFAULT_SEO.siteName,
				url: baseUrl,
				logo: `${baseUrl}/logo.png`,
				description: DEFAULT_SEO.defaultDescription,
				foundingDate: "2020",
				address: {
					"@type": "PostalAddress",
					addressCountry: "US",
				},
				contactPoint: {
					"@type": "ContactPoint",
					telephone: "+1-XXX-XXX-XXXX",
					contactType: "customer service",
					availableLanguage: "English",
				},
				sameAs: [DEFAULT_SEO.linkedinUrl, DEFAULT_SEO.githubUrl, `https://twitter.com/${DEFAULT_SEO.twitterHandle.replace("@", "")}`],
				serviceType: ["IT Consulting", "Cloud Services", "DevOps", "Software Development", "Cybersecurity"],
			};

		case "WebSite":
			return {
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: DEFAULT_SEO.siteName,
				url: baseUrl,
				description: DEFAULT_SEO.defaultDescription,
				publisher: {
					"@type": "Organization",
					name: DEFAULT_SEO.siteName,
					logo: `${baseUrl}/logo.png`,
				},
				potentialAction: {
					"@type": "SearchAction",
					target: `${baseUrl}/search?q={search_term_string}`,
					"query-input": "required name=search_term_string",
				},
			};

		case "Article":
			return {
				"@context": "https://schema.org",
				"@type": "Article",
				headline: data.title,
				description: data.description,
				image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}${DEFAULT_SEO.defaultOgImage}`,
				author: {
					"@type": "Person",
					name: data.author || DEFAULT_SEO.siteName,
				},
				publisher: {
					"@type": "Organization",
					name: DEFAULT_SEO.siteName,
					logo: `${baseUrl}/logo.png`,
				},
				datePublished: data.publishedTime,
				dateModified: data.modifiedTime || data.publishedTime,
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": data.url,
				},
			};

		case "Service":
			return {
				"@context": "https://schema.org",
				"@type": "Service",
				name: data.name,
				description: data.description,
				provider: {
					"@type": "Organization",
					name: DEFAULT_SEO.siteName,
					url: baseUrl,
				},
				serviceType: data.serviceType,
				areaServed: "Worldwide",
				hasOfferCatalog: {
					"@type": "OfferCatalog",
					name: "IT Services",
					itemListElement: data.services?.map((service: any, index: number) => ({
						"@type": "Offer",
						itemOffered: {
							"@type": "Service",
							name: service.name,
							description: service.description,
						},
					})),
				},
			};

		default:
			return null;
	}
}

export function generateBreadcrumbJsonLd(breadcrumbs: { name: string; url: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: breadcrumbs.map((breadcrumb, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: breadcrumb.name,
			item: breadcrumb.url,
		})),
	};
}
