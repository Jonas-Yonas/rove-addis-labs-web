"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const POSTS_PATH = "/dashboard/posts";
const STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

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
    tagIds: formData
      .getAll("tag_ids")
      .map((value) => String(value))
      .filter(Boolean),
  };
}

// Postgres/PostgREST codes meaning "the post_tags join table isn't set up yet".
// Treated as a no-op so posts still save before that migration is run.
const MISSING_TABLE_CODES = new Set(["42P01", "PGRST205", "PGRST200"]);

type PostgrestErrorLike = { code?: string; message: string };

/** Reconcile the post_tags join rows to exactly `tagIds`. */
async function syncPostTags(
  supabase: SupabaseClient,
  postId: string,
  tagIds: string[],
): Promise<PostgrestErrorLike | null> {
  const removeStale = supabase.from("post_tags").delete().eq("post_id", postId);

  const { error: deleteError } = tagIds.length
    ? await removeStale.not(
        "tag_id",
        "in",
        `(${tagIds.map((id) => `"${id}"`).join(",")})`,
      )
    : await removeStale;

  if (deleteError) {
    return MISSING_TABLE_CODES.has(deleteError.code ?? "") ? null : deleteError;
  }

  if (tagIds.length === 0) return null;

  const { error: insertError } = await supabase.from("post_tags").upsert(
    tagIds.map((tagId) => ({ post_id: postId, tag_id: tagId })),
    { onConflict: "post_id,tag_id", ignoreDuplicates: true },
  );

  if (insertError) {
    return MISSING_TABLE_CODES.has(insertError.code ?? "") ? null : insertError;
  }

  return null;
}

function tagErrorMessage(error: PostgrestErrorLike) {
  if (error.code === "42501" || /row-level security/i.test(error.message)) {
    return "You don't have permission to change this post's tags.";
  }

  return "The post was saved, but its tags could not be updated.";
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
  // Whatever the user picked in the date/time field always wins, so an existing
  // value round-trips through the edit form regardless of status.
  if (post.publishedAt) {
    return new Date(post.publishedAt).toISOString();
  }

  // Published with no explicit date -> publish now.
  if (post.status === "PUBLISHED") {
    return new Date().toISOString();
  }

  // Draft/archived with no date -> not published.
  return null;
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

  const { data: created, error } = await supabase
    .from("posts")
    .insert({
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
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to create post:", error);

    return {
      success: false,
      error: error.message,
    };
  }

  const tagError = await syncPostTags(supabase, created.id, post.tagIds);

  if (tagError) {
    console.error("Failed to set post tags:", tagError);

    return {
      success: false,
      error: tagErrorMessage(tagError),
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

  const tagError = await syncPostTags(supabase, postId, post.tagIds);

  if (tagError) {
    console.error("Failed to update post tags:", tagError);
    throw new Error(tagErrorMessage(tagError));
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
