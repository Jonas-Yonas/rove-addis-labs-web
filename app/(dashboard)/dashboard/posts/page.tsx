import Link from "next/link";
import { FileText } from "lucide-react";
import { PostCreateDialog } from "@/components/dashboard/post-create-dialog";
import { PostFilters } from "@/components/dashboard/post-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { getPostCategories, getPosts } from "@/lib/posts/queries";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const status = params.status ?? "ALL";
  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  // const posts = await getPosts({ search, status, page, pageSize: 9 });
  const [posts, categories] = await Promise.all([
    getPosts({ search, status, page, pageSize: 9 }),
    getPostCategories(),
  ]);

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Content"
        title="Posts"
        description="Create and manage articles and updates for Rove Addis Labs."
        action={<PostCreateDialog categories={categories} />}
      />
      <PostFilters search={search} status={status} />
      {posts.data.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={search || status !== "ALL" ? "No posts found" : "No posts yet"}
          description={
            search || status !== "ALL"
              ? "Try adjusting your search or filters."
              : "Create your first post to get started."
          }
        />
      ) : (
        <>
          <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.data.map((post) => (
              <Link
                key={post.id}
                href={`/dashboard/posts/${post.id}`}
                className="block min-w-0 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileText className="size-5" />
                  </div>
                  <StatusBadge status={post.status} />
                </div>
                <h2 className="mt-5 line-clamp-2 font-semibold">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {post.published_at
                      ? new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                        }).format(new Date(post.published_at))
                      : "Not published"}
                  </span>
                  {post.featured && (
                    <span className="font-medium text-foreground">
                      Featured
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <Pagination
            page={posts.page}
            pageSize={posts.pageSize}
            totalItems={posts.count}
          />
        </>
      )}
    </div>
  );
}
