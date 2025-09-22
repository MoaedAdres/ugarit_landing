'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import { IChildren } from '@/interfaces/shared';
import { IMySwiper } from '@/interfaces/ui/swiper';
import { EffectCoverflow, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
export default function MySwiper({ needEffectCards = false, needAutoPlay = true, wrapperClasses = "shadow-md h-[300px]", swiperClasses = "h-[400px] xl:h-[450px]", swiperSlideClasses = "withoutHover", children, effect, grabCursor, centeredSlides = true, slidesPerView = 3, loop, speed, autoplay = {
    delay: 0,
    disableOnInteraction: false,
}, coverflowEffect, pagination, initialSlide = 1, spaceBetween = 70, anotherModules, activeSlideClasses = "md:bg-white cardgroup shadow-lg md:scale-130", xsActiveSlideClasses, showNextButton = true, showPreviousButton = true, showPagination = true, parentClasses = "py-8  max-w-6xl", xsSpaceBetween, lgSlidesPerView }: IChildren & IMySwiper) {
    const swiperRef = useRef<SwiperType>();
    const isMobile = useIsMobile()
    // I used this state to start with the second slide as active
    const [activeIndex, setActiveIndex] = useState(1);
    const modules = [EffectCoverflow, Pagination, ...(anotherModules || [])];
    needAutoPlay && modules.push(Autoplay)
    needEffectCards && modules.push(EffectCards)
    return (
        <div className={cn("w-full mx-auto px-4 ", parentClasses)}>
            <div className="relative">
                <Swiper
                    {...{ effect, grabCursor, centeredSlides, slidesPerView, loop, speed, autoplay, coverflowEffect, pagination, initialSlide, modules }}
                    // Start with the second slide centered
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        0: {
                            spaceBetween: xsSpaceBetween ?? 40,
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView,
                            spaceBetween: 40
                        },
                        1024: {
                            slidesPerView: lgSlidesPerView ?? 2,
                            spaceBetween,
                        },
                        1280: {
                            slidesPerView,
                        }
                    }}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.activeIndex);
                    }}
                    className={cn("w-full xl:py-10", swiperClasses)}
                >
                    {React.Children.map(children, (child, index) => (
                        <SwiperSlide className={swiperSlideClasses} key={index}>
                            <div className={cn(`mt-12 xl:mt-14 rounded-lg flex flex-col justify-between transition-all duration-300 
                ${activeIndex === index ?
                                    `transform ${isMobile && xsActiveSlideClasses ? xsActiveSlideClasses : activeSlideClasses}` :
                                    `opacity-80`} 
                `, wrapperClasses)}
                            >

                                {child}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {showPreviousButton && <Button
                    size="icon"
                    className="absolute left-0 top-1/2 transform -translate-x-4 z-10 bg-white shadow-md"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>}
                {showNextButton && <Button
                    size="icon"
                    className="absolute right-0 top-1/2 transform translate-x-4 z-10 bg-white shadow-md"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>}
            </div>

            {showPagination && <div className="flex justify-center mt-6 space-x-2">
                {React.Children.map(children, (_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${activeIndex === index ? 'bg-secondary-foreground' : 'bg-gray-300'}`}
                        onClick={() => swiperRef.current?.slideTo(index)}
                    />
                ))}
            </div>}
        </div >
    );
}
/*

'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import { IChildren } from '@/interfaces/shared';
import { IMySwiper } from '@/interfaces/ui/swiper';
import { EffectCoverflow, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { cn } from '@/lib/utils';
export default function MySwiper({ needEffectCards = false, needAutoPlay = true, wrapperClasses = "shadow-md h-[300px]", swiperClasses = "h-[400px] xl:h-[450px]", swiperSlideClasses = "withoutHover", children, effect, grabCursor, centeredSlides = true, slidesPerView = 3, loop, speed, autoplay = {
    delay: 0,
    disableOnInteraction: false,
}, coverflowEffect, pagination, initialSlide = 1, spaceBetween = 70, anotherModules, activeSlideClasses = "bg-white cardgroup shadow-lg scale-130", showNextButton = true, showPreviousButton = true, showPagination = true, parentClasses = "py-8  max-w-6xl" }: IChildren & IMySwiper) {
    const swiperRef = useRef<SwiperType>();
    // I used this state to start with the second slide as active
    const [activeIndex, setActiveIndex] = useState(1);
    const modules = [EffectCoverflow, Pagination, ...(anotherModules || [])];
    needAutoPlay && modules.push(Autoplay)
    needEffectCards && modules.push(EffectCards)
    return (
        <div className={cn("w-full mx-auto px-4 ", parentClasses)}>
            <div className="relative">
                <Swiper
                    {...{ effect, grabCursor, centeredSlides, slidesPerView, loop, speed, autoplay, coverflowEffect, pagination, initialSlide, spaceBetween, modules }}
                    // Start with the second slide centered
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.activeIndex);
                    }}
                    className={cn("w-full xl:py-10", swiperClasses)}
                >
                    {React.Children.map(children, (child, index) => (
                        <SwiperSlide className={swiperSlideClasses} key={index}>
                            <div className={cn(`mt-12 xl:mt-14 rounded-lg flex flex-col justify-between transition-all duration-300 
                ${activeIndex === index ?
                                    `transform ${activeSlideClasses}` :
                                    `opacity-80`} 
                `, wrapperClasses)}
                            >

                                {child}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {showPreviousButton && <Button
                    size="icon"
                    className="absolute left-0 top-1/2 transform -translate-x-4 z-10 bg-white shadow-md"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>}
                {showNextButton && <Button
                    size="icon"
                    className="absolute right-0 top-1/2 transform translate-x-4 z-10 bg-white shadow-md"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>}
            </div>

            {showPagination && <div className="flex justify-center mt-6 space-x-2">
                {React.Children.map(children, (_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${activeIndex === index ? 'bg-secondary-foreground' : 'bg-gray-300'}`}
                        onClick={() => swiperRef.current?.slideTo(index)}
                    />
                ))}
            </div>}
        </div >
    );
}

*/