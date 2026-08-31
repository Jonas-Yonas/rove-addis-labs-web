import { createClient } from "@/lib/supabase/server";

import type { Role } from "./types";

export interface CurrentUser {
  id: string;
  email: string | null;
  provider: string | null;
  createdAt: string | null;
}

export interface MyProfile extends CurrentUser {
  displayName: string | null;
  avatarUrl: string | null;
  status: string;
  roleName: string | null;
}

export interface TeamMember {
  id: string;
  displayName: string | null;
  status: string;
  roleId: string | null;
  roleName: string | null;
}

type RoleEmbed = { name: string } | { name: string }[] | null;

function roleName(roles: RoleEmbed): string | null {
  if (!roles) return null;
  return Array.isArray(roles) ? (roles[0]?.name ?? null) : roles.name;
}

type ProfileRow = {
  display_name: string | null;
  avatar_url: string | null;
  status: string;
  role_id: string | null;
  roles: RoleEmbed;
};

type TeamRow = {
  id: string;
  display_name: string | null;
  status: string;
  role_id: string | null;
  roles: RoleEmbed;
};

export async function getMyProfile(): Promise<MyProfile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, avatar_url, status, role_id, roles(name)")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch profile:", error);
  }

  const profile = (data ?? null) as ProfileRow | null;

  return {
    id: user.id,
    email: user.email ?? null,
    provider:
      (user.app_metadata?.provider as string | undefined) ??
      user.identities?.[0]?.provider ??
      null,
    createdAt: user.created_at ?? null,
    displayName: profile?.display_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    status: profile?.status ?? "ACTIVE",
    roleName: roleName(profile?.roles ?? null),
  };
}

export async function canManageTeam(): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("has_permission", {
    required_permission: "users:read",
  });

  if (error) {
    console.error("Failed to check team permission:", error);
    return false;
  }

  return data === true;
}

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, status, role_id, roles(name)")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch team:", error);
    return [];
  }

  return ((data ?? []) as unknown as TeamRow[]).map((row) => ({
    id: row.id,
    displayName: row.display_name,
    status: row.status,
    roleId: row.role_id,
    roleName: roleName(row.roles),
  }));
}

export async function getRoles(): Promise<Role[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("roles")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch roles:", error);
    return [];
  }

  return (data ?? []) as Role[];
}
