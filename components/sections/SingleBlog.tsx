"use client"
import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '../ui/card';
import { myIcons } from '@/constants/icons';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
interface ISingleBlog {
    article: {
        id: string;
        title: string;
        excerpt: string;
        author: string;
        published_at: string;
        cover_image: string;
        categories: string[];
        index: number
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
    return (
        <div
            ref={cardRef}
            className={cn("group bg-card rounded-lg flex hover:shadow-lg transition-all duration-300 overflow-hidden",
                isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-10 scale-95'
            )}
            style={{ transitionDelay: `${article.index * 100}ms` }}

        >
            <div className="bg-gradient-to-br flex items-center justify-center">
                <div className="text-center p-6">
                    <div className="bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📝</span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {article.categories.map((category, catIndex) => (
                            <span
                                key={catIndex}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors text-balance">
                    {article.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">
                    {article.excerpt}
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

                <Button
                    variant="outline"
                    className="w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    asChild
                >
                    <Link href={`/ blog / ${article.id}`}>
                        Read More
                        <i className={myIcons.arrowRight} />
                    </Link>
                </Button>
            </div>
        </div>
        // <div
        //     ref={cardRef}
        //     className={`bg - white rounded - xl shadow - lg overflow - hidden transition - all duration - 700 ${ isVisible
        //         ? 'opacity-100 translate-y-0 scale-100'
        //         : 'opacity-0 translate-y-10 scale-95'
        //         }`}
        //     style={{ transitionDelay: `${article.index * 100}ms` }}
        // >
        //     <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        //         <div className="text-white text-4xl">{article.emoji}</div>
        //     </div>
        //     <div className="p-6">
        //         <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full mb-4">
        //             {article.category}
        //         </span>
        //         <h3 className="text-xl font-bold text-slate-800 mb-3">{article.title}</h3>
        //         <p className="text-slate-600 mb-4">{article.excerpt}</p>
        //         <div className="flex items-center justify-between">
        //             <div className="flex items-center">
        //                 <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mr-3">
        //                     <span className="text-slate-600">👤</span>
        //                 </div>
        //                 <div>
        //                     <p className="text-sm font-medium text-slate-800">{article.author}</p>
        //                     <p className="text-xs text-slate-500">{article.date}</p>
        //                 </div>
        //             </div>
        //             <span className="text-slate-500 text-sm">{article.readTime} read</span>
        //         </div>
        //     </div>
        // </div>
    )
}

export default SingleBlog


