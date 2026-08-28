"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const POSTS_PATH = "/dashboard/posts";
const STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

function readPost(formData: FormData) {
  return {
    authorId: String(formData.get("author_id") ?? "").trim(),
    categoryId: String(formData.get("category_id") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    coverImageUrl: String(formData.get("cover_image_url") ?? "").trim(),
    status: String(formData.get("status") ?? "DRAFT"),
    featured:
      formData.get("featured") === "true" || formData.get("featured") === "on",
    publishedAt: String(formData.get("published_at") ?? "").trim(),
  };
}

function validatePost(post: ReturnType<typeof readPost>) {
  if (!post.title || !post.slug || !post.content)
    return "Title, slug, and content are required.";

  if (!STATUSES.includes(post.status as (typeof STATUSES)[number]))
    return "Invalid post status.";

  if (post.publishedAt && Number.isNaN(Date.parse(post.publishedAt)))
    return "Invalid publication date.";

  return null;
}

function getPublishedAt(post: ReturnType<typeof readPost>) {
  if (post.status !== "PUBLISHED") return null;
  return post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : new Date().toISOString();
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const post = readPost(formData);
  const validationError = validatePost(post);

  if (validationError) return { success: false, error: validationError };

  const { error } = await supabase.from("posts").insert({
    author_id: post.authorId || null,
    category_id: post.categoryId || null,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || null,
    content: post.content,
    cover_image_url: post.coverImageUrl || null,
    status: post.status,
    featured: post.featured,
    published_at: getPublishedAt(post),
  });

  if (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(POSTS_PATH);
  return { success: true };
}

export async function updatePost(postId: string, formData: FormData) {
  const supabase = await createClient();
  const post = readPost(formData);
  const validationError = validatePost(post);

  if (validationError) throw new Error(validationError);

  const { error } = await supabase
    .from("posts")
    .update({
      author_id: post.authorId || null,
      category_id: post.categoryId || null,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || null,
      content: post.content,
      cover_image_url: post.coverImageUrl || null,
      status: post.status,
      featured: post.featured,
      published_at: getPublishedAt(post),
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId);

  if (error) {
    console.error("Failed to update post:", error);
    throw new Error("Failed to update post.");
  }

  revalidatePath(POSTS_PATH);
  revalidatePath(`${POSTS_PATH}/${postId}`);
  return { success: true };
}

export async function deletePost(postId: string) {
  const supabase = await createClient();

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("id, cover_image_url")
    .eq("id", postId)
    .maybeSingle();

  if (fetchError) return { success: false, error: "Failed to delete post." };
  if (!post) return { success: false, error: "Post not found." };

  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (deleteError) {
    console.error("Failed to delete post:", deleteError);
    return { success: false, error: "Failed to delete post." };
  }

  if (post.cover_image_url) {
    const path = getStoragePath(post.cover_image_url);
    if (path) {
      const { error } = await supabase.storage
        .from("rove-labs-project-covers")
        .remove([path]);
      if (error) console.error("Post deleted, image cleanup failed:", error);
    }
  }

  revalidatePath(POSTS_PATH);
  return { success: true };
}

function getStoragePath(url: string) {
  try {
    const parsed = new URL(url);
    const marker = "/rove-labs-project-covers/";
    const index = parsed.pathname.indexOf(marker);
    if (index === -1) return null;
    return decodeURIComponent(parsed.pathname.slice(index + marker.length));
  } catch {
    return null;
  }
}
