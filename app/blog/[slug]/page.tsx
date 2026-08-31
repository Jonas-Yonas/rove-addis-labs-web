import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout, MetaDot } from "@/components/public/article-layout";
import { Prose } from "@/components/public/prose";
import { getPublishedPostBySlug } from "@/lib/public/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) return { title: "Article not found" };

  const description = post.excerpt ?? undefined;

  return {
    title: post.title,
    description,
    openGraph: { title: post.title, description, type: "article" },
    twitter: { title: post.title, description },
  };
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
    new Date(value),
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const date = formatDate(post.published_at);

  return (
    <ArticleLayout
      backHref="/blog"
      backLabel="All insights"
      section="Insights"
      meta={
        <>
          {post.categoryName && (
            <span className="font-semibold tracking-wide text-accent uppercase">
              {post.categoryName}
            </span>
          )}
          {post.categoryName && date && <MetaDot />}
          {date && <span className="text-muted-foreground">{date}</span>}
        </>
      }
      aside={
        <>
          {date && <p>{date}</p>}
          {post.categoryName && <p>{post.categoryName}</p>}
        </>
      }
      title={post.title}
      lead={post.excerpt}
      coverUrl={post.cover_image_url}
    >
      <Prose text={post.content} />
    </ArticleLayout>
  );
}
