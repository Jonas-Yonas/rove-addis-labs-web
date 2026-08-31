import type { ReactNode } from "react";

import { LogoutButton } from "@/components/auth/logout-button";
import { SettingsProfileForm } from "@/components/dashboard/settings-profile-form";
import { SettingsTeamMember } from "@/components/dashboard/settings-team-member";
import { SettingsThemeSelector } from "@/components/dashboard/settings-theme-selector";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  canManageTeam,
  getMyProfile,
  getRoles,
  getTeam,
} from "@/lib/settings/queries";

function titleCase(value: string | null) {
  if (!value) return null;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
    new Date(value),
  );
}

export default async function SettingsPage() {
  const profile = await getMyProfile();

  if (!profile) {
    return (
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Sign in to manage your settings."
      />
    );
  }

  const showTeam = await canManageTeam();
  const [team, roles] = showTeam
    ? await Promise.all([getTeam(), getRoles()])
    : [[], []];

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Manage your profile, appearance, and workspace access."
      />

      <Section
        title="Appearance"
        description="Choose how the dashboard looks. System follows your device."
      >
        <SettingsThemeSelector />
      </Section>

      <Section
        title="Profile"
        description="Your display name is shown across the workspace."
      >
        <SettingsProfileForm displayName={profile.displayName} />

        <dl className="mt-6 grid gap-4 border-t pt-4 text-sm sm:grid-cols-2">
          <Field label="Role">{profile.roleName ?? "—"}</Field>
          <Field label="Status">
            <StatusBadge status={profile.status} />
          </Field>
        </dl>
      </Section>

      <Section title="Account" description="Your sign-in details.">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <Field label="Email">{profile.email ?? "—"}</Field>
          <Field label="Sign-in provider">
            {titleCase(profile.provider) ?? "—"}
          </Field>
          <Field label="Member since">
            {profile.createdAt ? formatDate(profile.createdAt) : "—"}
          </Field>
        </dl>

        <div className="mt-5 border-t pt-4">
          <LogoutButton />
        </div>
      </Section>

      {showTeam && (
        <Section
          title="Team"
          description="Manage roles and access for everyone in the workspace."
        >
          {team.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No team members found.
            </p>
          ) : (
            <ul className="divide-y overflow-hidden rounded-xl border bg-card">
              {team.map((member) => (
                <SettingsTeamMember
                  key={member.id}
                  member={member}
                  roles={roles}
                  isSelf={member.id === profile.id}
                />
              ))}
            </ul>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            Email addresses aren&apos;t shown here — they&apos;re held by the
            sign-in provider, not this workspace.
          </p>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{children}</dd>
    </div>
  );
}
