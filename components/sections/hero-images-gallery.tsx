'use client';
import { useState, useEffect } from 'react';
import BackgroundHero1 from "@/public/jpgs/hero/bg-hero1.jpg"
import BackgroundHero2 from "@/public/jpgs/hero/bg-hero2.jpg"
import BackgroundHero3 from "@/public/jpgs/hero/bg-hero3.jpg"
import BackgroundHero4 from "@/public/jpgs/hero/bg-hero4.jpg"
import DarkBackgroundHero1 from "@/public/jpgs/hero/dark-mode/bg-hero1.jpg"
import DarkBackgroundHero2 from "@/public/jpgs/hero/dark-mode/bg-hero2.jpg"
import DarkBackgroundHero3 from "@/public/jpgs/hero/dark-mode/bg-hero3.jpg"
import DarkBackgroundHero4 from "@/public/jpgs/hero/dark-mode/bg-hero4.jpg"
import MyImage from '../Reusable-components/MyImage';
import useCurrentThemeIsDark from '@/hooks/use-current-theme-is-dark';
export default function HeroImagesGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isDark = useCurrentThemeIsDark()
    // images data
    const images = [
        {
            id: 1,
            src: isDark ? DarkBackgroundHero1 : BackgroundHero1,
            alt: "BackgroundHero1",
        },
        {
            id: 2,
            src: isDark ? DarkBackgroundHero2 : BackgroundHero2,
            alt: "BackgroundHero2",
        },
        {
            id: 3,
            src: isDark ? DarkBackgroundHero3 : BackgroundHero3,
            alt: "BackgroundHero3",
        },
        {
            id: 4,
            src: isDark ? DarkBackgroundHero4 : BackgroundHero4,
            alt: "BackgroundHero4",
        }
    ];

    // Auto-advance the images every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="absolute min-h-screen w-full">
            {images.map((image, index) => (
                <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <MyImage
                        src={image.src}
                        placeholder='blur'
                        priority
                        alt={image.alt}
                        className="w-full h-full"
                    />
                </div>
            ))}
        </div>
    );
}