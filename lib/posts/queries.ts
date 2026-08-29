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

export interface PostTag {
  id: string;
  name: string;
}

const POST_SELECT =
  "id, author_id, category_id, title, slug, excerpt, content, cover_image_url, status, featured, published_at, created_at, updated_at";

interface PostRow {
  id: string;
  author_id: string | null;
  category_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: string;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type Post = PostRow & {
  tags: PostTag[];
  tag_ids: string[];
};

/**
 * Tags for the given posts, keyed by post id. Loaded separately (rather than as
 * an embed) so a missing/locked-down `post_tags` table degrades to "no tags"
 * instead of breaking the whole posts view.
 */
async function getTagsByPost(
  supabase: Awaited<ReturnType<typeof createClient>>,
  postIds: string[],
): Promise<Map<string, PostTag[]>> {
  const map = new Map<string, PostTag[]>();

  if (postIds.length === 0) return map;

  const { data, error } = await supabase
    .from("post_tags")
    .select("post_id, tags(id, name)")
    .in("post_id", postIds);

  if (error) {
    // "post_tags not set up yet" is an expected transitional state — stay quiet.
    const missingTable = ["42P01", "PGRST205", "PGRST200"].includes(
      error.code ?? "",
    );

    if (!missingTable) {
      console.error("Failed to fetch post tags:", error);
    }

    return map;
  }

  const rows = (data ?? []) as unknown as {
    post_id: string;
    tags: PostTag | null;
  }[];

  for (const row of rows) {
    if (!row.tags) continue;

    const list = map.get(row.post_id) ?? [];
    list.push(row.tags);
    map.set(row.post_id, list);
  }

  for (const list of map.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return map;
}

function withTags(row: PostRow, tags: PostTag[]): Post {
  return { ...row, tags, tag_ids: tags.map((tag) => tag.id) };
}

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

  const rows = (data ?? []) as unknown as PostRow[];
  const tagsByPost = await getTagsByPost(
    supabase,
    rows.map((row) => row.id),
  );

  return {
    data: rows.map((row) => withTags(row, tagsByPost.get(row.id) ?? [])),
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

  if (!data) return null;

  const row = data as unknown as PostRow;
  const tagsByPost = await getTagsByPost(supabase, [row.id]);

  return withTags(row, tagsByPost.get(row.id) ?? []);
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
