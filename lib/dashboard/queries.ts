import { createClient } from "@/lib/supabase/server";

export interface DashboardStats {
  projects: number;
  products: number;
  labs: number;
  posts: number;
  publishedPosts: number;
  draftPosts: number;
  messages: number;
  newMessages: number;
}

export interface ActivityRow {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export type ActivityType = "Project" | "Product" | "Lab" | "Post";

export interface ActivityItem {
  id: string;
  title: string;
  type: ActivityType;
  status: string;
  href: string;
  createdAt: string;
}

/**
 * Every count is resolved independently and falls back to 0 on error, so one
 * locked-down table (e.g. `contact_messages` before its RLS migration) can't
 * take down the whole Overview.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const results = await Promise.allSettled([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("experiments").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "PUBLISHED"),
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "DRAFT"),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "NEW"),
  ]);

  const at = (index: number) => {
    const result = results[index];

    if (result.status === "rejected") {
      console.error("Dashboard stat failed:", result.reason);
      return 0;
    }

    if (result.value.error) {
      console.error("Dashboard stat failed:", result.value.error);
      return 0;
    }

    return result.value.count ?? 0;
  };

  return {
    projects: at(0),
    products: at(1),
    labs: at(2),
    posts: at(3),
    publishedPosts: at(4),
    draftPosts: at(5),
    messages: at(6),
    newMessages: at(7),
  };
}

function pickRows(
  result: PromiseSettledResult<{ data: unknown; error: unknown }>,
  label: string,
): ActivityRow[] {
  if (result.status === "rejected") {
    console.error(`Recent ${label} failed:`, result.reason);
    return [];
  }

  if (result.value.error) {
    console.error(`Recent ${label} failed:`, result.value.error);
    return [];
  }

  return (result.value.data as ActivityRow[] | null) ?? [];
}

export async function getRecentActivity(limit = 6): Promise<ActivityItem[]> {
  const supabase = await createClient();

  const [projects, products, labs, posts] = await Promise.allSettled([
    supabase
      .from("projects")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("products")
      .select("id, title:name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("experiments")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("posts")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  const items: ActivityItem[] = [
    ...pickRows(projects, "projects").map((row) => ({
      ...row,
      type: "Project" as const,
      href: `/dashboard/projects/${row.id}`,
      createdAt: row.created_at,
    })),
    ...pickRows(products, "products").map((row) => ({
      ...row,
      type: "Product" as const,
      href: `/dashboard/products/${row.id}`,
      createdAt: row.created_at,
    })),
    ...pickRows(labs, "labs").map((row) => ({
      ...row,
      type: "Lab" as const,
      href: `/dashboard/labs/${row.id}`,
      createdAt: row.created_at,
    })),
    ...pickRows(posts, "posts").map((row) => ({
      ...row,
      type: "Post" as const,
      href: `/dashboard/posts/${row.id}`,
      createdAt: row.created_at,
    })),
  ];

  return items
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}
