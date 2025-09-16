"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface BlogPostTocProps {
  toc: TocItem[];
}

export function BlogPostToc({ toc }: BlogPostTocProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" },
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Table of Contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-primary ${
                item.level === 2 ? "ml-4" : ""
              } ${activeId === item.id ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              {item.title}
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
