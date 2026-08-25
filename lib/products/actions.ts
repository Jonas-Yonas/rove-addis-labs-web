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

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const websiteUrl = String(formData.get("websiteUrl") ?? "").trim();
  const status = String(formData.get("status") ?? "IDEA");
  const featured = formData.get("featured") === "on";

  if (!name || !slug || !description) {
    throw new Error("Name, slug, and description are required.");
  }

  const { error } = await supabase
    .from("products")
    .update({
      name,
      slug,
      tagline: tagline || null,
      description,
      website_url: websiteUrl || null,
      status,
      featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) {
    console.error("Failed to update product:", error);
    throw new Error("Failed to update product.");
  }

  return { success: true };
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();

  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("id, logo_url, cover_image_url")
    .eq("id", productId)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to fetch product before deletion:", fetchError);
    return {
      success: false,
      error: "Failed to delete product.",
    };
  }

  if (!product) {
    return {
      success: false,
      error: "Product not found.",
    };
  }

  /*
   * Delete the database record first.
   * Image cleanup is handled separately so an orphaned image
   * never prevents the product itself from being deleted.
   */
  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (deleteError) {
    console.error("Failed to delete product:", deleteError);

    return {
      success: false,
      error: "Failed to delete product.",
    };
  }

  /*
   * Clean up associated storage files.
   */
  const paths: string[] = [];

  if (product.logo_url) {
    const logoPath = getStoragePath(product.logo_url);

    if (logoPath) {
      paths.push(logoPath);
    }
  }

  if (product.cover_image_url) {
    const coverPath = getStoragePath(product.cover_image_url);

    if (coverPath) {
      paths.push(coverPath);
    }
  }

  if (paths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("rove-labs-project-covers")
      .remove(paths);

    if (storageError) {
      console.error("Product deleted, but image cleanup failed:", storageError);
    }
  }

  return {
    success: true,
  };
}

function getStoragePath(url: string) {
  try {
    const parsedUrl = new URL(url);
    const marker = "/rove-labs-project-covers/";

    const index = parsedUrl.pathname.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return decodeURIComponent(parsedUrl.pathname.slice(index + marker.length));
  } catch {
    return null;
  }
}
