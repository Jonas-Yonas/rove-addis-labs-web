import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { PostDeleteButton } from "@/components/dashboard/post-delete-button";
import { PostEditDialog } from "@/components/dashboard/post-edit-dialog";
import { StatusBadge } from "@/components/shared/status-badge";
import { getPostById } from "@/lib/posts/queries";

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) return (
    <div className="space-y-6">
      <Link href="/dashboard/posts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Back to Posts</Link>
      <div className="rounded-xl border p-8 text-center"><h1 className="text-xl font-semibold">Post not found</h1><p className="mt-2 text-sm text-muted-foreground">The requested post does not exist.</p></div>
    </div>
  );

  return (
    <div className="w-full min-w-0 space-y-6">
      <Link href="/dashboard/posts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Back to Posts</Link>
      <article className="overflow-hidden rounded-xl border bg-card">
        {post.cover_image_url ? (
          <div className="relative aspect-[16/6] bg-muted"><Image src={post.cover_image_url} alt={`${post.title} cover`} fill className="object-cover" unoptimized /></div>
        ) : (
          <div className="flex aspect-[16/6] items-center justify-center bg-muted"><div className="flex flex-col items-center gap-2 text-muted-foreground"><FileText className="size-8" /><span className="text-sm">No cover image</span></div></div>
        )}
        <div className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><StatusBadge status={post.status} />{post.featured && <span className="text-xs font-medium text-muted-foreground">Featured</span>}</div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{post.title}</h1>
              {post.excerpt && <p className="mt-2 max-w-3xl text-base leading-7 text-muted-foreground">{post.excerpt}</p>}
            </div>
            <div className="flex shrink-0 gap-2"><PostEditDialog post={post} /><PostDeleteButton id={post.id} /></div>
          </div>
          <div className="border-t pt-6"><h2 className="font-semibold">Content</h2><div className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{post.content}</div></div>
          <div className="grid gap-4 border-t pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-muted-foreground">Slug</p><p className="mt-1 break-all font-medium">{post.slug}</p></div>
            <div><p className="text-muted-foreground">Status</p><p className="mt-1 font-medium">{post.status}</p></div>
            <div><p className="text-muted-foreground">Published</p><p className="mt-1 font-medium">{post.published_at ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.published_at)) : "Not published"}</p></div>
            <div><p className="text-muted-foreground">Created</p><p className="mt-1 font-medium">{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.created_at))}</p></div>
          </div>
        </div>
      </article>
    </div>
  );
}
