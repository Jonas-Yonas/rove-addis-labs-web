import { createClient } from "@/lib/supabase/server";
import type { Project } from "./types";

export interface GetProjectsOptions {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export async function getProjects({
  search,
  status,
  page = 1,
  pageSize = 9,
}: GetProjectsOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("projects")
    .select(
      "id, title, slug, client_name, description, status, featured, published, cover_image_url, created_at, updated_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(`title.ilike.%${value}%,client_name.ilike.%${value}%`);
  }

  if (status && status !== "ALL") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects.");
  }

  return {
    data,
    count: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, client_name, description, content, cover_image_url, website_url, status, featured, published, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch project:", error);
    throw new Error("Failed to fetch project.");
  }

  return data as Project | null;
}
