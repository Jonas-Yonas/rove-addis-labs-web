"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

const TAGS_PATH = "/dashboard/tags";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type TagActionResult =
  | { success: true }
  | { success: false; error: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readTag(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();

  return {
    name,
    slug: rawSlug ? slugify(rawSlug) : slugify(name),
  };
}

function validateTag(tag: ReturnType<typeof readTag>) {
  if (!tag.name) {
    return "Name is required.";
  }

  if (!tag.slug || !SLUG_PATTERN.test(tag.slug)) {
    return "Slug must contain only lowercase letters, numbers, and hyphens.";
  }

  return null;
}

function toMessage(error: { code?: string; message: string }, fallback: string) {
  if (error.code === "23505") {
    return "A tag with that slug already exists.";
  }

  if (error.code === "42501" || /row-level security/i.test(error.message)) {
    return "You don't have permission to manage tags.";
  }

  return error.message || fallback;
}

export async function createTag(formData: FormData): Promise<TagActionResult> {
  const supabase = await createClient();

  const tag = readTag(formData);
  const validationError = validateTag(tag);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { error } = await supabase
    .from("tags")
    .insert({ name: tag.name, slug: tag.slug });

  if (error) {
    console.error("Failed to create tag:", error);
    return { success: false, error: toMessage(error, "Failed to create tag.") };
  }

  revalidatePath(TAGS_PATH);

  return { success: true };
}

export async function updateTag(
  tagId: string,
  formData: FormData,
): Promise<TagActionResult> {
  const supabase = await createClient();

  const tag = readTag(formData);
  const validationError = validateTag(tag);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { error } = await supabase
    .from("tags")
    .update({ name: tag.name, slug: tag.slug })
    .eq("id", tagId);

  if (error) {
    console.error("Failed to update tag:", error);
    return { success: false, error: toMessage(error, "Failed to update tag.") };
  }

  revalidatePath(TAGS_PATH);

  return { success: true };
}

export async function deleteTag(tagId: string): Promise<TagActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("tags").delete().eq("id", tagId);

  if (error) {
    console.error("Failed to delete tag:", error);
    return { success: false, error: toMessage(error, "Failed to delete tag.") };
  }

  revalidatePath(TAGS_PATH);

  return { success: true };
}
