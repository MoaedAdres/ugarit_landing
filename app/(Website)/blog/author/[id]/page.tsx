import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthorProfile } from "@/components/blog/author-profile";
import { AuthorPosts } from "@/components/blog/author-posts";
import { notFound } from "next/navigation";

// Mock author data - replace with actual API call
const getAuthorData = (id: string) => {
  const authors: Record<string, any> = {
    "david-kim": {
      id: "david-kim",
      name: "David Kim",
      role: "Cloud Solutions Architect",
      bio: "David is a certified cloud architect with over 10 years of experience helping enterprises migrate to the cloud. He specializes in Azure and AWS architectures and has led successful migrations for Fortune 500 companies.",
      avatar: "/author-david.png",
      socials: {
        linkedin: "https://linkedin.com/in/davidkim",
        twitter: "https://twitter.com/davidkim",
        github: "https://github.com/davidkim",
      },
      expertise: ["Cloud Architecture", "Azure", "AWS", "Migration Strategy"],
      posts_count: 15,
      joined_date: "2022-03-15",
    },
  };

  return authors[id] || null;
};

interface AuthorPageProps {
  params: {
    id: string;
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorData(params.id);

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <AuthorProfile author={author} />
        <AuthorPosts authorId={author.id} />
      </main>
    </div>
  );
}
