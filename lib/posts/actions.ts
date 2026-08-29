"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const POSTS_PATH = "/dashboard/posts";
const STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

type CreatePostResult = { success: true } | { success: false; error: string };

function readPost(formData: FormData) {
  return {
    categoryId: String(formData.get("category_id") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    coverImageUrl: String(formData.get("cover_image_url") ?? "").trim(),
    status: String(formData.get("status") ?? "DRAFT"),
    featured: formData.get("featured") === "on",
    publishedAt: String(formData.get("published_at") ?? "").trim(),
  };
}

function validatePost(post: ReturnType<typeof readPost>) {
  if (!post.title || !post.slug || !post.content) {
    return "Title, slug, and content are required.";
  }

  if (!STATUSES.includes(post.status as (typeof STATUSES)[number])) {
    return "Invalid post status.";
  }

  if (post.publishedAt && Number.isNaN(Date.parse(post.publishedAt))) {
    return "Invalid publication date.";
  }

  return null;
}

function resolvePublishedAt(post: ReturnType<typeof readPost>) {
  // Drafts and archived posts are not published.
  if (post.status !== "PUBLISHED") {
    return null;
  }

  // If the user selected a publication date, use it.
  if (post.publishedAt) {
    return new Date(post.publishedAt).toISOString();
  }

  // If published but no date was selected, publish now.
  return new Date().toISOString();
}

export async function createPost(
  formData: FormData,
): Promise<CreatePostResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You must be signed in to create a post.",
    };
  }

  const post = readPost(formData);
  const validationError = validatePost(post);

  if (validationError) {
    return {
      success: false,
      error: validationError,
    };
  }

  const { error } = await supabase.from("posts").insert({
    author_id: user.id,
    category_id: post.categoryId || null,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || null,
    content: post.content,
    cover_image_url: post.coverImageUrl || null,
    status: post.status,
    featured: post.featured,
    published_at: resolvePublishedAt(post),
  });

  if (error) {
    console.error("Failed to create post:", error);

    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath(POSTS_PATH);

  return {
    success: true,
  };
}

export async function updatePost(postId: string, formData: FormData) {
  const supabase = await createClient();

  const post = readPost(formData);
  const validationError = validatePost(post);

  if (validationError) {
    throw new Error(validationError);
  }

  const { error } = await supabase
    .from("posts")
    .update({
      category_id: post.categoryId || null,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || null,
      content: post.content,
      cover_image_url: post.coverImageUrl || null,
      status: post.status,
      featured: post.featured,
      published_at: resolvePublishedAt(post),
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId);

  if (error) {
    console.error("Failed to update post:", error);
    throw new Error(error.message);
  }

  revalidatePath(POSTS_PATH);
  revalidatePath(`${POSTS_PATH}/${postId}`);

  return {
    success: true,
  };
}

export async function deletePost(postId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Failed to delete post:", error);

    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath(POSTS_PATH);

  return {
    success: true,
  };
}
