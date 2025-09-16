'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import { IChildren } from '@/interfaces/shared';
import MyButton from './MyButton';
export default function MySwiper({ children }: IChildren) {
    const swiperRef = useRef<SwiperType>();
    // I used this state to start with the second slide as active
    const [activeIndex, setActiveIndex] = useState(1);
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="relative">
                <Swiper
                    spaceBetween={70}
                    slidesPerView={3}
                    centeredSlides={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    // Start with the second slide centered
                    initialSlide={1}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.activeIndex);
                    }}
                    className="w-full h-[400px] xl:h-[450px] py-3 xl:py-10"
                >
                    {React.Children.map(children, (child, index) => (
                        <SwiperSlide className='h-[200px]' key={index}>
                            <div className={`mt-12 xl:mt-14 rounded-xl flex flex-col justify-between transition-all duration-300 
                ${activeIndex === index ?
                                    'transform scale-130 bg-white border-2 border-secondary-foreground shadow-lg' :
                                    `opacity-80`} 
                shadow-md`}
                            >

                                {child}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Button
                    size="icon"
                    className="absolute left-0 top-1/2 transform -translate-x-4 z-10 bg-white shadow-md"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    className="absolute right-0 top-1/2 transform translate-x-4 z-10 bg-white shadow-md"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                {React.Children.map(children, (_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${activeIndex === index ? 'bg-secondary-foreground' : 'bg-gray-300'}`}
                        onClick={() => swiperRef.current?.slideTo(index)}
                    />
                ))}
            </div>
        </div >
    );
}