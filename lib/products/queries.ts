import { createClient } from "@/lib/supabase/server";

export interface GetProductsOptions {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export async function getProducts({
  search,
  status,
  page = 1,
  pageSize = 9,
}: GetProductsOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select(
      "id, name, slug, tagline, description, logo_url, cover_image_url, website_url, status, featured, created_at, updated_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(
      `name.ilike.%${value}%,tagline.ilike.%${value}%`,
    );
  }

  if (status && status !== "ALL") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products.");
  }

  return {
    data,
    count: count ?? 0,
    page,
    pageSize,
  };
}