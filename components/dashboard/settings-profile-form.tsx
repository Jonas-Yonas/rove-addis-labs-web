"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateMyProfile } from "@/lib/settings/actions";
import { Button } from "@/components/ui/button";

export function SettingsProfileForm({
  displayName,
}: {
  displayName: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (!result.success) {
        setError(result.error);
        return;
      }

      toast.success("Profile updated.");
      router.refresh();
    });
  }

  return (
    <form action={handleSubmit} className="max-w-md space-y-4">
      <label className="block space-y-2 text-sm">
        <span className="font-medium">Display name</span>
        <input
          name="display_name"
          type="text"
          defaultValue={displayName ?? ""}
          required
          maxLength={80}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
