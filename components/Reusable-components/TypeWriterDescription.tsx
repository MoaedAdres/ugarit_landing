"use client"
import { useEffect, useState } from "react";

export default function TypewriterDescription({ text, duration = 50 }: { text: string; duration?: number }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, duration); // Adjust speed here (milliseconds per character)

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <span className="text-center">
            {displayedText}
            {currentIndex < text.length && <span className="animate-pulse">|</span>}
        </span>
    );
}