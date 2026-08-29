"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

const CATEGORIES_PATH = "/dashboard/categories";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CategoryActionResult =
  | { success: true }
  | { success: false; error: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();

  return {
    name,
    slug: rawSlug ? slugify(rawSlug) : slugify(name),
    description: String(formData.get("description") ?? "").trim(),
  };
}

function validateCategory(category: ReturnType<typeof readCategory>) {
  if (!category.name) {
    return "Name is required.";
  }

  if (!category.slug || !SLUG_PATTERN.test(category.slug)) {
    return "Slug must contain only lowercase letters, numbers, and hyphens.";
  }

  return null;
}

function toMessage(error: { code?: string; message: string }, fallback: string) {
  if (error.code === "23505") {
    return "A category with that slug already exists.";
  }

  // RLS denial / insufficient privilege.
  if (error.code === "42501" || /row-level security/i.test(error.message)) {
    return "You don't have permission to manage categories.";
  }

  return error.message || fallback;
}

export async function createCategory(
  formData: FormData,
): Promise<CategoryActionResult> {
  const supabase = await createClient();

  const category = readCategory(formData);
  const validationError = validateCategory(category);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { error } = await supabase.from("categories").insert({
    name: category.name,
    slug: category.slug,
    description: category.description || null,
  });

  if (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: toMessage(error, "Failed to create category.") };
  }

  revalidatePath(CATEGORIES_PATH);

  return { success: true };
}

export async function updateCategory(
  categoryId: string,
  formData: FormData,
): Promise<CategoryActionResult> {
  const supabase = await createClient();

  const category = readCategory(formData);
  const validationError = validateCategory(category);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { error } = await supabase
    .from("categories")
    .update({
      name: category.name,
      slug: category.slug,
      description: category.description || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", categoryId);

  if (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: toMessage(error, "Failed to update category.") };
  }

  revalidatePath(CATEGORIES_PATH);

  return { success: true };
}

export async function deleteCategory(
  categoryId: string,
): Promise<CategoryActionResult> {
  const supabase = await createClient();

  const { count, error: countError } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("category_id", categoryId);

  if (countError) {
    console.error("Failed to check category usage:", countError);
    return { success: false, error: "Failed to delete category." };
  }

  if ((count ?? 0) > 0) {
    return {
      success: false,
      error:
        "This category is still used by one or more posts. Reassign those posts before deleting it.",
    };
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: toMessage(error, "Failed to delete category.") };
  }

  revalidatePath(CATEGORIES_PATH);

  return { success: true };
}
