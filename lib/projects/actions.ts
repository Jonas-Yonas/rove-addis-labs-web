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
  const published = formData.get("published") === "true";

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
    published,
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
  const status = String(formData.get("status") ?? "PLANNED");
  const featured = formData.get("featured") === "true";
  const published = formData.get("published") === "true";

  // This is now a URL/path, NOT a File.
  const coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();

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

  const updateData = {
    title,
    slug,
    description,
    client_name: clientName || null,
    website_url: websiteUrl || null,
    content: content || null,
    status,
    featured,
    published,
    ...(coverImageUrl ? { cover_image_url: coverImageUrl } : {}),
  };

  const { error } = await supabase
    .from("projects")
    .update(updateData)
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
  revalidatePath(`/dashboard/projects/${id}/edit`);

  return {
    success: true,
  };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  if (!id) {
    return {
      success: false,
      error: "Project ID is required.",
    };
  }

  // Fetch the project first so we can clean up its cover image.
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("id, cover_image_url")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to fetch project before deletion:", fetchError);

    return {
      success: false,
      error: "Unable to delete project. Please try again.",
    };
  }

  if (!project) {
    return {
      success: false,
      error: "Project not found.",
    };
  }

  // Remove the cover image from Supabase Storage.
  if (project.cover_image_url) {
    try {
      const url = new URL(project.cover_image_url);

      const marker = "/storage/v1/object/public/rove-labs-project-covers/";

      const markerIndex = url.pathname.indexOf(marker);

      if (markerIndex !== -1) {
        const storagePath = decodeURIComponent(
          url.pathname.slice(markerIndex + marker.length),
        );

        if (storagePath) {
          const { error: storageError } = await supabase.storage
            .from("rove-labs-project-covers")
            .remove([storagePath]);

          if (storageError) {
            console.error(
              "Failed to delete project cover image:",
              storageError,
            );

            return {
              success: false,
              error:
                "Unable to delete the project cover image. Project was not deleted.",
            };
          }
        }
      }
    } catch (error) {
      console.error("Failed to parse project cover URL:", error);

      return {
        success: false,
        error:
          "Unable to process the project cover image. Project was not deleted.",
      };
    }
  }

  // Delete the database record.
  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Failed to delete project:", deleteError);

    return {
      success: false,
      error: "Unable to delete project. Please try again.",
    };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${id}`);

  return {
    success: true,
  };
}
