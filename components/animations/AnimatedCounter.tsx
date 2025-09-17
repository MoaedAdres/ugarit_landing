"use client"
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
    end,
    duration = 2000,
}: {
    end: number;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number;

                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);

                        // Use easeOutQuart for smoother animation
                        const easeProgress = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(easeProgress * end));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 },
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, [end, duration, hasAnimated]);

    return <span ref={counterRef}>{count}</span>;
}
export default AnimatedCounter