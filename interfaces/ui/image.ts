import { PlaceholderValue, StaticImport } from "next/dist/shared/lib/get-img-props";
export interface IMyImage {
	src: string | StaticImport;
	alt: string;
	className?: string;
	loading?: "eager" | "lazy";
	fill?: boolean;
	priority?: boolean;
	unoptimized?: boolean;
	placeholder?: PlaceholderValue;
}
