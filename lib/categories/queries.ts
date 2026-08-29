import { createClient } from "@/lib/supabase/server";

export interface GetCategoriesOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CategoryListItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  postCount: number;
}

const CATEGORY_SELECT =
  "id, name, slug, description, created_at, updated_at, posts(count)";

type CategoryRow = Omit<CategoryListItem, "postCount"> & {
  posts: { count: number }[] | null;
};

function withPostCount(row: CategoryRow): CategoryListItem {
  const { posts, ...category } = row;

  return {
    ...category,
    postCount: posts?.[0]?.count ?? 0,
  };
}

export async function getCategories({
  search,
  page = 1,
  pageSize = 10,
}: GetCategoriesOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("categories")
    .select(CATEGORY_SELECT, { count: "exact" })
    .order("name", { ascending: true })
    .range(from, to);

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(`name.ilike.%${value}%,slug.ilike.%${value}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories.");
  }

  return {
    data: ((data ?? []) as CategoryRow[]).map(withPostCount),
    count: count ?? 0,
    page,
    pageSize,
  };
}

export async function getCategoryById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch category:", error);
    throw new Error("Failed to fetch category.");
  }

  return data ? withPostCount(data as CategoryRow) : null;
}
