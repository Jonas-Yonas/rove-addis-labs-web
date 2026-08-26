import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: projectCount, error: projectError },
    { count: productCount, error: productError },
  ] = await Promise.all([
    supabase.from("projects").select("id", {
      count: "exact",
      head: true,
    }),

    supabase.from("products").select("id", {
      count: "exact",
      head: true,
    }),
  ]);

  if (projectError) {
    console.error("Failed to fetch project count:", projectError);
    throw new Error("Failed to fetch dashboard stats.");
  }

  if (productError) {
    console.error("Failed to fetch product count:", productError);
    throw new Error("Failed to fetch dashboard stats.");
  }

  return {
    projectCount: projectCount ?? 0,
    productCount: productCount ?? 0,
  };
}

export async function getRecentActivity(limit = 5) {
  const supabase = await createClient();

  const [
    { data: projects, error: projectsError },
    { data: products, error: productsError },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),

    supabase
      .from("products")
      .select("id, name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  if (projectsError) {
    console.error("Failed to fetch recent projects:", projectsError);
    throw new Error("Failed to fetch recent activity.");
  }

  if (productsError) {
    console.error("Failed to fetch recent products:", productsError);
    throw new Error("Failed to fetch recent activity.");
  }

  return {
    projects: projects ?? [],
    products: products ?? [],
  };
}
