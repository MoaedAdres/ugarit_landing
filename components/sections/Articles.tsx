"use client"
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    emoji: string;
}

interface HomeProps {
    articles: Article[];
}

const Home: NextPage<HomeProps> = ({ articles }) => {
    return (
        <div className="min-h-screen">
            <Head>
                <title>Article Showcase | Next.js 15 with Scroll Animations</title>
                <meta name="description" content="Article showcase with scroll animations using Next.js 15 and TypeScript" />
            </Head>

            <main className="container mx-auto px-4 py-12">
                <ArticlesSection articles={articles} />
            </main>
        </div>
    );
};


interface ArticlesSectionProps {
    articles: Article[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.slice(0, 3).map((article, index) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

interface ArticleCardProps {
    article: Article;
    index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing after animation triggers
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
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-95'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-4xl">{article.emoji}</div>
            </div>
            <div className="p-6">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full mb-4">
                    {article.category}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{article.title}</h3>
                <p className="text-slate-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-slate-600">👤</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-800">{article.author}</p>
                            <p className="text-xs text-slate-500">{article.date}</p>
                        </div>
                    </div>
                    <span className="text-slate-500 text-sm">{article.readTime} read</span>
                </div>
            </div>
        </div>
    );
};

export default Home;