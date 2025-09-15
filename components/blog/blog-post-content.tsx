interface BlogPostContentProps {
  post: {
    body: string
  }
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <div
        className="text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, "<br />") }}
      />
    </article>
  )
}
