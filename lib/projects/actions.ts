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
  const title = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) {
    return {
      success: false,
      error: "Project name is required.",
    };
  }

  if (!description) {
    return {
      success: false,
      error: "Project description is required.",
    };
  }

  const baseSlug = slugify(title);

  if (!baseSlug) {
    return {
      success: false,
      error: "Project name must contain valid characters.",
    };
  }

  const supabase = await createClient();

  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const { data, error } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Failed to check project slug:", error);

      return {
        success: false,
        error: "Unable to create project. Please try again.",
      };
    }

    if (!data) {
      break;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const { error } = await supabase.from("projects").insert({
    title,
    slug,
    description,
  });

  if (error) {
    console.error("Failed to create project:", error);

    return {
      success: false,
      error: "Unable to create project. Please try again.",
    };
  }

  /** only for debugging */
  // if (error) {
  //   console.error("Failed to create project:", error);

  //   return {
  //     success: false,
  //     error: `${error.code}: ${error.message}`,
  //   };
  // }

  revalidatePath("/dashboard/projects");

  return {
    success: true,
  };
}
