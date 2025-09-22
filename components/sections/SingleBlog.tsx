"use client"
import { useEffect, useRef, useState } from 'react'
import { myIcons } from '@/constants/icons';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MyImage from '../Reusable-components/MyImage';
import { StaticImageData } from 'next/image';
interface ISingleBlog {
    article: {
        id: string;
        title: string;
        excerpt: string;
        author: string;
        published_at: string;
        cover_image: string;
        categories: string[];
        index: number;
        frame: string | StaticImageData
        color: string
    }
}
function SingleBlog({ article }: ISingleBlog) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (cardRef.current) {
                        observer.unobserve(cardRef.current);
                    }
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);
    const isArticleOdd = article.index % 2
    return (
        <div className='relative'>
            <div style={{ backgroundColor: article.color }} className={cn(`hidden md:block absolute w-64 xl:w-80 h-64 -bottom-5 rounded-lg`, isArticleOdd ? "-right-5" : "-left-5 ")} />
            <div
                ref={cardRef}
                className={cn("group w-full h-96 md:h-64 lg:h-72 relative bg-card rounded-lg flex flex-col md:flex-row shadow-lg transition-all duration-300 overflow-hidden",
                    isVisible
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-10 scale-95'
                    , isArticleOdd && "md:flex-row-reverse")}
                style={{ transitionDelay: `${article.index * 100}ms` }}
            >
                <div className="relative basis-[100%] md:basis-[45%] lg:basis-[35%] xl:basis-[40%] w-full h-full border bg-gray-300 rounded-l-xl">
                    <MyImage fill className='absolute z-50 shadow-lg' src={article.cover_image} alt={article.title} />
                </div>
                <div className="p-3 w-full md:p-6 flex flex-col justify-between">
                    <h3 className="font-heading font-semibold text-base md:text-xl text-foreground mb-3 transition-colors text-balance">
                        {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed text-pretty">
                        {article.excerpt?.length > 70 ? `${article.excerpt.slice(0, 70)}...` : article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-2">
                            <i className={myIcons.user} />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className={myIcons.calendar} />
                            <span>
                                {new Date(article.published_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-between items-center">
                        <div className="flex flex-wrap gap-2 justify-between items-center">
                            {article.categories.map((category, catIndex) => (
                                <span
                                    key={catIndex}
                                    className="px-2 py-1 bg-primary-600 text-secondary-900 text-xs rounded-full"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>

                        <Button
                            className="text-secondary-900 shadow-md bg-background transition-smooth px-4 md:px-8 py-4 text-sm md:text-lg w-fit transition-all duration-300"
                            asChild
                        >
                            <Link href={`/blog/${article.id}`}>
                                Read More
                                <i className={myIcons.arrowRight} />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SingleBlog


