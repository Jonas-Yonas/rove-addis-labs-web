import { createClient } from "@/lib/supabase/server";

export interface GetTagsOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface TagListItem {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

const TAG_SELECT = "id, name, slug, created_at";

export async function getTags({
  search,
  page = 1,
  pageSize = 12,
}: GetTagsOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("tags")
    .select(TAG_SELECT, { count: "exact" })
    .order("name", { ascending: true })
    .range(from, to);

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(`name.ilike.%${value}%,slug.ilike.%${value}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Failed to fetch tags:", error);
    throw new Error("Failed to fetch tags.");
  }

  return {
    data: (data ?? []) as TagListItem[],
    count: count ?? 0,
    page,
    pageSize,
  };
}

export interface TagOption {
  id: string;
  name: string;
}

/** Every tag, for pickers (e.g. the post form's tag multi-select). */
export async function getAllTags(): Promise<TagOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch tags:", error);
    throw new Error("Failed to fetch tags.");
  }

  return data ?? [];
}

export async function getTagById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select(TAG_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch tag:", error);
    throw new Error("Failed to fetch tag.");
  }

  return data as TagListItem | null;
}
