import { createClient } from "@/lib/supabase/server";

export interface GetPostsOptions {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface PostCategory {
  id: string;
  name: string;
}

const POST_SELECT =
  "id, author_id, category_id, title, slug, excerpt, content, cover_image_url, status, featured, published_at, created_at, updated_at";

export async function getPosts({
  search,
  status = "ALL",
  page = 1,
  pageSize = 9,
}: GetPostsOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("posts")
    .select(POST_SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(`title.ilike.%${value}%,excerpt.ilike.%${value}%`);
  }

  if (status && status !== "ALL") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts.");
  }

  return {
    data: data ?? [],
    count: count ?? 0,
    page,
    pageSize,
  };
}

export async function getPostById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch post:", error);
    throw new Error("Failed to fetch post.");
  }

  return data;
}

export async function getPostCategories(): Promise<PostCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories.");
  }

  return data ?? [];
}
