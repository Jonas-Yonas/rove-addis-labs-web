"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const clientName = String(formData.get("client_name") ?? "").trim();
  const websiteUrl = String(formData.get("website_url") ?? "").trim();
  const status = String(formData.get("status") ?? "PLANNED");
  const featured = formData.get("featured") === "true";

  if (!title) {
    return {
      success: false,
      error: "Project name is required.",
    };
  }

  if (!description) {
    return {
      success: false,
      error: "Description is required.",
    };
  }

  const slug = slugify(title);

  const { data: existingProject, error: slugError } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (slugError) {
    console.error("Failed to check project slug:", slugError);

    return {
      success: false,
      error: "Unable to create project. Please try again.",
    };
  }

  if (existingProject) {
    return {
      success: false,
      error: "A project with this name already exists.",
    };
  }

  const { error } = await supabase.from("projects").insert({
    title,
    slug,
    description,
    client_name: clientName || null,
    website_url: websiteUrl || null,
    status,
    featured,
  });

  if (error) {
    console.error("Failed to create project:", error);

    return {
      success: false,
      error: "Unable to create project. Please try again.",
    };
  }

  revalidatePath("/dashboard/projects");

  return {
    success: true,
  };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const clientName = String(formData.get("client_name") ?? "").trim();
  const websiteUrl = String(formData.get("website_url") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();
  const status = String(formData.get("status") ?? "PLANNED");
  const featured = formData.get("featured") === "true";

  if (!id) {
    return {
      success: false,
      error: "Project ID is required.",
    };
  }

  if (!title) {
    return {
      success: false,
      error: "Project name is required.",
    };
  }

  if (!description) {
    return {
      success: false,
      error: "Description is required.",
    };
  }

  const slug = slugify(title);

  const { data: existingProject, error: slugError } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .maybeSingle();

  if (slugError) {
    console.error("Failed to check project slug:", slugError);

    return {
      success: false,
      error: "Unable to update project. Please try again.",
    };
  }

  if (existingProject) {
    return {
      success: false,
      error: "A project with this name already exists.",
    };
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      slug,
      description,
      client_name: clientName || null,
      website_url: websiteUrl || null,
      content: content || null,
      cover_image_url: coverImageUrl || null,
      status,
      featured,
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update project:", error);

    return {
      success: false,
      error: "Unable to update project. Please try again.",
    };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${id}`);

  return {
    success: true,
  };
}
