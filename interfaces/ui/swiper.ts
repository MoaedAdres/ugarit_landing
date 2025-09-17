import { AutoplayOptions, CoverflowEffectOptions, SwiperModule } from "swiper/types";
import { Swiper as SwiperType } from "swiper";

export interface IMySwiper {
	effect?: "coverflow" | "slide" | "fade" | "cube" | "flip" | "creative" | "cards" | (string & {});
	grabCursor?: boolean;
	centeredSlides?: boolean;
	loop?: boolean;
	pagination?: boolean;
	showPreviousButton?: boolean;
	showNextButton?: boolean;
	showPagination?: boolean;
	slidesPerView?: number | "auto";
	speed?: number;
	autoplay?: boolean | AutoplayOptions;
	coverflowEffect?: CoverflowEffectOptions;
	spaceBetween?: string | number;
	initialSlide?: number;
	onBeforeInit?: (swiper: SwiperType) => void;
	anotherModules?: SwiperModule[];
	swiperSlideClasses?: string;
	swiperClasses?: string;
	wrapperClasses?: string;
	activeSlideClasses?: string;
	parentClasses?: string;
}
