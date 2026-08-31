"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SelectField } from "@/components/ui/select";
import { StatusBadge } from "@/components/shared/status-badge";
import { setUserRole, setUserStatus } from "@/lib/settings/actions";
import { USER_STATUSES, type Role, type UserStatus } from "@/lib/settings/types";

const STATUS_OPTIONS = USER_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0) + status.slice(1).toLowerCase(),
}));

export function SettingsTeamMember({
  member,
  roles,
  isSelf,
}: {
  member: {
    id: string;
    displayName: string | null;
    status: string;
    roleId: string | null;
    roleName: string | null;
  };
  roles: Role[];
  isSelf: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function run(promise: Promise<{ success: boolean; error?: string }>) {
    startTransition(async () => {
      const result = await promise;

      if (!result.success) {
        toast.error(result.error ?? "Something went wrong.");
        return;
      }

      toast.success("Team member updated.");
      router.refresh();
    });
  }

  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {member.displayName ?? "Unnamed user"}
          {isSelf && (
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              (you)
            </span>
          )}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {member.roleName ?? "No role"}
        </p>
      </div>

      {isSelf ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {member.roleName ?? "No role"}
          </span>
          <StatusBadge status={member.status} />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <SelectField
            size="lg"
            aria-label={`Role for ${member.displayName ?? "user"}`}
            value={member.roleId ?? ""}
            disabled={isPending}
            onValueChange={(roleId) => run(setUserRole(member.id, roleId))}
            className="w-40"
            options={roles.map((role) => ({ value: role.id, label: role.name }))}
          />
          <SelectField
            size="lg"
            aria-label={`Status for ${member.displayName ?? "user"}`}
            value={member.status}
            disabled={isPending}
            onValueChange={(status) =>
              run(setUserStatus(member.id, status as UserStatus))
            }
            className="w-36"
            options={STATUS_OPTIONS}
          />
        </div>
      )}
    </li>
  );
}
