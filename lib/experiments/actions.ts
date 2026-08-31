"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

const EXPERIMENTS_PATH = "/dashboard/labs";
const STATUSES = [
  "EXPLORING",
  "PROTOTYPE",
  "EXPERIMENTAL",
  "INCUBATING",
  "ARCHIVED",
] as const;

function readCheckbox(formData: FormData, name: string) {
  const value = formData.get(name);
  return value === "true" || value === "on";
}

function readExperiment(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    coverImageUrl: String(formData.get("cover_image_url") ?? "").trim(),
    status: String(formData.get("status") ?? "EXPLORING"),
    featured: readCheckbox(formData, "featured"),
    published: readCheckbox(formData, "published"),
  };
}

function validateExperiment(data: ReturnType<typeof readExperiment>) {
  if (!data.title || !data.slug || !data.summary) {
    return "Title, slug, and summary are required.";
  }

  if (!STATUSES.includes(data.status as (typeof STATUSES)[number])) {
    return "Invalid experiment status.";
  }

  return null;
}

export async function createExperiment(formData: FormData) {
  const supabase = await createClient();
  const data = readExperiment(formData);
  const validationError = validateExperiment(data);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { error } = await supabase.from("experiments").insert({
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    content: data.content || null,
    cover_image_url: data.coverImageUrl || null,
    status: data.status,
    featured: data.featured,
    published: data.published,
  });

  if (error) {
    console.error("Failed to create experiment:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(EXPERIMENTS_PATH);
  return { success: true };
}

export async function updateExperiment(
  experimentId: string,
  formData: FormData,
) {
  const supabase = await createClient();
  const data = readExperiment(formData);
  const validationError = validateExperiment(data);

  if (validationError) {
    throw new Error(validationError);
  }

  const { error } = await supabase
    .from("experiments")
    .update({
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content || null,
      cover_image_url: data.coverImageUrl || null,
      status: data.status,
      featured: data.featured,
      published: data.published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", experimentId);

  if (error) {
    console.error("Failed to update experiment:", error);
    throw new Error("Failed to update experiment.");
  }

  revalidatePath(EXPERIMENTS_PATH);
  revalidatePath(`${EXPERIMENTS_PATH}/${experimentId}`);

  return { success: true };
}

export async function deleteExperiment(experimentId: string) {
  const supabase = await createClient();

  const { data: experiment, error: fetchError } = await supabase
    .from("experiments")
    .select("id, cover_image_url")
    .eq("id", experimentId)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to fetch experiment before deletion:", fetchError);
    return { success: false, error: "Failed to delete experiment." };
  }

  if (!experiment) {
    return { success: false, error: "Experiment not found." };
  }

  const { error: deleteError } = await supabase
    .from("experiments")
    .delete()
    .eq("id", experimentId);

  if (deleteError) {
    console.error("Failed to delete experiment:", deleteError);
    return { success: false, error: "Failed to delete experiment." };
  }

  if (experiment.cover_image_url) {
    const coverPath = getStoragePath(experiment.cover_image_url);

    if (coverPath) {
      const { error: storageError } = await supabase.storage
        .from("rove-labs-project-covers")
        .remove([coverPath]);

      if (storageError) {
        console.error(
          "Experiment deleted, but image cleanup failed:",
          storageError,
        );
      }
    }
  }

  revalidatePath(EXPERIMENTS_PATH);

  return { success: true };
}

function getStoragePath(url: string) {
  try {
    const parsedUrl = new URL(url);
    const marker = "/rove-labs-project-covers/";
    const index = parsedUrl.pathname.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(
      parsedUrl.pathname.slice(index + marker.length),
    );
  } catch {
    return null;
  }
}
