import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import { PublicHero } from "@/components/public/public-hero";
import { SectionCta } from "@/components/public/section-cta";
import { getPublishedPosts } from "@/lib/public/queries";

export const metadata: Metadata = {
  title: "Insights",
  description: "Writing and updates from Rove Addis Labs.",
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PublicHero
        eyebrow="Insights"
        title="Notes on what we're building and learning."
        description="Product updates, engineering write-ups, and thinking from the Rove Addis Labs team."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed py-20 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <FileText className="size-5" />
            </span>
            <p className="mt-4 font-medium">No articles yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              We&apos;re working on the first ones — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-muted">
                  {post.cover_image_url ? (
                    <Image
                      src={post.cover_image_url}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(40,181,177,0.16),transparent_62%)]" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {formatDate(post.published_at) && (
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {formatDate(post.published_at)}
                    </p>
                  )}
                  <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Read
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <SectionCta
          title="Have an idea worth building?"
          description="Tell us what you're working on and we'll get back to you."
        />
      </div>
    </>
  );
}
