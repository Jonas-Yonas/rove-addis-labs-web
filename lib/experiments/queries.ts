import { createClient } from "@/lib/supabase/server";

export interface GetExperimentsOptions {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export async function getExperiments({
  search,
  status,
  page = 1,
  pageSize = 9,
}: GetExperimentsOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("experiments")
    .select(
      "id, title, slug, summary, content, cover_image_url, status, featured, published, created_at, updated_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(`title.ilike.%${value}%,summary.ilike.%${value}%`);
  }

  if (status && status !== "ALL") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Failed to fetch experiments:", error);
    throw new Error("Failed to fetch experiments.");
  }

  return {
    data,
    count: count ?? 0,
    page,
    pageSize,
  };
}

export async function getExperimentById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiments")
    .select(
      "id, title, slug, summary, content, cover_image_url, status, featured, published, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch experiment:", error);
    throw new Error("Failed to fetch experiment.");
  }

  return data;
}
