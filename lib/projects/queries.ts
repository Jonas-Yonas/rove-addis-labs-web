import { createClient } from "@/lib/supabase/server";
import type { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, client_name, description, status, featured, created_at, updated_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects.");
  }

  return data as Project[];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, client_name, description, content, cover_image_url, website_url, status, featured, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch project:", error);
    throw new Error("Failed to fetch project.");
  }

  return data as Project | null;
}
