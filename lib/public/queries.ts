import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------------
// Insights (posts)
// ---------------------------------------------------------------------------

export interface PublicPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
}

export interface PublicPostDetail extends PublicPost {
  content: string;
  categoryName: string | null;
}

type CategoryEmbed = { name: string } | { name: string }[] | null;

function embedName(value: CategoryEmbed): string | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0]?.name ?? null) : value.name;
}

export async function getPublishedPosts(): Promise<PublicPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, published_at")
    .eq("status", "PUBLISHED")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Failed to fetch published posts:", error);
    return [];
  }

  return (data ?? []) as PublicPost[];
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<PublicPostDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, published_at, categories(name)",
    )
    .eq("slug", slug)
    .eq("status", "PUBLISHED")
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }

  if (!data) return null;

  const row = data as unknown as PublicPostDetail & { categories: CategoryEmbed };

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    cover_image_url: row.cover_image_url,
    published_at: row.published_at,
    categoryName: embedName(row.categories),
  };
}

// ---------------------------------------------------------------------------
// Products (our own products)
// ---------------------------------------------------------------------------

export interface PublicProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  logo_url: string | null;
  cover_image_url: string | null;
  website_url: string | null;
  status: string;
  featured: boolean;
}

const PRODUCT_FIELDS =
  "id, name, slug, tagline, description, logo_url, cover_image_url, website_url, status, featured";

export async function getPublicProducts(): Promise<PublicProduct[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_FIELDS)
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }

  return (data ?? []) as PublicProduct[];
}

export async function getProductBySlug(
  slug: string,
): Promise<PublicProduct | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_FIELDS)
    .eq("slug", slug)
    .eq("published", true)
    .limit(1);

  if (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }

  return ((data ?? [])[0] ?? null) as PublicProduct | null;
}

// ---------------------------------------------------------------------------
// Work (client projects)
// ---------------------------------------------------------------------------

export interface PublicProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  client_name: string | null;
  website_url: string | null;
  cover_image_url: string | null;
  status: string;
  featured: boolean;
  created_at: string;
}

const PROJECT_FIELDS =
  "id, title, slug, description, content, client_name, website_url, cover_image_url, status, featured, created_at";

export async function getPublicProjects(): Promise<PublicProject[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_FIELDS)
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }

  return (data ?? []) as PublicProject[];
}

export async function getProjectBySlug(
  slug: string,
): Promise<PublicProject | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_FIELDS)
    .eq("slug", slug)
    .eq("published", true)
    .limit(1);

  if (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }

  return ((data ?? [])[0] ?? null) as PublicProject | null;
}

// ---------------------------------------------------------------------------
// Labs (experiments)
// ---------------------------------------------------------------------------

export interface PublicExperiment {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  cover_image_url: string | null;
  status: string;
  featured: boolean;
}

const EXPERIMENT_FIELDS =
  "id, title, slug, summary, content, cover_image_url, status, featured";

export async function getActiveExperiments(): Promise<PublicExperiment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiments")
    .select(EXPERIMENT_FIELDS)
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch experiments:", error);
    return [];
  }

  return (data ?? []) as PublicExperiment[];
}

export async function getExperimentBySlug(
  slug: string,
): Promise<PublicExperiment | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiments")
    .select(EXPERIMENT_FIELDS)
    .eq("slug", slug)
    .eq("published", true)
    .limit(1);

  if (error) {
    console.error("Failed to fetch experiment:", error);
    return null;
  }

  return ((data ?? [])[0] ?? null) as PublicExperiment | null;
}
