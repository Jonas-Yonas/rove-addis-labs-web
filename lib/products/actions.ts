"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const logoUrl = String(formData.get("logo_url") ?? "").trim();
  const coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();
  const websiteUrl = String(formData.get("website_url") ?? "").trim();
  const status = String(formData.get("status") ?? "IDEA");
  const featured = formData.get("featured") === "true";

  if (!name || !slug || !description) {
    return {
      success: false,
      error: "Name, slug, and description are required.",
    };
  }

  const { error } = await supabase.from("products").insert({
    name,
    slug,
    tagline: tagline || null,
    description,
    logo_url: logoUrl || null,
    cover_image_url: coverImageUrl || null,
    website_url: websiteUrl || null,
    status,
    featured,
  });

  if (error) {
    console.error("Failed to create product:", error);

    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/dashboard/products");

  return {
    success: true,
  };
}
