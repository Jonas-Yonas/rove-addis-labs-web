"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { USER_STATUSES, type UserStatus } from "./types";

const SETTINGS_PATH = "/dashboard/settings";

export type SettingsActionResult =
  | { success: true }
  | { success: false; error: string };

function toMessage(error: { code?: string; message: string }, fallback: string) {
  if (error.code === "42501" || /row-level security/i.test(error.message)) {
    return "You don't have permission to make that change.";
  }

  return error.message || fallback;
}

export async function updateMyProfile(
  formData: FormData,
): Promise<SettingsActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const displayName = String(formData.get("display_name") ?? "").trim();

  if (!displayName) {
    return { success: false, error: "Display name is required." };
  }

  if (displayName.length > 80) {
    return { success: false, error: "Display name must be 80 characters or fewer." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: toMessage(error, "Failed to update profile.") };
  }

  revalidatePath(SETTINGS_PATH);

  return { success: true };
}

async function assertCanManageTeam(
  supabase: Awaited<ReturnType<typeof createClient>>,
) {
  const { data } = await supabase.rpc("has_permission", {
    required_permission: "users:update",
  });

  return data === true;
}

async function currentUserId(
  supabase: Awaited<ReturnType<typeof createClient>>,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

export async function setUserRole(
  userId: string,
  roleId: string,
): Promise<SettingsActionResult> {
  const supabase = await createClient();

  if (!(await assertCanManageTeam(supabase))) {
    return { success: false, error: "You don't have permission to manage the team." };
  }

  if (userId === (await currentUserId(supabase))) {
    return { success: false, error: "You can't change your own role." };
  }

  if (!roleId) {
    return { success: false, error: "Pick a role." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role_id: roleId, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("Failed to set user role:", error);
    return { success: false, error: toMessage(error, "Failed to update role.") };
  }

  revalidatePath(SETTINGS_PATH);

  return { success: true };
}

export async function setUserStatus(
  userId: string,
  status: UserStatus,
): Promise<SettingsActionResult> {
  const supabase = await createClient();

  if (!USER_STATUSES.includes(status)) {
    return { success: false, error: "Invalid status." };
  }

  if (!(await assertCanManageTeam(supabase))) {
    return { success: false, error: "You don't have permission to manage the team." };
  }

  if (userId === (await currentUserId(supabase))) {
    return { success: false, error: "You can't change your own status." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("Failed to set user status:", error);
    return { success: false, error: toMessage(error, "Failed to update status.") };
  }

  revalidatePath(SETTINGS_PATH);

  return { success: true };
}
