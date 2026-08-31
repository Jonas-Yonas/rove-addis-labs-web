import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { getPublishedPosts } from "@/lib/public/queries";

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export async function InsightsSection() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Insights
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Ideas worth sharing.
            </h2>
          </div>

          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-accent sm:inline-flex"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              {formatDate(post.published_at) && (
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {formatDate(post.published_at)}
                </p>
              )}

              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
              )}

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                Read more
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium sm:hidden"
        >
          View all insights
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
